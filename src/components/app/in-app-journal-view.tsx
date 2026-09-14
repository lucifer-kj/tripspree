"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AuthGate } from "@/components/app/auth-gate";
import { useTripSpreeStore } from "@/lib/store";
import { JOURNAL_DISPATCHES, JournalDispatch } from "@/lib/journal-data";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Headphones,
  Clock,
  Sparkles,
  Search,
  X,
  Radio,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function InAppJournalView() {
  const { bookmarkedDispatches, toggleBookmark, currentUser } = useTripSpreeStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDispatch, setSelectedDispatch] = useState<JournalDispatch | null>(null);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const categories = [
    "All",
    "Cultural Sanctuaries",
    "Maritime Solitude",
    "Mountain Preserves",
    "Historic Estates",
  ];

  const filtered = JOURNAL_DISPATCHES.filter((d) => {
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    const matchesBookmarks = !onlyBookmarks || bookmarkedDispatches.includes(d.id);
    const matchesSearch =
      !searchQuery.trim() ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.curator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBookmarks && matchesSearch;
  });

  return (
    <AuthGate
      fallbackTitle="Member Journal Archives"
      fallbackDescription="Field observations, architectural essays, and sensory dispatches reserved exclusively for registered TripSpree members."
    >
      <div className="flex h-screen w-full overflow-hidden bg-muted/30 font-sans text-foreground">
        {/* Persistent In-App Sidebar */}
        <AppSidebar activeTab="journal" />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Header Bar */}
          <header className="h-16 shrink-0 border-b border-border bg-card/80 backdrop-blur-xs px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                  TRAVEL JOURNAL &mdash; MEMBER ARCHIVE
                </span>
              </div>
              <span className="h-3.5 w-px bg-border hidden sm:inline-block" />
              <span className="font-mono text-xs text-muted-foreground hidden sm:inline-block">
                Prepared for {currentUser?.name || "Member"}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setOnlyBookmarks(!onlyBookmarks)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs border transition-colors cursor-pointer ${
                  onlyBookmarks
                    ? "bg-primary/10 border-primary/30 text-primary font-medium"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {onlyBookmarks ? (
                  <BookmarkCheck className="h-3.5 w-3.5" />
                ) : (
                  <Bookmark className="h-3.5 w-3.5" />
                )}
                <span>Saved ({bookmarkedDispatches.length})</span>
              </button>
            </div>
          </header>

          {/* Main Body */}
          <div className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 md:px-8 py-8 space-y-8">
            {/* Editorial Lead Banner */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs tracking-widest uppercase text-primary font-medium">
                    Private Member Edition
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl text-foreground font-medium tracking-tight">
                  Contemplative Field Notes &amp; Architectural Archives
                </h1>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  These dispatches are written by the destination directors and resident scholars who arrange our private preserves. In-depth, slow-form narratives on regional culture and seasonal textures.
                </p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "bg-background border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dispatches..."
                  className="w-full rounded-full border border-border bg-background px-4 py-1.5 pl-9 font-sans text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
                <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Dispatch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dispatch) => {
                const isSaved = bookmarkedDispatches.includes(dispatch.id);

                return (
                  <article
                    key={dispatch.id}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      {/* Top metadata */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary border border-primary/20">
                          {dispatch.region}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleBookmark(dispatch.id)}
                          aria-label={isSaved ? "Remove from bookmarks" : "Bookmark dispatch"}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            isSaved
                              ? "text-primary bg-primary/10 hover:bg-primary/20"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <h2 className="font-serif text-lg sm:text-xl font-medium text-foreground tracking-tight line-clamp-2 mb-2">
                        {dispatch.title}
                      </h2>

                      <p className="font-sans text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {dispatch.excerpt}
                      </p>

                      {dispatch.patronExclusiveNote && (
                        <div className="rounded-xl bg-chart-1/10 border border-chart-1/20 p-2.5 mb-4 text-[11px] font-sans text-foreground flex items-start gap-2">
                          <Radio className="h-3.5 w-3.5 text-chart-1 shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-chart-1 font-semibold block">
                              Logistics Insight
                            </span>
                            <span>{dispatch.patronExclusiveNote}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-sans text-xs font-medium text-foreground">
                          {dispatch.curator}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {dispatch.readTime}
                        </span>
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedDispatch(dispatch)}
                        className="rounded-full text-xs font-mono tracking-wider uppercase text-primary hover:bg-primary/10 cursor-pointer gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/50">
                <BookOpen className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="font-serif text-lg text-foreground font-medium">
                  No dispatches found
                </h3>
                <p className="font-sans text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Try adjusting your filter category or clearing your search term.
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
                  className="mt-4 rounded-full text-xs font-mono cursor-pointer"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Reader Modal Drawer */}
      {selectedDispatch && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl text-foreground">
            {/* Top Modal Controls */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary border border-primary/25">
                  {selectedDispatch.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {selectedDispatch.region} &bull; {selectedDispatch.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedDispatch.id)}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    bookmarkedDispatches.includes(selectedDispatch.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
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
                  className="p-2 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                  title="Close reader"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Title and author byline */}
            <h2 className="font-serif text-2xl sm:text-4xl text-foreground font-medium tracking-tight mb-3">
              {selectedDispatch.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-muted-foreground italic mb-6">
              {selectedDispatch.subtitle}
            </p>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30 mb-8">
              <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-serif font-semibold text-sm">
                {selectedDispatch.curator.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <span className="font-sans text-xs font-semibold text-foreground block">
                  {selectedDispatch.curator}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {selectedDispatch.curatorRole.replace("Curator", "Specialist")} &bull; {selectedDispatch.readTime}
                </span>
              </div>
              {selectedDispatch.audioGuideAvailable && (
                <div className="flex items-center gap-1.5 text-primary font-mono text-[10px] uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  <Headphones className="h-3 w-3" />
                  <span>Audio Narrative Active</span>
                </div>
              )}
            </div>

            {/* Full narrative paragraphs */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-foreground/90 leading-relaxed">
              {selectedDispatch.fullNarrative.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Member exclusive logistics reminder */}
            {selectedDispatch.patronExclusiveNote && (
              <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Specialist Advisory</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-foreground">
                  {selectedDispatch.patronExclusiveNote}
                </p>
              </div>
            )}

            {/* Footer close */}
            <div className="mt-8 pt-6 border-t border-border flex justify-end">
              <Button
                type="button"
                onClick={() => setSelectedDispatch(null)}
                className="rounded-full bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider px-6 cursor-pointer"
              >
                Finished Reading
              </Button>
            </div>
          </div>
        </div>
      )}
    </AuthGate>
  );
}
