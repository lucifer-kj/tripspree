"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app/app-header";
import { BoardingPassCard } from "@/components/app/boarding-pass-card";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { useTripSpreeStore } from "@/lib/store";
import { Download, ShieldCheck, FileText, CheckCircle2, Hotel } from "lucide-react";

export default function VaultPage() {
  const { isCallActive, setCallActive } = useTripSpreeStore();
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    { label: "All", count: 8 },
    { label: "Flights", count: 2 },
    { label: "Sanctuaries", count: 3 },
    { label: "Chauffeur", count: 2 },
    { label: "Visas", count: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#080c18] text-[#f8fafc] flex flex-col font-sans selection:bg-[#38bdf8]/30">
      {/* Unified Command Header */}
      <AppHeader
        activeTab="Vault"
        telemetryText="VAULT STATUS: ENCRYPTED · VERIFIED DOCUMENTS: 8 OF 8 · PASSENGER CLEARANCE: SOVEREIGN PASS"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        {/* Category Filter Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveFilter(cat.label)}
              className={`rounded-full px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap ${
                activeFilter === cat.label
                  ? "bg-[#38bdf8] text-[#080c18] shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                  : "bg-[#0f172a] text-[#94a3b8] hover:text-white border border-[#1e293b] hover:bg-[#162032]"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* 3-Column Luxury Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Document 1: Swiss Aviation Boarding Pass */}
          <div className="flex flex-col">
            <BoardingPassCard
              flightCode="JL-001"
              from="DEL"
              to="HND"
              gate="B18"
              seat="Suite 1A"
              time="14:30"
              className="h-full"
            />
          </div>

          {/* Document 2: Sanctuary Hotel Check-In Slip with Taxi Driver Address */}
          <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl flex flex-col justify-between select-none">
            <div className="space-y-4">
              {/* Slip Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <div className="flex items-center gap-2 text-[#94a3b8]">
                  <Hotel className="h-4 w-4 text-[#38bdf8]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    Hotel Voucher
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  CONFIRMED
                </span>
              </div>

              <div>
                <h3 className="font-sans text-xl font-black text-white uppercase">
                  SOWAKA RYOKAN KYOTO
                </h3>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-sans">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">Check-in</span>
                    <span className="font-bold text-white text-sm">15:00 JST</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#94a3b8] block">Room Type</span>
                    <span className="font-bold text-white text-sm">Courtyard Suite</span>
                  </div>
                </div>
                <div className="mt-2 text-xs font-mono text-[#94a3b8]">
                  Booking Reference: <span className="text-white font-bold">TS-894021</span>
                </div>
              </div>

              {/* Japanese Kanji Address Box for Local Taxi Drivers */}
              <div className="rounded-2xl border border-white/10 bg-[#162032] p-4 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#38bdf8] font-bold block">
                  Address for Taxi Driver (タクシー用住所):
                </span>
                <p className="font-sans text-xs text-white/95 leading-relaxed font-medium">
                  〒605-0825 京都府京都市東山区下河原通八坂鳥居前下る清井町480
                </p>
                <span className="font-mono text-[10px] text-[#94a3b8] block pt-1">
                  (Show this to the chauffeur at Kyoto Station)
                </span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between">
              <span className="font-mono text-xs text-[#94a3b8]">PDF Verified</span>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#162032] hover:bg-[#1f2d45] text-white text-xs font-mono font-medium transition-all cursor-pointer border border-[#1e293b]"
              >
                <Download className="h-3 w-3 text-[#38bdf8]" />
                <span>Save Offline</span>
              </button>
            </div>
          </div>

          {/* Document 3: e-Visa Sovereign Clearance Document */}
          <div className="rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-xl flex flex-col justify-between select-none">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                <div className="flex items-center gap-2 text-[#94a3b8]">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold">
                    Immigration Clearance
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  VALIDATED
                </span>
              </div>

              <div>
                <h3 className="font-sans text-xl font-black text-white uppercase">
                  e-Visa Clearance
                </h3>
                <span className="font-mono text-xs text-[#94a3b8] block mt-0.5">
                  Single Entry • 90 Days Sovereign Pass
                </span>
              </div>

              {/* Official Verification Stamp Graphic */}
              <div className="h-36 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 flex flex-col items-center justify-center p-4 text-center">
                <div className="h-16 w-36 rounded-xl border-2 border-emerald-400 text-emerald-400 font-mono text-lg font-black tracking-widest uppercase flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.3)] rotate-[-4deg]">
                  Approved
                </div>
                <span className="font-mono text-[9px] text-emerald-400/80 mt-2 uppercase tracking-widest">
                  Ministry of Foreign Affairs Verification Seal
                </span>
              </div>

              <div className="space-y-1 font-mono text-xs text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>Passport ID:</span>
                  <span className="text-white font-semibold">PC1502F0RESA</span>
                </div>
                <div className="flex justify-between">
                  <span>Validity:</span>
                  <span className="text-white">Until Nov 30, 2026</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Airside Ready
              </span>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#162032] hover:bg-[#1f2d45] text-white text-xs font-mono font-medium transition-all cursor-pointer border border-[#1e293b]"
              >
                <Download className="h-3 w-3 text-[#38bdf8]" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* In-Call Dimming Overlay */}
      <InCallOverlay
        callStatus={isCallActive ? "active" : "idle"}
        isMuted={false}
        isSpeaking={true}
        duration={12}
        activeTranscript="Elena Vance: 'Julian, your Japanese e-Visa and hotel confirmations are encrypted in your vault and available offline.'"
        onEndCall={() => setCallActive(false)}
        onToggleMute={() => {}}
        curatorName="Elena Vance"
        sanctuary="Document Vault"
      />
    </div>
  );
}
