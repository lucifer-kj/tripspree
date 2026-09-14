"use client";

import { useState } from "react";
import { AppNav } from "@/components/app/app-nav";
import { TripHeroCard } from "@/components/app/trip-hero-card";
import { TelemetryMatrix } from "@/components/app/telemetry-matrix";
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
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function TripDesignerPage() {
  const { currentTrip, swapActivity, reorderDays } = useTripSpreeStore();
  const [swapTargetDayId, setSwapTargetDayId] = useState<string | null>(null);
  const [isSwapDrawerOpen, setIsSwapDrawerOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Move Up / Move Down reordering
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
      <div className="min-h-screen bg-[#0c0717] text-white selection:bg-primary/30 flex flex-col font-sans">
        {/* Global Top Navigation Bar matching Reference Layout */}
        <AppNav />

        {/* Main Canvas with Generous Luxury Margins */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-10">
          {/* Header Section: Monumental Display Title & Search Bar */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] block mb-1">
                  Private Atelier Dossier • {currentTrip.realm.toUpperCase()}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white uppercase leading-none">
                  Your Trip Plan
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                {shareToast && (
                  <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 animate-fade-in">
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="rounded-full text-xs font-mono border-white/20 bg-white/5 hover:bg-white/10 text-white cursor-pointer px-4"
                >
                  <Share2 className="mr-1.5 h-3.5 w-3.5" />
                  Share
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleExportCalendar}
                  className="rounded-full bg-[#8247ff] text-white hover:bg-[#7034f5] text-xs font-sans px-4.5 cursor-pointer shadow-md shadow-[#8247ff]/20"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Export .ics
                </Button>
              </div>
            </div>

            {/* Search Pill Bar matching Reference */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 flex items-center rounded-full border border-white/15 bg-[#130c24] px-5 py-3 text-sm text-white shadow-xl focus-within:border-[#8247ff]/60 transition-colors">
                <Search className="h-4 w-4 text-white/40 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sanctuaries, activities, flights..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none font-sans"
                />
              </div>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#130c24] text-white/70 hover:text-white hover:border-[#8247ff]/60 transition-all cursor-pointer shadow-xl"
                title="Filter View"
                aria-label="Filter View"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 50/50 Dashboard Matrix: Hero Sanctuary Card + 4-Card Telemetry Matrix */}
          <section
            aria-label="Trip Overview Dashboard"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Left Column: Dominant Hero Sanctuary Card (Span 6) */}
            <div className="lg:col-span-6 flex flex-col">
              <TripHeroCard />
            </div>

            {/* Right Column: 4-Card Telemetry Matrix (Span 6) */}
            <div className="lg:col-span-6 flex flex-col">
              <TelemetryMatrix />
            </div>
          </section>

          {/* Draft Transferred from Prototype Callout */}
          {draftSession && (
            <div className="rounded-2xl border border-[#8247ff]/40 bg-[#130c24] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8247ff]/20 text-[#8247ff] border border-[#8247ff]/30 shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase text-[#a855f7] font-semibold tracking-wider">
                      Draft Captured from Homepage Prototype
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="font-sans text-xs text-white font-medium mt-0.5">
                    &ldquo;{draftSession.prompt || draftSession.destination}&rdquo;
                  </p>
                  <span className="font-mono text-[11px] text-white/50">
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
                className="text-xs font-mono rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-white shrink-0 cursor-pointer"
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Dismiss
              </Button>
            </div>
          )}

          {/* Day-by-Day Cadence Itinerary & Concierge Panel Section */}
          <section aria-label="Detailed Living Cadences" className="space-y-6 pt-4">
            {/* Master Header Card */}
            <div className="rounded-[28px] border border-[#25183e] bg-[#130c24] p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-[#a855f7] font-mono text-xs tracking-widest uppercase mb-2">
                    <Compass className="h-4 w-4" />
                    <span>Private Journey #{currentTrip.id.toUpperCase()}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white">
                    {currentTrip.title}
                  </h2>
                  <p className="font-sans text-sm text-white/70 mt-2 max-w-xl font-light">
                    Designed for {currentTrip.patronName}. An unhurried journey through secluded palace courtyards, private lake access, and restorative wellness.
                  </p>
                </div>

                {/* Transit Overview Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-xs space-y-1.5 shrink-0">
                  <div className="flex items-center justify-between gap-6 text-white/50">
                    <span>SECTOR</span>
                    <span className="text-white font-semibold">DEL → UDR</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-white/50">
                    <span>SANCTUARY</span>
                    <span className="text-white">{currentTrip.days[0]?.sanctuaryName || "The Oberoi Udaivilas"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-white/50">
                    <span>TRAVEL DIRECTOR</span>
                    <span className="text-[#a855f7] font-medium">{currentTrip.curatorName}</span>
                  </div>
                </div>
              </div>

              {/* Day Sequence Overview Subnav */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-white/50 uppercase">Cadence:</span>
                  <span className="rounded-full bg-[#8247ff]/20 text-[#a855f7] px-2.5 py-0.5 border border-[#8247ff]/40">
                    {currentTrip.days.length} Days Active
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 border border-emerald-500/40">
                    All Venues Verified
                  </span>
                </div>

                <div className="flex items-center gap-2 text-white/50">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Unhurried Stillness Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Split Grid: Day Cards (Left 8 cols) + Concierge Panel (Right 4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Itinerary Day Cards */}
              <div className="lg:col-span-8 space-y-6">
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

                {/* Request Additional Day Button */}
                <div className="pt-2 pb-6 flex justify-center">
                  <Button
                    variant="outline"
                    className="rounded-full border border-dashed border-white/20 hover:border-[#8247ff]/60 bg-white/5 hover:bg-white/10 font-sans text-xs px-6 text-white/70 hover:text-white cursor-pointer"
                  >
                    + Request Additional Sanctuary Day from Travel Director
                  </Button>
                </div>
              </div>

              {/* Right Column: "Talk it through" Concierge Panel */}
              <div className="lg:col-span-4 sticky top-24">
                <ConciergePanel />
              </div>
            </div>
          </section>
        </main>

        {/* Slide-in Swap Drawer */}
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
