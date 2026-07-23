"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Search } from "lucide-react";
import PlanningModal from "@/components/PlanningModal";
import { ChevronDown, Plane, MapPin } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";


const navLinks = [
  { label: "Packages", href: "#destinations" },
  { label: "About Us", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "Experiences", href: "#testimonials" },

  { label: "Contact Us", href: "#booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-[990] bg-transparent transition-all duration-500 ease-out ${scrolled ? "lg:pt-3" : "pt-0"
          }`}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div
            className={`flex items-center transition-all duration-500 ease-out ${scrolled ? "h-16 md:h-16" : "h-16 md:h-20"
              } ${scrolled
                ? "lg:justify-start lg:w-fit lg:mx-auto lg:bg-black/40 lg:backdrop-blur-md lg:border lg:border-white/10 lg:rounded-full lg:px-3 lg:py-1 lg:gap-6 lg:shadow-lg lg:shadow-black/10"
                : "justify-between lg:bg-transparent lg:border lg:border-transparent lg:px-0 lg:py-0"
              }`}
          >
            {/* Logo */}
            <Link
              href="/#hero"
              onClick={handleLogoClick}
              className="flex items-center group shrink-0"
              aria-label="JB Travels - Home"
            >
              <div
                className={`relative flex items-center transition-all duration-500 ease-out w-60 h-32 -ml-6 md:ml-0 ${scrolled ? "md:w-32 md:h-20" : "md:w-60 md:h-28"
                  }`}
              >
                <Image
                  src="/images/logonav.png"
                  alt="JB Travels Logo"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Capsule - has its OWN pill at rest, loses it when scrolled */}
            <div
              className={`hidden lg:flex items-center transition-all duration-500 ease-out ${scrolled
                ? "bg-transparent border border-transparent px-0 py-0 gap-4"
                : "backdrop-blur-md border border-white/10 rounded-full px-8 py-2.5 shadow-lg shadow-black/10 bg-black/25 gap-0"
                }`}
            >
              <nav className="flex items-center gap-8" aria-label="Main navigation">
                {navLinks.map((link) => (

                  <a key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative text-sm font-medium text-white/90 hover:text-white transition-colors group py-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D8B15A] group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>

              {/* Search Icon */}
              <div className="w-px h-4 bg-white/20 mx-4" />
              <button aria-label="Search" className="text-white/80 hover:text-white transition-colors cursor-pointer">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`navbar-btn group relative inline-flex items-center gap-2 rounded-full overflow-hidden font-bold text-[#0B3D5B] shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out ${scrolled ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
                  }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="absolute inset-0 bg-[#D8B15A] group-hover:bg-[#c9a33f] transition-colors duration-300" />
                <span className="relative">Enquire Now</span>
                <ArrowRight className={`relative group-hover:translate-x-1 transition-transform ${scrolled ? "w-4 h-4" : "w-5 h-5"}`} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 48px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[985] bg-[#0B3D5B] flex flex-col items-center justify-center"
          >
            <nav
              className="flex flex-col items-center gap-6"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, ease: "easeOut" }}
                  className="text-3xl font-bold text-white/90 hover:text-[#D8B15A] transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {link.label}
                </motion.a>
              ))}



              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="navbar-btn group relative inline-flex items-center translate-y-10 gap-3 px-6 py-3 rounded-full overflow-hidden font-bold text-lg text-[#0B3D5B] shadow-2xl hover:-translate-y-1 transition-all duration-300"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="absolute inset-0 bg-[#D8B15A] group-hover:bg-[#c9a33f] transition-colors  duration-300" />
                <span className="relative ">Enquire Now</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </nav>
            {/* Decorative element */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
              <div className="relative w-28 h-10">
                {/* <Image
                  src="/images/logo-dark-circle.png"
                  alt="JB Travels Logo"
                  fill
                  className="object-contain"
                /> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PlanningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>
  );
}
