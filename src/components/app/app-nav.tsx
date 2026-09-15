"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { useTripSpreeStore } from "@/lib/store";

export function AppNav() {
  const pathname = usePathname();
  const { setCallActive } = useTripSpreeStore();

  const navLinks = [
    { label: "Dashboard", href: "/designer" },
    { label: "Trip Designer", href: "/designer" },
    { label: "Today View", href: "/today" },
    { label: "Pre-Departure", href: "/pre-departure" },
    { label: "Journal", href: "/journal" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0717]/80 backdrop-blur-2xl backdrop-saturate-180 px-4 sm:px-8 lg:px-12 py-3.5 select-none shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Lockup & Desktop Navigation Links */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-2.5 group active:scale-98 transition-transform duration-100" aria-label="TripSpree Home">
            <div className="relative h-8 w-6 flex items-center justify-center shrink-0">
              <Image
                src="/images/brand/logo-mark.png"
                alt="TripSpree Monogram"
                width={24}
                height={36}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="relative h-5 w-28 flex items-center">
              <Image
                src="/images/brand/logo-wordmark-white.png"
                alt="TripSpree"
                width={112}
                height={28}
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Clean Top Navigation Links with Apple-style Fluid Spring Indicator */}
          {/* Clean Top Navigation Links with Apple-style Fluid Spring Indicator */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm font-sans relative">
            {navLinks.map((item, idx) => {
              const isActive =
                item.href === pathname ||
                (item.label === "Dashboard" && pathname === "/designer" && idx === 0);
              return (
                <Link
                  key={`${item.label}-${idx}`}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-150 active:scale-95 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/60 hover:text-white font-normal hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeAppNavPill"
                      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 pointer-events-none -z-10"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center/Right: Connected Journey Marker & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Connected Journey Marker (UX §5) */}
          <div className="hidden lg:flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1 rounded-full text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-chart-1 animate-pulse" />
            <span className="text-white/90">Day 2 of 4</span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">Kyoto & Ago Bay</span>
          </div>

          {/* Talk It Through Quiet Entry Point (UX §2) */}
          <button
            type="button"
            onClick={() => setCallActive(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 text-xs font-mono tracking-wider transition-all duration-150 active:scale-95 cursor-pointer"
            title="Spoken consultation with Quiet Concierge"
          >
            <Radio className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>Talk it through</span>
          </button>

          {/* User Profile Avatar with Dropdown Indicator */}
          <Link
            href="/account"
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-100 cursor-pointer group"
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/20 bg-[#130c24] flex items-center justify-center">
              <span className="font-serif text-xs font-semibold text-primary">TS</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/50 group-hover:text-white transition-colors hidden sm:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
