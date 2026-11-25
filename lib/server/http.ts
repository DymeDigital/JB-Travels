import "server-only";
import https from "https";

// Raw https JSON helper. The existing routes avoid Next's patched fetch for
// outbound calls from route handlers, so third-party API calls go through this too.
export type JsonResponse<T = unknown> = { status: number; body: T };

export function requestJson<T = unknown>(
  url: string,
  {
    method = "GET",
    headers = {},
    body,
  }: { method?: string; headers?: Record<string, string>; body?: unknown } = {}
): Promise<JsonResponse<T>> {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, search } = new URL(url);
    const payload = body === undefined ? undefined : JSON.stringify(body);

    const req = https.request(
      {
        hostname,
        path: pathname + search,
        method,
        headers: {
          Accept: "application/json",
          ...(payload
            ? { "Content-Type": "application/json", "Content-Length": String(Buffer.byteLength(payload)) }
            : {}),
          ...headers,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          let parsed: unknown = data;
          try {
            parsed = data ? JSON.parse(data) : null;
          } catch {
            // leave as raw text
          }
          resolve({ status: res.statusCode ?? 0, body: parsed as T });
        });
      }
    );

    req.on("error", reject);
    req.setTimeout(20_000, () => req.destroy(new Error(`Request to ${hostname} timed out`)));
    if (payload) req.write(payload);
    req.end();
  });
}
