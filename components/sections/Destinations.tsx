"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, X, Mail, CheckCircle2, Sparkles, Send, User, Phone, MessageSquare } from "lucide-react";

type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  longDescription: string;
  highlights: string[];
  image: string;
};

const destinations: Destination[] = [
  {
    id: "europe",
    name: "Europe",
    country: "France, Italy, Greece",
    description: "Discover iconic cities, timeless history, and unforgettable luxury experiences.",
    longDescription: "Discover the beauty, history, and culture of Europe with carefully curated journeys designed around your travel style. Whether you're seeking iconic landmarks, charming villages, breathtaking landscapes, or unforgettable culinary experiences, our flexible packages offer the perfect balance of comfort, exploration, and authentic local experiences.",
    highlights: [
      "5-Star Luxury Palace & Boutique Accommodations",
      "Private Chauffeur & VIP Airport Transfers",
      "Exclusive Vineyard & Fine Dining Experiences",
      "Tailored Cultural & Historical Guided Tours",
    ],
    image: "/images/euro.png",
  },
  {
    id: "indonesia",
    name: "Indonesia",
    country: "Bali",
    description: "Relax among tropical beaches, lush landscapes, and peaceful spiritual temples.",
    image: "/images/Bali2.png",
    longDescription: "Escape to the tropical paradise of Bali with personalized holidays designed for relaxation, adventure, and unforgettable moments. Whether you're planning a romantic getaway, family vacation, or luxury retreat, our flexible packages cater to every style of travel.",
    highlights: [
      "Private Oceanfront Villa with Infinity Pool",
      "Helicopter Transfer & Island Hopping",
      "Holistic Spa & Wellness Treatments",
      "Private Butler & Dedicated Concierge Service",
    ],
  },
  {
    id: "india",
    name: "India",
    country: "Delhi & Agra",
    description: "Experience vibrant culture, rich royal heritage, and spiritual wonders.",
    image: "/images/Inida2.png",
    longDescription: "Experience the rich heritage, vibrant traditions, and diverse landscapes of India through thoughtfully planned journeys tailored to your interests. From cultural discoveries and spiritual retreats to luxury escapes and family holidays, every itinerary is designed to create meaningful travel experiences.",
    highlights: [
      "Royal Palace & Heritage Hotel Stays",
      "Private Sunrise Taj Mahal VIP Access",
      "Customized Cultural & Culinary Tours",
      "Private Luxury Vehicle & Personal Guide",
    ],
  },
  {
    id: "turkey",
    name: "Turkey",
    country: "Istanbul & Cappadocia",
    description: "Explore stunning balloon architecture, vibrant markets, and scenic coastlines.",
    image: "/images/Turkey2.png",
    longDescription: "Explore the unique blend of history, culture, and natural beauty that Turkey has to offer. Whether you're looking for a relaxing coastal escape, a historical adventure, or a vibrant city experience, our tailored packages ensure a seamless and memorable journey.",
    highlights: [
      "Private Sunrise Hot Air Balloon Flight",
      "Bosphorus Sunset Luxury Yacht Cruise",
      "Ultra-Exclusive Cave Suite Stay",
      "Private Historian Guide in Istanbul",
    ],
  },
  // {
  //   id: "dubai",
  //   name: "Dubai",
  //   country: "UAE",
  //   description: "Futuristic skylines, golden desert dunes, and unparalleled ultra-luxury.",
  //   image: "/images/dest-dubai.jpg",
  //   longDescription: "Experience the epitome of modern luxury in Dubai. Stay at iconic world-class resorts, enjoy private desert glamping under the stars, high-end shopping concierges, and Michelin-star dining.",
  //   highlights: [
  //     "7-Star Luxury Hotel & Resort Suite",
  //     "Private VIP Desert Safari & Glamping",
  //     "Yacht Charter along Dubai Marina",
  //     "Personal Shopping Concierge",
  //   ],
  // },
  // {
  //   id: "swiss-alps",
  //   name: "Swiss Alps",
  //   country: "Switzerland",
  //   description: "Pristine snow peaks, alpine villages, and world-class ski resorts.",
  //   image: "/images/dest-swiss.jpg",
  //   longDescription: "Unwind in pristine alpine beauty. Enjoy private luxury chalets in Zermatt and St. Moritz, scenic Glacier Express first-class train journeys, and helicopter ski drops onto virgin powder snow.",
  //   highlights: [
  //     "Private Luxury Alpine Chalet",
  //     "Glacier Express First-Class Pass",
  //     "Helicopter Alpine Tour & Ski Drop",
  //     "Gourmet Fondue & Spa Experience",
  //   ],
  // },
];

export default function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Selected package modal state
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Enquiry Form State inside modal
  const [isEnquiring, setIsEnquiring] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  // Touch gesture support for mobile swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsEnquiring(false);
    setFormSubmitted(false);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormMessage(
      `Hi Brandon,\n\nI am interested in learning more about the ${dest.name} (${dest.country}) package.\n\nPlease send me additional details, availability, and pricing.`
    );
  };

  const closeModal = () => {
    setSelectedDestination(null);
    setIsEnquiring(false);
    setFormSubmitted(false);
  };

  const maxIndex = Math.max(0, destinations.length - visibleCount);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDestination) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          packageName: selectedDestination.name,
          country: selectedDestination.country,
          message: formMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to send email. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setFormSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError("Failed to reach email service. Please check your connection.");
      setIsSubmitting(false);
    }
  };


  return (
    <section
      id="destinations"
      className="py-16 sm:py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden z-10"
      aria-labelledby="destinations-heading"
    >
      {/* SVG Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-10 -translate-y-[99%] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
        >
          <path
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C480,120,240,120,120,120L0,120Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-[#27C7D9]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[#D8B15A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div
          id="destinations-header"
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0"
        >
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-px bg-[#D8B15A]" />
              <span
                id="destinations-subtitle"
                className="text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D8B15A] font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Our Collection
              </span>
            </div>
            <h2
              id="destinations-heading"
              className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold text-[#111827] leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Popular <span className="text-[#0B3D5B]">Packages</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4 sm:gap-6">
            <p
              id="destinations-sub"
              className="text-[#6B7280] max-w-sm text-xs sm:text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Handpicked destinations offering unrivalled beauty, culture, and luxury experiences for the discerning traveler.
            </p>

            {/* Carousel Navigation Buttons */}
            {!showAll && (
              <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200/60">
                <span className="text-xs font-medium text-gray-500 sm:hidden">Swipe to explore</span>
                <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Destination"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-300 bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B3D5B] shadow-sm hover:border-[#D8B15A] hover:bg-[#0B3D5B] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="text-xs font-semibold text-[#0B3D5B] px-1 sm:px-2 select-none" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span>0{currentIndex + 1}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-400">0{destinations.length}</span>
                  </div>
                  <button
                    onClick={nextSlide}
                    aria-label="Next Destination"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-300 bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B3D5B] shadow-sm hover:border-[#D8B15A] hover:bg-[#0B3D5B] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Container */}
        {!showAll ? (
          /* Carousel View with Mobile Touch Swipe */
          <div
            className="relative overflow-hidden py-2 sm:py-4 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 sm:duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3 lg:px-4"
                >
                  <article
                    onClick={() => openModal(dest)}
                    data-cursor="card"
                    className="destination-card group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 cursor-pointer h-full flex flex-col opacity-100"
                    style={{ willChange: "transform, box-shadow" }}
                    aria-label={`${dest.name}, ${dest.country}`}
                  >
                    {/* Image */}
                    <div className="relative h-60 sm:h-64 md:h-72 overflow-hidden shrink-0">
                      <Image
                        src={dest.image}
                        alt={`${dest.name} - ${dest.description}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Explore CTA */}
                      <div className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 opacity-100 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:translate-y-4 group-hover:translate-y-0 transition-all duration-400 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(dest);
                          }}
                          className="flex items-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#D8B15A] text-[#0B3D5B] text-xs sm:text-sm font-semibold shadow-md whitespace-nowrap active:scale-95 touch-manipulation hover:bg-[#c6a048] transition-colors"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Explore Package
                          <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <div>
                            <h3
                              className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#0B3D5B] transition-all duration-300 group-hover:-translate-y-0.5"
                              style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {dest.name}
                            </h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#D8B15A]" />
                              <span
                                className="text-xs text-[#6B7280]"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {dest.country}
                              </span>
                            </div>
                          </div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#D8B15A] group-hover:bg-[#D8B15A]/10 transition-all">
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B7280] group-hover:text-[#D8B15A] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>

                        <p
                          className="text-xs sm:text-sm text-[#6B7280] leading-relaxed line-clamp-2 sm:line-clamp-none"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {dest.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${currentIndex === idx
                    ? "w-6 sm:w-8 bg-[#0B3D5B]"
                    : "w-2 sm:w-2.5 bg-gray-300 hover:bg-[#D8B15A]"
                    }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Grid View (View All Destinations expanded mode) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 animate-fadeIn">
            {destinations.map((dest) => (
              <article
                key={dest.id}
                onClick={() => openModal(dest)}
                data-cursor="card"
                className="destination-card group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 cursor-pointer opacity-100"
                style={{ willChange: "transform, box-shadow" }}
                aria-label={`${dest.name}, ${dest.country}`}
              >
                {/* Image */}
                <div className="relative h-60 sm:h-64 md:h-72 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`${dest.name} - ${dest.description}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 opacity-100 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:translate-y-4 group-hover:translate-y-0 transition-all duration-400 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(dest);
                      }}
                      className="flex items-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#D8B15A] text-[#0B3D5B] text-xs sm:text-sm font-semibold shadow-md whitespace-nowrap active:scale-95 touch-manipulation hover:bg-[#c6a048] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Explore Package
                      <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                    <div>
                      <h3
                        className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#0B3D5B] transition-all duration-300 group-hover:-translate-y-0.5"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {dest.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#D8B15A]" />
                        <span
                          className="text-xs text-[#6B7280]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {dest.country}
                        </span>
                      </div>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#D8B15A] group-hover:bg-[#D8B15A]/10 transition-all">
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B7280] group-hover:text-[#D8B15A] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  <p
                    className="text-xs sm:text-sm text-[#6B7280] leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {dest.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All / Toggle Button */}
        <div
          id="destinations-viewall"
          className="mt-10 sm:mt-14 text-center opacity-0"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 border-[#0B3D5B] text-[#0B3D5B] font-semibold hover:bg-[#0B3D5B] hover:text-white transition-all duration-300 shadow-sm cursor-pointer touch-manipulation active:scale-95 text-xs sm:text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {showAll ? "Show Carousel View" : "View All Destinations"}
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* Enlarged Destination Package Detail & Enquiry Modal */}
      {selectedDestination && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col md:flex-row border border-white/20 text-[#111827] max-h-[90vh] md:max-h-none overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close details"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Section */}
            <div className="relative h-56 md:h-auto md:w-5/12 overflow-hidden shrink-0">
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />

              <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D8B15A]" />
                  <span className="text-xs text-gray-200" style={{ fontFamily: "Inter, sans-serif" }}>
                    {selectedDestination.country}
                  </span>
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {selectedDestination.name}
                </h3>
              </div>
            </div>

            {/* Right Side Content (Package Details or Enquiry Form) */}
            <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between">
              {!isEnquiring ? (
                /* Package Overview State */
                <>
                  <div>
                    <div className="hidden md:block mb-4">
                      <div className="flex items-center gap-1.5 mb-1 text-[#D8B15A]">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: "Inter, sans-serif" }}>
                          {selectedDestination.country}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0B3D5B]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {selectedDestination.name} Package
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-[#D8B15A] bg-[#D8B15A]/10 w-fit px-3 py-1 rounded-full text-xs font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Curated Luxury Experience</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                      {selectedDestination.longDescription}
                    </p>


                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setIsEnquiring(true)}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0B3D5B] hover:bg-[#D8B15A] text-white hover:text-[#0B3D5B] font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <Mail className="w-4 h-4" />
                      Enquire Now
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-sm transition-all cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : formSubmitted ? (
                /* Success Confirmation State */
                <div className="flex flex-col justify-center items-center text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0B3D5B] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Enquiry Sent!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] max-w-sm mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    Thank you for your enquiry regarding the <strong className="text-[#0B3D5B]">{selectedDestination.name} Package</strong>.
                    Our team will be in touch with you shortly.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 rounded-full bg-[#0B3D5B] text-white font-semibold text-xs sm:text-sm cursor-pointer hover:bg-[#D8B15A] hover:text-[#0B3D5B] transition-all duration-300"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Interactive Form State */
                <form onSubmit={handleSubmitEnquiry} className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <div>
                        <h4 className="text-lg font-bold text-[#0B3D5B]" style={{ fontFamily: "Poppins, sans-serif" }}>
                          Enquire: {selectedDestination.name} Package
                        </h4>
                        <p className="text-xs text-[#6B7280]">
                          Send your travel enquiry to brandon@jbtravel.co.za
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEnquiring(false)}
                        className="text-xs text-[#0B3D5B] underline hover:text-[#D8B15A] cursor-pointer"
                      >
                        Back
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      {/* Name Input */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sarah Jenkins"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B3D5B]/30 focus:border-[#0B3D5B]"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          Your Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            required
                            placeholder="e.g. sarah@example.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B3D5B]/30 focus:border-[#0B3D5B]"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          Phone Number (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="e.g. +27 82 123 4567"
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B3D5B]/30 focus:border-[#0B3D5B]"
                          />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          Message / Travel Preferences
                        </label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <textarea
                            rows={3}
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B3D5B]/30 focus:border-[#0B3D5B] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                    {submitError && (
                      <p className="text-xs text-red-500 text-center">{submitError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0B3D5B] hover:bg-[#D8B15A] text-white hover:text-[#0B3D5B] font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Send Enquiry"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEnquiring(false)}
                        className="px-4 py-3 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm cursor-pointer hover:bg-gray-100"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
