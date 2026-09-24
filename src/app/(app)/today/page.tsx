"use client";

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/app/app-header";
import { SolariBoard } from "@/components/app/solari-board";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { useTripSpreeStore } from "@/lib/store";
import { Wifi, PhoneCall, CheckCircle2, Clock, MapPin, Sparkles } from "lucide-react";

export default function TodayPage() {
  const {
    isDriverStandingBy,
    toggleDriverStandingBy,
    isCallActive,
    setCallActive,
    submitCheckIn,
  } = useTripSpreeStore();

  const [localTime, setLocalTime] = useState("16:42:00");
  const [selectedMood, setSelectedMood] = useState<string | null>("peaceful");
  const [isCheckInSubmitted, setIsCheckInSubmitted] = useState(false);

  // Live Tokyo Standard Time clock
  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setLocalTime(fmt);
      } catch {
        const d = new Date();
        setLocalTime(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMoodSelect = (mood: "exceptional" | "peaceful" | "fatigued" | "adjust") => {
    setSelectedMood(mood);
    submitCheckIn({
      dayNumber: 2,
      sanctuary: "Sowaka Ryokan",
      mood: mood === "adjust" ? "fatigued" : mood,
      notes: "Logged via Sapphire OS Today View.",
    });
    setIsCheckInSubmitted(true);
    setTimeout(() => setIsCheckInSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#080c18] text-[#f8fafc] flex flex-col font-sans selection:bg-[#38bdf8]/30">
      {/* Unified Command Header */}
      <AppHeader
        activeTab="Today"
        telemetryText="LOCAL TIME: 16:42 JST · WEATHER: 18°C QUIET DRIZZLE · CHAUFFEUR: STANDING BY AT MAIN GATE · SYNC: LIVE"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (Span 7 / 60% Width): Active Operational Agenda */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* "What's Next" Dominant Focal Card */}
            <div className="rounded-3xl border-2 border-[#38bdf8]/40 bg-[#0f172a] p-6 sm:p-8 shadow-2xl space-y-5 select-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8] animate-ping" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-bold">
                    What&apos;s Next · Immediate Focus
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-semibold">
                  Verified Slot
                </span>
              </div>

              <div>
                <h2 className="font-sans text-3xl sm:text-4xl font-black text-white leading-tight uppercase tracking-tight">
                  14:30 JST ARASHIYAMA BAMBOO WALK
                </h2>
                <p className="font-sans text-sm sm:text-base text-white/80 mt-2 leading-relaxed">
                  Private monk-guided access through Tenryū-ji cloisters before evening gates close. Chauffeur Kenji stands by at Main Gate.
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={toggleDriverStandingBy}
                  className={`min-h-[48px] rounded-xl px-6 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 active:scale-97 cursor-pointer flex items-center justify-center gap-2 ${
                    isDriverStandingBy
                      ? "bg-emerald-500 text-[#080c18] shadow-[0_0_16px_rgba(16,185,129,0.4)]"
                      : "bg-[#38bdf8] hover:bg-[#0284c7] text-[#080c18] shadow-[0_0_16px_rgba(56,189,248,0.4)]"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {isDriverStandingBy ? "CHAUFFEUR STANDING BY" : "NOTIFY CHAUFFEUR"}
                  </span>
                </button>

                <div className="flex items-center text-xs font-mono text-[#94a3b8] px-2">
                  <span>Driver Kenji (Black Century #408)</span>
                </div>
              </div>
            </div>

            {/* Later Tonight Schedule Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl space-y-4 select-none">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
                  Later Tonight
                </span>
                <span className="font-mono text-xs text-[#38bdf8]">
                  {localTime} JST
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-4 rounded-2xl bg-[#162032] p-4 border border-[#1e293b]/60">
                  <span className="font-mono text-sm font-black text-[#38bdf8] w-14 shrink-0 pt-0.5">
                    19:30
                  </span>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white">
                      PRIVATE KAISEKI DINNER
                    </h4>
                    <p className="font-sans text-xs text-[#94a3b8] mt-0.5">
                      Gion Matsuda • 12-course seasonal autumn tasting menu
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-[#162032] p-4 border border-[#1e293b]/60">
                  <span className="font-mono text-sm font-black text-white w-14 shrink-0 pt-0.5">
                    21:30
                  </span>
                  <div>
                    <h4 className="font-sans text-sm sm:text-base font-bold text-white">
                      CEDAR ONSEN BATH PREPARATION
                    </h4>
                    <p className="font-sans text-xs text-[#94a3b8] mt-0.5">
                      Private courtyard pavilion • Seasonal yuzu infusion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5 / 40% Width): Tactical Staging Cockpit */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Chauffeur Solari Board */}
            <SolariBoard
              time="15:10"
              line1="KYOTO"
              line2="KENJI"
              badge="CHAUFFEUR TELEMETRY"
            />

            {/* Card 2: Sanctuary Credentials Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl space-y-4 select-none">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
                  Sanctuary Telemetry
                </span>
                <span className="font-mono text-xs text-emerald-400">
                  Active Stay
                </span>
              </div>

              <div>
                <h3 className="font-sans text-xl font-black text-white uppercase">
                  SOWAKA RYOKAN · SUITE 04
                </h3>
                <span className="font-mono text-xs text-[#38bdf8] block mt-0.5">
                  Yasaka Courtyard Residence
                </span>
              </div>

              <div className="space-y-2 pt-1 font-mono text-xs text-white/80">
                <div className="flex items-center justify-between rounded-xl bg-[#162032] px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-[#94a3b8]">
                    <Wifi className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Wi-Fi:
                  </span>
                  <span className="text-white font-semibold">SOWAKA_PRIVATE</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#162032] px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-[#94a3b8]">
                    <PhoneCall className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Concierge Ext:
                  </span>
                  <span className="text-white font-semibold">#01 (24/7 Desk)</span>
                </div>
              </div>
            </div>

            {/* Card 3: Arrival Feeling Check-In Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl space-y-4 select-none">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">
                    Evening Reflection
                  </span>
                  <h4 className="font-sans text-lg font-black text-white mt-0.5">
                    Arrival Feeling?
                  </h4>
                </div>
                {isCheckInSubmitted && (
                  <span className="font-mono text-xs text-emerald-400 animate-fade-in">
                    ✓ Saved
                  </span>
                )}
              </div>

              {/* Mood Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { key: "exceptional", label: "Exceptional" },
                  { key: "peaceful", label: "Peaceful" },
                  { key: "fatigued", label: "Fatigued" },
                  { key: "adjust", label: "Adjust" },
                ].map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => handleMoodSelect(m.key as any)}
                    className={`py-2 px-3 rounded-xl font-mono text-xs font-semibold uppercase transition-all duration-100 cursor-pointer text-center ${
                      selectedMood === m.key
                        ? "bg-[#38bdf8] text-[#080c18] shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                        : "bg-[#162032] text-[#94a3b8] hover:text-white hover:bg-[#1f2d45]"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Live In-Call Dimming Overlay */}
      <InCallOverlay
        callStatus={isCallActive ? "active" : "idle"}
        isMuted={false}
        isSpeaking={true}
        duration={14}
        activeTranscript="Elena Vance: 'Good evening. I have confirmed your chauffeur Kenji at the main gate. Let me know when you wish to depart.'"
        onEndCall={() => setCallActive(false)}
        onToggleMute={() => {}}
        curatorName="Elena Vance"
        sanctuary="Sowaka Ryokan"
      />
    </div>
  );
}
