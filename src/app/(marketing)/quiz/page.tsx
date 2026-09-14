"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { useTripSpreeStore } from "@/lib/store";
import { useVapi } from "@/lib/use-vapi";
import { InCallOverlay } from "@/components/app/in-call-overlay";
import { UNSPLASH_ASSETS } from "@/lib/unsplash";
import {
  Sparkles,
  ArrowRight,
  PhoneCall,
  Compass,
  Check,
  Share2,
  RefreshCcw,
} from "lucide-react";

interface QuestionScenario {
  id: number;
  category: string;
  headline: string;
  subtext: string;
  options: {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    photographer: string;
    tags: string[];
    weight: {
      stillness: number;
      architecturalPurity: number;
      pace: "unhurried" | "balanced" | "immersive";
    };
  }[];
}

const SCENARIOS: QuestionScenario[] = [
  {
    id: 1,
    category: "01 • MORNING CADENCE",
    headline: "How should your first hour of consciousness begin?",
    subtext: "Choose the atmosphere that aligns with your nervous system.",
    options: [
      {
        id: "onsen-dawn",
        title: "Thermal Onsen Solitude",
        description: "Mineral-rich outdoor thermal springs enveloped in quiet sea mist before sunrise.",
        image: UNSPLASH_ASSETS.amanemu.url,
        alt: UNSPLASH_ASSETS.amanemu.alt,
        photographer: UNSPLASH_ASSETS.amanemu.photographer,
        tags: ["Ise-Shima", "Mineral Water", "Complete Stillness"],
        weight: { stillness: 10, architecturalPurity: 9, pace: "unhurried" },
      },
      {
        id: "river-skiff",
        title: "Private River Skiff Gliding",
        description: "Drifting along a cold mountain river canyon shaded by ancient red maples.",
        image: UNSPLASH_ASSETS.hoshinoyaKyoto.url,
        alt: UNSPLASH_ASSETS.hoshinoyaKyoto.alt,
        photographer: UNSPLASH_ASSETS.hoshinoyaKyoto.photographer,
        tags: ["Arashiyama", "Oi River", "Acoustic Silence"],
        weight: { stillness: 9, architecturalPurity: 8, pace: "balanced" },
      },
    ],
  },
  {
    id: 2,
    category: "02 • ARCHITECTURAL IMMERSION",
    headline: "Which structural rhythm restores you?",
    subtext: "The physical envelope governs how your mind settles into stillness.",
    options: [
      {
        id: "sukiya-woodcraft",
        title: "Historic Sukiya Woodcraft",
        description: "100-year-old hand-planed Yoshino cedar, sliding paper shoji, and private moss courtyards.",
        image: UNSPLASH_ASSETS.sowakaKyoto.url,
        alt: UNSPLASH_ASSETS.sowakaKyoto.alt,
        photographer: UNSPLASH_ASSETS.sowakaKyoto.photographer,
        tags: ["Gion Kyoto", "Wabi-Sabi", "Living Heritage"],
        weight: { stillness: 10, architecturalPurity: 9, pace: "unhurried" },
      },
      {
        id: "ando-concrete",
        title: "Radical Concrete & Open Sky",
        description: "Tadao Ando smooth concrete oval framing the open sky, water aperture, and Seto Inland Sea.",
        image: UNSPLASH_ASSETS.benesseHouse.url,
        alt: UNSPLASH_ASSETS.benesseHouse.alt,
        photographer: UNSPLASH_ASSETS.benesseHouse.photographer,
        tags: ["Naoshima", "Modern Monument", "Night Museum"],
        weight: { stillness: 8, architecturalPurity: 10, pace: "immersive" },
      },
    ],
  },
  {
    id: 3,
    category: "03 • CULINARY INTENSITY",
    headline: "What form of dining brings you presence?",
    subtext: "True luxury is hyper-intimate culinary craftsmanship.",
    options: [
      {
        id: "counter-kaiseki",
        title: "Intimate Counter Kaiseki",
        description: "Seven seats. A master chef preparing seasonal seafood and chestnuts over white binchotan charcoal.",
        image: UNSPLASH_ASSETS.teaCeremony.url,
        alt: UNSPLASH_ASSETS.teaCeremony.alt,
        photographer: UNSPLASH_ASSETS.teaCeremony.photographer,
        tags: ["Hyper-Seasonal", "Chef Dialogue", "Binchotan"],
        weight: { stillness: 9, architecturalPurity: 9, pace: "unhurried" },
      },
      {
        id: "private-pavilion",
        title: "In-Sanctuary Veranda Service",
        description: "Unhurried dining served course by course in your private pavilion terrace overlooking the gorge.",
        image: UNSPLASH_ASSETS.heroFocalPavilion.url,
        alt: UNSPLASH_ASSETS.heroFocalPavilion.alt,
        photographer: UNSPLASH_ASSETS.heroFocalPavilion.photographer,
        tags: ["Absolute Privacy", "Forest Air", "Unscheduled"],
        weight: { stillness: 10, architecturalPurity: 9, pace: "unhurried" },
      },
    ],
  },
];

export default function TasteQuizPage() {
  const router = useRouter();
  const { setTasteProfile } = useTripSpreeStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    callStatus,
    isMuted,
    isSpeaking,
    duration,
    activeTranscript,
    startCall,
    endCall,
    toggleMute,
  } = useVapi();

  const handleSelectOption = (optionId: string) => {
    const nextAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(nextAnswers);

    if (currentStep < SCENARIOS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate resulting taste profile
      setIsCompleted(true);
      setTasteProfile({
        id: "taste-contemplative-minimalist",
        pace: "unhurried",
        architecturalPurity: 9.6,
        stillnessIndex: 9.8,
        culinaryFocus: "counter-omakase",
        preferredRealms: ["Kyoto", "Ise-Shima", "Naoshima"],
        archetypeTitle: "The Contemplative Minimalist",
        archetypeDescription:
          "You gravitate toward sacred silence, hand-planed timber, thermal mineral waters, and hyper-intimate culinary craftsmanship. You value unhurried presence over itinerary checklists.",
        matchedSanctuaries: ["Amanemu", "Sowaka Ryokan", "Hoshinoya Kyoto"],
        createdAt: 1760486400000,
      });
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleShareResult = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/quiz?archetype=contemplative-minimalist`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleVoiceConsult = () => {
    if (callStatus === "idle") {
      startCall({
        tripId: "taste-quiz-consult",
        userId: "patron-inquiry",
        currentSanctuary: "Kyoto & Ise-Shima",
      });
    } else {
      endCall();
    }
  };

  const scenario = SCENARIOS[currentStep];
  const progressPercent = ((currentStep + (isCompleted ? 1 : 0)) / SCENARIOS.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col justify-center">
        {/* Voice Consultation Callout ("Skip — Just talk to us instead") */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-sans text-xs sm:text-sm font-medium text-foreground">
                Prefer conversation over visual scenarios?
              </p>
              <p className="font-mono text-[11px] text-muted-foreground">
                Our Travel Agent can map your taste profile via a 3-minute voice dialogue.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleVoiceConsult}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
              callStatus === "active"
                ? "bg-destructive/15 text-destructive border-destructive/30"
                : "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-xs"
            }`}
          >
            {callStatus === "active" ? (
              <>
                <PhoneCall className="h-3.5 w-3.5" />
                <span>In Call • End Consultation</span>
              </>
            ) : (
              <>
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Skip — Talk to Us Instead</span>
              </>
            )}
          </button>
        </div>

        {/* Live In-Call Overlay if Voice is Active */}
        {callStatus !== "idle" && (
          <div className="mb-8">
            <InCallOverlay
              callStatus={callStatus}
              isMuted={isMuted}
              isSpeaking={isSpeaking}
              duration={duration}
              activeTranscript={activeTranscript}
              onEndCall={endCall}
              onToggleMute={toggleMute}
              curatorName="Elena Vance"
              sanctuary="Taste Profiling Agent"
            />
          </div>
        )}

        {/* Honest Progress Indicator */}
        {!isCompleted && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
              <span className="uppercase tracking-widest">{scenario.category}</span>
              <span>
                STEP 0{currentStep + 1} OF 0{SCENARIOS.length}
              </span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}

        {/* Scenario Body */}
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="font-serif text-2xl sm:text-4xl text-foreground font-medium tracking-tight mb-2">
                  {scenario.headline}
                </h1>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                  {scenario.subtext}
                </p>
              </div>

              {/* Photo Pairs Option Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenario.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden text-left transition-all duration-200 hover:border-primary/50 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                      <Image
                        src={opt.image}
                        alt={opt.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {opt.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-background/80 text-foreground backdrop-blur-xs border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl text-foreground font-medium mb-1.5 group-hover:text-primary transition-colors">
                          {opt.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {opt.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between font-mono text-xs text-primary">
                        <span>Select this cadence</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Result Card Presentation */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Keepsake Screenshot-Worthy Result Card */}
              <div className="rounded-3xl border-2 border-primary/40 bg-card p-8 md:p-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Compass className="h-48 w-48 text-primary" />
                </div>

                <div className="relative z-10 max-w-2xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs tracking-widest uppercase">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Your Travel Taste Archetype</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl text-foreground font-medium tracking-tight">
                    The Contemplative Minimalist
                  </h1>

                  <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                    You gravitate toward sacred silence, hand-planed timber, thermal mineral waters, and hyper-intimate culinary craftsmanship. You value unhurried presence over itinerary checklists.
                  </p>

                  {/* Quantitative Taste Matrix */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="p-3 rounded-xl bg-muted/40 font-mono text-center">
                      <span className="text-[10px] text-muted-foreground uppercase block mb-1">
                        Stillness Index
                      </span>
                      <span className="font-semibold text-lg sm:text-xl text-primary">9.8 / 10</span>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/40 font-mono text-center">
                      <span className="text-[10px] text-muted-foreground uppercase block mb-1">
                        Purity Score
                      </span>
                      <span className="font-semibold text-lg sm:text-xl text-foreground">9.6 / 10</span>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/40 font-mono text-center">
                      <span className="text-[10px] text-muted-foreground uppercase block mb-1">
                        Cadence
                      </span>
                      <span className="font-semibold text-lg sm:text-xl text-foreground">Unhurried</span>
                    </div>
                  </div>

                  {/* Curated Sanctuary Matches */}
                  <div className="pt-4 border-t border-border">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-3">
                      Optimal Sanctuary Sequence
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["Amanemu (Ise-Shima)", "Sowaka Ryokan (Gion)", "Hoshinoya (Arashiyama)"].map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-foreground font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => router.push("/designer")}
                      className="min-h-[48px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-sm px-8 shadow-sm cursor-pointer"
                    >
                      Design Journey with This Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleShareResult}
                      className="min-h-[48px] rounded-full border-border text-foreground hover:bg-muted font-mono text-xs px-6 cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="mr-1.5 h-3.5 w-3.5 text-primary" />
                          Copied to Clipboard
                        </>
                      ) : (
                        <>
                          <Share2 className="mr-1.5 h-3.5 w-3.5" />
                          Share Archetype Card
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={handleRestart}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors font-mono text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      <span>Retake</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
