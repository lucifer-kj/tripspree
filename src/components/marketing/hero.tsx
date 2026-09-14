"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Mic, Sparkles, Compass, Lock, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  isReducedMotion: boolean;
}

const QUICK_INSPIRATIONS = [
  { id: "udaipur", label: "Udaipur Royal Palaces", prompt: "Plan 5 unhurried days in Udaipur staying at Lake Pichola palace courtyards with private sunrise boat access." },
  { id: "kerala", label: "Kerala Backwaters & Ayurveda", prompt: "Design an Ayurvedic seclusion in Kumarakom backwaters with a private wooden houseboat and wellness rituals." },
  { id: "ladakh", label: "Ladakh Stargazing Solitude", prompt: "Orchestrate 6 days in Ladakh with high-altitude stargazing under Milky Way skies and Buddhist monastery visits." },
  { id: "amalfi", label: "Amalfi Coast Veranda", prompt: "A quiet Mediterranean retreat in Positano with clifftop terrace dining and private coastal cruising." },
];

export function Hero({ isReducedMotion }: HeroProps) {
  const [promptInput, setPromptInput] = useState("");
  const [isVoiceGateOpen, setIsVoiceGateOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax physics with container-clipped boundary
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Layered Parallax Depths (Vita Travels signature 3-plane effect)
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const mountainsY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

  const handleTriggerPrototype = (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput.trim();
    if (!activePrompt) return;

    // Save initial session draft to localStorage for seamless carryover
    if (typeof window !== "undefined") {
      const draft = {
        prompt: activePrompt,
        timestamp: Date.now(),
        destination: activePrompt.includes("Kerala")
          ? "Kumarakom, Kerala"
          : activePrompt.includes("Ladakh")
          ? "Thiksey, Ladakh"
          : activePrompt.includes("Amalfi")
          ? "Positano, Amalfi"
          : "Udaipur, Rajasthan",
      };
      localStorage.setItem("tripspree_draft_session", JSON.stringify(draft));
      window.dispatchEvent(new CustomEvent("dia-prompt-submitted", { detail: draft }));
    }

    // Smooth scroll down to the expandable AG-UI Demo Prototype container
    const prototypeElement = document.getElementById("dia-prototype");
    if (prototypeElement) {
      prototypeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] lg:min-h-[105vh] w-full overflow-hidden bg-[#091b20] text-white flex flex-col justify-between"
      aria-label="TripSpree Hero Section"
    >
      {/* Vita Architectural Corner Cross Markers */}
      <div className="absolute top-24 left-6 z-30 text-white/30 font-mono text-sm select-none pointer-events-none">+</div>
      <div className="absolute top-24 right-6 z-30 text-white/30 font-mono text-sm select-none pointer-events-none">+</div>

      {/* LAYER 0: Sky Base Image */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : skyY }}
        className="absolute inset-0 z-0 h-[115%] -top-[5%] w-full pointer-events-none select-none"
      >
        <Image
          src="/images/hero/bg-sky.webp"
          alt="Expansive atmospheric sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#091b20]/25 mix-blend-multiply" />
      </motion.div>

      {/* LAYER 1: Mountain Cutout (Midground) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : mountainsY }}
        className="absolute inset-x-0 top-[12%] sm:top-[8%] md:top-[6%] z-[1] h-[75%] sm:h-[80%] w-full pointer-events-none select-none"
      >
        <div className="relative h-full w-full max-w-7xl mx-auto">
          <Image
            src="/images/hero/bg-mountains.png"
            alt="Snowcapped mountain ridges"
            fill
            priority
            sizes="100vw"
            className="object-contain sm:object-cover object-center"
          />
        </div>
      </motion.div>

      {/* LAYER 2: Monumental Typography (Sits BEHIND the foreground plains cutout) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : textY }}
        className="relative z-[2] w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 md:pt-36 flex flex-col items-center text-center pointer-events-none select-none"
      >
        {/* Subtle Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-[#091b20]/60 backdrop-blur-md mb-4 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-1 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-1" />
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white font-semibold">
            India&apos;s 1st Autonomous AI Travel Platform
          </span>
        </div>

        {/* Vita Style Monumental 3-Line Headline */}
        <h1 className="font-sans font-extrabold uppercase tracking-[-0.04em] text-white text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.88] drop-shadow-lg">
          <span className="block">TRAVEL</span>
          <span className="block font-serif italic lowercase font-normal text-chart-1 tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] -my-1 sm:-my-3">
            is an
          </span>
          <span className="block">AWAKENING</span>
        </h1>
      </motion.div>

      {/* LAYER 3: Foreground Plains Cutout (Yurts, horse, golden hills - sits in FRONT of typography) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : foregroundY }}
        className="absolute inset-x-0 bottom-0 z-[3] h-[45%] sm:h-[52%] md:h-[60%] w-full pointer-events-none select-none"
      >
        <Image
          src="/images/hero/bg-foreground.png"
          alt="Foreground landscape plains with nomadic yurts and grazing horse"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Subtle Dark Vignette at the extreme bottom edge to transition into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#091b20] via-[#091b20]/70 to-transparent" />
      </motion.div>

      {/* LAYER 4: Interactive Front Surface (Chatbox, Subtitle, Telemetry, and CTAs) */}
      <div className="relative z-[10] w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 flex flex-col items-center text-center">
        {/* Editorial Subtitle */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-6 font-light drop-shadow-md">
          Where human intuition meets autonomous travel intelligence. Speak or type with{" "}
          <strong className="text-white font-semibold">DIA</strong> to orchestrate unhurried journeys of stillness, rare access, and architectural wonder across India and the globe.
        </p>

        {/* Integrated Concierge Chatbox & Inquiries */}
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-white/20 bg-[#091b20]/90 backdrop-blur-xl p-3 sm:p-4 shadow-2xl text-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTriggerPrototype();
              }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Where is your mind drifting? (e.g. 5 days in Udaipur palaces...)"
                  className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-chart-1 transition-all font-sans"
                />
              </div>

              {/* Mic Button -> Voice Gate Modal */}
              <button
                type="button"
                onClick={() => setIsVoiceGateOpen(true)}
                title="Voice Call with DIA (Member Feature)"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/80 hover:text-chart-1 hover:border-chart-1/50 transition-all cursor-pointer"
              >
                <Mic className="h-4 w-4" />
              </button>

              {/* Consult Button with Vita Pill Style */}
              <Button
                type="submit"
                size="default"
                className="h-11 rounded-xl bg-chart-1 text-[#0D2E37] hover:bg-white px-4 sm:px-5 text-xs sm:text-sm font-sans font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
              >
                <span>Consult DIA</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>

            {/* Quick Inspirations */}
            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 mr-1">
                Quick Inquiries:
              </span>
              {QUICK_INSPIRATIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPromptInput(item.prompt);
                    handleTriggerPrototype(item.prompt);
                  }}
                  className="rounded-lg border border-white/15 bg-white/5 hover:bg-chart-1/20 hover:border-chart-1/40 px-2.5 py-1 text-[11px] font-sans text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Micro Telemetry Stats */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] font-mono text-white/70">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-chart-1" />
              Autonomous DIA 2.0 Engine
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="flex items-center gap-1.5">
              <Compass className="h-3 w-3 text-chart-1" />
              60+ Verified Sanctuaries
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-chart-1" />
              100% Specialist-Vetted Logistics
            </span>
          </div>
        </div>
      </div>

      {/* Voice Gate Dialog Modal */}
      <AnimatePresence>
        {isVoiceGateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#091b20] p-6 shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={() => setIsVoiceGateOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-1/10 text-chart-1 mb-4 border border-chart-1/20">
                <Mic className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-2 text-chart-1 font-mono text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                <Lock className="h-3 w-3" />
                <span>Member-Only In-App Call</span>
              </div>

              <h2 className="font-serif text-xl font-medium tracking-tight text-white mb-2">
                Live Voice Consultation with DIA
              </h2>

              <p className="font-sans text-xs text-white/70 leading-relaxed mb-6">
                In order to access live, low-latency in-app voice calls with DIA (powered by our conversational audio engine), please sign in with your complimentary member passkey or email.
              </p>

              <div className="flex flex-col gap-2.5">
                <Link href="/designer" onClick={() => setIsVoiceGateOpen(false)}>
                  <Button className="w-full rounded-xl bg-chart-1 text-[#0D2E37] hover:bg-white font-sans text-xs font-semibold cursor-pointer">
                    Sign In to Unlock Voice Call
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsVoiceGateOpen(false);
                    handleTriggerPrototype("Plan an unhurried 5-day retreat in Udaipur");
                  }}
                  className="w-full rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-xs font-sans text-white cursor-pointer"
                >
                  Try Interactive Text Prototype Below
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
