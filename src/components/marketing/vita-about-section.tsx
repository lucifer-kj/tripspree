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
      className="relative bg-[#0c0717] text-white py-28 sm:py-36 md:py-44 border-b border-white/10 overflow-hidden"
      aria-label="About TripSpree"
    >
      {/* Decorative background grid subtle lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f70a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo Frame with 650ms Luxury Easing (5 cols) */}
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
                className="object-cover group-hover:scale-105 transition-transform duration-[650ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0717]/90 via-[#0c0717]/20 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0717]/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-[#a855f7]">
                  <span className="text-xs">✦</span>
                  <span>Digital Atelier</span>
                </div>
              </div>

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0c0717]/85 backdrop-blur-md border border-white/10">
                <p className="font-serif italic text-xs sm:text-sm text-white/90 leading-snug">
                  &ldquo;Travel is not an escape. It is an awakening of senses long dulled by the commonplace.&rdquo;
                </p>
                <span className="block font-mono text-[10px] uppercase text-[#a855f7] tracking-wider mt-2">
                  — The TripSpree Manifesto
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Manifesto with Line-Masking Wipes (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7] mb-4">
                <span>+</span>
                <span>OUR ESSENCE</span>
              </div>

              {/* Vita-Style Line-Masking Typography Wipes out of invisible slots */}
              <div className="mb-6">
                <div className="overflow-hidden pb-1">
                  <motion.h2
                    initial={isReducedMotion ? {} : { y: "110%" }}
                    whileInView={isReducedMotion ? {} : { y: "0%" }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-[1.05]"
                  >
                    Travel should not be an exhausting checklist,
                  </motion.h2>
                </div>
                <div className="overflow-hidden my-1 sm:my-2 pb-1">
                  <motion.div
                    initial={isReducedMotion ? {} : { y: "110%" }}
                    whileInView={isReducedMotion ? {} : { y: "0%" }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif italic font-normal lowercase text-[#a855f7] tracking-normal text-3xl sm:text-4xl md:text-5xl sm:pl-8"
                  >
                    but an unhurried return
                  </motion.div>
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.div
                    initial={isReducedMotion ? {} : { y: "110%" }}
                    whileInView={isReducedMotion ? {} : { y: "0%" }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-[1.05]"
                  >
                    to intuition and wonder.
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={isReducedMotion ? {} : { opacity: 0, y: 15 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-sans text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light mb-8 max-w-2xl"
              >
                Unlike mass-market algorithmic OTAs driven by sponsored bidding and crowded routes, TripSpree operates as a private digital atelier. Here, our autonomous travel concierge <strong className="text-white font-medium">DIA</strong> unites with generational local specialists to architect journeys of stillness, rare access, and architectural pedigree.
              </motion.p>
            </div>

            {/* Vita Stat Counter Boxes with Staggered Fade-Up */}
            <div className="grid grid-cols-3 border-y border-white/10 py-6 mb-8 gap-4 sm:gap-6">
              <motion.div
                initial={isReducedMotion ? {} : { opacity: 0, y: 18 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  100+
                </span>
                <span className="block font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider mt-1">
                  Verified Sanctuaries
                </span>
              </motion.div>
              <motion.div
                initial={isReducedMotion ? {} : { opacity: 0, y: 18 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border-l border-white/10 pl-4 sm:pl-6"
              >
                <span className="block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-[#a855f7] tracking-tight">
                  1,470+
                </span>
                <span className="block font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider mt-1">
                  Journeys Curated
                </span>
              </motion.div>
              <motion.div
                initial={isReducedMotion ? {} : { opacity: 0, y: 18 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-l border-white/10 pl-4 sm:pl-6"
              >
                <span className="block font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  99.2%
                </span>
                <span className="block font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider mt-1">
                  Stillness Index
                </span>
              </motion.div>
            </div>

            {/* Action Row with Vita Star Icon */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/designer"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-sans font-semibold text-[#0c0717] hover:bg-white/90 active:scale-95 transition-all shadow-lg cursor-pointer group"
              >
                <span>Design Your Journey with DIA</span>
                <svg
                  className="h-3 w-3 fill-[#0c0717] transition-transform group-hover:rotate-45 duration-300"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
                </svg>
              </Link>

              <a
                href="#combine"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-sans text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <span>Explore Combine Workflow</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
