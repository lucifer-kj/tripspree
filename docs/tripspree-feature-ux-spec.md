# TripSpree — Feature & Experience Design Spec

Product/UX decisions only. No schemas, code, or technical architecture — see `docs/` for those. Each feature: the generic version to avoid, the chosen direction(s), and the honest tradeoff.

---

## 1. Curated Itinerary — Facts & Customization

**Avoid:** spreadsheet-style builder, star-rating confidence scores, generic "edit" icons.

**Direction:**
- Confidence tier shown as a plain-text label first (Verified/Team-Vetted/Unverified/General) — non-negotiable, must stay legible before any payment decision.
- Verified places get subtly richer card treatment (texture, a short human note like "Spriha stayed here in March"); unverified stay visually plainer. Reinforces the label, never replaces it.
- "Why this" shown as an editorial pull-quote (serif, larger), not a small caption — reads as judgment, not a generated tag.
- Fast literal swap-grid stays the default interaction. A conversational "ask for something else" path is an *escalation* for when the grid doesn't satisfy — not a replacement for quick swapping.

**Tradeoff:** richer/textured cards cost more design and content effort per listing than a flat rating system — only worth it if the content behind it (real notes, real photos) is actually there.

---

## 2. Voice Agent — Feels Like a Real Travel Agent

**Avoid:** floating chat-bubble-with-mic icon (generic SaaS support widget look).

**Direction:**
- One quiet, always-available "Talk it through" entry point (reliable, findable) — this stays, not replaced.
- Additionally, contextual invitations at the right moment (e.g. after a "fatigued" check-in: *"Want to talk it through?"*) rather than only a static button.
- Starting a call visually dims the rest of the screen — signals "conversation," not "another panel opened."
- After a call ends, show the *outcome* as an itinerary diff ("Swapped Day 3's temple visit for a quieter afternoon"), not a scrollable transcript.

**Tradeoff:** contextual invitations require the system to correctly detect the right moment — a wrongly-timed prompt ("want to talk?" when nothing's wrong) reads as intrusive. Needs real signal, not a timer.

---

## 3. Remembers You & Your Preferences

**Avoid:** a settings page of sliders/checkboxes labeled "Preferences."

**Direction:**
- Preferences shown as a written portrait, not a form: *"You tend to linger — slow mornings, fewer stops."*
- Corrections happen in context, where the mistake showed up (a too-packed day gets a light "ease it back?" prompt right there), not in an abstract settings panel.
- Rare, specific "evolution" moments surfaced occasionally (start of a new trip) — not a persistent stats dashboard.
- A minimal, honest set of direct controls (a few plain toggles) stays available for users who want to just state a preference outright rather than wait to be inferred.

**Tradeoff:** narrative framing is more delightful but slower to correct than a direct settings form — the direct-control fallback is required, not optional, for users with strong specific preferences.

---

## 4. Mid-Trip Support — Never Left Unattended

**Avoid:** push notifications nagging check-ins ("Don't forget!"), red badge counts.

**Direction:**
- Evening check-in is simply present on Today when opened naturally — no push, no badge, no demand.
- Staged suggestions (from fatigue/weather signals) framed as reassurance already in motion ("Tomorrow looks lighter — I noticed today ran long"), not an alert requiring a decision.
- One consistent, calm "something's wrong" path, always in the same place — consistency of location matters more than visual urgency.
- Exception: real time-sensitive logistics changes (e.g. pickup time shift) may still get a sparing, justified push — reflective check-ins never do.

**Tradeoff:** low-pressure, no-push design risks a same-day suggestion going unseen if the user doesn't open the app that evening — acceptable for reflective content, not for anything with a real deadline.

---

## 5. Onboarding → Pre-Departure → Mid-Journey, Connected

**Avoid:** disconnected app sections a returning user has to relearn each time.

**Direction:**
- Each trip framed as one continuous thread; Designer/Pre-Departure/Today are "where you are" in that trip's life, shown with a quiet marker (e.g. "Day −14"), not a stepper with checkmarks.
- Phase transitions get a small authored moment (e.g. "Booked. Spriha's team now has your journey.") instead of silently loading a new page.
- Past trips shown as a browsable shelf (cover image + title per trip), not a table of dates/statuses — ties into the Provenance Trail.
- Clear, direct destinations (Designer, Pre-Departure, Today) still exist and are individually reachable — the "continuous thread" is a framing layer on top, not a replacement for direct navigation.

**Tradeoff:** the unifying metaphor is nicer to browse but must not bury the ability to jump straight to "packing list" or "today's plan" — direct wayfinding is required underneath.

---

## 6. Proactive Outreach — Timing, Trigger, Voice, Consent

**Avoid:** mass-market marketing automation (seasonal sale blasts, generic "we miss you" emails, urgency countdowns).

**Direction — Timing:** inferred per-person from actual history (typical booking lead time, past travel season) — not a fixed calendar schedule applied to everyone.

**Direction — Trigger (only these, nothing else):**
- A destination in *their* taste profile entering its best season for them specifically
- Roughly matches their personal booking-lead-time pattern
- Something real changed about a place they saved/loved
- Never: generic discounts, countdown urgency, "we miss you"

**Direction — Voice:** must reference something specific enough it couldn't be sent to anyone else (e.g. referencing their actual past trip). Fewer, better-timed messages over frequent ones — personalization at scale is a contradiction here and should be treated as one.

**Direction — Consent:** explicit, generous frequency control set during onboarding/account setup (e.g. Never / Only when truly relevant / Seasonal) — never a buried unsubscribe link.

**Tradeoff:** this approach can't scale via pure automation without eventually feeling hollow — deliberately a slower-growing, higher-trust channel, not a high-volume one.

---

## 7. Loyalty & Referral

**Avoid:** points, badges, tier progress bars, streaks, leaderboards, "book 3 get 1 free" — all read as mass-market against a quiet-luxury brand.

**Direction — Loyalty as earned access, not earned discounts:** returning clients get faster response times or access to a "past clients only" set of destinations/itineraries — reinforces exclusivity rather than undercutting it with visible discounting.

**Direction — Referral as personal vouching:** a past client sends a friend a pre-built starting point ("I think you'd love the kind of trip I just took") rather than a coupon code — warm handoff for the friend, feels like sharing good taste for the referrer, not farming a discount.

**Tradeoff:** slower, harder to measure than a coupon-based program — won't produce the same immediate spike, but doesn't erode the reason people choose TripSpree over a cheaper competitor. Choose this tradeoff deliberately, not by default.

---

## Cross-Cutting Notes

- Every "avoid" above shares a root cause: features that make the system look comprehensive/automated at the expense of feeling personal and honest. When a proposed detail makes the product feel more like a dashboard/CRM, that's the signal to redesign it, not ship it.
- Several directions above deliberately keep a plain/direct fallback next to a more delightful, inferred version (settings toggles next to the narrative profile; a reliable static voice-agent button next to contextual invitations). This pairing is intentional — don't remove the plain fallback in a later pass for the sake of visual cleanliness.
