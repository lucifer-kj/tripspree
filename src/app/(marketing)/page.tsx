"use client";

import { useReducedMotionState } from "@/lib/use-reduced-motion";
import { Preloader } from "@/components/marketing/preloader";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { SanctuariesSection } from "@/components/marketing/sanctuaries-section";
import { ManifestoDarkBeat } from "@/components/marketing/manifesto-dark-beat";
import { JournalTeaserSection } from "@/components/marketing/journal-teaser-section";
import { Footer } from "@/components/marketing/footer";

export default function MarketingHomePage() {
  const { isReducedMotion } = useReducedMotionState();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Tengile-inspired Preloader */}
      <Preloader isReducedMotion={isReducedMotion} />

      {/* Global Navigation */}
      <Navbar />

      {/* Section 1: Signature Scroll-Jacked Hero (Vita-travel text reveal mechanic) */}
      <Hero isReducedMotion={isReducedMotion} />

      {/* Section 2: Bright Photographic & Architectural Sanctuaries Showcase */}
      <SanctuariesSection isReducedMotion={isReducedMotion} />

      {/* Section 3: Dark-Ground Rest Beat between bright photo sections (Homepage-Motion Rule) */}
      <ManifestoDarkBeat isReducedMotion={isReducedMotion} />

      {/* Section 4: Curator's Journal Teaser Grid (Tengile Asymmetric Grid Layout) */}
      <JournalTeaserSection isReducedMotion={isReducedMotion} />

      {/* Global Editorial Footer */}
      <Footer />
    </main>
  );
}