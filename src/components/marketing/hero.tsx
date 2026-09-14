"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface HeroProps {
  isReducedMotion: boolean;
}

const DESTINATIONS = [
  { id: "kyoto", label: "Kyoto", subtitle: "Zen Courtyards" },
  { id: "naoshima", label: "Naoshima", subtitle: "Modern Art" },
  { id: "ise-shima", label: "Ise-Shima", subtitle: "Thermal Onsen" },
  { id: "hakone", label: "Hakone", subtitle: "Mount Fuji" },
];

const PACING_OPTIONS = [
  { id: "unhurried", label: "Unhurried (4–7 Days)" },
  { id: "immersive", label: "Bespoke Immersion (8–12 Days)" },
];

export function Hero({ isReducedMotion }: HeroProps) {
  const [selectedSanctuary, setSelectedSanctuary] = useState("kyoto");
  const [selectedPace, setSelectedPace] = useState("unhurried");
  const sectionRef = useRef<HTMLElement>(null);

  // Framer Motion scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] w-full flex items-center justify-center px-4 py-24 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-background"
      aria-label="TripSpree Hero Section"
    >
      {/* Full-Bleed Parallax Background Photography from Unsplash */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : backgroundY }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%]"
      >
        <Image
          src={UNSPLASH_ASSETS.heroBackground.url}
          alt={UNSPLASH_ASSETS.heroBackground.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Editorial Vignette & Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-[#060606]/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Floating Modern Editorial Card with Scroll Parallax Offset */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : cardY }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <div className="rounded-3xl border border-white/20 bg-background/90 backdrop-blur-xl p-6 sm:p-10 md:p-12 lg:p-14 shadow-2xl text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Monumental Headline & Curatorial Search */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow & Mission Line */}
              <div className="mb-4 flex items-center gap-2">
                <span className="h-0.5 w-6 bg-primary inline-block" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  TripSpree Private Travel
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
                We orchestrate unhurried journeys of stillness, rare access, and architectural awakening.
              </p>

              {/* Monumental Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground uppercase leading-[0.92] mb-8">
                TRAVEL <br />
                <span className="font-serif italic font-normal tracking-normal lowercase text-primary">
                  is an
                </span>{" "}
                <br />
                AWAKENING
              </h1>

              {/* Curatorial Discovery Search Bar with Tactile Luxury Pills */}
              <div className="rounded-2xl border border-border bg-card/75 p-4 sm:p-5 shadow-sm mb-6">
                <div className="mb-3.5">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-2 tracking-wider">
                    Select Destination Realm
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DESTINATIONS.map((dest) => (
                      <motion.button
                        key={dest.id}
                        type="button"
                        whileHover={isReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSanctuary(dest.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all border cursor-pointer ${
                          selectedSanctuary === dest.id
                            ? "bg-primary text-primary-foreground border-primary font-medium shadow-sm"
                            : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        {dest.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-2 tracking-wider">
                    Travel Cadence
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PACING_OPTIONS.map((pace) => (
                      <motion.button
                        key={pace.id}
                        type="button"
                        whileHover={isReducedMotion ? undefined : { y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPace(pace.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-sans transition-all border cursor-pointer ${
                          selectedPace === pace.id
                            ? "bg-muted text-foreground border-border font-medium"
                            : "bg-background text-muted-foreground border-border/70 hover:text-foreground hover:border-border"
                        }`}
                      >
                        {pace.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-chart-1" />
                    <span>100% Team-Vetted Stays</span>
                  </div>

                  <Link href={`/designer?realm=${selectedSanctuary}&pace=${selectedPace}`}>
                    <Button
                      size="default"
                      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-sans text-xs shadow-md cursor-pointer"
                    >
                      Design Your Journey
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bottom Micro-Metadata */}
              <div className="flex items-center gap-6 text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Voice Agent Consultation
                </span>
                <span>•</span>
                <span>Private & Discrepant Access</span>
              </div>
            </div>

            {/* Right Column: Dimensional Framed Sanctuary Visual Frame */}
            <div className="lg:col-span-5 relative">
              <motion.div
                whileHover={isReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border shadow-xl group"
              >
                <Image
                  src={UNSPLASH_ASSETS.heroFocalPavilion.url}
                  alt={UNSPLASH_ASSETS.heroFocalPavilion.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center group-hover:scale-106 transition-transform duration-700"
                />

                {/* Subtle Inner Gradient for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Curatorial Badge on Image */}
                <div className="absolute top-4 right-4 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-foreground border border-white/20 shadow-sm flex items-center gap-1.5">
                  <Compass className="h-3 w-3 text-primary" />
                  <span>Sanctuary • Ise-Shima</span>
                </div>

                {/* Bottom Caption on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-mono text-[10px] tracking-wider uppercase text-white/80 mb-1">
                    Amanemu Pavilion • Ago Bay
                  </p>
                  <h2 className="font-serif text-lg font-semibold text-white leading-snug">
                    Natural thermal springs overlooking tranquil coastal pine islands.
                  </h2>
                </div>
              </motion.div>

              {/* Photo Attribution Micro-tag */}
              <p className="mt-2 text-right text-[9px] font-mono text-muted-foreground">
                Photo by{" "}
                <a
                  href={UNSPLASH_ASSETS.heroFocalPavilion.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {UNSPLASH_ASSETS.heroFocalPavilion.photographer}
                </a>{" "}
                via Unsplash
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
