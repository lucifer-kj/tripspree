"use client";

import Image from "next/image";
import { useReducedMotionState } from "@/lib/use-reduced-motion";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { JournalGrid } from "@/components/journal/journal-grid";
import { BookOpen, Sparkles, Feather, ArrowUpRight } from "lucide-react";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

export default function JournalIndexPage() {
  const { isReducedMotion, toggleReducedMotion } = useReducedMotionState();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Global Navigation */}
      <Navbar
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
      />

      {/* Editorial Journal Header */}
      <header className="relative pt-36 pb-20 px-6 md:px-16 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Curator&apos;s Journal &mdash; Volume I
            </span>
          </div>

          <div className="max-w-4xl mb-8">
            <ScrollHeadline
              text="Literary dispatches from the world's quietest edges."
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-foreground leading-[1.1]"
              isReducedMotion={isReducedMotion}
              as="h1"
            />
          </div>

          <p className="max-w-2xl font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            The Journal is not a catalog of recommendations or touristic itineraries. It is a contemplative archive of field observations,
            architectural studies, and philosophical reflections penned by our private curators in residence.
          </p>
        </div>
      </header>

      {/* Featured Lead Dispatch (Wide Cinematic Presentation) */}
      <section className="py-20 px-6 md:px-16 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Lead Dispatch
            </span>
          </div>

          <article
            className={`group relative overflow-hidden rounded-2xl border border-border text-white p-8 sm:p-12 md:p-16 flex flex-col justify-between min-h-[460px] transition-all duration-300 ${
              isReducedMotion ? "" : "hover:border-primary/50 hover:shadow-2xl"
            }`}
          >
            {/* Real Unsplash Lead Editorial Image */}
            <Image
              src={UNSPLASH_ASSETS.mountFujiSunrise.url}
              alt={UNSPLASH_ASSETS.mountFujiSunrise.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />

            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 mb-16">
              <span className="font-mono text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                Provence / Historic Bastides
              </span>

              <div className="flex items-center gap-3 font-mono text-xs text-white/60">
                <span>By Claire Dubois</span>
                <span>•</span>
                <span>Founding Curator</span>
                <span>•</span>
                <span>12 min read</span>
              </div>
            </div>

            <div className="relative z-10 max-w-3xl">
              <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
                Curatorial Essay
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white mb-6 group-hover:text-primary-foreground/90 transition-colors">
                The Geometry of Sunlight: Shadows Across Roman Aqueducts at Twilight
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#a0a0a0] leading-relaxed mb-8 max-w-2xl">
                How Mediterranean stone absorbs the heat of midsummer and exhales it into the evening air — reflections on staying inside a 16th-century mas where time is measured only by the movement of olive branch shadows across lime-plastered walls.
              </p>

              <div className="flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-white/80 group-hover:text-white transition-colors">
                <span>Read Full Dispatch</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Asymmetric 3-Column Journal Grid (Tengile Reference) */}
      <section className="py-12 px-6 md:px-16 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Feather className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                All Field Notes
              </span>
            </div>

            <ScrollHeadline
              text="Curated observations from five continents."
              className="text-2xl sm:text-4xl text-foreground font-normal"
              isReducedMotion={isReducedMotion}
            />
          </div>

          <JournalGrid isReducedMotion={isReducedMotion} />
        </div>
      </section>

      {/* Dark-Ground Rest Beat (homepage-motion.md technique applied to Journal) */}
      <section className="bg-[#060606] text-[#f0f0f0] py-32 px-6 md:px-16 border-t border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary block mb-6">
            Curatorial Creed
          </span>

          <ScrollHeadline
            text="A journey persists in the reordering of the interior life."
            className="text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-8 leading-snug"
            isReducedMotion={isReducedMotion}
          />

          <p className="font-sans text-base sm:text-lg text-[#a0a0a0] leading-relaxed max-w-2xl mx-auto">
            We commission our curators not to record lists of places, but to document moments of awakening.
            When you return from a TripSpree journey, the world has not changed — but your presence within it has.
          </p>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}