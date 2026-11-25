import "server-only";
import { requestJson } from "./http";

// Stitch Express API — https://express.stitch.money/api-docs
// Amounts are always integer South African cents.
const BASE_URL = "https://express.stitch.money";

export type StitchPaymentLinkStatus = "PENDING" | "EXPIRED" | "PAID" | "CANCELLED";

export type StitchPaymentLink = {
  id: string;
  paymentId: string | null;
  amount: number;
  status: StitchPaymentLinkStatus;
  link: string;
  merchantReference: string;
  payerName: string;
  payerEmailAddress?: string;
  expireAt?: string;
  paidAt?: string;
  createdAt?: string;
};

export type StitchPaymentPaidEvent = {
  id: string; // payment id
  status: "PAID";
  amount: number; // cents
  type: "LINK" | "CONSENT" | "SUBSCRIPTION" | "TERMINAL";
  linkId: string | null;
  consentId: string | null;
  subscriptionId: string | null;
  terminalSessionId: string | null;
};

export class StitchError extends Error {
  constructor(message: string, public status: number, public body?: unknown) {
    super(message);
    this.name = "StitchError";
  }
}

// Tokens live 15 minutes; cache per server instance and refresh a minute early.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const clientId = process.env.STITCH_CLIENT_ID;
  const clientSecret = process.env.STITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new StitchError("STITCH_CLIENT_ID / STITCH_CLIENT_SECRET are not set.", 500);
  }

  const res = await requestJson<{ data?: { accessToken?: string } } | null>(`${BASE_URL}/api/v1/token`, {
    method: "POST",
    body: { clientId, clientSecret, scope: "client_paymentrequest" },
  });

  const token = res.body?.data?.accessToken;
  if (res.status !== 200 || !token) {
    throw new StitchError(errorMessage(res.body, "Failed to obtain Stitch access token"), res.status, res.body);
  }

  cachedToken = { value: token, expiresAt: Date.now() + 14 * 60 * 1000 };
  return token;
}

async function stitchRequest<T>(path: string, init: { method?: string; body?: unknown } = {}, retried = false): Promise<T> {
  const token = await getToken();
  const res = await requestJson<{ data?: T } | null>(`${BASE_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}` },
  });

  // Token revoked or expired early — refresh once.
  if ((res.status === 401 || res.status === 403) && !retried) {
    cachedToken = null;
    return stitchRequest<T>(path, init, true);
  }

  if (res.status < 200 || res.status >= 300) {
    throw new StitchError(errorMessage(res.body, `Stitch ${init.method ?? "GET"} ${path} failed`), res.status, res.body);
  }
  return res.body?.data as T;
}

function errorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const b = body as { message?: unknown; error?: unknown; errors?: { message?: unknown }[] };
  const detail = b.message || b.error || b.errors?.[0]?.message;
  return detail ? `${fallback}: ${typeof detail === "string" ? detail : JSON.stringify(detail)}` : fallback;
}

/** Rand → cents, rejecting anything Stitch won't accept. */
export function randToCents(amount: number): number {
  const cents = Math.round(amount * 100);
  if (!Number.isFinite(cents) || cents < 100) {
    throw new StitchError("Payment amount must be at least R1.00.", 400);
  }
  return cents;
}

/** Stitch requires 3–40 characters. */
function normalisePayerName(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, " ").slice(0, 40);
  return trimmed.length >= 3 ? trimmed : "JB Travel Guest";
}

export type CreatePaymentLinkInput = {
  amountCents: number;
  payerName: string;
  merchantReference: string;
  payerEmailAddress?: string;
  payerPhoneNumber?: string;
  expiresAt?: string; // ISO 8601, must be in the future; Stitch defaults to 30 days
};

export async function createPaymentLink(input: CreatePaymentLinkInput): Promise<StitchPaymentLink> {
  const data = await stitchRequest<{ payment: StitchPaymentLink }>("/api/v1/payment-links", {
    method: "POST",
    body: {
      amount: input.amountCents,
      payerName: normalisePayerName(input.payerName),
      merchantReference: input.merchantReference.slice(0, 50),
      ...(input.payerEmailAddress ? { payerEmailAddress: input.payerEmailAddress } : {}),
      ...(input.payerPhoneNumber ? { payerPhoneNumber: input.payerPhoneNumber } : {}),
      ...(input.expiresAt ? { expiresAt: input.expiresAt } : {}),
    },
  });
  return data.payment;
}

export async function getPaymentLink(id: string): Promise<StitchPaymentLink> {
  const data = await stitchRequest<{ payment: StitchPaymentLink }>(`/api/v1/payment-links/${encodeURIComponent(id)}`);
  return data.payment;
}

/**
 * Append the post-payment redirect. The URL must be registered with Stitch first
 * (see scripts/stitch-setup.mjs). Stitch adds `reference` and `payment_id` to the callback.
 */
export function withRedirect(link: string, redirectUrl = defaultRedirectUrl()): string {
  if (!redirectUrl) return link;
  const url = new URL(link);
  url.searchParams.set("redirect_url", redirectUrl);
  return url.toString();
}

function defaultRedirectUrl(): string | undefined {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  return site ? `${site.replace(/\/$/, "")}/booking/complete` : undefined;
}
