import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Destinations from "@/components/sections/Destinations";
import BookingCTA from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Luxury Travel Packages — JB Travels",
  description:
    "Browse our handpicked luxury travel packages to Europe, Bali, India, Turkey, Mauritius, Egypt and more. Each itinerary is personally curated for unforgettable experiences.",
  keywords: [
    "luxury travel packages",
    "holiday packages",
    "Europe travel",
    "Bali holiday",
    "India tour",
    "Turkey travel",
    "Mauritius vacation",
    "Egypt tour",
    "JB Travels packages",
  ],
  openGraph: {
    title: "Luxury Travel Packages — JB Travels",
    description:
      "Handpicked destinations offering unrivalled beauty, culture, and luxury experiences for the discerning traveler.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za/packages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Travel Packages — JB Travels",
    description:
      "Handpicked luxury destinations curated for unforgettable travel experiences.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za/packages",
  },
};

export default function PackagesPage() {
  return (
    <PageShell>
      <Destinations />
      <BookingCTA />
    </PageShell>
  );
}
