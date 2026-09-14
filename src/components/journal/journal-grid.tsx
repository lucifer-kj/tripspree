"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  category: string;
  curator: string;
  curatorRole: string;
  date: string;
  readTime: string;
  heightClass: string;
  offsetClass: string;
  gradient: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "kyoto-moss-gardens",
    title: "The Cadence of Moss: Rain in Saihō-ji",
    subtitle: "How seven centuries of undisturbed rain shaped Kyoto's most contemplative temple garden.",
    region: "Kyoto, Japan",
    category: "Cultural Sanctuaries",
    curator: "Kenji Sato",
    curatorRole: "East Asian Heritage Curator",
    date: "Autumn 2026",
    readTime: "7 min read",
    heightClass: "min-h-[440px]",
    offsetClass: "",
    gradient: "from-stone-900 via-neutral-900 to-stone-950",
  },
  {
    id: "amalfi-unseen",
    title: "Li Galli at Dawn: The Maritime Silence of the Sirens",
    subtitle: "Sailing the private waters between Capri and Positano before the world awakens.",
    region: "Campania, Italy",
    category: "Maritime Solitude",
    curator: "Matteo Rossi",
    curatorRole: "Mediterranean Maritime Fellow",
    date: "Late Summer 2026",
    readTime: "9 min read",
    heightClass: "min-h-[520px]",
    offsetClass: "md:translate-y-8",
    gradient: "from-slate-900 via-zinc-900 to-stone-900",
  },
  {
    id: "lofoten-polar-twilight",
    title: "The Architecture of Cold: Living in the Shadow of Reine",
    subtitle: "A week inside a restored rorbu where the Atlantic wind provides the only percussion.",
    region: "Nordland, Norway",
    category: "Mountain Preserves",
    curator: "Astrid Lindqvist",
    curatorRole: "Nordic Geography Lead",
    date: "September 2026",
    readTime: "6 min read",
    heightClass: "min-h-[460px]",
    offsetClass: "",
    gradient: "from-neutral-900 via-stone-800 to-neutral-950",
  },
  {
    id: "provence-terroir",
    title: "The Olive Presses of the Luberon: An Inheritance of Stone",
    subtitle: "Harvesting uncertified ancient groves with the fourth generation of the d'Arbaud lineage.",
    region: "Provence, France",
    category: "Historic Estates",
    curator: "Claire Dubois",
    curatorRole: "Gastronomic Historian",
    date: "August 2026",
    readTime: "8 min read",
    heightClass: "min-h-[480px]",
    offsetClass: "",
    gradient: "from-stone-900 via-stone-800 to-zinc-900",
  },
  {
    id: "atlas-star-preserves",
    title: "Dark Sky Cartography: Above the High Atlas Cloud Line",
    subtitle: "Bivouacking at 2,800 meters where the Milky Way casts discernible shadows on sandstone.",
    region: "Oukaïmeden, Morocco",
    category: "Mountain Preserves",
    curator: "Tariq Mansour",
    curatorRole: "Sahara & Maghreb Specialist",
    date: "July 2026",
    readTime: "11 min read",
    heightClass: "min-h-[420px]",
    offsetClass: "md:translate-y-8",
    gradient: "from-zinc-950 via-neutral-900 to-stone-900",
  },
  {
    id: "cyclades-off-season",
    title: "The Marble Quarries of Tinos: The Island After the Wind",
    subtitle: "When the summer Meltemi dies down, the Aegean light sharpens into pure geometric stillness.",
    region: "Cyclades, Greece",
    category: "Maritime Solitude",
    curator: "Elena Vance",
    curatorRole: "Founding Travel Director",
    date: "June 2026",
    readTime: "7 min read",
    heightClass: "min-h-[490px]",
    offsetClass: "",
    gradient: "from-slate-950 via-stone-900 to-neutral-900",
  },
];

interface JournalGridProps {
  isReducedMotion?: boolean;
}

export function JournalGrid({ isReducedMotion = false }: JournalGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Maritime Solitude",
    "Mountain Preserves",
    "Cultural Sanctuaries",
    "Historic Estates",
  ];

  const filteredEntries =
    activeCategory === "All"
      ? JOURNAL_ENTRIES
      : JOURNAL_ENTRIES.filter((e) => e.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-16 pb-6 border-b border-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asymmetric 3-Column Grid (Tengile Lodge Grid Reference) */}
      {/* Three columns, staggered heights and offsets, hover-card interaction pattern */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24">
        {filteredEntries.map((entry) => (
          <article
            key={entry.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 ${
              entry.heightClass
            } ${entry.offsetClass} ${
              isReducedMotion
                ? "hover:border-primary"
                : "hover:border-primary/60 hover:shadow-2xl"
            }`}
          >
            {/* Visual Frame & Gradient Ground */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${entry.gradient} transition-transform duration-700 ${
                isReducedMotion ? "" : "group-hover:scale-105"
              }`}
            />
            {/* Overlay gradient for reading clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

            {/* Top Bar on Hover Card: Category Chip + Circular Arrow Button */}
            <div className="relative z-10 p-6 flex justify-between items-start">
              <span className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15">
                {entry.category}
              </span>

              {/* Circular Action Button (from tengile hover pattern) */}
              <div
                className={`h-10 w-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${
                  isReducedMotion
                    ? "opacity-100"
                    : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 text-white">
              {/* Region and Time */}
              <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-2.5">
                <span className="text-white/80">{entry.region}</span>
                <span>•</span>
                <span>{entry.readTime}</span>
              </div>

              {/* Title in Serif */}
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-white mb-3 group-hover:text-primary-foreground/90 transition-colors">
                {entry.title}
              </h3>

              {/* Literary Excerpt */}
              <p className="font-sans text-xs sm:text-sm text-[#a0a0a0] line-clamp-3 leading-relaxed mb-4">
                {entry.subtitle}
              </p>

              {/* Curator Byline in IBM Plex Mono */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-white/50">
                <span>By {entry.curator}</span>
                <span>{entry.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}