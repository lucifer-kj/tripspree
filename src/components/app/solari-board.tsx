"use client";

interface SolariBoardProps {
  time?: string;
  line1?: string;
  line2?: string;
  badge?: string;
  className?: string;
}

export function SolariBoard({
  time = "16:30",
  line1 = "PRIVATE",
  line2 = "ON-SEN",
  badge = "DEPARTURE BOARD",
  className = "",
}: SolariBoardProps) {
  const timeChars = time.split("");
  const line1Chars = line1.padEnd(8, " ").slice(0, 8).split("");
  const line2Chars = line2.padEnd(8, " ").slice(0, 8).split("");

  return (
    <div
      className={`rounded-3xl border border-[#1e293b] bg-[#0f172a] p-5 sm:p-6 shadow-xl flex flex-col justify-between select-none ${className}`}
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase mb-3">
        <span>{badge}</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE
        </span>
      </div>

      {/* Mechanical Flap Matrix */}
      <div className="rounded-2xl border border-white/10 bg-[#070b14] p-4 flex flex-col items-center justify-center gap-2 shadow-inner font-mono">
        {/* Time Flaps */}
        <div className="flex items-center gap-1 text-[#f59e0b] text-2xl sm:text-3xl font-extrabold tracking-wider">
          {timeChars.map((ch, idx) => (
            <span
              key={idx}
              className={`relative flex items-center justify-center bg-[#131b2e] border border-white/15 rounded px-2 py-1 shadow-md overflow-hidden ${
                ch === ":" ? "bg-transparent border-transparent px-0.5 text-white/40" : ""
              }`}
            >
              {/* Split Flap Horizontal Divider Line */}
              {ch !== ":" && (
                <span className="absolute inset-x-0 top-1/2 h-[1px] bg-black/70 pointer-events-none -translate-y-1/2" />
              )}
              <span className="relative z-10">{ch}</span>
            </span>
          ))}
        </div>

        {/* Text Line 1 */}
        <div className="flex items-center gap-0.5 text-white/90 text-[11px] sm:text-xs font-bold tracking-widest uppercase mt-1">
          {line1Chars.map((ch, idx) => (
            <span
              key={idx}
              className="relative flex h-5 w-4.5 items-center justify-center bg-[#131b2e] border border-white/10 rounded-xs shadow-xs"
            >
              <span className="absolute inset-x-0 top-1/2 h-[0.5px] bg-black/60 pointer-events-none" />
              <span className="relative z-10">{ch === " " ? "\u00A0" : ch}</span>
            </span>
          ))}
        </div>

        {/* Text Line 2 */}
        <div className="flex items-center gap-0.5 text-[#38bdf8] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
          {line2Chars.map((ch, idx) => (
            <span
              key={idx}
              className="relative flex h-5 w-4.5 items-center justify-center bg-[#131b2e] border border-white/10 rounded-xs shadow-xs"
            >
              <span className="absolute inset-x-0 top-1/2 h-[0.5px] bg-black/60 pointer-events-none" />
              <span className="relative z-10">{ch === " " ? "\u00A0" : ch}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer Subtext */}
      <div className="mt-3 text-[10px] font-mono text-[#94a3b8] flex items-center justify-between">
        <span>GATE ACCREDITATION</span>
        <span className="text-white font-semibold">SOVEREIGN ATELIER</span>
      </div>
    </div>
  );
}
