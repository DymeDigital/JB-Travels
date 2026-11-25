import { defineField, defineType } from "sanity";
// import {GlobeIcon} from "@sanity/icons";

export default defineType({
    name: "travelPackage",
    title: "Travel Packages",
    type: "document",
    //   icon: GlobeIcon,

    groups: [
        { name: "basic", title: "Basic Information", default: true },
        { name: "pricing", title: "Pricing" },
        { name: "content", title: "Package Content" },
        { name: "gallery", title: "Gallery" },
        { name: "booking", title: "Booking" },
        { name: "seo", title: "SEO" },
    ],

    fields: [

        //---------------------------------------
        // BASIC
        //---------------------------------------

        defineField({
            name: "title",
            title: "Package Name",
            type: "string",
            group: "basic",
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "basic",
            options: {
                source: "title",
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),

        defineField({
            name: "destination",
            title: "Destination",
            type: "string",
            group: "basic",
            options: {
                list: [
                    { title: "Turkey", value: "Turkey" },
                    { title: "India", value: "India" },
                    { title: "Mauritius", value: "Mauritius" },
                    { title: "Thailand", value: "Thailand" },
                    { title: "UAE", value: "UAE" },
                    { title: "Europe", value: "Europe" },
                    { title: "Maldives", value: "Maldives" },
                    { title: "Bali", value: "Bali" },
                    { title: "South Africa", value: "South Africa" }
                ]
            }
        }),

        defineField({
            name: "featured",
            title: "Featured Package",
            type: "boolean",
            initialValue: false,
            group: "basic"
        }),

        defineField({
            name: "active",
            title: "Visible on Website",
            type: "boolean",
            initialValue: true,
            group: "basic"
        }),

        defineField({
            name: "badge",
            title: "Badge",
            type: "string",
            group: "basic",
            options: {
                list: [
                    "Most Popular",
                    "Luxury",
                    "Adventure",
                    "Family",
                    "Romantic",
                    "Honeymoon",
                    "Limited Time",
                    "Early Bird",
                    "Special Offer"
                ]
            }
        }),

        //---------------------------------------
        // PRICING
        //---------------------------------------

        defineField({
            name: "packageType",
            title: "Package Type",
            type: "string",
            group: "pricing",
            options: {
                list: [
                    {
                        title: "Fixed Price",
                        value: "fixed"
                    },
                    {
                        title: "Quotation Required",
                        value: "quote"
                    }
                ]
            },
            initialValue: "fixed"
        }),

        defineField({
            name: "price",
            title: "Price per Person (ZAR)",
            type: "number",
            description: "Starting price per person, in Rand. Enquiries are pre-quoted at this price × travellers; staff confirm the final price and add-ons on the booking before the payment link is sent.",
            hidden: ({ document }) => document?.packageType !== "fixed",
            group: "pricing",
            validation: Rule => Rule.min(1).precision(2).custom((value, context) =>
                context.document?.packageType === "fixed" && !value
                    ? "Fixed-price packages need a price."
                    : true
            )
        }),

        // Stitch only charges in Rand, so all prices are ZAR.
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            initialValue: "ZAR",
            readOnly: true,
            hidden: true,
            group: "pricing"
        }),

        defineField({
            name: "depositAvailable",
            title: "Deposit Available",
            type: "boolean",
            initialValue: false,
            hidden: true, // not used by the site yet; staff send deposits as a line item
            group: "pricing"
        }),

        defineField({
            name: "depositAmount",
            title: "Deposit Amount",
            type: "number",
            hidden: true, // not used by the site yet; staff send deposits as a line item
            group: "pricing"
        }),

        defineField({
            name: "installments",
            title: "Allow Installments",
            type: "boolean",
            initialValue: false,
            hidden: true, // not used by the site yet; staff send deposits as a line item
            group: "pricing"
        }),

        //---------------------------------------
        // CONTENT
        //---------------------------------------

        defineField({
            name: "duration",
            title: "Duration",
            type: "string",
            group: "content",
            description: "Example: 7 Days / 6 Nights"
        }),

        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            rows: 3,
            group: "content"
        }),

        defineField({
            name: "overview",
            title: "Overview",
            type: "array",
            of: [{ type: "block" }],
            group: "content"
        }),

        defineField({
            name: "itinerary",
            title: "Daily Itinerary",
            type: "array",
            group: "content",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "day",
                            title: "Day",
                            type: "string"
                        },
                        {
                            name: "title",
                            title: "Title",
                            type: "string"
                        },
                        {
                            name: "description",
                            title: "Description",
                            type: "text"
                        }
                    ]
                }
            ]
        }),

        defineField({
            name: "includes",
            title: "Package Includes",
            type: "array",
            group: "content",
            of: [{ type: "string" }]
        }),

        defineField({
            name: "excludes",
            title: "Package Excludes",
            type: "array",
            group: "content",
            of: [{ type: "string" }]
        }),

        //---------------------------------------
        // GALLERY
        //---------------------------------------

        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true
            },
            group: "gallery"
        }),

        defineField({
            name: "gallery",
            title: "Gallery",
            type: "array",
            group: "gallery",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true
                    }
                }
            ]
        }),

        //---------------------------------------
        // BOOKING
        //---------------------------------------

        defineField({
            name: "bookingButtonText",
            title: "Button Text",
            type: "string",
            initialValue: "Book Now",
            group: "booking"
        }),

        defineField({
            name: "availableFrom",
            title: "Available From",
            type: "date",
            hidden: true, // not used by the site yet
            group: "booking"
        }),

        defineField({
            name: "availableTo",
            title: "Available To",
            type: "date",
            hidden: true, // not used by the site yet
            group: "booking"
        }),

        //---------------------------------------
        // SEO
        //---------------------------------------

        defineField({
            name: "seoTitle",
            title: "SEO Title",
            type: "string",
            group: "seo"
        }),

        defineField({
            name: "seoDescription",
            title: "SEO Description",
            type: "text",
            rows: 3,
            group: "seo"
        })

    ],

    preview: {
        select: {
            title: "title",
            media: "featuredImage",
            subtitle: "destination"
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: selection.subtitle,
                media: selection.media
            }
        }
    }
});