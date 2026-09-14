"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface VitaAboutSectionProps {
  isReducedMotion: boolean;
}

export function VitaAboutSection({ isReducedMotion }: VitaAboutSectionProps) {
  return (
    <section
      id="about"
      className="relative bg-[#091b20] text-white py-20 sm:py-32 border-b border-white/10 overflow-hidden"
      aria-label="About TripSpree"
    >
      {/* Decorative background grid subtle lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo Frame (5 cols) */}
          <motion.div
            initial={isReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={isReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[440px] sm:h-[520px] w-full rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl group">
              <Image
                src="/images/about/about-illustration.jpg"
                alt="TripSpree curated editorial journey landscape"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091b20]/90 via-[#091b20]/20 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#091b20]/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-chart-1">
                  <span className="text-xs">✦</span>
                  <span>Digital Atelier</span>
                </div>
              </div>

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#091b20]/85 backdrop-blur-md border border-white/10">
                <p className="font-serif italic text-xs sm:text-sm text-white/90 leading-snug">
                  &ldquo;Travel is not an escape. It is an awakening of senses long dulled by the commonplace.&rdquo;
                </p>
                <span className="block font-mono text-[10px] uppercase text-chart-1 tracking-wider mt-2">
                  — The TripSpree Manifesto
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Manifesto & Stats (7 cols) */}
          <motion.div
            initial={isReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={isReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-chart-1 mb-4">
                <span>+</span>
                <span>OUR ESSENCE</span>
              </div>

              {/* Vita-Style Drop-Indented Monumental Headline */}
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-[1.05] mb-6">
                Travel should not be an exhausting checklist,{" "}
                <span className="block font-serif italic font-normal lowercase text-chart-1 tracking-normal sm:pl-8">
                  but an unhurried return
                </span>{" "}
                to intuition and wonder.
              </h2>

              <p className="font-sans text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light mb-8 max-w-2xl">
                Unlike mass-market algorithmic OTAs driven by sponsored bidding and crowded routes, TripSpree operates as a private digital atelier. Here, our autonomous travel concierge <strong className="text-white font-medium">DIA</strong> unites with generational local specialists to architect journeys of stillness, rare access, and architectural pedigree.
              </p>
            </div>

            {/* Vita Stat Counter Boxes */}
            <div className="grid grid-cols-3 border-y border-white/10 py-6 mb-8 gap-4 sm:gap-6">
              <div>
                <span className="block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  100+
                </span>
                <span className="block font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider mt-1">
                  Verified Sanctuaries
                </span>
              </div>
              <div className="border-l border-white/10 pl-4 sm:pl-6">
                <span className="block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-chart-1 tracking-tight">
                  1,470+
                </span>
                <span className="block font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider mt-1">
                  Journeys Curated
                </span>
              </div>
              <div className="border-l border-white/10 pl-4 sm:pl-6">
                <span className="block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  99.2%
                </span>
                <span className="block font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider mt-1">
                  Stillness Index
                </span>
              </div>
            </div>

            {/* Action Row with Vita Star Icon */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/designer"
                className="inline-flex items-center gap-2.5 rounded-full bg-chart-1 px-6 py-3 text-xs sm:text-sm font-sans font-semibold text-[#0D2E37] hover:bg-white transition-all shadow-lg cursor-pointer group"
              >
                <span>Design Your Journey with DIA</span>
                <svg
                  className="h-3 w-3 fill-[#0D2E37] transition-transform group-hover:rotate-45 duration-300"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
                </svg>
              </Link>

              <a
                href="#combine"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-sans text-white hover:bg-white/10 transition-colors"
              >
                <span>Explore Combine Workflow</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
