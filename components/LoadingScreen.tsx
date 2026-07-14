"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [pathProgress, setPathProgress] = useState(0);

  const handleComplete = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setPathProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(handleComplete, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [handleComplete]);

  const pathLength = 280;
  const dashOffset = pathLength * (1 - pathProgress);

  // Plane position along the path
  const planeProgress = pathProgress;
  // Simple bezier approximation for plane position
  const t = planeProgress;
  const startX = 80,
    startY = 180;
  const cp1X = 160,
    cp1Y = 80;
  const cp2X = 260,
    cp2Y = 160;
  const endX = 340,
    endY = 90;

  const planeX =
    Math.pow(1 - t, 3) * startX +
    3 * Math.pow(1 - t, 2) * t * cp1X +
    3 * (1 - t) * Math.pow(t, 2) * cp2X +
    Math.pow(t, 3) * endX;
  const planeY =
    Math.pow(1 - t, 3) * startY +
    3 * Math.pow(1 - t, 2) * t * cp1Y +
    3 * (1 - t) * Math.pow(t, 2) * cp2Y +
    Math.pow(t, 3) * endY;

  // Compute angle
  const dt = 0.01;
  const t2 = Math.min(t + dt, 1);
  const nx =
    Math.pow(1 - t2, 3) * startX +
    3 * Math.pow(1 - t2, 2) * t2 * cp1X +
    3 * (1 - t2) * Math.pow(t2, 2) * cp2X +
    Math.pow(t2, 3) * endX;
  const ny =
    Math.pow(1 - t2, 3) * startY +
    3 * Math.pow(1 - t2, 2) * t2 * cp1Y +
    3 * (1 - t2) * Math.pow(t2, 2) * cp2Y +
    Math.pow(t2, 3) * endY;
  const angle = (Math.atan2(ny - planeY, nx - planeX) * 180) / Math.PI;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <div className="flex items-center gap-2 justify-center mb-1">
              <div className="w-8 h-8 rounded-full bg-[#0B3D5B] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="#D8B15A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                className="text-2xl font-bold text-[#0B3D5B]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Aurelia
                <span className="text-[#D8B15A]">Travel</span>
              </span>
            </div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-[#6B7280]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Luxury Journeys
            </p>
          </motion.div>

          {/* Animated plane route */}
          <div className="relative">
            <svg
              width="420"
              height="240"
              viewBox="0 0 420 240"
              fill="none"
              className="overflow-visible"
            >
              {/* Dashed route path */}
              <path
                d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                stroke="#D8B15A"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
              />
              {/* Animated drawing path */}
              <path
                d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                stroke="#D8B15A"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={pathLength}
                strokeDashoffset={dashOffset}
              />

              {/* Origin dot */}
              <circle cx={startX} cy={startY} r="4" fill="#27C7D9" opacity="0.8" />
              {/* Destination dot */}
              <motion.circle
                cx={endX}
                cy={endY}
                r="4"
                fill="#D8B15A"
                animate={{
                  opacity: pathProgress > 0.9 ? [0, 1] : 0,
                  scale: pathProgress > 0.9 ? [0, 1] : 0,
                }}
              />

              {/* Plane icon */}
              {pathProgress > 0 && (
                <g
                  transform={`translate(${planeX}, ${planeY}) rotate(${angle}) translate(-9, -9)`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#0B3D5B"
                  >
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </g>
              )}
            </svg>
          </div>

          {/* Progress text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xs tracking-[0.25em] uppercase text-[#6B7280]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Preparing your journey
          </motion.p>

          {/* Progress bar */}
          <div className="mt-4 w-32 h-px bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D8B15A] rounded-full transition-all"
              style={{ width: `${pathProgress * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
