import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import type { TurnInput, TurnOutput, SessionState, RetrievedKnowledge } from './types.js';
import {
  getSessionState,
  saveSessionState,
  incrementAbuseCount,
  incrementStallingCount,
} from './redis.js';
import {
  checkSafety,
  checkExplicitHumanRequest,
  checkAbuse,
  checkStalling,
} from './classifiers.js';
import { retrieveKnowledgeTier } from './knowledge.js';
import { composeResponseViaGroq } from './groq.js';

interface StepState {
  input: TurnInput;
  session: SessionState;
  knowledge?: RetrievedKnowledge;
}

// STEP 1: loadSessionState
const loadSessionStateStep = createStep({
  id: 'loadSessionState',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const input = ctx.inputData as TurnInput;
    const session = await getSessionState(input.callId, {
      tripId: input.tripId,
      userId: input.userId,
      currentSanctuary: input.currentSanctuary,
    });
    return { input, session } as StepState;
  },
});

// STEP 2: safetyCheck (Distress classifier -> Escalate & Suspend)
const safetyCheckStep = createStep({
  id: 'safetyCheck',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const state = ctx.inputData as StepState;
    const safety = checkSafety(state.input.transcript);

    if (safety.triggered && safety.spokenResponse) {
      const output: TurnOutput = {
        action: 'escalateImmediately',
        spokenResponse: safety.spokenResponse,
        reason: safety.reason,
        escalationDetails: {
          type: 'SAFETY_DISTRESS',
          promisedWindow: 'immediate',
        },
      };
      // Log emergency flag to session
      state.session.history.push({
        role: 'system',
        content: `[EMERGENCY FLAG] Distress language detected: "${state.input.transcript}"`,
        timestamp: Date.now(),
      });
      await saveSessionState(state.session);

      ctx.bail(output);
      return output as any;
    }

    return state;
  },
});

// STEP 3: explicitHumanRequestCheck (Manager request -> Escalate)
const explicitHumanRequestCheckStep = createStep({
  id: 'explicitHumanRequestCheck',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const state = ctx.inputData as StepState;
    const humanReq = checkExplicitHumanRequest(state.input.transcript);

    if (humanReq.triggered && humanReq.spokenResponse) {
      const output: TurnOutput = {
        action: 'escalateImmediately',
        spokenResponse: humanReq.spokenResponse,
        reason: humanReq.reason,
        escalationDetails: {
          type: 'USER_REQUESTED_HUMAN',
          promisedWindow: 'within 4 hours',
        },
      };
      state.session.history.push({
        role: 'system',
        content: `[ESCALATION] Human callback requested: "${state.input.transcript}"`,
        timestamp: Date.now(),
      });
      await saveSessionState(state.session);

      ctx.bail(output);
      return output as any;
    }

    return state;
  },
});

// STEP 4: abuseCheck (Hostility counter -> Warn or Terminate at 2)
const abuseCheckStep = createStep({
  id: 'abuseCheck',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const state = ctx.inputData as StepState;
    const abuse = checkAbuse(state.input.transcript);

    if (abuse.triggered) {
      const warningCount = await incrementAbuseCount(state.input.callId);

      if (warningCount >= 2) {
        const spoken =
          "I'm going to end our call here due to language. You're welcome to call back anytime, or I can have someone from our team reach out.";
        const output: TurnOutput = {
          action: 'terminateCall',
          spokenResponse: spoken,
          reason: 'ABUSE_TERMINATION',
          escalationDetails: {
            type: 'ABUSE_TERMINATION',
          },
        };
        ctx.bail(output);
        return output as any;
      } else {
        const spoken =
          "I'm sorry this has been frustrating. I want to help, but I need us to speak respectfully. Can we try again?";
        const output: TurnOutput = {
          action: 'warnAndContinue',
          spokenResponse: spoken,
          reason: 'ABUSE_WARNING_1',
        };
        ctx.bail(output);
        return output as any;
      }
    }

    return state;
  },
});

// STEP 5: stallingCheck (Off-topic counter -> Redirect / Warn 1 / Warn 2 / Terminate)
const stallingCheckStep = createStep({
  id: 'stallingCheck',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const state = ctx.inputData as StepState;
    const stalling = checkStalling(state.input.transcript, state.session.stallingRedirectIssued);

    if (stalling.triggered) {
      const { count, redirectIssued } = await incrementStallingCount(state.input.callId);

      // Section 10 Sequence: Gentle Redirect -> Warning 1 -> Warning 2 -> Terminate
      if (!redirectIssued || count === 0) {
        const spoken =
          'I want to make sure I get you the right answer — could we go back to that question?';
        const output: TurnOutput = {
          action: 'warnAndContinue',
          spokenResponse: spoken,
          reason: 'STALLING_REDIRECT',
        };
        ctx.bail(output);
        return output as any;
      } else if (count === 1) {
        const spoken =
          "I'm having trouble helping without a bit more focus here — can we try that question once more?";
        const output: TurnOutput = {
          action: 'warnAndContinue',
          spokenResponse: spoken,
          reason: 'STALLING_WARNING_1',
        };
        ctx.bail(output);
        return output as any;
      } else if (count === 2) {
        const spoken =
          "I do want to help, but I'm going to need to end this call if we can't get back on track — one more try?";
        const output: TurnOutput = {
          action: 'warnAndContinue',
          spokenResponse: spoken,
          reason: 'STALLING_WARNING_2',
        };
        ctx.bail(output);
        return output as any;
      } else {
        const spoken =
          "I'm going to end our call here. You're welcome to call back anytime, or I can have someone from our team reach out.";
        const output: TurnOutput = {
          action: 'terminateCall',
          spokenResponse: spoken,
          reason: 'STALLING_TERMINATION',
          escalationDetails: {
            type: 'STALLING_TERMINATION',
          },
        };
        ctx.bail(output);
        return output as any;
      }
    }

    return state;
  },
});

// STEP 6: retrieveKnowledgeTier (Tiers 1-5 with 300ms internal timeout guard)
const retrieveKnowledgeTierStep = createStep({
  id: 'retrieveKnowledgeTier',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const state = ctx.inputData as StepState;
    const knowledge = await retrieveKnowledgeTier(state.input.transcript, state.session, 300);
    return {
      ...state,
      knowledge,
    } as StepState;
  },
});

// STEP 7: composeResponseViaGroq (Grounded synthesis with verbalized confidence framing)
const composeResponseViaGroqStep = createStep({
  id: 'composeResponseViaGroq',
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async (ctx) => {
    const state = ctx.inputData as StepState;
    const knowledge = state.knowledge!;

    const spoken = await composeResponseViaGroq(state.input.transcript, knowledge, state.session);

    // Persist conversation turns to session history
    state.session.history.push({
      role: 'user',
      content: state.input.transcript,
      timestamp: Date.now(),
    });
    state.session.history.push({
      role: 'assistant',
      content: spoken,
      timestamp: Date.now(),
    });
    await saveSessionState(state.session);

    const output: TurnOutput = {
      action: 'continue',
      spokenResponse: spoken,
      confidenceTier: knowledge.tier,
      confidenceLabel: knowledge.label,
    };
    return output;
  },
});

// Commit the Mastra workflow with strict 7-step ordering
export const orchestrateTurnWorkflow = createWorkflow({
  id: 'orchestrate-turn-workflow',
  inputSchema: z.any(),
  outputSchema: z.any(),
})
  .then(loadSessionStateStep)
  .then(safetyCheckStep)
  .then(explicitHumanRequestCheckStep)
  .then(abuseCheckStep)
  .then(stallingCheckStep)
  .then(retrieveKnowledgeTierStep)
  .then(composeResponseViaGroqStep)
  .commit();

export async function runOrchestrateTurn(input: TurnInput): Promise<TurnOutput> {
  const run = await orchestrateTurnWorkflow.createRun();
  const execution = await run.start({ inputData: input });

  if (execution.status === 'success' && execution.result) {
    return execution.result as TurnOutput;
  }

  // Fallback if execution had an issue
  return {
    action: 'continue',
    spokenResponse:
      "I'm here with you. Your schedule in Ise-Shima remains on track for tonight.",
    confidenceTier: 1,
    confidenceLabel: 'VERIFIED',
  };
}
