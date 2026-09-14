"use client";

import { Mic, MicOff, PhoneOff, Radio, Volume2 } from "lucide-react";
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
  sanctuary = "Amanemu (Ise-Shima)",
}: InCallOverlayProps) {
  if (callStatus === "idle") return null;

  return (
    <div
      role="region"
      aria-label="Live Voice Consultation"
      className="rounded-xl border border-primary/30 bg-card p-4 shadow-md transition-all motion-safe:transition-transform"
    >
      <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20">
            <Radio className="h-4 w-4 motion-safe:animate-pulse motion-reduce:animate-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-semibold text-foreground">
                {curatorName}
              </span>
              <span className="rounded-full bg-chart-1/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-chart-1 border border-chart-1/25">
                Live Line
              </span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground">{sanctuary}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-medium tabular-nums text-foreground bg-muted/60 px-2.5 py-1 rounded-md border border-border">
            {formatDuration(duration)}
          </span>

          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={onEndCall}
            className="h-8 rounded-lg px-3 text-xs font-mono tracking-wider uppercase gap-1.5"
            aria-label="End consultation call"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">End</span>
          </Button>
        </div>
      </div>

      {/* Waveform / Speech Indicator */}
      <div className="flex items-center justify-between gap-3 bg-muted/40 rounded-lg p-3 border border-border/60">
        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <Volume2 className="h-4 w-4 text-primary shrink-0 motion-safe:animate-pulse motion-reduce:animate-none" />
          ) : (
            <Mic className="h-4 w-4 text-muted-foreground shrink-0" />
          )}

          <p className="font-sans text-xs text-foreground italic leading-snug line-clamp-2">
            {activeTranscript ||
              (isSpeaking
                ? "Quiet Concierge speaking..."
                : isMuted
                ? "Microphone is muted."
                : "Listening to your request...")}
          </p>
        </div>

        {/* Minimal Accessible Soundwave */}
        <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
          {[12, 20, 16, 24, 14, 18, 10].map((height, i) => (
            <div
              key={i}
              style={{ height: isSpeaking ? `${height}px` : "6px" }}
              className={`w-1 rounded-full transition-all duration-200 ${
                isSpeaking
                  ? "bg-primary motion-safe:animate-pulse motion-reduce:animate-none"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Control Actions */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <button
          type="button"
          onClick={onToggleMute}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-colors ${
            isMuted
              ? "bg-destructive/15 text-destructive border-destructive/30"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
          aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
        >
          {isMuted ? (
            <>
              <MicOff className="h-3 w-3" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Mic className="h-3 w-3" />
              <span>Mute</span>
            </>
          )}
        </button>

        <span className="text-[10px] text-muted-foreground">
          Press End when consultation concludes
        </span>
      </div>
    </div>
  );
}
