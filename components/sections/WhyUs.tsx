"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { HeartHandshake, Stamp, Church, ShieldCheck, MapPinned, Sparkles } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Personal Service, Start to Finish",
    description:
      "From the initial enquiry and planning process through to your safe return home, JB Travel provides professional assistance, personalised service and careful attention to every detail — no one-size-fits-all itineraries.",
    tag: "Our Promise",
    tagLabel: "Thoughtful planning, every step",
    accent: "#D8B15A",
  },
  {
    icon: Stamp,
    title: "Full Visa Services",
    description:
      "Comprehensive visa assistance including eligibility guidance, document preparation and verification, embassy and consulate submission guidance, and a final pre-departure documentation review — for leisure, business, group and religious travel.",
    tag: "Application Support",
    tagLabel: "Prepared, reviewed, submitted",
    accent: "#27C7D9",
  },
  {
    icon: Church,
    title: "Faith & Heritage Specialists",
    description:
      "A special interest in Biblical, Christian heritage and Muslim-friendly travel — from the Holy Land, Patmos and the Seven Churches of Revelation to halal-friendly holidays with prayer facilities and Islamic heritage sites.",
    tag: "Specialised Travel",
    tagLabel: "Meaningful, respectful journeys",
    accent: "#0B3D5B",
  },
];

const trustPoints = [
  { icon: ShieldCheck, text: "Full Visa Application Services" },
  { icon: MapPinned, text: "Personalised Day-by-Day Itineraries" },
  { icon: Sparkles, text: "Reliable Local & International Partners" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0B3D5B] relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#27C7D9]/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#27C7D9]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#D8B15A]/5 blur-3xl pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D8B15A]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              The JB Travel Difference
            </span>
            <div className="w-8 h-px bg-[#D8B15A]" />
          </div>
          <h2
            id="why-us-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Why Travel{" "}
            <span className="text-[#27C7D9]">With Us</span>
          </h2>
          <p
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            JB Travel is a South African travel company dedicated to creating
            memorable, well-organised and personalised travel experiences for
            individuals, couples, families, businesses and private groups. We
            believe travel is an opportunity to discover new cultures,
            experience history and create memories that last a lifetime.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                data-cursor="card"
                className="group relative rounded-2xl p-8 bg-white/6 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                style={{ willChange: "transform" }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.accent}15 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.accent}20` }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: feature.accent }}
                    strokeWidth={1.5}
                  />
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping"
                    style={{
                      border: `1px solid ${feature.accent}40`,
                      animationDuration: "1.5s",
                    }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-white/55 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {feature.description}
                </p>

                {/* Tag (replaces fabricated stat) */}
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-sm font-bold"
                    style={{ color: feature.accent, fontFamily: "Poppins, sans-serif" }}
                  >
                    {feature.tag}
                  </span>
                  <span
                    className="text-xs text-white/40 tracking-wide"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {feature.tagLabel}
                  </span>
                </div>

                {/* Index */}
                <div
                  className="absolute top-6 right-6 text-5xl font-bold opacity-5 select-none"
                  style={{ color: "white", fontFamily: "Poppins, sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {trustPoints.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-white/40 text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Icon className="w-3.5 h-3.5 text-[#D8B15A]" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}