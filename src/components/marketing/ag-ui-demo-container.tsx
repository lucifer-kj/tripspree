"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  CloudSun,
  ShieldCheck,
  ArrowRight,
  Clock,
  Compass,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

interface AGUIDemoContainerProps {
  isReducedMotion: boolean;
}

interface DemoPreset {
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

const DEMO_PRESETS: Record<string, DemoPreset> = {
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

export function AGUIDemoContainer({ isReducedMotion }: AGUIDemoContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("udaipur");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [sessionCaptured, setSessionCaptured] = useState(false);

  const activeData = DEMO_PRESETS[selectedKey] || DEMO_PRESETS.udaipur;

  // Listen for prompts dispatched from the Hero chatbox
  useEffect(() => {
    const handleHeroPrompt = (e: Event) => {
      const customEvent = e as CustomEvent<{ destination?: string; prompt?: string }>;
      if (customEvent.detail?.destination) {
        const dest = customEvent.detail.destination.toLowerCase();
        if (dest.includes("kerala")) setSelectedKey("kerala");
        else if (dest.includes("ladakh")) setSelectedKey("ladakh");
        else if (dest.includes("amalfi")) setSelectedKey("amalfi");
        else setSelectedKey("udaipur");
      }
      setIsExpanded(true);
      setSessionCaptured(true);
    };

    window.addEventListener("dia-prompt-submitted", handleHeroPrompt);
    return () => window.removeEventListener("dia-prompt-submitted", handleHeroPrompt);
  }, []);

  const handleSelectPreset = (key: string) => {
    if (key === selectedKey && isExpanded) return;
    setIsSynthesizing(true);
    setSelectedKey(key);
    setIsExpanded(true);
    setSessionCaptured(true);

    // Persist draft into localStorage
    if (typeof window !== "undefined") {
      const draft = {
        key,
        prompt: DEMO_PRESETS[key].prompt,
        destination: DEMO_PRESETS[key].destination,
        sanctuaryName: DEMO_PRESETS[key].title,
      };
      localStorage.setItem("tripspree_draft_session", JSON.stringify(draft));
    }

    setTimeout(() => {
      setIsSynthesizing(false);
    }, 450);
  };

  return (
    <section
      id="dia-prototype"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 text-white"
      aria-label="DIA Autonomous Concierge Prototype"
    >
      {/* Contained Glassmorphic Prototype Container */}
      <div className="rounded-3xl border border-white/15 bg-[#091b20]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Prototype Container Header Bar */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-chart-1 font-semibold">
                Autonomous Concierge Trial • DIA 2.0
              </span>
              <span className="rounded-full bg-chart-1/10 border border-chart-1/20 px-2 py-0.5 text-[9px] font-mono text-chart-1">
                Prototype Canvas
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white">
              Experience the Dynamic AG-UI Canvas
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/70 mt-1 max-w-xl leading-relaxed font-light">
              Test how DIA autonomously synthesizes verified sanctuary stays, real-time climate telemetry, and unhurried day cadences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-sans text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>{isExpanded ? "Collapse Trial" : "Expand Live Prototype"}</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>

        {/* Interactive Preset Chips Bar */}
        <div className="px-6 sm:px-8 py-3.5 bg-black/20 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-mono text-[10px] uppercase text-white/50 shrink-0 mr-1 tracking-wider">
            Select Simulation Realm:
          </span>
          {Object.entries(DEMO_PRESETS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleSelectPreset(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans whitespace-nowrap transition-all border cursor-pointer ${
                selectedKey === key && isExpanded
                  ? "bg-chart-1 text-[#0D2E37] border-chart-1 font-semibold shadow-sm"
                  : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:border-white/30"
              }`}
            >
              {item.title} ({item.destination})
            </button>
          ))}
        </div>

        {/* Collapsed Teaser State (when not yet expanded) */}
        {!isExpanded && (
          <div
            onClick={() => setIsExpanded(true)}
            className="p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/10 transition-colors group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-1">
              Click to Open the Interactive Trial Canvas
            </h3>
            <p className="font-sans text-xs text-muted-foreground max-w-md mb-4">
              Explore dynamic Generative UI cards, stillness scores, and living day rhythms generated by DIA in real-time.
            </p>
            <span className="font-mono text-[11px] text-primary underline flex items-center gap-1">
              Launch Live Simulation <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        )}

        {/* Expanded Generative UI Canvas Area */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Active Prompt Reflection Bar */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border text-xs font-sans">
                <div className="flex items-center gap-2 overflow-hidden text-ellipsis">
                  <span className="font-mono text-[10px] uppercase text-primary font-semibold shrink-0">
                    DIA Input:
                  </span>
                  <span className="text-foreground/90 italic truncate">&ldquo;{activeData.prompt}&rdquo;</span>
                </div>
                {isSynthesizing ? (
                  <span className="font-mono text-[10px] text-primary flex items-center gap-1 shrink-0 animate-spin">
                    <RefreshCw className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-chart-1 flex items-center gap-1 shrink-0">
                    <CheckCircle className="h-3 w-3" /> Synthesized
                  </span>
                )}
              </div>

              {/* Generative AG-UI Layout: Split Column */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Dynamic Luxury Sanctuary Card */}
                <div className="lg:col-span-6 rounded-2xl border border-white/15 bg-white/[0.02] overflow-hidden shadow-md group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={activeData.image}
                      alt={activeData.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-full bg-[#091b20]/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white border border-white/20 shadow-sm flex items-center gap-1">
                        <Compass className="h-3 w-3 text-chart-1" />
                        {activeData.destination}
                      </span>
                      <span className="rounded-full bg-chart-1 px-2.5 py-1 text-[10px] font-mono text-[#0D2E37] font-semibold shadow-sm flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        {activeData.stillnessScore}/100 Stillness
                      </span>
                    </div>

                    {/* Bottom Sanctuary Details */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-mono text-[10px] tracking-wider uppercase text-white/80 mb-0.5">
                        {activeData.country} • Sanctuary Stay
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight">
                        {activeData.title}
                      </h3>
                    </div>
                  </div>

                  {/* Micro Metadata Footer on Card */}
                  <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="flex items-center gap-1 text-white/70">
                        <CloudSun className="h-3.5 w-3.5 text-chart-1" />
                        {activeData.temp} • {activeData.weather}
                      </span>
                      <span className="text-white/30">|</span>
                      <span className="text-white/70">{activeData.pacing}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-serif font-bold text-white">
                        {activeData.rateInr}{" "}
                        <span className="text-[10px] font-sans font-normal text-white/60">
                          ({activeData.rateUsd})
                        </span>
                      </span>
                      <span className="block text-[9px] font-mono text-white/50">per night • verified</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 3-Day Living Rhythm Preview */}
                <div className="lg:col-span-6 rounded-2xl border border-white/15 bg-white/[0.02] p-5 sm:p-6 shadow-md flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-chart-1" />
                        Autonomous Day Cadence (Preview)
                      </span>
                      <span className="font-mono text-[10px] text-chart-1">Restful Rhythm</span>
                    </div>

                    {/* Timeline Days */}
                    <div className="space-y-4">
                      {activeData.rhythm.map((item) => (
                        <div key={item.day} className="flex gap-3 text-xs font-sans">
                          <div className="flex flex-col items-center">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chart-1/10 border border-chart-1/30 font-mono text-[10px] font-semibold text-chart-1">
                              0{item.day}
                            </span>
                            {item.day !== 3 && <div className="w-px h-full bg-white/10 my-1" />}
                          </div>
                          <div className="pb-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-medium text-white">{item.title}</span>
                              <span className="font-mono text-[10px] text-white/50">{item.time}</span>
                            </div>
                            <p className="text-xs text-white/70 leading-relaxed font-light">
                              {item.activity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frictionless Session Capture & Sign-In Callout */}
                  <div className="mt-6 p-4 rounded-xl border border-white/15 bg-white/[0.03] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-chart-1 font-semibold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Session Saved to Profile
                      </span>
                      <span className="font-mono text-[9px] text-chart-1 bg-chart-1/10 px-2 py-0.5 rounded-full border border-chart-1/20">
                        {sessionCaptured ? "Ready to Transfer" : "Active"}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                      This trial itinerary draft is temporarily stored. Sign in to unlock full day-by-day modifications, custom chauffeur logistics, and live in-app voice calls with DIA without repeating your preferences.
                    </p>

                    <Link href={`/designer?draft=${selectedKey}`} className="block">
                      <Button className="w-full rounded-xl bg-chart-1 text-[#0D2E37] hover:bg-white font-sans text-xs font-semibold cursor-pointer shadow-md flex items-center justify-center gap-2 transition-colors">
                        <span>Save Itinerary & Continue with DIA</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
