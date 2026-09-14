"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ItineraryDayCard, ItineraryDay } from "@/components/app/itinerary-day-card";
import { SwapDrawer, SwapAlternative } from "@/components/app/swap-drawer";
import { ConciergePanel } from "@/components/app/concierge-panel";
import { Button } from "@/components/ui/button";
import { useTripSpreeStore } from "@/lib/store";
import { AuthGate } from "@/components/app/auth-gate";
import {
  Share2,
  Download,
  Clock,
  Compass,
  Check,
  Sparkles,
  X,
} from "lucide-react";

export default function TripDesignerPage() {
  const { currentTrip, swapActivity, reorderDays } = useTripSpreeStore();
  const [swapTargetDayId, setSwapTargetDayId] = useState<string | null>(null);
  const [isSwapDrawerOpen, setIsSwapDrawerOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [draftSession, setDraftSession] = useState<{
    prompt?: string;
    destination?: string;
    sanctuaryName?: string;
  } | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("tripspree_draft_session");
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return null;
  });

  // Map store trip days to day card format
  const displayDays: ItineraryDay[] = currentTrip.days.map((d) => ({
    id: d.id,
    dayNumber: d.dayNumber,
    date: d.date,
    destination: `${d.sanctuaryName.toUpperCase()} • ${d.destination.toUpperCase()}`,
    title: d.title,
    whyThis: d.curatorNote,
    confidenceTier: d.confidenceTier,
    transitCode: `JL-00${d.dayNumber} / PRV-TRANSFER`,
    curatorNote: d.curatorNote,
    schedule: [
      {
        time: d.morningActivity.time,
        activity: d.morningActivity.title,
        location: d.morningActivity.location,
        notes: d.morningActivity.notes,
      },
      {
        time: d.afternoonActivity.time,
        activity: d.afternoonActivity.title,
        location: d.afternoonActivity.location,
        notes: d.afternoonActivity.notes,
      },
      {
        time: d.eveningActivity.time,
        activity: d.eveningActivity.title,
        location: d.eveningActivity.location,
        notes: d.eveningActivity.notes,
      },
    ],
  }));

  const activeStoreDay = currentTrip.days.find((d) => d.id === swapTargetDayId);
  const activeDisplayDay = displayDays.find((d) => d.id === swapTargetDayId) || null;

  const activeAlternatives: SwapAlternative[] = (activeStoreDay?.alternatives || []).map((alt) => ({
    id: alt.id,
    title: alt.title,
    whyThis: alt.curatorEndorsement,
    confidenceTier: alt.confidenceTier,
    paceNote: `${alt.timeSlot.toUpperCase()} IMMERSION`,
    previewTime:
      alt.timeSlot === "morning"
        ? "09:00 - 12:00"
        : alt.timeSlot === "afternoon"
        ? "14:00 - 17:00"
        : "19:30 - 21:30",
    location: alt.location,
  }));

  // Optimistic Move Up / Move Down reordering
  const handleMoveUp = (dayId: string) => {
    const idx = currentTrip.days.findIndex((d) => d.id === dayId);
    if (idx <= 0) return;
    const updated = [...currentTrip.days];
    const temp = updated[idx];
    updated[idx] = updated[idx - 1];
    updated[idx - 1] = temp;
    reorderDays(updated);
  };

  const handleMoveDown = (dayId: string) => {
    const idx = currentTrip.days.findIndex((d) => d.id === dayId);
    if (idx === -1 || idx >= currentTrip.days.length - 1) return;
    const updated = [...currentTrip.days];
    const temp = updated[idx];
    updated[idx] = updated[idx + 1];
    updated[idx + 1] = temp;
    reorderDays(updated);
  };

  // Swap Interaction
  const handleOpenSwap = (day: ItineraryDay) => {
    setSwapTargetDayId(day.id);
    setIsSwapDrawerOpen(true);
  };

  const handleApplySwap = (dayId: string, alt: SwapAlternative) => {
    const storeDay = currentTrip.days.find((d) => d.id === dayId);
    const matchingAlt = storeDay?.alternatives.find((a) => a.id === alt.id);
    if (matchingAlt) {
      swapActivity(dayId, matchingAlt);
    }
    setIsSwapDrawerOpen(false);
    setSwapTargetDayId(null);
  };

  // Calendar Export
  const handleExportCalendar = () => {
    window.open(`/api/trips/${currentTrip.id}/export-ics`, "_blank");
  };

  // Share Itinerary Link
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${window.location.origin}/designer?trip=${currentTrip.id}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  return (
    <AuthGate
      fallbackTitle="Trip Designer Studio"
      fallbackDescription="Designing private journeys, sanctuary suites, and bespoke transfers requires member access."
    >
      <div className="flex h-screen w-full overflow-hidden bg-muted/40 font-sans text-foreground">
        {/* Column 1: App Sidebar */}
        <AppSidebar activeTab="designer" />

      {/* Main Workspace Area (Floating Panel Structure) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top App Bar */}
        <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              TRIP DESIGNER / ACTIVE DRAFT
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="font-mono text-xs text-foreground font-medium">
              {currentTrip.realm.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {shareToast && (
              <span className="flex items-center gap-1 text-xs font-mono text-primary animate-fade-in">
                <Check className="h-3.5 w-3.5" />
                Copied to clipboard
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-full text-xs font-mono border-border text-foreground hover:bg-muted cursor-pointer"
            >
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
              Share Itinerary
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleExportCalendar}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-sans px-4 cursor-pointer"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export .ics
            </Button>
          </div>
        </header>

        {/* Floating Working Canvas (2 Columns: Day Canvas + Concierge Panel) */}
        <div className="flex-1 flex overflow-hidden p-4 md:p-6 gap-6">
          {/* Middle Column: Day-by-Day Canvas */}
          <div className="flex-1 flex flex-col overflow-y-auto pr-1 space-y-6">
            {/* Draft Transferred from Prototype Callout */}
            {draftSession && (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0 shadow-xs">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase text-primary font-semibold tracking-wider">
                        Draft Transferred from Homepage Prototype
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-chart-1 animate-pulse" />
                    </div>
                    <p className="font-sans text-xs text-foreground font-medium mt-0.5">
                      &ldquo;{draftSession.prompt || draftSession.destination}&rdquo;
                    </p>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Destination: {draftSession.destination || "Custom"} • DIA has pre-briefed your specialist
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem("tripspree_draft_session");
                    setDraftSession(null);
                  }}
                  className="text-xs font-mono rounded-xl border-border bg-background hover:bg-muted shrink-0 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Dismiss
                </Button>
              </div>
            )}

            {/* Boarding-Pass Master Header Card */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase mb-2">
                    <Compass className="h-4 w-4" />
                    <span>Private Journey #{currentTrip.id.toUpperCase()}</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
                    {currentTrip.title}
                  </h1>
                  <p className="font-sans text-sm text-muted-foreground mt-2 max-w-xl">
                    Designed for {currentTrip.patronName}. An unhurried journey through historic Arashiyama, private moss sanctuaries, and coastal onsen pavilions.
                  </p>
                </div>

                {/* Transit Overview Card */}
                <div className="rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs space-y-1.5 shrink-0">
                  <div className="flex items-center justify-between gap-6 text-muted-foreground">
                    <span>SECTOR</span>
                    <span className="text-foreground font-semibold">LHR → KIX</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-muted-foreground">
                    <span>SANCTUARY</span>
                    <span className="text-foreground">{currentTrip.days[0]?.sanctuaryName || "Sowaka Kyoto"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-muted-foreground">
                    <span>TRAVEL DIRECTOR</span>
                    <span className="text-primary font-medium">{currentTrip.curatorName}</span>
                  </div>
                </div>
              </div>

              {/* Day Sequence Overview Subnav */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground uppercase">Itinerary Cadence:</span>
                  <span className="rounded-full bg-chart-1/15 text-chart-1 px-2.5 py-0.5 border border-chart-1/30">
                    {currentTrip.days.length} Days Active
                  </span>
                  <span className="rounded-full bg-chart-2/15 text-chart-2 px-2.5 py-0.5 border border-chart-2/30">
                    All Venues Verified
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>State persistence active</span>
                </div>
              </div>
            </div>

            {/* Itinerary Day Cards (Sequential Reusable Pattern) */}
            <div className="space-y-6">
              {displayDays.map((day, idx) => (
                <ItineraryDayCard
                  key={day.id}
                  day={day}
                  isFirst={idx === 0}
                  isLast={idx === displayDays.length - 1}
                  onSwapClick={handleOpenSwap}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                />
              ))}
            </div>

            {/* Bottom Add Day Action */}
            <div className="pt-4 pb-8 flex justify-center">
              <Button
                variant="outline"
                className="rounded-full border-dashed border-border hover:border-primary font-sans text-xs px-6 text-muted-foreground hover:text-foreground"
              >
                + Request Additional Sanctuary Day from Travel Director
              </Button>
            </div>
          </div>

          {/* Right Column: "Talk it through" Concierge Panel */}
          <div className="hidden lg:block w-96 shrink-0 h-full">
            <ConciergePanel />
          </div>
        </div>
      </main>

      {/* Slide-in Swap Drawer (150-200ms slide) */}
      <SwapDrawer
        isOpen={isSwapDrawerOpen}
        activeDay={activeDisplayDay}
        alternatives={activeAlternatives}
        onSelectAlternative={handleApplySwap}
        onClose={() => {
          setIsSwapDrawerOpen(false);
          setSwapTargetDayId(null);
        }}
      />
    </div>
  </AuthGate>
  );
}
