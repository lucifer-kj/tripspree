"use client";

import { ArrowUpRight, Plane } from "lucide-react";

export function TelemetryMatrix() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 select-none h-full">
      {/* CARD 1: Gate & Suite Clearance (Top-Left) */}
      <div className="relative rounded-[28px] border border-[#25183e] bg-[#130c24] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-xl group hover:border-[#8247ff]/40 active:scale-[0.985] transition-all duration-150 cursor-pointer">
        {/* Subtle Corner Screw Accents matching Reference */}
        <div className="absolute top-3.5 left-3.5 h-1.5 w-1.5 rounded-full bg-white/20" />
        <div className="absolute top-3.5 right-3.5 h-1.5 w-1.5 rounded-full bg-white/20" />
        <div className="absolute bottom-3.5 left-3.5 h-1.5 w-1.5 rounded-full bg-white/20" />
        <div className="absolute bottom-3.5 right-3.5 h-1.5 w-1.5 rounded-full bg-white/20" />

        {/* Diagonal Arrow Icon in Top Right */}
        <div className="flex justify-end">
          <ArrowUpRight className="h-6 w-6 text-white/60 group-hover:text-white transition-colors" />
        </div>

        {/* Massive Bold Identifier */}
        <div>
          <div className="text-5xl sm:text-6xl font-sans font-extrabold tracking-tight text-white leading-none">
            B18
          </div>
        </div>

        {/* Subtitle & Countdown */}
        <div className="space-y-0.5 pt-2">
          <div className="font-sans text-sm font-semibold text-white">
            Gate Open
          </div>
          <div className="font-sans text-xs text-white/60">
            Private transfer departure in 26min
          </div>
        </div>
      </div>

      {/* CARD 2: Transit Route & Progress Timeline (Top-Right) */}
      <div className="rounded-[28px] border border-[#25183e] bg-[#130c24] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-xl hover:border-[#8247ff]/40 active:scale-[0.985] transition-all duration-150 cursor-pointer">
        {/* Header Countdown */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">
            Arrival in
          </span>
          <div className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
            1h 23min
          </div>
        </div>

        {/* Route Points & Progress Line */}
        <div className="space-y-3 pt-2">
          <div className="flex items-end justify-between text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] text-white/50 block">14:30</span>
              <span className="text-lg font-bold text-white">DEL</span>
              <span className="text-[10px] text-white/50 block">Delhi</span>
            </div>

            {/* Glowing Plane Icon */}
            <div className="flex flex-col items-center">
              <div className="h-7 w-7 rounded-full bg-[#f97316]/20 border border-[#f97316]/40 flex items-center justify-center text-[#f97316] mb-1">
                <Plane className="h-3.5 w-3.5 rotate-45" />
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[10px] text-white/50 block">16:30</span>
              <span className="text-lg font-bold text-white">UDR</span>
              <span className="text-[10px] text-white/50 block">Udaipur</span>
            </div>
          </div>

          {/* Sunset Coral Progress Bar matching Reference */}
          <div className="relative w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-[68%] rounded-full bg-gradient-to-r from-[#8247ff] to-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
          </div>
        </div>
      </div>

      {/* CARD 3: Boarding Pass & Barcode Dossier (Bottom-Left) */}
      <div className="rounded-[28px] border border-[#25183e] bg-[#130c24] p-6 sm:p-7 flex flex-col justify-between min-h-[240px] shadow-xl space-y-4 hover:border-[#8247ff]/40 active:scale-[0.985] transition-all duration-150 cursor-pointer">
        {/* Route Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase text-white/40 block">Origin</span>
            <div className="font-sans text-base font-bold text-white">DEL</div>
          </div>
          <span className="text-white/40 text-sm font-sans">→</span>
          <div className="text-right">
            <span className="font-mono text-[10px] uppercase text-white/40 block">Sanctuary</span>
            <div className="font-sans text-base font-bold text-white">UDR</div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between text-[11px] font-mono text-white/60 border-t border-b border-white/10 py-2">
          <span>↗ 14:30 May 1, 2026</span>
          <span>↘ 16:30 May 1, 2026</span>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-4 gap-2 text-[10px] font-sans text-white/70">
          <div>
            <span className="text-white/40 block font-mono text-[8px] uppercase">Transfer</span>
            <span className="font-medium text-white">JL-001</span>
          </div>
          <div>
            <span className="text-white/40 block font-mono text-[8px] uppercase">Gate</span>
            <span className="font-medium text-white">Pier 4</span>
          </div>
          <div>
            <span className="text-white/40 block font-mono text-[8px] uppercase">Cabin</span>
            <span className="font-medium text-white">Suite A</span>
          </div>
          <div>
            <span className="text-white/40 block font-mono text-[8px] uppercase">Guest</span>
            <span className="font-medium text-white truncate block">Lucifer</span>
          </div>
        </div>

        {/* Authentic Barcode Graphic matching Reference */}
        <div className="pt-2 flex flex-col items-center">
          <div className="flex items-center justify-center gap-[3px] h-9 w-full overflow-hidden opacity-85">
            {[4, 1, 3, 1, 2, 5, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 5, 2, 1, 3, 4, 1, 2, 4, 1, 3, 2, 5, 1, 4, 2, 1, 3, 2, 4, 1, 2].map(
              (w, i) => (
                <span
                  key={i}
                  style={{ width: `${w}px` }}
                  className="h-full bg-white/80 shrink-0 inline-block"
                />
              )
            )}
          </div>
          <span className="font-mono text-[8px] tracking-[0.25em] text-white/40 mt-1 uppercase">
            TS-894021-ATELIER-VERIFIED
          </span>
        </div>
      </div>

      {/* CARD 4: Split-Flap Departure Board (Bottom-Right) */}
      <div className="rounded-[28px] border border-[#25183e] bg-[#130c24] p-6 sm:p-7 flex flex-col justify-between min-h-[240px] shadow-xl space-y-3 hover:border-[#8247ff]/40 active:scale-[0.985] transition-all duration-150 cursor-pointer">
        {/* Header */}
        <div>
          <div className="font-sans text-sm font-semibold text-white">
            Planned Transfers
          </div>
          <div className="font-sans text-xs text-white/60">
            You have a private transfer planned for today.
          </div>
        </div>

        {/* Retro Split-Flap / Dot-Matrix Departure Display matching Reference */}
        <div className="rounded-2xl border border-white/10 bg-[#090510] p-4 sm:p-5 flex flex-col items-center justify-center shadow-inner font-mono">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[#f97316] text-xl sm:text-2xl font-bold tracking-widest">
            <span className="bg-[#1a0e2e] border border-white/10 px-2 py-1 rounded shadow-sm">1</span>
            <span className="bg-[#1a0e2e] border border-white/10 px-2 py-1 rounded shadow-sm">6</span>
            <span className="text-white/40">:</span>
            <span className="bg-[#1a0e2e] border border-white/10 px-2 py-1 rounded shadow-sm">0</span>
            <span className="bg-[#1a0e2e] border border-white/10 px-2 py-1 rounded shadow-sm">0</span>
          </div>

          <div className="mt-2.5 text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/90">
            UDAIPUR
          </div>

          <div className="mt-1 text-[11px] font-medium tracking-[0.2em] text-[#a855f7]">
            PRV-BOAT 101
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Clearance Confirmed
          </span>
          <span>Dock 4 • Pier Access</span>
        </div>
      </div>
    </div>
  );
}
