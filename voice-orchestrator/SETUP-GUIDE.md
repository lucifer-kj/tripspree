# TripSpree Voice Agent — Vapi + Mastra + Groq Setup Guide

This is a step-by-step build guide with copy-paste prompts, sequenced so
each step produces something testable before moving to the next. Follow
the order — do not build the Mastra orchestrator before Vapi can actually
reach it, and don't wire the app before the orchestrator responds correctly
in isolation.

**Stack recap:** Vapi = transport/STT/TTS only. Mastra = the decision-tree
orchestrator (Section 5 of the voice spec), running as a workflow in your
own backend. Groq = the LLM, called only after the decision tree resolves
what to say. Nothing about escalation, warnings, or confidence tiers ever
lives inside Vapi's own config — only inside your Mastra workflow.

---

## Step 0 — Accounts and keys (5 minutes, no prompts needed)

1. Create a Vapi account at vapi.ai. You get $10 in trial credit,
   no card required — enough for roughly 60-200 minutes of testing
   depending on providers, per Vapi's own pricing page. There is no
   ongoing free tier beyond this credit, so budget your testing.
2. Grab your Vapi **private API key** (dashboard → API Keys) — this is
   different from the public key used in frontend SDK calls. Keep the
   private key server-side only, never in the Next.js app.
3. Create a Groq account at console.groq.com and generate an API key.
4. You'll need a way to expose your local backend to Vapi during
   development — either the Vapi CLI's built-in tunnel forwarding or
   ngrok. Install whichever you prefer before Step 3 below.

---

## Step 1 — Scaffold the Mastra orchestrator backend

This creates `voice-orchestrator/` as a standalone Node service alongside
your Next.js app (not inside it) — it needs to run as its own server so
Vapi can reach it independently of your frontend's deploy cycle.

### Prompt for Antigravity (Planning mode):

```
Scaffold a new standalone Node/TypeScript backend service in
voice-orchestrator/, separate from the main Next.js app. Install Mastra
and set up a basic project structure: src/webhooks/ for Vapi webhook
handlers, src/orchestrator/ for the Mastra workflow definition,
src/config/ for the Vapi assistant JSON config. Add a .env.example with
VAPI_API_KEY, VAPI_PUBLIC_KEY, GROQ_API_KEY, REDIS_URL, and
ANTHROPIC_API_KEY placeholders. Do not implement any orchestration logic
yet — this task is scaffolding only. Add a simple Express (or Fastify)
server with a health-check route and one placeholder POST route at
/webhooks/vapi that just logs the request body and returns {}.
```

Review the plan: confirm it did NOT try to put this inside the Next.js
`app/api/` routes — it needs to be genuinely standalone so it can be
deployed and scaled independently of the frontend.

---

## Step 2 — Wire up local testing with Vapi CLI before writing any logic

Do this before writing the orchestrator so you can see real Vapi webhook
payloads hit your server, rather than guessing at the shape.

### Terminal commands (not an Antigravity prompt — run these yourself):

```bash
npm install -g @vapi-ai/cli
vapi login

# Terminal 1: expose your local server
vapi listen --forward-to localhost:3001/webhooks/vapi

# Terminal 2: run your orchestrator
cd voice-orchestrator && npm run dev
```

Note the public URL the CLI gives you — you'll paste this into the Vapi
dashboard as your assistant's Server URL in Step 4.

---

## Step 3 — Build the Mastra orchestrator workflow (the real logic)

### Prompt for Antigravity (Planning mode):

```
In voice-orchestrator/src/orchestrator/, build a Mastra workflow called
orchestrateTurnWorkflow implementing this exact decision sequence, in
strict order, matching docs/voice-agent-specification.md Section 5:

1. loadSessionState — read warning counters and trip/taste-profile
   context from Redis, keyed by the Vapi call ID.
2. safetyCheck — a fast rules-based classifier (not an LLM call) for
   distress/safety language. If triggered, branch to escalateImmediately
   and suspend the workflow.
3. explicitHumanRequestCheck — detect direct requests for a
   human/manager. If triggered, branch to escalateImmediately.
4. abuseCheck — increment a Redis-backed counter on hostile language.
   Branch to terminateCall if at threshold (2 warnings), or
   warnAndContinue with the appropriate scripted line if below threshold.
5. stallingCheck — same shape as abuseCheck, separate counter, per
   Section 10's stalling patterns (not the same triggers as abuse).
6. retrieveKnowledgeTier — query the confidence tiers from Section 6 in
   order (trip data, taste profile, vetted knowledge, external,
   general fallback). Build this with a hard internal timeout
   (300ms) that falls through to the general-fallback tier rather than
   blocking, since the full webhook response must complete well inside
   Vapi's 7.5-second assistant-request timeout.
7. composeResponseViaGroq — only this final step calls the Groq API
   (model: openai/gpt-oss-120b, configurable via env var), composing the
   actual spoken response using the confidence tier's framing rules
   from Section 6 and the phrasing rules from Sections 7-13.

Use Mastra's suspend/resume for escalateImmediately and terminateCall —
these should not just return a response, they should suspend the
workflow pending a manager action (for escalation) or log a terminal
state (for termination), matching the "never disconnect without saying
so" rule.

Write this with realistic but clearly-marked placeholder logic for the
classifiers (safetyCheck, abuseCheck, stallingCheck) — flag these
explicitly as "REPLACE WITH REAL CLASSIFIER" since building an accurate
safety classifier is a separate, careful task, not something to guess at
in this scaffolding pass.
```

Review this plan carefully — this is the highest-stakes file in the whole
system. Confirm the branch conditions match Section 5's strict ordering
(safety check must run before anything else, no exceptions) before
approving.

---

## Step 4 — Create the Vapi assistant and point it at your orchestrator

This step happens partly in the Vapi dashboard (not Antigravity) and
partly as a prompt, since the assistant config is a one-time JSON setup.

### In the Vapi dashboard:
1. Create a new Assistant.
2. Set the **Model** to a lightweight bundled option — this model's only
   job is deciding to call your tool, not composing real answers, since
   Groq (in your own backend) does that.
3. Add a **Function Tool** named `orchestrate_turn`, with parameters
   matching the current transcript and call metadata.
4. Set the tool's **Server URL** to your `voice-orchestrator` endpoint
   (the ngrok/Vapi CLI tunnel URL during dev, your real deployed URL in
   production).
5. In the assistant's system prompt, instruct it plainly: "Always call
   orchestrate_turn with the user's message. Never answer directly."
   This is what keeps Vapi a dumb pipe.

### Prompt for Antigravity (once you have the tool/assistant IDs):

```
In voice-orchestrator/src/config/vapi-assistant.json, write the assistant
configuration matching what was created in the Vapi dashboard: the
orchestrate_turn function tool definition, its parameter schema
(transcript, callId, and any trip/user metadata passed at call start),
and the system prompt instructing the model to always call the tool and
never answer directly. This file is a reference copy of the dashboard
config for version control — it does not need to programmatically push
to Vapi yet.
```

---

## Step 5 — Implement the webhook handlers properly

### Prompt for Antigravity (Planning mode):

```
Replace the placeholder /webhooks/vapi route in
voice-orchestrator/src/webhooks/ with three real handlers, dispatched by
message.type:

1. tool-calls — extract the toolCallList, run orchestrateTurnWorkflow
   with the transcript and call context, and respond within the format
   Vapi requires: { "results": [{ "toolCallId": ..., "result": ... }] }.
   If the workflow's decision was escalateImmediately or terminateCall,
   also call the call's monitor.controlUrl (included in the webhook
   payload) to transfer or end the call, per Section 12's escalation
   flow.
2. assistant-request — used only if a call comes in with no pre-assigned
   assistant; return the standard assistant config. This handler has a
   hard 7.5-second timeout per Vapi's docs, so keep it trivial — no
   workflow calls here.
3. end-of-call-report — extract the full transcript and call summary,
   write it to Postgres, and enqueue a job to update the user's
   Provenance Trail and taste profile (per the earlier systems
   discussion) — do not do this synchronously in the webhook handler
   itself, queue it so the webhook returns fast.

Add signature verification on all three handlers using the shared secret
from Vapi's dashboard, checked before any processing — reject
unverified requests immediately.
```

---

## Step 6 — Connect the frontend "Talk it through" button

### Prompt for Antigravity (Planning mode):

```
In the main Next.js app, implement the "Talk it through" entry point in
the Trip Designer (per app-screens.md) using Vapi's Web SDK. On tap,
start a call using the PUBLIC Vapi key (never the private key) and the
assistant ID from Step 4, passing the current trip ID and user ID as
call metadata so the orchestrator has context from the first turn.

Load the Vapi Web SDK lazily — it should not be part of the initial
bundle for the Trip Designer page, per the tech-stack note in AGENTS.md
about deferring voice dependencies until actually invoked.

Show a minimal in-call UI: a waveform or listening indicator, a mute
button, and an end-call button. Do not build a full transcript view for
v1 — that lives in the manager dashboard, not the traveler-facing UI.
```

---

## Step 7 — Test end to end before adding the manager dashboard

Before building Section 14's dashboard, do a manual test pass:

1. Start a call from the app.
2. Say something that should hit Tier 3 knowledge (a destination
   question).
3. Say something that should trigger a warning (mild off-topic
   stalling).
4. Say "let me talk to a manager" and confirm the call-control transfer
   fires correctly.
5. Check Redis to confirm warning counters persisted correctly across
   turns within the same call.

Only once this passes should you move on to building the manager
dashboard (Section 14) as a separate build phase — it consumes the same
`end-of-call-report` and warning-log data this pipeline already produces.

---

## Cost management while testing

- The $10 Vapi trial credit is a hard, one-time budget — track it in the
  Vapi dashboard, not by guessing.
- Groq's pricing is per-token and separate from Vapi's platform fee;
  since `composeResponseViaGroq` is the only step that calls an LLM,
  your real per-call cost is dominated by Vapi's $0.05/min platform fee
  plus whatever STT/TTS Vapi bundles by default, not by Groq.
- When ready to reduce cost further, the two highest-leverage swaps are:
  (1) point Vapi's STT provider at Groq's own Whisper endpoint instead of
  Vapi's bundled default, and (2) confirm which Groq model you're using
  hasn't hit end-of-life — `llama-3.3-70b-versatile` and a few others are
  flagged for deprecation on free/developer tiers, so keep the model name
  in an env var (already scaffolded in Step 3) rather than hardcoded, to
  swap without a redeploy.
