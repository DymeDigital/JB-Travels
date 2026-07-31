import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "JB Travels — Luxury Journeys, Extraordinary Destinations",
  description:
    "JB Travels crafts bespoke luxury travel experiences to the world's most extraordinary destinations. Overwater villas, private safaris, and curated escapes — all personally designed for you.",
  keywords: [
    "luxury travel",
    "luxury holidays",
    "bespoke travel",
    "Maldives",
    "Santorini",
    "Bali",
    "Swiss Alps",
    "travel agency",
    "premium vacation",
    "JB Travels",
  ],
  openGraph: {
    title: "JB Travels — Luxury Journeys, Extraordinary Destinations",
    description:
      "Bespoke luxury travel experiences crafted by passionate travel experts.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za",
  },
  twitter: {
    card: "summary_large_image",
    title: "JB Travels — Luxury Journeys",
    description:
      "Bespoke luxury travel experiences curated for unforgettable moments.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za",
  },
};

export default function Home() {
  return <HomeClient />;
}
