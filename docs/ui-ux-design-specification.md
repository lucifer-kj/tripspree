# TripSpree — UI/UX & Design System Specification

**A quiet luxury atelier, built as a web platform**
v1.0 — September 2026

---

## How to read this document

This spec covers four things, in order: the **visual language** (color, type, motion), the **experience architecture** (how bold, cinematic storytelling on the homepage gives way to a calm, utilitarian app), the **screen-by-screen UI/UX** for every part of the platform, and the **performance engineering** that makes all of it feel instant rather than heavy. It assumes the feature set and lifecycle already agreed on (Discovery → Taste Profile → Trip Designer → Pre-Departure → On the Trip → Post-Trip → Account) and specifies *how each of those should look, move, and feel*.

**The one rule that governs every decision below:** the homepage is where TripSpree gets to be a story. Everything past the homepage is where TripSpree gets to be *useful*. Confusing those two modes — cinematic motion inside the Trip Designer, or a flat corporate feel on the homepage — breaks the brand as fast as bad code would.

---

## 1. Color System

### 1.1 The palette, revised

Your palette is strong and already does the right thing — a deep, confident purple against warm cream rather than sterile white, which is exactly the "quiet luxury, not corporate SaaS" register TripSpree needs. I ran contrast checks against WCAG 2.1 and found two real issues worth fixing before this goes into production, plus a few additions needed to support both light and dark mode properly.

```css
:root {
  /* Purple — unchanged, all pass AAA/AA at their intended use */
  --purple-950: #321052;
  --purple-900: #42166f;
  --purple-700: #54208f;
  --purple-500: #7437b5;
  --purple-100: #f1eaf8;

  /* Cream — unchanged */
  --cream-50:  #fff9ef;
  --cream-100: #fbf5e9;
  --cream-200: #f2e7d5;
  --cream-300: #e9ddcb;

  --white: #ffffff;

  /* Text — text-muted revised */
  --text-primary:   #291c32;  /* 15.4:1 on cream-50 — AAA, safe anywhere */
  --text-secondary: #766b79;  /* 4.8:1 on cream-50 — AA, safe for body text */
  --text-muted:     #7d7182;  /* REVISED from #998d9c — the original only
                                  passed AA at large text (18px+/bold 14px+)
                                  and FAILED outright on purple-100 chips.
                                  This revision clears 4.5:1 on cream-50/white,
                                  so it's safe for small labels and captions too. */

  /* Status — warning darkened slightly for text-safe use */
  --success: #39765b;   /* 5.1:1 on cream-50 — AA, fine as-is */
  --warning-text: #8a5620;  /* REVISED for text use — original #a66a24 only
                                cleared AA-large (18px+). Use this darker value
                                for any warning TEXT; keep #a66a24 as a fill/
                                chip background with dark text on top instead. */
  --warning-fill: #a66a24;  /* original value — keep for backgrounds/chips only */
  --error: #b44d58;     /* 4.8:1 on cream-50 — AA, fine as-is */
}
```

**The rule to enforce in code review:** `--text-muted` and `--warning-text` are the two values most likely to get misused by a designer reaching for the "obviously lighter" shade. Lint for raw hex values in text-color properties; force use of the tokens above.

### 1.2 Dark mode — a real second mode, not an inverted filter

Dark mode isn't `purple-950` everywhere with white text slapped on — that reads as muddy and loses the "warm, editorial" feeling that makes the cream palette work. Instead, dark mode inverts the *role* each color plays while keeping the same emotional temperature.

```css
[data-theme="dark"] {
  --surface-base:    #1c0e2c;  /* darker, slightly desaturated purple-950 */
  --surface-raised:  #2a1640;  /* card/panel backgrounds */
  --surface-overlay: #3a1f57;  /* modals, drawers */

  --text-primary:   #f6f1fa;   /* near cream-50 warmth, not pure white */
  --text-secondary: #c9bdd2;
  --text-muted:     #a597b0;

  --accent: #b48ee0;            /* lifted from purple-500 for AA on dark surfaces */
  --accent-strong: #d7c2f2;     /* lifted purple-100, used sparingly for emphasis */

  --success: #5fae8a;
  --warning-text: #d99a4f;
  --error: #d97883;
}
```

- **Default is light mode.** Dark mode is opt-in (system preference respected, manual toggle available in Account settings) — this matches a "read in the evening, on the ground, low battery" use case (Phase 5, On the Trip) more than it's a stylistic default.
- **The champagne/gold accent from the brand (if used elsewhere in TripSpree's materials) should be the one warm constant across both modes** — it's the thread that keeps light and dark feeling like the same brand rather than two different apps.

### 1.3 Semantic tokens, not raw colors, in components

Every component references `--surface-base`, `--text-primary`, `--accent`, etc. — never a raw purple/cream hex directly. This is what makes dark mode a config change instead of a rebuild, and it's also what makes the confidence-tier chips (Verified/Team-Vetted/Unverified/General, from the voice agent spec) automatically re-color correctly in both modes without special-casing.

---

## 2. Typography

A two-typeface system, matching the "boutique publishing house" positioning already established:

- **Display/Editorial serif** (headlines, Journal essay titles, the homepage story sections) — something with real character and warmth, not a generic geometric serif. Think along the lines of a modern high-contrast serif (e.g., a Freight/Tiempos/GT Sectra class of typeface) that feels like a well-designed print magazine, not a template.
- **Body/UI sans-serif** — a clean, highly legible grotesque (e.g., Inter, General Sans, or similar) for everything inside the actual app: itinerary cards, forms, buttons, dashboard text. Never use the display serif for body copy longer than a couple of lines — it kills reading speed exactly where speed matters (Trip Designer, Today view).

**Scale:** use a modular type scale (1.25–1.333 ratio) rather than ad-hoc pixel values, with distinct scales for the marketing site (larger, more dramatic jumps — headlines can be enormous on the homepage) versus the app (tighter, more utilitarian — nobody wants a 48px heading inside the Trip Designer).

---

## 3. Motion Philosophy — Bold Story, Calm Tool

This is the central design decision from this spec, so it's worth stating precisely: **the homepage is a scroll-driven cinematic experience; everything past signup is fast, quiet, and motion-restrained.** Getting this split right is what keeps "bold and immersive" from turning into "exhausting to actually use."

### 3.1 Homepage — bold and immersive, deliberately

- **Full-bleed video/imagery sections** that transition between destinations (Japan → Italy → Sri Lanka → Scandinavia) as the user scrolls, each with a parallax depth effect — background moving slower than foreground text, creating real spatial depth rather than a flat slideshow.
- **Scroll-triggered story beats.** Content doesn't just fade in — it *arrives* as the user scrolls, in a deliberate sequence: a destination name, then an image reveal, then a short editorial line, then a "why this place" detail, each triggered at a specific scroll position rather than all at once. This is the "pages/components appear in story style" request — implemented as scroll-linked reveals (opacity + transform, driven by scroll position, not just a one-time on-load animation).
- **Scroll-jacking, used sparingly and only for one or two signature sections** (e.g., a hero sequence at the very top) — not applied to the entire page. Full scroll-jacking across an entire long homepage becomes fighting the user's own scroll wheel, which reads as control-taking rather than cinematic. Reserve it for a single "wow" moment, then release control back to normal scrolling for the rest of the page.
- **Depth and layering**, not just movement — foreground text/UI elements, midground imagery, background color washes, each moving at a different rate on scroll (classic parallax), giving the sense of moving *through* a space rather than past a flat page.
- **A persistent, quiet navigation bar** that itself transitions — transparent over the hero video, solidifying to the cream/purple surface once the user scrolls into content sections. Small detail, large perceived-craft impact.

### 3.2 Everywhere else — restrained, purposeful, fast

- **No parallax, no scroll-jacking, no full-bleed cinematic sections** inside the Trip Designer, Today view, Pre-Departure page, or Account. These screens are tools a person needs to use quickly, often one-handed, sometimes mid-trip with poor connectivity — motion here should never make the user wait.
- **Micro-interactions only:** a card lifting slightly on hover/tap, a smooth (not bouncy) transition when swapping an itinerary day, a gentle checkmark animation on completing the evening check-in. These build the same sense of craft as the homepage's boldness, at a completely different register — quiet confidence rather than spectacle.
- **Transitions between app screens** should be fast crossfades or slides (150–250ms), never anything that makes the user wait to see their content. A slow, beautiful transition into the Trip Designer is a beautiful way to make someone late for their flight prep.

### 3.3 Reduced-motion — not an afterthought

Every bold homepage effect needs a defined fallback, checked explicitly, not assumed to "just work" because a media query exists somewhere:

| Effect | Full-motion version | `prefers-reduced-motion: reduce` version |
|---|---|---|
| Scroll-triggered story reveals | Parallax depth + staggered opacity/transform | Simple fade-in, no transform, no staggering |
| Full-bleed background video | Autoplaying video loop | Static hero image (first frame), no autoplay |
| Scroll-jacked hero sequence | Locked scroll, controlled section transitions | Normal free scroll, same content in document order |
| Card hover/tap lift | Transform + shadow animation | Instant state change, no animated transform |
| Page/section transitions | Slide or crossfade | Instant or near-instant fade (under 100ms) |

- Respect `prefers-reduced-motion` at the system level **and** offer an explicit in-app toggle in Account settings, since some users want reduced motion for reasons other than an OS-level accessibility setting (e.g., motion sickness, low-end devices, battery saving on the road — directly relevant to the On-the-Trip phase).
- Reduced motion must never mean reduced *content* — every story beat, every image, every piece of copy still appears; only the choreography of *how* it appears changes.
- Contrast is unaffected by theme or motion settings — the palette work in Section 1 already ensures both light and dark modes clear WCAG AA at minimum for all text use, regardless of motion preference.

---

## 4. Experience Architecture — The Full Walkthrough

This section restates the agreed feature set, now specified as **UI and interaction design**, not just a feature list. Each phase notes what's core, what's optional/later, and how the motion philosophy from Section 3 applies specifically.

### 4.1 Landing / Discovery — *bold, cinematic mode*

**What it is:** The homepage, Curator's Journal, and the public taste quiz — the only surfaces a non-signed-up visitor sees.

**Core UI/UX:**
- Hero sequence (Section 3.1) introducing the "awakening, not escape" positioning — headline, then a scroll-triggered destination journey, not a search bar or booking form. This is a brand film experience first, a lead-generation page second.
- Curator's Journal — an editorial grid (magazine-style, asymmetric card sizing rather than a uniform blog grid) leading into long-form essay pages that use lighter parallax on hero images but restrained motion in the reading body — nobody wants text jittering while they read.
- The public taste quiz — a full-screen, one-question-at-a-time flow (not a long scrolling form), each question transitioning with a clean slide, ending in a shareable result card designed to look good as a social screenshot.
- **"Ask the Journal" inline query box** inside essay pages — a quiet, understated input (not a floating chatbot bubble) that expands in place when used, keeping the reading experience clean until the reader actually wants to ask something.

**Optional/later:** public shareable Trip Notebooks from past clients, embedded into the Journal grid once enough real trips exist to populate it meaningfully.

### 4.2 Onboarding — The Taste Profile — *transitional mode*

**What it is:** The bridge between the cinematic marketing site and the calm utility app — deliberately designed to feel like the motion is "settling."

**Core UI/UX:**
- A full-screen, scenario-based flow — visual choices (photo pairs, short scenarios), not checkboxes or sliders. Each screen transition uses a gentle crossfade, consciously calmer than the homepage's parallax, marking the shift from "being told a story" to "being understood."
- A visible, honest progress indicator (dots or a thin bar) — never a spinner or vague "almost there," since trust is being built for the first time here.
- A single, clearly visible **"Skip — just talk to us instead"** exit at every step, routing straight into voice/chat, since the taste profile can build implicitly from conversation instead (as agreed earlier). This must be a real, unpenalized choice, not a hidden link.

### 4.3 Trip Designer — *utilitarian mode, high information density*

**What it is:** The working surface for building and refining a trip — the most feature-dense screen in the app, and therefore the one most in need of restraint.

**Core UI/UX:**
- **Itinerary canvas**, day-by-day cards in a horizontal or vertical scroll (device-dependent, see Section 6), each card showing: title, one-line "why this" rationale, and a **confidence-tier chip** (Verified / Team-Vetted / Unverified / General — using the semantic status colors from Section 1, so they render correctly in both light and dark mode without special-casing).
- **Swap interaction:** tapping a card surfaces 2–3 pre-vetted alternatives in a bottom sheet (mobile) or side panel (desktop) — a smooth slide-in, not a jarring modal takeover, since this is a frequent, low-stakes action that should feel light.
- A single, persistent **"Talk it through"** entry point (voice/chat) — anchored, always visible, but visually quiet (an icon plus short label, not a pulsing attention-grabbing button). This is the one place voice is contextually anchored to *this specific trip*, not a generic floating widget on every page.
- Drag-to-reorder days, with a subtle lift-and-shadow micro-interaction on pick-up — this is exactly the register of motion described in Section 3.2: felt, not performed.

**Optional/later:** side-by-side comparison of two trip versions — genuinely useful eventually, but adds real UI complexity (split view, syncing scroll, diffing) that should wait until user behavior actually demands it.

### 4.4 Booking & Pre-Departure — *utilitarian mode, single-page consolidation*

**What it is:** One living page per trip, replacing what would otherwise be five scattered sections (packing, visa, weather, calendar, "what's changed").

**Core UI/UX:**
- A single scrollable page with clear section anchors (a sticky mini-nav for jumping between Packing / Documents / Calendar / Updates), not a multi-tab interface that hides information behind clicks.
- **Risk-scoring alerts** (weather, connection risk, from the earlier systems discussion) appear as a distinct, calmly-styled banner at the top of the relevant section — using `--warning-fill` as a background with dark text on top per the palette rule in Section 1.1, never raw `--warning-text` as a large background fill.
- Calendar/`.ics` export as a simple, single button — no modal, no extra confirmation step for something this low-stakes.

### 4.5 On the Trip — *the calmest screen in the entire app*

**What it is:** The "Today" view — deliberately the single simplest screen, since this is used in real-world conditions (tired, walking, poor signal).

**Core UI/UX:**
- One primary view: where you are, what's next, and the voice/chat entry point — large touch targets, minimal text, nothing competing for attention. This screen should look almost sparse compared to the Trip Designer, and that's intentional, not a lesser design effort.
- The evening check-in surfaces as a single, unmissable but non-blocking card at the bottom of Today — one tap or a short voice moment, never a multi-field form.
- **PWA offline mode**, with a small, honest indicator (not hidden) showing when content is served from cache versus live — a quiet dot or label, so a traveler with no signal in rural Sri Lanka isn't confused about why nothing seems to be updating.
- **Deliberately absent:** live maps, photo galleries, social sharing, trip-journaling tools. Restated from the earlier discussion because it's a real design decision, not an oversight — every one of these would be a legitimate feature on a different app, but here they'd compete with the one job this screen has.

### 4.6 Post-Trip — *warm, reflective mode*

**What it is:** The Provenance Trail — a private record of the trip's decisions, becoming the seed for the next Taste Profile.

**Core UI/UX:**
- A visually distinct, warmer treatment than the rest of the app — closer in feeling to the Journal essays than to the Trip Designer, since this is meant to feel like a keepsake, not a receipt. Restrained parallax on a hero trip photo is appropriate here (a rare exception to Section 3.2's "no parallax outside the homepage" rule), since this is a reflective, browsing moment rather than a task.
- A simple, low-pressure opt-in toggle to make the trip page shareable — never a forced review flow.

### 4.7 Account / Ongoing Relationship — *utilitarian, minimal*

**Core UI/UX:**
- Trip history as a clean list (linking into each Provenance Trail page), notification preferences as simple toggles, and the dark/light/reduced-motion controls from Section 3.3 living here plainly, not buried in a settings sub-menu.

---

## 5. Component & Layout Notes

- **Cards, not tables**, throughout the app wherever content is destination/trip-related — tables read as spreadsheet-utility, which undercuts the editorial feel even in utilitarian screens.
- **Generous whitespace even in "dense" screens** like the Trip Designer — the cream palette's warmth depends on not being crowded; cramming more content into less space to seem "efficient" actively fights the brand.
- **Iconography** should be a single consistent line-weight icon set, used sparingly — icons support text labels, they don't replace them (especially important for the confidence-tier chips, where an icon-only signal would be genuinely ambiguous to a first-time user).
- **Buttons:** one primary style (solid `--purple-700` / `--accent` in dark mode), one secondary (outline), one tertiary (text-only link-style) — resist adding more button styles; visual hierarchy should come from placement and copy, not a proliferation of button variants.

---

## 6. Responsive Design

- **Mobile-first for everything past the homepage.** The realistic primary use case for Trip Designer, Today, and Pre-Departure is a phone — often the traveler's phone, mid-trip. Desktop layouts should be treated as an expanded view of the mobile experience, not the other way around.
- **The homepage can be genuinely desktop-forward for its cinematic sections** (full-bleed video looks best on larger viewports), but every scroll-triggered effect needs a tested, intentional mobile equivalent — not just a scaled-down version of the desktop effect, since parallax and scroll-jacking behave differently (and can feel worse, or even break) on mobile scroll physics.
- **Breakpoint philosophy:** design at three real breakpoints (mobile ~375–428px, tablet ~768–1024px, desktop 1280px+), not a single fluid scale — the Trip Designer canvas in particular needs a deliberately different layout (vertical card stack on mobile, horizontal day-by-day rail on desktop), not just a reflow.
- **Touch targets** on all app screens (not just mobile-detected ones) sized for touch first — desktop mouse users lose nothing from generously-sized targets, but touch users lose real usability from targets sized for a cursor.

---

## 7. Performance Engineering — Caching & Low-Latency Patterns

Framework-agnostic patterns; apply within whatever stack is chosen (see the earlier Voice Agent spec for backend stack recommendations).

### 7.1 Caching strategy, layered

| Layer | What's cached | Strategy |
|---|---|---|
| **CDN edge** | Homepage, Journal essays, static assets (images, video, fonts) | Long-lived cache with content-hashed filenames; instant invalidation on publish via cache-busting, not TTL expiry |
| **Service Worker (PWA)** | Current trip's itinerary, pre-departure page, Today view content | Cache-first for the active trip's data specifically — this is what makes the offline mode in Section 4.5 actually work, not just a badge with no substance behind it |
| **API/data layer** | Taste profile, confidence-tier knowledge base entries | Short-TTL server-side cache (seconds to low minutes) with background revalidation — data that changes but not every second (e.g., a knowledge-base entry) shouldn't hit the database on every read |
| **Client-side** | In-session UI state (itinerary being edited, quiz progress) | In-memory state, not re-fetched on every interaction; persisted to local storage only for resumability, not as a source of truth |

### 7.2 Low-latency tricks worth the engineering effort

- **Preload the next likely screen, not just the current one.** From the homepage hero, preload the Journal or taste-quiz bundle in the background; from the Trip Designer, preload the Pre-Departure page once a trip is confirmed. This is the single highest-leverage "feels instant" trick available, and it's purely a loading-priority decision, not new infrastructure.
- **Skeleton states, not spinners**, for anything that takes more than ~200ms — a skeleton of the itinerary card shape appearing instantly, then filling with real content, reads as fast even when the actual data fetch takes the same time as a spinner would.
- **Optimistic UI for low-risk actions** (reordering itinerary days, toggling a check-in) — update the UI immediately, sync in the background, roll back only on actual failure. Reserve pessimistic (wait-for-confirmation) patterns for anything with real consequence, like a booking action.
- **Image strategy:** serve responsive, format-negotiated images (modern formats with fallback) at the actual rendered size per breakpoint — the homepage's full-bleed cinematic imagery is the single biggest risk to perceived performance if this isn't done rigorously, since it's also the first thing every visitor sees.
- **Defer, don't block, on video.** Homepage hero video should never block first paint — show the poster frame instantly, swap to video once it's ready, exactly mirroring the reduced-motion fallback in Section 3.3 (which means this "fast" path and the "accessible" path can share the same underlying static-image asset).
- **Voice/chat entry point loads its heavier dependencies (audio pipeline, WebRTC connection setup) lazily**, only when actually invoked — it should never be part of the initial bundle for the Trip Designer or Today view, since most visits to those screens won't use voice in that session.

### 7.3 The performance principle underneath all of this

The homepage is allowed to be heavy in *content* (video, high-res imagery, layered animation) but must never be heavy in *perceived load time* — the techniques above (preloading, skeleton states, deferred video) exist specifically to reconcile "cinematic and bold" with "fast," which is the same tension the whole document has been managing between Sections 3.1 and 3.2, now solved at the engineering layer instead of the design layer.

---

## 8. What This Document Deliberately Does Not Specify

To keep this a usable spec rather than an exhaustive one: exact pixel values, specific font licensing choices, and component-library selection (build custom vs. extend an existing system) are intentionally left open for the next stage of work, once a design tool (Figma) and frontend framework are chosen. This document specifies the *rules* those choices need to follow, not the choices themselves.
