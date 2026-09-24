"use client";

import { ArrowRight } from "lucide-react";

interface WhatsNextCardProps {
  time?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function WhatsNextCard({
  time = "14:30 JST",
  title = "CHECK-IN AT SOWAKA RYOKAN",
  description = "Check that your trip next schedulers are locked and verified.",
  buttonLabel = "NOTIFY CHAUFFEUR",
  onAction,
  className = "",
}: WhatsNextCardProps) {
  return (
    <div
      className={`rounded-3xl border border-[#1e293b] bg-[#0f172a] p-5 sm:p-6 shadow-xl flex flex-col justify-between select-none ${className}`}
    >
      <div>
        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#38bdf8] font-bold">
            What&apos;s Next
          </span>
        </div>

        {/* Big Bold Headline */}
        <h3 className="font-sans text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight">
          {time}
        </h3>
        <p className="font-sans text-base sm:text-lg font-bold text-white/95 mt-1 leading-snug">
          {title}
        </p>

        {/* Operational Description */}
        <p className="font-sans text-xs text-[#94a3b8] mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onAction}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#38bdf8] hover:bg-[#0284c7] text-[#080c18] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-150 active:scale-97 shadow-[0_0_16px_rgba(56,189,248,0.35)] cursor-pointer"
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
