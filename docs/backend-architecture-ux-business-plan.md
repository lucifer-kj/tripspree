# TripSpree — Complete Brand Architecture: Tech Stack, Feature Topology, Mechanism Map & Business Blueprint

**Document Version:** 2.0 (Unified Interface & Backend Edition)  
**Status:** Canonical Engineering, UX & Business Architecture Reference  
**Scope:** Full Web Interface (Marketing Landing, Editorial Journal, Taste Quiz) & Full Atelier App (Features 1–5, Voice Concierge, Backend Cloud)  
**Brand Positioning:** "Travel is not an escape. It is an awakening." (Quiet Luxury Digital Private Atelier)

---

## 1. Executive Overview & Architectural Philosophy

TripSpree is a bespoke digital private atelier for luxury slow-travel. It bridges the gap between high-touch, human-curated editorial expeditions and modern, low-latency digital interaction.

The platform deliberately rejects two industry extremes:
1. **The Mass-Market OTA Clutter**: Countdown timers, aggressive discount badges, generic hotel grids, and frantic push notifications.
2. **The Hallucinatory "AI Trip Planner"**: Ungrounded LLM generators that hallucinate closed venues, fake boutique hotels, and impossible transfer itineraries.

### Non-Negotiable Architecture Rules
* **Single-Stack TypeScript**: Zero Python runtimes, zero unmanaged VPS containers, and zero dual-protocol bridges. The entire system runs across Next.js 15 (App Router), React 19, and a standalone Mastra voice orchestrator (`voice-orchestrator/`) deployed on Vercel Fluid Compute.
* **Two Motion Registers, Strictly Separated**:
  * `(marketing)` routes (Landing, Journal, Taste Quiz) use **bold, cinematic, scroll-linked parallax, Ken Burns depth, and Lenis smooth scroll**.
  * `(app)` routes (Designer, Today, Pre-Departure, Account) use **restrained, tactile micro-interactions only**. Zero scroll-jacking, zero full-bleed video, and zero parallax backgrounds in the working app.
* **Load-Bearing Confidence Tiers**: Information is categorized into 4 strict tiers (`Verified`, `Team-Vetted`, `Unverified`, `General`). Placeholder or synthetic data is never labeled "Verified."
* **Zero Autonomous Live Mutation**: AI and fatigue telemetry never alter a traveler's confirmed itinerary slots autonomously. All adjustments are staged in `pending_suggestions` and require explicit patron acceptance (`Accept` or `Keep Original`).

---

## 2. Full Brand Web Interface Tech Stack

The web interface is unified under a modern, high-performance, low-RAM TypeScript ecosystem:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      COMPLETE WEB INTERFACE TECH STACK                          │
├──────────────────────┬────────────────────────┬─────────────────────────────────┤
│ Layer                │ Technology             │ Implementation / Package        │
├──────────────────────┼────────────────────────┼─────────────────────────────────┤
│ Core Framework       │ Next.js 15 (App Router)│ Node.js 20 / React 19 Concurrent│
│ Language System      │ TypeScript 5.x         │ Strict typing, NodeNext modules │
│ Styling Engine       │ Tailwind CSS v4        │ `@theme inline` in globals.css  │
│ Color & Tokens       │ Obsidian Amethyst      │ `#0c0717` canvas, stone borders │
│ Smooth Scroll        │ Lenis (`^1.3.26`)      │ Pinned to `(marketing)` routes  │
│ Motion & Physics     │ Framer Motion          │ Damped springs & parallax depth │
│ Component Primitives │ shadcn/ui & Base UI    │ Accessible unstyled primitives  │
│ Typography System    │ Editorial Serif & Sans │ Cormorant / Playfair & Inter    │
│ Iconography          │ Lucide React           │ Cohesive 1.5px stroke luxury    │
│ Client State         │ Zustand                │ Reactive session & local cache  │
│ Voice Audio Transport│ `@vapi-ai/web`         │ Browser-to-cloud WebRTC client  │
│ Voice Orchestration  │ Mastra Core (TS)       │ Standalone Vercel microservice  │
│ Database & Vector    │ PostgreSQL 16 + pgvector│ Supabase Cloud (AWS us-east)    │
│ Distributed Cache    │ Managed Redis          │ Upstash (REST API / Session)    │
│ Voice Inference LLM  │ Llama 3.1 8B Instant   │ Groq LPU Cloud (14,400 RPD)     │
│ Deep Synthesis LLM   │ Llama 3.3 70B Versatile│ Groq LPU Cloud (1,000 RPD)      │
│ Telemetry & Weather  │ OpenWeatherMap API     │ Edge Cached (30-minute TTL)     │
└──────────────────────┴────────────────────────┴─────────────────────────────────┘
```

---

## 3. Brand Feature Topology (Structural Blueprint)

The web application is partitioned into two distinct route groups sharing a common design system token core:

```
                                  TRIPSPREE BRAND PLATFORM
                                             │
                    ┌────────────────────────┴────────────────────────┐
                    ▼                                                 ▼
        (marketing) PERIMETER                              (app) PRIVATE ATELIER
    [Cinematic, Narrative, Seductive]                  [Restrained, Calm, Operational]
                    │                                                 │
    ├── / (Cinematic Atelier Landing)                 ├── App Header & Journey Ribbon
    │   ├── 3-Plane Parallax Hero                     │   └── Day −14 Departure Delta
    │   ├── Consultation Chatbox / DIA Dispatcher     │
    │   ├── Vita Realm Statistics (3 Pillars)         ├── /designer (Trip Designer)
    │   ├── Brand Manifesto & Editorial Quotes        │   ├── Differentiated Confidence Cards
    │   ├── Sanctuaries Showcase (Bespoke Retreats)   │   ├── Serif "Why This" Pull-Quotes
    │   ├── Celestial Radar Destination Matrix        │   ├── 3-Card Fast Swap Drawer
    │   ├── Specialist Curation Network               │   └── Inline Concierge Escalation
    │   └── AG-UI Full-Screen Canvas Modal            │
    │                                                 ├── /today (Day-Of Living Dossier)
    │                                                 │   ├── Real-Time Telemetry & Weather
    │   ├── Editorial Dispatches / Literary Essays    │   ├── Dusk Arrival Reflection
    │   ├── Reading Time & Author Credentials         │   ├── Staged Suggestion Reassurance Card
    │   └── Slide-Over Reader Drawer                  │   └── Persistent "Something is Wrong" Path
    │                                                 │
    └── /quiz (Sensory Taste Profiling)               ├── /pre-departure (Clearance & Prep)
        ├── Architectural & Stillness Scales          │   ├── Sovereign Clearance & Customs
        ├── Culinary Focus & Pacing Dimensions        │   └── Packing & Health Advisories
        └── Autonomic Archetype Generator             │
                                                      ├── /account (Patron Profile)
                                                      │   ├── 2-Sentence Narrative Portrait
                                                      │   ├── Direct Control Safety Toggles
                                                      │   └── Provenance Trail Journey Shelf
                                                      │
                                                      └── Global In-Call Voice Overlay
                                                          ├── Fixed "Talk it through" Entry
                                                          ├── 40% Background Scene Dimming
                                                          └── Post-Call Itinerary Diff Card
```

---

## 4. Comprehensive Mechanism Map (How the System Operates)

### Mechanism 1: Dual Motion Register Separation
* **Operational Rule**: Marketing builds seduction and wonder through kinetic, cinematic motion. The in-app atelier builds trust, calm, and efficiency through zero-parallax stillness.
* **Marketing Physics**:
  * `SmoothScrollProvider`: Initializes Lenis on window scroll with custom inertia curve.
  * Line-masking text reveals (`overflow-hidden` container with `y: "100%" -> "0%"` transform).
  * 3-plane layered depth tracking `useScroll` and `useTransform`.
* **App Physics**:
  * Lenis is disabled. Scroll hijacking is strictly prohibited.
  * Critically damped spring physics (`damping: 30, stiffness: 350, bounce: 0`) for tabs, cards, and modal dismissals.
  * Press-down glass compression (`active:scale-[0.97]`).

### Mechanism 2: Hero 3-Plane Parallax & Typography Depth Masking
```
[Layer 0: Full-Bleed Sky] ── Continuous 24s Ken Burns Slow Scale
         ▲
[Layer 1: Mountain Peaks] ── Top-Pinned Parallax: translateY(0% -> 6%)
         ▲
[Layer 2: Monumental Serif Text] ── Z-Index Sandwich (Behind foreground hill)
         ▲
[Layer 3: Golden Foreground Hill] ── Bottom-Pinned Parallax: translateY(0% -> 2%)
         ▲
[Layer 4: Consultation Glass Card] ── Frosted Glass (bg-white/95 backdrop-blur-2xl)
```
* **Why it works**: By sandwiching monumental typography *between* the midground mountain peaks and the foreground terrain, the user experiences physical depth and architectural scale without high-latency 3D rendering.

### Mechanism 3: AG-UI Consultation Dispatcher & Seamless Route Transfer
1. Traveler enters an intention in the Hero consultation bar (*"Seven days of absolute silence in Kyoto with private garden views"*).
2. Triggers a custom window event: `dia-prompt-submitted`.
3. `AGUICanvasModal` intercepts the event, dims the viewport, and scales up from `0.97 -> 1.0` with `backdrop-blur-2xl`.
4. Renders a multi-step synthesis sequence (*"Analyzing silence ratings... Grounding verified ryokan availability... Synthesizing Day 1–7 cadence"*).
5. Seamlessly navigates to `/designer` with pre-loaded itinerary parameters stored in Zustand.

### Mechanism 4: Grounded Confidence Tier Card Morphing
The UI card for an itinerary slot changes its physical styling based on the database `confidenceTier`:
* **Tier 1 (Verified)**: Stone-grain textured border (`border-stone-700/60 bg-[#161024]`), warm brass status chip, and verified human annotation (*"Spriha stayed here in March. Request the garden-facing Annex for absolute silence."*).
* **Tier 2 (Team-Vetted)**: Restrained champagne outline (`border-amber-400/20 bg-[#130c20]`) with curator endorsement pull-quote.
* **Tier 3 (Unverified) & Tier 4 (General)**: Minimal, dashed border (`border-white/10 bg-transparent`), explicitly labeled in muted monochrome to prevent false expectations.

### Mechanism 5: Fast Swap Drawer vs. Conversational Escalation
1. Traveler clicks `[ Swap ]` on an afternoon activity.
2. An underdamped slide-over sheet (`SwapDrawer`) animates in from the right edge with spring physics (`damping: 28, stiffness: 300`).
3. Displays 3 curated, pre-verified alternatives matching the current time window and geo-proximity (<30 minutes transit).
4. **The Escalation Path**: If none of the 3 cards satisfy, the drawer features an inline link: *"Ask Elena for an unlisted alternative."* Clicking immediately launches the Voice Concierge with the specific day and slot pre-focused.

### Mechanism 6: Quiet Concierge Voice Call & Visual Scene Dimming
```
[User Clicks "Talk it through"]
       │
       ▼
[WebRTC Handshake with Vapi] ── Browser connects audio directly to Vapi Edge
       │
       ▼
[Visual Scene Dimming] ──────── App backdrop dims to 40% (backdrop-blur-sm bg-black/60)
       │
[Agent Spoken Turn] ─────────── Mastra webhook completes in <320ms via Groq Llama 3.1 8B
       │                        Monologue capped strictly at 25-45 spoken words
       ▼
[User Hangs Up] ─────────────── Vapi fires end-of-call-report webhook
       │
       ▼
[Itinerary Diff Card Modal] ─── Shows structured before/after change (Zero transcript homework)
```

### Mechanism 7: Mid-Trip Support, Fatigue Telemetry & Staged Reassurance
1. **Dusk Appearance**: When `/today` is loaded after 18:00, the Evening Reflection card appears passively. Zero push notifications.
2. **Mood Capture**: Traveler selects their arrival feeling (`Exceptional`, `Peaceful`, `Fatigued`, `Needs Adjustment`).
3. **Fatigue Intelligence**:
   * If `Fatigued`, the backend inspects tomorrow's schedule density.
   * If tomorrow has >2 transit transfers or mountain walking, the engine calls `llama-3.3-70b-versatile` to synthesize a gentle pacing alternative.
   * Staged alternative is stored in `pending_suggestions`.
4. **The Reassurance Banner**: Next morning, the traveler sees a quiet banner:
   > *"Tomorrow looks lighter — we noticed today ran long. We have staged a private tea ceremony at Tenryū-ji instead of the mountain ascent."*
5. **Human Agency**: Traveler clicks `[ Accept ]` (commits swap to database) or `[ Keep Original ]` (discards suggestion). **Live database slots are never mutated autonomously.**

### Mechanism 8: Tri-Signal Accessibility Protection
Handled natively via CSS tokens and media query listeners:
* `@media (prefers-reduced-motion: reduce)`: Lenis smooth scroll engine instantly unmounts; parallax transforms zero out; animations collapse to instant state swaps.
* `@media (prefers-reduced-transparency: reduce)`: Translucent glass and blurred backdrops convert to opaque dark obsidian (`#0c0717`).
* `@media (prefers-contrast: more)`: Border opacities elevate from `10%` to `60% solid white`.

---

## 5. Value Delivered to the Customer (The Discerning Traveler)

| Traveler Problem in Bespoke Travel | How TripSpree's Mechanism Solves It | Experienced Value |
|---|---|---|
| **Digital Distraction & Nagging** (Apps constantly pinging with push alerts and review requests). | Zero-push policy. Evening check-ins appear passively on `/today` when opened naturally. | Travel feels tranquil, dignified, and present. The device remains a quiet tool, not an anxious boss. |
| **Bait-and-Switch Disappointment** (Boutique hotels that look stunning online but are noisy or poorly run). | Tier 1 (Verified) status requires real human inspection with room-specific notes. | Absolute certainty of sanctuary quality. No arriving at a noisy street-facing room. |
| **Mid-Trip Physical Exhaustion** (Travel fatigue compounds; travelers feel guilty altering plans). | Fatigue mood logging automatically stages a gentle alternative for tomorrow. | Pacing adjusts with a single tap. Trips stay restorative rather than punishing. |
| **Friction When Things Go Awry** (Waiting on hold with travel insurance or arguing with chat bots). | Permanent "Talk it through" button connects in 1 second; knows the traveler's exact itinerary. | Spoken relief in seconds while standing in a busy train terminal or resting at a hotel bar. |
| **Transcript Cognitive Load** (AI voice agents dumping 20-page transcripts on the user). | Post-call semantic diff card highlights the exact swap in high contrast. | 5-second clarity: review the swap, approve, and get back to enjoying the trip. |

---

## 6. Value Delivered to the Business (TripSpree Atelier)

### 1. Radically Lean Operating Economics (<$35/Month Run-Rate)
TripSpree achieves enterprise-grade responsiveness without high-cost dedicated servers:
* **Vercel Serverless**: Serves both frontend SSR and Mastra webhooks on demand. Zero idle server costs ($0–$20/mo).
* **Supabase PostgreSQL 16**: Free tier handles 500 MB data, 50k MAUs, and `pgvector` indexing with sub-10ms response times.
* **Upstash Redis**: Serverless session store with 10,000 free commands/day.
* **Groq LPU Acceleration**:
  * `llama-3.1-8b-instant`: **14,400 free requests/day** provides unlimited headroom for high-frequency voice turns.
  * `llama-3.3-70b-versatile`: **1,000 free requests/day** powers all itinerary diffs, narrative portraits, and staged suggestions without crossing quotas.
* **Vapi**: Pure usage-based WebRTC transport (~$0.05/minute during calls).

### 2. Elimination of Operational & Dispute Liability
* **Zero Autonomous Mutations**: Hallucinated booking changes are impossible because the system requires human confirmation before writing to live trip slots.
* **Deterministic Abuse & Safety Traps**: Hostile callers or safety emergencies trigger hardcoded, non-LLM circuit breakers in <10ms, eliminating PR risks, jailbreaks, or medical liability.

### 3. Atelier Brand Positioning & High-Margin Retention
* **Escape the 3% OTA Margin Trap**: TripSpree does not compete on discounted flight commissions. By acting as an editorial atelier, it commands 15%–25% bespoke curation margins and private travel designer retainers ($500–$2,500/trip).
* **High Customer Lifetime Value (LTV)**: Narrative portraits and unhurried service build deep patron loyalty, driving repeat journeys across Japan, Italy, Scandinavia, and India.

---

## 7. The Honesty Report: Production Core vs. Demo vs. Fluff

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           HONESTY REPORT MATRIX                                 │
├──────────────────────┬────────────────────────┬─────────────────────────────────┤
│ Component            │ Classification         │ Current Ground Truth            │
├──────────────────────┼────────────────────────┼─────────────────────────────────┤
│ Mastra Voice Engine  │ [PRODUCTION CORE]      │ Live on Vercel Fluid Compute    │
│ 7-Step Safety Guard  │ [PRODUCTION CORE]      │ 4/4 passing automated tests     │
│ Groq Voice Inference │ [PRODUCTION CORE]      │ Real Llama 3.1 8B (<300ms)      │
│ Next.js Dual Shell   │ [PRODUCTION CORE]      │ 13/13 routes cleanly compiled   │
│ Lenis & Motion Engine│ [PRODUCTION CORE]      │ Parallax & smooth scroll active │
│ Client State Store   │ [DEMO / PROVISIONAL]   │ Zustand localStorage prototype  │
│ PostgreSQL Schemas   │ [DEMO / PROVISIONAL]   │ Seeded static data (needs SQL)  │
│ Telemetry & Weather  │ [DEMO / PROVISIONAL]   │ Deterministic mock calculations │
│ Vapi Webhook Secret  │ [DEMO / PROVISIONAL]   │ Ready for dashboard paste       │
│ Animated Audio Ring  │ [FLUFF / COSMETIC]     │ CSS pulse (not Web Audio API)   │
│ Provenance Trail UI  │ [FLUFF / COSMETIC]     │ Curated photos & mock history   │
│ Chauffeur Dispatch   │ [FLUFF / COSMETIC]     │ Static editorial text copy      │
└──────────────────────┴────────────────────────┴─────────────────────────────────┘
```

### Detailed Classifications

#### 🟢 Category A: [PRODUCTION CORE] (Hardened, Tested, Real Constraints)
* **Standalone Voice Orchestrator Service**: Fully decoupled repository package (`voice-orchestrator/`), building under TypeScript NodeNext, deployed live on Vercel at `https://tripspree-voice-orchestrator.vercel.app`.
* **Webhook Endpoint & Health Check**: `GET /health` responds live with `HTTP 200`. `POST /webhooks/vapi` actively processes assistant requests, tool calls, and end-of-call reports.
* **Deterministic Safety & Abuse State Machine**: Tested in `test-workflow.ts`. Emergency keywords instantly trigger safety escalation. Warning counters correctly trigger termination on the 2nd offense.
* **Token Budget & Rate-Limit Enforcement**: Model assignments strictly match Groq's verified quotas (`llama-3.1-8b-instant` for voice at 14,400 RPD; `llama-3.3-70b-versatile` capped for deep synthesis).
* **Dual Motion Register & App Shell**: Next.js 15 App Router cleanly serving marketing parallax and in-app tactile micro-interactions with zero compile warnings or linter errors.

#### 🟡 Category B: [DEMO / PROVISIONAL] (Working Workflows, Mocked Backing Services)
* **Itinerary & Check-in Persistence (`src/lib/store.ts`)**: Runs on client-side Zustand with `localStorage` persistence. Swapping cards, logging check-ins, and accepting suggestions work seamlessly in the browser, but need Supabase PostgreSQL Server Actions for multi-device sync.
* **Confidence-Tier Sanctuary Data (`src/lib/seed-data.ts`)**: Contains 3 authentic Japan sanctuaries (Sowaka, Amanemu, Benesse House) with real curator notes and photography. Needs migration into the PostgreSQL database.
* **Telemetry & Weather Feed**: Golden hour and weather values are deterministically mocked in the store based on time of day. Needs the live OpenWeatherMap API connection.
* **Vapi Dashboard Webhook Linking**: Orchestrator is deployed and waiting; requires pasting `https://tripspree-voice-orchestrator.vercel.app/webhooks/vapi` into the Vapi assistant settings.

#### 🔴 Category C: [FLUFF / COSMETIC] (Visual Polish with No Business Logic Yet)
* **Audio Waveform Animation**: The in-call overlay features a breathing CSS pulsating circle (`animate-pulse`). It does *not* yet analyze the real-time WebRTC audio frequency stream via the Web Audio API.
* **Provenance Trail Past Trip Metrics**: The past trips shelf displays curated imagery and pre-written quotes from mock trips. It does not yet reflect real historical booking archives.
* **Driver "Standing By" Telemetry**: The badge stating "Chauffeur Kenji stands by at Kyoto Station" is hardcoded editorial copy in the seed itinerary. There is no live GPS or chauffeur dispatch API connected.

---

## 8. Migration Roadmap: From Prototype to Production Complete

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
