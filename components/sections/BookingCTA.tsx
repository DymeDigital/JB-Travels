"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import PlanningModal from "@/components/PlanningModal";


export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="booking-heading"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/dest-maldives.jpg"
          alt="Luxury resort for booking your dream vacation"
          fill
          className="object-cover object-center scale-110"
          sizes="100vw"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0B3D5B]/75 via-[#0B3D5B]/60 to-[#0B3D5B]/80" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8B15A]/50 to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8B15A]/50 to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-[3] max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#D8B15A]" />
            <Sparkles className="w-3.5 h-3.5 text-[#D8B15A]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Begin Your Story
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D8B15A]" />
            <div className="w-8 h-px bg-[#D8B15A]" />
          </div>

          {/* Heading */}
          <h2
            id="booking-heading"
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1.1] mb-6 max-w-3xl mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Book Your{" "}
            <span className="text-[#D8B15A]">Dream Vacation</span>{" "}
            Today
          </h2>

          {/* Subtext */}
          <p
            className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Let our expert concierge team craft your perfect journey. No generic packages — just a deeply personal travel experience designed around you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hero-btn group relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden font-bold text-[#0B3D5B] shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="absolute inset-0 bg-[#D8B15A] group-hover:bg-[#c9a33f] transition-colors duration-300" />
              <span className="relative">Enquire Now</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+27319428878"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/40 hover:border-white text-white font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="text-[#D8B15A]">✆</span>
              Call Us: +27 31 942 8878
            </a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-6 justify-center"
          >
            {[
              "Free Consultation",
              "No Hidden Fees",
              "Fully Flexible Booking",
              "24/7 Support",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-white/60 text-xs"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="w-4 h-4 rounded-full bg-[#D8B15A]/25 border border-[#D8B15A]/50 flex items-center justify-center">
                  <span className="text-[#D8B15A] text-[8px]">✓</span>
                </span>
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <PlanningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </section>
  );
}
