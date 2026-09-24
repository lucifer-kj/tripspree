"use client";

import Image from "next/image";
import { AppHeader } from "@/components/app/app-header";
import { SolariBoard } from "@/components/app/solari-board";
import { BoardingPassCard } from "@/components/app/boarding-pass-card";
import { WhatsNextCard } from "@/components/app/whats-next-card";
import { ReadinessRingCard } from "@/components/app/readiness-ring-card";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { useTripSpreeStore } from "@/lib/store";

export default function OverviewPage() {
  const { isCallActive, setCallActive } = useTripSpreeStore();

  return (
    <div className="min-h-screen bg-[#080c18] text-[#f8fafc] flex flex-col font-sans selection:bg-[#38bdf8]/30">
      {/* Unified Command Header */}
      <AppHeader
        activeTab="Overview"
        telemetryText="SECTOR: DEL → HND (JL-001) · DEPARTURE IN 18D · READINESS: 78% · STATUS: VERIFIED"
      />

      {/* Main Canvas: 60/40 Precision Split */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (Span 7 / 60% Width): Panoramic Sanctuary & Agenda */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Ultra-Wide Panoramic Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#1e293b] bg-[#0f172a] shadow-2xl min-h-[360px] sm:min-h-[400px] flex flex-col justify-between p-6 sm:p-8 select-none group">
              {/* Background Photo */}
              <Image
                src={UNSPLASH_ASSETS.sowakaKyoto.url}
                alt="Hakone Volcanic Serenity"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Contrast Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c18]/95 via-[#080c18]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Top Meta Pill */}
              <div className="relative z-10 flex justify-end">
                <span className="rounded-full bg-[#080c18]/80 backdrop-blur-md border border-[#38bdf8]/40 px-3.5 py-1.5 text-xs font-mono font-medium text-[#38bdf8] shadow-md">
                  740M ALTITUDE · 16°C
                </span>
              </div>

              {/* Bottom Title Lockup */}
              <div className="relative z-10 space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] block font-semibold">
                  Sanctuary Stage · Day 02
                </span>
                <h1 className="font-sans text-3xl sm:text-5xl font-black text-white leading-none uppercase tracking-tight drop-shadow-md">
                  Hakone: Volcanic Serenity
                </h1>
                <p className="font-sans text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed font-light">
                  Secluded geothermal baths set within mist-dense cedar valleys and private Kaiseki dining pavilions.
                </p>
              </div>
            </div>

            {/* Evening Agenda Sub-Card */}
            <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] font-bold">
                  Evening Agenda
                </span>
                <span className="font-mono text-[11px] text-[#94a3b8]">
                  Verified Cadence
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 rounded-2xl bg-[#162032] p-3.5 border border-[#1e293b]/60">
                  <span className="h-2 w-2 rounded-full bg-[#38bdf8] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-[#38bdf8] font-bold block">10:00 AM</span>
                    <span className="font-sans text-sm font-semibold text-white">Private Mountain Onsen</span>
                    <span className="font-sans text-xs text-[#94a3b8] block mt-0.5">Secluded cedar soaking pavilions</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#162032] p-3.5 border border-[#1e293b]/60">
                  <span className="h-2 w-2 rounded-full bg-[#f59e0b] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-[#f59e0b] font-bold block">12:00 PM</span>
                    <span className="font-sans text-sm font-semibold text-white">Japanese Tea Ceremony</span>
                    <span className="font-sans text-xs text-[#94a3b8] block mt-0.5">Guided by Master Soshitsu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5 / 40% Width): 2x2 Telemetry Cockpit */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
            {/* Card 1: Solari Mechanical Split-Flap Display */}
            <SolariBoard
              time="16:30"
              line1="PRIVATE"
              line2="ON-SEN"
              badge="DEPARTURE BOARD"
            />

            {/* Card 2: Luxury Boarding Pass */}
            <BoardingPassCard
              flightCode="JL-001"
              from="DEL"
              to="HND"
              gate="B18"
              seat="Suite 1A"
              time="14:30"
            />

            {/* Card 3: What's Next Focal Card */}
            <WhatsNextCard
              time="14:30 JST"
              title="CHECK-IN AT SOWAKA RYOKAN"
              description="Check that your trip next schedulers are locked and verified."
              buttonLabel="NOTIFY CHAUFFEUR"
            />

            {/* Card 4: 78% Readiness Metric Ring */}
            <ReadinessRingCard
              score={78}
              label="Readiness Ring"
              items={[
                { title: "Flights confirmed", checked: true },
                { title: "Sanctuary checked", checked: true },
                { title: "Chauffeur standby", checked: true },
                { title: "Visa verified", checked: false },
              ]}
            />
          </div>
        </div>
      </main>

      {/* Voice Consultation Dimming Overlay */}
      <InCallOverlay
        callStatus={isCallActive ? "active" : "idle"}
        isMuted={false}
        isSpeaking={true}
        duration={18}
        activeTranscript="Elena Vance: 'Good evening. I have verified your transfer to Sowaka Ryokan — your private chauffeur stands by at Pier 4.'"
        onEndCall={() => setCallActive(false)}
        onToggleMute={() => {}}
        curatorName="Elena Vance"
        sanctuary="Hakone"
      />
    </div>
  );
}
