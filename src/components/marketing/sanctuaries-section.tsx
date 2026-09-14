"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  X,
  ArrowRight,
} from "lucide-react";
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
  duration: string;
  capacity: string;
  notes: string;
  fullStory: string;
  amenities: string[];
  asset: UnsplashAsset;
}

export function SanctuariesSection({ isReducedMotion }: SanctuariesSectionProps) {
  const [activeModalSanctuary, setActiveModalSanctuary] = useState<SanctuaryItem | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const containerRef = useRef<HTMLElement>(null);

  const sanctuaries: SanctuaryItem[] = [
    {
      id: "udaivilas",
      title: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      country: "India",
      tag: "Verified Heritage",
      tagColor: "text-chart-1 border-chart-1/30 bg-chart-1/10",
      type: "Mewar Palace Courtyards",
      stillnessScore: 98,
      rateInr: "₹2,40,000",
      rateUsd: "$2,900",
      pacing: "Unhurried (5 Days)",
      duration: "5 Days / 4 Nights",
      capacity: "2–4 Guests (Private Pavilion)",
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
      tagColor: "text-chart-1 border-chart-1/30 bg-chart-1/10",
      type: "Private Teakwood Kettuvallam",
      stillnessScore: 96,
      rateInr: "₹1,80,000",
      rateUsd: "$2,150",
      pacing: "Restorative (4 Days)",
      duration: "4 Days / 3 Nights",
      capacity: "2 Guests (Exclusive Vessel)",
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
      tagColor: "text-chart-2 border-chart-2/30 bg-chart-2/10",
      type: "Nomadic Luxury Stargazing Camp",
      stillnessScore: 99,
      rateInr: "₹2,10,000",
      rateUsd: "$2,500",
      pacing: "Solitude & High Alpine (6 Days)",
      duration: "6 Days / 5 Nights",
      capacity: "2 Guests (Oxygenated Tent)",
      notes: "Oxygenated alpine tents beneath the Milky Way, morning Buddhist chants, and glacial valley stillness.",
      fullStory: "Positioned 11,500 feet high in the Himalayas, this nomadic retreat introduces ultimate contemplative quiet. Guests wake to the sound of monastery horns echoing across snowcapped peaks and stargaze through computerized telescopes.",
      amenities: ["Pressurized Oxygen Suites", "Thiksey Monastery Private Access", "Astronomer-Guided Stargazing", "Chauffeured High-Pass Escort"],
      asset: UNSPLASH_ASSETS.ladakhStargazing,
    },
    {
      id: "amalfi-veranda",
      title: "Positano Clifftop Veranda",
      location: "Positano, Amalfi Coast",
      country: "Italy",
      tag: "Verified Coastal",
      tagColor: "text-chart-1 border-chart-1/30 bg-chart-1/10",
      type: "Mediterranean Cliffside Refuge",
      stillnessScore: 94,
      rateInr: "₹3,20,000",
      rateUsd: "$3,850",
      pacing: "Coastal Respite (5 Days)",
      duration: "5 Days / 4 Nights",
      capacity: "2–6 Guests (Private Wing)",
      notes: "Pastel villa terraces suspended over the Tyrrhenian Sea with private wooden Riva boat charter.",
      fullStory: "Perched high on the rugged cliffs of Positano, this historical family estate offers unmatched panoramas of the azure Mediterranean. Private stone staircases wind down to sequestered coves inaccessible from public paths.",
      amenities: ["Private Riva Boat Charter", "Terrace Michelin Dining", "Cliffside Plunge Pool", "Campania Wine Cellar"],
      asset: UNSPLASH_ASSETS.amalfiVeranda,
    },
    {
      id: "swiss-alps",
      title: "St. Moritz Alpine Chalet",
      location: "St. Moritz, Engadin",
      country: "Switzerland",
      tag: "Verified Alpine",
      tagColor: "text-chart-1 border-chart-1/30 bg-chart-1/10",
      type: "Engadin Pine & Granite Sanctuary",
      stillnessScore: 98,
      rateInr: "₹3,60,000",
      rateUsd: "$4,300",
      pacing: "Glacial Retreat (6 Days)",
      duration: "6 Days / 5 Nights",
      capacity: "4–8 Guests (Full Chalet)",
      notes: "Swiss stone-pine wood suites, subterranean thermal baths, and private mountain guide clearance.",
      fullStory: "A century-old Engadin refuge reconstructed with untreated Swiss pine, natural granite, and glass framing snow-draped alpine massifs. Subterranean hot mineral pools offer restorative warmth after private cross-country expeditions.",
      amenities: ["Subterranean Granite Thermal Baths", "Ski-In Private Funicular", "Swiss Pine Aromatherapy", "Engadin Fondue Cellar"],
      asset: UNSPLASH_ASSETS.swissAlpsChalet,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="retreats"
      className="relative bg-[#091b20] text-white py-24 sm:py-32 border-b border-white/10"
      aria-label="TripSpree Handcrafted Sanctuaries"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header & Currency Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-white/10 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-chart-1 mb-3">
              <span>+</span>
              <span>CURATED SANCTUARIES</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Quiet Private Estates, <br />
              <span className="font-serif italic font-normal lowercase text-white/70">
                hand-selected without
              </span>{" "}
              compromise
            </h2>
          </div>

          {/* Currency Toggle (₹ INR <-> $ USD) */}
          <div className="shrink-0 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                currency === "INR"
                  ? "bg-chart-1 text-[#0D2E37] font-semibold shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-chart-1 text-[#0D2E37] font-semibold shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Vita Travels Signature Horizontal Split Cards (.featured-item) */}
        <div className="space-y-8 sm:space-y-12">
          {sanctuaries.map((sanctuary, idx) => (
            <motion.div
              key={sanctuary.id}
              initial={isReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-white/20 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Side: Property Specs & Actions (7 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Eyebrow & Status Chip */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-chart-1 uppercase tracking-widest">
                        {String(idx + 1).padStart(2, "0")} / SANCTUARY
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${sanctuary.tagColor}`}
                      >
                        {sanctuary.tag}
                      </span>
                    </div>

                    {/* Sanctuary Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white group-hover:text-chart-1 transition-colors">
                      {sanctuary.title}
                    </h3>

                    {/* Price Spec */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-mono text-xs text-white/50 uppercase tracking-wider">From</span>
                      <span className="font-mono text-lg sm:text-xl font-bold text-white">
                        {currency === "INR" ? sanctuary.rateInr : sanctuary.rateUsd}
                      </span>
                      <span className="font-mono text-xs text-white/50">/ night</span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mt-3">
                      {sanctuary.notes}
                    </p>
                  </div>

                  {/* 4 Metadata Specification Rows (Vita signature) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-white/10 text-xs font-sans">
                    <div className="flex items-center gap-2.5 text-white/80">
                      <MapPin className="h-4 w-4 text-chart-1 shrink-0" />
                      <span>{sanctuary.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/80">
                      <Calendar className="h-4 w-4 text-chart-1 shrink-0" />
                      <span>{sanctuary.duration}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/80">
                      <Users className="h-4 w-4 text-chart-1 shrink-0" />
                      <span>{sanctuary.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/80">
                      <ShieldCheck className="h-4 w-4 text-chart-1 shrink-0" />
                      <span>{sanctuary.stillnessScore}% Stillness Rating</span>
                    </div>
                  </div>

                  {/* Button Actions with Vita 4-Point Star */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalSanctuary(sanctuary)}
                      className="inline-flex items-center gap-2 rounded-full bg-chart-1 px-5 py-2.5 text-xs font-sans font-semibold text-[#0D2E37] hover:bg-white transition-all shadow-md cursor-pointer group/btn"
                    >
                      <span>Inspect Sanctuary</span>
                      <svg
                        className="h-2.5 w-2.5 fill-[#0D2E37] transition-transform group-hover/btn:rotate-45 duration-300"
                        viewBox="0 0 8 8"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
                      </svg>
                    </button>

                    <Link
                      href={`/designer?sanctuary=${sanctuary.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2.5 text-xs font-sans text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <span>Plan with DIA</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: High Resolution Photo with Zoom (6 cols) */}
                <div
                  onClick={() => setActiveModalSanctuary(sanctuary)}
                  className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden bg-black/40 border border-white/15 cursor-pointer"
                >
                  <Image
                    src={sanctuary.asset.url}
                    alt={sanctuary.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091b20]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-[#091b20]/80 backdrop-blur-md border border-white/20 font-mono text-[10px] text-white uppercase tracking-wider">
                      {sanctuary.country}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {activeModalSanctuary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-[#091b20] p-6 sm:p-8 shadow-2xl text-white"
          >
            <button
              type="button"
              onClick={() => setActiveModalSanctuary(null)}
              className="absolute top-6 right-6 h-9 w-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-black/50 mb-6 border border-white/10">
              <Image
                src={activeModalSanctuary.asset.url}
                alt={activeModalSanctuary.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091b20]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                <span>{activeModalSanctuary.location} • {activeModalSanctuary.country}</span>
                <span className="bg-chart-1 px-3 py-1 rounded-full text-[#0D2E37] font-semibold">
                  {currency === "INR" ? activeModalSanctuary.rateInr : activeModalSanctuary.rateUsd} / night
                </span>
              </div>
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-chart-1 font-medium block mb-1">
              {activeModalSanctuary.type}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3">
              {activeModalSanctuary.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
              {activeModalSanctuary.fullStory}
            </p>

            <div className="mb-6 pt-4 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-2.5">
                Signature Amenities & Clearance
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs text-white/80">
                {activeModalSanctuary.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-chart-1 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModalSanctuary(null)}
                className="rounded-full font-mono text-xs px-5 border-white/20 bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              >
                Close
              </Button>
              <Link href={`/designer?sanctuary=${activeModalSanctuary.id}`}>
                <Button
                  size="sm"
                  className="rounded-full bg-chart-1 text-[#0D2E37] hover:bg-white font-sans text-xs font-semibold px-6 cursor-pointer"
                >
                  Plan with DIA in Studio
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
