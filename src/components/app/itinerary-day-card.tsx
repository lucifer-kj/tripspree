"use client";

import { ConfidenceChip, ConfidenceTier } from "@/components/app/confidence-chip";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Clock,
  MapPin,
  ChevronUp,
  ChevronDown,
  Calendar,
  Sparkles,
} from "lucide-react";

export interface ScheduleItem {
  time: string;
  activity: string;
  location?: string;
  notes?: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  destination: string;
  title: string;
  whyThis: string;
  confidenceTier: ConfidenceTier;
  transitCode?: string;
  schedule: ScheduleItem[];
  curatorNote?: string;
  verifiedInspectionNote?: string;
  pendingSuggestion?: {
    slotKey: string;
    suggestedActivity: {
      time: string;
      title: string;
      location?: string;
      notes?: string;
      confidenceTier?: ConfidenceTier;
    };
    rationale: string;
    trigger: 'fatigue' | 'weather' | 'pace';
    status: 'pending' | 'accepted' | 'dismissed';
  };
}

interface ItineraryDayCardProps {
  day: ItineraryDay;
  isFirst?: boolean;
  isLast?: boolean;
  onSwapClick: (day: ItineraryDay) => void;
  onMoveUp?: (dayId: string) => void;
  onMoveDown?: (dayId: string) => void;
  onAcceptSuggestion?: (dayId: string) => void;
  onDismissSuggestion?: (dayId: string) => void;
  onEaseBackClick?: (dayId: string) => void;
  isReducedMotion?: boolean;
}

export function ItineraryDayCard({
  day,
  isFirst = false,
  isLast = false,
  onSwapClick,
  onMoveUp,
  onMoveDown,
  onAcceptSuggestion,
  onDismissSuggestion,
  onEaseBackClick,
  isReducedMotion = false,
}: ItineraryDayCardProps) {
  const isVerified = day.confidenceTier === "Verified";
  const isTeamVetted = day.confidenceTier === "Team-Vetted";

  const hasPendingSuggestion =
    day.pendingSuggestion && day.pendingSuggestion.status === "pending";

  // Dense day check for in-context pace correction prompt (UX §3)
  const isDenseDay = day.schedule.length >= 3;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
        isVerified
          ? "border border-stone-800 bg-[#140d22]/90 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
          : isTeamVetted
          ? "border border-white/15 bg-[#120a1f]/80"
          : "border border-dashed border-white/10 bg-transparent"
      } ${
        isReducedMotion
          ? ""
          : "hover:border-stone-700 hover:-translate-y-0.5"
      }`}
      aria-label={`Itinerary Day ${day.dayNumber}: ${day.title}`}
    >
      {/* Top Ledger: Day Index & Confidence Tier */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-6 py-3.5 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-widest text-foreground uppercase">
            <Calendar className="h-3.5 w-3.5 text-stone-400" />
            <span>DAY {String(day.dayNumber).padStart(2, "0")}</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-muted-foreground">{day.date}</span>
          </div>

          <span className="hidden sm:inline-block h-3 w-px bg-white/10" />

          {/* Destination Anchor */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            <MapPin className="h-3 w-3 text-stone-400" />
            <span>{day.destination}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Plain-text confidence tier chip per UX §1 */}
          <ConfidenceChip tier={day.confidenceTier} size="sm" />

          {/* Reorder Buttons (Micro-interactions) */}
          {(onMoveUp || onMoveDown) && (
            <div className="flex items-center border border-white/10 rounded-lg bg-black/30 overflow-hidden">
              <button
                type="button"
                disabled={isFirst}
                onClick={() => onMoveUp?.(day.id)}
                className="p-1 text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Move day earlier"
                aria-label={`Move Day ${day.dayNumber} earlier`}
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <span className="h-3 w-px bg-white/10" />
              <button
                type="button"
                disabled={isLast}
                onClick={() => onMoveDown?.(day.id)}
                className="p-1 text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Move day later"
                aria-label={`Move Day ${day.dayNumber} later`}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header & Editorial "Why This" Pull-Quote */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-foreground/95">
              {day.title}
            </h3>

            {/* Swap Trigger Button (Fast literal swap-grid is default per UX §1) */}
            <div className="shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onSwapClick(day)}
                className="rounded-full border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono tracking-wider text-foreground hover:border-white/30 transition-all cursor-pointer"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5 text-stone-400" />
                Swap Slot
              </Button>
            </div>
          </div>

          {/* Verified Human Note per UX §1 */}
          {isVerified && day.verifiedInspectionNote && (
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wide text-amber-200/80 bg-amber-400/5 border border-amber-400/15 px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="h-3 w-3 text-amber-300 shrink-0" />
              <span>{day.verifiedInspectionNote}</span>
            </div>
          )}

          {/* Editorial Serif Pull-Quote for "Why this" per UX §1 */}
          <blockquote className="border-l-2 border-amber-400/40 pl-4 py-1 my-2">
            <p className="font-serif text-base sm:text-lg italic text-foreground/85 leading-relaxed">
              &ldquo;{day.whyThis}&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Staged Suggestion Banner (UX §4) */}
        {hasPendingSuggestion && day.pendingSuggestion && (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 space-y-3 animate-fade-in">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Staged Adaptation (Pending Review)
                </span>
                <p className="font-sans text-xs text-foreground/90 leading-relaxed">
                  {day.pendingSuggestion.rationale}
                </p>
                <p className="font-mono text-xs text-amber-200 font-medium mt-1">
                  Proposed: {day.pendingSuggestion.suggestedActivity.title} ({day.pendingSuggestion.suggestedActivity.time})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                size="sm"
                onClick={() => onAcceptSuggestion?.(day.id)}
                className="rounded-full bg-amber-300 hover:bg-amber-200 text-black font-mono text-[11px] font-semibold tracking-wider uppercase h-7 px-3.5 cursor-pointer"
              >
                Accept Suggestion
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onDismissSuggestion?.(day.id)}
                className="rounded-full text-muted-foreground hover:text-foreground font-mono text-[11px] tracking-wider uppercase h-7 px-3 cursor-pointer"
              >
                Keep Original
              </Button>
            </div>
          </div>
        )}

        {/* Schedule Sequence (Boarding Pass Metaphor) */}
        <div className="pt-2 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              Day Sequence
            </span>

            {/* In-Context Pace Correction Prompt per UX §3 */}
            {isDenseDay && onEaseBackClick && (
              <button
                type="button"
                onClick={() => onEaseBackClick(day.id)}
                className="font-mono text-[11px] text-amber-300/80 hover:text-amber-200 hover:underline transition-all cursor-pointer"
              >
                This day runs long — ease it back?
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {day.schedule.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 text-xs sm:text-sm py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-1 font-mono text-xs text-stone-300 font-medium w-20 shrink-0">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{item.time}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-sans font-medium text-foreground/90">
                    {item.activity}
                  </p>
                  {item.notes && (
                    <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>

                {item.location && (
                  <span className="hidden md:inline-block font-mono text-[11px] text-muted-foreground/70 shrink-0">
                    {item.location}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Reference Metadata */}
        {day.transitCode && (
          <div className="pt-3 border-t border-dashed border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-muted-foreground/80">
            <div className="flex items-center gap-2">
              <span>REF: {day.transitCode}</span>
              <span>•</span>
              <span className="text-foreground/70 uppercase">Quiet-Luxury Atelier Guaranteed</span>
            </div>
            {day.curatorNote && (
              <span className="font-serif italic text-stone-400">
                {day.curatorNote}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}