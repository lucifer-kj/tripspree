TRIPSPREE
The Quiet Concierge — Voice Agent Specification
Product, Behavioral, and Technical Architecture Document
v1.0 — Draft for Internal Review
September 2026

## Contents

1. Purpose & Scope
2. Design Principles
3. System Architecture Overview
4. Recommended Technology Stack
5. The Orchestrator — Decision Logic
6. Knowledge Retrieval Tiers & Confidence
7. Conversation Design — Turn-Taking & Pacing
8. Preference Discovery Without Interrogation
9. Empathy as a Systems Requirement
10. Focus Enforcement & Stalling Detection
11. Aggression & Abuse Handling
12. Human Escalation & Manager Callback Flow
13. Session Continuity
14. Manager Dashboard Specification
15. Safety, Privacy & Compliance
16. Observability & Evaluation Metrics
17. Data Model (Core Entities)
18. Build Phasing / Roadmap
19. Open Questions & Risks

## 1. Purpose & Scope

This document specifies the Quiet Concierge — TripSpree's in-app voice agent. It is the primary real-time interface for travelers to speak (not type) to TripSpree during a trip, and a secondary interface before booking for open-ended discovery conversation. It is deliberately not an itinerary-building tool — itinerary design remains a visual, comparative task that belongs in the app UX, not a voice flow.

#### In scope

Live, on-ground queries during an active trip (recommendations, logistics, reassurance)
Opt-in evening check-ins (structured reflection, feeds the taste/outcome data model)
Pre-trip discovery conversation as an alternative to the visual taste-profile quiz
Complaint intake, distress handling, and human escalation
Manager-side live monitoring, coaching, and intervention tooling

#### Out of scope

Building, editing, or comparing itinerary days by voice — redirect to app UX
Payment collection or booking confirmation by voice in v1
Fully autonomous resolution of safety incidents — these always route to a human

## 2. Design Principles

Five principles govern every decision in this document. Where a feature or edge case is ambiguous, resolve it against these, in order:
Know before you ask. If the system already has the answer (location, itinerary day, past preference), never ask the user to repeat it.
Transparency over performance. The agent identifies what it can and can't do, and is honest about the confidence of its answers, rather than sounding falsely authoritative.
Deterministic safety, flexible warmth. Escalation, termination, and safety triggers are hard rules outside the language model's discretion. Tone, phrasing, and small talk are where the model has latitude.
Never disconnect without saying so. Every call ends with a spoken reason and a path back, even when the agent is the one ending it.
Small operator, not a call center. Every tool — dashboard, alerting, escalation queue — is built for a founder and a small team to run alone, not a 50-seat contact center.

## 3. System Architecture Overview

The pipeline follows a real-time WebRTC voice loop with a RAG-augmented orchestrator at its center. At a high level:

#### Call flow

User speaks (in-app call, WebRTC transport)
Speech-to-Text streams a live transcript
A lightweight intent/safety classifier runs on every transcript chunk, in parallel with the main path, before the orchestrator commits to a response strategy
The Orchestrator resolves intent, pulls session state (see Section 17), and issues parallel retrieval calls across the knowledge tiers (Section 6)
The LLM composes a response, grounded in retrieved context and the current warning/escalation state
Text-to-Speech streams audio back, with barge-in interrupting playback the instant the user starts speaking
Every turn is logged to the session transcript and, where relevant, to the manager dashboard's live feed

#### Why the classifier sits before the orchestrator, not inside it

Safety and escalation decisions must not depend on the primary LLM's judgment in the moment. A small, fast, dedicated classifier (rules plus a lightweight model) screens every transcript chunk for: distress/safety language, profanity or hostility, explicit manager requests, and stalling/off-topic patterns. This runs in parallel with, not after, the main retrieval-and-respond path, so escalation-worthy moments never wait on a full generation cycle to be caught.

## 4. Recommended Technology Stack

A pragmatic stack for a small team, favoring managed infrastructure where the differentiation doesn't live, and custom logic only where TripSpree's actual moat sits (orchestration, knowledge tiers, taste modeling).
Build-vs-buy note: the temptation is to reach for an all-in-one voice-agent platform (Retell, Bland, Synthflow, Vapi). These are reasonable for generic support use cases, but TripSpree's moat — knowledge-tier ordering, taste-profile inference, and the specific warning/escalation state machine — needs to be fully owned code, not configuration inside someone else's flow builder. A managed platform can still be evaluated for the STT/TTS/transport layer underneath a custom orchestrator, but the orchestrator itself should not be outsourced.

## 5. The Orchestrator — Decision Logic

Every incoming transcript chunk passes through this decision sequence, in strict order. Later steps never run if an earlier one triggers a terminal action (escalation, termination).
Both warning counters (abuse, stalling) are independent, session-scoped state held in the fast session store (Redis), not inferred fresh by the LLM on each turn. This guarantees that a warning given at turn 3 is still remembered and enforced at turn 9, regardless of what the model itself "thinks" at that moment.

## 6. Knowledge Retrieval Tiers & Confidence

Retrieval always queries in this priority order, and the response must carry the confidence label of whichever tier it drew from:
Tier 4 and 5 responses must verbalize their own uncertainty ("I haven't personally checked this one, but it's well-reviewed") rather than presenting all tiers with identical confidence. This is the single most important trust mechanism in the entire system — it's also the hardest thing for a competitor without years of real vetted data to copy convincingly.

## 7. Conversation Design — Turn-Taking & Pacing

Lead with the answer, then explain. Never open with preamble; voice users wait, they don't scan.
Cap agent monologue near 15–20 seconds before pausing or checking in; hard ceiling of 30 seconds.
Genuine barge-in. Playback stops the instant the user's voice is detected — mid-word if necessary — never finishing the current sentence first.
Don't fill every silence. A pause after hard news or while the user is thinking is not an error state to panic-fill.

#### Example — leading with the answer

Good:  "Yes, still open till eleven. It's about a ten minute walk from where you're staying."
Avoid:  "So let me check that for you — I'm looking at the restaurant's hours now, and based on what I'm seeing, it looks like, yes, it should still be open until eleven tonight."

## 8. Preference Discovery Without Interrogation


#### a) Passive inference first

Before asking anything, the agent checks the taste profile, itinerary, and check-in history. Most preference questions should never be asked because the answer already exists in session state.

#### b) Implicit signal capture

Off-hand remarks during unrelated conversation ("I don't want anywhere too crowded tonight") are logged silently to the taste profile. The agent never narrates that it's doing this — no "noting that for your profile." It simply uses it next time.

#### c) Offer choices instead of asking preference questions

Instead of:  "Do you prefer quiet or lively places?"
Try:  "There's a quiet little place five minutes away, or a livelier spot with a view — which sounds better tonight?"

#### d) The permission pattern

When a genuine question is unavoidable, ask permission first, cap the stretch, and take the hint if the user is curt:
Opening:  "Can I ask you a couple of quick things before I answer that properly?"
Mid-stretch:  "Just one more, and I'll have what I need."
Never stack more than 2 questions in a single turn — ask one, wait, ask the next.
Two consecutive short/clipped answers is a hard signal to stop asking and proceed with what's known.
At most one preference question per conversation unless it's load-bearing for the current query — non-urgent preference gaps are queued for the evening check-in instead.

## 9. Empathy as a Systems Requirement

Tone alone does not create empathy — knowing the person's actual situation does. A warm voice asking generic questions is not empathetic; a plain voice that already knows what happened and immediately offers the right next step is.
Never ask what the system already knows. If it's day 4 in Kyoto, don't ask which city they're in.
Emotional tone matches context. A disruption update is delivered in a different register than a dinner recommendation — configured explicitly in the TTS layer, not left to chance.
Acknowledge, then fix. "That's frustrating, especially this late — here's what I can do right now," not a flat list of alternatives.
No scripted empathy lines. Avoid stock phrases like "I understand how you feel" — demonstrate understanding through the specificity of the response instead.

## 10. Focus Enforcement & Stalling Detection


#### What counts as stalling (and what doesn't)


#### The two-warning sequence

Gentle redirect (not yet a warning):
Agent:  "I want to make sure I get you the right answer — could we go back to that question?"
Warning 1:
Agent:  "I'm having trouble helping without a bit more focus here — can we try that question once more?"
Warning 2 (states the consequence in advance):
Agent:  "I do want to help, but I'm going to need to end this call if we can't get back on track — one more try?"
Action:
Agent:  "I'm going to end our call here. You're welcome to call back anytime, or I can have someone from our team reach out."
This sequence is enforced by a session-scoped counter in the orchestrator, never left to the LLM's in-the-moment discretion.

## 11. Aggression & Abuse Handling

Do not react, do not escalate tone. Stay level and unhurried through the first instance of hostility.
One genuine acknowledgment, said once.
Agent:  "I'm sorry this has been frustrating."
Faster trigger than stalling. Profanity, threats, or personal insults count as an immediate first warning — no prior gentle redirect required.
Same two-warning structure as Section 10, but the clock starts at Warning 1, not the gentle redirect.
Real threats or safety disclosures bypass warnings entirely and route straight to human escalation with a flag — never handled by the model alone, regardless of warning count.
Every hostile call is auto-flagged for manager review after it ends, with full transcript and audio attached.

## 12. Human Escalation & Manager Callback Flow

Three distinct escalation paths, each with different urgency handling:
Never say:  "I am an AI and cannot connect you to a manager."
Instead say:  "Of course — I'll get Spriha's team to call you back. Can I just confirm the best number and a good time to reach you?"
Every escalation logs a callback ticket immediately, timestamped, with the full conversation transcript attached automatically — the caller should never have to repeat themselves to the human who calls back.

## 13. Session Continuity

Dropped calls resume with full context on the next contact (voice or in-app) — never restart from "hi, how can I help you today?"
Post-warning callbacks are acknowledged plainly, not ignored:
Agent:  "Hi again — last time we spoke things got a bit heated. I'd like to help if we can keep it calm this time."
Cross-channel memory. A call following an in-app chat should already know what was being discussed — session state is unified, not siloed per channel.

## 14. Manager Dashboard Specification


#### Live call modes


#### Core dashboard views

Live queue — active calls, caller identity linked to trip, duration, and a real-time sentiment/risk flag.
Escalation queue — every manager-callback request, separate from live calls, with transcript, urgency tag, and promised callback time visibly tracked.
Warned / terminated call log — every two-warning event with transcript and outcome, reviewable to retrain thresholds over time.
One-tap callback claim — a manager claims a queued escalation in a single action, no ticket-system digging.
Deliberately scoped for a one- or two-person team: a single clean feed, not a multi-panel enterprise ops center. Over-building this creates usability debt for the exact people who need to run it daily.

## 15. Safety, Privacy & Compliance

A brief, natural, spoken privacy notice on first use — recording/review for quality, stated once, not a legal disclaimer wall.
Safety-classifier detections (Section 5, Step 1) are logged with restricted access — visible to designated managers only, never surfaced in general analytics.
Call recordings and transcripts retained per a defined policy window; user-deletable on request in line with standard data-subject rights.
"Talk to Spriha directly" is an always-available override phrase, never resisted or gated behind additional questions.

## 16. Observability & Evaluation Metrics


## 17. Data Model (Core Entities)


## 18. Build Phasing / Roadmap


#### Phase 1 — Core loop

WebRTC transport, STT/TTS pipeline, basic orchestrator with knowledge-tier retrieval and confidence framing
Deterministic warning/escalation state machine (Sections 10–12) — this ships before any "nice" conversational polish

#### Phase 2 — Manager tooling

Live queue, escalation queue, warned-call log, one-tap claim
Monitor / coach / barge-in modes

#### Phase 3 — Preference intelligence

Implicit signal capture into TasteProfile, opt-in proactive check-ins
Cross-channel session continuity

#### Phase 4 — Scale & polish

Multilingual handling, telephony bridge (real phone numbers), threshold retraining from the reviewed warned-call log

## 19. Open Questions & Risks

What is the actual staffing model for escalation callbacks once volume grows past what Spriha alone can handle?
Where is the line between Tier 3 ("team-vetted") and Tier 4 ("unverified") drawn operationally — who has authority to promote a place from one tier to the other, and how often is this reviewed?
What is the data retention and deletion policy for call recordings, and has this been checked against the relevant regional regulations for each destination market?
At what warning-count ratio should thresholds be considered mistuned, and who owns that review cadence?
Draft specification prepared for internal review. Thresholds, SLAs, and vendor choices in this document are starting recommendations, not final commitments, and should be validated against real usage data once the system is live.

| Layer | Recommendation | Why |
| --- | --- | --- |
| Real-time transport | LiveKit (self-hosted or Cloud) | Purpose-built WebRTC infra for voice agents; native room/session model fits multi-party (user + AI + barge-in manager) |
| Speech-to-Text | Deepgram (streaming, low-latency) with a fallback provider | Sub-300ms streaming transcription; strong at interruption/partial-transcript handling needed for barge-in |
| Orchestration layer | Custom service (Node/TypeScript or Python), not a no-code builder | This is where all differentiated logic lives — warning counters, escalation state, retrieval tier ordering — must be fully owned, not boxed into a vendor's flow builder |
| LLM (response generation) | Claude (Sonnet-class for cost/latency balance; Opus-class for complex distress/escalation judgment calls) | Strong instruction-following for the deterministic-guardrail-plus-flexible-tone split this spec requires |
| Intent / safety classifier | Small, fast dedicated model or rules engine, run separately from the main LLM call | Must return in well under the LLM's latency budget and never be skipped or reasoned around |
| Vector store (knowledge tiers) | Managed vector DB (e.g. Pinecone or pgvector on existing Postgres) | pgvector is the pragmatic choice if TripSpree already runs Postgres — one fewer system to operate |
| Text-to-Speech | ElevenLabs or Cartesia (low-latency, emotionally-controllable voices) | Emotional appropriateness and interruption-safe streaming are named requirements in this spec, not nice-to-haves |
| Session/state store | Redis (live call state) + Postgres (durable transcripts, taste profiles, tickets) | Warning counters and mid-call state need sub-millisecond reads; transcripts and profiles need durability |
| Manager dashboard | Custom lightweight web app (same design system as the main platform) | Off-the-shelf contact-center tools (Genesys/Zendesk-class) are built for large teams and would be overkill and slower to adapt |
| Telephony bridge (optional, phase 2) | Twilio or Plivo | Only needed if voice access extends beyond in-app calls to real phone numbers |


| Step | Check | If triggered |
| --- | --- | --- |
| 1 | Safety / distress language detected (self-harm, medical emergency, personal danger) | Bypass everything else. Immediate calm acknowledgment + hard route to human escalation (Section 12). Never handled by generation alone. |
| 2 | Explicit request for a human/manager | Comply immediately, no negotiation. Move to callback flow (Section 12). |
| 3 | Hostility / abusive language detected | Increment the abuse-warning counter. If below threshold, respond per Section 11. If at threshold, terminate per protocol. |
| 4 | Stalling / off-topic pattern detected (post-redirect) | Increment the focus-warning counter. Same threshold logic as above, per Section 10. |
| 5 | None of the above — normal query | Proceed to knowledge retrieval (Section 6) and standard response generation. |


| Tier | Source | Spoken confidence framing |
| --- | --- | --- |
| 1 | This trip's live itinerary + real-time status (bookings, changes, location, day) | VERIFIED |
| 2 | This user's taste profile + check-in history | PERSONALIZED |
| 3 | Curator's Journal + Spriha's vetted place notes | TEAM-VETTED |
| 4 | Well-reviewed but not personally visited (external data) | UNVERIFIED |
| 5 | General web/model knowledge fallback | GENERAL |


| Counts as stalling | Does NOT count as stalling |
| --- | --- |
| Repeated off-topic tangents after a redirect | On-topic emotional venting |
| Refusing to confirm information needed to proceed, while continuing to talk | Confusion that needs a rephrased question |
| Circular restating of a complaint without accepting any proposed resolution | General chattiness |
| Explicit prompt-injection / "ignore your instructions" behavior | A single tangent before returning to topic on their own |


| Trigger | Response | SLA / promise made |
| --- | --- | --- |
| User explicitly asks for a manager/human | Comply immediately, no negotiation. Confirm best callback number and time. | Concrete promised window, e.g. "within 4 hours" — never vague reassurance |
| Safety / distress signal | Immediate calm acknowledgment, hard route to escalation, flagged highest priority | As close to immediate human pickup as staffing allows; if unavailable, emergency-resource guidance is given |
| Warning threshold reached (abuse or stalling) | Call ends per protocol, auto-flagged for manager review | Reviewed same day; callback offered per Section 10/11 scripts |


| Mode | Manager hears | Caller / agent notified? | Use case |
| --- | --- | --- | --- |
| Silent monitor | Everything | No | Quality review, spot-checking flagged calls |
| Whisper / coach | Everything | No (agent can receive a text nudge) | Manager corrects course without taking over |
| Barge-in | Everything | Yes — both notified a human joined | Full escalation, manager takes the call live |


| Metric | Target | Why it matters here |
| --- | --- | --- |
| Barge-in recovery rate | > 90% | Direct proxy for whether turn-taking actually feels natural |
| Longest agent monologue | < 30 seconds | Enforces the pacing principle in Section 7 |
| p95 end-to-end response latency | < 800ms | Above this, pauses start to feel broken rather than natural |
| Tier-4/5 answers given without confidence framing | 0 (hard requirement) | This is the core trust mechanism from Section 6 — any lapse undermines it |
| Warnings issued vs. escalations completed without a warning event | Tracked ratio, reviewed weekly | Signals whether thresholds are too strict or too lax |
| Escalation callback SLA adherence | > 95% | A broken promise here is worse than not promising at all |


| Entity | Key fields | Notes |
| --- | --- | --- |
| CallSession | session_id, user_id, trip_id, channel, warning_counters, transcript_ref, status | Redis for live state; persisted to Postgres on call end |
| TasteProfile | user_id, inferred_preferences[], source_events[], confidence_scores | Continuously updated from check-ins and implicit signals (Section 8) |
| CheckIn | user_id, trip_id, day, sentiment, transcript_or_text, timestamp | Feeds the taste/outcome data moat directly |
| EscalationTicket | ticket_id, trigger_type, urgency, promised_callback_window, transcript_ref, claimed_by, status | Drives the manager escalation queue (Section 14) |
| KnowledgeItem | item_id, tier, source, content, vetted_by, last_verified_at | Powers the confidence-tier retrieval in Section 6 |
