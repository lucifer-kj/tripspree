# TripSpree — Frontend Infrastructure & Scope Specification
> **Document Status**: ACTIVE FRONTEND GROUND TRUTH  
> **Last Updated**: September 2026  
> **Scope Confirmation**: **Frontend Architecture & Scopes Finalized | Backend Infrastructure NOT Finalized Yet**

---

## 1. Executive Summary & Infrastructure Reality

TripSpree is a bespoke digital private atelier for luxury travel in India and select global corridors.  
This document defines the **ground-truth frontend infrastructure, component architecture, design system, and motion mechanics** implemented in this repository.

> [!IMPORTANT]
> **Backend Status: NOT FINALIZED**  
> No backend persistence, database schema, or production API service is currently locked.  
> All existing backend endpoints (`/api/sanctuaries`, `/api/trips/[id]`, `/api/trips/[id]/export-ics`, `/api/voice/chat`) and voice workflows (`voice-orchestrator/`) are **provisional mocks, draft handlers, or technical specifications**.  
> All chat sessions and agents must assume the frontend is the active ground truth, while backend requirements remain flexible and subject to official finalization.

---

## 2. Frontend Tech Stack & Dependencies

The frontend is built with modern, high-performance tooling operating within low-latency and low-RAM parameters:

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `16.3.5` (Turbopack) | Server & Client Components, Route Groups |
| **Runtime / Language**| React / TypeScript | `19.2.8` / `5.x` | Modern Concurrent Features & Strict Typing |
| **Styling Engine** | Tailwind CSS | `v4` (`@tailwindcss/postcss`) | CSS Variables via `@theme inline` in `globals.css` |
| **Motion Physics** | Framer Motion | `^13.2.0` | Damped springs, parallax depth, line-masking |
| **Smooth Scroll** | Lenis | `^1.3.26` | Cinematic camera-pan scroll on marketing routes |
| **Component Primitives**| shadcn/ui & `@base-ui/react` | `^4.21.0` & `^1.8.0` | Accessible UI primitives (Buttons, Dialogs, Tabs) |
| **Icons** | Lucide React | `^1.45.0` | Cohesive iconography |
| **State Management**| Zustand | `^5.0.15` | Client-side reactive session & trip state |
| **Voice Transport** | `@vapi-ai/web` | `^2.7.0` | Browser WebRTC audio capture for DIA concierge |

---

## 3. Design System & Token Hierarchy

All visual elements derive strictly from `src/styles/globals.css`. **No raw hex codes or ad-hoc Tailwind color classes are permitted.**

### 3.1 Color System: Obsidian Amethyst Palette
* **Canvas Ground (`--background`)**: `#0c0717` (Deep Obsidian Amethyst).
* **Surface Containers (`--card`, `--popover`)**: `#130c24` (Dark Amethyst).
* **Structural Borders (`--border`)**: `#25183e` / `rgba(255, 255, 255, 0.10)`.
* **Primary Accent (`--primary`)**: `#8247ff` (Royal Electric Amethyst).
* **Secondary / Highlights (`--secondary`)**: `#a855f7` / `#7034f5`.
* **Telemetry Sunset Orange (`--accent`)**: `#f97316` (Used for transit progress and Solari elements).
* **Foreground Text (`--foreground`)**: `#fdfdfd` (Near-pure white for high legibility).
* **Muted Typography (`--muted-foreground`)**: `rgba(255, 255, 255, 0.65)`.

### 3.2 Confidence-Tier Semantic Tokens
Chips and status markers follow semantic colors strictly:
* **Verified**: Semantic Success / Amethyst (`#8247ff` / Emerald).
* **Team-Vetted**: Semantic Warning / Coral (`#f97316`).
* **Unverified / General**: Muted Slate (`rgba(255, 255, 255, 0.4)`).

### 3.3 Root Theme Default
The root `<html>` tag in `src/app/layout.tsx` is explicitly set to `className="dark ..."` ensuring tokens universally resolve to the dark luxury palette.

---

## 4. Dual Motion Registers (Strict Separation)

TripSpree enforces an absolute separation between two motion registers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRIPSPREE MOTION REGISTERS                      │
├───────────────────────────────────┬────────────────────────────────────┤
│   (marketing) Route Group         │   (app) Route Group                │
│   • / (Homepage)                  │   • /designer (Trip Designer)      │
│   • /journal (Curator's Journal)  │   • /today (Living Day-Of Itinerary│
│   • /quiz (Taste Profiling)       │   • /pre-departure (Clearance)     │
│                                   │   • /account (Member History)      │
├───────────────────────────────────┼────────────────────────────────────┤
│   Bold, Cinematic, Parallax       │   Restrained Micro-Interactions    │
│   • Lenis smooth scrolling        │   • NO full-page scroll hijacking  │
│   • 3-plane layered depth         │   • NO parallax backgrounds        │
│   • Continuous Ken Burns scaling  │   • Instant tactile feedback       │
│   • Line-masking wipes            │   • 28px reference corner radius   │
│   • Staggered child reveals       │   • Sheet drag-to-dismiss          │
│   • 650ms luxury hover scale      │   • Split-flap Solari board physics│
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 5. Apple Design System Integration (WWDC Physical Mechanics)

Both registers incorporate calibrated Apple physical motion mechanics:

1. **Spring Calibrations**:
   - **Critically Damped Components** (`damping: 30, stiffness: 350, bounce: 0`): Mobile navigation menus, tab pills, and button states.
   - **Underdamped Overlays & Sheets** (`damping: 28, stiffness: 300`): Slide-over drawers (Swap Drawer, Journal Reader) and modal canvases.
2. **Tactile Feedback & Glass Compression**:
   - Buttons and interactive cards compress immediately on press-down: `active:scale-[0.97] transition-all duration-100 ease-out`.
3. **Direct Manipulation Gestures**:
   - Drawers support horizontal flick-to-dismiss gestures with authentic rubber-banding resistance: `drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={{ left: 0.04, right: 0.5 }}`.
4. **Spatial Origin Scale Expansion**:
   - Modals and canvas views scale up organically from the trigger origin: `initial: scale 0.97 -> animate: scale 1.0` with backdrop blur `backdrop-blur-2xl backdrop-saturate-180`.
5. **Keyboard Accessibility**:
   - All drawers and modals implement native `Escape` key event listeners.
6. **Tri-Signal Accessibility Fallbacks**:
   - Handled via `src/styles/globals.css`:
     - `@media (prefers-reduced-motion: reduce)`: Disables Lenis, sets translations to 0, reduces transitions to instant state swaps.
     - `@media (prefers-reduced-transparency: reduce)`: Swaps translucent glass to solid `#0c0717`.
     - `@media (prefers-contrast: more)`: Amplifies borders to 2px solid white/60.

---

## 6. Route Structure & Screen Inventory

### 6.1 Marketing Routes `(marketing)`

| Route | Primary File | Key Modules & Components |
|---|---|---|
| `/` | `src/app/(marketing)/page.tsx` | `SmoothScrollProvider`, `Preloader`, `Navbar`, `Hero` (3-plane parallax + chatbox), `VitaStatisticSection` (3 realms), `VitaAboutSection` (indented manifesto + stats), `SanctuariesSection` (retreat cards), `VitaCombineSection` (4 steps + parallax bg), `VitaDestinationSection` (celestial radar + asymmetric gallery), `VitaSpecialistsSection` (portraits + hover overlay), `Footer`, `AGUICanvasModal`. |
| `/journal` | `src/app/(marketing)/journal/page.tsx` | Editorial essays, read time indicators, full-screen reader slide-over drawer with spring physics and Escape listener. |
| `/quiz` | `src/app/(marketing)/quiz/page.tsx` | Autonomous sensory taste quiz mapping architectural, silence, and cultural preferences into session state. |

### 6.2 App Routes `(app)`

| Route | Primary File | Key Modules & Components |
|---|---|---|
| `/designer` | `src/app/(app)/designer/page.tsx` | `AppNav`, `TripHeroCard` (50% left card with 28px radius, carousel slides & 3-thumbnail stack), `TelemetryMatrix` (2x2 grid: Gate B18, Transit countdown, Barcode pass, Solari board), Day-by-Day Living Cadence cards, `SwapDrawer`. |
| `/today` | `src/app/(app)/today/page.tsx` | Real-time day-of-travel dossier, morning/afternoon/dusk cadence cards, active weather and elevation telemetry. |
| `/pre-departure` | `src/app/(app)/pre-departure/page.tsx` | Sovereign clearance requirements, packing checklists, customs dossiers, health & altitude advisories. |
| `/account` | `src/app/(app)/account/page.tsx` | Member tier (Founding Patron), verified sanctuary archive, biometric preferences, ICS export manager. |

---

## 7. Key Component Architecture Breakdown

### 7.1 The Hero (`src/components/marketing/hero.tsx`)
* **3-Plane Depth Layout**:
  - Layer 0: Full-bleed landscape (`bg-sky.webp`) with continuous 24s Ken Burns scale.
  - Layer 1: Mountain peaks (`bg-part-1.webp`) with top-pinned parallax `useTransform(scrollYProgress, [0, 1], ["0%", "6%"])`.
  - Layer 2: Monumental serif typography (`Travel`) positioned behind foreground hill.
  - Layer 3: Foreground golden hill with yurts and grazing horse (`bg-part-2.webp`) bottom-pinned.
  - Layer 4: Purpose subtitle and white & purple frosted consultation chatbox (`bg-white/95 backdrop-blur-2xl`) with DIA prompt dispatcher.

### 7.2 The AG-UI Canvas Modal (`src/components/marketing/ag-ui-canvas-modal.tsx`)
* Listens to `dia-prompt-submitted` custom window events.
* Full-screen immersion with scale entrance (`scale: 0.97 -> 1.0`), simulating autonomous AI synthesis with live generation steps and direct transition to `/designer`.

### 7.3 App Navigation (`src/components/app/app-nav.tsx`)
* Top navigation bar replacing legacy sidebars across all in-app routes.
* Features official logo monogram + white wordmark, unhurried page links, active spring pill indicator (`layoutId="activeAppNavPill"`), notification badge, and member avatar dropdown.

### 7.4 Telemetry Matrix (`src/components/app/telemetry-matrix.tsx`)
* 4-card 2x2 grid with exact `rounded-[28px]` radius and specular border:
  1. **Gate Clearance Card**: Bold `B18` identifier with corner screw rivets and countdown timer.
  2. **Transit Progress Timeline**: `1h 23min` arrival countdown with route trajectory and sunset coral bar.
  3. **Boarding Pass & Barcode Dossier**: Passenger details with authentic vertical SVG barcode.
  4. **Split-Flap Mechanical Departure Board**: Solari-style LED dot-matrix departure indicator.

---

## 8. Backend Boundaries & Future Scope Policy

For all upcoming tasks:
1. **Never make assumptions about backend persistence**: Do not attempt to wire production PostgreSQL, Redis, or external database queries without an explicit user directive.
2. **Preserve frontend contracts**: All UI components consume standard TypeScript models (`SanctuaryItem`, `SpecialistItem`, `TripDay`, etc.) defined in `src/lib/` or component interfaces.
3. **Mocks over breakage**: When building UI features requiring data, supply structured mock datasets adhering to the TypeScript interfaces.
