"use client";

import { useState } from "react";
import { Check, Moon, RefreshCw } from "lucide-react";
import { useTripSpreeStore } from "@/lib/store";

export function EveningCheckinCard() {
  const { checkIns, submitCheckIn } = useTripSpreeStore();
  const latestCheckIn = checkIns.find((c) => c.dayNumber === 2);
  const [selectedPacing, setSelectedPacing] = useState<string | null>(
    latestCheckIn ? latestCheckIn.mood : null
  );
  const [isCompleted, setIsCompleted] = useState(Boolean(latestCheckIn));

  const pacingOptions = [
    { id: "perfect", label: "Cadence was perfect", mood: "exceptional" as const },
    { id: "fast", label: "A bit rushed / more rest", mood: "fatigued" as const },
    { id: "quiet", label: "Too quiet / more access", mood: "needs-adjustment" as const },
  ];

  const handleSelect = (id: string) => {
    const opt = pacingOptions.find((p) => p.id === id);
    setSelectedPacing(id);
    setIsCompleted(true);
    submitCheckIn({
      dayNumber: 2,
      sanctuary: "Hoshinoya Kyoto",
      mood: opt?.mood || "peaceful",
      notes: opt?.label,
    });
  };

  const handleReset = () => {
    setSelectedPacing(null);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
          <Moon className="h-4 w-4" />
          <span>Evening Check-In</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          ONE TAP REFLECTION
        </span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-2">
        How was today&apos;s cadence?
      </h3>
      <p className="font-sans text-xs sm:text-sm text-muted-foreground mb-6 max-w-lg leading-relaxed">
        Your response instantly informs Elena&apos;s adjustments for tomorrow morning. No multi-field forms.
      </p>

      {isCompleted ? (
        <div className="flex items-center justify-between rounded-xl bg-chart-1/10 border border-chart-1/25 p-4 text-chart-1">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-1 text-background shadow-xs">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-foreground">
                Recorded: &ldquo;{pacingOptions.find((p) => p.id === selectedPacing)?.label}&rdquo;
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
                Elena Vance has staged a restorative cadence for your review below.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors p-2 min-h-[44px]"
            title="Change response"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Change</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pacingOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className="flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-xs sm:text-sm font-sans font-medium text-foreground transition-all duration-150 hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}