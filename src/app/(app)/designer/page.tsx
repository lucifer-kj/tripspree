"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { ItineraryDayCard, ItineraryDay } from "@/components/app/itinerary-day-card";
import { SwapDrawer, SwapAlternative } from "@/components/app/swap-drawer";
import { ConciergePanel } from "@/components/app/concierge-panel";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Download,
  Clock,
  Compass,
} from "lucide-react";

const INITIAL_DAYS: ItineraryDay[] = [
  {
    id: "day-1",
    dayNumber: 1,
    date: "OCT 14, 2026",
    destination: "HOSHINOYA ARASHIYAMA • KYOTO",
    title: "Twilight Arrival & Private Bamboo Grove Stillness",
    whyThis:
      "Arriving at dusk by private wooden river skiff completely avoids daytime foot traffic and captures the ambient lanterns reflecting on the Oi River.",
    confidenceTier: "Verified",
    transitCode: "JL-008 / UK-714",
    curatorNote: "Wooden skiff arrival transfer included",
    schedule: [
      {
        time: "15:00",
        activity: "Private riverboat transfer up the Oi River gorge to Hoshinoya",
        location: "Arashiyama Pier",
        notes: "Luggage transferred directly via discreet vehicle ahead of arrival.",
      },
      {
        time: "17:30",
        activity: "Exclusive access to Sagano Bamboo Forest at twilight",
        location: "Sagano Sanctuary",
        notes: "Accompanied by resident soundscape archivist.",
      },
      {
        time: "20:00",
        activity: "Kaiseki welcome tasting prepared with seasonal matsutake and river trout",
        location: "Dining Pavilion",
      },
    ],
  },
  {
    id: "day-2",
    dayNumber: 2,
    date: "OCT 15, 2026",
    destination: "SAIHŌ-JI & KATSURA • KYOTO",
    title: "The Cadence of Moss: Private Saihō-ji Meditation",
    whyThis:
      "Morning entry granted under private temple patronage before general visitor gates open, allowing uninterrupted acoustic immersion in the moss garden.",
    confidenceTier: "Verified",
    transitCode: "PRV-CAR-02",
    curatorNote: "Sutra chanting access confirmed with Abbot",
    schedule: [
      {
        time: "07:30",
        activity: "Private kiku-cha (chrysanthemum tea) in the Abbot's private reception pavilion",
        location: "Saihō-ji Inner Court",
      },
      {
        time: "09:00",
        activity: "Guided contemplation through 120 varieties of historical moss",
        location: "Temple Sanctuaries",
        notes: "Shoe covers provided; photography allowed without flash.",
      },
      {
        time: "13:30",
        activity: "Private architectural study of Katsura Imperial Villa with a master carpenter",
        location: "Katsura Detached Palace",
      },
    ],
  },
  {
    id: "day-3",
    dayNumber: 3,
    date: "OCT 16, 2026",
    destination: "MOUNT OGURA • ARASHIYAMA",
    title: "Cedar Mountain Solitude & Tea Master Residency",
    whyThis:
      "A deliberately spacious unhurried afternoon to integrate the journey, hosted in a private tea pavilion inaccessible to commercial tours.",
    confidenceTier: "Team-Vetted",
    transitCode: "TRK-09",
    curatorNote: "Dedicated downtime for sketching and reading",
    schedule: [
      {
        time: "10:00",
        activity: "Private tea ceremony hosted by Master Sen in an 18th-century timber chashitsu",
        location: "Ogura Tea Hermitage",
      },
      {
        time: "14:00",
        activity: "Unhurried afternoon reading and terrace contemplation overlooking Mount Ogura",
        location: "Hoshinoya Library Pavilion",
        notes: "No scheduled transfers; complimentary matcha and seasonal wagashi.",
      },
      {
        time: "19:00",
        activity: "Charcoal-grilled duck and local heirloom vegetables over private hearth",
        location: "Fireside Terrace",
      },
    ],
  },
  {
    id: "day-4",
    dayNumber: 4,
    date: "OCT 17, 2026",
    destination: "SETO INLAND SEA TRANSIT",
    title: "Shinkansen First-Class Passage to Naoshima Art Island",
    whyThis:
      "Transitions at midday to coincide with optimal tides for the private Benesse House speedboat crossing.",
    confidenceTier: "Verified",
    transitCode: "SHK-NOZOMI-41",
    curatorNote: "Connecting to maritime villa",
    schedule: [
      {
        time: "11:15",
        activity: "Chauffeured transit to Kyoto Station with private VIP lounge escort",
        location: "Kyoto Central",
      },
      {
        time: "12:08",
        activity: "Gran Class bullet train passage along the Sanyo Line to Okayama",
        location: "Track 13",
      },
      {
        time: "14:30",
        activity: "Private charter launch to Naoshima Benesse House Oval",
        location: "Uno Port Pier 2",
      },
    ],
  },
];

const ALTERNATIVES_MAP: Record<string, SwapAlternative[]> = {
  "day-1": [
    {
      id: "alt-1a",
      title: "Private Evening Gion Teahouse Access & Koto Recital",
      whyThis: "Replaces mountain arrival with historic urban geisha district immersion at dusk.",
      confidenceTier: "Verified",
      paceNote: "Cultural immersion",
      previewTime: "16:30 - 21:00",
      location: "Gion Kobu, Kyoto",
    },
    {
      id: "alt-1b",
      title: "Nanzen-ji Aqueduct Twilight Stroll & Tofu Feast",
      whyThis: "Gentler physical walking rhythm along the Philosopher's Path.",
      confidenceTier: "Team-Vetted",
      paceNote: "Gentle stroll",
      previewTime: "17:00 - 20:30",
      location: "Higashiyama, Kyoto",
    },
  ],
  "day-2": [
    {
      id: "alt-2a",
      title: "Daitoku-ji Private Zen Sub-Temples & Rock Gardens",
      whyThis: "Focuses on stone and gravel dry landscape contemplation rather than moss gardens.",
      confidenceTier: "Verified",
      paceNote: "Meditative focus",
      previewTime: "08:30 - 14:00",
      location: "Kita Ward, Kyoto",
    },
    {
      id: "alt-2b",
      title: "Uji Ancient Green Tea Terraces & Private Roasting Pavilion",
      whyThis: "Travel south along the Uji River to hand-pick Gyokuro tea leaves with 6th-gen farmers.",
      confidenceTier: "Team-Vetted",
      paceNote: "Gastronomic focus",
      previewTime: "09:00 - 15:30",
      location: "Uji, Kyoto Prefecture",
    },
  ],
  "day-3": [
    {
      id: "alt-3a",
      title: "Traditional Wooden Washi Papermaking with Living National Treasure",
      whyThis: "Hands-on tactile craft engagement in the mountain village of Kurotani.",
      confidenceTier: "Team-Vetted",
      paceNote: "Artisan workshop",
      previewTime: "10:30 - 16:00",
      location: "Ayabe Valley",
    },
    {
      id: "alt-3b",
      title: "Private Bamboo Craft Studio & Forest Foraging with Botanist",
      whyThis: "Active outdoor exploration of seasonal wild mushrooms and bamboo shoot harvesting.",
      confidenceTier: "Unverified",
      paceNote: "Moderate terrain",
      previewTime: "09:30 - 14:30",
      location: "Arashiyama Foothills",
    },
  ],
  "day-4": [
    {
      id: "alt-4a",
      title: "Chartered Helicopter Flight Across Inland Sea Islands",
      whyThis: "Reduces transit time from 3.5 hours to 35 minutes with aerial panorama.",
      confidenceTier: "Verified",
      paceNote: "Direct transit",
      previewTime: "11:00 - 12:30",
      location: "Kyoto Heliport -> Naoshima",
    },
  ],
};

export default function TripDesignerPage() {
  const [days, setDays] = useState<ItineraryDay[]>(INITIAL_DAYS);
  const [swapTargetDay, setSwapTargetDay] = useState<ItineraryDay | null>(null);
  const [isSwapDrawerOpen, setIsSwapDrawerOpen] = useState(false);

  // Optimistic Move Up / Move Down reordering
  const handleMoveUp = (dayId: string) => {
    setDays((prev) => {
      const idx = prev.findIndex((d) => d.id === dayId);
      if (idx <= 0) return prev;
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[idx - 1];
      updated[idx - 1] = temp;
      // Re-index day numbers
      return updated.map((d, i) => ({ ...d, dayNumber: i + 1 }));
    });
  };

  const handleMoveDown = (dayId: string) => {
    setDays((prev) => {
      const idx = prev.findIndex((d) => d.id === dayId);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[idx + 1];
      updated[idx + 1] = temp;
      // Re-index day numbers
      return updated.map((d, i) => ({ ...d, dayNumber: i + 1 }));
    });
  };

  // Swap Interaction
  const handleOpenSwap = (day: ItineraryDay) => {
    setSwapTargetDay(day);
    setIsSwapDrawerOpen(true);
  };

  const handleApplySwap = (dayId: string, alt: SwapAlternative) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          title: alt.title,
          whyThis: alt.whyThis,
          confidenceTier: alt.confidenceTier,
          schedule: [
            {
              time: alt.previewTime.split(" - ")[0] || "10:00",
              activity: alt.title,
              location: alt.location,
              notes: "Swapped via Curator Alternative. Detailed transit vouchers updated.",
            },
            ...d.schedule.slice(1),
          ],
        };
      })
    );
    setIsSwapDrawerOpen(false);
    setSwapTargetDay(null);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/40 font-sans text-foreground">
      {/* Column 1: App Sidebar */}
      <AppSidebar activeTab="designer" />

      {/* Main Workspace Area (Floating Panel Structure from dashboard-structure-reference) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top App Bar */}
        <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              TRIP DESIGNER / ACTIVE DRAFT
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="font-mono text-xs text-foreground font-medium">
              KYOTO & SETO INLAND SEA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-mono border-border text-foreground hover:bg-muted"
            >
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
              Share Itinerary
            </Button>
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-sans px-4"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export .ics
            </Button>
          </div>
        </header>

        {/* Floating Working Canvas (2 Columns: Day Canvas + Concierge Panel) */}
        <div className="flex-1 flex overflow-hidden p-4 md:p-6 gap-6">
          {/* Middle Column: Day-by-Day Canvas */}
          <div className="flex-1 flex flex-col overflow-y-auto pr-1 space-y-6">
            {/* Boarding-Pass Master Header Card (dashboard-structure-reference) */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase mb-2">
                    <Compass className="h-4 w-4" />
                    <span>Private Curation #TS-8842</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-foreground">
                    YOUR TRIP PLAN
                  </h1>
                  <p className="font-sans text-sm text-muted-foreground mt-2 max-w-xl">
                    An unhurried contemplative voyage through historic Arashiyama, private moss sanctuaries, and the Seto Inland Sea archipelago.
                  </p>
                </div>

                {/* Transit Overview Card */}
                <div className="rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs space-y-1.5 shrink-0">
                  <div className="flex items-center justify-between gap-6 text-muted-foreground">
                    <span>SECTOR</span>
                    <span className="text-foreground font-semibold">LHR → KIX</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-muted-foreground">
                    <span>SANCTUARY</span>
                    <span className="text-foreground">Hoshinoya Kyoto</span>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-muted-foreground">
                    <span>CURATOR</span>
                    <span className="text-primary font-medium">Elena Vance</span>
                  </div>
                </div>
              </div>

              {/* Day Sequence Overview Subnav */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground uppercase">Itinerary Cadence:</span>
                  <span className="rounded-full bg-chart-1/15 text-chart-1 px-2.5 py-0.5 border border-chart-1/30">
                    4 Days Active
                  </span>
                  <span className="rounded-full bg-chart-2/15 text-chart-2 px-2.5 py-0.5 border border-chart-2/30">
                    All Venues Verified
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Optimistic reordering active</span>
                </div>
              </div>
            </div>

            {/* Itinerary Day Cards (Sequential Reusable Pattern) */}
            <div className="space-y-6">
              {days.map((day, idx) => (
                <ItineraryDayCard
                  key={day.id}
                  day={day}
                  isFirst={idx === 0}
                  isLast={idx === days.length - 1}
                  onSwapClick={handleOpenSwap}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                />
              ))}
            </div>

            {/* Bottom Add Day Action */}
            <div className="pt-4 pb-8 flex justify-center">
              <Button
                variant="outline"
                className="rounded-full border-dashed border-border hover:border-primary font-sans text-xs px-6 text-muted-foreground hover:text-foreground"
              >
                + Request Additional Sanctuary Day from Curator
              </Button>
            </div>
          </div>

          {/* Right Column: "Talk it through" Concierge Panel (concierge-panel-structure-reference) */}
          <div className="hidden lg:block w-96 shrink-0 h-full">
            <ConciergePanel />
          </div>
        </div>
      </main>

      {/* Slide-in Swap Drawer (150-200ms slide, not modal takeover) */}
      <SwapDrawer
        isOpen={isSwapDrawerOpen}
        activeDay={swapTargetDay}
        alternatives={
          swapTargetDay && ALTERNATIVES_MAP[swapTargetDay.id]
            ? ALTERNATIVES_MAP[swapTargetDay.id]
            : []
        }
        onSelectAlternative={handleApplySwap}
        onClose={() => {
          setIsSwapDrawerOpen(false);
          setSwapTargetDay(null);
        }}
      />
    </div>
  );
}