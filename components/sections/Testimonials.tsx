"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Malcolm & Sharlene Ramiah",
    location: "Durban, South Africa",
    destination: "India & Dubai",
    avatar: "/images/avatar-1.svg",
    rating: 5,
    review:
      "JB Travels has been our trusted travel partner for many years. Every journey is planned with professionalism, transparency, and genuine care, making the entire experience seamless from start to finish. Their dedication to exceptional service and creating unforgettable travel experiences is truly unmatched. We highly recommend JB Travels to anyone looking for a reliable and customer-focused travel agency.",
    date: "January 2025",
  },
  {
    id: 2,
    name: "Juanita B",
    location: "South Africa",
    destination: "Turkey",
    avatar: "/images/avatar-2.svg",
    rating: 5,
    review:
      "My experience of traveling with JB Travel these years has been most positive and exhilarating!! The transits, bookings, flights etc have been nothing short of incredible and professional. Thank you for tailoring my every want and need whilst allowing me the time to make memories. The best experience iv had was traveling via your company to Turkey. You’ve brought my longest standing dream to fruition!! I cannot express in words how grateful I was to have your support and facilitate my every move. Every alteration was done so sdeamlessly leaving me nothing to concern myself with. This level of service indicated your dedication to your clients. I am proud to be associated with your company more especially with you as a friend.",
    date: "March 2025",
  },
  {
    id: 3,
    name: "Priya Nair",
    location: "Dubai, UAE",
    destination: "Swiss Alps",
    avatar: "/images/avatar-3.svg",
    rating: 5,
    review:
      "I've traveled extensively and worked with many agencies. None compare to JB Travels. The Swiss Alps package was extraordinary — the helicopter tour, the private chalet, the seamless logistics. This is what true luxury travel feels like.",
    date: "February 2025",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0B3D5B] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#27C7D9]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#D8B15A]/5 blur-3xl pointer-events-none" />

      {/* Subtle grid pattern — white lines, since this background is now dark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D8B15A]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Traveler Stories
            </span>
            <div className="w-8 h-px bg-[#D8B15A]" />
          </div>
          <h2
            id="testimonials-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Real People,{" "}
            <span className="text-[#27C7D9]">Real Magic</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {testimonials.map(
              (t, i) =>
                i === active && (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl p-8 md:p-12 bg-white/6 border border-white/10 backdrop-blur-sm relative"
                  >
                    {/* Quote icon */}
                    <div className="absolute top-8 right-8 md:top-12 md:right-12">
                      <Quote className="w-10 h-10 text-[#D8B15A]/25" fill="currentColor" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.rating }).map((_, si) => (
                        <Star
                          key={si}
                          className="w-4 h-4 text-[#D8B15A]"
                          fill="#D8B15A"
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <blockquote
                      className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      &ldquo;{t.review}&rdquo;
                    </blockquote>

                    {/* Profile */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#D8B15A]/40">
                        <Image
                          src={t.avatar}
                          alt={`${t.name} profile photo`}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <p
                          className="font-bold text-white"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-xs text-white/50"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {t.location}
                        </p>
                      </div>

                      <div className="ml-auto text-right">
                        <p
                          className="text-xs font-medium text-[#D8B15A] uppercase tracking-wider"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Traveled to
                        </p>
                        <p
                          className="text-sm font-semibold text-[#27C7D9]"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {t.destination}
                        </p>
                        <p
                          className="text-xs text-white/50"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {t.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === active
                    ? "w-8 h-2 bg-[#D8B15A]"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                    }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D8B15A] hover:bg-[#D8B15A] hover:text-[#0B3D5B] text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D8B15A] hover:bg-[#D8B15A] hover:text-[#0B3D5B] text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          {[
            { val: "4.9 / 5", label: "TripAdvisor Rating" },
            { val: "12,000+", label: "Happy Travelers" },
            { val: "98%", label: "Would Recommend" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-bold text-[#27C7D9]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {val}
              </div>
              <div
                className="text-xs text-white/50 mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}