"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const footerLinks = {
  Destinations: ["Maldives", "Bali", "Santorini", "Cape Town", "Dubai", "Swiss Alps"],
  Experiences: ["Luxury Resorts", "Safari Adventures", "City Escapes", "Mountain Retreats", "Cultural Tours"],
  Company: ["About Us", "Our Team", "Careers", "Press", "Sustainability"],
  Support: ["Contact Us", "FAQ", "Travel Insurance", "Privacy Policy", "Terms of Service"],
};

const SocialIcon = ({ path, viewBox = "0 0 24 24" }: { path: string; viewBox?: string }) => (
  <svg viewBox={viewBox} className="w-4 h-4 text-white/60" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

const socials = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Twitter / X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#080F1A] text-white/80" role="contentinfo">
      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-20 pb-12">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          {/* Brand + Newsletter */}
          <Link href="/" className="flex items-center justify-center mb-6 group">
            <div className="relative w-86 h-32 flex items-center">
              <Image
                src="/images/logo-transparent.png"
                alt="JB Travels Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <p
            className="text-sm text-white/50 leading-relaxed mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Crafting extraordinary journeys for discerning travelers. Every destination, every experience — curated with passion and precision.
          </p>
      

          {/* Newsletter */}
          <div className="mb-8 w-full">
            <h4
              className="text-sm font-semibold text-white mb-3 uppercase tracking-widest"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Stay Inspired
            </h4>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[#D8B15A]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ✓ You&apos;re on the list. Adventures await.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  aria-label="Email for newsletter"
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/8 border border-white/15 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#D8B15A]/60 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="w-10 h-10 rounded-full bg-[#D8B15A] hover:bg-[#c9a24f] flex items-center justify-center transition-colors shrink-0"
                >
                  <ArrowRight className="w-4 h-4 text-[#0B3D5B]" />
                </button>
              </form>
            )}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 justify-center">
            {socials.map(({ path, label, href }) => (

              <a key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#D8B15A]/20 hover:border-[#D8B15A]/40 transition-all"
              >
                <SocialIcon path={path} />
              </a>
            ))}
            
          </div>
          <Link href="/terms" className="hover:text-[#D8B15A] transition-colors mt-3">
              <u>Terms &amp; Conditions</u> 
            </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className=" border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-white/35"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © {new Date().getFullYear()} JB Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
            <Mail className="w-3 h-3" />
            <span>brandon@jbtravel.co.za</span>
          </div>
          <p className="text-xs text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
            Crafted by <a href="https://dyme.digital/">Dyme Digital</a>
          </p>
        </div>
      </div>
    </footer>
  );
}