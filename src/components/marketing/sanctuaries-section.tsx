"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { Sparkles, ArrowUpRight, MapPin, X, ArrowRight, ShieldCheck } from "lucide-react";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";
import { Button } from "@/components/ui/button";

interface SanctuariesSectionProps {
  isReducedMotion: boolean;
}

interface SanctuaryItem {
  id: string;
  title: string;
  location: string;
  tag: string;
  tagColor: string;
  type: string;
  notes: string;
  fullStory: string;
  amenities: string[];
  asset: typeof UNSPLASH_ASSETS.amanemu;
}

export function SanctuariesSection({ isReducedMotion }: SanctuariesSectionProps) {
  const [activeModalSanctuary, setActiveModalSanctuary] = useState<SanctuaryItem | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const colParallax = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const sanctuaries: SanctuaryItem[] = [
    {
      id: "amanemu",
      title: "Amanemu Pavilion",
      location: "Ago Bay, Ise-Shima",
      tag: "Verified",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Natural Thermal Onsen Estate",
      notes: "Direct sea access, Kerry Hill cedar pavilions, private mineral spring baths overlooking forested isles.",
      fullStory: "Nestled within Ise-Shima National Park, Amanemu embraces Japan's ancient bathing tradition amidst Kerry Hill’s contemporary cedar architecture. The expansive thermal spring pavilion draws naturally heated mineral water from regional subterranean sources.",
      amenities: ["Private Thermal Spring Soaking", "Ago Bay Sunset Skiff", "Seven-Seat Omakase Terrace", "Kerry Hill Architecture"],
      asset: UNSPLASH_ASSETS.amanemu,
    },
    {
      id: "benesse-house",
      title: "Benesse House Oval",
      location: "Naoshima Art Island",
      tag: "Team-Vetted",
      tagColor: "bg-chart-2/15 text-chart-2 border-chart-2/25",
      type: "Tadao Ando Architectural Suite",
      notes: "Six guest suites accessed via private monorail, rooftop reflecting water pool, after-hours museum access.",
      fullStory: "Integrated directly into a cliff on the Seto Inland Sea, Benesse House Oval is Tadao Ando's sanctuary for modern art pilgrimage. Guests ascend by private inclined monorail to six exclusive suites wrapped around an open-air elliptical water pool.",
      amenities: ["Private Inclined Monorail", "24-Hour Museum Gallery Access", "Tadao Ando Design", "Elliptical Water Pool"],
      asset: UNSPLASH_ASSETS.benesseHouse,
    },
    {
      id: "sowaka",
      title: "Sowaka Ryokan",
      location: "Gion Yasaka, Kyoto",
      tag: "Verified",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Restored Historic Sukiya Estate",
      notes: "Centuries-old courtyard moss gardens, private cedar hinoki soaking tubs, exclusive tea ceremonies.",
      fullStory: "A restored 100-year-old former tea house in the quiet heart of Gion Yasaka. Sowaka balances historic sukiya-style cedar architecture with private moss courtyards, offering profound stillness steps from Kodai-ji temple.",
      amenities: ["Hinoki Soaking Tubs", "Private Moss Courtyards", "La Bombance Michelin Dining", "Tea Ceremony Teahouse"],
      asset: UNSPLASH_ASSETS.sowakaKyoto,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="sanctuaries"
      className="relative z-10 bg-background text-foreground py-32 px-6 md:px-16 border-t border-border transition-colors duration-300 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Editorial Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Featured Sanctuaries
            </span>
          </div>

          <ScrollHeadline
            text="Quiet private estates, hand-selected without compromise."
            className="text-3xl sm:text-5xl md:text-6xl text-foreground mb-6 font-normal"
            isReducedMotion={isReducedMotion}
          />

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            True luxury is the privilege of unhurried contemplation. Our destination specialists
            personally visit and evaluate every estate before admitting it to our collection — from clifftop
            bastides overlooking the Mediterranean to sequestered mountain sanctuaries where silence is the primary amenity.
          </p>
        </div>

        {/* Curated Grid with Real Unsplash Photography, Parallax Offset & Smooth Hover Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sanctuaries.map((sanctuary, idx) => {
            const isMiddle = idx === 1;
            return (
              <motion.div
                key={sanctuary.id}
                style={{
                  y: isReducedMotion ? 0 : isMiddle ? colParallax : 0,
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
                onClick={() => setActiveModalSanctuary(sanctuary)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-colors duration-200 hover:border-primary/50 hover:shadow-xl cursor-pointer"
              >
                {/* Visual Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={sanctuary.asset.url}
                    alt={sanctuary.asset.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Status Chip */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md ${sanctuary.tagColor}`}
                    >
                      {sanctuary.tag}
                    </span>
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white/90 font-mono text-xs">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{sanctuary.location}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary tracking-wider block mb-1">
                      {sanctuary.type}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{sanctuary.title}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                      {sanctuary.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Explore Sanctuary</span>
                    <span className="text-primary font-sans font-medium text-[11px]">Preview Access →</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sanctuary Quick View Modal */}
      {activeModalSanctuary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl text-foreground"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalSanctuary(null)}
              className="absolute top-6 right-6 h-9 w-9 rounded-full bg-muted/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content */}
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-muted mb-6">
              <Image
                src={activeModalSanctuary.asset.url}
                alt={activeModalSanctuary.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                <span>{activeModalSanctuary.location}</span>
                <span className="bg-primary/90 px-2.5 py-0.5 rounded-full text-white font-semibold">
                  {activeModalSanctuary.tag}
                </span>
              </div>
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-primary font-medium block mb-1">
              {activeModalSanctuary.type}
            </span>
            <h2 className="font-serif text-3xl text-foreground font-medium mb-3">
              {activeModalSanctuary.title}
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              {activeModalSanctuary.fullStory}
            </p>

            <div className="mb-6 pt-4 border-t border-border">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2.5">
                Signature Sanctuary Amenities
              </span>
              <div className="grid grid-cols-2 gap-2 font-sans text-xs text-foreground">
                {activeModalSanctuary.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModalSanctuary(null)}
                className="rounded-full font-mono text-xs px-5 border-border cursor-pointer"
              >
                Close
              </Button>
              <Link href={`/designer?sanctuary=${activeModalSanctuary.id}`}>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs px-6 cursor-pointer"
                >
                  Curate in Trip Designer
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
