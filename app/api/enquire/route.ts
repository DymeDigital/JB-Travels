import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { createBooking } from "@/lib/server/bookings";
import { enquiryDetailRows, parseEnquiryDetails, payingTravellers, totalTravellers, travelSummary } from "@/lib/server/enquiryDetails";
import { emailLayout, escapeHtml, formatZar, sendEmail, TEAM_EMAIL } from "@/lib/server/email";
import { writeClient } from "@/sanity/lib/writeClient";

type PackageLookup = {
  exists: boolean;
  quote?: number;
  lineItems?: { label: string; quantity: number; unitPrice: number }[];
};

/**
 * Looks up the enquired package. `exists` guards the booking's (strong) package
 * reference. Fixed-price packages also get a starting quote and a first line item
 * (price per person × travellers) that staff can add extras to in Studio.
 */
async function lookupPackage(packageId: string, guests?: number): Promise<PackageLookup> {
  const pkg = await writeClient.fetch<{ title?: string; packageType?: string; price?: number } | null>(
    groq`*[_type == "travelPackage" && _id == $id][0]{ title, packageType, price }`,
    { id: packageId }
  );
  if (!pkg) return { exists: false };
  if (pkg.packageType === "quote" || typeof pkg.price !== "number" || pkg.price <= 0) return { exists: true };
  const quantity = guests ?? 1;
  return {
    exists: true,
    quote: Math.round(pkg.price * quantity * 100) / 100,
    lineItems: [{ label: `${pkg.title ?? "Package"} — per person`, quantity, unitPrice: pkg.price }],
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = str(body.name, 100);
    const email = str(body.email, 200);
    const phone = str(body.phone, 40);
    const packageName = str(body.packageName, 200);
    const country = str(body.country, 200);
    const message = str(body.message, 5000);
    const rawPackageId = str(body.packageId, 100);
    const packageId = /^[\w.-]+$/.test(rawPackageId) ? rawPackageId : undefined;
    const details = parseEnquiryDetails(body);
    // Newer forms send adults/children/infants; the general enquiry form may send a single count.
    const legacyGuests = Number.isInteger(body.guests) && body.guests > 0 && body.guests <= 50 ? body.guests : undefined;
    const guests = totalTravellers(details) ?? legacyGuests;
    const travelDates = travelSummary(details) ?? (str(body.travelDates, 200) || undefined);

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend API key is missing from environment variables.", isConfigError: true },
        { status: 500 }
      );
    }

    // Save the enquiry so it shows up in Studio. If Sanity is unavailable we still
    // email the team rather than losing the lead.
    let reference: string | undefined;
    let quotedAmount: number | undefined;
    try {
      // Fixed-price packages get a pre-filled quote (price per person × travellers).
      // Staff still review it in Studio before clicking "Send payment link".
      const pkg: PackageLookup = packageId
        ? await lookupPackage(packageId, payingTravellers(details) ?? legacyGuests).catch((err) => {
            console.error("Package lookup failed:", err);
            return { exists: false };
          })
        : { exists: false };
      quotedAmount = pkg.quote;
      const booking = await createBooking({
        source: "enquiry",
        customerName: name || email,
        customerEmail: email,
        customerPhone: phone || undefined,
        packageId: pkg.exists ? packageId : undefined,
        quotedAmount,
        lineItems: pkg.lineItems,
        packageName: packageName || undefined,
        destination: country || undefined,
        travelDates,
        guests,
        message: message || undefined,
        ...details,
      });
      reference = booking.reference;
    } catch (err) {
      console.error("Failed to save booking to Sanity:", err);
    }

    const enquiryLabel = packageName ? `${packageName}${country ? ` (${country})` : ""}` : "General Enquiry";
    const subject = `${packageName ? `New Package Enquiry: ${packageName}` : "New General Enquiry"} - ${name || "Client"}${reference ? ` [${reference}]` : ""}`;

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B3D5B; width: 140px;">${label}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${value}</td>
      </tr>`;

    const html = emailLayout(
      "JB Travel - Package Enquiry",
      `
        <p>You have received a new luxury travel package enquiry from your website:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          ${reference ? row("Reference:", `<strong>${escapeHtml(reference)}</strong>`) : ""}
          ${row("Enquiry Type:", `<strong>${escapeHtml(enquiryLabel)}</strong>`)}
          ${row("Client Name:", escapeHtml(name || "Not provided"))}
          ${row("Client Email:", `<a href="mailto:${escapeHtml(email)}" style="color: #27C7D9;">${escapeHtml(email)}</a>`)}
          ${row("Phone Number:", escapeHtml(phone || "Not provided"))}
          ${details.adults ? "" : travelDates ? row("Travel Dates:", escapeHtml(travelDates)) : ""}
          ${details.adults ? "" : guests ? row("Guests:", String(guests)) : ""}
          ${enquiryDetailRows(details).map(([label, value]) => row(label, escapeHtml(value))).join("")}
          ${quotedAmount ? row("Package Price:", `${escapeHtml(formatZar(quotedAmount))} <span style="color:#6B7280;">(pre-filled — check before sending)</span>`) : ""}
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #D8B15A; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #0B3D5B;">Message / Travel Preferences:</p>
          <p style="margin: 0; color: #475569; white-space: pre-wrap; font-size: 14px;">${escapeHtml(message || "No additional message.")}</p>
        </div>
        <p style="margin-top: 20px; font-size: 14px; color: #475569;">
          ${reference ? "This enquiry has been saved under <strong>Bookings → New enquiries</strong> in the Studio. Add a quoted amount there to send the customer a payment link." : "<strong>Note:</strong> this enquiry could not be saved to the Studio — please add it manually."}
        </p>
        <div style="margin-top: 28px; text-align: center;">
          <a href="mailto:${escapeHtml(email)}" style="background-color: #0B3D5B; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
            Reply Directly to Client (${escapeHtml(email)})
          </a>
        </div>
      `,
      "Sent via JB Travel Website Enquiry System"
    );

    const result = await sendEmail({
      from: "JB Travel Enquiries <info@jbtravel.co.za>",
      to: [TEAM_EMAIL],
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true, id: result.id, reference });
  } catch (error) {
    console.error("Enquiry error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
