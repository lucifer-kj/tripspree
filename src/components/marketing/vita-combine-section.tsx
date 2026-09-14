"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

interface VitaCombineSectionProps {
  isReducedMotion: boolean;
}

type TabType = "stay" | "transfers" | "extras";

interface StepItem {
  step: string;
  title: string;
  desc: string;
  tag: string;
}

const TAB_DATA: Record<TabType, { label: string; title: string; desc: string; steps: StepItem[] }> = {
  stay: {
    label: "+ Stay",
    title: "Uncompromising Private Havens",
    desc: "From 200-year-old Mewari royal courtyards to high-altitude Himalayan nomadic camps, every stay is hand-inspected for stillness and soul.",
    steps: [
      {
        step: "01",
        title: "Choose Sanctuary Base",
        desc: "Select verified estates vetted for architectural purity, zero tourist congestion, and deep acoustic stillness.",
        tag: "Acoustic Silence Verified",
      },
      {
        step: "02",
        title: "Match Heritage Wings",
        desc: "DIA unlocks private sequestered pavilions, unlisted garden wings, and restored palatial courtyards.",
        tag: "Unlisted Wing Access",
      },
      {
        step: "03",
        title: "Pacing & Rhythm Alignment",
        desc: "Synchronize check-ins with natural biological circadian cycles and private sunrise or dusk lighting.",
        tag: "Circadian Timed",
      },
      {
        step: "04",
        title: "Autonomous Brief Generation",
        desc: "Instant pre-departure concierge dossier loaded directly into your private member passbook.",
        tag: "Zero Redundancy",
      },
    ],
  },
  transfers: {
    label: "+ Transfers",
    title: "Quiet Transit Without Commercial Friction",
    desc: "Bypass terminal queues and crowded docks with private solar-electric boats, high-pass 4x4 escorts, and seaplane charters.",
    steps: [
      {
        step: "01",
        title: "Private Arrival Clearance",
        desc: "Tarmac greet and seamless luggage transfer directly to your sequestered transport vessel.",
        tag: "Airside Greeting",
      },
      {
        step: "02",
        title: "Solar & Electric Craft",
        desc: "Silent solar-powered wooden launches on Lake Pichola and silent electric kettuvallams across Vembanad.",
        tag: "Zero Engine Noise",
      },
      {
        step: "03",
        title: "High-Pass Escort Vehicles",
        desc: "Pressurized luxury alpine transports for Leh-Ladakh mountain passes with onboard oxygen monitoring.",
        tag: "Medical-Grade Safety",
      },
      {
        step: "04",
        title: "Real-Time Telemetry Tracking",
        desc: "DIA monitors flight status, mountain pass weather, and water levels to autonomously adapt routes.",
        tag: "Autonomous Rerouting",
      },
    ],
  },
  extras: {
    label: "+ Curated Extras",
    title: "Rare Access & Generational Expertise",
    desc: "Bespoke encounters curated by local cultural guardians, Michelin private chefs, and high-altitude astronomers.",
    steps: [
      {
        step: "01",
        title: "Palace Archives & Curators",
        desc: "Private dusk tours of royal Mewar manuscript libraries guided by the royal family's personal historian.",
        tag: "Exclusive Royal Entry",
      },
      {
        step: "02",
        title: "Bespoke Ayurvedic Healers",
        desc: "Personalized consultations with multigenerational Vaidyas in Kerala with custom medicinal herbs.",
        tag: "Lineage Practitioners",
      },
      {
        step: "03",
        title: "Astronomer Stargazing",
        desc: "Night sessions beneath Ladakh's Bortle Class 1 dark sky with computerized deep-space telescopes.",
        tag: "Bortle-1 Dark Sky",
      },
      {
        step: "04",
        title: "Private Organic Degustation",
        desc: "Intimate dinners served on clifftop terraces or ancient marble courtyards with hyper-local seasonal produce.",
        tag: "Private Chef Service",
      },
    ],
  },
};

export function VitaCombineSection({ isReducedMotion }: VitaCombineSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("stay");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax background image translates at a slower velocity than foreground content
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const currentTab = TAB_DATA[activeTab];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="combine"
      className="relative bg-[#0c0717] text-white py-28 sm:py-36 border-b border-white/10 overflow-hidden"
      aria-label="TripSpree Combine Workflow"
    >
      {/* 3D Parallax Background Image translating slower than foreground */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : bgParallaxY }}
        className="absolute -top-[18%] inset-x-0 -bottom-[18%] w-full pointer-events-none select-none z-0"
      >
        <Image
          src="/images/hero/bg-sky.webp"
          alt="Atmospheric landscape backdrop"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        {/* Soft Obsidian Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0717] via-[#0c0717]/85 to-[#0c0717]" />
        <div className="absolute inset-0 bg-[radial-gradient(#8247ff15_1px,transparent_1px)] [background-size:36px_36px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#a855f7] mb-3">
              <span>+</span>
              <span>TAILORED ORCHESTRATION</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Combine Stay, Transit & <br />
              <span className="font-serif italic font-normal lowercase text-[#a855f7]">
                curated stillness
              </span>{" "}
              seamlessly
            </h2>
          </div>

          {/* Vita Style Tab Selectors with Apple Tactile Feedback */}
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
            {(["stay", "transfers", "extras"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all duration-100 cursor-pointer active:scale-95 ${
                  activeTab === tab
                    ? "bg-primary text-white font-semibold shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {TAB_DATA[tab].label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Description Banner */}
        <div className="mb-12 p-6 sm:p-7 rounded-2xl border border-[#25183e] bg-[#130c24]/90 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h3 className="font-sans font-bold text-lg text-white mb-1">
              {currentTab.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-2xl font-light">
              {currentTab.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#a855f7]">
              <ShieldCheck className="h-4 w-4" />
              Specialist Vetted
            </span>
          </div>
        </div>

        {/* 4-Step Architecture Cards Grid with Staggered Fade-Up Reveals */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial={isReducedMotion ? "visible" : "hidden"}
            animate="visible"
            exit={isReducedMotion ? {} : { opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentTab.steps.map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="relative rounded-2xl border border-[#25183e] bg-[#130c24]/90 backdrop-blur-md hover:bg-[#180f2e] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:border-primary/40 active:scale-[0.985] shadow-lg"
              >
                {/* Step Top Row */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xl font-bold text-[#a855f7]">
                    {item.step}
                  </span>
                  <span className="font-mono text-white/30 text-xs group-hover:text-[#a855f7] transition-colors">
                    +
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 mb-6">
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white mb-2.5 group-hover:text-[#a855f7] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/50">{item.tag}</span>
                  <span className="text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA Row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-2xl border border-[#25183e] bg-gradient-to-r from-white/[0.04] to-transparent gap-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-sm text-white">
                Ready to assemble your bespoke itinerary?
              </h4>
              <p className="font-sans text-xs text-white/60 font-light">
                DIA seamlessly combines sanctuaries, transfers, and clearance in seconds.
              </p>
            </div>
          </div>

          <Link
            href="/designer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-sans font-semibold text-[#0c0717] hover:bg-white/90 transition-all shadow-md cursor-pointer group shrink-0"
          >
            <span>Launch Combine Studio</span>
            <svg
              className="h-2.5 w-2.5 fill-[#0c0717] transition-transform group-hover:rotate-45 duration-300"
              viewBox="0 0 8 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
