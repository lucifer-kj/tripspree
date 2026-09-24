"use client";

import { Check } from "lucide-react";

interface ReadinessRingCardProps {
  score?: number;
  label?: string;
  items?: { title: string; checked: boolean }[];
  className?: string;
}

export function ReadinessRingCard({
  score = 78,
  label = "Readiness Metric",
  items = [
    { title: "Flights confirmed", checked: true },
    { title: "Sanctuary checked", checked: true },
    { title: "Chauffeur on standby", checked: true },
    { title: "Visa pre-cleared", checked: false },
  ],
  className = "",
}: ReadinessRingCardProps) {
  // SVG circular calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`rounded-3xl border border-[#1e293b] bg-[#0f172a] p-5 sm:p-6 shadow-xl flex flex-col justify-between select-none ${className}`}
    >
      {/* Header with Title & Circular Ring */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#94a3b8] block">
            {label}
          </span>
          <div className="text-4xl sm:text-5xl font-sans font-black text-white tracking-tight mt-1">
            {score}%
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 90 90">
            {/* Background Track */}
            <circle
              cx="45"
              cy="45"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              className="text-[#162032]"
              fill="transparent"
            />
            {/* Animated Progress Arc */}
            <circle
              cx="45"
              cy="45"
              r={radius}
              stroke="#38bdf8"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-xs font-mono font-bold text-white">
            {score}%
          </span>
        </div>
      </div>

      {/* Checklist Rows */}
      <div className="space-y-2 pt-3 border-t border-[#1e293b]/80">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-xs font-sans text-white/80"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                  item.checked
                    ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40"
                    : "bg-[#162032] text-white/30 border border-white/10"
                }`}
              >
                {item.checked && <Check className="h-2.5 w-2.5" />}
              </span>
              <span className={item.checked ? "text-white" : "text-[#94a3b8]"}>
                {item.title}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#94a3b8]">0{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
