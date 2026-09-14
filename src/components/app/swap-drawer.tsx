"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ItineraryDay } from "@/components/app/itinerary-day-card";
import { ConfidenceChip, ConfidenceTier } from "@/components/app/confidence-chip";
import { Button } from "@/components/ui/button";
import { X, Check, Sparkles } from "lucide-react";

export interface SwapAlternative {
  id: string;
  title: string;
  whyThis: string;
  confidenceTier: ConfidenceTier;
  paceNote: string;
  previewTime: string;
  location: string;
}

interface SwapDrawerProps {
  isOpen: boolean;
  activeDay: ItineraryDay | null;
  alternatives: SwapAlternative[];
  onSelectAlternative: (dayId: string, alt: SwapAlternative) => void;
  onClose: () => void;
  isReducedMotion?: boolean;
}

export function SwapDrawer({
  isOpen,
  activeDay,
  alternatives,
  onSelectAlternative,
  onClose,
  isReducedMotion = false,
}: SwapDrawerProps) {
  if (!isOpen || !activeDay) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop (light overlay, fast fade) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0 : 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Slide-in side panel with Apple sheet spring physics & drag-to-dismiss */}
          <motion.aside
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.04, right: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 90 || info.velocity.x > 350) {
                onClose();
              }
            }}
            initial={isReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={isReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              isReducedMotion
                ? { duration: 0.1 }
                : { type: "spring", damping: 28, stiffness: 300 }
            }
            className="relative z-10 flex h-full w-full max-w-lg flex-col justify-between bg-[#130c24] text-white shadow-2xl border-l border-[#25183e] touch-pan-y"
            role="dialog"
            aria-label={`Swap alternatives for Day ${activeDay.dayNumber}`}
          >
            {/* Drawer Header with Glass Scrim */}
            <div className="p-6 border-b border-white/10 bg-[#0c0717]/80 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8247ff]" />
                  <span className="font-mono text-xs tracking-wider uppercase text-white/60">
                    Pre-Vetted Alternatives
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1.5 text-white/60 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h2 className="font-serif text-xl font-normal text-white">
                Swap Experience for Day {activeDay.dayNumber}
              </h2>
              <p className="font-mono text-xs text-white/60 mt-1">
                Currently: {activeDay.title}
              </p>
            </div>

            {/* Alternatives List (2-3 options) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block mb-2">
                Specialist Recommended Options &bull; Pull right to dismiss
              </span>

              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  className="group rounded-2xl border border-white/10 bg-[#0c0717] p-5 transition-all duration-200 hover:border-[#8247ff]/50 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <ConfidenceChip tier={alt.confidenceTier} size="sm" />
                    <span className="font-mono text-[11px] text-white/60">
                      {alt.paceNote}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-normal text-white mb-2 group-hover:text-[#a855f7] transition-colors">
                    {alt.title}
                  </h3>

                  {/* Why this rationale */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-3.5 text-xs text-white/70 leading-relaxed">
                    <span className="font-mono text-[10px] uppercase text-[#a855f7] font-semibold mr-1.5">
                      Why this:
                    </span>
                    {alt.whyThis}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <span className="font-mono text-white/50">
                      {alt.location}
                    </span>

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onSelectAlternative(activeDay.id, alt)}
                      className="rounded-full bg-[#8247ff] hover:bg-[#7035eb] text-white text-xs font-mono px-4 h-7 cursor-pointer"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Apply Swap
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0c0717]/60 flex justify-between items-center text-xs font-mono text-white/50">
              <span>PROVENANCE VERIFIED</span>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Keep Current Selection
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}