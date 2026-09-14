"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { Sparkles, ArrowUpRight, MapPin, X, ArrowRight, ShieldCheck } from "lucide-react";
import { UNSPLASH_ASSETS, UnsplashAsset } from "@/lib/unsplash";
import { Button } from "@/components/ui/button";

interface SanctuariesSectionProps {
  isReducedMotion: boolean;
}

interface SanctuaryItem {
  id: string;
  title: string;
  location: string;
  country: string;
  tag: string;
  tagColor: string;
  type: string;
  stillnessScore: number;
  rateInr: string;
  rateUsd: string;
  pacing: string;
  notes: string;
  fullStory: string;
  amenities: string[];
  asset: UnsplashAsset;
}

export function SanctuariesSection({ isReducedMotion }: SanctuariesSectionProps) {
  const [activeModalSanctuary, setActiveModalSanctuary] = useState<SanctuaryItem | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const colParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const sanctuaries: SanctuaryItem[] = [
    // 3 Domestic Indian Sanctuaries
    {
      id: "udaivilas",
      title: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      country: "India",
      tag: "Verified Heritage",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Royal Mewar Palace Courtyards",
      stillnessScore: 98,
      rateInr: "₹2,40,000",
      rateUsd: "$2,900",
      pacing: "Unhurried (5 Days)",
      notes: "Carved marble jharokhas, private Lake Pichola boat arrivals, and candlelit domes overlooking dawn waters.",
      fullStory: "Spread over 50 acres on the banks of Lake Pichola, The Oberoi Udaivilas stands on 200-year-old Mewari hunting grounds. The architecture evokes the grandeur of Rajasthan's golden age with domes, corridors, and tranquil reflecting pools.",
      amenities: ["Private Solar Boat Transfers", "Kohinoor Courtyard Pool", "Ayurvedic Heritage Spa", "Private Palace Historian"],
      asset: UNSPLASH_ASSETS.udaivilasUdaipur,
    },
    {
      id: "kerala-houseboat",
      title: "Kumarakom Emerald Houseboat",
      location: "Vembanad Canals, Kerala",
      country: "India",
      tag: "Verified Sanctuary",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Private Teakwood Kettuvallam",
      stillnessScore: 96,
      rateInr: "₹1,80,000",
      rateUsd: "$2,150",
      pacing: "Restorative (4 Days)",
      notes: "Handcrafted wooden boat drifting through emerald canals, bespoke Ayurvedic therapies, and personal chef.",
      fullStory: "Drift silently through Kerala’s tranquil backwaters on a private single-cabin kettuvallam built from anjili wood and tied with coir ropes. Your journey is timed to bird migration rhythms, accompanied by fresh coastal organic cuisine.",
      amenities: ["Dedicated Master & Chef", "Onboard Ayurvedic Physician", "Silent Electric Lagoon Motors", "Canopy Sun Deck"],
      asset: UNSPLASH_ASSETS.keralaBackwaters,
    },
    {
      id: "ladakh-stargazing",
      title: "Thiksey High-Altitude Camp",
      location: "Indus Valley, Ladakh",
      country: "India",
      tag: "Team-Vetted",
      tagColor: "bg-chart-2/15 text-chart-2 border-chart-2/25",
      type: "Nomadic Luxury Stargazing Camp",
      stillnessScore: 99,
      rateInr: "₹2,10,000",
      rateUsd: "$2,500",
      pacing: "Solitude & High Alpine (6 Days)",
      notes: "Oxygenated alpine tents beneath the Milky Way, morning Buddhist chants, and glacial valley stillness.",
      fullStory: "Positioned 11,500 feet high in the Himalayas, this nomadic retreat introduces ultimate contemplative quiet. Guests wake to the sound of monastery horns echoing across snowcapped peaks and stargaze through computerized telescopes.",
      amenities: ["Pressurized Oxygen Suites", "Thiksey Monastery Private Access", "Astronomer-Guided Stargazing", "Chauffeured High-Pass Escort"],
      asset: UNSPLASH_ASSETS.ladakhStargazing,
    },

    // 3 Global Luxury Gateways
    {
      id: "amalfi-veranda",
      title: "Positano Clifftop Veranda",
      location: "Positano, Amalfi Coast",
      country: "Italy",
      tag: "Verified Coastal",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Mediterranean Cliffside Refuge",
      stillnessScore: 94,
      rateInr: "₹3,20,000",
      rateUsd: "$3,850",
      pacing: "Coastal Respite (5 Days)",
      notes: "Pastel villa terraces suspended over the Tyrrhenian Sea with private wooden Riva boat charter.",
      fullStory: "Perched high on the rugged cliffs of Positano, this historical family estate offers unmatched panoramas of the azure Mediterranean. Private stone staircases wind down to sequestered coves inaccessible from public paths.",
      amenities: ["Private Riva Boat Charter", "Terrace Michelin Dining", "Cliffside Plunge Pool", "Campania Wine Cellar"],
      asset: UNSPLASH_ASSETS.amalfiVeranda,
    },
    {
      id: "maldives-lagoon",
      title: "Noonu Atoll Water Villa",
      location: "Noonu Atoll",
      country: "Maldives",
      tag: "Team-Vetted",
      tagColor: "bg-chart-2/15 text-chart-2 border-chart-2/25",
      type: "Secluded Overwater Pavilion",
      stillnessScore: 97,
      rateInr: "₹3,90,000",
      rateUsd: "$4,650",
      pacing: "Island Stillness (5 Days)",
      notes: "Private catamaran transfers, glass-bottom infinity baths, and uninterrupted coral reef solitude.",
      fullStory: "Set within a pristine marine reserve in the northern Maldives, this overwater pavilion is suspended entirely over turquoise lagoons. Retractable roofs allow sleeping beneath equatorial constellations with 24/7 personal butler service.",
      amenities: ["Retractable Stargazing Roof", "Private Saltwater Lagoon Pool", "Seaplane Chauffeur Access", "Resident Marine Biologist"],
      asset: UNSPLASH_ASSETS.maldivesOverwater,
    },
    {
      id: "swiss-alps",
      title: "St. Moritz Alpine Chalet",
      location: "St. Moritz, Engadin",
      country: "Switzerland",
      tag: "Verified Alpine",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      type: "Engadin Pine & Granite Sanctuary",
      stillnessScore: 98,
      rateInr: "₹3,60,000",
      rateUsd: "$4,300",
      pacing: "Glacial Retreat (6 Days)",
      notes: "Swiss stone-pine wood suites, subterranean thermal baths, and private mountain guide clearance.",
      fullStory: "A century-old Engadin refuge reconstructed with untreated Swiss pine, natural granite, and glass framing snow-draped alpine massifs. Subterranean hot mineral pools offer restorative warmth after private cross-country expeditions.",
      amenities: ["Subterranean Granite Thermal Baths", "Ski-In Private Funicular", "Swiss Pine Aromatherapy", "Engadin Fondue Cellar"],
      asset: UNSPLASH_ASSETS.swissAlpsChalet,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="sanctuaries"
      className="relative z-10 bg-background text-foreground py-28 px-4 sm:px-6 lg:px-12 border-t border-border transition-colors duration-300 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial Section Header & Currency Switch */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/70 pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
                Featured Sanctuaries • Domestic & Global
              </span>
            </div>

            <ScrollHeadline
              text="Quiet private estates, hand-selected without compromise."
              className="text-3xl sm:text-5xl md:text-6xl text-foreground mb-4 font-normal font-serif leading-tight"
              isReducedMotion={isReducedMotion}
            />

            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              True luxury is the privilege of unhurried contemplation. Our destination specialists personally inspect each estate before admitting it to the TripSpree collection — from royal Mewar courtyards to alpine glacial refuges.
            </p>
          </div>

          {/* Currency Toggle (₹ INR <-> $ USD) */}
          <div className="shrink-0 flex items-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                currency === "INR"
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ₹ INR (Lakhs)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Curated 6-Sanctuary Grid (3 India + 3 Global) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sanctuaries.map((sanctuary, idx) => {
            const isParallaxTarget = idx % 2 === 1;
            return (
              <motion.div
                key={sanctuary.id}
                style={{
                  y: isReducedMotion ? 0 : isParallaxTarget ? colParallax : 0,
                }}
                initial={isReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={isReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                whileHover={
                  isReducedMotion
                    ? undefined
                    : {
                        y: -5,
                        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveModalSanctuary(sanctuary)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-xl cursor-pointer"
              >
                {/* Visual Frame */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
                  <Image
                    src={sanctuary.asset.url}
                    alt={sanctuary.asset.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Status & Stillness Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md ${sanctuary.tagColor}`}
                    >
                      {sanctuary.tag}
                    </span>

                    <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-chart-1" />
                      {sanctuary.stillnessScore}/100 Stillness
                    </span>
                  </div>

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{sanctuary.location}</span>
                    </div>
                    <span className="text-[10px] text-white/70 uppercase tracking-widest">{sanctuary.country}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase text-primary tracking-wider font-semibold">
                        {sanctuary.type}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{sanctuary.pacing}</span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{sanctuary.title}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                    </h3>

                    <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {sanctuary.notes}
                    </p>
                  </div>

                  {/* High-Density Rate Bar */}
                  <div className="pt-3.5 border-t border-border/70 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-serif font-bold text-foreground text-sm">
                        {currency === "INR" ? sanctuary.rateInr : sanctuary.rateUsd}
                      </span>
                      <span className="text-muted-foreground text-[10px]"> / night</span>
                    </div>

                    <span className="text-primary font-sans font-medium text-[11px] group-hover:translate-x-0.5 transition-transform">
                      Inspect Sanctuary →
                    </span>
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
                <span>{activeModalSanctuary.location} • {activeModalSanctuary.country}</span>
                <span className="bg-primary/90 px-2.5 py-0.5 rounded-full text-white font-semibold">
                  {currency === "INR" ? activeModalSanctuary.rateInr : activeModalSanctuary.rateUsd} / night
                </span>
              </div>
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-primary font-medium block mb-1">
              {activeModalSanctuary.type}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-3">
              {activeModalSanctuary.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              {activeModalSanctuary.fullStory}
            </p>

            <div className="mb-6 pt-4 border-t border-border">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2.5">
                Signature Amenities & Clearance
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs text-foreground">
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
                  Plan with DIA in Designer Studio
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

