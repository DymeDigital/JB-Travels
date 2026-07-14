"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<"default" | "button" | "card">("default");
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // Hover detection
    const addHoverListeners = () => {
      const buttons = document.querySelectorAll("button, a, [data-cursor='button']");
      const cards = document.querySelectorAll("[data-cursor='card']");

      buttons.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorState("button"));
        el.addEventListener("mouseleave", () => setCursorState("default"));
      });
      cards.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorState("card"));
        el.addEventListener("mouseleave", () => setCursorState("default"));
      });
    };

    // Small delay to let DOM render
    setTimeout(addHoverListeners, 500);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  const sizeMap = {
    default: 32,
    button: 52,
    card: 44,
  };

  const size = sizeMap[cursorState];

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
          backgroundColor:
            cursorState === "card"
              ? "rgba(216, 177, 90, 0.15)"
              : "transparent",
          borderColor:
            cursorState === "button"
              ? "rgba(216, 177, 90, 0.9)"
              : cursorState === "card"
              ? "rgba(216, 177, 90, 0.7)"
              : "rgba(11, 61, 91, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="rounded-full border-2 flex items-center justify-center"
        style={{ willChange: "width, height, opacity" }}
      >
        {/* Compass icon */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          animate={{
            width: cursorState === "default" ? 14 : cursorState === "button" ? 20 : 18,
            height: cursorState === "default" ? 14 : cursorState === "button" ? 20 : 18,
            rotate: cursorState === "button" ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <circle cx="12" cy="12" r="10" stroke="#0B3D5B" strokeWidth="1.5" opacity="0.6" />
          <polygon points="12,6 14,12 12,18 10,12" fill="#D8B15A" opacity="0.9" />
          <polygon points="6,12 12,10 18,12 12,14" fill="#0B3D5B" opacity="0.8" />
          <circle cx="12" cy="12" r="1.5" fill="#D8B15A" />
        </motion.svg>
      </motion.div>
      {/* Glow on button state */}
      {cursorState === "button" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1.4 }}
          style={{
            background: "radial-gradient(circle, rgba(216,177,90,0.4) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
