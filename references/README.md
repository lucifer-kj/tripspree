# Reference Material — What to Take, What to Ignore

Read this before using anything in `references/` for the first time in a
session. Colors and fonts ALWAYS come from `src/styles/globals.css`, never
from these images — every one of these was sourced from a site with a
different color story than TripSpree's.

## homepage/motion-mechanics/ — take the MECHANICS only

| File | What it is | TAKE | IGNORE |
|---|---|---|---|
| `tengile-scroll-and-preloader.mp4` | Screen recording of tengilemalamala.com (luxury safari lodge) | Solid-color preloader with centered minimal wordmark before page reveal; editorial section rhythm (eyebrow label + one literary paragraph per section); asymmetric grouped-item photo grid | Olive/earth color grading, safari subject matter |
| `tengile-preloader-frame.jpg` | Still frame of the above preloader | Same as above — reference for the preloader moment specifically | Same as above |
| `tengile-lodge-grid-frame.jpg` | Still frame of the 3-up grid | Three-column asymmetric grid layout, hover-card interaction pattern | Color grading |
| `vita-hero-and-scroll.mp4` | Screen recording of vita-travel.webflow.io | THE key reference: scroll-scrubbed text reveal (headline fades in word-by-word, tied to scroll position, not on-load); dark near-black ground used as a rest beat between bright photo sections; oversized serif-adjacent display type directly on photo; pill-shaped CTA | Warm amber photo grading |
| `vita-text-reveal-frame.jpg` | Still frame of the scroll-scrubbed text reveal | Same as above | Same as above |

## app-screens/trip-designer-structure/ — take the STRUCTURE only

| File | What it is | TAKE | IGNORE |
|---|---|---|---|
| `dashboard-structure-reference.webp` | A trip-dashboard UI mockup | Editorial serif headline treatment ("YOUR TRIP PLAN"); boarding-pass-style card metaphor; floating UI panel over a full-bleed background photo | Brown/terracotta color palette |
| `concierge-panel-structure-reference.webp` | A chat/dashboard hybrid UI | Three-column layout idea: context panel + chat + stats — useful structural reference for a trip-assistant/concierge panel | Cool-blue dark-SaaS palette, generic map widget |

## app-screens/discard/ — DO NOT use for anything, kept only for reasoning

These five images are generic travel-booking-template layouts (bold
condensed sans headlines, stock-photo grids, generic trust-badge rows) —
exactly the "looks like every other travel agency" problem TripSpree is
explicitly trying to differentiate away from (see the competitor analysis
in `docs/`). They are kept here, clearly labeled, so nobody mistakes them
for approved direction if they turn up while browsing this folder. Do not
reference these files in any build prompt.

- `flygo-hero-DISCARD.webp`, `flygo-grid-DISCARD.webp`,
  `flygo-grid2-DISCARD.webp` — bold condensed sans, black/white/sky-blue,
  budget-airline energy. Wrong mood entirely for a quiet-luxury brand.
- `monkstrip-landing-DISCARD.webp`, `flynest-landing-DISCARD.webp` — generic
  rounded-card travel templates. This is the look TripSpree's current live
  site already has and is moving away from.

## Still needed

`homepage/mood-color/` is currently empty. It should eventually hold 1-2
references chosen purely for color/mood (not mechanics) — ideally from a
hospitality or fashion-editorial site using a deep purple/violet palette
against a light neutral ground, to sanity-check that `globals.css`'s
`--primary` (`#8247ff`) reads as intended at real photographic scale.
Not blocking — `globals.css` is the source of truth regardless.
