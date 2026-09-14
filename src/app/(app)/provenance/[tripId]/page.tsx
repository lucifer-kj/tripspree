"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppNav } from "@/components/app/app-nav";
import { Button } from "@/components/ui/button";
import { useTripSpreeStore } from "@/lib/store";
import {
  Sparkles,
  Share2,
  Check,
  Lock,
  Globe,
  ArrowRight,
  Heart,
  Quote,
} from "lucide-react";

export default function ProvenanceTrailPage() {
  const { currentTrip, sanctuaries, checkIns } = useTripSpreeStore();
  const [isPublic, setIsPublic] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/provenance/${currentTrip.id}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0717] text-white selection:bg-[#8247ff]/30 flex flex-col font-sans">
      {/* Global Top Navigation Bar */}
      <AppNav />

      {/* Main Provenance Trail Canvas */}
      <main className="flex-1 flex flex-col">
        {/* Top App Bar */}
        <header className="h-16 shrink-0 border-b border-white/10 bg-[#130c24]/90 backdrop-blur-md px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              PROVENANCE TRAIL / ARCHIVED KEEPSAKE
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="font-mono text-xs text-foreground font-medium">
              #{currentTrip.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-full text-xs font-mono border-border text-foreground hover:bg-muted cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  Link Copied
                </>
              ) : (
                <>
                  <Share2 className="mr-1.5 h-3.5 w-3.5" />
                  Share Keepsake
                </>
              )}
            </Button>

            <Link href="/designer">
              <Button
                variant="default"
                size="sm"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-sans px-4 cursor-pointer"
              >
                Plan Next Journey
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 py-8 md:py-16 space-y-12">
          {/* Master Editorial Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Living Journey Archive</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-medium tracking-tight">
              {currentTrip.title}
            </h1>

            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              Designed for {currentTrip.patronName}. Four days of cedar pavilions, mineral onsens, and silent moss cloisters across Kansai and the Seto Inland Sea.
            </p>

            <div className="pt-2 flex items-center justify-center gap-6 font-mono text-xs text-muted-foreground">
              <span>{currentTrip.days.length} Days Completed</span>
              <span>•</span>
              <span>4 Sanctuaries Inhabited</span>
              <span>•</span>
              <span>October 2026</span>
            </div>
          </div>

          {/* Director's Personal Reflection Letter */}
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-xs relative">
            <Quote className="h-10 w-10 text-primary/20 absolute top-6 right-6" />

            <div className="max-w-2xl space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold block">
                Director&apos;s Post-Journey Letter
              </span>

              <p className="font-serif text-lg sm:text-xl text-foreground/90 italic leading-relaxed">
                &ldquo;Julian and Claire — watching your journey unfold from the dawn skiff on the Oi River to the private evening monorail at Benesse House was an absolute privilege. You brought a genuine stillness to every sanctuary you touched.&rdquo;
              </p>

              <div className="pt-4 border-t border-border flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center font-serif text-sm text-primary font-semibold">
                  EV
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-foreground">
                    Elena Vance
                  </h4>
                  <p className="font-mono text-xs text-muted-foreground">
                    Travel Director • Kansai & Seto Inland Sea
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photographic Sanctuary Keepsake Reel */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl text-foreground font-medium">
                Sanctuary Inhabitations
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                ARCHIVED JOURNEY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sanctuaries.map((sanctuary) => (
                <div
                  key={sanctuary.id}
                  className="group rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                    <Image
                      src={sanctuary.heroImage}
                      alt={sanctuary.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-xs">
                      <span>{sanctuary.realm.toUpperCase()}</span>
                      <span className="text-white/80">{sanctuary.roomType}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-xl text-foreground font-medium">
                      {sanctuary.name}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {sanctuary.curatorNotes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reflections & Check-In Log */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                  Traveler Reflections Log
                </h2>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Evening check-in records captured during active travel.
                </p>
              </div>
              <Heart className="h-5 w-5 text-primary" />
            </div>

            <div className="space-y-3">
              {checkIns.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                >
                  <div>
                    <span className="text-primary font-semibold uppercase mr-2">
                      DAY 0{rec.dayNumber} • {rec.sanctuary}
                    </span>
                    <p className="font-sans text-foreground text-sm mt-1">
                      &ldquo;{rec.notes || "Cadence was perfect"}&rdquo;
                    </p>
                  </div>
                  <span className="rounded-full bg-chart-1/15 text-chart-1 px-2.5 py-0.5 border border-chart-1/30 uppercase text-[10px] self-start sm:self-auto">
                    {rec.mood}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Public Sharing Controls */}
          <div className="rounded-2xl border border-border bg-background p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground shrink-0">
                {isPublic ? <Globe className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-foreground">
                  {isPublic ? "Keepsake is Publicly Viewable" : "Keepsake is Private to Traveler"}
                </h4>
                <p className="font-sans text-xs text-muted-foreground">
                  {isPublic
                    ? "Anyone with your secret link can view this private memory reel."
                    : "Only logged-in members of your party can access this page."}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPublic(!isPublic)}
              className="rounded-full border-border text-xs font-mono px-4 cursor-pointer self-start sm:self-auto"
            >
              {isPublic ? "Make Private" : "Enable Public Link"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
