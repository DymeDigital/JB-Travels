// One-time Stitch Express setup: registers the webhook endpoint and the
// post-payment redirect URL for this site.
//
// Usage:  node --env-file=.env.local scripts/stitch-setup.mjs https://www.jbtravel.co.za
//
// The webhook signing secret is printed ONCE — copy it into STITCH_WEBHOOK_SECRET.
// Run once per environment (test credentials and live credentials are separate accounts).

const BASE = "https://express.stitch.money";
const site = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

if (!/^https:\/\//.test(site)) {
  console.error("Pass the public https site URL, e.g. node --env-file=.env.local scripts/stitch-setup.mjs https://www.jbtravel.co.za");
  process.exit(1);
}
const { STITCH_CLIENT_ID: clientId, STITCH_CLIENT_SECRET: clientSecret } = process.env;
if (!clientId || !clientSecret) {
  console.error("STITCH_CLIENT_ID and STITCH_CLIENT_SECRET must be set.");
  process.exit(1);
}

async function call(path, { method = "GET", body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, json };
}

const tokenRes = await call("/api/v1/token", { method: "POST", body: { clientId, clientSecret } });
const token = tokenRes.json?.data?.accessToken;
if (!token) {
  console.error("Could not get a token:", tokenRes.status, tokenRes.json);
  process.exit(1);
}
console.log(`Authenticated (${clientId.startsWith("test-") ? "TEST" : "LIVE"} account)\n`);

// Webhook
const webhookUrl = `${site}/api/webhooks/stitch`;
const wh = await call("/api/v1/webhook", { method: "POST", token, body: { url: webhookUrl } });
if (wh.status === 200) {
  console.log(`Webhook registered: ${webhookUrl}`);
  console.log(`\n  STITCH_WEBHOOK_SECRET=${wh.json.data.secret}\n`);
  console.log("  ^ Save this now — Stitch will not show it again.\n");
} else if (wh.status === 409) {
  console.log(`Webhook already registered: ${webhookUrl}`);
  console.log("  (To get a new secret, delete it in the Stitch dashboard → Webhooks and re-run.)\n");
} else {
  console.error("Webhook registration failed:", wh.status, wh.json);
}

// Redirect URL
const redirectUrl = `${site}/booking/complete`;
const existing = await call("/api/v1/redirect-urls", { token });
const urls = existing.json?.data?.redirectUrls ?? [];
if (urls.includes(redirectUrl)) {
  console.log(`Redirect URL already registered: ${redirectUrl}`);
} else {
  const r = await call("/api/v1/redirect-urls", { method: "POST", token, body: { redirectUrl } });
  if (r.status === 200) console.log(`Redirect URL registered: ${redirectUrl}`);
  else console.error("Redirect URL registration failed:", r.status, r.json);
}
