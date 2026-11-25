// Shared by the Studio (initial value) and server routes.
// Format: JB-YYMMDD-XXXX — valid as a Stitch merchantReference (alphanumerics + hyphens, <= 50 chars).
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion on the phone

export function generateBookingReference(date = new Date()): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `JB-${yy}${mm}${dd}-${suffix}`;
}
