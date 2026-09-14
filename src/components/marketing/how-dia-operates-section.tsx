"use client";

import { motion } from "framer-motion";
import { Mic, Cpu, ShieldCheck, Compass, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HowDiaOperatesSectionProps {
  isReducedMotion: boolean;
}

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Natural Voice & Text Intake",
    tagline: "Conversational Telemetry",
    tagColor: "bg-primary/10 text-primary border-primary/20",
    icon: Mic,
    description:
      "Converse naturally with DIA through in-app voice or thoughtful text prompts. DIA listens for pacing, architectural taste, privacy requirements, and emotional stillness without clunky multi-step forms.",
  },
  {
    step: "02",
    title: "Autonomous AG-UI Synthesis",
    tagline: "Real-Time Generative Canvas",
    tagColor: "bg-chart-2/15 text-chart-2 border-chart-2/25",
    icon: Cpu,
    description:
      "In milliseconds, DIA weaves together verified heritage stays, private solar boat transfers, flight sectors, and live OpenWeather climate telemetry into a living, interactive day-by-day canvas.",
  },
  {
    step: "03",
    title: "Human Specialist Clearance",
    tagline: "100% Ground Verified",
    tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
    icon: ShieldCheck,
    description:
      "Every autonomous route is cross-checked by our resident destination directors in India and Europe, locking in after-hours museum access, private royal archives, and verified luxury chauffeurs.",
  },
  {
    step: "04",
    title: "Living On-Trip Companion",
    tagline: "24/7 Contextual Care",
    tagColor: "bg-primary/10 text-primary border-primary/20",
    icon: Compass,
    description:
      "During your journey, DIA stays active in your pocket. Need to swap an afternoon temple visit for a quiet courtyard tea or shift dinner due to rain? One voice prompt re-orchestrates everything in real-time.",
  },
];

export function HowDiaOperatesSection({ isReducedMotion }: HowDiaOperatesSectionProps) {
  return (
    <section
      id="how-dia-operates"
      className="relative z-10 bg-background text-foreground py-28 px-4 sm:px-6 lg:px-12 border-t border-border overflow-hidden"
      aria-label="How DIA Operates"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Architecture & Workflow
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground font-normal tracking-tight mb-5 leading-tight">
            How DIA orchestrates your awakening.
          </h2>

          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
            TripSpree blends cutting-edge autonomous intelligence with old-world concierge standards. Here is how DIA turns your spoken intent into an effortless private journey.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={isReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={isReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-2xl border border-border/80 bg-card p-6 flex flex-col justify-between shadow-xs hover:border-primary/50 transition-all duration-300 group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-bold text-foreground/40 group-hover:text-primary transition-colors">
                      {item.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/80 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Tagline Badge */}
                  <span
                    className={`inline-block font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border mb-3 ${item.tagColor}`}
                  >
                    {item.tagline}
                  </span>

                  <h3 className="font-serif text-xl font-normal text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Micro accent line */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>Phase {item.step}</span>
                  <span className="text-primary font-sans font-medium text-xs group-hover:translate-x-0.5 transition-transform">
                    Integrated →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 rounded-3xl border border-primary/25 bg-gradient-to-r from-card via-card to-primary/5 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-2">
              Ready to converse with DIA?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Experience our prototype on this page, or unlock your private Member Studio for live in-app voice consultations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a href="#dia-prototype">
              <Button
                variant="outline"
                className="rounded-xl border-border bg-background hover:bg-muted font-sans text-xs cursor-pointer"
              >
                Try Text Prototype
              </Button>
            </a>
            <Link href="/designer">
              <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-xs cursor-pointer shadow-md flex items-center gap-1.5">
                <span>Unlock Member Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
