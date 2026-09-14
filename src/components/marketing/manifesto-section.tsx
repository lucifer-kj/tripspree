"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ShieldCheck, MapPin, Feather } from "lucide-react";

export function ManifestoSection() {
  const pillars = [
    {
      title: "The Curatorial Method",
      tag: "Verified",
      tagColor: "bg-chart-1/15 text-chart-1 border-chart-1/25",
      description:
        "Every itinerary is individually drafted by a dedicated private curator. No generic templates, no mass bookings.",
      icon: Feather,
    },
    {
      title: "Vetted Sanctuaries",
      tag: "Team-Vetted",
      tagColor: "bg-chart-2/15 text-chart-2 border-chart-2/25",
      description:
        "We inspect estates, private islands, and lodges in person before ever presenting them to our patrons.",
      icon: ShieldCheck,
    },
    {
      title: "Singular Access",
      tag: "Curated",
      tagColor: "bg-chart-3/15 text-chart-3 border-chart-3/25",
      description:
        "Private after-hours entry to cultural treasures, maritime charters, and quiet remote preserves.",
      icon: MapPin,
    },
  ];

  return (
    <section
      id="manifesto"
      className="relative z-10 bg-background text-foreground py-28 px-6 md:px-16 border-t border-border transition-colors duration-300"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
              02 / The Philosophy
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-6 font-normal leading-tight">
            An antidote to the relentless pace of standard travel.
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            TripSpree exists as a private travel service. We do not sell packages or aggregate discounts.
            We craft contemplative, singular voyages designed around how you wish to feel when you return.
          </p>
        </div>

        {/* 3 Pillars Grid using Shadcn Card Primitives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={idx}
                className="group border border-border bg-card p-6 rounded-xl transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border ${pillar.tagColor}`}
                  >
                    {pillar.tag}
                  </span>
                </CardHeader>
                <CardTitle className="font-serif text-xl font-medium text-foreground mb-2">
                  {pillar.title}
                </CardTitle>
                <CardDescription className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}