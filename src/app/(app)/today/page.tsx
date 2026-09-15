"use client";

import { useState, useEffect } from "react";
import { AppNav } from "@/components/app/app-nav";
import { ConfidenceChip } from "@/components/app/confidence-chip";
import { EveningCheckinCard } from "@/components/app/evening-checkin-card";
import { TodayVoiceBar } from "@/components/app/today-voice-bar";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { ItineraryDiffCard } from "@/components/app/itinerary-diff-card";
import { Button } from "@/components/ui/button";
import { useTripSpreeStore } from "@/lib/store";
import { AuthGate } from "@/components/app/auth-gate";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Wifi,
  Radio,
  Sparkles,
  AlertTriangle,
  PhoneCall,
  X,
} from "lucide-react";

export default function TodayViewPage() {
  const {
    currentTrip,
    isDriverStandingBy,
    toggleDriverStandingBy,
    setLiveSync,
    isCallActive,
    setCallActive,
    activeInvitation,
    setActiveInvitation,
    activeDiffs,
    dismissDiff,
    acceptPendingSuggestion,
    dismissPendingSuggestion,
  } = useTripSpreeStore();
  const [localTime, setLocalTime] = useState("16:42:00");
  const [isOnline, setIsOnline] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration] = useState(14);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Active day is Day 2 of current journey
  const activeDay = currentTrip.days.find((d) => d.dayNumber === 2) || currentTrip.days[0];

  // Live Tokyo Standard Time clock engine
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setLocalTime(formatted);
      } catch {
        // Fallback for environments without timezone support
        const d = new Date();
        setLocalTime(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Honest network online/offline listener (per UI/UX spec §4.5)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onOnline = () => {
      setIsOnline(true);
      setLiveSync(true);
    };
    const onOffline = () => {
      setIsOnline(false);
      setLiveSync(false);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [setLiveSync]);

  return (
    <AuthGate
      fallbackTitle="Today View Studio"
      fallbackDescription="Live sanctuary agenda, private chauffeur dispatch, and travel director briefings require member authentication."
    >
      <div className="min-h-screen bg-[#0c0717] text-white selection:bg-[#8247ff]/30 flex flex-col font-sans">
        {/* Global Top Navigation Bar */}
        <AppNav />

        {/* Main Today Screen Canvas */}
        <main className="flex-1 flex flex-col">
          {/* Top Status Bar with Honest Offline/Cache Indicator */}
          <header className="h-16 shrink-0 border-b border-white/10 bg-[#130c24]/90 backdrop-blur-md px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
              TODAY
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground">
              {activeDay.date}
            </span>
          </div>

          {/* Honest PWA Cache / Live Indicator (per UI/UX spec §4.5) */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-chart-1 animate-pulse" : "bg-warning-fill"
              }`}
            />
            <span className="text-foreground font-medium">
              {isOnline ? "Live Sync Active" : "Offline Mode"}
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span>{isOnline ? "Encrypted WebSocket" : "Cached Offline (Local Store)"}</span>
          </div>
        </header>

        {/* Calm, Utilitarian Content Container (Deliberately Sparse & Focused) */}
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 sm:px-6 py-8 md:py-12 space-y-8">
          {/* Active Itinerary Diffs per UX §2 */}
          {activeDiffs.map((diff) => (
            <ItineraryDiffCard key={diff.id} diff={diff} onDismiss={dismissDiff} />
          ))}

          {/* Contextual Voice Invitation Banner per UX §2 & §4 */}
          {activeInvitation && (
            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-mono text-[10px] uppercase tracking-widest font-semibold">
                  <Sparkles className="h-3 w-3" />
                  <span>Quiet Concierge Invitation</span>
                </div>
                <h4 className="font-serif text-lg text-foreground font-medium">
                  {activeInvitation.prompt}
                </h4>
                <p className="font-sans text-xs text-foreground/80 leading-relaxed max-w-xl">
                  {activeInvitation.context}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setCallActive(true)}
                  className="rounded-full bg-amber-300 hover:bg-amber-200 text-black font-mono text-xs tracking-wider uppercase h-8 px-4 cursor-pointer"
                >
                  <Radio className="h-3 w-3 mr-1.5 animate-pulse" />
                  Talk it through
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setActiveInvitation(null)}
                  className="rounded-full text-muted-foreground hover:text-foreground text-xs font-mono tracking-wider uppercase h-8 px-3 cursor-pointer"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}

          {/* Staged Suggestion Banner on Active Day per UX §4 */}
          {activeDay.pendingSuggestion && activeDay.pendingSuggestion.status === "pending" && (
            <div className="rounded-2xl border border-amber-400/40 bg-[#160f26] p-6 shadow-md space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Staged Adaptation (Pending Review)</span>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Requires Your Approval</span>
              </div>

              <blockquote className="font-serif italic text-sm text-foreground/90 leading-relaxed border-l-2 border-amber-400/40 pl-3">
                &ldquo;{activeDay.pendingSuggestion.rationale}&rdquo;
              </blockquote>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-xs font-sans space-y-1">
                <span className="font-mono text-[10px] uppercase text-muted-foreground block">Proposed Activity:</span>
                <p className="text-foreground font-semibold text-sm">{activeDay.pendingSuggestion.suggestedActivity.title}</p>
                <p className="text-muted-foreground">
                  {activeDay.pendingSuggestion.suggestedActivity.time} • {activeDay.pendingSuggestion.suggestedActivity.location}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => acceptPendingSuggestion(activeDay.id)}
                  className="rounded-full bg-amber-300 hover:bg-amber-200 text-black font-mono text-xs font-semibold tracking-wider uppercase h-8 px-4 cursor-pointer"
                >
                  Accept Suggestion
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => dismissPendingSuggestion(activeDay.id)}
                  className="rounded-full text-muted-foreground hover:text-foreground font-mono text-xs tracking-wider uppercase h-8 px-3 cursor-pointer"
                >
                  Keep Original
                </Button>
              </div>
            </div>
          )}

          {/* 1. Location & Atmospheric Status (One Primary View) */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-1.5 font-medium">
                  Current Sanctuary • Day 0{activeDay.dayNumber} of 0{currentTrip.days.length}
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl text-foreground font-medium tracking-tight">
                  {activeDay.sanctuaryName}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs sm:text-sm mt-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{activeDay.destination}</span>
                </div>
              </div>

              {/* Local Time & Atmosphere */}
              <div className="rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs sm:text-right shrink-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Local Time
                </div>
                <div className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight my-0.5">
                  {localTime} <span className="text-xs text-muted-foreground font-normal">JST</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  18°C • Quiet Autumn Drizzle
                </div>
              </div>
            </div>

            {/* Quick Sanctuary Amenities for Today */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-primary" />
                SANCTUARY WI-FI: HOSHINOYA_PRIVATE
              </span>
              <span className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-primary" />
                AGENT EXT: #01
              </span>
            </div>
          </div>

          {/* 2. "What's Next" Focal Card (Highest Information Priority) */}
          <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 md:p-8 shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
                <span className="font-mono text-xs tracking-widest uppercase text-primary font-semibold">
                  What&apos;s Next
                </span>
              </div>

              <ConfidenceChip tier={activeDay.afternoonActivity.confidenceTier || "Verified"} size="sm" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-foreground font-medium mb-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{activeDay.afternoonActivity.time}</span>
                </div>

                <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {activeDay.afternoonActivity.title}
                </h2>
              </div>
            </div>

            {/* Rationale & Operational Note */}
            <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 mb-6">
              <p className="font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mr-2">
                  Director&apos;s Note:
                </span>
                {activeDay.afternoonActivity.notes || activeDay.curatorNote}
              </p>
            </div>

            {/* Primary Action Button (Min 44x44px touch target) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                type="button"
                variant="default"
                onClick={toggleDriverStandingBy}
                className={`min-h-[48px] rounded-xl px-6 font-sans text-sm font-medium transition-all cursor-pointer ${
                  isDriverStandingBy
                    ? "bg-chart-1 text-background hover:bg-chart-1/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {isDriverStandingBy
                  ? "Driver Notified • Standing By"
                  : "Ready for Driver Transfer"}
              </Button>

              <div className="flex items-center justify-center text-xs font-mono text-muted-foreground px-3 min-h-[44px]">
                <span>Driver: {currentTrip.driverName || "Mr. Tanaka"} ({currentTrip.driverCar || "Black Alphard #408"})</span>
              </div>
            </div>
          </div>

          {/* 3. Later Tonight (Upcoming Schedule Preview) */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Later Tonight
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-border/60">
                <div className="font-mono text-xs text-primary font-medium w-14 shrink-0 pt-0.5">
                  {activeDay.eveningActivity.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-foreground">
                    {activeDay.eveningActivity.title}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {activeDay.eveningActivity.location} • {activeDay.eveningActivity.notes}
                  </p>
                </div>
                <ConfidenceChip tier={activeDay.eveningActivity.confidenceTier || "Verified"} size="sm" />
              </div>

              <div className="flex items-start gap-4">
                <div className="font-mono text-xs text-muted-foreground font-medium w-14 shrink-0 pt-0.5">
                  22:00
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-foreground">
                    Cedar Hinoki Tub Preparation
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    Infused with seasonal yuzu and forest salts
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  In-Sanctuary
                </span>
              </div>
            </div>
          </div>

          {/* 4. Anchored Voice / Chat Consultation Bar ("Talk it through") */}
          <TodayVoiceBar />

          {/* 5. Evening Check-In Card (Unmissable, Non-Blocking, One-Tap Reflection) */}
          <EveningCheckinCard />

          {/* Permanent Calm Emergency / Human Escalation Path (UX §4) */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-chart-1" />
              <span>Curator Elena Vance & Spriha team on standby</span>
            </div>

            <button
              type="button"
              onClick={() => setShowEmergencyModal(true)}
              className="flex items-center gap-1.5 text-stone-400 hover:text-foreground transition-colors cursor-pointer py-1.5 px-3 rounded-full border border-white/10 hover:border-white/20 bg-white/5"
            >
              <AlertTriangle className="h-3 w-3 text-chart-3" />
              <span>Something is wrong — request manager callback</span>
            </button>
          </div>
        </div>

        {/* Live In-Call Dimming Overlay (UX §2) */}
        <InCallOverlay
          callStatus={isCallActive ? "active" : "idle"}
          isMuted={isMuted}
          isSpeaking={true}
          duration={callDuration}
          activeTranscript="Elena Vance: 'Good evening. I have staged a lighter courtyard tea session for Day 3 so you can rest after today's travel.'"
          onEndCall={() => setCallActive(false)}
          onToggleMute={() => setIsMuted(!isMuted)}
          curatorName="Elena Vance"
          sanctuary={activeDay.sanctuaryName}
        />

        {/* Emergency / Human Manager Callback Modal */}
        {showEmergencyModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          >
            <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#140d22] p-6 shadow-2xl space-y-4 text-foreground">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-chart-3">
                  <PhoneCall className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                    Spriha & Senior Curator Escalation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-muted-foreground hover:text-white p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-serif text-base font-medium">
                  We are notifying Elena Vance&apos;s team directly.
                </p>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  For immediate logistics, medical assistance, or private driver dispatch, a human team member will contact your registered phone number within 15 minutes.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs font-mono space-y-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>Current Hotel:</span>
                  <span className="text-foreground">{activeDay.sanctuaryName}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Assigned Driver:</span>
                  <span className="text-foreground">{currentTrip.driverName || "Mr. Tanaka"}</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => {
                  setShowEmergencyModal(false);
                  alert("Emergency alert dispatched to Spriha's curation team. Stand by for callback.");
                }}
                className="w-full rounded-full bg-chart-1 hover:bg-chart-1/90 text-background font-mono text-xs tracking-wider uppercase h-10"
              >
                Confirm Human Callback
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  </AuthGate>
  );
}
