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
      role="dialog"
      aria-modal="true"
      aria-label="Live Voice Consultation with Quiet Concierge"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md transition-all duration-300 animate-fade-in"
    >
      <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-[#120a1f]/95 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-foreground space-y-6">
        {/* Top Ledger with Status Pulse */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
              <Radio className="h-4 w-4 animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-chart-1 animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-medium text-foreground">
                  {curatorName}
                </span>
                <span className="rounded-full bg-chart-1/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-chart-1 border border-chart-1/25 font-medium">
                  Quiet Concierge Line
                </span>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground">{sanctuary}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tabular-nums text-foreground bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              {formatDuration(duration)}
            </span>

            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={onEndCall}
              className="h-8 rounded-full px-3.5 text-xs font-mono tracking-wider uppercase gap-1.5 shadow-xs cursor-pointer"
              aria-label="End consultation call"
            >
              <PhoneOff className="h-3.5 w-3.5" />
              <span>End Call</span>
            </Button>
          </div>
        </div>

        {/* Spoken Speech Display */}
        <div className="bg-black/30 rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isSpeaking ? (
                <Volume2 className="h-4 w-4 text-amber-300 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4 text-stone-400" />
              )}
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                {isSpeaking ? "Concierge Speaking" : isMuted ? "Microphone Muted" : "Listening..."}
              </span>
            </div>

            {/* Dynamic 9-Bar Equalizer */}
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
                      ? "bg-amber-300 animate-pulse"
                      : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="font-serif text-sm sm:text-base text-foreground/90 italic leading-relaxed min-h-12">
            {activeTranscript ||
              (isSpeaking
                ? "Elena Vance is speaking with you..."
                : isMuted
                ? "Microphone is muted. Click below to unmute."
                : "Speak unhurriedly — how can I adjust your day or answer questions?")}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1 text-xs font-mono text-muted-foreground">
          <button
            type="button"
            onClick={onToggleMute}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              isMuted
                ? "bg-destructive/15 text-destructive border-destructive/30 shadow-xs"
                : "bg-white/5 text-foreground border-white/10 hover:bg-white/10"
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
                <Mic className="h-3.5 w-3.5 text-amber-300" />
                <span>Mute Mic</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Outcomes rendered as Itinerary Diffs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
