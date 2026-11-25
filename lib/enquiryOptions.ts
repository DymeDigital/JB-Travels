// Single source for the package enquiry form's choices. Used by the form,
// /api/enquire (allow-list validation), the Sanity booking schema and emails.
// Kept free of server-only imports so Sanity Studio can bundle it.

export type Option = { value: string; label: string };

export const DEPARTURE_CITIES: Option[] = [
  { value: "JNB", label: "Johannesburg (JNB)" },
  { value: "CPT", label: "Cape Town (CPT)" },
  { value: "DUR", label: "Durban (DUR)" },
  { value: "PLZ", label: "Gqeberha (PLZ)" },
  { value: "other", label: "Other" },
];

export const DATE_FLEXIBILITY: Option[] = [
  { value: "exact", label: "Exact dates" },
  { value: "3days", label: "± 3 days" },
  { value: "1week", label: "± 1 week" },
  { value: "month", label: "Any time that month" },
];

export const SERVICES: Option[] = [
  { value: "flights", label: "Flights" },
  { value: "visa", label: "Visa assistance" },
  { value: "insurance", label: "Travel insurance" },
  { value: "transfers", label: "Airport transfers" },
  { value: "excursions", label: "Guided tours & excursions" },
];

export const CABIN_CLASSES: Option[] = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium Economy" },
  { value: "business", label: "Business" },
];

export const OCCASIONS: Option[] = [
  { value: "holiday", label: "Holiday" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "anniversary", label: "Anniversary" },
  { value: "birthday", label: "Birthday" },
  { value: "family", label: "Family trip" },
  { value: "group", label: "Group trip" },
  { value: "faith", label: "Faith & heritage tour" },
  { value: "business", label: "Business" },
];

export const HOTEL_STANDARDS: Option[] = [
  { value: "3star", label: "3★" },
  { value: "4star", label: "4★" },
  { value: "5star", label: "5★" },
  { value: "villa", label: "Villa / private" },
  { value: "any", label: "No preference" },
];

export const BUDGETS: Option[] = [
  { value: "u20", label: "Under R20 000 pp" },
  { value: "20-40", label: "R20 000 – R40 000 pp" },
  { value: "40-70", label: "R40 000 – R70 000 pp" },
  { value: "70-100", label: "R70 000 – R100 000 pp" },
  { value: "100plus", label: "R100 000+ pp" },
  { value: "unsure", label: "Not sure yet" },
];

export const DIETARY: Option[] = [
  { value: "halal", label: "Halal" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "kosher", label: "Kosher" },
  { value: "glutenfree", label: "Gluten-free" },
];

export const CONTACT_METHODS: Option[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
];

export const CONTACT_TIMES: Option[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "anytime", label: "Anytime" },
];

export const LIMITS = {
  adults: { min: 1, max: 30 },
  children: { min: 0, max: 10 },
  childAge: { min: 0, max: 17 },
  infants: { min: 0, max: 5 },
  rooms: { min: 1, max: 20 },
  nights: { min: 1, max: 60 },
} as const;

/** For Sanity `options.list`. */
export const toSanityList = (list: Option[]) => list.map(({ value, label }) => ({ value, title: label }));

export const labelOf = (list: Option[], value?: string | null) =>
  value ? list.find((o) => o.value === value)?.label ?? value : undefined;

export const labelsOf = (list: Option[], values?: string[] | null) =>
  (values ?? []).map((v) => labelOf(list, v)).filter(Boolean) as string[];

export const isOption = (list: Option[], value: unknown): value is string =>
  typeof value === "string" && list.some((o) => o.value === value);

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "2 adults, 2 children (ages 6, 9), 1 infant" */
export function formatTravellers(t: { adults?: number; children?: number; childAges?: number[]; infants?: number }) {
  const parts: string[] = [];
  if (t.adults) parts.push(plural(t.adults, "adult", "adults"));
  if (t.children) {
    const ages = t.childAges?.length ? ` (age${t.childAges.length === 1 ? "" : "s"} ${t.childAges.join(", ")})` : "";
    parts.push(plural(t.children, "child", "children") + ages);
  }
  if (t.infants) parts.push(plural(t.infants, "infant", "infants"));
  return parts.join(", ");
}

/** "12 March 2027 (± 3 days), 7 nights, from Johannesburg (JNB)" */
export function formatTravelSummary(t: {
  departureDate?: string;
  dateFlexibility?: string;
  nights?: number;
  departureCity?: string;
}) {
  const parts: string[] = [];
  if (t.departureDate) {
    const date = new Date(`${t.departureDate}T00:00:00Z`);
    const formatted = Number.isNaN(date.getTime())
      ? t.departureDate
      : date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    const flex = t.dateFlexibility && t.dateFlexibility !== "exact" ? ` (${labelOf(DATE_FLEXIBILITY, t.dateFlexibility)})` : "";
    parts.push(formatted + flex);
  }
  if (t.nights) parts.push(plural(t.nights, "night", "nights"));
  if (t.departureCity) parts.push(`from ${labelOf(DEPARTURE_CITIES, t.departureCity)}`);
  return parts.join(", ");
}
