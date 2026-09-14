"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface VitaDestinationSectionProps {
  isReducedMotion: boolean;
}

interface CoordinatePoint {
  id: string;
  name: string;
  region: string;
  coords: string;
  sanctuaries: number;
  season: string;
  stillness: number;
  x: number; // percentage in SVG coordinate plane
  y: number; // percentage in SVG coordinate plane
}

const DESTINATIONS: CoordinatePoint[] = [
  {
    id: "rajasthan",
    name: "Mewar & Udaipur",
    region: "Rajasthan, India",
    coords: "24.5854° N, 73.7125° E",
    sanctuaries: 18,
    season: "Oct – Mar",
    stillness: 98,
    x: 52,
    y: 42,
  },
  {
    id: "kerala",
    name: "Vembanad & Kumarakom",
    region: "Kerala, India",
    coords: "9.6176° N, 76.4301° E",
    sanctuaries: 14,
    season: "Sep – Apr",
    stillness: 97,
    x: 54,
    y: 58,
  },
  {
    id: "ladakh",
    name: "Nubra & Indus Valley",
    region: "Ladakh, India",
    coords: "34.1526° N, 77.5771° E",
    sanctuaries: 11,
    season: "May – Oct",
    stillness: 99,
    x: 55,
    y: 28,
  },
  {
    id: "amalfi",
    name: "Positano & Ravello",
    region: "Amalfi Coast, Italy",
    coords: "40.6281° N, 14.4850° E",
    sanctuaries: 9,
    season: "Apr – Oct",
    stillness: 94,
    x: 32,
    y: 35,
  },
  {
    id: "engadin",
    name: "St. Moritz & Sils",
    region: "Engadin, Switzerland",
    coords: "46.4908° N, 9.8355° E",
    sanctuaries: 12,
    season: "Dec – Apr, Jul – Sep",
    stillness: 98,
    x: 29,
    y: 27,
  },
  {
    id: "noonu",
    name: "Noonu & Baa Atolls",
    region: "Maldives Archipelago",
    coords: "5.8344° N, 73.2842° E",
    sanctuaries: 8,
    season: "Nov – Apr",
    stillness: 96,
    x: 53,
    y: 70,
  },
];

const ASYMMETRIC_DESTINATIONS = [
  {
    id: "asym-udaipur",
    name: "Udaipur Palaces",
    region: "Rajasthan",
    asset: UNSPLASH_ASSETS.udaivilasUdaipur,
    heightClass: "h-64 sm:h-72",
    offsetClass: "mt-0 sm:mt-6",
    stillness: "98% Stillness",
  },
  {
    id: "asym-kerala",
    name: "Kumarakom Canals",
    region: "Kerala",
    asset: UNSPLASH_ASSETS.keralaBackwaters,
    heightClass: "h-76 sm:h-96",
    offsetClass: "mt-0 sm:-mt-6",
    stillness: "97% Stillness",
  },
  {
    id: "asym-ladakh",
    name: "Thiksey Solitude",
    region: "Ladakh",
    asset: UNSPLASH_ASSETS.ladakhStargazing,
    heightClass: "h-72 sm:h-84",
    offsetClass: "mt-0 sm:mt-8",
    stillness: "99% Stillness",
  },
  {
    id: "asym-amalfi",
    name: "Positano Cliffs",
    region: "Amalfi Coast",
    asset: UNSPLASH_ASSETS.amalfiVeranda,
    heightClass: "h-64 sm:h-72",
    offsetClass: "mt-0 sm:mt-2",
    stillness: "94% Stillness",
  },
];

export function VitaDestinationSection({ isReducedMotion }: VitaDestinationSectionProps) {
  const [activePoint, setActivePoint] = useState<CoordinatePoint>(DESTINATIONS[0]);

  return (
    <section
      id="destination"
      className="relative bg-[#0c0717] text-white py-28 sm:py-36 md:py-44 border-b border-white/10 overflow-hidden"
      aria-label="TripSpree Destinations"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Line-Masking Wipes */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7] mb-3">
              <span>+</span>
              <span>TERRITORIAL RADAR</span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.h2
                initial={isReducedMotion ? {} : { y: "110%" }}
                whileInView={isReducedMotion ? {} : { y: "0%" }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight"
              >
                Celestial Coordinates <br />
                <span className="font-serif italic font-normal lowercase text-[#a855f7]">
                  across India &
                </span>{" "}
                the globe
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={isReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed"
          >
            Every geographic corridor is mapped by solar angles, biological seclusion indices, and specialist accessibility networks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Celestial SVG Radar Coordinate Plane (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-3xl border border-[#25183e] bg-[#130c24] p-4 sm:p-8 flex items-center justify-center overflow-hidden">
            {/* Concentric Coordinate Rings */}
            <svg
              className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <circle cx="200" cy="150" r="130" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="200" cy="150" r="90" fill="none" stroke="#a855f7" strokeWidth="1" />
              <circle cx="200" cy="150" r="50" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="4 4" />
            </svg>

            {/* Corner Cross Hair Indicators */}
            <span className="absolute top-4 left-4 font-mono text-[10px] text-white/30">+ 00.00° LAT</span>
            <span className="absolute top-4 right-4 font-mono text-[10px] text-white/30">+ 00.00° LNG</span>
            <span className="absolute bottom-4 left-4 font-mono text-[10px] text-white/30">SYSTEM: WGS-84</span>
            <span className="absolute bottom-4 right-4 font-mono text-[10px] text-[#a855f7]">DIA RADAR V2</span>

            {/* Interactive Coordinate Beacon Pins */}
            <div className="relative h-full w-full">
              {DESTINATIONS.map((dest) => {
                const isSelected = activePoint.id === dest.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setActivePoint(dest)}
                    style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-2 z-10"
                    aria-label={`Select destination ${dest.name}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-primary opacity-70" />
                      )}
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary border-white scale-125 shadow-lg"
                            : "bg-[#130c24] border-white/40 group-hover:border-primary"
                        }`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-white" : "bg-white/80 group-hover:bg-primary"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Beacon Hover Label */}
                    <div
                      className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 font-mono text-[10px] transition-all pointer-events-none ${
                        isSelected
                          ? "bg-primary text-white font-semibold shadow-md"
                          : "bg-[#130c24]/90 text-white/70 border border-white/15 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {dest.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Destination Active Dossier Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              key={activePoint.id}
              initial={isReducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={isReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-[#25183e] bg-[#130c24] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#a855f7] tracking-widest uppercase">
                    {activePoint.coords}
                  </span>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                    {activePoint.sanctuaries} Curated Estates
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
                  {activePoint.name}
                </h3>
                <span className="font-sans text-xs text-white/60 block mb-4">
                  {activePoint.region}
                </span>

                <div className="space-y-3 py-4 border-y border-white/10 text-xs font-sans">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/50">Optimal Pacing Season</span>
                    <span className="font-mono text-[#a855f7]">{activePoint.season}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/50">Stillness & Light Index</span>
                    <span className="font-mono text-white font-bold">{activePoint.stillness}% / 100</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="text-white/50">Specialist Support</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#a855f7]" />
                      Local Resident Curators
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/designer?region=${encodeURIComponent(activePoint.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white py-3 text-xs sm:text-sm font-sans font-semibold text-[#0c0717] hover:bg-white/95 transition-all shadow-md group cursor-pointer"
                >
                  <span>Orchestrate {activePoint.name} with DIA</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Asymmetric Editorial Photographic Vignettes (Reference 0:08) */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7]">
              + ASYMMETRIC CORRIDOR IMPRESSIONS
            </span>
            <span className="font-mono text-[11px] text-white/50">
              Photographic Cadence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {ASYMMETRIC_DESTINATIONS.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={isReducedMotion ? {} : { opacity: 0, y: 24 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-3xl overflow-hidden bg-black/40 border border-[#25183e] hover:border-primary/50 shadow-xl transition-all duration-300 ${dest.heightClass} ${dest.offsetClass}`}
              >
                <Image
                  src={dest.asset.url}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-[650ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0717]/90 via-[#0c0717]/25 to-transparent group-hover:via-[#0c0717]/40 transition-colors duration-500" />
                
                {/* Interactive + Icon on Hover */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <div className="h-7 w-7 rounded-full bg-white text-[#0c0717] flex items-center justify-center font-mono text-xs font-bold shadow-lg">
                    +
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="font-mono text-[10px] text-[#a855f7] block mb-0.5">
                    {dest.region}
                  </span>
                  <h4 className="font-serif text-lg text-white font-normal group-hover:text-primary transition-colors">
                    {dest.name}
                  </h4>
                  <span className="font-mono text-[10px] text-white/50 block mt-1">
                    {dest.stillness}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
