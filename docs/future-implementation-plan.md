# TripSpree & DIA — Future Implementation Plan & Refinement Roadmap
> **Status**: DRAFT FOR REFINEMENT & REVIEW  
> **Last Updated**: September 2026  
> **Product**: TripSpree featuring DIA (Digital Intelligence Agent)  
> **Positioning**: India's First Autonomous AI Travel Platform (Domestic & Global Luxury)

---

## 1. Core Brand Guidelines & Strict Color Palette Preservation

As mandated by design system rules, **no colors outside `src/styles/globals.css` will be introduced**. The exact brand tokens are:

| Token | Light Mode | Dark Mode (`.dark`) | Semantic Role |
|---|---|---|---|
| `--primary` | `#8247ff` | `#ad46ff` | Signature Royal Violet Brand Accent |
| `--background` | `#fdfdfd` | `#060606` | Deep Noir Ground / Pristine Light Ground |
| `--card` | `#fdfdfd` | `#121212` | Elevated Surfaces & Modals |
| `--border` | `#e7e7ee` | `#2a2b2c` | Subtle Translucent Dividers |
| `--muted` | `#f5f5f5` | `#2a2c33` | Secondary Panels & Inputs |
| `--foreground` | `#000000` | `#f0f0f0` | High-Contrast Typography |
| `--chart-1` | `#4ac885` | `#4ade80` | Verified / High Stillness Status |
| `--chart-2` | `#ad46ff` | `#ad46ff` | Team-Vetted / Luxury Status |
| `--chart-3` | `#fd822b` | `#fca5a5` | Weather / Advisory Status |
| `--font-serif` | Lora | Lora | Editorial Heritage & Sanctuary Titles |
| `--font-sans` | Montserrat | Montserrat | Ergonomic SaaS Interface & Controls |
| `--font-mono` | IBM Plex Mono | IBM Plex Mono | Telemetry, Coordinates & Flight Codes |

---

## 2. Product Architecture & User Journey Blueprint

```
                                  VISITOR JOURNEY
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │ 1. PUBLIC LANDING PAGE & AG-UI PLAYGROUND     │
                 │    • Headline: India's 1st Autonomous AI      │
                 │      Travel Platform                          │
                 │    • Interactive DIA Console (Voice + Text)   │
                 │    • Live Dynamic Generative UI:              │
                 │      - Real Luxury Sanctuary Cards            │
                 │      - Live Weather Telemetry (OpenWeather)   │
                 │      - Interactive Day Cadence Timelines      │
                 └───────────────────────┬───────────────────────┘
                                         │
                              Clicks "Save Itinerary"
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │ 2. NON-BLOCKING SIGN-UP MODAL / SHEET         │
                 │    • Google 1-Tap / Email OTP / Demo Passcode │
                 │    • Carries over generated playground state  │
                 └───────────────────────┬───────────────────────┘
                                         │
                               Authenticated
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │ 3. GATED PLATFORM: ZERO-BOOKING ONBOARDING    │
                 │    • 0 Active Bookings (Pristine clean canvas)│
                 │    • DIA Initiates Empathetic Discovery:      │
                 │      - Turn 1: Pacing & Travel Companions     │
                 │      - Turn 2: Climate & Sensory Preferences  │
                 │      - Turn 3: Live Itinerary Generation      │
                 └───────────────────────┬───────────────────────┘
                                         │
                                         ▼
                 ┌───────────────────────────────────────────────┐
                 │ 4. LIVING ITINERARY STUDIO (Split Canvas)     │
                 │    • Left: Dynamic AG-UI Canvas (Day cards,   │
                 │      experience swap drawer, flight sectors)  │
                 │    • Right: Persistent DIA Voice/Chat Console │
                 └───────────────────────────────────────────────┘
```

---

## 3. Technology Strategy: Dual-Stage Hexagonal Architecture

### Phase 1: Dev / Demo (Now)
* **Frontend**: Next.js 15+ App Router, React 19, Tailwind v4, shadcn/ui.
* **Database & Auth**: Supabase Cloud (PostgreSQL 16 + GoTrue Auth + pgvector).
* **Caching**: Upstash Redis (Stateless HTTP REST, zero idle RAM).
* **Voice Transport**: Vapi Web SDK (Clara voice) relaying via `orchestrate_turn`.
* **APIs**: OpenWeather API (real-time climate), Google Places/Curated dataset, Amadeus flight routes.

### Phase 2: Production (Self-Hosted Open-Source)
* **Voice Server**: LiveKit WebRTC on bare-metal or AWS EC2.
* **STT**: Whisper Large-v3-Turbo / Deepgram On-Prem.
* **LLM Engine**: vLLM hosting Llama-3.3-70B-Instruct or DeepSeek-V3.
* **TTS**: Kokoro-82M (Open-source, 80ms latency) or Cartesia Sonic.
* **Database**: Self-Hosted PostgreSQL with pgvector (1:1 schema transfer with zero rewrite).

---

## 4. Phased Implementation Roadmap

### Phase A: Landing Page Overhaul & Live AG-UI Playground
- [ ] Refactor Homepage Hero to **TripSpree — India's 1st Autonomous AI Travel Platform**.
- [ ] Build the interactive **DIA AG-UI Playground Component**:
  - Voice talk via Vapi (Clara).
  - Text input with instant preset inspiration chips (*Rajasthan Palaces*, *Kerala Ayurveda*, *Ladakh Solitude*, *Maldives*).
  - Dynamic visual preview rendering live sanctuary cards and real-time weather.
- [ ] Seamless Sign-Up modal trigger when saving or refining itineraries.

### Phase B: Zero-Booking Onboarding Canvas (Gated Platform)
- [ ] Replace default mock user data on `/designer` and `/today` with a clean, welcoming 0-booking state for new users.
- [ ] Integrate DIA's initial conversational discovery prompt with one-tap destination starter cards.
- [ ] Implement dual-screen layout: Living Canvas on the left, DIA Omnipresent Console on the right.

### Phase C: Backend Orchestrator & Validated Property Data Layer
- [ ] Curate 60 validated luxury properties across Domestic India (35) and Global Gateways (25) with verified pricing, room categories, and coordinates.
- [ ] Connect `orchestrate_turn` to live OpenWeather API telemetry.
- [ ] Implement dual-stream response generator (Voice script + AG-UI JSON payload).

### Phase D: Supabase & pgvector Persistence
- [ ] Deploy Supabase tables (`profiles`, `trips`, `itinerary_days`, `sanctuaries`, `sanctuary_embeddings`).
- [ ] Configure HNSW index on `sanctuary_embeddings` (`vector_cosine_ops`).
- [ ] Wire user session persistence and saved journey bookmarks.

---

## 5. Areas for Further Refinement (Under Discussion)
1. **Specific AG-UI Widget Variants**: Finalizing card layouts for flight transit vs. hotel stay vs. dining experiences.
2. **Indian Luxury Partners**: Curating verified property tiers (Oberoi, Taj, SUJÁN, Aman, CGH Earth, The Postcard Hotel).
3. **Guardrail Escalation Matrix**: Fine-tuning DIA's handling of complex visa questions or emergency itinerary changes.
