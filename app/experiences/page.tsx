import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Gallery from "@/components/sections/Gallery";
import WorldMap from "@/components/sections/WorldMap";
import BookingCTA from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Luxury Travel Experiences — JB Travels",
  description:
    "Explore unforgettable luxury travel experiences — from stunning gallery destinations to guided tours, honeymoon escapes, and faith heritage journeys. See the world through JB Travels.",
  keywords: [
    "luxury travel experiences",
    "travel gallery",
    "guided tours",
    "honeymoon holidays",
    "faith tours",
    "heritage travel",
    "luxury escapes",
    "JB Travels experiences",
  ],
  openGraph: {
    title: "Luxury Travel Experiences — JB Travels",
    description:
      "Visual inspiration and curated experiences from the world's most extraordinary destinations.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za/experiences",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Travel Experiences — JB Travels",
    description:
      "Discover extraordinary travel experiences curated by JB Travels.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za/experiences",
  },
};

export default function ExperiencesPage() {
  return (
    <PageShell>
      <Gallery />
      <WorldMap />
      <BookingCTA />
    </PageShell>
  );
}
