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

          {/* Slide-in side panel (150-200ms slide transition, NOT a modal takeover) */}
          <motion.aside
            initial={isReducedMotion ? { opacity: 0 } : { x: "100%" }}
            animate={isReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: isReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="relative z-10 flex h-full w-full max-w-lg flex-col justify-between bg-card text-card-foreground shadow-2xl border-l border-border"
            role="dialog"
            aria-label={`Swap alternatives for Day ${activeDay.dayNumber}`}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                    Pre-Vetted Alternatives
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h2 className="font-sans text-lg font-semibold text-foreground">
                Swap Experience for Day {activeDay.dayNumber}
              </h2>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                Currently: {activeDay.title}
              </p>
            </div>

            {/* Alternatives List (2-3 options) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block mb-2">
                Specialist Recommended Options
              </span>

              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  className="group rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <ConfidenceChip tier={alt.confidenceTier} size="sm" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {alt.paceNote}
                    </span>
                  </div>

                  <h3 className="font-sans text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {alt.title}
                  </h3>

                  {/* Why this rationale */}
                  <div className="rounded-md bg-muted/60 p-2.5 mb-3.5 text-xs text-muted-foreground leading-relaxed">
                    <span className="font-mono text-[10px] uppercase text-primary font-medium mr-1.5">
                      Why this:
                    </span>
                    {alt.whyThis}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                    <span className="font-mono text-muted-foreground">
                      {alt.location}
                    </span>

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onSelectAlternative(activeDay.id, alt)}
                      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-sans px-3.5 h-7"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Apply Swap
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-border bg-muted/20 flex justify-between items-center text-xs font-mono text-muted-foreground">
              <span>PROVENANCE VERIFIED</span>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-foreground transition-colors"
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