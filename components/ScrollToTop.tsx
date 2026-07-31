"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Utility component that listens to route changes and resets scroll position to top.
 * Crucial for smooth-scrolling setups (like Lenis) and Next.js SPA transitions
 * where scroll state is otherwise restored to previous positions.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Disable browser default scroll restoration behavior
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force instant scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior, // Bypasses smooth scroll animation
    });

    // Also target any nested <main> layout elements
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }
    
    // Also scroll standard DOM elements as fallback
    document.documentElement.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.body.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
