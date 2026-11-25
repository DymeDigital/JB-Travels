// Shared by Studio (live total), the quote webhook (safety check) and quote emails.
// Kept free of server-only imports so Sanity Studio can bundle it.

export type LineItem = {
  _key?: string;
  label?: string;
  quantity?: number;
  unitPrice?: number;
};

export const lineItemTotal = (item: LineItem): number =>
  (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

/** Sum in Rand, rounded to cents to avoid floating-point drift. */
export function sumLineItems(items: LineItem[] | undefined | null): number {
  const cents = (items ?? []).reduce((acc, item) => acc + Math.round(lineItemTotal(item) * 100), 0);
  return cents / 100;
}
