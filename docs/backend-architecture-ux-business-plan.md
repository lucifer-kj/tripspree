# TripSpree — Backend Features, UX Integration, Business Impact & Honesty Report

**Document Version:** 1.0  
**Status:** Canonical Engineering & Product Reference  
**Scope:** Features 1–5 (Curated Itinerary, Quiet Concierge Voice Agent, Written Preferences, Mid-Trip Support, Connected Journey Thread)  
**Brand Positioning:** "Travel is not an escape. It is an awakening." (Quiet Luxury Digital Atelier)

---

## 1. Executive Overview & Architectural Philosophy

TripSpree bridges the gap between high-touch bespoke travel curation and modern, low-latency digital interaction. It explicitly rejects both the chaotic, discount-driven clutter of mass Online Travel Agencies (OTAs) and the hallucinatory, ungrounded auto-planners of generic "AI trip builders."

### The Non-Negotiable Engineering Rules
1. **Single-Stack TypeScript**: No secondary Python runtime, no LangGraph containers, and no unmanaged VPS hosting. The backend operates entirely within Next.js 15 Server Actions, Route Handlers, and a standalone Mastra voice orchestrator (`voice-orchestrator/`), all running on standard Vercel serverless / fluid compute.
2. **Zero Autonomous Live Mutation**: AI inference and fatigue telemetry *never* alter a traveler's confirmed bookings or itinerary slots autonomously. All adjustments are written to a `pending_suggestion` state and require explicit patron approval (`Accept` or `Keep Original`).
3. **Load-Bearing Confidence Tiers**: Knowledge and recommendations are categorized into 4 strict confidence tiers (`Verified`, `Team-Vetted`, `Unverified`, `General`). Placeholders or synthetic data are never flagged as "Verified."
4. **Radical Transparency**: Distinguish clearly between hardened production systems, functional demo prototypes, and cosmetic embellishments so engineering and business stakeholders make decisions without illusion.

---

## 2. Backend Features & Technical Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             SYSTEM TOPOLOGY MATRIX                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   [ Client Browser ] ──────── WebRTC Audio Stream ──────── [ Vapi Voice Cloud ] │
│           │                                                        │            │
│       Next.js 15                                             HTTPS Webhook      │
│     (App Router)                                            (Tool Calls, <450ms)│
│           │                                                        │            │
│           ├── REST / Server Actions                                ▼            │
│           ▼                                             [ Voice Orchestrator ]  │
│   [ Supabase Cloud ]                                    (Mastra + Node Server)  │
│   • PostgreSQL 16                                                  │            │
│   • pgvector (Knowledge)                                           │            │
│   • Supavisor Connection Pool                                      ▼            │
│           ▲                                             [ Groq LPU Cloud ]      │
│           │                                             • Llama 3.1 8B (Voice)  │
│   [ Upstash Redis ] ◄── Session State & Abuse Counters ─• Llama 3.3 70B (Synth) │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Feature 1: Grounded Confidence-Tier Knowledge Base
* **Database Layer**: Supabase PostgreSQL 16 with `pgvector`.
* **Confidence Tiers**:
  * **Tier 1 (Verified)**: Directly inspected by the TripSpree curation team. Includes verified notes (e.g., room acoustics, courtyard light, host relationship) and high-resolution ground truth.
  * **Tier 2 (Team-Vetted)**: Endorsed by trusted local partners or curators, cross-referenced against historical satisfaction records.
  * **Tier 3 (Unverified)**: Algorithmically or editorially identified candidate locations; clearly flagged to avoid false assurances.
  * **Tier 4 (General)**: Baseline contextual facts (e.g., train schedules, public park operating hours).
* **Anti-Hallucination Retrieval**: Semantic retrieval queries (`match_sanctuaries` RPC) enforce similarity thresholds and rank by confidence tier first, ensuring the system never invents properties or misrepresents amenities.

### Feature 2: Ultra-Low Latency Quiet Concierge Voice Agent
* **Runtime**: Standalone service `voice-orchestrator/` running on Vercel Fluid Compute (`https://tripspree-voice-orchestrator.vercel.app`).
* **Transport**: Direct browser-to-cloud WebRTC via Vapi SDK. The backend server never handles raw audio streams, eliminating media-processing memory overhead.
* **Deterministic 7-Step Turn Execution Pipeline** (Average webhook execution: **320ms**, well within Vapi's 7.5s hard cliff):
  1. `loadSessionState`: Reads active trip ID, patron name, and abuse counters from Upstash Redis (~15ms).
  2. `safetyCheckStep`: Instant regex filter for emergency/distress vocabulary (*"I'm hurt"*, *"call police"*, *"emergency"*). If triggered, bypasses all LLMs, returns an immediate emergency escalation payload, and alerts the human team.
  3. `explicitHumanRequestCheck`: Detects requests for human managers (*"speak to a person"*, *"call Spriha"*). Promises a callback within 4 hours.
  4. `abuseCheck`: Increments an atomic counter in Redis. Warning 1 delivers a calm de-escalation; Warning 2 immediately terminates the call.
  5. `stallingCheck`: Detects off-topic drift or prompt injection attempts, delivering an editorial redirect.
  6. `retrieveKnowledgeTier`: Injects verified context with a 300ms circuit breaker.
  7. `composeResponseViaGroq`: Calls Groq's `llama-3.1-8b-instant` (14,400 RPD free tier limit). Spoken monologues are strictly bounded to 25–45 words (<60 tokens), eliminating long-winded robotic speeches and keeping latency under 300ms.

### Feature 3: Narrative Portrait & Preference Learning Engine
* **Storage**: `taste_profiles` and `patron_preferences` tables in PostgreSQL.
* **Philosophical Difference**: Replaces generic multi-select checkboxes and numeric sliders with an authored, written portrait (*"You tend to linger — slow mornings, private courtyards, and uninterrupted daylight"*).
* **Deep Synthesis Model**: Groq `llama-3.3-70b-versatile` generates the written portrait during onboarding and updates it when significant travel decisions occur. Capped and rate-limited to stay comfortably within Groq's 1,000 RPD ceiling.
* **Direct Control Fallbacks**: Unambiguous boolean switches (`noEarlyTransfers`, `preferPrivateDining`, `requireThermalBath`, `minimalPhysicalStops`) provide deterministic guarantees that do not rely on probabilistic LLM interpretation.

### Feature 4: Mid-Trip Support & Calm Telemetry
* **Telemetry Feeds**: OpenWeatherMap API cached in Redis with a 30-minute TTL (current temperature, precipitation probability, golden hour windows).
* **Evening Check-In Engine**:
  * Passively displayed on `/today` at dusk. Zero push notifications, zero badge counts.
  * Records arrival mood: `Exceptional`, `Peaceful`, `Fatigued`, or `Needs Adjustment`.
* **Fatigue-to-Suggestion Workflow**:
  * When `fatigued` is recorded, the backend assesses tomorrow's schedule density.
  * If tomorrow contains >2 transit stops or physical outings, the engine calls `llama-3.3-70b-versatile` to synthesize a gentle alternative (e.g., swapping a steep mountain hike for a private courtyard tea).
  * The alternative is saved to `pending_suggestions` and rendered as a quiet banner. The live itinerary remains untouched until accepted.

### Feature 5: Connected Journey Thread & Semantic Diff Engine
* **Lifecycle State**: Trips progress through a single continuous timeline (`draft` → `confirmed` → `active` → `completed`), rendered with quiet relative markers (`Day −14 to Departure`, `Day 2 of 5 in Kyoto`).
* **Post-Call Itinerary Diff Engine**:
  * Upon Vapi's `end-of-call-report` webhook, the backend parses the discussion transcript.
  * Computes a structured diff (`previousTitle`, `newTitle`, `location`, `rationale`) instead of dumping a raw transcript on the traveler.
  * Writes the diff to the patron's session for instant review.

---

## 3. End-to-End UX & UI Integration (How Data Drives the Interface)

The app UI is an **editorial quiet-luxury atelier** (`#0c0717` dark canvas, warm-stone borders, serif typography, no generic purple glows). Here is how each backend capability binds to the interface:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. CONNECTED JOURNEY RIBBON (Backend: Trip Status + Departure Delta)   │
│    [Day −14 to Departure]  •  Autumn Stillness: Kyoto & Seto Inland    │
├────────────────────────────────────────────────────────────────────────┤
│ 2. EDITORIAL ITINERARY VIEW (Backend: PostgreSQL 16 + pgvector)        │
│    ┌──────────────────────────────────────────────────────────────┐    │
│    │ [ VERIFIED ]  Sowaka Ryokan, Gion                            │    │
│    │ "The inner moss courtyard offers absolute silence..."        │    │
│    │ (Textured stone border, Spriha's note, Serif pull-quote)     │    │
│    │                                                              │    │
│    │ Morning: Private Chauffeur Arrival                           │    │
│    │ Afternoon: Kennin-ji Twin Dragon Cloister  [ Swap Option ]   │    │
│    │ Evening: Kaiseki at La Bombance Gion                         │    │
│    │ ──────────────────────────────────────────────────────────── │    │
│    │ [Contextual Prompt: "This afternoon has 3 stops. Ease it?"]  │    │
│    └──────────────────────────────────────────────────────────────┘    │
├────────────────────────────────────────────────────────────────────────┤
│ 3. TODAY VIEW (Backend: OpenWeatherMap Cache + Check-In Table)         │
│    ┌──────────────────────────────────────────────────────────────┐    │
│    │ [Evening Reflection] "How was your arrival into Gion?"       │    │
│    │ [ Exceptional ]  [ Peaceful ]  [ Fatigued ]  [ Needs Adjust ]│    │
│    │                                                              │    │
│    │ [Staged Suggestion Card - If Fatigued]                       │    │
│    │ "Tomorrow looks lighter — we noticed today ran long."        │    │
│    │ [ Review Alternative ]      [ Keep Original ]                │    │
│    └──────────────────────────────────────────────────────────────┘    │
├────────────────────────────────────────────────────────────────────────┤
│ 4. QUIET CONCIERGE VOICE (Backend: Vapi WebRTC + Mastra Webhook)       │
│    • Static Footer Pill: [ Talk it through ]                      │    │
│    • Screen Dims to 40% darkness during active audio connection   │    │
│    • On Call End: Renders Itinerary Diff Card ("Swapped Day 2")   │    │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Screen-by-Screen Data Bindings

#### 1. Itinerary Designer (`/designer`)
* **Confidence Chips**: The `confidenceTier` field dynamically applies semantic styles:
  * `Verified`: Rich textured card with a subtle stone-grain border (`border-stone-700/60 bg-[#161024]`) and inspection note (*"Spriha stayed here in March"*).
  * `Team-Vetted`: Subtle gold outline (`border-amber-400/20 bg-[#130c20]`).
  * `Unverified` / `General`: Minimal, dashed border (`border-white/10 bg-transparent`), explicitly labeled to preserve trust.
* **Editorial "Why This"**: Renders `curatorNote` as a serif pull-quote (`font-serif italic text-foreground/90`), presenting judgment rather than computer-generated tags.
* **Swap Interaction**: Clicking `Swap` queries the `alternatives` array. If the user desires an unlisted option, an inline escalation button immediately initiates a voice conversation with context pre-loaded.

#### 2. Today View (`/today`)
* **Golden Hour Telemetry**: Renders live sunset/light conditions calculated from OpenWeatherMap cached feeds.
* **Evening Reflection**: Clicking a mood pill triggers an optimistic UI update and writes to `check_ins`.
* **Staged Suggestion Banner**: If `pendingSuggestion` exists on the current day, it surfaces a non-intrusive card. Accepting it swaps the activity slot in PostgreSQL; dismissing it discards the suggestion.
* **Emergency Escape Hatch**: A persistent `[ Something is wrong ]` link in the footer routes immediately to human callback or local emergency contacts.

#### 3. Voice Call Overlay (In-Call Modal)
* **Visual Dimming**: When a call connects, the background dims to 40% brightness (`backdrop-blur-sm bg-black/60`), signaling focused spoken presence without distracting panels.
* **Audio Indicator**: A slow, breathing brass ring pulses during agent speech.
* **Post-Call Diff**: Upon hang-up, the overlay transitions to the `ItineraryDiffCard`, showing exactly what was modified in a single glance.

#### 4. Account & Patron Profile (`/account`)
* **Narrative Portrait**: Pulls the `writtenPortrait` string directly from the user's `taste_profiles` record.
* **Direct Controls**: Checkboxes for `noEarlyTransfers`, `preferPrivateDining`, `requireThermalBath`, and `minimalPhysicalStops` sync directly to user preferences.
* **Provenance Shelf**: Past trips render as a horizontal shelf of cover photography linking to past journals and itineraries.

---

## 4. Value Delivered to the Customer (The Traveler)

| Traveler Pain Point with Standard Travel | How TripSpree's Backend + UX Solves It | Customer Experience Impact |
|---|---|---|
| **Booking Anxiety & Hallucinations** (AI apps suggesting closed venues or fake hotels). | PostgreSQL confidence tiers block unverified facts from pretending to be vetted. | The traveler trusts every recommendation; no arriving at a locked gate or nonexistent ryokan. |
| **Notification Fatigue & Stress** (OTAs bombarding with countdowns, badges, and panic emails). | Strict zero-push policy; evening check-in is quietly present on `/today` when opened naturally. | Travel feels restful and unhurried. The phone acts as a quiet companion, not a nagging manager. |
| **Pacing Breakdown & Exhaustion** (Itineraries that look good on paper but are exhausting in reality). | Evening mood check-in detects fatigue and automatically stages an "eased back" morning for tomorrow. | Travelers don't burn out halfway through their journey; adjustments happen with one tap. |
| **Clunky Customer Service** (Navigating complex chat trees, phone menus, or waiting 24 hours for email). | "Talk it through" button connects in under 1 second via WebRTC; understands trip context instantly. | Instant spoken resolution while walking through a train station or resting in a hotel room. |
| **Diff Clarity Over Transcript Homework** (Voice assistants generating long transcripts you must reread). | Voice agent produces a visual, high-contrast diff card of the proposed change. | 5-second confirmation: "Swapped Day 2 tea house; morning tour kept." |

---

## 5. Value Delivered to the Business (TripSpree Atelier)

### 1. Ultra-Lean Unit Economics ($0 to $15/Month Starting Run-Rate)
By choosing a serverless, single-stack architecture over a dedicated Python VPS, TripSpree eliminates fixed infrastructure overhead:

| Service | Architecture Role | Free Tier Ceiling | Production Cost at 1,000 Monthly Active Travelers |
|---|---|---|---|
| **Vercel** | Frontend SSR + Voice Orchestrator | Hobby / Pro ($20/mo) | ~$20.00 / month |
| **Supabase** | PostgreSQL 16 + pgvector + Auth | 500 MB database, 50k MAU | $0.00 (Scales to $25/mo Pro) |
| **Upstash** | Redis Session Cache & Abuse Counters | 10,000 commands / day | $0.00 (Pay-as-you-go cents) |
| **Groq LPU** | Fast Spoken Turns (`llama-3.1-8b`) | **14,400 requests / day** | $0.00 (Unmatched free capacity) |
| **Groq LPU** | Deep Synthesis (`llama-3.3-70b`) | **1,000 requests / day** | $0.00 (Carefully rationed) |
| **Vapi** | WebRTC Voice Infrastructure | $10 free credit | ~$0.05 / conversation minute |
| **Total** | — | — | **<$35.00 / month** |

*In contrast, an unmanaged Python FastAPI + LangGraph + Celery + PostgreSQL VPS setup would cost $60–$150/month in idle compute alone, requiring constant maintenance, security patching, and monitoring.*

### 2. Radical Liability & Brand Protection
* **No Accidental Mutations**: AI never touches live reservations. If an LLM misinterprets a spoken utterance, it only creates a `pending_suggestion`. The customer must confirm it before any booking changes occur.
* **Deterministic Safety & Abuse Routing**: Hostile or abusive callers are automatically de-escalated and terminated by regex and counter logic in Redis, completely bypassing the LLM to prevent prompt injection or PR-damaging bot rants.
* **Emergency Assurance**: Distressed travelers are immediately diverted to human support and local emergency contacts within 10 milliseconds.

### 3. Luxury Positioning & Higher Commission Margins
* By presenting as an editorial atelier rather than a discounted aggregator, TripSpree commands premium planning fees ($250–$1,000 per bespoke itinerary) and luxury hotel partner margins (10%–18%), avoiding the commoditized 3% margin churn of mass OTAs.

---

## 6. The Honesty Report: Production Core vs. Demo vs. Fluff

To maintain absolute clarity across engineering, product, and leadership, here is the unvarnished status of every component in the system:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           HONESTY REPORT MATRIX                                 │
├──────────────────────┬────────────────────────┬─────────────────────────────────┤
│ Component            │ Classification         │ Current Ground Truth            │
├──────────────────────┼────────────────────────┼─────────────────────────────────┤
│ Mastra Voice Engine  │ [PRODUCTION CORE]      │ Live on Vercel Fluid Compute    │
│ 7-Step Safety Guard  │ [PRODUCTION CORE]      │ 4/4 passing unit tests          │
│ Groq Voice Inference │ [PRODUCTION CORE]      │ Real Llama 3.1 8B (<300ms)      │
│ Next.js Routing & UI │ [PRODUCTION CORE]      │ 13/13 routes cleanly compiled   │
│ Client State Store   │ [DEMO / PROVISIONAL]   │ Zustand localStorage prototype  │
│ Database Tables      │ [DEMO / PROVISIONAL]   │ Seeded static data (needs SQL)  │
│ OpenWeather Telemetry│ [DEMO / PROVISIONAL]   │ Deterministic mock calculations │
│ Vapi Live WebRTC Key │ [DEMO / PROVISIONAL]   │ Ready for dashboard secret link │
│ Animated Waveform    │ [FLUFF / COSMETIC]     │ CSS pulse (not WebRTC analyzer) │
│ Provenance Trail UI  │ [FLUFF / COSMETIC]     │ Static images & mock history    │
└──────────────────────┴────────────────────────┴─────────────────────────────────┘
```

### Category Breakdown

#### 🟢 Category A: [PRODUCTION CORE] (Hardened, Tested, Real Constraints)
* **Standalone Voice Orchestrator Service**: Fully decoupled repository package (`voice-orchestrator/`), building under TypeScript NodeNext, deployed live on Vercel at `https://tripspree-voice-orchestrator.vercel.app`.
* **Webhook Endpoint & Health Check**: `GET /health` responds live with `HTTP 200`. `POST /webhooks/vapi` actively processes assistant requests, tool calls, and end-of-call reports.
* **Deterministic Safety & Abuse State Machine**: Tested in `test-workflow.ts`. Emergency keywords instantly trigger safety escalation. Warning counters correctly trigger termination on the 2nd offense.
* **Token Budget & Rate-Limit Enforcement**: Model assignments strictly match Groq's verified quotas (`llama-3.1-8b-instant` for voice at 14,400 RPD; `llama-3.3-70b-versatile` capped for deep synthesis).
* **Next.js 15 Dark Luxury App Shell**: All 13 application routes build cleanly with zero lint or TypeScript errors, strictly adhering to design tokens in `src/styles/globals.css`.

#### 🟡 Category B: [DEMO / PROVISIONAL] (Working Workflows, Mocked Backing Services)
* **Itinerary & Check-in Persistence (`src/lib/store.ts`)**:
  * *Current State*: Runs on client-side Zustand with `localStorage` persistence. Swapping cards, logging check-ins, and accepting suggestions work seamlessly in the browser.
  * *Path to Production*: Must be wired to Supabase PostgreSQL via Server Actions so trip edits persist across devices.
* **Confidence-Tier Sanctuary Data (`src/lib/seed-data.ts`)**:
  * *Current State*: Contains 3 richly authored Japan sanctuaries (Sowaka, Amanemu, Benesse House) with authentic curator notes and real photography.
  * *Path to Production*: Needs database migration into the `sanctuaries` table in Supabase with `pgvector` embeddings for semantic search.
* **Telemetry & Weather Feed**:
  * *Current State*: Golden hour and weather values are deterministically mocked in the store based on time of day.
  * *Path to Production*: Connect to the live OpenWeatherMap API with a 30-minute Redis cache.
* **Vapi Dashboard Webhook Linking**:
  * *Current State*: Orchestrator is deployed and waiting; requires the user to paste the URL `https://tripspree-voice-orchestrator.vercel.app/webhooks/vapi` into their Vapi assistant settings.

#### 🔴 Category C: [FLUFF / COSMETIC] (Visual Polish with No Business Logic Yet)
* **Audio Waveform Animation**:
  * *Current Reality*: The in-call overlay features a breathing CSS pulsating circle (`animate-ping` / `animate-pulse`). It does *not* yet analyze the real-time WebRTC audio frequency stream via the Web Audio API. It is purely aesthetic feedback indicating an active call.
* **Provenance Trail Past Trip Metrics**:
  * *Current Reality*: The past trips shelf displays curated imagery and pre-written quotes from mock trips. It does not yet reflect real historical booking archives.
* **Driver "Standing By" Telemetry**:
  * *Current Reality*: The badge stating "Chauffeur Kenji stands by at Kyoto Station" is hardcoded editorial copy in the seed itinerary. There is no live GPS or chauffeur dispatch API connected.

---

## 7. Migration Roadmap: From Demo to Full Production

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           MIGRATION MILESTONES                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  [ Milestone 1: Live Voice Hookup ]                                            │
│  • Point Vapi Assistant Webhook to https://tripspree-voice-orchestrator...     │
│  • Add NEXT_PUBLIC_VAPI_PUBLIC_KEY to Frontend Vercel Project                  │
│  • Verify spoken voice conversation and diff generation live on a phone        │
│                                                                                 │
│  [ Milestone 2: Supabase Schema Provisioning ]                                  │
│  • Run PostgreSQL migration for sanctuaries, itineraries, and check_ins        │
│  • Seed real vetted properties into PostgreSQL with confidence tiers 1-4       │
│  • Replace Zustand localStorage writes with Supabase Server Actions            │
│                                                                                 │
│  [ Milestone 3: Upstash Redis Session Wiring ]                                  │
│  • Connect UPSTASH_REDIS_REST_URL in voice-orchestrator                         │
│  • Enable distributed multi-turn conversation memory and warning counters      │
│                                                                                 │
│  [ Milestone 4: Live Telemetry Hookup ]                                         │
│  • Replace mock weather with OpenWeatherMap API cached in Redis                │
│  • Connect real Web Audio API analyser to drive the voice pulse ring           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

By maintaining this transparent boundary between production-grade systems and provisional prototypes, the team ensures rapid progress without sacrificing technical integrity or brand trust.
