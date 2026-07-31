import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import WhyUs from "@/components/sections/WhyUs";
import BookingCTA from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "About Us — JB Travels | Your Trusted Travel Partner",
  description:
    "JB Travel is a South African travel company dedicated to creating memorable, personalised travel experiences. Learn about our personal service, visa assistance, and faith & heritage travel expertise.",
  keywords: [
    "about JB Travels",
    "South African travel agency",
    "personalised travel",
    "visa assistance",
    "faith travel",
    "heritage tours",
    "trusted travel partner",
  ],
  openGraph: {
    title: "About Us — JB Travels",
    description:
      "Dedicated to creating memorable, well-organised and personalised travel experiences since day one.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
    url: "https://jbtravel.co.za/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About JB Travels — Your Trusted Travel Partner",
    description:
      "Personal service, visa assistance, and faith & heritage travel expertise.",
  },
  alternates: {
    canonical: "https://jbtravel.co.za/about",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <WhyUs />
      <BookingCTA />
    </PageShell>
  );
}
