"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Compass,
  CheckCircle,
  CloudSun,
  ShieldCheck,
  ArrowRight,
  Clock,
  Mic,
  Lock,
  X,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface AGUICanvasModalProps {
  isReducedMotion: boolean;
}

export interface DemoPreset {
  id: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  weather: string;
  temp: string;
  stillnessScore: number;
  rateInr: string;
  rateUsd: string;
  pacing: string;
  rhythm: { day: number; title: string; time: string; activity: string }[];
  prompt: string;
}

export const DEMO_PRESETS: Record<string, DemoPreset> = {
  udaipur: {
    id: "udaipur",
    title: "The Oberoi Udaivilas",
    destination: "Udaipur, Rajasthan",
    country: "India",
    image: UNSPLASH_ASSETS.udaivilasUdaipur.url,
    weather: "Crisp Lake Breeze",
    temp: "24°C",
    stillnessScore: 98,
    rateInr: "₹2,40,000",
    rateUsd: "$2,900",
    pacing: "Unhurried (5 Days)",
    prompt: "Plan 5 unhurried days in Udaipur staying at Lake Pichola palace courtyards with private sunrise boat access.",
    rhythm: [
      { day: 1, time: "16:00", title: "Lake Arrival", activity: "Private wooden boat transfer across Lake Pichola to Kohinoor Suite." },
      { day: 2, time: "09:30", title: "City Palace Heritage", activity: "Exclusive curator-led walk through the private Mewar royal archives." },
      { day: 3, time: "17:30", title: "Ayurvedic Immersion", activity: "Rooftop herbal oil therapy overlooking the Aravali ridge at sunset." },
    ],
  },
  kerala: {
    id: "kerala",
    title: "Kumarakom Emerald Houseboat",
    destination: "Vembanad Lake, Kerala",
    country: "India",
    image: UNSPLASH_ASSETS.keralaBackwaters.url,
    weather: "Warm Tropical Mist",
    temp: "28°C",
    stillnessScore: 96,
    rateInr: "₹1,80,000",
    rateUsd: "$2,150",
    pacing: "Restorative (4 Days)",
    prompt: "Design an Ayurvedic seclusion in Kumarakom backwaters with a private wooden houseboat and wellness rituals.",
    rhythm: [
      { day: 1, time: "14:00", title: "Canal Embarkation", activity: "Drifting along narrow emerald palm canals with private chef on board." },
      { day: 2, time: "07:00", title: "Dawn Birdsong", activity: "Silent canoe traversal into the Kumarakom sanctuary wetland." },
      { day: 3, time: "18:00", title: "Spiced Kerala Dining", activity: "Candlelit fresh catch dinner moored beneath banyan canopies." },
    ],
  },
  ladakh: {
    id: "ladakh",
    title: "Thiksey Stargazing Camp",
    destination: "Indus Valley, Ladakh",
    country: "India",
    image: UNSPLASH_ASSETS.ladakhStargazing.url,
    weather: "Alpine Solitude",
    temp: "11°C",
    stillnessScore: 99,
    rateInr: "₹2,10,000",
    rateUsd: "$2,500",
    pacing: "Solitude & High Altitude (6 Days)",
    prompt: "Orchestrate 6 days in Ladakh with high-altitude stargazing under Milky Way skies and Buddhist monastery visits.",
    rhythm: [
      { day: 1, time: "12:00", title: "Acclimatization", activity: "High-altitude oxygenated luxury tent rest with herbal butter tea." },
      { day: 2, time: "05:30", title: "Thiksey Morning Chants", activity: "Early prayer ceremony with resident Buddhist monks." },
      { day: 3, time: "21:30", title: "Milky Way Astronomy", activity: "Deep space telescope session guided by visiting astrophysicists." },
    ],
  },
  amalfi: {
    id: "amalfi",
    title: "Positano Clifftop Veranda",
    destination: "Positano, Amalfi Coast",
    country: "Italy",
    image: UNSPLASH_ASSETS.amalfiVeranda.url,
    weather: "Sunny Mediterranean Sea Air",
    temp: "26°C",
    stillnessScore: 94,
    rateInr: "₹3,20,000",
    rateUsd: "$3,850",
    pacing: "Coastal Respite (5 Days)",
    prompt: "A quiet Mediterranean retreat in Positano with clifftop terrace dining and private coastal cruising.",
    rhythm: [
      { day: 1, time: "15:00", title: "Terrace Check-in", activity: "Chilled limoncello on private cliffside terrace overlooking pastel villas." },
      { day: 2, time: "10:00", title: "Capri Private Cruise", activity: "Wooden Riva boat excursion to quiet grottoes avoiding tourist paths." },
      { day: 3, time: "20:00", title: "Michelin Dining", activity: "Cliffside seafood tasting menu paired with regional Campania vintages." },
    ],
  },
};

const SYNTHESIS_STEPS = [
  "Interpreting spatial cadence & stillness requirements...",
  "Querying verified private sanctuary availability & microclimates...",
  "Securing exclusive curator access & unhurried day rhythms...",
  "Synthesizing dynamic AG-UI itinerary cards...",
];

export function AGUICanvasModal({ isReducedMotion }: AGUICanvasModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("udaipur");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isVoiceGateOpen, setIsVoiceGateOpen] = useState(false);

  const activeData = DEMO_PRESETS[selectedKey] || DEMO_PRESETS.udaipur;

  // Lock body scroll and register Escape key listener when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const triggerSynthesis = (key: string) => {
    setIsSynthesizing(true);
    setActiveStepIndex(0);

    // Persist draft into localStorage for seamless handoff to profile/app
    if (typeof window !== "undefined") {
      const draft = {
        key,
        prompt: DEMO_PRESETS[key].prompt,
        destination: DEMO_PRESETS[key].destination,
        sanctuaryName: DEMO_PRESETS[key].title,
        timestamp: Date.now(),
      };
      localStorage.setItem("tripspree_draft_session", JSON.stringify(draft));
    }

    // Step progression animation
    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < SYNTHESIS_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 380);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsSynthesizing(false);
    }, 1400);
  };

  // Listen for prompts dispatched from the Hero chatbox
  useEffect(() => {
    const handleHeroPrompt = (e: Event) => {
      const customEvent = e as CustomEvent<{ destination?: string; prompt?: string }>;
      let matchedKey = "udaipur";
      if (customEvent.detail?.destination) {
        const dest = customEvent.detail.destination.toLowerCase();
        if (dest.includes("kerala")) matchedKey = "kerala";
        else if (dest.includes("ladakh")) matchedKey = "ladakh";
        else if (dest.includes("amalfi")) matchedKey = "amalfi";
      } else if (customEvent.detail?.prompt) {
        const p = customEvent.detail.prompt.toLowerCase();
        if (p.includes("kerala")) matchedKey = "kerala";
        else if (p.includes("ladakh")) matchedKey = "ladakh";
        else if (p.includes("amalfi")) matchedKey = "amalfi";
      }

      setSelectedKey(matchedKey);
      setIsOpen(true);
      triggerSynthesis(matchedKey);
    };

    window.addEventListener("dia-prompt-submitted", handleHeroPrompt);
    return () => window.removeEventListener("dia-prompt-submitted", handleHeroPrompt);
  }, []);

  const handleSelectPreset = (key: string) => {
    if (key === selectedKey && !isSynthesizing) return;
    setSelectedKey(key);
    triggerSynthesis(key);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
          transition={
            isReducedMotion
              ? { duration: 0.1 }
              : { type: "spring", damping: 30, stiffness: 320, bounce: 0 }
          }
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0c0717] text-white flex flex-col justify-between"
          aria-modal="true"
          role="dialog"
          aria-label="TripSpree Autonomous AG-UI Canvas"
        >
          {/* Top Bar: Navigation & Telemetry State */}
          <div className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#0c0717]/85 backdrop-blur-2xl backdrop-saturate-180 px-4 sm:px-8 py-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 px-4 py-2 text-xs font-sans text-white transition-all duration-100 cursor-pointer group"
              >
                <span className="text-white/60 group-hover:text-white transition-colors">←</span>
                <span>Return to Editorial</span>
              </button>

              <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10">
                <span className="flex h-2 w-2 rounded-full bg-[#8247ff] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#a855f7] font-semibold">
                  Autonomous Concierge • DIA 2.0
                </span>
              </div>
            </div>

            {/* Session Auto-Saved Badge */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#8247ff]/15 border border-[#8247ff]/30 px-3 py-1 text-[11px] font-mono text-[#a855f7] flex items-center gap-1.5 shadow-sm">
                <CheckCircle className="h-3.5 w-3.5 text-[#8247ff]" />
                <span className="hidden sm:inline">Session Captured to Profile</span>
                <span className="sm:hidden">Saved</span>
              </span>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Canvas (ESC)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Canvas Workspace */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
            {/* PHASE 1: Real-Time Generative Synthesis Animation */}
            {isSynthesizing ? (
              <motion.div
                key="synthesizing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="min-h-[55vh] flex flex-col items-center justify-center text-center p-8 sm:p-12 max-w-xl mx-auto"
              >
                {/* Neural Pulsing Monogram */}
                <div className="relative mb-8">
                  <div className="absolute -inset-4 rounded-full bg-[#8247ff]/20 blur-xl animate-pulse" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#130c24] border border-[#8247ff]/40 text-[#8247ff] shadow-2xl">
                    <Sparkles className="h-8 w-8 animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                </div>

                <div className="font-mono text-xs uppercase tracking-widest text-[#a855f7] mb-3 font-semibold">
                  Synthesizing Atelier Dossier
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white mb-6">
                  Curating {activeData.destination}
                </h2>

                {/* Progress Step Typewriter */}
                <div className="w-full rounded-2xl border border-white/10 bg-[#130c24]/90 p-4 shadow-xl">
                  <div className="flex items-center gap-3 text-left">
                    <RefreshCw className="h-4 w-4 text-[#8247ff] animate-spin shrink-0" />
                    <span className="font-sans text-xs sm:text-sm text-white/85 font-light transition-all">
                      {SYNTHESIS_STEPS[activeStepIndex]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* PHASE 2: Dynamic AG-UI Result Cascade */
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isReducedMotion ? 0.1 : 0.4 }}
                className="space-y-8"
              >
                {/* Simulation Realm Selector: Clean Flex-Wrap (Zero Horizontal Scrollbars) */}
                <div className="rounded-2xl border border-[#25183e] bg-[#130c24]/80 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <SlidersHorizontal className="h-4 w-4 text-[#8247ff]" />
                    <span className="font-mono text-[10px] uppercase text-white/50 tracking-wider">
                      Switch Simulation:
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {Object.entries(DEMO_PRESETS).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectPreset(key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-sans transition-all border cursor-pointer ${
                          selectedKey === key
                            ? "bg-[#8247ff] text-white border-[#8247ff] font-semibold shadow-md shadow-[#8247ff]/30"
                            : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:border-white/30"
                        }`}
                      >
                        {item.title} ({item.destination})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Prompt Card */}
                <div className="rounded-2xl border border-purple-200/20 bg-gradient-to-r from-[#130c24] to-[#1d1238] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8247ff]/20 text-[#8247ff] shrink-0 border border-[#8247ff]/30">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-[#a855f7] font-semibold">
                        Curated Inquiry
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-white italic font-normal">
                        &ldquo;{activeData.prompt}&rdquo;
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      Plan Calibrated
                    </span>
                  </div>
                </div>

                {/* Dynamic Generative Cards Layout: 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Sanctuary Dossier Card */}
                  <div className="lg:col-span-6 rounded-3xl border border-[#25183e] bg-[#130c24] overflow-hidden shadow-2xl group">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={activeData.image}
                        alt={activeData.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130c24] via-[#130c24]/20 to-transparent" />

                      {/* Floating Confidence Tier Chip */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="rounded-full bg-[#0c0717]/85 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-white border border-white/20 shadow-md flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Team-Vetted Sanctuary</span>
                        </span>

                        <span className="rounded-full bg-[#0c0717]/85 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-[#a855f7] border border-[#8247ff]/40 shadow-md">
                          {activeData.pacing}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1">
                          {activeData.destination} • {activeData.country}
                        </div>
                        <h3 className="font-serif text-2xl font-normal text-white">
                          {activeData.title}
                        </h3>
                      </div>

                      {/* Telemetry Metrics Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-white/50 mb-1">
                            <CloudSun className="h-3.5 w-3.5 text-[#a855f7]" />
                            <span>Climate</span>
                          </div>
                          <div className="font-sans text-xs sm:text-sm font-medium text-white">
                            {activeData.temp} • {activeData.weather}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-white/50 mb-1">
                            <Compass className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Stillness Index</span>
                          </div>
                          <div className="font-sans text-xs sm:text-sm font-semibold text-emerald-400">
                            {activeData.stillnessScore}% Quietude
                          </div>
                        </div>
                      </div>

                      {/* Transparent Pricing Indicator */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase text-white/40 block">
                            Direct Atelier Tariffs:
                          </span>
                          <span className="font-sans text-base sm:text-lg font-bold text-white">
                            {activeData.rateInr}
                          </span>
                          <span className="font-mono text-xs text-white/50 ml-1.5">
                            ({activeData.rateUsd})
                          </span>
                        </div>

                        <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                          No Booking Markups
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Unhurried Day Cadences */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#8247ff]" />
                        <span className="font-serif text-lg font-medium text-white">
                          Living Cadence Rhythms
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase text-white/50">
                        Synthesized by DIA
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeData.rhythm.map((item, idx) => (
                        <motion.div
                          key={item.day}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                          className="rounded-2xl border border-white/10 bg-[#130c24]/90 p-4 hover:border-primary/40 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-[#8247ff]/20 border border-[#8247ff]/40 px-2 py-0.5 text-[10px] font-mono text-[#a855f7] font-semibold">
                                Day {item.day}
                              </span>
                              <span className="font-sans text-sm font-semibold text-white">
                                {item.title}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] text-white/50">
                              {item.time}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-white/75 leading-relaxed">
                            {item.activity}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Member Voice Gate Teaser */}
                    <div className="rounded-2xl border border-purple-200/20 bg-white/[0.02] p-4 flex items-center justify-between gap-4 mt-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8247ff]/20 text-[#8247ff] border border-[#8247ff]/30 shrink-0">
                          <Mic className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-sans text-xs font-medium text-white">
                            Discuss this itinerary live with DIA
                          </div>
                          <div className="font-sans text-[11px] text-white/60">
                            Voice-first conversational itinerary refinement
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsVoiceGateOpen(true)}
                        className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-sans text-white transition-all shrink-0 cursor-pointer"
                      >
                        Talk with DIA
                      </button>
                    </div>

                    {/* Primary Atelier Launch Button */}
                    <div className="pt-4">
                      <Link href="/designer" onClick={() => setIsOpen(false)}>
                        <Button className="w-full h-12 rounded-xl bg-[#8247ff] hover:bg-[#7034f5] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 shadow-xl shadow-[#8247ff]/25 cursor-pointer">
                          <span>Claim Itinerary & Enter Atelier</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <p className="font-sans text-[11px] text-white/50 text-center mt-2 font-light">
                        Session will be carried directly into your personal workspace without re-entry.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Footer Border */}
          <div className="border-t border-white/10 px-6 py-4 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              TripSpree • Digital Private Atelier • All Rights Reserved
            </span>
          </div>

          {/* Voice Gate Dialog Modal */}
          <AnimatePresence>
            {isVoiceGateOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#130c24] p-6 shadow-2xl text-white"
                >
                  <button
                    type="button"
                    onClick={() => setIsVoiceGateOpen(false)}
                    className="absolute top-4 right-4 p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8247ff]/20 text-[#8247ff] mb-4 border border-[#8247ff]/30">
                    <Mic className="h-6 w-6" />
                  </div>

                  <div className="flex items-center gap-2 text-[#a855f7] font-mono text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                    <Lock className="h-3 w-3" />
                    <span>Member-Only In-App Call</span>
                  </div>

                  <h2 className="font-serif text-xl font-medium tracking-tight text-white mb-2">
                    Live Voice Consultation with DIA
                  </h2>

                  <p className="font-sans text-xs text-white/70 leading-relaxed mb-6">
                    In order to access live, low-latency in-app voice calls with DIA, please sign in with your member passkey or email.
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <Link href="/designer" onClick={() => setIsVoiceGateOpen(false)}>
                      <Button className="w-full rounded-xl bg-[#8247ff] text-white hover:bg-[#7034f5] font-sans text-xs font-semibold cursor-pointer">
                        Sign In to Unlock Voice Call
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      onClick={() => setIsVoiceGateOpen(false)}
                      className="w-full rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-xs font-sans text-white cursor-pointer"
                    >
                      Return to Plan
                    </Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
