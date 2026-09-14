"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Mic, Sparkles, Compass, Lock, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";

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
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax physics with container-clipped boundary
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

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
      ref={sectionRef}
      className="relative min-h-[96vh] w-full flex items-center justify-center overflow-hidden bg-background text-foreground"
      aria-label="TripSpree Hero Section"
    >
      {/* 100vw Full-Bleed Parallax Background (Lake Pichola at Dawn, Udaipur) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : backgroundY }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full"
      >
        <Image
          src={UNSPLASH_ASSETS.heroFullBleed.url}
          alt={UNSPLASH_ASSETS.heroFullBleed.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic Vignette & Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-black/55" />
        <div className="absolute inset-0 bg-[#060606]/35 backdrop-blur-[1px]" />
      </motion.div>

      {/* Atmospheric Full-Bleed Foreground Content */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col justify-between min-h-[88vh]"
      >
        {/* Top Eyebrow & Brand Positioning */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-background/60 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground font-semibold">
              India&apos;s 1st Autonomous AI Travel Platform
            </span>
          </div>

          {/* Monumental Editorial Typography */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-[0.9] mb-6 drop-shadow-sm">
            TRAVEL <br />
            <span className="font-serif italic font-normal tracking-normal lowercase text-primary">
              is an
            </span>{" "}
            <br />
            AWAKENING
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl drop-shadow-sm font-light">
            Where human intuition meets autonomous travel intelligence. Speak or type with{" "}
            <strong className="text-white font-medium">DIA</strong> to orchestrate unhurried journeys of stillness, rare access, and architectural wonder across India and the globe.
          </p>
        </div>

        {/* Integrated Concierge Chatbox & Telemetry Bar */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="rounded-2xl border border-white/20 bg-card/85 backdrop-blur-xl p-3 sm:p-4 shadow-2xl text-foreground">
            {/* Input Row */}
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
                  placeholder="Where is your mind drifting? (e.g., 5 days in Udaipur palaces...)"
                  className="w-full rounded-xl bg-background/80 border border-border px-4 py-3 sm:py-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans"
                />
              </div>

              {/* Mic Icon Button -> Triggers Voice Gate Modal */}
              <button
                type="button"
                onClick={() => setIsVoiceGateOpen(true)}
                title="Voice Call with DIA (Member Feature)"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/80 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
              >
                <Mic className="h-4 w-4" />
              </button>

              {/* Send / Consult Button */}
              <Button
                type="submit"
                size="default"
                className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-4 sm:px-5 text-xs sm:text-sm font-sans font-medium flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Consult DIA</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>

            {/* Quick Inspiration Pills */}
            <div className="mt-3.5 pt-3 border-t border-border/50 flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
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
                  className="rounded-lg border border-border/70 bg-background/60 hover:bg-primary/10 hover:border-primary/40 px-2.5 py-1 text-[11px] font-sans text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Micro Telemetry Stats */}
          <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] font-mono text-white/80">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-primary" />
              Autonomous DIA 2.0 Engine
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="flex items-center gap-1.5">
              <Compass className="h-3 w-3 text-chart-1" />
              60+ Verified Sanctuaries (India & Global)
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-chart-2" />
              100% Specialist-Vetted Logistics
            </span>
          </div>
        </div>
      </motion.div>

      {/* Voice Gate In-Hero Dialog Modal */}
      <AnimatePresence>
        {isVoiceGateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl text-foreground"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVoiceGateOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20">
                <Mic className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                <Lock className="h-3 w-3" />
                <span>Member-Only In-App Call</span>
              </div>

              <h2 className="font-serif text-xl font-medium tracking-tight text-foreground mb-2">
                Live Voice Consultation with DIA
              </h2>

              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-6">
                In order to access live, low-latency in-app voice calls with DIA (powered by our conversational audio engine), please sign in with your complimentary member passkey or email.
              </p>

              <div className="flex flex-col gap-2.5">
                <Link href="/designer" onClick={() => setIsVoiceGateOpen(false)}>
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs font-medium cursor-pointer">
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
                  className="w-full rounded-xl border-border bg-background hover:bg-muted text-xs font-sans cursor-pointer"
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
