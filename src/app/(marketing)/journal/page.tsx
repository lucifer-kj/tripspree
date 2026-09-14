"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTripSpreeStore } from "@/lib/store";
import { useReducedMotionState } from "@/lib/use-reduced-motion";
import { Navbar } from "@/components/marketing/navbar";
import { AppNav } from "@/components/app/app-nav";
import { Footer } from "@/components/marketing/footer";
import { JOURNAL_DISPATCHES, JournalDispatch } from "@/lib/journal-data";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Sparkles,
  Feather,
  ArrowUpRight,
  Compass,
  Search,
  Bookmark,
  BookmarkCheck,
  Clock,
  Headphones,
  X,
  Radio,
  Share2,
  Check,
} from "lucide-react";

// Curated high-resolution photography mapping for editorial dispatches
const DISPATCH_IMAGES: Record<string, { url: string; alt: string }> = {
  "kyoto-moss-gardens": {
    url: UNSPLASH_ASSETS.sowakaKyoto.url,
    alt: "Sowaka Kyoto tranquil moss courtyard and cedar architecture",
  },
  "amalfi-unseen": {
    url: UNSPLASH_ASSETS.amalfiVeranda.url,
    alt: "Amalfi private cliffside veranda overlooking azure waters",
  },
  "lofoten-polar-twilight": {
    url: UNSPLASH_ASSETS.swissAlpsChalet.url,
    alt: "Alpine sanctuary with snow-capped mountain peaks",
  },
  "provence-terroir": {
    url: UNSPLASH_ASSETS.forestMist.url,
    alt: "Historic French bastide estate mist and ancient olive trees",
  },
  "atlas-star-preserves": {
    url: UNSPLASH_ASSETS.ladakhStargazing.url,
    alt: "High altitude starry night sky preserve",
  },
  "cyclades-off-season": {
    url: UNSPLASH_ASSETS.maldivesOverwater.url,
    alt: "Aegean maritime solitude crystal clear waters",
  },
};

export default function JournalPage() {
  const { isAuthenticated, currentUser, bookmarkedDispatches, toggleBookmark } = useTripSpreeStore();
  const { isReducedMotion } = useReducedMotionState();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState<JournalDispatch | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    "All",
    "Cultural Sanctuaries",
    "Maritime Solitude",
    "Mountain Preserves",
    "Historic Estates",
  ];

  const leadDispatch = JOURNAL_DISPATCHES[0];

  const filteredDispatches = useMemo(() => {
    return JOURNAL_DISPATCHES.filter((d) => {
      const matchesCategory = activeCategory === "All" || d.category === activeCategory;
      const matchesBookmark = !onlyBookmarks || bookmarkedDispatches.includes(d.id);
      const matchesSearch =
        !searchQuery.trim() ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.curator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBookmark && matchesSearch;
    });
  }, [activeCategory, onlyBookmarks, bookmarkedDispatches, searchQuery]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Keyboard shortcut: Escape to dismiss Reader Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedDispatch) {
        setSelectedDispatch(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDispatch]);

  return (
    <main className="min-h-screen bg-[#0c0717] text-white selection:bg-[#8247ff]/30 selection:text-white flex flex-col font-sans">
      {/* Dynamic Navigation: AppNav for signed-in members, Navbar for visitors */}
      {isAuthenticated && currentUser ? <AppNav /> : <Navbar />}

      {/* Editorial Header Section */}
      <header className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-12 border-b border-white/10 bg-gradient-to-b from-[#130c24]/80 to-[#0c0717]">
        <div className="max-w-7xl mx-auto">
          {/* Top Archival Tag & Member Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#8247ff]/10 border border-[#8247ff]/30 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#a855f7] uppercase">
              <BookOpen className="h-3.5 w-3.5 text-[#8247ff]" />
              <span>Travel Journal &bull; Volume I</span>
            </div>

            <div className="flex items-center gap-3">
              {bookmarkedDispatches.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOnlyBookmarks(!onlyBookmarks)}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                    onlyBookmarks
                      ? "bg-[#8247ff] text-white border-[#8247ff] shadow-lg shadow-[#8247ff]/20"
                      : "bg-white/5 border-white/15 text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <BookmarkCheck className="h-3.5 w-3.5 text-[#a855f7]" />
                  <span>Saved Dispatches ({bookmarkedDispatches.length})</span>
                </button>
              )}

              <Link href="/designer">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/70 border border-white/15 hover:bg-white/10 hover:text-white transition-colors">
                  <Compass className="h-3.5 w-3.5 text-[#8247ff]" />
                  <span>{isAuthenticated ? "Trip Studio" : "Sign In to Plan"}</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Monumental Headline */}
          <div className="max-w-4xl mb-6">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-white">
              Literary dispatches from the world&apos;s quietest edges.
            </h1>
          </div>

          {/* Editorial Deck */}
          <p className="max-w-2xl font-sans text-base sm:text-lg text-white/70 leading-relaxed mb-10">
            The Journal is not a catalog of generic itineraries. It is a contemplative archive of field observations,
            architectural studies, and philosophical reflections penned by our travel specialists in residence.
          </p>

          {/* Search Bar & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-white/10">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#8247ff] text-white font-medium shadow-md shadow-[#8247ff]/30 border border-[#8247ff]"
                      : "bg-[#130c24] text-white/60 border border-white/10 hover:text-white hover:bg-[#1a1130]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dispatches, curators, regions..."
                className="w-full rounded-full border border-white/15 bg-[#130c24] px-4 py-2 pl-10 font-sans text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#8247ff] focus:border-[#8247ff] transition-colors"
              />
              <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-white/40 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-white/50 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Lead Dispatch (Wide Cinematic Presentation) */}
      {activeCategory === "All" && !onlyBookmarks && !searchQuery && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-[#0c0717]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#8247ff]" />
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/60">
                  Lead Dispatch &bull; Curator Highlight
                </span>
              </div>

              <span className="font-mono text-xs text-white/40 hidden sm:inline-block">
                Autumn 2026 Archive
              </span>
            </div>

            <article
              onClick={() => setSelectedDispatch(leadDispatch)}
              className="group relative overflow-hidden rounded-[28px] border border-white/15 text-white p-6 sm:p-10 md:p-14 flex flex-col justify-between min-h-[460px] md:min-h-[520px] transition-all duration-300 hover:border-[#8247ff]/60 hover:shadow-2xl hover:shadow-[#8247ff]/10 cursor-pointer"
            >
              {/* Cover Image with subtle zoom */}
              <Image
                src={DISPATCH_IMAGES[leadDispatch.id]?.url || UNSPLASH_ASSETS.mountFujiSunrise.url}
                alt={leadDispatch.title}
                fill
                priority
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-700 ${
                  isReducedMotion ? "" : "group-hover:scale-105"
                }`}
              />
              {/* Gradient Scrim for deep readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0717] via-[#0c0717]/60 to-black/30 pointer-events-none" />

              {/* Top Meta Bar */}
              <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 mb-16">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {leadDispatch.category}
                  </span>
                  <span className="font-mono text-xs text-white/70">
                    {leadDispatch.region}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(leadDispatch.id);
                    }}
                    className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#8247ff]/30 hover:border-[#8247ff] transition-all cursor-pointer"
                    title={bookmarkedDispatches.includes(leadDispatch.id) ? "Remove bookmark" : "Bookmark"}
                  >
                    {bookmarkedDispatches.includes(leadDispatch.id) ? (
                      <BookmarkCheck className="h-4 w-4 text-[#a855f7]" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-white/80" />
                    )}
                  </button>

                  <div className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#8247ff] group-hover:border-[#8247ff] transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Bottom Editorial Content */}
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 font-mono text-xs text-white/60 mb-3">
                  <span className="text-[#a855f7] font-semibold">ESSAY &bull; LEAD CURATION</span>
                  <span>&bull;</span>
                  <span>By {leadDispatch.curator}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {leadDispatch.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white mb-4 group-hover:text-white transition-colors">
                  {leadDispatch.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed mb-6 max-w-2xl">
                  {leadDispatch.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-white/30 text-white bg-white/10 hover:bg-[#8247ff] hover:border-[#8247ff] font-mono text-xs tracking-wider uppercase gap-2 cursor-pointer transition-all"
                  >
                    <span>Read Complete Dispatch</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>

                  {leadDispatch.audioGuideAvailable && (
                    <div className="flex items-center gap-1.5 text-[#a855f7] font-mono text-xs uppercase tracking-wider bg-[#8247ff]/10 px-3 py-1.5 rounded-full border border-[#8247ff]/20">
                      <Headphones className="h-3.5 w-3.5" />
                      <span>Audio Narrative Available</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Asymmetric Luxury Card Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-[#0c0717]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Feather className="h-4 w-4 text-[#8247ff]" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/60">
                {activeCategory === "All" ? "All Curated Field Notes" : `${activeCategory} Notes`}
              </span>
            </div>

            <span className="font-mono text-xs text-white/40">
              Showing {filteredDispatches.length} {filteredDispatches.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {filteredDispatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {filteredDispatches.map((entry) => {
                const isSaved = bookmarkedDispatches.includes(entry.id);
                const asset = DISPATCH_IMAGES[entry.id] || {
                  url: UNSPLASH_ASSETS.mountFujiSunrise.url,
                  alt: entry.title,
                };

                return (
                  <article
                    key={entry.id}
                    onClick={() => setSelectedDispatch(entry)}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#130c24] transition-all duration-300 min-h-[460px] hover:border-[#8247ff]/50 hover:shadow-xl hover:shadow-[#8247ff]/10 cursor-pointer"
                  >
                    {/* Background Editorial Image */}
                    <div className="relative h-56 w-full overflow-hidden shrink-0 border-b border-white/10">
                      <Image
                        src={asset.url}
                        alt={asset.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`object-cover object-center transition-transform duration-700 ${
                          isReducedMotion ? "" : "group-hover:scale-105"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130c24] via-[#130c24]/30 to-black/20" />

                      {/* Floating Top Controls */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15">
                          {entry.category}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(entry.id);
                            }}
                            className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-[#8247ff] transition-colors"
                            title={isSaved ? "Remove bookmark" : "Bookmark"}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="h-3.5 w-3.5 text-[#a855f7]" />
                            ) : (
                              <Bookmark className="h-3.5 w-3.5" />
                            )}
                          </button>

                          <div className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-[#8247ff] group-hover:border-[#8247ff] transition-all duration-300">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Region & Read Time */}
                        <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-2.5">
                          <span className="text-[#a855f7]">{entry.region}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {entry.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-white mb-3 group-hover:text-[#a855f7] transition-colors line-clamp-2">
                          {entry.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-sans text-xs sm:text-sm text-white/60 line-clamp-3 leading-relaxed mb-4">
                          {entry.excerpt}
                        </p>
                      </div>

                      {/* Curator Byline in IBM Plex Mono */}
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-white/50">
                        <span className="text-white/70">By {entry.curator}</span>
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-white/15 rounded-[28px] bg-[#130c24]/50">
              <BookOpen className="h-10 w-10 text-white/40 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-white font-medium mb-2">
                No dispatches found
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 max-w-sm mx-auto mb-6">
                Try adjusting your category filter, clearing your search query, or unchecking saved dispatches.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                  setOnlyBookmarks(false);
                }}
                className="rounded-full text-xs font-mono uppercase tracking-wider border-white/20 text-white bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Dark-Ground Philosophy Rest Beat */}
      <section className="bg-[#080410] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#a855f7] block mb-6">
            Travel Philosophy
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-8 leading-tight">
            A journey persists in the reordering of the interior life.
          </h2>

          <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            We commission our destination scholars not to compile exhaustive tourist checklists, but to capture moments of awakening. When you return from a TripSpree journey, the world has not changed — but your stillness within it has.
          </p>

          <Link href="/designer">
            <Button
              className="rounded-full bg-[#8247ff] hover:bg-[#7035eb] text-white font-sans text-xs uppercase tracking-wider px-8 py-3.5 cursor-pointer shadow-lg shadow-[#8247ff]/25 transition-all"
            >
              <Compass className="mr-2 h-4 w-4" />
              <span>Explore The Journey Studio</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Global Panoramic Landscape Footer */}
      <Footer />

      {/* Full Literary Reader Drawer Modal with Apple Sheet Physics */}
      <AnimatePresence>
        {selectedDispatch && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            {/* Backdrop with physical blur & fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isReducedMotion ? 0.1 : 0.2 }}
              onClick={() => setSelectedDispatch(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Card with Apple Spring Expansion */}
            <motion.div
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
              transition={
                isReducedMotion
                  ? { duration: 0.1 }
                  : { type: "spring", damping: 28, stiffness: 300, bounce: 0 }
              }
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/20 bg-[#130c24] p-6 sm:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-white"
            >
              {/* Top Modal Navigation Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-[#8247ff]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#a855f7] border border-[#8247ff]/30">
                    {selectedDispatch.category}
                  </span>
                  <span className="font-mono text-xs text-white/50">
                    {selectedDispatch.region} &bull; {selectedDispatch.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-100 cursor-pointer"
                    title="Share dispatch"
                  >
                    {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(selectedDispatch.id)}
                    className={`p-2 rounded-full border active:scale-90 transition-all duration-100 cursor-pointer ${
                      bookmarkedDispatches.includes(selectedDispatch.id)
                        ? "border-[#8247ff] bg-[#8247ff]/20 text-[#a855f7]"
                        : "border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    title="Bookmark dispatch"
                  >
                    {bookmarkedDispatches.includes(selectedDispatch.id) ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDispatch(null)}
                    className="p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-100 cursor-pointer"
                    title="Close reader (ESC)"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal tracking-tight mb-3">
                {selectedDispatch.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/70 italic mb-6">
                {selectedDispatch.subtitle}
              </p>

              {/* Curator Byline Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 mb-8">
                <div className="h-11 w-11 rounded-full bg-[#8247ff]/20 border border-[#8247ff]/40 flex items-center justify-center text-[#a855f7] font-serif font-semibold text-sm">
                  {selectedDispatch.curator.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <span className="font-sans text-xs font-semibold text-white block">
                    {selectedDispatch.curator}
                  </span>
                  <span className="font-mono text-[10px] text-white/50">
                    {selectedDispatch.curatorRole} &bull; {selectedDispatch.readTime}
                  </span>
                </div>
                {selectedDispatch.audioGuideAvailable && (
                  <div className="flex items-center gap-1.5 text-[#a855f7] font-mono text-[10px] uppercase tracking-wider bg-[#8247ff]/15 px-3 py-1 rounded-full border border-[#8247ff]/25">
                    <Headphones className="h-3 w-3" />
                    <span>Audio Narrative Active</span>
                  </div>
                )}
              </div>

              {/* Full Narrative Paragraphs */}
              <div className="space-y-5 font-sans text-sm sm:text-base text-white/85 leading-relaxed">
                {selectedDispatch.fullNarrative.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Logistics / Patron Insight Box */}
              {selectedDispatch.patronExclusiveNote && (
                <div className="mt-8 rounded-2xl border border-[#8247ff]/30 bg-[#8247ff]/10 p-5">
                  <div className="flex items-center gap-2 text-[#a855f7] font-mono text-xs uppercase tracking-wider font-semibold mb-1">
                    <Radio className="h-3.5 w-3.5 text-[#a855f7] animate-pulse" />
                    <span>Specialist Logistics Advisory</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white/80">
                    {selectedDispatch.patronExclusiveNote}
                  </p>
                </div>
              )}

              {/* Footer Finish Reading */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-xs text-white/40">
                  End of Dispatch &bull; ESC to exit
                </span>
                <Button
                  type="button"
                  onClick={() => setSelectedDispatch(null)}
                  className="rounded-full bg-[#8247ff] hover:bg-[#7035eb] text-white text-xs font-mono uppercase tracking-wider px-6 active:scale-95 cursor-pointer"
                >
                  Finished Reading
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

