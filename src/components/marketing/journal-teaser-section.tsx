"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { BookOpen, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface JournalTeaserProps {
  isReducedMotion: boolean;
}

export function JournalTeaserSection({ isReducedMotion }: JournalTeaserProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const middleColParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

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
      aspect: "aspect-[3/4.5]",
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
      ref={containerRef}
      id="journal"
      className="relative z-10 bg-background text-foreground py-32 px-6 md:px-16 border-t border-border transition-colors duration-300 overflow-hidden"
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
              Field dispatches penned by our destination specialists across five continents — reflections on the fragrance of cedar in Yoshino,
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

        {/* Asymmetric 3-Column Preview Grid with Smooth Staggered Parallax & Hover Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {teasers.map((entry, idx) => {
            const isMiddle = idx === 1;
            return (
              <motion.div
                key={entry.id}
                style={{
                  y: isReducedMotion ? 0 : isMiddle ? middleColParallax : 0,
                }}
                initial={isReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={isReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                whileHover={
                  isReducedMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                transition={{
                  duration: 0.65,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:border-primary/40 transition-colors ${
                  isMiddle ? "md:translate-y-6" : ""
                }`}
              >
                <Link href="/journal">
                  {/* Aspect-Ratio Box with next/image */}
                  <div className={`relative w-full ${entry.aspect} overflow-hidden bg-muted`}>
                    <Image
                      src={entry.asset.url}
                      alt={entry.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                      <span>{entry.category}</span>
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                        <span>{entry.date}</span>
                        <span>{entry.readTime}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug flex items-center justify-between">
                        <span>{entry.title}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary shrink-0 ml-2" />
                      </h3>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>Written by {entry.curator}</span>
                      <span className="text-primary font-sans text-xs">Read Article →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
