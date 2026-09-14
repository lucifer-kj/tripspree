"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Award, ArrowRight } from "lucide-react";

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
  },
];

export function VitaSpecialistsSection({ isReducedMotion }: VitaSpecialistsSectionProps) {
  return (
    <section
      id="specialists"
      className="relative bg-[#0c0717] text-white py-24 sm:py-32 border-b border-white/10"
      aria-label="TripSpree Specialists"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7] mb-3">
              <span>+</span>
              <span>HUMAN INTUITION & GATEKEEPERS</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Generational Specialists <br />
              <span className="font-serif italic font-normal lowercase text-white/70">
                and cultural stewards
              </span>{" "}
              on the ground
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed">
            Autonomous DIA intelligence works in tandem with trusted human custodians who have spent decades safeguarding rare geographic access.
          </p>
        </div>

        {/* Specialists 3-Card Bordered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALISTS.map((specialist, idx) => (
            <motion.div
              key={specialist.id}
              initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl border border-[#25183e] bg-[#130c24] hover:bg-[#180f2e] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 group shadow-lg"
            >
              <div>
                {/* Top Row: Index & Monogram */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#a855f7] font-semibold">
                    0{idx + 1} / SPECIALIST
                  </span>
                  <div className="h-8 w-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#a855f7] font-mono text-xs">
                    ✦
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1 group-hover:text-primary transition-colors">
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

              {/* Bottom Card Action */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="font-mono text-[11px] text-white/50">{specialist.experience}</span>
                <Link
                  href={`/designer?specialist=${specialist.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-primary hover:text-white transition-colors group-hover:translate-x-0.5"
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
