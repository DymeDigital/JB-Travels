import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import Testimonials from "@/components/sections/Testimonials";
import BookingCTA from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Traveler Testimonials — JB Travels | Real Reviews",
  description:
    "Read real reviews from JB Travels customers. Discover why travelers trust us for luxury holidays to Europe, Bali, India, Turkey, and beyond. 4.9/5 rated travel agency.",
  keywords: [
    "JB Travels reviews",
    "travel testimonials",
    "luxury travel reviews",
    "customer reviews",
    "travel agency ratings",
    "JB Travels feedback",
  ],
  openGraph: {
    title: "Traveler Testimonials — JB Travels",
    description:
      "Real stories from real travelers. See why JB Travels is rated 4.9/5 for luxury travel experiences.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za/testimonials",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveler Testimonials — JB Travels",
    description:
      "Read what our travelers say about their luxury travel experiences with JB Travels.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <PageShell>
      <Testimonials />
      <BookingCTA />
    </PageShell>
  );
}
