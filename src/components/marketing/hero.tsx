"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Mic, Sparkles, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  isReducedMotion: boolean;
}

const QUICK_INSPIRATIONS = [
  { id: "udaipur", label: "Udaipur Palaces", prompt: "Plan 5 unhurried days in Udaipur staying at Lake Pichola palace courtyards with private sunrise boat access." },
  { id: "kerala", label: "Kerala Backwaters", prompt: "Design an Ayurvedic seclusion in Kumarakom backwaters with a private wooden houseboat and wellness rituals." },
  { id: "ladakh", label: "Ladakh Solitude", prompt: "Orchestrate 6 days in Ladakh with high-altitude stargazing under Milky Way skies and Buddhist monastery visits." },
  { id: "amalfi", label: "Amalfi Veranda", prompt: "A quiet Mediterranean retreat in Positano with clifftop terrace dining and private coastal cruising." },
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

  // Authentic 2-plane parallax depths matching Vita Travels
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  const handleTriggerPrototype = (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput.trim();
    if (!activePrompt) return;

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

    const prototypeElement = document.getElementById("dia-prototype");
    if (prototypeElement) {
      prototypeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] lg:min-h-[102vh] w-full overflow-hidden bg-[#0c0717] text-white flex flex-col justify-between"
      aria-label="TripSpree Hero Section"
    >
      {/* Vita Architectural Corner Cross Markers */}
      <div className="absolute top-24 left-6 z-20 text-white/30 font-mono text-sm select-none pointer-events-none">+</div>
      <div className="absolute top-24 right-6 z-20 text-white/30 font-mono text-sm select-none pointer-events-none">+</div>

      {/* LAYER 0: Authentic Full-Bleed Sky & Mountain Landscape (100vw, no container box) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : backgroundY }}
        className="absolute inset-0 z-0 h-[112%] -top-[6%] w-full pointer-events-none select-none"
      >
        <Image
          src="/images/hero/bg-part-1.webp"
          alt="Expansive mountain landscape and atmospheric sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0717]/30 via-transparent to-transparent" />
      </motion.div>

      {/* LAYER 1: Monumental Title "Travel" (z-index: 2 - lower portion tucks behind foreground ridge) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : textY }}
        className="relative z-[2] w-full max-w-5xl mx-auto px-6 pt-32 sm:pt-36 md:pt-40 flex flex-col items-center text-center select-none"
      >
        <h1 className="font-sans font-bold text-white text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tight leading-none drop-shadow-md">
          Travel
        </h1>
      </motion.div>

      {/* LAYER 2: Authentic Full-Bleed Foreground Plains (Yurts, horse, golden hills - z-index: 3) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : foregroundY }}
        className="absolute inset-x-0 bottom-0 z-[3] h-[48%] sm:h-[50%] md:h-[54%] w-full pointer-events-none select-none"
      >
        <Image
          src="/images/hero/bg-part-2.webp"
          alt="Golden foreground plains with nomadic yurts and grazing horse"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Soft edge blend at the very bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0717] to-transparent" />
      </motion.div>

      {/* LAYER 3: Subtitle, Core CTA & Sleek Consultation Pill (z-index: 4 - sits cleanly ON TOP of foreground) */}
      <div className="relative z-[4] w-full max-w-3xl mx-auto px-4 sm:px-6 -mt-4 sm:-mt-6 pb-12 sm:pb-16 flex flex-col items-center text-center">
        {/* Vita Purpose Subtitle: 2 lines, clean, centered, crisp white */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-white font-medium max-w-md mx-auto leading-snug drop-shadow-sm mb-6">
          With purpose. Orchestrate unhurried journeys, rare access, and boutique stays in one place.
        </p>

        {/* Vita Exact White Pill Button */}
        <div className="mb-6">
          <a
            href="#retreats"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-sans font-semibold text-[#0c0717] hover:bg-white/95 transition-all shadow-xl hover:scale-105 cursor-pointer group"
          >
            <span>Explore Sanctuaries</span>
            <svg
              className="h-2.5 w-2.5 fill-[#0c0717] transition-transform group-hover:rotate-45 duration-300"
              viewBox="0 0 8 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C8 0 7.32057 2.41553 7.32057 4C7.32057 5.58447 8 8 8 8C8 8 5.58447 7.32057 4 7.32057C2.41553 7.32057 0 8 0 8C0 8 0.679427 5.58447 0.679427 4C0.679427 2.41553 0 0 0 0C0 0 2.41553 0.679426 4 0.679426C5.58447 0.679426 8 0 8 0Z" />
            </svg>
          </a>
        </div>

        {/* Sleek Slim Consultation Pill Bar */}
        <div className="w-full max-w-xl">
          <div className="rounded-full border border-white/20 bg-[#0c0717]/80 backdrop-blur-xl p-1.5 pl-4 pr-1.5 shadow-2xl text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#a855f7] shrink-0" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTriggerPrototype();
              }}
              className="flex-1 flex items-center gap-2"
            >
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Where is your mind drifting? (e.g. 5 days in Udaipur...)"
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-white/50 focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setIsVoiceGateOpen(true)}
                title="Voice Consultation (Member Feature)"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <Mic className="h-3.5 w-3.5" />
              </button>
              <Button
                type="submit"
                size="sm"
                className="h-8 rounded-full bg-primary text-white hover:bg-primary/90 px-4 text-xs font-sans font-medium shrink-0 cursor-pointer"
              >
                <span>Consult</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </form>
          </div>

          {/* Quick inspiration chips */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 mr-1">
              Curate:
            </span>
            {QUICK_INSPIRATIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPromptInput(item.prompt);
                  handleTriggerPrototype(item.prompt);
                }}
                className="rounded-full border border-white/10 bg-[#0c0717]/60 hover:bg-primary/20 hover:border-primary/40 px-2.5 py-0.5 text-[10px] font-sans text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
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

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary mb-4 border border-primary/30">
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
                  <Button className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 font-sans text-xs font-semibold cursor-pointer">
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
