"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ConfidenceChip } from "@/components/app/confidence-chip";
import { Button } from "@/components/ui/button";
import { useTripSpreeStore } from "@/lib/store";
import { AuthGate } from "@/components/app/auth-gate";
import {
  Download,
  AlertTriangle,
  CheckCircle2,
  Plane,
} from "lucide-react";

interface PackingItem {
  id: string;
  category: "etiquette" | "onsen" | "climate" | "documents";
  title: string;
  note: string;
  checked: boolean;
}

const INITIAL_PACKING_ITEMS: PackingItem[] = [
  {
    id: "pack-1",
    category: "etiquette",
    title: "Slip-on leather or suede footwear",
    note: "Temple halls and ryokan verandas require effortless shoe removal several times daily.",
    checked: true,
  },
  {
    id: "pack-2",
    category: "etiquette",
    title: "Natural fiber clothing (linen, merino)",
    note: "Quiet, non-synthetic fabrics preserve the acoustic stillness of Zen sanctuaries.",
    checked: true,
  },
  {
    id: "pack-3",
    category: "onsen",
    title: "In-sanctuary yukata & geta provided",
    note: "Amanemu and Sowaka provide bespoke linen yukata robes; no separate loungewear required.",
    checked: true,
  },
  {
    id: "pack-4",
    category: "climate",
    title: "Light waterproof shell or trench",
    note: "October brings gentle misty drizzle (kirisame) across the Oi River canyon.",
    checked: false,
  },
  {
    id: "pack-5",
    category: "documents",
    title: "Visit Japan Web Fast-Track QR code",
    note: "Pre-clears biometric immigration and customs at Kansai International Airport.",
    checked: true,
  },
  {
    id: "pack-6",
    category: "documents",
    title: "Passport valid through April 2027",
    note: "6-month validity verified against Japan Ministry of Foreign Affairs guidelines.",
    checked: true,
  },
];

export default function PreDeparturePage() {
  const { currentTrip } = useTripSpreeStore();
  const [packingList, setPackingList] = useState<PackingItem[]>(INITIAL_PACKING_ITEMS);
  const [activeSection, setActiveSection] = useState<"checklist" | "documents" | "weather" | "advisories">("checklist");

  const toggleCheck = (id: string) => {
    setPackingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleExportCalendar = () => {
    window.open(`/api/trips/${currentTrip.id}/export-ics`, "_blank");
  };

  const completedCount = packingList.filter((p) => p.checked).length;

  return (
    <AuthGate
      fallbackTitle="Pre-Departure Hub"
      fallbackDescription="Private packing directives, regional climate telemetry, and border clearance protocols are reserved for confirmed travelers."
    >
      <div className="flex h-screen w-full overflow-hidden bg-muted/30 font-sans text-foreground">
        {/* App Sidebar */}
        <AppSidebar activeTab="pre-departure" />

      {/* Main Living Hub */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur-xs px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              PRE-DEPARTURE HUB
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="font-mono text-xs text-foreground font-medium">
              DEPARTURE T-MINUS 30 DAYS
            </span>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleExportCalendar}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-sans px-4 cursor-pointer"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export Calendar (.ics)
          </Button>
        </header>

        {/* Content Container */}
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-6 py-8 md:py-12 space-y-8">
          {/* Master Journey Briefing Card */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase mb-2">
                  <Plane className="h-4 w-4" />
                  <span>Private Journey #{currentTrip.id.toUpperCase()}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl text-foreground font-medium tracking-tight">
                  Pre-Departure Guide
                </h1>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">
                  Living preparations for {currentTrip.patronName}. Planned by {currentTrip.curatorName}.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs space-y-1 shrink-0">
                <div className="text-muted-foreground">FLIGHT SECTOR</div>
                <div className="text-foreground font-semibold text-sm">LHR → KIX (Kansai)</div>
                <div className="text-muted-foreground text-[11px] pt-1">
                  Chauffeur: {currentTrip.driverName || "Mr. Tanaka"}
                </div>
              </div>
            </div>

            {/* Sticky Section Mini-Nav */}
            <div className="pt-4 flex flex-wrap gap-2">
              {[
                { id: "checklist", label: `Packing Checklist (${completedCount}/${packingList.length})` },
                { id: "documents", label: "Entry & Visas" },
                { id: "weather", label: "Regional Climate" },
                { id: "advisories", label: "Travel Advisories" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSection(tab.id as typeof activeSection)}
                  className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    activeSection === tab.id
                      ? "bg-primary text-primary-foreground font-medium shadow-xs"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Risk-Scoring Advisory Banner */}
          <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 md:p-6 text-foreground flex items-start gap-4 shadow-xs">
            <div className="h-9 w-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Regional Advisory • Autumn Foliage Transit Notice
                </span>
                <ConfidenceChip tier="Verified" size="sm" />
              </div>
              <p className="font-sans text-xs sm:text-sm text-foreground/90 leading-relaxed">
                Peak maple color in Arashiyama creates heavy foot traffic along Togetsukyo bridge. Your private wooden skiff arrives directly at Hoshinoya’s private river dock, bypassing all public bottlenecks.
              </p>
            </div>
          </div>

          {/* Section 2: Interactive Packing Checklist */}
          {(activeSection === "checklist" || activeSection === "advisories") && (
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                    Traveler Packing Checklist
                  </h2>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    Items calibrated for sanctuary etiquette and regional micrometeorology.
                  </p>
                </div>
                <span className="font-mono text-xs text-primary font-semibold">
                  {completedCount} of {packingList.length} Ready
                </span>
              </div>

              <div className="space-y-3">
                {packingList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      item.checked
                        ? "bg-muted/40 border-border opacity-70"
                        : "bg-background border-border hover:border-primary/50 shadow-xs"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        item.checked
                          ? "bg-chart-1 border-chart-1 text-background"
                          : "border-border bg-card"
                      }`}
                    >
                      {item.checked && <CheckCircle2 className="h-4 w-4 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-sans text-sm font-medium ${
                          item.checked ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.note}
                      </p>
                    </div>

                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Entry & Immigration Fast-Track */}
          {(activeSection === "documents" || activeSection === "advisories") && (
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-border pb-4">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                  Entry & Immigration Documentation
                </h2>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Pre-cleared protocols for international arrivals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-foreground uppercase">
                      Visit Japan Web Fast-Track
                    </span>
                    <span className="rounded-full bg-chart-1/15 text-chart-1 px-2 py-0.5 font-mono text-[10px] border border-chart-1/30">
                      VERIFIED
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Digital QR code registered with Ministry of Health & Customs. Show at KIX Terminal 1 priority arrival lane.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-foreground uppercase">
                      Private Chauffeur Escort
                    </span>
                    <span className="rounded-full bg-primary/15 text-primary px-2 py-0.5 font-mono text-[10px] border border-primary/30">
                      CONFIRMED
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Mr. Tanaka will hold a discreet &apos;TRIPSPREE&apos; call-sign at Kansai Executive Arrivals. Direct transit to Sowaka Kyoto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Regional Climate & Wardrobe Guide */}
          {(activeSection === "weather" || activeSection === "advisories") && (
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
              <div className="border-b border-border pb-4">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground font-medium">
                  Regional Climate Across Your Sanctuaries
                </h2>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  Average October temperatures and atmospheric conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <span className="text-muted-foreground uppercase text-[10px] block">KYOTO GORGE</span>
                  <div className="text-lg font-semibold text-foreground my-1">18°C / 11°C</div>
                  <p className="text-muted-foreground text-[11px] font-sans">
                    Crisp morning mist, occasional light autumn drizzle.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <span className="text-muted-foreground uppercase text-[10px] block">NAOSHIMA ISLAND</span>
                  <div className="text-lg font-semibold text-foreground my-1">21°C / 14°C</div>
                  <p className="text-muted-foreground text-[11px] font-sans">
                    Clear coastal breezes, mild evening temperature.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <span className="text-muted-foreground uppercase text-[10px] block">ISE-SHIMA BAY</span>
                  <div className="text-lg font-semibold text-foreground my-1">20°C / 13°C</div>
                  <p className="text-muted-foreground text-[11px] font-sans">
                    Thermal mineral spring climate, high humidity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  </AuthGate>
  );
}
