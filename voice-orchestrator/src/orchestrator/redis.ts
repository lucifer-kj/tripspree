import { Redis } from 'ioredis';
import type { SessionState } from './types.js';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// In-memory fallback map for environments without a live Redis server
const memoryStore = new Map<string, SessionState>();

let redisClient: Redis | null = null;
let redisAvailable = false;

try {
  redisClient = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 1,
    retryStrategy: () => null, // Do not hang on reconnection attempts
    enableOfflineQueue: false,
    connectTimeout: 500,
  });

  redisClient.on('connect', () => {
    redisAvailable = true;
    console.log('[Redis] Connected to Redis session store.');
  });

  redisClient.on('error', (err) => {
    if (redisAvailable) {
      console.warn('[Redis] Connection lost, falling back to memory store:', err.message);
    }
    redisAvailable = false;
  });
} catch (e) {
  redisAvailable = false;
  console.warn('[Redis] Initialization skipped, using memory store.');
}

const SESSION_TTL_SECONDS = 3600; // 1 hour call session TTL

export async function getSessionState(callId: string, initialMeta?: Partial<SessionState>): Promise<SessionState> {
  if (redisAvailable && redisClient) {
    try {
      const raw = await redisClient.get(`session:${callId}`);
      if (raw) {
        return JSON.parse(raw) as SessionState;
      }
    } catch {
      // Fallback
    }
  }

  if (memoryStore.has(callId)) {
    return memoryStore.get(callId)!;
  }

  // Create initial session
  const defaultState: SessionState = {
    callId,
    tripId: initialMeta?.tripId,
    userId: initialMeta?.userId,
    currentSanctuary: initialMeta?.currentSanctuary || 'Amanemu (Ise-Shima)',
    abuseWarnings: 0,
    stallingWarnings: 0,
    stallingRedirectIssued: false,
    history: [],
    tasteProfile: {
      architecturalPurity: 0.94,
      lightAndShadow: 0.88,
      culinaryIntimacy: 0.96,
      preferredPace: 'Unrushed contemplation',
      notes: ['Prefers counter dining under 8 seats', 'Favors cedar bath scents and quiet ocean views'],
    },
    activeItinerary: {
      dayNumber: 3,
      destination: 'Ise-Shima National Park',
      hotel: 'Amanemu',
      morning: 'Private tea tasting with master in Uji foothills',
      afternoon: 'Coastal transfer & thermal bath recovery',
      evening: 'Seven-seat omakase with Chef Sato',
    },
  };

  await saveSessionState(defaultState);
  return defaultState;
}

export async function saveSessionState(state: SessionState): Promise<void> {
  memoryStore.set(state.callId, state);

  if (redisAvailable && redisClient) {
    try {
      await redisClient.setex(
        `session:${state.callId}`,
        SESSION_TTL_SECONDS,
        JSON.stringify(state)
      );
    } catch {
      // Silent catch, fallback is already in memoryStore
    }
  }
}

export async function incrementAbuseCount(callId: string): Promise<number> {
  const session = await getSessionState(callId);
  session.abuseWarnings += 1;
  await saveSessionState(session);
  return session.abuseWarnings;
}

export async function incrementStallingCount(callId: string): Promise<{ count: number; redirectIssued: boolean }> {
  const session = await getSessionState(callId);
  if (!session.stallingRedirectIssued) {
    session.stallingRedirectIssued = true;
  } else {
    session.stallingWarnings += 1;
  }
  await saveSessionState(session);
  return {
    count: session.stallingWarnings,
    redirectIssued: session.stallingRedirectIssued,
  };
}

export async function clearSessionState(callId: string): Promise<void> {
  memoryStore.delete(callId);
  if (redisAvailable && redisClient) {
    try {
      await redisClient.del(`session:${callId}`);
    } catch {
      // Ignore
    }
  }
}
