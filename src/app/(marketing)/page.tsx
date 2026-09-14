"use client";

import { useReducedMotionState } from "@/lib/use-reduced-motion";
import { Preloader } from "@/components/marketing/preloader";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { AGUIDemoContainer } from "@/components/marketing/ag-ui-demo-container";
import { SanctuariesSection } from "@/components/marketing/sanctuaries-section";
import { HowDiaOperatesSection } from "@/components/marketing/how-dia-operates-section";
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

      {/* Section 1: Full-Bleed Parallax Hero with Integrated Chatbox */}
      <Hero isReducedMotion={isReducedMotion} />

      {/* Section 2: Contained Expandable AG-UI Prototype Trial Canvas */}
      <AGUIDemoContainer isReducedMotion={isReducedMotion} />

      {/* Section 3: High-Density Curated Sanctuaries (3 India + 3 Global) */}
      <SanctuariesSection isReducedMotion={isReducedMotion} />

      {/* Section 4: 4-Step Architecture & How DIA Operates Process Grid */}
      <HowDiaOperatesSection isReducedMotion={isReducedMotion} />

      {/* Section 5: Dark-Ground Rest Beat between bright photo sections (Homepage-Motion Rule) */}
      <ManifestoDarkBeat isReducedMotion={isReducedMotion} />

      {/* Section 6: Travel Journal Teaser Grid (Tengile Asymmetric Grid Layout) */}
      <JournalTeaserSection isReducedMotion={isReducedMotion} />

      {/* Global Editorial Footer */}
      <Footer />
    </main>
  );
}