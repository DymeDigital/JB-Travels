"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#why-us" },
  { label: "Packages", href: "#packages" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-[990] transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-white/30 border-b border-white/20 shadow-sm"
            : "backdrop-blur-xl bg-white/10"
        }`}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Aurelia Travel - Home"
            >
              <div className="w-9 h-9 rounded-full bg-[#0B3D5B] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Compass className="w-4 h-4 text-[#D8B15A]" />
              </div>
              <span
                className="text-xl font-bold text-white drop-shadow-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Aurelia
                <span className="text-[#D8B15A]">Travel</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
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

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, "#booking")}
                className="relative px-6 py-2.5 rounded-full overflow-hidden group"
              >
                <span className="absolute inset-0 rounded-full border border-[#D8B15A]/70 group-hover:border-[#D8B15A] transition-colors" />
                <span className="absolute inset-0 rounded-full bg-[#D8B15A]/0 group-hover:bg-[#D8B15A]/10 transition-all duration-300" />
                <span
                  className="relative text-sm font-semibold text-[#D8B15A] tracking-wide"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Book Now
                </span>
              </a>
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
              <motion.a
                href="#booking"
                onClick={(e) => handleNavClick(e, "#booking")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 px-8 py-3 rounded-full bg-[#D8B15A] text-[#0B3D5B] font-bold text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Book Now
              </motion.a>
            </nav>

            {/* Decorative element */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
              <Compass className="w-4 h-4 text-[#D8B15A]" />
              <span className="text-xs tracking-[0.3em] uppercase text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                Aurelia Travel
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
