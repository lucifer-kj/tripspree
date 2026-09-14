"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { Sparkles, ArrowUpRight, MapPin } from "lucide-react";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface SanctuariesSectionProps {
  isReducedMotion: boolean;
}

export function SanctuariesSection({ isReducedMotion }: SanctuariesSectionProps) {
  const sanctuaries = [
    {
      title: "Amanemu Pavilion",
      location: "Ago Bay, Ise-Shima",
      tag: "Verified",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Natural Thermal Onsen Estate",
      notes: "Direct sea access, Kerry Hill cedar pavilions, private mineral spring baths overlooking forested isles.",
      asset: UNSPLASH_ASSETS.amanemu,
    },
    {
      title: "Benesse House Oval",
      location: "Naoshima Art Island",
      tag: "Team-Vetted",
      tagColor: "bg-chart-2/15 text-chart-2 border-chart-2/25",
      type: "Tadao Ando Architectural Suite",
      notes: "Six guest suites accessed via private monorail, rooftop reflecting water pool, after-hours museum access.",
      asset: UNSPLASH_ASSETS.benesseHouse,
    },
    {
      title: "Sowaka Ryokan",
      location: "Gion Yasaka, Kyoto",
      tag: "Verified",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Restored Historic Sukiya Estate",
      notes: "Centuries-old courtyard moss gardens, private cedar hinoki soaking tubs, exclusive tea ceremonies.",
      asset: UNSPLASH_ASSETS.sowakaKyoto,
    },
  ];

  return (
    <section
      id="sanctuaries"
      className="relative z-10 bg-background text-foreground py-28 px-6 md:px-16 border-t border-border transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        {/* Editorial Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Curated Sanctuaries
            </span>
          </div>

          <ScrollHeadline
            text="Quiet private estates, hand-selected without compromise."
            className="text-3xl sm:text-5xl md:text-6xl text-foreground mb-6 font-normal"
            isReducedMotion={isReducedMotion}
          />

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            True luxury is the privilege of unhurried contemplation. Our curatorial circle
            personally visits and evaluates every estate before admitting it to our collection — from clifftop
            bastides overlooking the Mediterranean to sequestered mountain sanctuaries where silence is the primary amenity.
          </p>
        </div>

        {/* Curated Grid with Real Unsplash Photography & Smooth Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sanctuaries.map((sanctuary, idx) => (
            <motion.div
              key={idx}
              initial={isReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={isReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.65,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ${
                isReducedMotion
                  ? "hover:border-primary"
                  : "hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {/* Visual Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={sanctuary.asset.url}
                  alt={sanctuary.asset.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border bg-background/90 backdrop-blur-sm ${sanctuary.tagColor}`}
                  >
                    {sanctuary.tag}
                  </span>

                  <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="font-mono text-[11px] tracking-wider uppercase text-white/80 block">
                    {sanctuary.type}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="font-sans">{sanctuary.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {sanctuary.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {sanctuary.notes}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                  <span>CURATED SANCTUARY</span>
                  <span>Photo by {sanctuary.asset.photographer}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}