"use client";

import { ConfidenceChip, ConfidenceTier } from "@/components/app/confidence-chip";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Clock,
  MapPin,
  ChevronUp,
  ChevronDown,
  GripVertical,
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
}

interface ItineraryDayCardProps {
  day: ItineraryDay;
  isFirst?: boolean;
  isLast?: boolean;
  onSwapClick: (day: ItineraryDay) => void;
  onMoveUp?: (dayId: string) => void;
  onMoveDown?: (dayId: string) => void;
  isReducedMotion?: boolean;
}

export function ItineraryDayCard({
  day,
  isFirst = false,
  isLast = false,
  onSwapClick,
  onMoveUp,
  onMoveDown,
  isReducedMotion = false,
}: ItineraryDayCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-200 ${
        isReducedMotion
          ? "hover:border-primary"
          : "hover:-translate-y-0.5 hover:shadow-md hover:border-border/80"
      }`}
      aria-label={`Itinerary Day ${day.dayNumber}: ${day.title}`}
    >
      {/* Boarding-Pass Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-5 py-3 text-xs">
        <div className="flex items-center gap-3">
          {/* Day Index in Monospace */}
          <div className="flex items-center gap-1.5 font-mono font-medium tracking-wider text-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>DAY {String(day.dayNumber).padStart(2, "0")}</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-muted-foreground">{day.date}</span>
          </div>

          <span className="hidden sm:inline-block h-3 w-px bg-border" />

          {/* Destination Anchor */}
          <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wide">
            <MapPin className="h-3 w-3 text-primary" />
            <span>{day.destination}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Semantic Confidence-Tier Chip */}
          <ConfidenceChip tier={day.confidenceTier} size="sm" />

          {/* Reorder Buttons (Micro-interaction, optimistic) */}
          <div className="flex items-center border border-border rounded-lg bg-background/80 overflow-hidden">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => onMoveUp?.(day.id)}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Move day earlier"
              aria-label={`Move Day ${day.dayNumber} earlier`}
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <span className="h-3 w-px bg-border" />
            <button
              type="button"
              disabled={isLast}
              onClick={() => onMoveDown?.(day.id)}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Move day later"
              aria-label={`Move Day ${day.dayNumber} later`}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors cursor-grab" />
              <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                {day.title}
              </h3>
            </div>

            {/* Non-negotiable one-line "why this" rationale */}
            <div className="rounded-lg bg-primary/5 border border-primary/15 px-3.5 py-2">
              <p className="font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
                <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-medium mr-2">
                  Why this:
                </span>
                {day.whyThis}
              </p>
            </div>
          </div>

          {/* Swap Trigger Button */}
          <div className="shrink-0 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onSwapClick(day)}
              className="rounded-full border-border bg-background hover:bg-primary/10 hover:text-primary hover:border-primary/40 font-sans text-xs transition-colors"
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Swap Experience
            </Button>
          </div>
        </div>

        {/* Schedule Timestamps (Boarding-Pass Metaphor) */}
        <div className="mt-6 pt-5 border-t border-border/60">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground block mb-3">
            Day Sequence
          </span>

          <div className="space-y-3">
            {day.schedule.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 text-xs sm:text-sm py-1.5 border-b border-border/40 last:border-0"
              >
                {/* Monospace Timestamp */}
                <div className="flex items-center gap-1 font-mono text-xs text-primary font-medium w-16 shrink-0">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{item.time}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-sans font-medium text-foreground">
                    {item.activity}
                  </p>
                  {item.notes && (
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      {item.notes}
                    </p>
                  )}
                </div>

                {item.location && (
                  <span className="hidden md:inline-block font-mono text-[11px] text-muted-foreground/80 shrink-0">
                    {item.location}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Boarding-Pass Footer Metadata */}
        {day.transitCode && (
          <div className="mt-5 pt-3 border-t border-dashed border-border/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>REF: {day.transitCode}</span>
              <span>•</span>
              <span className="text-foreground/70">CONFIRMED ITINERARY</span>
            </div>
            {day.curatorNote && (
              <span className="text-primary/90 italic font-sans flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {day.curatorNote}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}