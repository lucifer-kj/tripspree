"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

  const currentTab = TAB_DATA[activeTab];

  return (
    <section
      id="combine"
      className="relative bg-[#091b20] text-white py-24 sm:py-32 border-b border-white/10"
      aria-label="TripSpree Combine Workflow"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-chart-1 mb-3">
              <span>+</span>
              <span>TAILORED ORCHESTRATION</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Combine Stay, Transit & <br />
              <span className="font-serif italic font-normal lowercase text-chart-1">
                curated stillness
              </span>{" "}
              seamlessly
            </h2>
          </div>

          {/* Vita Style Tab Selectors */}
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
            {(["stay", "transfers", "extras"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-chart-1 text-[#0D2E37] font-semibold shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {TAB_DATA[tab].label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Description Banner */}
        <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-sans font-bold text-lg text-white mb-1">
              {currentTab.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-2xl font-light">
              {currentTab.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-mono text-chart-1">
              <ShieldCheck className="h-4 w-4" />
              Specialist Vetted
            </span>
          </div>
        </div>

        {/* 4-Step Architecture Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={isReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={isReducedMotion ? {} : { opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentTab.steps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:border-white/20"
              >
                {/* Step Top Row */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xl font-bold text-chart-1">
                    {item.step}
                  </span>
                  <span className="font-mono text-white/30 text-xs group-hover:text-chart-1 transition-colors">
                    +
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 mb-6">
                  <h4 className="font-sans font-bold text-base sm:text-lg text-white mb-2.5 group-hover:text-chart-1 transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/50">{item.tag}</span>
                  <span className="text-chart-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA Row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.04] to-transparent gap-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-chart-1/10 border border-chart-1/20 flex items-center justify-center text-chart-1">
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
            className="inline-flex items-center gap-2 rounded-full bg-chart-1 px-6 py-3 text-xs sm:text-sm font-sans font-semibold text-[#0D2E37] hover:bg-white transition-all shadow-md cursor-pointer group shrink-0"
          >
            <span>Launch Combine Studio</span>
            <svg
              className="h-2.5 w-2.5 fill-[#0D2E37] transition-transform group-hover:rotate-45 duration-300"
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
