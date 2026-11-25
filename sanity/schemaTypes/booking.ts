import { defineField, defineType } from "sanity";
import { generateBookingReference } from "../../lib/bookingReference";
import { QuoteTotalInput } from "../components/QuoteTotalInput";
import {
    BUDGETS, CABIN_CLASSES, CONTACT_METHODS, CONTACT_TIMES, DATE_FLEXIBILITY, DEPARTURE_CITIES,
    DIETARY, HOTEL_STANDARDS, LIMITS, OCCASIONS, SERVICES, toSanityList
} from "../../lib/enquiryOptions";

export const BOOKING_STATUSES = [
    { title: "New enquiry", value: "enquiry" },
    { title: "Quote sent — awaiting payment", value: "quoted" },
    { title: "Paid", value: "paid" },
    { title: "Expired", value: "expired" },
    { title: "Cancelled", value: "cancelled" },
] as const;

export default defineType({
    name: "booking",
    title: "Bookings",
    type: "document",

    groups: [
        { name: "customer", title: "Customer", default: true },
        { name: "trip", title: "Trip" },
        { name: "preferences", title: "Services & Preferences" },
        { name: "payment", title: "Quote & Payment" },
    ],

    fields: [

        //---------------------------------------
        // CUSTOMER
        //---------------------------------------

        defineField({
            name: "reference",
            title: "Booking Reference",
            type: "string",
            group: "customer",
            readOnly: true,
            initialValue: () => generateBookingReference(),
            description: "Quote this reference in all emails. Also shown on the Stitch payment.",
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "status",
            title: "Status",
            type: "string",
            group: "customer",
            initialValue: "enquiry",
            options: { list: [...BOOKING_STATUSES], layout: "radio" },
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            group: "customer",
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "string",
            group: "customer",
            validation: Rule => Rule.required().email()
        }),

        defineField({
            name: "customerPhone",
            title: "Customer Phone",
            type: "string",
            group: "customer"
        }),

        defineField({
            name: "contactMethod",
            title: "Preferred Contact Method",
            type: "string",
            group: "customer",
            options: { list: toSanityList(CONTACT_METHODS), layout: "radio", direction: "horizontal" }
        }),

        defineField({
            name: "contactTime",
            title: "Best Time to Contact",
            type: "string",
            group: "customer",
            options: { list: toSanityList(CONTACT_TIMES), layout: "radio", direction: "horizontal" }
        }),

        defineField({
            name: "source",
            title: "Source",
            type: "string",
            group: "customer",
            readOnly: true,
            initialValue: "manual",
            options: {
                list: [
                    { title: "Website enquiry", value: "enquiry" },
                    { title: "Added manually", value: "manual" }
                ]
            }
        }),

        //---------------------------------------
        // TRIP
        //---------------------------------------

        defineField({
            name: "package",
            title: "Package",
            type: "reference",
            group: "trip",
            to: [{ type: "travelPackage" }],
            description: "Leave empty for general / custom enquiries."
        }),

        defineField({
            name: "packageName",
            title: "Package / Enquiry Name",
            type: "string",
            group: "trip",
            description: "What the customer enquired about, as submitted on the website."
        }),

        defineField({
            name: "destination",
            title: "Destination",
            type: "string",
            group: "trip"
        }),

        defineField({
            name: "travelDates",
            title: "Preferred Travel Dates",
            type: "string",
            group: "trip"
        }),

        defineField({
            name: "departureDate",
            title: "Departure Date",
            type: "date",
            group: "trip"
        }),

        defineField({
            name: "dateFlexibility",
            title: "Date Flexibility",
            type: "string",
            group: "trip",
            options: { list: toSanityList(DATE_FLEXIBILITY) }
        }),

        defineField({
            name: "nights",
            title: "Nights",
            type: "number",
            group: "trip",
            validation: Rule => Rule.min(LIMITS.nights.min).max(LIMITS.nights.max).integer()
        }),

        defineField({
            name: "departureCity",
            title: "Departing From",
            type: "string",
            group: "trip",
            description: "Airport code, or the city the customer typed in.",
            options: { list: toSanityList(DEPARTURE_CITIES.filter(c => c.value !== "other")) }
        }),

        defineField({
            name: "adults",
            title: "Adults",
            type: "number",
            group: "trip",
            validation: Rule => Rule.min(0).max(LIMITS.adults.max).integer()
        }),

        defineField({
            name: "children",
            title: "Children (2–17)",
            type: "number",
            group: "trip",
            validation: Rule => Rule.min(0).max(LIMITS.children.max).integer()
        }),

        defineField({
            name: "childAges",
            title: "Children's Ages",
            type: "array",
            group: "trip",
            of: [{ type: "number" }],
            hidden: ({ document }) => !document?.children
        }),

        defineField({
            name: "infants",
            title: "Infants (under 2)",
            type: "number",
            group: "trip",
            validation: Rule => Rule.min(0).max(LIMITS.infants.max).integer()
        }),

        defineField({
            name: "guests",
            title: "Total Travellers",
            type: "number",
            group: "trip",
            description: "Adults + children + infants.",
            validation: Rule => Rule.min(1).integer()
        }),

        defineField({
            name: "rooms",
            title: "Rooms Needed",
            type: "number",
            group: "trip",
            validation: Rule => Rule.min(LIMITS.rooms.min).max(LIMITS.rooms.max).integer()
        }),

        //---------------------------------------
        // SERVICES & PREFERENCES
        //---------------------------------------

        defineField({
            name: "servicesRequested",
            title: "Services Requested",
            type: "array",
            group: "preferences",
            of: [{ type: "string" }],
            options: { list: toSanityList(SERVICES) }
        }),

        defineField({
            name: "cabinClass",
            title: "Flight Cabin Class",
            type: "string",
            group: "preferences",
            options: { list: toSanityList(CABIN_CLASSES), layout: "radio", direction: "horizontal" },
            hidden: ({ document }) => !(document?.servicesRequested as string[] | undefined)?.includes("flights")
        }),

        defineField({
            name: "passportNationality",
            title: "Passport Nationality",
            type: "string",
            group: "preferences",
            description: "Needed to check visa requirements.",
            hidden: ({ document }) => !(document?.servicesRequested as string[] | undefined)?.includes("visa")
        }),

        defineField({
            name: "occasion",
            title: "Occasion",
            type: "string",
            group: "preferences",
            options: { list: toSanityList(OCCASIONS) }
        }),

        defineField({
            name: "hotelStandard",
            title: "Hotel Standard",
            type: "string",
            group: "preferences",
            options: { list: toSanityList(HOTEL_STANDARDS) }
        }),

        defineField({
            name: "budget",
            title: "Budget per Person",
            type: "string",
            group: "preferences",
            options: { list: toSanityList(BUDGETS) }
        }),

        defineField({
            name: "dietary",
            title: "Dietary / Religious Needs",
            type: "array",
            group: "preferences",
            of: [{ type: "string" }],
            options: { list: toSanityList(DIETARY) }
        }),

        defineField({
            name: "dietaryNotes",
            title: "Dietary Notes",
            type: "text",
            rows: 2,
            group: "preferences"
        }),

        defineField({
            name: "accessibilityNeeds",
            title: "Accessibility / Mobility Needs",
            type: "text",
            rows: 2,
            group: "preferences"
        }),

        defineField({
            name: "message",
            title: "Customer Message",
            type: "text",
            rows: 5,
            group: "trip"
        }),

        defineField({
            name: "internalNotes",
            title: "Internal Notes",
            type: "text",
            rows: 4,
            group: "trip",
            description: "Private — never shown to the customer."
        }),

        //---------------------------------------
        // QUOTE & PAYMENT
        //---------------------------------------

        defineField({
            name: "lineItems",
            title: "Quote Line Items",
            type: "array",
            group: "payment",
            description: "Package, flights, visas, insurance, transfers, excursions, discounts… The total below is calculated from these. Leave empty to type a total by hand.",
            of: [
                {
                    type: "object",
                    name: "lineItem",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Item",
                            type: "string",
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity",
                            type: "number",
                            initialValue: 1,
                            validation: Rule => Rule.required().min(1).integer()
                        }),
                        defineField({
                            name: "unitPrice",
                            title: "Unit Price (ZAR)",
                            type: "number",
                            description: "Use a negative amount for a discount.",
                            validation: Rule => Rule.required().precision(2)
                        })
                    ],
                    preview: {
                        select: { label: "label", quantity: "quantity", unitPrice: "unitPrice" },
                        prepare({ label, quantity, unitPrice }) {
                            const qty = Number(quantity) || 0;
                            const unit = Number(unitPrice) || 0;
                            const fmt = (n: number) => `R${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            return {
                                title: label ?? "Untitled item",
                                subtitle: `${qty} × ${fmt(unit)} = ${fmt(qty * unit)}`
                            };
                        }
                    }
                }
            ]
        }),

        defineField({
            name: "quotedAmount",
            title: "Quoted Amount (ZAR)",
            type: "number",
            group: "payment",
            description: "Total the customer will pay, in Rand.",
            components: { input: QuoteTotalInput },
            validation: Rule => Rule.min(1).precision(2)
        }),

        defineField({
            name: "quoteDetails",
            title: "Quote Details for Customer",
            type: "text",
            rows: 6,
            group: "payment",
            description: "Included in the quote email — e.g. what the price covers."
        }),

        defineField({
            name: "linkExpiresAt",
            title: "Payment Link Expires",
            type: "datetime",
            group: "payment",
            description: "Defaults to 30 days if left empty."
        }),

        defineField({
            name: "quoteError",
            title: "Problem Sending Quote",
            type: "string",
            group: "payment",
            readOnly: true,
            hidden: ({ value }) => !value,
            description: "Fix the issue above, publish, then use “Send payment link” again."
        }),

        defineField({
            name: "quoteRequestedAt",
            title: "Quote Requested",
            type: "datetime",
            group: "payment",
            readOnly: true,
            hidden: true
        }),

        defineField({
            name: "quoteSendingAt",
            title: "Quote Sending",
            type: "datetime",
            group: "payment",
            readOnly: true,
            hidden: true
        }),

        defineField({
            name: "quoteSentAt",
            title: "Quote Sent",
            type: "datetime",
            group: "payment",
            readOnly: true,
            hidden: ({ value }) => !value
        }),

        defineField({
            name: "paymentUrl",
            title: "Payment Link",
            type: "url",
            group: "payment",
            readOnly: true
        }),

        defineField({
            name: "stitchLinkId",
            title: "Stitch Link ID",
            type: "string",
            group: "payment",
            readOnly: true
        }),

        defineField({
            name: "stitchPaymentId",
            title: "Stitch Payment ID",
            type: "string",
            group: "payment",
            readOnly: true
        }),

        defineField({
            name: "amountPaid",
            title: "Amount Paid (ZAR)",
            type: "number",
            group: "payment",
            readOnly: true
        }),

        defineField({
            name: "paidAt",
            title: "Paid At",
            type: "datetime",
            group: "payment",
            readOnly: true
        })

    ],

    orderings: [
        { title: "Newest first", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] }
    ],

    preview: {
        select: {
            reference: "reference",
            name: "customerName",
            packageTitle: "package.title",
            packageName: "packageName",
            status: "status",
            amount: "quotedAmount"
        },
        prepare({ reference, name, packageTitle, packageName, status, amount }) {
            const statusLabel = BOOKING_STATUSES.find(s => s.value === status)?.title ?? status;
            const price = amount ? ` · R${Number(amount).toLocaleString("en-ZA")}` : "";
            return {
                title: `${name ?? "Unknown"} — ${packageTitle ?? packageName ?? "General enquiry"}`,
                subtitle: `${reference ?? ""} · ${statusLabel}${price}`
            };
        }
    }
});
