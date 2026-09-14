"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface VitaStatisticSectionProps {
  isReducedMotion: boolean;
}

const STATISTIC_ITEMS = [
  {
    num: "01",
    tag: "High Altitude Solitude",
    title: "Ladakh Monasteries & Cosmic Skies",
    description:
      "Exclusive access to 3,500m cliffside monasteries, Pangong solitude, and pristine high-altitude dark-sky observatories with private astronomers.",
    image: "/images/stats/statistic-1.webp",
    metric: "3,500m Elevation",
    stillness: "99.4% Stillness Index",
  },
  {
    num: "02",
    tag: "Coastal Waters & Healing",
    title: "Kumarakom Lagoons & Ayurvedic Seclusion",
    description:
      "Unhurried navigation through sacred backwaters aboard private teakwood vessels, accompanied by bespoke Panchakarma healers and organic culinary masters.",
    image: "/images/stats/statistic-2.webp",
    metric: "Zero Wake Seclusion",
    stillness: "98.8% Stillness Index",
  },
  {
    num: "03",
    tag: "Royal Rajputana Living",
    title: "Udaipur Palaces & Private Courtyards",
    description:
      "Private dawn boat access across Lake Pichola into secluded Mewar royal wings, marble jharokha dining, and personal historians.",
    image: "/images/stats/statistic-3.webp",
    metric: "Private Archive Access",
    stillness: "97.9% Stillness Index",
  },
];

export function VitaStatisticSection({ isReducedMotion }: VitaStatisticSectionProps) {
  return (
    <section
      className="relative bg-[#091b20] text-white border-y border-white/10 py-16 sm:py-24"
      aria-label="TripSpree Featured Realms"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-chart-1 mb-3">
              <span>+</span>
              <span>CURATED SANCTUARY CORRIDORS</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white">
              Quiet Luxury <br />
              <span className="font-serif italic font-normal lowercase text-white/70">
                in three distinct
              </span>{" "}
              realms
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed font-light">
            Every retreat is personally verified for architectural pedigree, zero-crowd privacy, and profound quietude by our in-house specialists.
          </p>
        </div>

        {/* 3-Column Bordered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
          {STATISTIC_ITEMS.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative p-6 sm:p-8 flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-300 ${
                idx !== 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""
              }`}
            >
              {/* Top Row: Index and Corner Symbol */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-chart-1 font-semibold">
                  {item.num} / 03
                </span>
                <span className="font-mono text-white/30 text-xs group-hover:text-chart-1 transition-colors">
                  +
                </span>
              </div>

              {/* Card Image */}
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 bg-black/40 border border-white/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091b20]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#091b20]/80 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white mb-2.5 group-hover:text-chart-1 transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed font-light mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                <span>{item.metric}</span>
                <span className="text-chart-1">{item.stillness}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
