"use client";

import { CheckCircle2, ShieldCheck, AlertCircle, HelpCircle } from "lucide-react";

export type ConfidenceTier = "Verified" | "Team-Vetted" | "Unverified" | "General";

interface ConfidenceChipProps {
  tier: ConfidenceTier;
  className?: string;
  size?: "sm" | "default";
}

export function ConfidenceChip({ tier, className = "", size = "default" }: ConfidenceChipProps) {
  const configs = {
    Verified: {
      label: "Verified",
      icon: CheckCircle2,
      style: "bg-chart-1/15 text-chart-1 border-chart-1/30",
    },
    "Team-Vetted": {
      label: "Team-Vetted",
      icon: ShieldCheck,
      style: "bg-chart-2/15 text-chart-2 border-chart-2/30",
    },
    Unverified: {
      label: "Unverified",
      icon: AlertCircle,
      style: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    },
    General: {
      label: "General",
      icon: HelpCircle,
      style: "bg-muted text-muted-foreground border-border",
    },
  };

  const config = configs[tier] || configs.General;
  const Icon = config.icon;
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono tracking-wider uppercase font-medium select-none ${sizeClasses} ${config.style} ${className}`}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span>{config.label}</span>
    </span>
  );
}