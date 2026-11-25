import "server-only";
import { groq } from "next-sanity";
import { writeClient } from "@/sanity/lib/writeClient";
import { generateBookingReference } from "@/lib/bookingReference";
import type { LineItem } from "@/lib/lineItems";
import { sendPaidEmails } from "./bookingEmails";

export type BookingStatus = "enquiry" | "quoted" | "paid" | "expired" | "cancelled";

export type Booking = {
  _id: string;
  reference: string;
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  packageName?: string;
  packageTitle?: string;
  destination?: string;
  quotedAmount?: number;
  stitchLinkId?: string;
  paymentUrl?: string;
};

export type NewBooking = {
  source: "enquiry";
  status?: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  packageId?: string;
  packageName?: string;
  destination?: string;
  travelDates?: string;
  guests?: number;
  message?: string;
  quotedAmount?: number;
  lineItems?: { label: string; quantity: number; unitPrice: number }[];
} & EnquiryDetails;

/** Extra trip details from the package enquiry form. All optional. */
export type EnquiryDetails = {
  departureDate?: string;
  dateFlexibility?: string;
  nights?: number;
  departureCity?: string;
  adults?: number;
  children?: number;
  childAges?: number[];
  infants?: number;
  rooms?: number;
  servicesRequested?: string[];
  cabinClass?: string;
  passportNationality?: string;
  occasion?: string;
  hotelStandard?: string;
  budget?: string;
  dietary?: string[];
  dietaryNotes?: string;
  accessibilityNeeds?: string;
  contactMethod?: string;
  contactTime?: string;
};

/**
 * IDs contain a "." so the documents are never readable through the public
 * (unauthenticated) API, even if the dataset itself is public.
 */
export async function createBooking(input: NewBooking): Promise<Booking> {
  const { packageId, status = "enquiry", lineItems, ...rest } = input;
  const doc = {
    _id: `bookings.${crypto.randomUUID()}`,
    _type: "booking" as const,
    reference: generateBookingReference(),
    status,
    ...rest,
    ...(lineItems?.length
      ? { lineItems: lineItems.map((item) => ({ _key: crypto.randomUUID().slice(0, 12), _type: "lineItem", ...item })) }
      : {}),
    ...(packageId ? { package: { _type: "reference", _ref: packageId } } : {}),
  };
  return (await writeClient.create(doc)) as unknown as Booking;
}

const bookingFields = `
  _id, reference, status, customerName, customerEmail, customerPhone,
  packageName, "packageTitle": package->title, destination,
  quotedAmount, stitchLinkId, paymentUrl
`;
const bookingProjection = `{${bookingFields}}`;

export async function findBookingByLinkId(linkId: string): Promise<Booking | null> {
  // Exclude drafts so a half-edited draft never shadows the published booking.
  return writeClient.fetch(
    groq`*[_type == "booking" && stitchLinkId == $linkId && !(_id in path("drafts.**"))][0]${bookingProjection}`,
    { linkId }
  );
}

/**
 * Marks the booking paid. Returns false if it was already paid (webhook retry),
 * so callers only send confirmation emails once.
 */
export async function markBookingPaid(
  booking: Booking,
  payment: { paymentId: string; amountCents: number }
): Promise<boolean> {
  if (booking.status === "paid") return false;

  const set = {
    status: "paid",
    stitchPaymentId: payment.paymentId,
    amountPaid: payment.amountCents / 100,
    paidAt: new Date().toISOString(),
  };

  // ifRevisionId guards against two concurrent deliveries both "winning".
  const current = await writeClient.getDocument(booking._id);
  if (!current || current.status === "paid") return false;
  try {
    await writeClient.patch(booking._id).ifRevisionId(current._rev).set(set).commit();
  } catch (err) {
    if ((err as { statusCode?: number })?.statusCode === 409) return false;
    throw err;
  }

  await syncDraft(booking._id, set);
  return true;
}

/**
 * If the client has an unpublished draft open in Studio, keep it in sync so
 * publishing it later doesn't revert server-written fields.
 */
async function syncDraft(id: string, set: Record<string, unknown>, unset: string[] = []) {
  await writeClient
    .patch(`drafts.${id}`)
    .set(set)
    .unset(unset)
    .commit()
    .catch(() => undefined); // no draft — nothing to sync
}

export async function updateBooking(id: string, set: Record<string, unknown>, unset: string[] = []) {
  await writeClient.patch(id).set(set).unset(unset).commit();
  await syncDraft(id, set, unset);
}

export async function findBookingByReference(reference: string): Promise<Booking | null> {
  return writeClient.fetch(
    groq`*[_type == "booking" && reference == $reference && !(_id in path("drafts.**"))][0]${bookingProjection}`,
    { reference }
  );
}

export type QuoteBooking = Booking & {
  _rev: string;
  lineItems?: LineItem[];
  quoteDetails?: string;
  linkExpiresAt?: string;
  quoteRequestedAt?: string;
  quoteSendingAt?: string;
  travelDates?: string;
  guests?: number;
};

export async function getQuoteBooking(id: string): Promise<QuoteBooking | null> {
  return writeClient.fetch(
    groq`*[_id == $id][0]{
      ${bookingFields},
      _rev, lineItems, quoteDetails, linkExpiresAt, quoteRequestedAt, quoteSendingAt, travelDates, guests
    }`,
    { id }
  );
}

const QUOTE_LOCK_MS = 5 * 60 * 1000;

/**
 * Take a short-lived lock so concurrent / retried webhook deliveries don't
 * create two Stitch links. Returns false if another delivery holds the lock.
 */
export async function claimQuoteLock(booking: QuoteBooking): Promise<boolean> {
  if (booking.quoteSendingAt && Date.now() - Date.parse(booking.quoteSendingAt) < QUOTE_LOCK_MS) {
    return false;
  }
  try {
    await writeClient
      .patch(booking._id)
      .ifRevisionId(booking._rev)
      .set({ quoteSendingAt: new Date().toISOString() })
      .commit();
    return true;
  } catch (err) {
    if ((err as { statusCode?: number })?.statusCode === 409) return false;
    throw err;
  }
}

/**
 * Single entry point for "this booking has been paid", used by both the Stitch
 * webhook and the return page. Emails go out only on the first successful call.
 */
export async function recordPayment(
  booking: Booking,
  payment: { paymentId: string; amountCents: number }
): Promise<boolean> {
  const updated = await markBookingPaid(booking, payment);
  if (updated) {
    await sendPaidEmails(booking, payment.amountCents / 100);
  }
  return updated;
}
