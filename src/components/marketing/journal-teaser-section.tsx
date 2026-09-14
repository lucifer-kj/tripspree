"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { BookOpen, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface JournalTeaserProps {
  isReducedMotion: boolean;
}

export function JournalTeaserSection({ isReducedMotion }: JournalTeaserProps) {
  const teasers = [
    {
      id: "autumn-kyoto",
      title: "The Architecture of Silence: Autumn in Arashiyama",
      category: "Japan / Solitude",
      curator: "E. Vance",
      date: "October 2026",
      readTime: "6 min read",
      aspect: "aspect-[3/4]",
      asset: UNSPLASH_ASSETS.teaCeremony,
    },
    {
      id: "mount-fuji-twilight",
      title: "Beyond the Clifftops: Twilight Contemplation at Fuji Lake",
      category: "Japan / Mountain",
      curator: "M. Rossi",
      date: "September 2026",
      readTime: "8 min read",
      aspect: "aspect-[3/4.5] md:translate-y-6",
      asset: UNSPLASH_ASSETS.mountFujiSunrise,
    },
    {
      id: "forest-stillness",
      title: "Ancient Cedar & Fern: The Restorative Power of Morning Mist",
      category: "Japan / Wild Sanctuaries",
      curator: "A. Lindqvist",
      date: "August 2026",
      readTime: "5 min read",
      aspect: "aspect-[3/4]",
      asset: UNSPLASH_ASSETS.forestMist,
    },
  ];

  return (
    <section
      id="journal"
      className="relative z-10 bg-background text-foreground py-28 px-6 md:px-16 border-t border-border transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
                Field Journal
              </span>
            </div>

            <ScrollHeadline
              text="Dispatches and quiet reflections from our circle."
              className="text-3xl sm:text-5xl md:text-6xl text-foreground font-normal"
              isReducedMotion={isReducedMotion}
            />

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed mt-6">
              Field journals penned by our private curators across five continents — reflections on the fragrance of cedar in Yoshino,
              the maritime stillness of the Aegean at twilight, and the philosophy of returning changed.
            </p>
          </div>

          <Link href="/journal" className="shrink-0">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border bg-card text-foreground hover:bg-muted hover:border-primary/40 font-sans text-sm px-6 cursor-pointer"
            >
              Enter the Journal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Asymmetric 3-Column Preview Grid with Smooth Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {teasers.map((entry, idx) => (
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
              className={entry.aspect}
            >
              <Link
                href="/journal"
                className={`group relative flex flex-col h-full w-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ${
                  isReducedMotion
                    ? "hover:border-primary"
                    : "hover:border-primary/50 hover:shadow-2xl"
                }`}
              >
                {/* Photo Area with Background Image */}
                <div className="relative flex-1 w-full h-full p-6 flex flex-col justify-between overflow-hidden">
                  <Image
                    src={entry.asset.url}
                    alt={entry.asset.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Vignette Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                  {/* Floating Badge */}
                  <div className="flex justify-between items-start z-10">
                    <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-foreground border border-white/20">
                      {entry.category}
                    </span>

                    {/* Circular Arrow Button (Tengile mechanic) */}
                    <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="z-10 text-white">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-white/70 mb-2">
                      <span>{entry.curator}</span>
                      <span>•</span>
                      <span>{entry.readTime}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-white group-hover:text-primary-foreground transition-colors">
                      {entry.title}
                    </h3>

                    <p className="mt-2 text-[9px] font-mono text-white/50">
                      Photo by {entry.asset.photographer}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}