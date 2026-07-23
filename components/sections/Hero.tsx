"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ChevronDown, Plane, MapPin } from "lucide-react";
import PlanningModal from "@/components/PlanningModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// Words for stagger reveal
const heading1 = ["Wander,", "Explore,"];
const heading2 = ["Discover."];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Ken Burns zoom on background image
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.08 },
          { scale: 1.02, duration: 9, ease: "none" },
          0
        );
      }

      // Plane animation along path
      if (planeRef.current && pathRef.current) {
        tl.fromTo(
          planeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          0.2
        );

        tl.to(
          planeRef.current,
          {
            duration: 3.8,
            ease: "power1.inOut",
            motionPath: {
              path: pathRef.current,
              align: pathRef.current,
              autoRotate: 90,
              alignOrigin: [0.5, 0.5],
            },
          },
          0.3
        );

        // Draw flight path stroke
        if (flightPathRef.current) {
          const pathLength = flightPathRef.current.getTotalLength();
          gsap.set(flightPathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
          tl.to(
            flightPathRef.current,
            {
              strokeDashoffset: 0,
              duration: 2.8,
              ease: "power1.inOut",
            },
            0.3
          );
        }
      }

      // Word-by-word heading reveal
      const words = heroRef.current?.querySelectorAll(".hero-word");
      if (words) {
        tl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: 45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
          },
          1.5
        );
      }

      // Paragraph
      tl.fromTo(
        ".hero-para",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        2.1
      );

      // Buttons
      tl.fromTo(
        ".hero-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.2 },
        2.4
      );

      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReducedMotion) {
        // Scroll-controlled transition timeline
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=70%", // Scroll 120% of viewport height
            pin: true,
            pinSpacing: false, // Let next section scroll over
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        // 1. Zoom out background image (Scale 1.08 -> 1.00)
        if (imageRef.current) {
          scrollTl.fromTo(imageRef.current,
            { scale: 1.08 },
            { scale: 1.00, ease: "none" },
            0
          );
        }

        // 2. Hero Content animations (Heading, Paragraph, Buttons, Indicators, Stats)
        const headingDivs = heroRef.current?.querySelectorAll("h1 > div");
        if (headingDivs) {
          scrollTl.to(headingDivs, {
            y: -80,
            scale: 0.9,
            opacity: 0,
            // letterSpacing: "0.06em",
            filter: "blur(10px)",
            stagger: 0.05,
            ease: "power2.inOut",
          }, 0);
        }

        scrollTl.to(".hero-para", {
          y: -40,
          opacity: 0,
          filter: "blur(6px)",
          ease: "power2.inOut",
        }, 0.04);

        scrollTl.to(".hero-btn", {
          y: 20,
          scale: 0.95,
          opacity: 0,
          stagger: 0.03,
          ease: "power2.inOut",
        }, 0.06);

        scrollTl.to(".hero-scroll-indicator", {
          opacity: 0,
          y: -15,
          ease: "power2.inOut",
        }, 0);

        scrollTl.to(".hero-stats-strip", {
          opacity: 0,
          y: 30,
          ease: "power2.inOut",
        }, 0);

        // 3. Navbar Animations
        // const header = document.querySelector("header");
        // if (header) {
        //   scrollTl.to(header, {
        //     backgroundColor: "rgba(8, 15, 26, 0.4)",
        //     // backdropFilter: "blur(16px)",
        //     borderColor: "rgba(255, 255, 255, 0.12)",
        //     boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
        //     ease: "none",
        //   }, 0);
        // }

        // 4. Next Section Reveal (Destinations header, cards, view-all)
        const destHeader = document.querySelector("#destinations-header");
        const destSubtitle = document.querySelector("#destinations-subtitle");
        const destHeading = document.querySelector("#destinations-heading");
        const destSubtext = document.querySelector("#destinations-sub");
        const destCards = document.querySelectorAll(".destination-card");
        const destViewAll = document.querySelector("#destinations-viewall");

        if (destHeader) {
          scrollTl.to(destHeader, { opacity: 1, ease: "power2.out" }, 0.45);
        }

        if (destSubtitle) {
          scrollTl.fromTo(destSubtitle,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.45
          );
        }

        if (destHeading) {
          scrollTl.fromTo(destHeading,
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
            0.25
          );
        }

        if (destSubtext) {
          scrollTl.fromTo(destSubtext,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.50
          );
        }

        if (destCards.length > 0) {
          scrollTl.fromTo(destCards,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, ease: "power2.out" },
            0.55
          );
        }

        if (destViewAll) {
          scrollTl.fromTo(destViewAll,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, ease: "power2.out" },
            0.85
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center z-0"
      aria-label="Hero section - Explore Beyond Every Horizon"
    >
      {/* Background Image with Ken Burns */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full will-change-transform">
        <Image
          src="/images/hero-island2.png"
          alt="Aerial view of tropical island with crystal-clear turquoise water"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D5B]/30 via-transparent to-transparent z-[1]" />

      {/* SVG Flight Path Layer */}
      <div ref={containerRef} className="hidden md:block absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Hidden path for motion reference */}
          <path
            ref={pathRef as React.RefObject<SVGPathElement>}
            id="flight-curve"
            d="M -80,80 C 200,60 400,350 720,300 C 980,260 1200,120 1520,200"
            fill="none"
            stroke="none"
          />

          {/* Visible drawn path */}
          <path
            ref={flightPathRef as React.RefObject<SVGPathElement>}
            id="flight-curve-draw"
            d="M -80,80 C 200,60 400,350 720,300 C 980,260 1200,120 1520,200"
            fill="none"
            stroke="rgba(216, 177, 90, 0.5)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />

          {/* Plane */}
          <g ref={planeRef} opacity="0" style={{ willChange: "transform" }}>
            <g transform="translate(-14, -14)">
              <circle cx="14" cy="14" r="18" fill="rgba(255,255,255,0.12)" />
              <svg x="4" y="4" width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />

              </svg>
            </g>
          </g>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-[3] w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center md:mx-0 md:text-left">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="hidden md:block w-8 h-px bg-[#D8B15A]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              THE WORLD IS WAITING
            </span>
          </motion.div>

          {/* Heading */}
          <h1
            className="mb-6 text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold leading-[1.1] text-white drop-shadow-2xl overflow-visible"
            style={{ fontFamily: "Poppins, sans-serif", perspective: "800px" }}
          >
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 mb-2">
              {heading1.map((word) => (
                <span
                  key={word}
                  className="hero-word inline-block opacity-0"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4">
              {heading2.map((word) => (
                <span
                  key={word}
                  className="hero-word inline-block opacity-0"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </span>
              ))}
            </div>
          </h1>

          {/* Subparagraph */}
          <p
            className="hero-para opacity-0 text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Luxury adventures curated for unforgettable experiences around the globe.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hero-btn group relative inline-flex items-center gap-3 px-10 py-4 rounded-full overflow-hidden font-bold text-[#0B3D5B] shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="absolute inset-0 bg-[#D8B15A] group-hover:bg-[#c9a33f] transition-colors duration-300" />
              <span className="relative">Start Planning</span>
              <Plane className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>


            <a href="#destinations"
              onClick={(e) => { e.preventDefault(); document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" }); }}
              className="hero-btn opacity-0 group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/30 hover:border-white text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <MapPin className="w-4 h-4 text-white" />
              Explore Destinations
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-[0.25em] uppercase text-white/50"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </motion.div>
      </motion.div> */}

      {/* Stats strip at bottom */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="hero-stats-strip absolute bottom-0 right-0 z-[3] hidden lg:flex"
      >
        <div className="flex items-stretch bg-white/10 backdrop-blur-xl border-t border-l border-white/20 rounded-tl-2xl overflow-hidden">
          {[
            { value: "180+", label: "Destinations" },
            { value: "12K+", label: "Happy Travelers" },
            { value: "15 Yrs", label: "of Excellence" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-7 py-5 text-white ${i < 2 ? "border-r border-white/15" : ""}`}
            >
              <div
                className="text-2xl font-bold text-[#D8B15A]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs text-white/60 mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* Planning enquiry modal */}
      <PlanningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section >

  );

}
