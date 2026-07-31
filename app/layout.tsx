import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

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
  title: {
    default: "JB Travel | Premier Luxury Travel Agency South Africa",
    template: "%s | JB Travel",
  },
  description:
    "Book custom local and international travel packages, flights, and tours with JB Travel. Explore bespoke luxury holiday experiences personally tailored for you.",
  keywords: [
    "luxury travel packages",
    "travel agency South Africa",
    "bespoke travel agency",
    "holiday packages",
    "custom tours South Africa",
    "overwater villas Maldives",
    "Europe travel packages",
    "Bali holiday packages",
    "luxury safaris Africa",
    "JB Travel packages",
  ],
  metadataBase: new URL("https://www.jbtravel.co.za"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JB Travel | Premier Luxury Travel Agency South Africa",
    description: "Book custom local and international travel packages, flights, and tours with JB Travel. Bespoke luxury travel experiences personally tailored for you.",
    url: "https://www.jbtravel.co.za",
    siteName: "JB Travel",
    images: [
      {
        url: "/images/hero-island2.png", // Using the beautiful hero image as standard OG image share
        width: 1200,
        height: 630,
        alt: "JB Travel Luxury Island Escape",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JB Travel | Premier Luxury Travel Agency South Africa",
    description: "Bespoke luxury local and international travel packages tailored for you.",
    images: ["/images/hero-island2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "manifest",
        url: "/images/favicon_io/site.webmanifest",
      }
    ],
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
        {/* <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#D8B15A] focus:text-[#0B3D5B] focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a> */}
        <ScrollToTop />
        {children}
        <FloatingWhatsApp phoneNumber="27786687659" />
      </body>
    </html>
  );
}
