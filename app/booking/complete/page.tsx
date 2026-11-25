import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { type Booking, findBookingByReference, recordPayment, updateBooking } from "@/lib/server/bookings";
import { formatZar } from "@/lib/server/email";
import { getPaymentLink } from "@/lib/server/stitch";

export const metadata: Metadata = {
  title: "Booking Payment — JB Travels",
  robots: { index: false, follow: false },
};

type State = "paid" | "processing" | "expired" | "unknown";

const REFERENCE_RE = /^JB-\d{6}-[A-Z2-9]{4}$/;

/**
 * Stitch redirects here after checkout. The webhook is the source of truth, but
 * it can lag the redirect, so we also ask Stitch directly and record the payment
 * if the webhook hasn't arrived yet (recordPayment is idempotent).
 */
async function resolveBooking(reference: string): Promise<{ state: State; booking?: Booking }> {
  const booking = await findBookingByReference(reference);
  if (!booking) return { state: "unknown" };
  if (booking.status === "paid") return { state: "paid", booking };
  if (!booking.stitchLinkId) return { state: "unknown" };

  try {
    const link = await getPaymentLink(booking.stitchLinkId);
    if (link.status === "PAID" && link.paymentId) {
      await recordPayment(booking, { paymentId: link.paymentId, amountCents: link.amount });
      return { state: "paid", booking };
    }
    if (link.status === "EXPIRED" || link.status === "CANCELLED") {
      if (booking.status === "quoted") {
        await updateBooking(booking._id, { status: link.status === "EXPIRED" ? "expired" : "cancelled" });
      }
      return { state: "expired", booking };
    }
  } catch (err) {
    console.error("Could not verify payment with Stitch:", err);
  }
  return { state: "processing", booking };
}

export default async function BookingCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { reference: raw } = await searchParams;
  const reference = typeof raw === "string" ? raw.trim().toUpperCase() : "";
  const { state, booking } = REFERENCE_RE.test(reference)
    ? await resolveBooking(reference)
    : { state: "unknown" as State, booking: undefined };

  const tripName = booking?.packageTitle || booking?.packageName;

  const copy: Record<State, { eyebrow: string; title: string; body: string }> = {
    paid: {
      eyebrow: "Payment received",
      title: "Your journey is confirmed",
      body: `Thank you${booking ? `, ${booking.customerName.split(" ")[0]}` : ""}. We've received your payment${
        booking?.quotedAmount ? ` of ${formatZar(booking.quotedAmount)}` : ""
      }${tripName ? ` for ${tripName}` : ""}. A confirmation email is on its way, and our team will be in touch shortly with your travel documents.`,
    },
    processing: {
      eyebrow: "Almost there",
      title: "We're confirming your payment",
      body: "This usually takes less than a minute. You'll receive a confirmation email as soon as it clears, so there's no need to pay again.",
    },
    expired: {
      eyebrow: "Link no longer active",
      title: "This payment link has expired",
      body: "No payment was taken. Please contact us and we'll send you a fresh link.",
    },
    unknown: {
      eyebrow: "Booking payment",
      title: "Thank you",
      body: "If you've just completed a payment, a confirmation email will follow shortly. If you have any questions, our team is happy to help.",
    },
  };
  const { eyebrow, title, body } = copy[state];

  return (
    <PageShell>
      <section className="min-h-[70vh] flex items-center justify-center bg-[#F8F6F1] px-6 pt-32 pb-24">
        <div className="max-w-xl w-full text-center">
          <p
            className="text-xs uppercase tracking-[0.25em] text-[#D8B15A] mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {eyebrow}
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold text-[#0B3D5B] mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </h1>
          <p
            className="text-[15px] leading-relaxed text-[#4B5563] mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {body}
          </p>

          {booking && (
            <p className="text-sm text-[#0B3D5B] mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
              Booking reference: <strong>{booking.reference}</strong>
            </p>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            {state === "processing" && (
              <a
                href={`/booking/complete?reference=${encodeURIComponent(reference)}`}
                className="px-6 py-3 rounded-full bg-[#0B3D5B] text-white text-sm font-semibold hover:bg-[#0a344e] transition-colors"
              >
                Check again
              </a>
            )}
            {(state === "expired" || state === "unknown") && (
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#0B3D5B] text-white text-sm font-semibold hover:bg-[#0a344e] transition-colors"
              >
                Contact us
              </Link>
            )}
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-[#0B3D5B]/20 text-[#0B3D5B] text-sm font-semibold hover:border-[#D8B15A] transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
