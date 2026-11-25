import "server-only";
import { requestJson } from "./http";

export const TEAM_EMAIL = "brandon@jbtravel.co.za";
export const FROM_BOOKINGS = "JB Travel Bookings <info@jbtravel.co.za>";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatZar(amount: number): string {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);
}

type SendEmailInput = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ from, to, subject, html, replyTo }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");

  const res = await requestJson<{ id?: string; message?: string; name?: string } | null>("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: { from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) },
  });

  if (res.status !== 200) {
    throw new Error(res.body?.message || res.body?.name || `Resend returned ${res.status}`);
  }
  return { id: res.body?.id ?? "" };
}

/** Branded wrapper matching the existing enquiry emails. `inner` must already be escaped. */
export function emailLayout(heading: string, inner: string, footer = "JB Travel"): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0;">
      <div style="background-color: #0B3D5B; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: #D8B15A; margin: 0; font-size: 24px;">${heading}</h2>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #1e293b; font-size: 15px; line-height: 1.6;">
        ${inner}
      </div>
      <div style="padding: 16px; text-align: center; background-color: #f1f5f9; border-radius: 0 0 8px 8px; font-size: 12px; color: #64748b;">
        ${footer}
      </div>
    </div>
  `;
}
