import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import BookingCTA from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Contact JB Travels — Start Planning Your Dream Journey",
  description:
    "Get in touch with JB Travels to plan your next luxury holiday. Free consultation, no hidden fees, and fully flexible booking. Call +27 78 668 7659 or enquire online.",
  keywords: [
    "contact JB Travels",
    "travel enquiry",
    "book holiday",
    "travel consultation",
    "plan vacation",
    "JB Travels contact",
  ],
  openGraph: {
    title: "Contact JB Travels — Start Your Journey",
    description:
      "Ready to explore? Contact our expert travel team for a free, no-obligation consultation.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact JB Travels",
    description:
      "Plan your dream luxury holiday with JB Travels. Free consultation available.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za/contact",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <BookingCTA />
    </PageShell>
  );
}
