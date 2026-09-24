"use client";

import { Plane } from "lucide-react";

interface BoardingPassCardProps {
  flightCode?: string;
  from?: string;
  to?: string;
  gate?: string;
  seat?: string;
  time?: string;
  className?: string;
}

export function BoardingPassCard({
  flightCode = "JL-001",
  from = "DEL",
  to = "HND",
  gate = "B18",
  seat = "Suite 1A",
  time = "14:30",
  className = "",
}: BoardingPassCardProps) {
  return (
    <div
      className={`rounded-3xl border border-[#1e293b] bg-white text-[#080c18] p-5 sm:p-6 shadow-xl flex flex-col justify-between select-none relative overflow-hidden ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/10">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-black/50 block font-bold">
            EXPEDITION TRANSIT
          </span>
          <h4 className="font-sans text-sm font-black tracking-tight text-black">
            LUXURY BOARDING PASS
          </h4>
        </div>
        <div className="h-8 w-8 rounded-full bg-[#080c18] flex items-center justify-center text-white">
          <Plane className="h-4 w-4 rotate-45" />
        </div>
      </div>

      {/* Route & Times */}
      <div className="py-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-[9px] text-black/50 block uppercase">Origin</span>
          <span className="font-sans text-2xl font-black text-black">{from}</span>
        </div>
        <div className="flex flex-col items-center px-2">
          <span className="font-mono text-[9px] text-[#0284c7] font-semibold">{flightCode}</span>
          <div className="w-12 h-[1px] bg-black/30 my-1 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px]">▶</span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-[9px] text-black/50 block uppercase">Sanctuary</span>
          <span className="font-sans text-2xl font-black text-black">{to}</span>
        </div>
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-3 gap-2 border-t border-b border-black/10 py-2.5 font-sans text-xs">
        <div>
          <span className="font-mono text-[8px] uppercase text-black/40 block">Gate</span>
          <span className="font-bold text-black text-sm">{gate}</span>
        </div>
        <div>
          <span className="font-mono text-[8px] uppercase text-black/40 block">Seat</span>
          <span className="font-bold text-black text-sm">{seat}</span>
        </div>
        <div className="text-right">
          <span className="font-mono text-[8px] uppercase text-black/40 block">Boarding</span>
          <span className="font-bold text-black text-sm">{time}</span>
        </div>
      </div>

      {/* Barcode Strip */}
      <div className="pt-3 flex flex-col items-center">
        <div className="flex items-center justify-center gap-[2px] h-7 w-full overflow-hidden opacity-90">
          {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 4, 1, 2, 4, 1, 3, 2, 4, 1, 2, 3, 2, 4, 1, 3].map(
            (w, i) => (
              <span
                key={i}
                style={{ width: `${w}px` }}
                className="h-full bg-black shrink-0 inline-block"
              />
            )
          )}
        </div>
        <span className="font-mono text-[8px] tracking-[0.25em] text-black/50 mt-1 uppercase">
          TS-894021-ATELIER-VERIFIED
        </span>
      </div>
    </div>
  );
}
