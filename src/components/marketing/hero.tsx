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

  // Layered Parallax Depths
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[112vh] sm:min-h-[118vh] lg:min-h-[125vh] overflow-hidden bg-[#0c0717] text-white flex flex-col justify-between"
      aria-label="TripSpree Hero Section"
    >
      {/* Vita Architectural Corner Cross Markers */}
      <div className="absolute top-24 left-6 z-20 text-white/30 font-mono text-sm select-none pointer-events-none">+</div>
      <div className="absolute top-24 right-6 z-20 text-white/30 font-mono text-sm select-none pointer-events-none">+</div>

      {/* BASE LAYER: Complete Scenic Landscape fallback with continuous slow Ken Burns micro-scaling */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <motion.div
          animate={
            isReducedMotion
              ? { scale: 1 }
              : {
                  scale: [1, 1.06, 1],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="relative w-full h-full origin-center"
        >
          <Image
            src="/images/hero/bg-sky.webp"
            alt="Atmospheric mountain backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#0c0717]/15" />
      </div>

      {/* LAYER 1: Mountain Ridges & Sky (Part 1 - Top Pinned, Full Width) with Parallax & Ken Burns */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : backgroundY }}
        animate={
          isReducedMotion
            ? { scale: 1 }
            : {
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 right-0 w-full z-[1] pointer-events-none select-none origin-top"
      >
        <Image
          src="/69b131f7e83fd36f79be5b78_bg-part-1.webp"
          alt="Snowcapped mountain peaks and sky"
          width={2899}
          height={1086}
          priority
          sizes="100vw"
          className="w-full h-auto object-cover object-top block"
        />
      </motion.div>

      {/* LAYER 2: Monumental "Travel" Typography (Sits behind the foreground hill in Part 2) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : textY }}
        className="relative z-[2] w-full max-w-6xl mx-auto px-4 pt-32 sm:pt-40 md:pt-48 lg:pt-48 flex flex-col items-center text-center pointer-events-none select-none"
      >
        <h1 className="font-sans font-extrabold text-white text-7xl sm:text-6xl md:text-7xl lg:text-[9.5rem] tracking-tight leading-[0.85] drop-shadow-md">
          Travel
        </h1>
      </motion.div>

      {/* LAYER 3: Foreground Golden Hill with Nomadic Yurts & Grazing Horse (Part 2 - Bottom Pinned, Overlaps Text & Part 1) */}
      <motion.div
        style={{ y: isReducedMotion ? "0%" : foregroundY }}
        className="absolute bottom-0 left-0 right-0 w-full z-[3] pointer-events-none select-none"
      >
        <Image
          src="/69b131f75b251dd705fc8bb9_bg-part-2.webp"
          alt="Golden plains with nomadic yurts and grazing horse"
          width={2899}
          height={1350}
          priority
          sizes="100vw"
          className="w-full h-auto object-cover object-bottom block"
        />
        {/* Soft edge blend at the very bottom into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0c0717] via-[#0c0717]/80 to-transparent" />
      </motion.div>

      {/* LAYER 4: Subtitle and White-with-Purple Built-in Chatbox (Replaces the Explore button) */}
      <div className="relative z-[10] w-full max-w-4xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-20 sm:pb-28 lg:pb-42 flex flex-col items-center text-center">
        {/* Purpose Subtitle matching Vita Travels */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-white font-medium max-w-xl mx-auto leading-snug drop-shadow-md mb-8 sm:mb-8">
          With purpose. Orchestrate unhurried journeys, rare access, and boutique stays in one place.
        </p>

        {/* Luxury White with Royal Purple Themed Chatbox */}
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-purple-200/80 bg-white/95 backdrop-blur-2xl p-2.5 sm:p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_35px_rgba(130,71,255,0.18)] text-[#0c0717]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTriggerPrototype();
              }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="relative flex-1 flex items-center pl-2.5 sm:pl-3">
                <Sparkles className="h-4 w-4 text-[#8247ff] shrink-0 mr-2" />
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Where is your mind drifting? (e.g. 5 days in Udaipur palaces...)"
                  className="w-full bg-transparent text-xs sm:text-sm text-[#0c0717] font-medium placeholder:text-[#0c0717]/45 focus:outline-none font-sans"
                />
              </div>

              {/* Mic Button -> Voice Gate Modal with Apple Tactile Feedback */}
              <button
                type="button"
                onClick={() => setIsVoiceGateOpen(true)}
                title="Voice Call with DIA (Member Feature)"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-200/70 bg-purple-50/70 text-[#8247ff] hover:bg-purple-100 hover:border-purple-300 active:scale-90 transition-all duration-100 cursor-pointer"
              >
                <Mic className="h-4 w-4" />
              </button>

              {/* Consult Button in Royal Purple */}
              <Button
                type="submit"
                size="default"
                className="h-10 rounded-xl bg-[#8247ff] hover:bg-[#7034f5] text-white px-4 sm:px-5 text-xs sm:text-sm font-sans font-medium flex items-center gap-1.5 shadow-md shadow-[#8247ff]/25 cursor-pointer transition-colors"
              >
                <span>Consult DIA</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>

            {/* Quick Inspiration Chips */}
            <div className="mt-2.5 pt-2 border-t border-purple-100/90 flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#0c0717]/50 mr-1 font-medium">
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
                  className="rounded-lg border border-purple-100 bg-purple-50/60 hover:bg-[#8247ff]/10 hover:border-[#8247ff]/30 active:scale-95 px-2.5 py-0.5 text-[10px] font-sans font-medium text-[#130c24] hover:text-[#8247ff] transition-all duration-100 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Voice Gate Dialog Modal with Apple Spring Entrance */}
      <AnimatePresence>
        {isVoiceGateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", damping: 28, stiffness: 300, bounce: 0 }}
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
