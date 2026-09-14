"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Award, ArrowRight } from "lucide-react";
import { UNSPLASH_ASSETS, UnsplashAsset } from "@/lib/unsplash";

interface VitaSpecialistsSectionProps {
  isReducedMotion: boolean;
}

interface SpecialistItem {
  id: string;
  name: string;
  role: string;
  territory: string;
  credentials: string;
  clearance: string;
  experience: string;
  bio: string;
  asset: UnsplashAsset;
}

const SPECIALISTS: SpecialistItem[] = [
  {
    id: "vikramaditya",
    name: "Dr. Vikramaditya Singh",
    role: "Mewar Architectural Historian & Royal Liaison",
    territory: "Udaipur & Rajasthan",
    credentials: "Ph.D. Rajputana Architecture, Sorbonne",
    clearance: "Level 5 Sovereign Archive Access",
    experience: "22 Years Field Experience",
    bio: "Personally facilitates private dawn entries to Lake Pichola royal wings, private Mewar miniature collections, and private courtyard banquets.",
    asset: UNSPLASH_ASSETS.specialistVikramaditya,
  },
  {
    id: "ananya",
    name: "Ananya Menon",
    role: "Vedic Botanist & Ayurvedic Wellness Director",
    territory: "Kerala Backwaters & Western Ghats",
    credentials: "Traditional Lineage Vaidya, Kottakkal",
    clearance: "Panchakarma Master Practitioner",
    experience: "17 Years Botanical Research",
    bio: "Architects restorative seclusions aboard silent wooden kettuvallams, pairing organic Ayurvedic herbal pharmacopeia with biological circadian timing.",
    asset: UNSPLASH_ASSETS.specialistAnanya,
  },
  {
    id: "tenzin",
    name: "Tenzin Norbu",
    role: "High-Altitude Himalayan Expeditioner & Dark-Sky Lead",
    territory: "Ladakh & Zanskar Ranges",
    credentials: "Fellow, Royal Geographical Society",
    clearance: "High-Altitude Medical & Astro Lead",
    experience: "19 Years Alpine Operations",
    bio: "Guides secluded journeys through 3,500m cliffside monasteries, Pangong solitude, and Bortle Class 1 celestial stargazing camps.",
    asset: UNSPLASH_ASSETS.specialistTenzin,
  },
];

export function VitaSpecialistsSection({ isReducedMotion }: VitaSpecialistsSectionProps) {
  return (
    <section
      id="specialists"
      className="relative bg-[#0c0717] text-white py-28 sm:py-36 md:py-44 border-b border-white/10"
      aria-label="TripSpree Specialists"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Line-Masking Wipes */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7] mb-3">
              <span>+</span>
              <span>HUMAN INTUITION & GATEKEEPERS</span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.h2
                initial={isReducedMotion ? {} : { y: "110%" }}
                whileInView={isReducedMotion ? {} : { y: "0%" }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight"
              >
                Generational Specialists <br />
                <span className="font-serif italic font-normal lowercase text-[#a855f7]">
                  and cultural stewards
                </span>{" "}
                on the ground
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
            Autonomous DIA intelligence works in tandem with trusted human custodians who have spent decades safeguarding rare geographic access.
          </motion.p>
        </div>

        {/* Specialists 3-Card Bordered Grid with Card Hover Choreography & Interactive Overlays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALISTS.map((specialist, idx) => (
            <motion.div
              key={specialist.id}
              initial={isReducedMotion ? {} : { opacity: 0, y: 28 }}
              whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-[#25183e] bg-[#130c24]/90 backdrop-blur-md hover:bg-[#180f2e] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-primary/50 group shadow-2xl active:scale-[0.985]"
            >
              <div>
                {/* Portrait Image Wrapper with Strict Overflow Hidden and 650ms Luxury Easing */}
                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-black/40 border border-white/10">
                  <Image
                    src={specialist.asset.url}
                    alt={specialist.asset.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[650ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  {/* Subtle dark gradient overlay on hover (0:36) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0717]/90 via-[#0c0717]/20 to-transparent group-hover:via-[#0c0717]/45 transition-colors duration-500" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#0c0717]/85 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white/90 uppercase tracking-wider">
                      {specialist.territory}
                    </span>
                  </div>

                  {/* Interactive + Overlay Icon animating into view on hover (0:36) */}
                  <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <div className="h-8 w-8 rounded-full bg-white text-[#0c0717] flex items-center justify-center font-mono text-sm font-bold shadow-xl">
                      +
                    </div>
                  </div>

                  {/* Index Counter at bottom right of image */}
                  <div className="absolute bottom-3.5 right-3.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-[#0c0717]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#a855f7]">
                      0{idx + 1} / 03
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1.5 group-hover:text-primary transition-colors">
                  {specialist.name}
                </h3>
                <span className="font-sans text-xs text-[#a855f7] font-medium block mb-4">
                  {specialist.role}
                </span>

                <p className="font-sans text-xs text-white/70 leading-relaxed font-light mb-6">
                  {specialist.bio}
                </p>

                {/* Verification Rows */}
                <div className="space-y-2.5 py-4 border-t border-white/10 text-xs font-sans">
                  <div className="flex items-center gap-2 text-white/80">
                    <Award className="h-3.5 w-3.5 text-[#a855f7] shrink-0" />
                    <span>{specialist.credentials}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#a855f7] shrink-0" />
                    <span className="font-mono text-[11px] text-white/90">{specialist.clearance}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action with Apple Tactile Feedback */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="font-mono text-[11px] text-white/50">{specialist.experience}</span>
                <Link
                  href={`/designer?specialist=${specialist.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-primary hover:text-white transition-colors group-hover:translate-x-0.5 active:scale-95"
                >
                  <span>Request Consult</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
