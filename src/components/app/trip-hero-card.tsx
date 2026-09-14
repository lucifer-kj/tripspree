"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface DestinationSlide {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  thumbnails: string[];
}

const DESTINATION_SLIDES: DestinationSlide[] = [
  {
    id: "udaipur",
    name: "The Oberoi Udaivilas",
    location: "Lake Pichola, Udaipur",
    description: "A secluded haven where royal Mewar courtyards gently embrace reflective waters, forming one of the most serene architectural sanctuaries in Rajasthan.",
    image: UNSPLASH_ASSETS.udaivilasUdaipur.url,
    thumbnails: [
      UNSPLASH_ASSETS.udaivilasUdaipur.url,
      UNSPLASH_ASSETS.heroFullBleed.url,
      UNSPLASH_ASSETS.rambaghJaipur.url,
    ],
  },
  {
    id: "kerala",
    name: "Kumarakom Sanctuary Houseboat",
    location: "Vembanad Lake, Kerala",
    description: "Handcrafted teak craft drifting through unhurried emerald waterways, silent dawn bird sanctuaries, and restorative Ayurvedic rituals.",
    image: UNSPLASH_ASSETS.keralaBackwaters.url,
    thumbnails: [
      UNSPLASH_ASSETS.keralaBackwaters.url,
      UNSPLASH_ASSETS.maldivesOverwater.url,
      UNSPLASH_ASSETS.amalfiVeranda.url,
    ],
  },
  {
    id: "ladakh",
    name: "Thiksey High-Altitude Camp",
    location: "Indus Valley, Ladakh",
    description: "Minimalist alpine pavilions situated beneath star-dense Milky Way skies, monastic chants, and 3,500-meter celestial stillness.",
    image: UNSPLASH_ASSETS.ladakhStargazing.url,
    thumbnails: [
      UNSPLASH_ASSETS.ladakhStargazing.url,
      UNSPLASH_ASSETS.swissAlpsChalet.url,
      UNSPLASH_ASSETS.sowakaKyoto.url,
    ],
  },
];

export function TripHeroCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeSlide = DESTINATION_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? DESTINATION_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === DESTINATION_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-[28px] overflow-hidden border border-[#25183e] bg-[#130c24] shadow-2xl group select-none">
      {/* Background Photography with Apple Spring Crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", damping: 25, stiffness: 220, bounce: 0 }}
          className="absolute inset-0"
        >
          <Image
            src={activeSlide.image}
            alt={activeSlide.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Gradients for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0717]/95 via-[#0c0717]/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Top Bar Overlays: Status Pill + Carousel Navigation */}
      <div className="absolute top-5 sm:top-6 left-5 sm:left-6 right-5 sm:right-6 flex items-center justify-between z-10">
        {/* Status Pill matching Reference */}
        <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/25 px-3.5 py-1.5 text-xs font-sans font-medium text-white shadow-md">
          Upcoming trip
        </span>

        {/* Carousel Arrow Buttons with Apple Tactile Feedback */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous destination"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white hover:bg-white/35 active:scale-90 transition-all duration-100 cursor-pointer shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next destination"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white hover:bg-white/35 active:scale-90 transition-all duration-100 cursor-pointer shadow-md"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Left Edge: Stacked Mini-Thumbnails with +N Counter */}
      <div className="absolute left-5 sm:left-6 top-20 sm:top-24 flex flex-col gap-2.5 z-10">
        {activeSlide.thumbnails.map((thumb, idx) => (
          <div
            key={`${thumb}-${idx}`}
            onClick={() => setCurrentIndex(idx % DESTINATION_SLIDES.length)}
            className={`relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden border shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer ${
              idx === currentIndex
                ? "border-white ring-2 ring-[#8247ff]/60"
                : "border-white/40 opacity-85 hover:opacity-100"
            }`}
          >
            <Image
              src={thumb}
              alt="Destination preview"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ))}
        <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-white/30 bg-black/40 backdrop-blur-md text-[11px] font-mono font-medium text-white shadow-lg">
          +3
        </div>
      </div>

      {/* Bottom Content Overlay: Title & Description */}
      <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7 z-10 space-y-1.5">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-md">
          {activeSlide.name}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg drop-shadow-sm font-light">
          {activeSlide.description}
        </p>
      </div>
    </div>
  );
}
