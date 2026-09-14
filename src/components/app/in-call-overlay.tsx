"use client";

import { Mic, MicOff, PhoneOff, Radio, Volume2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InCallOverlayProps {
  callStatus: "idle" | "connecting" | "active" | "ended" | "error";
  isMuted: boolean;
  isSpeaking: boolean;
  duration: number;
  activeTranscript: string;
  onEndCall: () => void;
  onToggleMute: () => void;
  curatorName?: string;
  sanctuary?: string;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function InCallOverlay({
  callStatus,
  isMuted,
  isSpeaking,
  duration,
  activeTranscript,
  onEndCall,
  onToggleMute,
  curatorName = "Elena Vance",
  sanctuary = "Hoshinoya Kyoto & Amanemu",
}: InCallOverlayProps) {
  if (callStatus === "idle") return null;

  return (
    <div
      role="region"
      aria-label="Live Voice Consultation"
      className="rounded-2xl border-2 border-primary/40 bg-card/95 backdrop-blur-xl p-5 shadow-xl transition-all duration-300 animate-fade-in text-foreground"
    >
      {/* Header with Live Status Pulse */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3.5 mb-3.5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/30">
            <Radio className="h-4 w-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-chart-1 animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs sm:text-sm font-semibold text-foreground">
                {curatorName}
              </span>
              <span className="rounded-full bg-chart-1/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-chart-1 border border-chart-1/25 font-medium">
                Encrypted Audio Line
              </span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground">{sanctuary}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tabular-nums text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
            {formatDuration(duration)}
          </span>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={onEndCall}
            className="h-8 rounded-lg px-3 text-xs font-mono tracking-wider uppercase gap-1.5 shadow-xs cursor-pointer"
            aria-label="End consultation call"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            <span>End Call</span>
          </Button>
        </div>
      </div>

      {/* Live Audio Reactive Waveform & Speech Streaming */}
      <div className="flex items-center justify-between gap-3 bg-muted/40 rounded-xl p-4 border border-border/70">
        <div className="flex items-start gap-2.5 min-w-0">
          {isSpeaking ? (
            <Volume2 className="h-4 w-4 text-primary shrink-0 animate-pulse mt-0.5" />
          ) : (
            <Mic className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          )}

          <div className="min-w-0">
            <span className="font-mono text-[9px] uppercase tracking-wider text-primary block font-semibold mb-0.5">
              {isSpeaking ? "Agent Speaking" : isMuted ? "Muted" : "Live Listening"}
            </span>
            <p className="font-sans text-xs text-foreground italic leading-relaxed line-clamp-2">
              {activeTranscript ||
                (isSpeaking
                  ? "Elena Vance is speaking with you..."
                  : isMuted
                  ? "Microphone is muted. Click unmute to speak."
                  : "Speak naturally — I am ready to adjust your itinerary...")}
            </p>
          </div>
        </div>

        {/* Dynamic 9-Bar Audio Equalizer */}
        <div className="flex items-center gap-1 shrink-0 px-2" aria-hidden="true">
          {[8, 16, 24, 14, 28, 18, 26, 12, 20].map((height, i) => (
            <div
              key={i}
              style={{
                height: isSpeaking ? `${height}px` : "5px",
                transition: "height 180ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`w-1 rounded-full ${
                isSpeaking
                  ? "bg-primary animate-pulse"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Interactive Controls & Disclaimer */}
      <div className="mt-3.5 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <button
          type="button"
          onClick={onToggleMute}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all cursor-pointer ${
            isMuted
              ? "bg-destructive/15 text-destructive border-destructive/30 shadow-xs"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
          aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
        >
          {isMuted ? (
            <>
              <MicOff className="h-3.5 w-3.5" />
              <span>Unmute Mic</span>
            </>
          ) : (
            <>
              <Mic className="h-3.5 w-3.5 text-primary" />
              <span>Mute Mic</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Real-time voice-to-canvas sync enabled</span>
        </div>
      </div>
    </div>
  );
}
