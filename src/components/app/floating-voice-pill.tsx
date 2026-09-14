"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useVapi } from "@/lib/use-vapi";
import { useTripSpreeStore } from "@/lib/store";
import { Phone, PhoneOff, Mic, MicOff, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import { InCallOverlay } from "@/components/app/in-call-overlay";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function FloatingVoicePill() {
  const pathname = usePathname();
  const { isAuthenticated, currentUser, login } = useTripSpreeStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    callStatus,
    isMuted,
    isSpeaking,
    duration,
    activeTranscript,
    startCall,
    endCall,
    toggleMute,
  } = useVapi();

  // Gated voice: Never show floating component on public marketing routes or when unauthenticated
  const isMarketingRoute = pathname === "/" || pathname?.startsWith("/journal") || pathname?.startsWith("/taste-quiz");
  if (isMarketingRoute || !isAuthenticated) {
    return null;
  }

  const handleToggleCall = () => {
    // If not signed in, prompt signing in as patron
    if (!isAuthenticated) {
      login();
    }

    if (callStatus === "idle" || callStatus === "ended") {
      startCall({
        tripId: "kyoto-zen-4d",
        userId: currentUser?.id || "patron-001",
        currentSanctuary: "Hoshinoya Kyoto",
      });
      setIsExpanded(true);
    } else {
      endCall();
      setIsExpanded(false);
    }
  };

  const isCallActive = callStatus === "active" || callStatus === "connecting";

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 select-none"
      style={{ maxWidth: "calc(100vw - 3rem)" }}
    >
      {/* Expanded Live Call Overlay when active and opened */}
      {isCallActive && isExpanded && (
        <div className="w-80 sm:w-96 shadow-2xl mb-1">
          <InCallOverlay
            callStatus={callStatus}
            isMuted={isMuted}
            isSpeaking={isSpeaking}
            duration={duration}
            activeTranscript={activeTranscript}
            onEndCall={endCall}
            onToggleMute={toggleMute}
            curatorName="Elena Vance"
            sanctuary="Hoshinoya Kyoto & Amanemu"
          />
        </div>
      )}

      {/* Persistent Bottom-Left Pill Bar */}
      <div
        className={`group flex items-center gap-2.5 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-xl ${
          isCallActive
            ? "border-primary/50 bg-card/95 text-foreground px-4 py-2.5 ring-2 ring-primary/20"
            : "border-border/80 bg-card/90 hover:bg-card text-foreground px-3.5 py-2 hover:border-primary/40 hover:shadow-2xl"
        }`}
      >
        {/* Main interactive voice button */}
        <button
          type="button"
          onClick={handleToggleCall}
          className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-hidden"
          aria-label={
            isCallActive
              ? "End voice consultation with Elena Vance"
              : "Start voice consultation with Elena Vance"
          }
        >
          {/* Avatar / Status Icon */}
          <div className="relative flex items-center justify-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-serif text-xs font-semibold transition-colors ${
                isCallActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-primary/15 text-primary border border-primary/25 group-hover:bg-primary group-hover:text-primary-foreground"
              }`}
            >
              {isCallActive ? <Phone className="h-4 w-4 animate-bounce" /> : "EV"}
            </div>

            {/* Pulsing indicator */}
            <span
              className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card ${
                isCallActive
                  ? "bg-chart-1 animate-ping"
                  : "bg-chart-1"
              }`}
            />
          </div>

          {/* Label and Info */}
          <div className="flex flex-col pr-1">
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-xs font-semibold text-foreground tracking-tight">
                {isCallActive ? "Elena Vance (Live)" : "Talk with Agent"}
              </span>

              {isCallActive && (
                <span className="font-mono text-[10px] tabular-nums font-semibold text-chart-1 bg-chart-1/10 px-1.5 py-0.2 rounded border border-chart-1/20">
                  {formatDuration(duration)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
              {isCallActive ? (
                /* Dynamic Waveform Simulation */
                <div className="flex items-center gap-0.5 h-2.5 py-0.5">
                  <span className="h-full w-0.5 rounded-full bg-chart-1 animate-pulse" />
                  <span className="h-2 w-0.5 rounded-full bg-chart-1 animate-pulse delay-75" />
                  <span className="h-3 w-0.5 rounded-full bg-chart-1 animate-pulse delay-150" />
                  <span className="h-1.5 w-0.5 rounded-full bg-chart-1 animate-pulse delay-100" />
                  <span className="h-2.5 w-0.5 rounded-full bg-chart-1 animate-pulse delay-200" />
                  <span className="font-sans text-[10px] ml-1 text-chart-1 font-medium">Connected</span>
                </div>
              ) : (
                <span className="flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5 text-primary" />
                  <span>Elena &bull; Travel Agent</span>
                </span>
              )}
            </div>
          </div>
        </button>

        {/* Secondary controls when call is active */}
        {isCallActive && (
          <div className="flex items-center gap-1 border-l border-border/80 pl-2">
            <button
              type="button"
              onClick={toggleMute}
              className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                isMuted
                  ? "bg-destructive/15 text-destructive border-destructive/30"
                  : "bg-muted text-muted-foreground hover:text-foreground border-border"
              }`}
              title={isMuted ? "Unmute microphone" : "Mute microphone"}
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
            >
              {isMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer"
              title={isExpanded ? "Collapse overlay" : "Expand consultation overlay"}
              aria-label={isExpanded ? "Collapse overlay" : "Expand consultation overlay"}
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronUp className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={endCall}
              className="p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs transition-colors cursor-pointer ml-0.5"
              title="End consultation call"
              aria-label="End consultation call"
            >
              <PhoneOff className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
