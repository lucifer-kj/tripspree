import type { ConfidenceTier, ConfidenceLabel, RetrievedKnowledge, SessionState } from './types.js';

// Vetted curator notes matching Journal and sanctuaries
const VETTED_SANCTUARIES: Record<string, { title: string; note: string; location: string }> = {
  amanemu: {
    title: 'Amanemu',
    location: 'Ise-Shima National Park',
    note: 'Natural onsen fed by mineral springs, overlooking Ago Bay. Minimalist cedar pavilions designed by Kerry Hill. Absolute quietude.',
  },
  benesse: {
    title: 'Benesse House Oval',
    location: 'Naoshima',
    note: 'Six guest suites accessed via private monorail on the hill above Tadao Ando museum. Intimate art sanctuary after museum hours.',
  },
  sowaka: {
    title: 'Sowaka Ryokan',
    location: 'Gion Yasaka, Kyoto',
    note: 'Restored 100-year-old sukiya-style teahouse with moss courtyard gardens and cedar soaking tubs. Unobtrusive hospitality.',
  },
  hoshinoya: {
    title: 'Hoshinoya Kyoto',
    location: 'Arashiyama',
    note: 'Accessible only by private wooden boat gliding up the Oi River. Centuries-old riverside sanctuary shaded by wild maples.',
  },
};

export async function retrieveKnowledgeTier(
  transcript: string,
  session: SessionState,
  timeoutMs = 300
): Promise<RetrievedKnowledge> {
  const retrievalPromise = (async (): Promise<RetrievedKnowledge> => {
    const q = transcript.toLowerCase();

    // TIER 1: Live Trip Itinerary & Bookings (Highest Priority)
    if (
      q.includes('today') ||
      q.includes('schedule') ||
      q.includes('reservation') ||
      q.includes('hotel') ||
      q.includes('itinerary') ||
      q.includes('day') ||
      q.includes('dinner')
    ) {
      const itin = session.activeItinerary;
      if (itin) {
        return {
          tier: 1,
          label: 'VERIFIED',
          spokenConfidenceFraming: 'VERIFIED',
          content: `Day ${itin.dayNumber} in ${itin.destination}. Hotel: ${itin.hotel}. Morning: ${itin.morning}. Afternoon: ${itin.afternoon}. Evening: ${itin.evening}.`,
        };
      }
    }

    // TIER 2: Traveler Taste Profile & Past Preferences
    if (
      q.includes('preference') ||
      q.includes('taste') ||
      q.includes('like') ||
      q.includes('quiet') ||
      q.includes('counter') ||
      q.includes('bath') ||
      q.includes('pace')
    ) {
      const tp = session.tasteProfile;
      if (tp) {
        return {
          tier: 2,
          label: 'PERSONALIZED',
          spokenConfidenceFraming: 'PERSONALIZED',
          content: `Traveler Taste Profile: ${tp.notes?.join('; ')}. Preferred pace: ${tp.preferredPace}. Architectural purity score: ${tp.architecturalPurity}.`,
        };
      }
    }

    // TIER 3: Curator's Journal & Spriha's Vetted Notes
    for (const [key, sanctuary] of Object.entries(VETTED_SANCTUARIES)) {
      if (q.includes(key) || q.includes(sanctuary.title.toLowerCase()) || q.includes(sanctuary.location.toLowerCase())) {
        return {
          tier: 3,
          label: 'TEAM-VETTED',
          spokenConfidenceFraming: 'TEAM-VETTED',
          content: `Spriha's Vetted Sanctuary Notes for ${sanctuary.title} (${sanctuary.location}): ${sanctuary.note}`,
        };
      }
    }

    // TIER 4: Well-reviewed External Recommendations (Nearby places, weather, transit)
    if (
      q.includes('weather') ||
      q.includes('train') ||
      q.includes('shinkansen') ||
      q.includes('nearby') ||
      q.includes('coffee') ||
      q.includes('walk')
    ) {
      return {
        tier: 4,
        label: 'UNVERIFIED',
        spokenConfidenceFraming: "I haven't personally checked this one, but it's well-reviewed",
        content: `External live feed: Weather in Ise-Shima is clear, 18°C. Local coastal walking paths to Ago Bay lookout are open until dusk. Nearest curated pour-over is 12 minutes by foot.`,
      };
    }

    // TIER 5: General LLM Fallback
    return {
      tier: 5,
      label: 'GENERAL',
      spokenConfidenceFraming: "From general knowledge, though we haven't verified this locally",
      content: `General travel insights and cultural observations.`,
    };
  })();

  // 300ms Internal Timeout Guard to prevent webhook timeouts
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<RetrievedKnowledge>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`[Knowledge] Retrieval exceeded ${timeoutMs}ms; degrading to Tier 5 fallback.`);
      resolve({
        tier: 5,
        label: 'GENERAL',
        spokenConfidenceFraming: "From general knowledge, though we haven't verified this locally",
        content: 'Fallback response context due to latency safeguard.',
      });
    }, timeoutMs);
  });

  try {
    const res = await Promise.race([retrievalPromise, timeoutPromise]);
    clearTimeout(timer!);
    return res;
  } catch (err) {
    clearTimeout(timer!);
    throw err;
  }
}
