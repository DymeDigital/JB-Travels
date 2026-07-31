"use client";

import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/layout/PageTransition";

interface PageShellProps {
  children: ReactNode;
}

/**
 * Shared wrapper for all sub-pages (not the home page).
 * Provides Navbar, Footer, smooth scrolling, and page transitions.
 */
export default function PageShell({ children }: PageShellProps) {
  return (
    <LenisProvider>
      <Navbar />
      <PageTransition>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </PageTransition>
      <Footer />
    </LenisProvider>
  );
}
