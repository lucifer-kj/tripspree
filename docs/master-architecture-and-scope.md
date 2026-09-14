# TripSpree & DIA — Master Architecture & Approved Project Scope
> **Document Status**: APPROVED & ACTIVE  
> **Last Updated**: September 2026  
> **Product Name**: TripSpree featuring DIA (Digital Intelligence Agent)  
> **Positioning**: India's First Autonomous AI Travel Platform (Domestic & Global Luxury)

---

## 1. Executive Summary & Brand Positioning

TripSpree is a customer-first, AI-native bespoke travel platform. Unlike traditional OTAs (MakeMyTrip, Booking.com) that overwhelm travelers with cluttered lists, or traditional bespoke agencies that require weeks of manual back-and-forth, TripSpree introduces **DIA**: a real-time, empathetic voice and generative UI agent that maps, refines, and manages luxury travel.

### Geographic & Market Reach
* **Domestic India Focus**:
  * Heritage Palaces & Havelis (Rajasthan, Udaipur, Jaipur, Jodhpur).
  * Rainforest & Ayurvedic Solitude (Kerala, Coorg, Wayanad).
  * High-Altitude Preserves & Stargazing (Ladakh, Spiti, Kashmir).
  * Coastal & Island Escapes (Goa private villas, Andaman archipelagos).
  * Wilderness & Tiger Sanctuaries (Ranthambore, Kanha, Bandhavgarh).
* **International Gateway Reach**:
  * Maldives (Private island seaplane transfers & overwater pavilions).
  * Middle East (Dubai & Abu Dhabi private desert preserves).
  * Mediterranean & Europe (Amalfi Coast, Swiss Alps, French Riviera).
  * East Asia (Kyoto cloisters, Hokkaido onsen estates).
* **Target Audience**:
  * Phase 1: High-net-worth Indian travelers, global diaspora, and inbound luxury explorers.
  * Phase 2: Global luxury travelers worldwide seeking high-touch autonomy.

---

## 2. Approved Dual-Stage Technology Matrix

To ensure immediate demo readiness without creating technical debt or vendor lock-in, the system follows a **Hexagonal (Ports & Adapters)** architecture:

| Architecture Layer | Stage 1: Dev / Demo (Now) | Stage 2: Production (Self-Hosted OSS) | Migration Friction |
|---|---|---|---|
| **Frontend Framework** | Next.js 15+ (App Router), React 19, Tailwind v4 | Next.js 15+ (App Router), React 19, Tailwind v4 | **Zero (Identical code)** |
| **Component Primitives** | shadcn/ui + Base UI + Lucide | shadcn/ui + Base UI + Lucide | **Zero (Identical code)** |
| **State Management** | Zustand + Session Storage | Zustand + Persistent Server State | **Zero** |
| **Database** | **Supabase Cloud (PostgreSQL 16)** | **Self-Hosted Supabase / PostgreSQL Docker** | **Zero (Change `DATABASE_URL`)** |
| **Vector Engine** | **`pgvector` (HNSW indexing in Postgres)** | **`pgvector` on Self-Hosted Postgres** | **Zero (Standard SQL queries)** |
| **Authentication** | Supabase Auth (GoTrue) + Demo Gate | Supabase Auth Self-Hosted (WhatsApp / SMS OTP) | **Zero (Same schemas/hooks)** |
| **Caching & Session** | **Upstash Redis (Serverless REST)** | Self-Hosted Dragonfly / Redis on VPS | **Minimal (Standard Redis protocol)** |
| **Voice Transport** | **Vapi Web SDK** (Clara voice preset) | **LiveKit WebRTC Server (Open Source)** | **Isolated to Voice Adapter layer** |
| **STT (Speech-to-Text)**| Deepgram Nova-3 (Cloud) | Faster-Whisper Large v3 Turbo / Deepgram On-Prem | **Zero backend rewrite** |
| **LLM Reasoning** | Groq (Llama 3.3 70B) / OpenAI | vLLM (Llama 3.3 70B / DeepSeek-V3 on GPU) | **Zero (OpenAI-compatible API format)** |
| **TTS (Text-to-Speech)**| Vapi Clara | Kokoro-82M (80ms OSS) / Cartesia Sonic | **Isolated to Audio Stream** |
| **Real-Time Travel Data**| OpenWeather + Google Places + Amadeus | Curated Data Graph + OSRM + Aviation Feeds | **Gradual data enrichment** |

---

## 3. Low-RAM & Low-Latency Engineering Principles

To ensure fast execution on lightweight servers and avoid bloated cloud bills:

1. **Lightweight Backend Microservices (Fastify / Hono over Express)**:
   * Express consumes 40–60MB base RAM with high connection overhead.
   * Internal API routes run either on **Next.js Web Streams** or **Hono/Fastify** (under 15MB RAM, 100k+ req/sec throughput, zero dependencies).
2. **Lightweight Database Client (Drizzle ORM + Postgres.js)**:
   * Heavy ORMs like Prisma launch a separate ~80MB Rust query engine binary that causes cold-start latency and heavy RAM consumption.
   * Drizzle ORM compiles purely to SQL at build time with near-zero runtime footprint (~2MB RAM).
3. **Stateless REST Caching (Upstash Redis)**:
   * Traditional `ioredis` maintains persistent long-lived TCP socket pools that leak memory during serverless scaling.
   * Upstash uses HTTP fetch with zero connection state, consuming 0MB idle RAM.
4. **pgvector Over Standalone Vector Databases**:
   * Standalone vector databases (Pinecone, Weaviate, Qdrant) require separate clusters and recurring monthly charges.
   * `pgvector` utilizes PostgreSQL's shared memory buffers via memory-mapped HNSW indexes (`m=16, ef_construction=64`), providing sub-10ms similarity queries with minimal memory footprint.
5. **Target Performance Budgets**:
   * Voice Time-to-First-Token (TTFT): **< 350ms**.
   * Barge-in Audio Interruption: **< 120ms**.
   * AG-UI Widget Render: **< 200ms concurrently with voice**.
   * Static Page LCP: **< 0.8s**.

---

## 4. DIA Intelligence & Agentic Generative UI (AG-UI) Specification

DIA is a multimodal travel agent that speaks and updates the user's viewport simultaneously.

```
                  USER (Speech or Text)
                           │
                           ▼
                 [DIA Voice Conduit]
                           │
                    Tool Call: `orchestrate_turn`
                           │
                           ▼
          ┌───────────────────────────────────┐
          │     DIA ORCHESTRATION PIPELINE    │
          │  1. Guardrail & Safety Gate       │
          │  2. Intent Classifier             │
          │  3. pgvector & Live API Query     │
          │  4. Dual-Stream Payload Generator │
          └─────────────────┬─────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
    [A. Voice Payload]              [B. AG-UI Action Payload]
    • Word-for-word concise         • Typed JSON UI Action
    • Max 35 words for spoken       • Renders interactive cards,
      naturalness                     weather widgets, maps, &
    • Non-intrusive empathy           price sliders instantly
```

### Supported AG-UI Component Types
1. `RENDER_SANCTUARY_CARD`: Dynamic luxury estate card with real high-res photography, quietness rating, room type, and price band in ₹ (INR) and $ (USD).
2. `RENDER_PACE_GRAPH`: Visual schedule timeline (Morning unhurried tea -> Midday temple seclusion -> Twilight boat transfer).
3. `RENDER_WEATHER_TELEMETRY`: Real-time temperature, seasonality note, and monsoon/air quality indicator.
4. `RENDER_EXPERIENCE_SWAP`: Interactive drawer allowing one-tap swapping between high-energy exploration and restorative wellness.
5. `RENDER_PRICE_BREAKDOWN`: Transparent breakdown (sanctuary nights, private transfers, exclusive access passes, local taxes).

---

## 5. User Lifecycle & Product Flow

### Step 1: The Landing Page AG-UI Playground (Public)
* Hero features an interactive **DIA Live Console**.
* Visitors can speak or type an intent (e.g., *"Design an unhurried 4-day escape in Rajasthan for our anniversary"*).
* DIA responds in real time via Clara's voice and renders live sanctuary cards and weather widgets directly in the viewport.
* Call-to-Action: *"Save this journey and unlock direct booking with DIA — Sign Up Free"*.

### Step 2: Authentication & Onboarding (Empty Slate)
* Users authenticate via Email OTP, Google, or instant 1-click Demo Passcode.
* **New users start with 0 bookings** (no pre-filled mock data).
* Clean, welcoming empty state with discovery triggers:
  * *"Heritage & Palaces"*
  * *"Himalayan Stillness"*
  * *"Kerala Backwaters & Ayurveda"*
  * *"Maldives & Island Preserves"*
  * *"Custom Global Route"*

### Step 3: Conversational Discovery Without Interrogation
* DIA asks **one single, empathetic question at a time**.
* Automatically infers pace, intimacy, and style from natural phrases:
  * User: *"We need a few days away from Mumbai traffic to recharge."*
  * DIA Inference: Low pace, high acoustic isolation, within 2-hour flight or 4-hour chauffeur radius (e.g., Alibaug private villa, Amanbagh, or Kumarakom).
* Guardrails actively prevent off-topic inquiries (finance, coding, politics) with calm redirection to travel.

---

## 6. Data Architecture & `pgvector` Schema

### Core Tables
1. `profiles`: User identity, travel style preferences, passport/clearance status.
2. `trips`: Active and past journey records, overall status (`draft`, `curated`, `confirmed`, `completed`).
3. `itinerary_days`: Day number, date, morning/afternoon/evening activity slots, transit codes.
4. `sanctuaries`: Verified luxury estates, coordinates, room categories, base rates, seasonal tags.
5. `sanctuary_embeddings`: 1536-dim embeddings for semantic matching with HNSW index:
   ```sql
   CREATE INDEX ON sanctuary_embeddings USING hnsw (embedding vector_cosine_ops);
   ```
6. `call_sessions`: Voice call logs, transcripts, detected sentiment, user feedback.

---

## 7. Approved Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-09-13 | **Adopt Option 1 (Supabase + pgvector)** over Convex + Clerk | Ensures 100% of code, schemas, and vector queries written today transfer to self-hosted open-source in production with zero rewrite. |
| 2026-09-13 | **Rebrand from European Salon to India's 1st AI Travel Agency** | Creates a sharp, culturally authentic, and venture-grade SaaS positioning covering both Domestic India & Global Luxury. |
| 2026-09-13 | **Adopt Clara (Vapi) for Edge Voice Conduit calling `orchestrate_turn`** | Decouples audio transport from core reasoning, paving the way for LiveKit open-source voice in Phase 2. |
| 2026-09-13 | **Empty Slate Onboarding for New Users** | Eliminates confusing hardcoded dummy trips and gives users a real onboarding discovery flow with DIA. |
| 2026-09-13 | **Dual-Payload AG-UI Engine** | Voice output alone is insufficient for travel; synchronized generative UI visualizes hotels, pricing, and pacing in real time. |
| 2026-09-13 | **Lightweight Low-RAM Stack Enforcement** | Use Fastify/Web Streams, Drizzle, Upstash REST, and pgvector to maintain sub-15MB idle RAM footprints and sub-350ms latency. |
| 2026-09-13 | **Frontend AG-UI Playground & Zero-Booking Onboarding** | Landing page features a live interactive DIA console with real hotel/weather cards; authenticated users start with an empty slate canvas. |

---

## 8. Frontend UI/UX System & Strict Palette Preservation

### Strict Color Palette Preservation (from `src/styles/globals.css`)
All UI work strictly adheres to the established design system tokens:
* **Brand Primary Accent (`--primary`)**: `#8247ff` (light) / `#ad46ff` (dark) — Royal Violet.
* **Canvas Ground (`--background`)**: `#fdfdfd` (light) / `#060606` (dark) — Clean light or deep noir.
* **Card & Elevated Surfaces (`--card`)**: `#fdfdfd` (light) / `#121212` (dark).
* **Borders & Dividers (`--border`)**: `#e7e7ee` (light) / `#2a2b2c` (dark).
* **Status Colors**:
  * `--chart-1`: `#4ac885` / `#4ade80` (Verified status, Stillness rating).
  * `--chart-2`: `#ad46ff` (Team-Vetted / Luxury tier).
  * `--chart-3`: `#fd822b` / `#fca5a5` (Weather advisory).
* **Typography Hierarchy**:
  * *Editorial Serif (`--font-serif`)*: Lora — Heritage destinations, sanctuary names, editorial quotes.
  * *Precision Sans (`--font-sans`)*: Montserrat — Modern SaaS interface, buttons, inputs, labels.
  * *Data Mono (`--font-mono`)*: IBM Plex Mono — Live weather metrics, flight sectors, timestamps, status badges.

### Micro-Tactile Polish Standards
1. **Audio Barge-In**: User speech interrupts agent playback within `< 100ms` with gentle audio ducking.
2. **Skeleton Shimmer**: Ambient shimmer animations preserve layout height during API fetches, preventing Cumulative Layout Shift (CLS = 0).
3. **Spring Motion**: Damped luxury spring physics (`stiffness: 280, damping: 24`) avoiding arcade-like overshoots.
4. **Keyboard Shortcuts**: `Space` (push-to-talk), `Cmd+K` / `Ctrl+K` (quick destination command palette), `Esc` (close reader/drawers).

