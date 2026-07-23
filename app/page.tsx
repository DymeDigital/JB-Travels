"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Destinations from "@/components/sections/Destinations";
import WhyUs from "@/components/sections/WhyUs";
import Packages from "@/components/sections/Packages";
import WorldMap from "@/components/sections/WorldMap";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import BookingCTA from "@/components/sections/BookingCTA";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <LenisProvider>
          {/* <CustomCursor /> */}
          {/* <ScrollProgress /> */}
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Destinations />
            <WhyUs />
            {/* <Packages /> */}
            <WorldMap />
            <Testimonials />
            <Gallery />
            <BookingCTA />
          </main>
          <Footer />
        </LenisProvider>
      )}
    </>
  );
}
