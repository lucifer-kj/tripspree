"use client";

import { useState } from "react";
import { Mic, Send, User, Sparkles, Volume2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVapi } from "@/lib/use-vapi";
import { InCallOverlay } from "@/components/app/in-call-overlay";

export function TodayVoiceBar() {
  const [inputVal, setInputVal] = useState("");
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  const {
    callStatus,
    isMuted,
    isSpeaking,
    duration,
    activeTranscript,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
  } = useVapi();

  const handleSend = () => {
    if (!inputVal.trim()) return;
    setLastResponse(
      `Elena: "Noted. I'll arrange a quiet private corner table at the Dining Pavilion for 20:00 tonight."`
    );
    setInputVal("");
  };

  const handleVoiceToggle = () => {
    if (callStatus === "idle") {
      startCall({
        tripId: "kyoto-zen-4d",
        userId: "patron-001",
        currentSanctuary: "Hoshinoya Kyoto",
      });
    } else {
      endCall();
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary">
              <User className="h-4 w-4" />
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-chart-1 ring-2 ring-card" />
          </div>

          <div>
            <h4 className="font-sans text-sm font-medium text-foreground">
              Elena Vance
            </h4>
            <span className="font-mono text-[10px] text-muted-foreground uppercase">
              Curator on Duty • Arashiyama
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`flex items-center gap-1.5 font-mono text-[10px] uppercase px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
            callStatus === "active"
              ? "bg-destructive/15 text-destructive border-destructive/30"
              : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          }`}
          aria-label={callStatus === "active" ? "End call" : "Start voice consultation"}
        >
          {callStatus === "active" ? (
            <>
              <PhoneCall className="h-3 w-3" />
              <span>In Call</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3" />
              <span>Talk It Through</span>
            </>
          )}
        </button>
      </div>

      {/* Live Voice Consultation Overlay */}
      {callStatus !== "idle" && (
        <div className="mb-4">
          <InCallOverlay
            callStatus={callStatus}
            isMuted={isMuted}
            isSpeaking={isSpeaking}
            duration={duration}
            activeTranscript={activeTranscript}
            onEndCall={endCall}
            onToggleMute={toggleMute}
            curatorName="Elena Vance"
            sanctuary="Hoshinoya Kyoto (Day 02)"
          />
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-xs font-mono text-destructive">
          {errorMessage}
        </div>
      )}

      {lastResponse && callStatus === "idle" && (
        <div className="mb-4 rounded-xl bg-muted/60 border border-border/80 p-3.5 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
          <Volume2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>{lastResponse}</span>
        </div>
      )}

      {/* Touch-Friendly Input Area (Min 44px touch targets) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer ${
            callStatus === "active"
              ? "bg-destructive text-destructive-foreground border-destructive"
              : "bg-background text-foreground border-border hover:bg-muted hover:border-primary/50"
          }`}
          title={callStatus === "active" ? "End voice consultation" : "Start voice consultation"}
          aria-label={callStatus === "active" ? "End voice consultation" : "Start voice consultation"}
        >
          <Mic className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Elena anything about today's arrangements..."
          className="flex-1 h-11 rounded-xl border border-border bg-background px-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
        />

        <Button
          type="button"
          onClick={handleSend}
          disabled={!inputVal.trim()}
          className="h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 p-0 flex items-center justify-center"
          aria-label="Send message to curator"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}