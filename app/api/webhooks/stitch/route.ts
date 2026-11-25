import { NextResponse } from "next/server";
import { Webhook, WebhookVerificationError } from "svix";
import { findBookingByLinkId, recordPayment } from "@/lib/server/bookings";
import { emailLayout, escapeHtml, FROM_BOOKINGS, formatZar, sendEmail, TEAM_EMAIL } from "@/lib/server/email";
import type { StitchPaymentPaidEvent } from "@/lib/server/stitch";

// Stitch Express sends a single event type, `payment.paid`, signed by Svix.
// Any non-2xx response is retried for ~24h, so this handler must be idempotent.
export async function POST(request: Request) {
  const secret = process.env.STITCH_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STITCH_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // Signature is computed over the exact raw body — never re-serialise before verifying.
  const rawBody = await request.text();
  const headers = {
    "svix-id": request.headers.get("svix-id") ?? "",
    "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
    "svix-signature": request.headers.get("svix-signature") ?? "",
  };

  let event: StitchPaymentPaidEvent;
  try {
    // svix v2: verify() throws on a bad signature and returns nothing, so parse afterwards.
    new Webhook(secret).verify(rawBody, headers);
    event = JSON.parse(rawBody) as StitchPaymentPaidEvent;
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    throw err;
  }

  if (event.status !== "PAID" || event.type !== "LINK" || !event.linkId) {
    // Not something this site creates (consents, terminals, subscriptions). Acknowledge and ignore.
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    const booking = await findBookingByLinkId(event.linkId);
    if (!booking) {
      // Could be a link created manually in the Stitch dashboard. Alert the team, but ack.
      console.warn(`Stitch payment ${event.id} for unknown link ${event.linkId}`);
      await sendEmail({
        from: FROM_BOOKINGS,
        to: [TEAM_EMAIL],
        subject: `Payment received for an unmatched Stitch link (${formatZar(event.amount / 100)})`,
        html: emailLayout(
          "Unmatched Payment",
          `<p>Stitch reported a payment of <strong>${formatZar(event.amount / 100)}</strong> that doesn't match any booking on the website.</p>
           <p>Payment ID: ${escapeHtml(event.id)}<br/>Link ID: ${escapeHtml(event.linkId)}</p>
           <p>Please check the Stitch Express dashboard.</p>`
        ),
      }).catch((e) => console.error("Failed to send unmatched-payment alert:", e));
      return NextResponse.json({ received: true, matched: false });
    }

    const updated = await recordPayment(booking, { paymentId: event.id, amountCents: event.amount });
    return NextResponse.json({ received: true, ...(updated ? {} : { duplicate: true }) });
  } catch (err) {
    console.error("Stitch webhook processing failed:", err);
    // 500 so Stitch retries; markBookingPaid is idempotent.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
