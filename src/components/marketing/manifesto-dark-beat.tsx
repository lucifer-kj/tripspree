"use client";

import { motion } from "framer-motion";
import { ScrollHeadline } from "@/components/marketing/scroll-headline";
import { Compass, Key, Clock, Shield } from "lucide-react";

interface ManifestoDarkBeatProps {
  isReducedMotion: boolean;
}

export function ManifestoDarkBeat({ isReducedMotion }: ManifestoDarkBeatProps) {
  const pillars = [
    {
      icon: Clock,
      title: "Unhurried Cadence",
      chip: "Verified Method",
      chipClass: "bg-chart-1/15 text-chart-1 border-chart-1/30",
      description:
        "We intentionally limit each journey to three key destinations per fortnight. Speed is the enemy of appreciation.",
    },
    {
      icon: Key,
      title: "Singular Access",
      chip: "Team-Vetted",
      chipClass: "bg-chart-2/15 text-chart-2 border-chart-2/30",
      description:
        "Private after-hours entry to national archives, locked cloister gardens, and private cellar tastings with master vintners.",
    },
    {
      icon: Shield,
      title: "Total Discretion",
      chip: "Curated Standard",
      chipClass: "bg-chart-3/15 text-chart-3 border-chart-3/30",
      description:
        "Encrypted communications, private air charters, and quiet ground transfers arranged directly by your dedicated curator.",
    },
  ];

  return (
    <section
      id="manifesto"
      className="relative z-10 bg-[#060606] text-[#f0f0f0] py-32 px-6 md:px-16 border-t border-white/10 transition-colors duration-300"
      aria-label="Philosophy Rest Beat"
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <Compass className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary">
            Our Philosophy
          </span>
        </div>

        {/* Scroll-Linked Headline across dark rest beat */}
        <div className="max-w-4xl mb-12">
          <ScrollHeadline
            text="We do not book itineraries. We compose memory."
            className="text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.1]"
            isReducedMotion={isReducedMotion}
          />
        </div>

        {/* One Substantial Literary Paragraph */}
        <p className="max-w-2xl font-sans text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-20">
          Standard travel platforms arrange transit and rooms. We curate moments of profound arrival.
          We work with a select circle of patrons each season, ensuring every encounter is shaped with depth,
          culinary authenticity, and absolute reverence for silence.
        </p>

        {/* Three Pillars in Rest Beat with Smooth Staggered Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
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
                className="rounded-xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${pillar.chipClass}`}
                  >
                    {pillar.chip}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-white mb-3">
                  {pillar.title}
                </h3>

                <p className="font-sans text-sm text-[#a0a0a0] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Rest Beat Quote Accent */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#747474]">
          <span>TRIPSPREE / PRIVATE TRAVEL</span>
          <span className="text-white/60">&ldquo;Travel is not an escape. It is an awakening.&rdquo;</span>
        </div>
      </div>
    </section>
  );
}