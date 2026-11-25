import "server-only";
import type { Booking, QuoteBooking } from "./bookings";
import { lineItemTotal } from "@/lib/lineItems";
import { emailLayout, escapeHtml, FROM_BOOKINGS, formatZar, sendEmail, TEAM_EMAIL } from "./email";

const tripNameOf = (b: Booking) => b.packageTitle || b.packageName || "your trip";

const nl2br = (text: string) => escapeHtml(text).replace(/\r?\n/g, "<br/>");

export async function sendQuoteEmails(booking: QuoteBooking, paymentUrl: string, expiresAt?: string) {
  const tripName = tripNameOf(booking);
  const amount = formatZar(booking.quotedAmount ?? 0);
  const expiry = expiresAt
    ? new Date(expiresAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Johannesburg" })
    : undefined;

  const detailRows = [
    booking.destination && ["Destination", booking.destination],
    booking.travelDates && ["Travel dates", booking.travelDates],
    booking.guests && ["Guests", String(booking.guests)],
    ["Total", amount],
  ].filter(Boolean) as [string, string][];

  const cell = "padding: 8px 10px; border-bottom: 1px solid #f1f5f9; color: #334155;";
  const items = (booking.lineItems ?? []).filter((item) => item.label);
  const itemsTable = items.length
    ? `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
      <tr>
        <th style="${cell} text-align: left; color: #0B3D5B;">Item</th>
        <th style="${cell} text-align: right; color: #0B3D5B; white-space: nowrap;">Qty × Price</th>
        <th style="${cell} text-align: right; color: #0B3D5B;">Amount</th>
      </tr>
      ${items
        .map(
          (item) => `<tr>
            <td style="${cell}">${escapeHtml(item.label ?? "")}</td>
            <td style="${cell} text-align: right; white-space: nowrap;">${Number(item.quantity) || 0} × ${escapeHtml(formatZar(Number(item.unitPrice) || 0))}</td>
            <td style="${cell} text-align: right; white-space: nowrap;">${escapeHtml(formatZar(lineItemTotal(item)))}</td>
          </tr>`
        )
        .join("")}
    </table>`
    : "";

  const table = `${itemsTable}
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      ${detailRows
        .map(
          ([k, v]) => `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B3D5B; width: 140px;">${escapeHtml(k)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${escapeHtml(v)}</td>
          </tr>`
        )
        .join("")}
    </table>`;

  const button = `
    <div style="margin: 28px 0; text-align: center;">
      <a href="${escapeHtml(paymentUrl)}" style="background-color: #D8B15A; color: #0B3D5B; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
        Pay ${amount} securely
      </a>
    </div>`;

  await sendEmail({
    from: FROM_BOOKINGS,
    to: [booking.customerEmail],
    replyTo: TEAM_EMAIL,
    subject: `Your quote for ${tripName} [${booking.reference}]`,
    html: emailLayout(
      "Your Travel Quote",
      `<p>Dear ${escapeHtml(booking.customerName)},</p>
       <p>Thank you for choosing JB Travel. Here is your quote for <strong>${escapeHtml(tripName)}</strong>.</p>
       ${table}
       ${booking.quoteDetails ? `<div style="padding: 16px; background-color: #f8fafc; border-left: 4px solid #D8B15A; border-radius: 4px;">${nl2br(booking.quoteDetails)}</div>` : ""}
       ${button}
       <p style="font-size: 13px; color: #64748b;">Payments are processed securely by Stitch.${expiry ? ` This link is valid until <strong>${escapeHtml(expiry)}</strong>.` : ""} Your booking reference is <strong>${escapeHtml(booking.reference)}</strong>.</p>
       <p>If you have any questions, simply reply to this email.</p>
       <p>Warm regards,<br/>The JB Travel Team</p>`
    ),
  });

  // Team copy is informational — don't fail the quote over it.
  await sendEmail({
    from: FROM_BOOKINGS,
    to: [TEAM_EMAIL],
    replyTo: booking.customerEmail,
    subject: `Quote sent: ${amount} — ${booking.customerName} — ${tripName} [${booking.reference}]`,
    html: emailLayout(
      "Quote Sent",
      `<p>A payment link for <strong>${amount}</strong> was emailed to <strong>${escapeHtml(booking.customerName)}</strong> (${escapeHtml(booking.customerEmail)}).</p>
       ${itemsTable}
       <p>Payment link: <a href="${escapeHtml(paymentUrl)}" style="color: #27C7D9;">${escapeHtml(paymentUrl)}</a></p>
       <p>The booking is now under <strong>Bookings → Awaiting payment</strong> in the Studio.</p>`
    ),
  }).catch((e) => console.error("Team quote copy failed:", e));
}

export async function sendPaidEmails(booking: Booking, amountPaid: number) {
  const tripName = tripNameOf(booking);
  const mismatch =
    booking.quotedAmount && Math.abs(booking.quotedAmount - amountPaid) >= 0.01
      ? `<p style="color:#b91c1c;"><strong>Note:</strong> the amount paid differs from the quoted amount (${formatZar(booking.quotedAmount)}).</p>`
      : "";

  const results = await Promise.allSettled([
    sendEmail({
      from: FROM_BOOKINGS,
      to: [booking.customerEmail],
      replyTo: TEAM_EMAIL,
      subject: `Payment received — ${tripName} [${booking.reference}]`,
      html: emailLayout(
        "Payment Received",
        `<p>Dear ${escapeHtml(booking.customerName)},</p>
         <p>Thank you — we've received your payment of <strong>${formatZar(amountPaid)}</strong> for <strong>${escapeHtml(tripName)}</strong>.</p>
         <p>Your booking reference is <strong>${escapeHtml(booking.reference)}</strong>. Our team will be in touch shortly with your travel documents and next steps.</p>
         <p>Warm regards,<br/>The JB Travel Team</p>`
      ),
    }),
    sendEmail({
      from: FROM_BOOKINGS,
      to: [TEAM_EMAIL],
      replyTo: booking.customerEmail,
      subject: `PAID: ${formatZar(amountPaid)} — ${booking.customerName} — ${tripName} [${booking.reference}]`,
      html: emailLayout(
        "Booking Paid",
        `<p><strong>${escapeHtml(booking.customerName)}</strong> (${escapeHtml(booking.customerEmail)}) has paid <strong>${formatZar(amountPaid)}</strong> for <strong>${escapeHtml(tripName)}</strong>.</p>
         ${mismatch}
         <p>Reference: <strong>${escapeHtml(booking.reference)}</strong></p>
         <p>The booking has been moved to <strong>Bookings → Paid</strong> in the Studio.</p>`
      ),
    }),
  ]);

  // Booking is already marked paid — don't fail the caller over an email hiccup.
  results.forEach((r) => r.status === "rejected" && console.error("Paid email failed:", r.reason));
}
