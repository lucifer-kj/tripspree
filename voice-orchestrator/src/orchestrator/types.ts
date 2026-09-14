export type ConfidenceTier = 1 | 2 | 3 | 4 | 5;

export type ConfidenceLabel =
  | 'VERIFIED'
  | 'PERSONALIZED'
  | 'TEAM-VETTED'
  | 'UNVERIFIED'
  | 'GENERAL';

export type DecisionAction =
  | 'continue'
  | 'warnAndContinue'
  | 'escalateImmediately'
  | 'terminateCall';

export interface SessionState {
  callId: string;
  tripId?: string;
  userId?: string;
  currentSanctuary?: string;
  abuseWarnings: number;
  stallingWarnings: number;
  stallingRedirectIssued: boolean;
  history: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
  }>;
  tasteProfile?: {
    architecturalPurity?: number;
    lightAndShadow?: number;
    culinaryIntimacy?: number;
    preferredPace?: string;
    notes?: string[];
  };
  activeItinerary?: {
    dayNumber: number;
    destination: string;
    hotel?: string;
    morning?: string;
    afternoon?: string;
    evening?: string;
  };
}

export interface TurnInput {
  callId: string;
  transcript: string;
  tripId?: string;
  userId?: string;
  currentSanctuary?: string;
}

export interface RetrievedKnowledge {
  tier: ConfidenceTier;
  label: ConfidenceLabel;
  content: string;
  spokenConfidenceFraming: string;
}

export interface TurnOutput {
  action: DecisionAction;
  spokenResponse: string;
  reason?: string;
  confidenceTier?: ConfidenceTier;
  confidenceLabel?: ConfidenceLabel;
  escalationDetails?: {
    type: 'SAFETY_DISTRESS' | 'USER_REQUESTED_HUMAN' | 'ABUSE_TERMINATION' | 'STALLING_TERMINATION';
    promisedWindow?: string;
  };
}
