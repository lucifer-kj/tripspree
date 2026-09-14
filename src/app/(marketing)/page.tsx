"use client";

import { useReducedMotionState } from "@/lib/use-reduced-motion";
import { Preloader } from "@/components/marketing/preloader";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { VitaStatisticSection } from "@/components/marketing/vita-statistic-section";
import { VitaAboutSection } from "@/components/marketing/vita-about-section";
import { AGUIDemoContainer } from "@/components/marketing/ag-ui-demo-container";
import { SanctuariesSection } from "@/components/marketing/sanctuaries-section";
import { VitaCombineSection } from "@/components/marketing/vita-combine-section";
import { VitaDestinationSection } from "@/components/marketing/vita-destination-section";
import { VitaSpecialistsSection } from "@/components/marketing/vita-specialists-section";
import { Footer } from "@/components/marketing/footer";

export default function MarketingHomePage() {
  const { isReducedMotion } = useReducedMotionState();

  return (
    <main className="min-h-screen bg-[#0c0717] text-white selection:bg-primary/30 selection:text-white">
      {/* Editorial Preloader */}
      <Preloader isReducedMotion={isReducedMotion} />

      {/* Global Navigation with Vita Star Monogram */}
      <Navbar />

      {/* Section 1: Vita 3-Plane Layered Parallax Hero with Integrated Chatbox */}
      <Hero isReducedMotion={isReducedMotion} />

      {/* Section 2: 3-Column Bordered Realms & Statistic Cards */}
      <VitaStatisticSection isReducedMotion={isReducedMotion} />

      {/* Section 3: Editorial About Frame, Indented Manifesto & Counters */}
      <VitaAboutSection isReducedMotion={isReducedMotion} />

      {/* Section 4: Contained Expandable AG-UI Interactive Prototype Canvas */}
      <AGUIDemoContainer isReducedMotion={isReducedMotion} />

      {/* Section 5: Vita Horizontal Split Card Sanctuaries with 4 Metadata Rows */}
      <SanctuariesSection isReducedMotion={isReducedMotion} />

      {/* Section 6: Combine Stay, Transit & Extras 4-Step Architecture */}
      <VitaCombineSection isReducedMotion={isReducedMotion} />

      {/* Section 7: Celestial Coordinate Radar Map */}
      <VitaDestinationSection isReducedMotion={isReducedMotion} />

      {/* Section 8: Generational Specialists & Cultural Stewards */}
      <VitaSpecialistsSection isReducedMotion={isReducedMotion} />

      {/* Global Panoramic Landscape Footer */}
      <Footer />
    </main>
  );
}