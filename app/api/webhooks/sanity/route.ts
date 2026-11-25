import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { claimQuoteLock, getQuoteBooking, updateBooking } from "@/lib/server/bookings";
import { sendQuoteEmails } from "@/lib/server/bookingEmails";
import { formatZar } from "@/lib/server/email";
import { sumLineItems } from "@/lib/lineItems";
import { createPaymentLink, randToCents, StitchError, withRedirect } from "@/lib/server/stitch";

// Triggered by a Sanity GROQ webhook when a booking is published with
// `quoteRequestedAt` set (the "Send payment link" action in Studio) and no Stitch link yet.
//
// Sanity webhook settings (sanity.io/manage → API → Webhooks):
//   URL:        https://www.jbtravel.co.za/api/webhooks/sanity
//   Dataset:    production
//   Trigger on: Create, Update
//   Filter:     _type == "booking" && delta::changedAny(quoteRequestedAt) && defined(quoteRequestedAt) && !defined(stitchLinkId)
//               (delta:: keeps this route's own patches from re-triggering the webhook)
//   Projection: {_id}
//   Secret:     same value as SANITY_WEBHOOK_SECRET
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("SANITY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // Third arg waits for Content Lake consistency so the fetch below sees the triggering write.
  const { isValidSignature, body } = await parseBody<{ _id?: string }>(request, secret, true);
  if (!isValidSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const id = body?._id?.replace(/^drafts\./, "");
  if (!id) return NextResponse.json({ error: "Missing _id" }, { status: 400 });

  const booking = await getQuoteBooking(id);
  if (!booking || !booking.quoteRequestedAt || booking.stitchLinkId) {
    return NextResponse.json({ received: true, ignored: true });
  }
  if (booking.status === "paid" || booking.status === "cancelled") {
    await updateBooking(id, { quoteError: `Not sent: booking is ${booking.status}.` }, ["quoteRequestedAt"]);
    return NextResponse.json({ received: true, ignored: true });
  }

  if (!(await claimQuoteLock(booking))) {
    return NextResponse.json({ received: true, inProgress: true });
  }

  try {
    if (!booking.quotedAmount) throw new StitchError("Add a quoted amount before sending.", 400);
    if (booking.lineItems?.length) {
      const itemsTotal = sumLineItems(booking.lineItems);
      if (Math.abs(itemsTotal - booking.quotedAmount) >= 0.01) {
        throw new StitchError(
          `The quoted amount (${formatZar(booking.quotedAmount)}) doesn't match the line items (${formatZar(itemsTotal)}). Open the booking, check the line items and publish again.`,
          400
        );
      }
    }
    const amountCents = randToCents(booking.quotedAmount);

    const expiresAt =
      booking.linkExpiresAt && Date.parse(booking.linkExpiresAt) > Date.now() + 60 * 60 * 1000
        ? new Date(booking.linkExpiresAt).toISOString()
        : undefined;

    const link = await createPaymentLink({
      amountCents,
      payerName: booking.customerName,
      merchantReference: booking.reference,
      payerEmailAddress: booking.customerEmail,
      expiresAt,
    });
    const paymentUrl = withRedirect(link.link);

    // Persist the link before emailing: if the email fails we must not create a second link on retry.
    await updateBooking(
      id,
      {
        status: "quoted",
        stitchLinkId: link.id,
        paymentUrl,
        linkExpiresAt: link.expireAt ?? expiresAt,
        quoteSentAt: new Date().toISOString(),
      },
      ["quoteSendingAt", "quoteError"]
    );

    try {
      await sendQuoteEmails(booking, paymentUrl, link.expireAt ?? expiresAt);
    } catch (err) {
      console.error("Quote email failed:", err);
      await updateBooking(id, {
        quoteError: `Payment link created, but the email to the customer failed (${err instanceof Error ? err.message : "unknown error"}). Copy the payment link and send it manually.`,
      });
    }

    return NextResponse.json({ received: true, linkId: link.id });
  } catch (err) {
    console.error("Failed to create payment link:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    // Validation problems won't fix themselves on retry; upstream outages might.
    const retryable = !(err instanceof StitchError) || err.status >= 500;

    // Always release the lock. For permanent errors also clear the request so staff
    // can fix the booking and press the button again; for transient ones keep it so
    // Sanity's automatic retry of this delivery can still go through.
    await updateBooking(
      id,
      { quoteError: retryable ? `${message} (retrying automatically)` : message },
      retryable ? ["quoteSendingAt"] : ["quoteSendingAt", "quoteRequestedAt"]
    ).catch(() => undefined);

    return NextResponse.json({ error: message }, { status: retryable ? 500 : 200 });
  }
}
