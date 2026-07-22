import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

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
  ],
  openGraph: {
    title: "JB Travels — Luxury Journeys, Extraordinary Destinations",
    description:
      "Bespoke luxury travel experiences crafted by passionate travel experts.",
    type: "website",
    locale: "en_US",
    siteName: "JB Travels",
  },
  twitter: {
    card: "summary_large_image",
    title: "JB Travels — Luxury Journeys",
    description: "Bespoke luxury travel experiences curated for unforgettable moments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-[#F8FAFC] text-[#111827] antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#D8B15A] focus:text-[#0B3D5B] focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
        <FloatingWhatsApp phoneNumber="27786687659" />
      </body>
    </html>
  );
}
