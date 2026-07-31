import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import WorldMap from "@/components/sections/WorldMap";
import BookingCTA from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Our Services — JB Travels | Flights, Visas, Tours & More",
  description:
    "JB Travels offers comprehensive travel services including flight bookings, visa assistance, tailor-made holiday packages, travel insurance, accommodation, faith & heritage tours, group travel, and guided excursions.",
  keywords: [
    "travel services",
    "flight bookings",
    "visa assistance",
    "travel insurance",
    "holiday packages",
    "guided tours",
    "group travel",
    "honeymoon packages",
    "faith tours",
    "JB Travels services",
  ],
  openGraph: {
    title: "Our Services — JB Travels",
    description:
      "Everything you need for a seamless journey — flights, visas, accommodation, tours, and more.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services — JB Travels",
    description:
      "Comprehensive travel services from flight bookings to guided tours.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za/services",
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <WorldMap />
      <BookingCTA />
    </PageShell>
  );
}
