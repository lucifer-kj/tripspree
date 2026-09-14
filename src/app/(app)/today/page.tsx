"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ConfidenceChip } from "@/components/app/confidence-chip";
import { EveningCheckinCard } from "@/components/app/evening-checkin-card";
import { TodayVoiceBar } from "@/components/app/today-voice-bar";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function TodayViewPage() {
  const [isNextEventConfirmed, setIsNextEventConfirmed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/30 font-sans text-foreground">
      {/* App Navigation Sidebar */}
      <AppSidebar activeTab="today" />

      {/* Main Today Screen Canvas */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Status Bar with Honest Offline/Cache Indicator */}
        <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur-xs px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
              TODAY
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground">
              OCTOBER 15, 2026
            </span>
          </div>

          {/* Honest PWA Cache / Live Indicator (per UI/UX spec §4.5) */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
            <span className="text-foreground font-medium">Live Sync Active</span>
            <span className="text-muted-foreground/60">•</span>
            <span>Cached Offline</span>
          </div>
        </header>

        {/* Calm, Utilitarian Content Container (Deliberately Sparse & Focused) */}
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-6 py-8 md:py-12 space-y-8">
          {/* 1. Location & Atmospheric Status (One Primary View) */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-1.5 font-medium">
                  Current Sanctuary • Day 02 of 04
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl text-foreground font-medium tracking-tight">
                  Hoshinoya Arashiyama
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs sm:text-sm mt-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>Oi River Gorge, Kyoto, Japan</span>
                </div>
              </div>

              {/* Local Time & Atmosphere */}
              <div className="rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs sm:text-right shrink-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Local Time
                </div>
                <div className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight my-0.5">
                  16:42 <span className="text-xs text-muted-foreground font-normal">JST</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  18°C • Quiet Drizzle
                </div>
              </div>
            </div>

            {/* Quick Sanctuary Amenities for Today */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
              <span>SANCTUARY WI-FI: HOSHINOYA_PRIVATE</span>
              <span>CONCIERGE EXT: #01</span>
            </div>
          </div>

          {/* 2. "What's Next" Focal Card (Highest Information Priority) */}
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 md:p-8 shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
                <span className="font-mono text-xs tracking-widest uppercase text-primary font-semibold">
                  What&apos;s Next
                </span>
              </div>

              <ConfidenceChip tier="Verified" size="sm" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-foreground font-medium mb-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>17:30 JST (In 48 minutes)</span>
                </div>

                <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Private Sunset Moss Garden Contemplation at Saihō-ji
                </h2>
              </div>
            </div>

            {/* Rationale & Operational Note */}
            <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 mb-6">
              <p className="font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mr-2">
                  Curator Note:
                </span>
                General public access ended at 16:30. Abbot Kensho will meet your private vehicle at the North Cloister Gate. Shoe covers provided on site.
              </p>
            </div>

            {/* Primary Action Button (Min 44x44px touch target) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                type="button"
                variant="default"
                onClick={() => setIsNextEventConfirmed(!isNextEventConfirmed)}
                className={`min-h-[48px] rounded-xl px-6 font-sans text-sm font-medium transition-all ${
                  isNextEventConfirmed
                    ? "bg-chart-1 text-background hover:bg-chart-1/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {isNextEventConfirmed
                  ? "Driver Notified • Standing By"
                  : "Ready for Driver Transfer"}
              </Button>

              <div className="flex items-center justify-center text-xs font-mono text-muted-foreground px-3 min-h-[44px]">
                <span>Driver: Mr. Tanaka (Black Alphard #408)</span>
              </div>
            </div>
          </div>

          {/* 3. Later Tonight (Upcoming Schedule Preview) */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Later Tonight
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-border/60">
                <div className="font-mono text-xs text-primary font-medium w-14 shrink-0 pt-0.5">
                  20:00
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-foreground">
                    Private Kaiseki Hearth Dinner
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    Dining Pavilion Terrace • Table 4 (Overlooking Oi River)
                  </p>
                </div>
                <ConfidenceChip tier="Verified" size="sm" />
              </div>

              <div className="flex items-start gap-4">
                <div className="font-mono text-xs text-muted-foreground font-medium w-14 shrink-0 pt-0.5">
                  22:00
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-foreground">
                    Cedar Hinoki Tub Preparation
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    Infused with seasonal yuzu and forest salts
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  In-Sanctuary
                </span>
              </div>
            </div>
          </div>

          {/* 4. Anchored Voice / Chat Consultation Bar ("Talk it through") */}
          <TodayVoiceBar />

          {/* 5. Evening Check-In Card (Unmissable, Non-Blocking, One-Tap Reflection) */}
          <EveningCheckinCard />
        </div>
      </main>
    </div>
  );
}