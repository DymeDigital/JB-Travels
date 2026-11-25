import "server-only";
import type { EnquiryDetails } from "./bookings";
import {
  BUDGETS, CABIN_CLASSES, CONTACT_METHODS, CONTACT_TIMES, DATE_FLEXIBILITY, DEPARTURE_CITIES,
  DIETARY, formatTravellers, formatTravelSummary, HOTEL_STANDARDS, isOption, labelOf, labelsOf,
  LIMITS, OCCASIONS, SERVICES, type Option,
} from "@/lib/enquiryOptions";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) || undefined : undefined);

const intIn = (v: unknown, { min, max }: { min: number; max: number }) =>
  Number.isInteger(v) && (v as number) >= min && (v as number) <= max ? (v as number) : undefined;

const oneOf = (list: Option[], v: unknown) => (isOption(list, v) ? v : undefined);

const manyOf = (list: Option[], v: unknown) => {
  if (!Array.isArray(v)) return undefined;
  const picked = [...new Set(v.filter((x) => isOption(list, x)))] as string[];
  return picked.length ? picked : undefined;
};

/** "2027-03-12" within the next 3 years, else undefined. */
function futureDate(v: unknown): string | undefined {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
  const t = Date.parse(`${v}T00:00:00Z`);
  const yesterday = Date.now() - 24 * 60 * 60 * 1000;
  return Number.isFinite(t) && t >= yesterday && t <= Date.now() + 3 * 365 * 24 * 60 * 60 * 1000 ? v : undefined;
}

/**
 * Validates the optional package-enquiry fields against the shared option
 * lists. Anything unexpected is dropped rather than rejected, so an odd
 * value never costs us the lead.
 */
export function parseEnquiryDetails(body: Record<string, unknown>): EnquiryDetails {
  const children = intIn(body.children, LIMITS.children);
  const childAges = Array.isArray(body.childAges)
    ? body.childAges.map((a) => intIn(a, LIMITS.childAge)).filter((a): a is number => a !== undefined).slice(0, children ?? 0)
    : undefined;

  // A known airport code, or whatever city the customer typed under "Other".
  const departureCity =
    isOption(DEPARTURE_CITIES, body.departureCity) && body.departureCity !== "other"
      ? body.departureCity
      : str(body.departureCityOther, 100);

  const servicesRequested = manyOf(SERVICES, body.servicesRequested);

  return {
    departureDate: futureDate(body.departureDate),
    dateFlexibility: oneOf(DATE_FLEXIBILITY, body.dateFlexibility),
    nights: intIn(body.nights, LIMITS.nights),
    departureCity,
    adults: intIn(body.adults, LIMITS.adults),
    children: children || undefined,
    childAges: childAges?.length ? childAges : undefined,
    infants: intIn(body.infants, LIMITS.infants) || undefined,
    rooms: intIn(body.rooms, LIMITS.rooms),
    servicesRequested,
    cabinClass: servicesRequested?.includes("flights") ? oneOf(CABIN_CLASSES, body.cabinClass) : undefined,
    passportNationality: servicesRequested?.includes("visa") ? str(body.passportNationality, 100) : undefined,
    occasion: oneOf(OCCASIONS, body.occasion),
    hotelStandard: oneOf(HOTEL_STANDARDS, body.hotelStandard),
    budget: oneOf(BUDGETS, body.budget),
    dietary: manyOf(DIETARY, body.dietary),
    dietaryNotes: str(body.dietaryNotes, 500),
    accessibilityNeeds: str(body.accessibilityNeeds, 500),
    contactMethod: oneOf(CONTACT_METHODS, body.contactMethod),
    contactTime: oneOf(CONTACT_TIMES, body.contactTime),
  };
}

export const totalTravellers = (d: EnquiryDetails) =>
  d.adults ? d.adults + (d.children ?? 0) + (d.infants ?? 0) : undefined;

/** People who pay the per-person package price (infants are priced separately by staff). */
export const payingTravellers = (d: EnquiryDetails) => (d.adults ? d.adults + (d.children ?? 0) : undefined);

export const travelSummary = (d: EnquiryDetails) => formatTravelSummary(d) || undefined;

/** Label/value rows for the team email. Only fields the customer filled in. */
export function enquiryDetailRows(d: EnquiryDetails): [string, string][] {
  const services = (d.servicesRequested ?? []).map((s) => {
    const label = labelOf(SERVICES, s)!;
    if (s === "flights" && d.cabinClass) return `${label} (${labelOf(CABIN_CLASSES, d.cabinClass)})`;
    if (s === "visa" && d.passportNationality) return `${label} (${d.passportNationality} passport)`;
    return label;
  });
  const dietary = [...labelsOf(DIETARY, d.dietary), d.dietaryNotes].filter(Boolean).join(" — ");
  const contact = [labelOf(CONTACT_METHODS, d.contactMethod), labelOf(CONTACT_TIMES, d.contactTime)?.toLowerCase()]
    .filter(Boolean)
    .join(", ");

  const rows: [string, string | undefined][] = [
    ["Travellers:", formatTravellers(d) || undefined],
    ["Departure:", travelSummary(d)],
    ["Rooms:", d.rooms ? String(d.rooms) : undefined],
    ["Services:", services.join(", ") || undefined],
    ["Occasion:", labelOf(OCCASIONS, d.occasion)],
    ["Hotel:", labelOf(HOTEL_STANDARDS, d.hotelStandard)],
    ["Budget:", labelOf(BUDGETS, d.budget)],
    ["Dietary:", dietary || undefined],
    ["Accessibility:", d.accessibilityNeeds],
    ["Contact via:", contact || undefined],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}
