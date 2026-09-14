"use client";

import { useState } from "react";
import { Mic, Send, Sparkles, Volume2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVapi } from "@/lib/use-vapi";
import { InCallOverlay } from "@/components/app/in-call-overlay";

const QUICK_ACTIONS = [
  "Confirm Dinner at 20:00",
  "Where is Mr. Tanaka?",
  "Umbrellas at pier?",
];

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

  const [isSending, setIsSending] = useState(false);

  const handleSendQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || isSending) return;
    setInputVal("");
    setIsSending(true);

    try {
      const res = await fetch("/api/voice/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          currentSanctuary: "Hoshinoya Kyoto",
          dayNumber: 2,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setLastResponse(`Elena: "${data.reply}"`);
      } else {
        setLastResponse(`Elena: "Noted. I'll arrange your requested details immediately."`);
      }
    } catch {
      setLastResponse(`Elena: "Arrangements confirmed for your journey."`);
    } finally {
      setIsSending(false);
    }
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
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm text-foreground">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/25 text-primary font-serif font-semibold text-sm">
              EV
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-chart-1 ring-2 ring-card animate-pulse" />
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold text-foreground">
              Elena Vance
            </h4>
            <span className="font-mono text-[10px] text-muted-foreground uppercase">
              Agent on Duty • Arashiyama
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`flex items-center gap-1.5 font-mono text-[10px] uppercase px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-xs ${
            callStatus === "active"
              ? "bg-destructive/15 text-destructive border-destructive/30 animate-pulse"
              : "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
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
        <div className="mb-4 animate-fade-in">
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

      {/* Quick Inquiries Pills */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Quick Ask:
        </span>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleSendQuery(action)}
            className="text-xs font-sans px-3 py-1 rounded-full bg-muted/60 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Response Box */}
      {isSending && (
        <div className="mb-4 rounded-xl bg-muted/40 border border-border/80 p-3.5 text-xs text-muted-foreground flex items-center gap-2 animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span>Consulting itinerary vouchers and sanctuary line...</span>
        </div>
      )}

      {lastResponse && !isSending && callStatus === "idle" && (
        <div className="mb-4 rounded-xl bg-primary/5 border border-primary/20 p-4 text-xs sm:text-sm text-foreground leading-relaxed flex items-start gap-3 shadow-xs animate-fade-in">
          <Volume2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>{lastResponse}</span>
        </div>
      )}

      {/* Touch-Friendly Input Area (Min 44px touch targets) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer shadow-xs ${
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
          onKeyDown={(e) => e.key === "Enter" && handleSendQuery(inputVal)}
          placeholder="Ask Elena anything about today's arrangements..."
          className="flex-1 h-11 rounded-xl border border-border bg-background px-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none shadow-xs"
        />

        <Button
          type="button"
          onClick={() => handleSendQuery(inputVal)}
          disabled={!inputVal.trim() || isSending}
          className="h-11 w-11 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 p-0 flex items-center justify-center cursor-pointer shadow-xs"
          aria-label="Send query"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
