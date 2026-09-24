"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio } from "lucide-react";
import { useTripSpreeStore } from "@/lib/store";

interface AppHeaderProps {
  activeTab?: "Overview" | "Journey" | "Today" | "Vault" | "Payments";
  telemetryText?: string;
}

export function AppHeader({
  activeTab,
  telemetryText = "SECTOR: DEL → HND (JL-001) · DEPARTURE IN 18D · READINESS: 78% · STATUS: VERIFIED",
}: AppHeaderProps) {
  const pathname = usePathname();
  const { setCallActive } = useTripSpreeStore();

  const tabs = [
    { label: "Overview", href: "/overview" },
    { label: "Journey", href: "/journey" },
    { label: "Today", href: "/today" },
    { label: "Vault", href: "/vault" },
    { label: "Payments", href: "/payments" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
      {/* Tier 1: Glassmorphic Global Navigation Bar */}
      <div className="border-b border-[#1e293b] bg-[#080c18]/90 backdrop-blur-2xl px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
        {/* Brand Mark */}
        <Link
          href="/"
          className="flex items-center gap-2 group active:scale-95 transition-transform"
        >
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] flex items-center justify-center text-[#080c18] font-bold text-xs shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            TS
          </div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
            TripSpree
          </span>
        </Link>

        {/* Center: Navigation Pills */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full border border-[#1e293b] bg-[#0f172a]/80 shadow-inner">
          {tabs.map((tab) => {
            const isActive =
              activeTab === tab.label ||
              pathname === tab.href ||
              (tab.label === "Overview" && (pathname === "/designer" || pathname === "/overview"));

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-150 active:scale-95 ${
                  isActive
                    ? "bg-[#38bdf8] text-[#080c18] shadow-[0_0_16px_rgba(56,189,248,0.45)]"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Talk It Through Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCallActive(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono font-medium hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.25)]"
            title="Spoken consultation with Quiet Concierge"
          >
            <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Talk it through</span>
          </button>
        </div>
      </div>

      {/* Tier 2: Dynamic Horizontal Telemetry Ribbon */}
      <div className="border-b border-[#1e293b]/70 bg-[#0b1120] px-4 sm:px-8 py-2 flex items-center justify-center text-[10px] sm:text-[11px] font-mono tracking-wider text-[#94a3b8] uppercase text-center overflow-x-auto whitespace-nowrap">
        <span className="inline-block">{telemetryText}</span>
      </div>
    </header>
  );
}
