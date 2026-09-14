"use client";

import { useState } from "react";
import Link from "next/link";
import { AppNav } from "@/components/app/app-nav";
import { Button } from "@/components/ui/button";
import { useTripSpreeStore } from "@/lib/store";
import { AuthGate } from "@/components/app/auth-gate";
import {
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Moon,
  Activity,
  ChevronRight,
  Check,
  LogOut,
  Lock,
} from "lucide-react";

export default function AccountPage() {
  const { currentTrip, tasteProfile, resetToDefaults, logout, currentUser } = useTripSpreeStore();
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "system">("dark");
  const [motionOverride, setMotionOverride] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 3000);
  };

  return (
    <AuthGate
      fallbackTitle="Member Profile & Preferences"
      fallbackDescription="Personal preferences, taste profiles, and session security require member credentials."
    >
      <div className="min-h-screen bg-[#0c0717] text-white selection:bg-[#8247ff]/30 flex flex-col font-sans">
        {/* Global Top Navigation Bar */}
        <AppNav />

        {/* Main Account Settings Canvas */}
        <main className="flex-1 flex flex-col">
          {/* Top App Bar */}
          <header className="h-16 shrink-0 border-b border-white/10 bg-[#130c24]/90 backdrop-blur-md px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              ACCOUNT & TRAVEL PREFERENCES
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="font-mono text-xs text-foreground font-medium">
              MEMBER #TS-8842
            </span>
          </div>

          <Link href="/designer">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-mono border-border text-foreground hover:bg-muted cursor-pointer"
            >
              Return to Designer
            </Button>
          </Link>
        </header>

        {/* Content Container */}
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 py-8 md:py-12 space-y-8">
          {/* Master Member Profile Card */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-serif text-2xl font-medium shrink-0">
                  JS
                </div>
                <div>
                  <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest mb-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Founding Member</span>
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl text-foreground font-medium tracking-tight">
                    {currentTrip.patronName}
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {currentTrip.patronEmail} • Member since Autumn 2024
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs space-y-1 shrink-0">
                <div className="text-muted-foreground uppercase text-[10px]">TRAVEL DIRECTOR</div>
                <div className="text-foreground font-semibold">{currentTrip.curatorName}</div>
                <div className="text-primary text-[11px]">Senior Travel Director</div>
              </div>
            </div>

            {/* Curated Taste Archetype Quick View */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Active Taste Archetype
                </span>
                <Link
                  href="/quiz"
                  className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <span>Retake Taste Quiz</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-serif text-lg text-foreground font-medium">
                    {tasteProfile.archetypeTitle}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
                  {tasteProfile.archetypeDescription}
                </p>

                <div className="flex flex-wrap gap-4 font-mono text-xs text-muted-foreground pt-3 border-t border-primary/15">
                  <span>Pacing: <strong className="text-foreground font-semibold">{tasteProfile.pace.toUpperCase()}</strong></span>
                  <span>•</span>
                  <span>Stillness Index: <strong className="text-primary font-semibold">{tasteProfile.stillnessIndex}/10</strong></span>
                  <span>•</span>
                  <span>Purity: <strong className="text-foreground font-semibold">{tasteProfile.architecturalPurity}/10</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Journey History & Provenance Trail */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                Journeys & Provenance Trail
              </h2>
              <p className="font-sans text-xs text-muted-foreground mt-0.5">
                Archived itineraries and post-trip digital keepsakes.
              </p>
            </div>

            <div className="space-y-3">
              {/* Active Journey */}
              <div className="p-5 rounded-xl border border-primary/40 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-chart-1 text-background px-2 py-0.5 font-mono text-[10px] font-semibold uppercase">
                      Active
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      OCTOBER 14 – 18, 2026
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground font-medium">
                    {currentTrip.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    Kyoto • Naoshima • Ago Bay ({currentTrip.days.length} Days)
                  </p>
                </div>

                <Link href="/designer">
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-sans px-5 cursor-pointer"
                  >
                    Open Designer
                    <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Completed Journey */}
              <div className="p-5 rounded-xl border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 font-mono text-[10px] font-semibold uppercase border border-border">
                      Completed
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      APRIL 02 – 08, 2025
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground font-medium">
                    Spring Sakura & Naoshima Architecture
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground">
                    Seto Inland Sea & Mount Koya (7 Days)
                  </p>
                </div>

                <Link href={`/provenance/${currentTrip.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-border text-foreground hover:bg-muted text-xs font-mono px-5 cursor-pointer"
                  >
                    View Provenance Keepsake
                    <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* System & Studio Controls */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                Interface Preferences & Motion
              </h2>
              <p className="font-sans text-xs text-muted-foreground mt-0.5">
                Calibrate ambient light and interface responsiveness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Theme Selector */}
              <div className="p-4 rounded-xl border border-border bg-background space-y-3">
                <div className="flex items-center gap-2 text-foreground font-sans text-sm font-medium">
                  <Moon className="h-4 w-4 text-primary" />
                  <span>Color Mode</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["dark", "light", "system"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setThemeMode(mode)}
                      className={`py-2 rounded-lg font-mono text-xs capitalize transition-all cursor-pointer ${
                        themeMode === mode
                          ? "bg-primary text-primary-foreground font-medium"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reduced Motion Switch */}
              <div className="p-4 rounded-xl border border-border bg-background space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground font-sans text-sm font-medium">
                    <Activity className="h-4 w-4 text-primary" />
                    <span>Reduced Motion Override</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMotionOverride(!motionOverride)}
                    className={`h-6 w-11 rounded-full p-1 transition-colors cursor-pointer ${
                      motionOverride ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-background shadow-xs transition-transform ${
                        motionOverride ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Disables signature scroll-linked hero parallax and replaces transitions with calm opacity crossfades.
                </p>
              </div>
            </div>

            {/* Client Presentation Reset Button */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-sans text-sm font-medium text-foreground">
                  Demo Controls
                </h4>
                <p className="font-sans text-xs text-muted-foreground">
                  Restore all itinerary cards, alternatives, and check-in records to clean curated defaults.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {resetNotice && (
                  <span className="flex items-center gap-1 font-mono text-xs text-primary animate-fade-in">
                    <Check className="h-3.5 w-3.5" />
                    Restored
                  </span>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="rounded-full border-border text-muted-foreground hover:text-foreground hover:bg-muted font-mono text-xs px-4 cursor-pointer"
                >
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Reset Store to Defaults
                </Button>
              </div>
            </div>

            {/* Member Session & Security Controls */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-sans text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                  <span>Member Session ({currentUser?.name || "Jonathan Sterling"})</span>
                </h4>
                <p className="font-sans text-xs text-muted-foreground">
                  Lock this session to test the unauthenticated member gate.
                </p>
              </div>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={logout}
                className="rounded-full text-xs font-mono px-4 cursor-pointer gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Lock Studio / Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </AuthGate>
  );
}
