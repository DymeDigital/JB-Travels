"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const galleryImages = [
  {
    id: 1,
    src: "/images/dest-maldives.jpg",
    alt: "Crystal clear waters of the Maldives with overwater bungalows",
    span: "row-span-2",
    label: "Maldives",
  },
  {
    id: 2,
    src: "/images/dest-santorini.jpg",
    alt: "Santorini's iconic blue domed churches at golden hour",
    span: "",
    label: "Santorini",
  },
  {
    id: 3,
    src: "/images/dest-dubai.jpg",
    alt: "Dubai's futuristic skyline at dusk",
    span: "",
    label: "Dubai",
  },
  {
    id: 4,
    src: "/images/dest-bali.jpg",
    alt: "Bali rice terraces with morning mist",
    span: "row-span-2",
    label: "Bali",
  },
  {
    id: 5,
    src: "/images/dest-capetown.jpg",
    alt: "Cape Town with Table Mountain backdrop",
    span: "",
    label: "Cape Town",
  },
  {
    id: 6,
    src: "/images/dest-swiss.jpg",
    alt: "Swiss Alps snow-capped peaks with alpine village",
    span: "",
    label: "Swiss Alps",
  },
  {
    id: 7,
    src: "/images/Bali2.png",
    alt: "Swiss Alps snow-capped peaks with alpine village",
    span: "",
    label: "Swiss Alps",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D8B15A]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Visual Journey
            </span>
            <div className="w-8 h-px bg-[#D8B15A]" />
          </div>
          <h2
            id="gallery-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#111827] leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            A World of{" "}
            <span className="text-[#0B3D5B]">Beauty</span>
          </h2>
        </motion.div>

        {/* Masonry-style Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] gap-4"
        >
          {galleryImages.map((img) => (
            <motion.div
              key={img.id}
              variants={itemVariants}
              data-cursor="card"
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span}`}
              style={{ willChange: "transform" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-107 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                <p
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {img.label}
                </p>
              </div>

              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
