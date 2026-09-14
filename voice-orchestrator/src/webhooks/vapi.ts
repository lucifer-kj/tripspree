import { Request, Response } from 'express';
import crypto from 'crypto';
import { runOrchestrateTurn } from '../orchestrator/workflow.js';
import type { TurnInput } from '../orchestrator/types.js';

const VAPI_WEBHOOK_SECRET = process.env.VAPI_WEBHOOK_SECRET || '';

export function verifyVapiSignature(req: Request): boolean {
  if (!VAPI_WEBHOOK_SECRET) {
    // In local dev/testing without secret configured, permit requests
    return true;
  }

  // Vapi can provide secret in header 'x-vapi-secret' or HMAC signature in 'x-vapi-signature'
  const headerSecret = req.headers['x-vapi-secret'];
  if (headerSecret && headerSecret === VAPI_WEBHOOK_SECRET) {
    return true;
  }

  const signature = req.headers['x-vapi-signature'] as string | undefined;
  if (!signature) {
    return false;
  }

  try {
    const rawBody = (req as any).rawBody || JSON.stringify(req.body);
    const computed = crypto
      .createHmac('sha256', VAPI_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed));
  } catch (err) {
    return false;
  }
}

export async function handleVapiWebhook(req: Request, res: Response): Promise<void> {
  if (!verifyVapiSignature(req)) {
    console.warn('[Vapi Webhook] Signature verification failed.');
    res.status(401).json({ error: 'Unauthorized: Invalid Vapi signature' });
    return;
  }

  const payload = req.body;
  const message = payload?.message;

  if (!message || !message.type) {
    res.status(400).json({ error: 'Bad Request: Missing message payload' });
    return;
  }

  const callId = message.call?.id || 'unknown_call';

  // 1. TOOL-CALLS (Transport calls orchestrate_turn)
  if (message.type === 'tool-calls') {
    const toolCallList = message.toolCallList || [];
    const results: Array<{ toolCallId: string; result: string }> = [];

    for (const toolCall of toolCallList) {
      if (toolCall.function?.name === 'orchestrate_turn') {
        const rawArgs = toolCall.function.arguments;
        const args: any = typeof rawArgs === 'string' ? JSON.parse(rawArgs) : rawArgs || {};

        const turnInput: TurnInput = {
          callId: args.callId || callId,
          transcript: args.transcript || '',
          tripId: args.tripId,
          userId: args.userId,
          currentSanctuary: args.currentSanctuary,
        };

        const turnOutput = await runOrchestrateTurn(turnInput);

        results.push({
          toolCallId: toolCall.id,
          result: turnOutput.spokenResponse,
        });

        // If termination or escalation was triggered, trigger control URL if provided
        if (
          (turnOutput.action === 'terminateCall' || turnOutput.action === 'escalateImmediately') &&
          message.call?.monitor?.controlUrl
        ) {
          try {
            fetch(message.call.monitor.controlUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                command: turnOutput.action === 'terminateCall' ? 'end-call' : 'transfer-call',
              }),
            }).catch(() => {});
          } catch {
            // Non-blocking
          }
        }
      }
    }

    res.status(200).json({ results });
    return;
  }

  // 2. ASSISTANT-REQUEST (Hard < 500ms response to stay well inside Vapi's 7.5s limit)
  if (message.type === 'assistant-request') {
    res.status(200).json({
      assistant: {
        name: 'Quiet Concierge',
        firstMessage:
          "Good evening. I'm with you — how can I assist with your journey tonight?",
      },
    });
    return;
  }

  // 3. END-OF-CALL-REPORT (Durable summary and audit logging)
  if (message.type === 'end-of-call-report') {
    const summary = message.summary || message.analysis?.summary;
    const duration = message.durationSeconds || message.duration;
    console.log(`[Vapi] Call ${callId} ended. Duration: ${duration}s. Summary: ${summary || 'N/A'}`);
    res.status(200).json({ status: 'received' });
    return;
  }

  // 4. STATUS-UPDATE & OTHERS
  res.status(200).json({ status: 'acknowledged' });
}
