"use client";

import { Check, Sparkles, X } from "lucide-react";
import { ItineraryDiff } from "@/lib/types";

interface ItineraryDiffCardProps {
  diff: ItineraryDiff;
  onDismiss: (id: string) => void;
}

export function ItineraryDiffCard({ diff, onDismiss }: ItineraryDiffCardProps) {
  return (
    <div
      role="region"
      aria-label="Itinerary Adaptation Summary"
      className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-[#160f26]/95 backdrop-blur-xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-foreground animate-fade-in space-y-3.5 max-w-xl mx-auto my-4"
    >
      {/* Header Ledger */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
            <Sparkles className="h-3 w-3" />
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-300">
            Consultation Outcome • Day {diff.dayNumber} Adaptation
          </span>
        </div>

        <button
          type="button"
          onClick={() => onDismiss(diff.id)}
          className="text-muted-foreground hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          title="Dismiss outcome notification"
          aria-label="Dismiss outcome notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Before and After Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="rounded-xl border border-white/5 bg-black/20 p-3 space-y-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block">
            Previous Schedule ({diff.timeSlot})
          </span>
          <p className="font-sans text-xs line-through text-muted-foreground">
            {diff.previousTitle}
          </p>
        </div>

        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-300 font-medium block">
              Updated Cadence
            </span>
            <Check className="h-3 w-3 text-amber-300" />
          </div>
          <p className="font-serif text-xs sm:text-sm font-medium text-foreground">
            {diff.newTitle}
          </p>
          {diff.location && (
            <p className="font-mono text-[10px] text-stone-400">{diff.location}</p>
          )}
        </div>
      </div>

      {/* Curator Rationale */}
      {diff.rationale && (
        <p className="font-serif italic text-xs text-foreground/80 leading-relaxed border-l-2 border-amber-400/30 pl-3">
          &ldquo;{diff.rationale}&rdquo;
        </p>
      )}

      {/* Confirmation Pill */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span className="text-stone-400">Live Itinerary Updated</span>
        <button
          type="button"
          onClick={() => onDismiss(diff.id)}
          className="text-amber-200 hover:text-amber-100 font-medium cursor-pointer"
        >
          Confirm & Close
        </button>
      </div>
    </div>
  );
}
