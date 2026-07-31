"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import { isIntroComplete, setIntroComplete } from "@/lib/introState";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Destinations from "@/components/sections/Destinations";
import WhyUs from "@/components/sections/WhyUs";
import WorldMap from "@/components/sections/WorldMap";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import BookingCTA from "@/components/sections/BookingCTA";
import LenisProvider from "@/components/LenisProvider";

export default function HomeClient() {
  // Always start true so server and client initial renders match (no hydration mismatch).
  // After hydration, immediately skip the loader if the user already saw it this session.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isIntroComplete()) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => {
          setIntroComplete();
          setLoading(false);
        }} />}

      </AnimatePresence>

      {!loading && (
        <LenisProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Destinations />
            <WhyUs />
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
