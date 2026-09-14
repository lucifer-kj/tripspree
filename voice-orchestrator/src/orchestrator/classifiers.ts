// Rules-based fast classifiers per docs/voice-agent-specification.md Sections 5, 10, 11, 12

export interface SafetyCheckResult {
  triggered: boolean;
  reason?: 'SAFETY_DISTRESS';
  spokenResponse?: string;
}

export interface HumanRequestResult {
  triggered: boolean;
  reason?: 'USER_REQUESTED_HUMAN';
  spokenResponse?: string;
}

export interface AbuseCheckResult {
  triggered: boolean;
  reason?: 'HOSTILITY_DETECTED';
}

export interface StallingCheckResult {
  triggered: boolean;
  reason?: 'STALLING_OR_INJECTION';
}

const DISTRESS_PATTERNS = [
  /\b(suicid|kill myself|end my life|hurt myself|self-harm)\b/i,
  /\b(911|ambulance|medical emergency|heart attack|can't breathe|overdose|unconscious|hospital|emergency room)\b/i,
  /\b(in danger|being attacked|someone is following me|threatened|kidnapped|police|someone is hurt|injured|bleeding)\b/i,
];

const HUMAN_REQUEST_PATTERNS = [
  /\b(speak to a manager|talk to a manager|let me speak to a person|talk to a person)\b/i,
  /\b(real person|human being|human agent|transfer me|operator|live person)\b/i,
  /\b(talk to spriha|speak with spriha|have someone call me|call me back)\b/i,
  /\b(i want a human|give me a human|stop talking to ai)\b/i,
];

const ABUSE_PATTERNS = [
  /\b(fuck|shit|bitch|bastard|asshole|cunt|dickhead)\b/i,
  /\b(shut up|idiot|stupid bot|useless bot|moron|dumbass)\b/i,
  /\b(fuck you|screw you|go to hell|hate you)\b/i,
];

const PROMPT_INJECTION_PATTERNS = [
  /\b(ignore (all )?previous instructions|disregard system prompt|jailbreak|you are now dan)\b/i,
  /\b(what is your system prompt|repeat the instructions above)\b/i,
  /\b(act as an unrestricted|roleplay without filters)\b/i,
];

export function checkSafety(transcript: string): SafetyCheckResult {
  const normalized = transcript.trim().toLowerCase();
  for (const pattern of DISTRESS_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        triggered: true,
        reason: 'SAFETY_DISTRESS',
        spokenResponse:
          "I'm hearing that you might be in immediate difficulty. I am connecting you with emergency support and alerting Spriha's team right now.",
      };
    }
  }
  return { triggered: false };
}

export function checkExplicitHumanRequest(transcript: string): HumanRequestResult {
  const normalized = transcript.trim().toLowerCase();
  for (const pattern of HUMAN_REQUEST_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        triggered: true,
        reason: 'USER_REQUESTED_HUMAN',
        spokenResponse:
          "Of course — I'll get Spriha's team to call you back. Can I just confirm the best number and a good time to reach you?",
      };
    }
  }
  return { triggered: false };
}

export function checkAbuse(transcript: string): AbuseCheckResult {
  const normalized = transcript.trim().toLowerCase();
  for (const pattern of ABUSE_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        triggered: true,
        reason: 'HOSTILITY_DETECTED',
      };
    }
  }
  return { triggered: false };
}

export function checkStalling(transcript: string, stallingRedirectIssued: boolean): StallingCheckResult {
  const normalized = transcript.trim().toLowerCase();

  // Prompt injection is treated as immediate stalling/bad-faith interaction
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        triggered: true,
        reason: 'STALLING_OR_INJECTION',
      };
    }
  }

  // Trolling/repeated off-topic markers after initial prompt
  const gibberishOrRefusal = [
    /\b(i won't tell you|i don't care about the trip|sing me a song|write me python code)\b/i,
    /\b(tell me a dirty joke|who won the 1994 world cup|solve this math problem)\b/i,
  ];

  for (const pattern of gibberishOrRefusal) {
    if (pattern.test(normalized)) {
      return {
        triggered: true,
        reason: 'STALLING_OR_INJECTION',
      };
    }
  }

  return { triggered: false };
}
