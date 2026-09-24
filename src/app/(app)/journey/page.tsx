"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app/app-header";
import { SwapDrawer, SwapAlternative } from "@/components/app/swap-drawer";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { useTripSpreeStore } from "@/lib/store";
import { Compass, Clock, Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export default function JourneyPage() {
  const { currentTrip, swapActivity, isCallActive, setCallActive } = useTripSpreeStore();
  const [expandedDayId, setExpandedDayId] = useState<string>("kyoto-day-2");
  const [isSwapDrawerOpen, setIsSwapDrawerOpen] = useState(false);

  const activeStoreDay = currentTrip.days.find((d) => d.dayNumber === 2) || currentTrip.days[0];

  const activeAlternatives: SwapAlternative[] = (activeStoreDay?.alternatives || []).map((alt) => ({
    id: alt.id,
    title: alt.title,
    whyThis: alt.curatorEndorsement,
    confidenceTier: alt.confidenceTier,
    paceNote: `${alt.timeSlot.toUpperCase()} CADENCE`,
    previewTime:
      alt.timeSlot === "morning"
        ? "09:00 - 12:00"
        : alt.timeSlot === "afternoon"
        ? "14:00 - 17:00"
        : "19:30 - 21:30",
    location: alt.location,
  }));

  const handleApplySwap = (dayId: string, alt: SwapAlternative) => {
    const storeDay = currentTrip.days.find((d) => d.id === dayId);
    const matchingAlt = storeDay?.alternatives.find((a) => a.id === alt.id);
    if (matchingAlt) {
      swapActivity(dayId, matchingAlt);
    }
    setIsSwapDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080c18] text-[#f8fafc] flex flex-col font-sans selection:bg-[#38bdf8]/30">
      {/* Unified Command Header */}
      <AppHeader
        activeTab="Journey"
        telemetryText="TRIP ID: TS-894021 · 10 NIGHTS · CADENCE: UNHURRIED · VERIFIED SANCTUARIES: 100%"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Span 7 / 60% Width): Living Itinerary Cadence Stream */}
          <div className="lg:col-span-7 space-y-5">
            {/* Day 01: Collapsed Card */}
            <div
              onClick={() => setExpandedDayId(expandedDayId === "day-1" ? "" : "day-1")}
              className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl flex items-center justify-between cursor-pointer hover:border-[#38bdf8]/40 transition-all select-none"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94a3b8] block">
                  DAY 01
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
                  TOKYO: URBAN CALM
                </h3>
              </div>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-[#162032] border border-[#1e293b] flex items-center justify-center text-[#94a3b8]"
              >
                {expandedDayId === "day-1" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {/* Day 02: Expanded Active Dossier Card */}
            <div className="rounded-3xl border border-[#38bdf8]/40 bg-[#0f172a] p-6 sm:p-7 shadow-2xl space-y-5 select-none">
              <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-bold block">
                    DAY 02 · ACTIVE SECTOR
                  </span>
                  <h2 className="font-sans text-2xl sm:text-3xl font-black text-white uppercase mt-0.5">
                    KYOTO: IMPERIAL SECLUSION
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-semibold">
                  VERIFIED
                </span>
              </div>

              {/* Slot 1: Morning Transit */}
              <div className="rounded-2xl border border-[#1e293b] bg-[#162032] p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-mono text-base font-black text-white bg-[#0f172a] px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
                    09:00
                  </span>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white">
                      SHINKANSEN GRAN CLASS (TOKYO → KYOTO)
                    </h4>
                    <span className="font-mono text-xs text-[#94a3b8] block mt-0.5">
                      Transit code: JL-002 · Reserved Carriage 11
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#94a3b8] shrink-0">2H 15M</span>
              </div>

              {/* Slot 2: Afternoon Curated Experience with Swap Action */}
              <div className="rounded-2xl border border-[#38bdf8]/30 bg-[#131b2e] p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-mono text-base font-black text-[#38bdf8] bg-[#0f172a] px-3 py-1.5 rounded-xl border border-[#38bdf8]/30 shrink-0">
                    14:30
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans text-sm sm:text-base font-bold text-white">
                        ARASHIYAMA BAMBOO SECLUSION
                      </h4>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-mono font-bold">
                        Verified
                      </span>
                    </div>
                    <span className="font-sans text-xs text-[#94a3b8] block mt-0.5">
                      Private early access before public gates open
                    </span>
                  </div>
                </div>

                {/* Tactile Swap Pill Button */}
                <button
                  type="button"
                  onClick={() => setIsSwapDrawerOpen(true)}
                  className="rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#080c18] font-mono text-xs font-bold px-4 py-1.5 transition-all active:scale-95 shadow-[0_0_12px_rgba(56,189,248,0.3)] cursor-pointer self-start sm:self-auto shrink-0"
                >
                  [ Swap ]
                </button>
              </div>

              {/* Slot 3: Evening Sanctuary Check-in */}
              <div className="rounded-2xl border border-[#1e293b] bg-[#162032] p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-mono text-base font-black text-white bg-[#0f172a] px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
                    18:00
                  </span>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white">
                      SOWAKA RYOKAN COURTYARD SUITE
                    </h4>
                    <span className="font-sans text-xs text-[#94a3b8] block mt-0.5">
                      Sukiya-style architecture with private garden onsen
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#f59e0b] font-semibold shrink-0">CHECK-IN</span>
              </div>
            </div>

            {/* Day 03: Collapsed Card */}
            <div
              onClick={() => setExpandedDayId(expandedDayId === "day-3" ? "" : "day-3")}
              className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl flex items-center justify-between cursor-pointer hover:border-[#38bdf8]/40 transition-all select-none"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94a3b8] block">
                  DAY 03
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
                  HAKONE: VOLCANIC SERENITY
                </h3>
              </div>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-[#162032] border border-[#1e293b] flex items-center justify-center text-[#94a3b8]"
              >
                {expandedDayId === "day-3" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Right Column (Span 5 / 40% Width): Corridor Map & Pacing Gauge */}
          <div className="lg:col-span-5 space-y-6">
            {/* Route Corridor Map Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl select-none">
              <div className="flex items-center justify-between pb-4 border-b border-[#1e293b] mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] font-bold">
                  Route Corridor Map
                </span>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  Sovereign Sector
                </span>
              </div>

              {/* Minimalist SVG Connected Route Nodes */}
              <div className="py-4 px-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-2">
                  <span>TOKYO</span>
                  <span>→</span>
                  <span>KYOTO</span>
                  <span>→</span>
                  <span>HAKONE</span>
                </div>

                <div className="relative w-full h-24 flex items-center justify-between px-6">
                  {/* Connecting Line */}
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#38bdf8] via-[#0284c7] to-[#38bdf8]" />

                  {/* Node 1: Tokyo */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="h-5 w-5 rounded-full bg-[#38bdf8] border-4 border-[#080c18] shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                    <span className="font-mono text-[10px] text-white/70 mt-2">Active</span>
                  </div>

                  {/* Node 2: Kyoto */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="h-6 w-6 rounded-full bg-[#38bdf8] border-4 border-[#080c18] animate-pulse shadow-[0_0_16px_rgba(56,189,248,1)]" />
                    <span className="font-mono text-[10px] text-[#38bdf8] font-bold mt-2">Current</span>
                  </div>

                  {/* Node 3: Hakone */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="h-5 w-5 rounded-full bg-[#162032] border-4 border-[#080c18] border-dashed" />
                    <span className="font-mono text-[10px] text-white/40 mt-2">Next</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pacing Index & Seasonal Foliage Gauge */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl select-none space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">
                    Telemetry Cadence
                  </span>
                  <h4 className="font-sans text-xl font-black text-white mt-0.5">
                    Pacing Index: Unhurried
                  </h4>
                </div>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold">
                  Optimal
                </span>
              </div>

              {/* Progress Track */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono text-[#94a3b8]">
                  <span>2.4 hrs average transit / day</span>
                  <span className="text-[#38bdf8] font-semibold">Low Density</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#162032] overflow-hidden">
                  <div className="w-[35%] h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#38bdf8]" />
                </div>
              </div>

              {/* Autumn Foliage Meter */}
              <div className="rounded-2xl border border-white/10 bg-[#162032] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b]">
                    🍁
                  </div>
                  <div>
                    <span className="font-sans text-sm font-bold text-white block">
                      Autumn Foliage Telemetry
                    </span>
                    <span className="font-mono text-xs text-[#94a3b8]">
                      Kyoto Momiji: Peak Coloration
                    </span>
                  </div>
                </div>
                <span className="font-mono text-base font-black text-[#f59e0b]">88%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-in Swap Drawer */}
      <SwapDrawer
        isOpen={isSwapDrawerOpen}
        activeDay={{
          id: "kyoto-day-2",
          dayNumber: 2,
          date: "14 October",
          destination: "KYOTO",
          title: "Imperial Seclusion",
          whyThis: "Curated for restorative courtyard calm.",
          confidenceTier: "Verified",
          transitCode: "JL-002",
          curatorNote: "Private garden access.",
          schedule: [],
        }}
        alternatives={activeAlternatives}
        onSelectAlternative={(dayId, alt) => handleApplySwap(dayId, alt)}
        onClose={() => setIsSwapDrawerOpen(false)}
      />

      {/* In-Call Dimming Overlay */}
      <InCallOverlay
        callStatus={isCallActive ? "active" : "idle"}
        isMuted={false}
        isSpeaking={true}
        duration={22}
        activeTranscript="Elena Vance: 'Julian, I am reviewing your day in Kyoto — would you like to swap the afternoon for a private tea ceremony?'"
        onEndCall={() => setCallActive(false)}
        onToggleMute={() => {}}
        curatorName="Elena Vance"
        sanctuary="Kyoto"
      />
    </div>
  );
}
