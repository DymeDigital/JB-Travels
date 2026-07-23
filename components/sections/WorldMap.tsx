"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import {
  Plane,
  MapPinned,
  Stamp,
  BedDouble,
  Church,
  Users,
  Heart,
  Compass,
  ChevronDown,
  LucideIcon,
  ShieldCheck,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Plane,
    title: "Flight Bookings",
    description:
      "Domestic and International flight reservations across Economy, Premium Economy and Business Class, matched to your schedule, route and budget. We handle everything from single tickets to multi-country transit itineraries.",
  },
  {
    icon: MapPinned,
    title: "Tailor-Made Holiday Packages",
    description:
      "We don't believe in one-size-fits-all travel. Every itinerary is built around your interests, preferred travel style, available time and budget, balancing comfort, sightseeing, leisure and value from planning through to your safe return home.",
  },
  {
    icon: Stamp,
    title: "Visa Assistance",
    description:
      "Full visa application support including eligibility guidance, document preparation and verification, appointment assistance, embassy and consulate submission guidance, and a final pre-departure documentation review. Covers tourist, business, group and transit visas. Approval remains subject to the relevant embassy or consulate, but we help you proceed with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    description:
      "Comprehensive travel insurance covering medical emergencies, trip cancellations, lost luggage and unforeseen delays, so you can explore with complete peace of mind. We help you select the right level of cover for your destination, trip length and personal circumstances, from single-trip policies to multi-country and group cover.",
  },
  {
    icon: BedDouble,
    title: "Accommodation & Transfers",
    description:
      "Carefully selected hotels and resorts, private airport transfers and transportation, arranged through reputable, reliable partners so every leg of your journey — from arrival to departure — is comfortable and well organised.",
  },
  {
    icon: Church,
    title: "Faith & Heritage Tours",
    description:
      "Biblical and Christian heritage journeys to destinations such as the Holy Land, Greece and the Footsteps of Paul, Patmos, Turkey and the Seven Churches of Revelation, and Egypt — blending spiritual enrichment with history and fellowship. Muslim-friendly holidays are also available, with halal dining, prayer facilities and visits to mosques and Islamic heritage sites across destinations like Turkey, Dubai, Indonesia and Malaysia.",
  },
  {
    icon: Users,
    title: "Group & Family Travel",
    description:
      "Custom itineraries for families, Bible study and faith-based groups, private groups, corporate and incentive travel, and special occasions — coordinated from first enquiry to final arrangements so everyone in the group travels smoothly together.",
  },
  {
    icon: Heart,
    title: "Honeymoons & Luxury Escapes",
    description:
      "Romantic getaways and luxury island holidays to destinations such as Mauritius, the Maldives, Seychelles and Dubai, with accommodation and experiences chosen to suit couples celebrating a honeymoon, anniversary or milestone escape.",
  },
  {
    icon: Compass,
    title: "Guided Tours & Excursions",
    description:
      "Professionally curated sightseeing tours, excursions, cruises and ferry arrangements across our featured regions — from cultural journeys through India and Egypt to island exploration in the Mediterranean and Southern Africa — connecting you with local history and hidden gems.",
  },

];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#0B3D5B]/3 blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 sm:w-8 h-px bg-[#D8B15A]" />
            <span
              className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our Services
            </span>
            <div className="w-6 sm:w-8 h-px bg-[#D8B15A]" />
          </div>
          <h2
            id="services-heading"
            className="text-[clamp(1.75rem,6vw,3.5rem)] font-bold text-[#111827] leading-tight px-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Everything You Need for a{" "}
            <span className="text-[#0B3D5B]">Seamless Journey</span>
          </h2>
          <p
            className="mt-4 text-[#6B7280] max-w-xl mx-auto text-sm leading-relaxed px-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            From planning your itinerary to assisting with visas, we take
            care of every detail so you can travel with confidence and peace
            of mind.
          </p>
        </motion.div>

        {/* Services Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-gray-100"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={service.title}
                variants={rowVariants}
                className="border-b border-gray-100"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${i}`}
                  className="group w-full flex items-center gap-3 sm:gap-5 md:gap-8 py-5 sm:py-7 md:py-8 px-1 sm:px-2 md:px-4 -mx-1 sm:-mx-2 md:-mx-4 text-left transition-colors duration-300 hover:bg-[#F8FAFC]/60 relative"
                >
                  {/* Accent line */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[#D8B15A] origin-center transition-transform duration-300 ${isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                      }`}
                  />

                  {/* Index — hidden on small mobile */}
                  <span
                    className="hidden sm:block text-xs text-[#D8B15A] font-semibold tracking-widest shrink-0 w-6 sm:w-8"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? "bg-[#0B3D5B]/10" : "bg-[#0B3D5B]/5 group-hover:bg-[#0B3D5B]/10"
                      }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B3D5B]" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3
                    className="flex-1 text-base sm:text-lg md:text-xl font-bold text-[#111827] leading-snug"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Chevron */}
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0B3D5B]" : ""
                      }`}
                  />
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-panel-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-sm text-[#6B7280] leading-relaxed pb-5 sm:pb-7 md:pb-8 pl-[3.25rem] sm:pl-[4.75rem] md:pl-[6.5rem] pr-2 sm:pr-6 max-w-xl"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}