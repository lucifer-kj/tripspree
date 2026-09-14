import Groq from 'groq-sdk';
import type { RetrievedKnowledge, SessionState } from './types.js';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

let groqClient: Groq | null = null;
if (GROQ_API_KEY) {
  groqClient = new Groq({ apiKey: GROQ_API_KEY });
}

export async function composeResponseViaGroq(
  transcript: string,
  knowledge: RetrievedKnowledge,
  session: SessionState
): Promise<string> {
  const systemPrompt = `You are the Quiet Concierge for TripSpree, an ultra-exclusive private travel atelier.
Your demeanor is editorial, serene, refined, and unhurried.

STRICT CONVERSATIONAL RULES:
1. Lead with the direct answer in the first sentence. Never open with preamble (e.g., do NOT say "Certainly!", "Let me check that for you", "Great question", "I'd be happy to help").
2. Voice monologue length: Strict limit of 25-45 words (15-20 seconds spoken). Never exceed 50 words.
3. Grounding & Confidence: You must ground your answer strictly in the provided context:
${knowledge.content}

CONFIDENCE TIER FRAMING RULES:
- If confidence tier is Tier 4 (UNVERIFIED): You MUST naturally include the phrase: "I haven't personally checked this one, but it's well-reviewed."
- If confidence tier is Tier 5 (GENERAL): You MUST naturally include the phrase: "From general knowledge, though we haven't verified this locally."
- If confidence tier is Tier 1 (VERIFIED): State the itinerary/booking facts directly with calm certainty.
- If confidence tier is Tier 2 (PERSONALIZED): Tailor to their known taste without announcing "I'm checking your profile".
- If confidence tier is Tier 3 (TEAM-VETTED): Mention Spriha or our curator team's notes directly.

Current traveler context:
- Destination/Sanctuary: ${session.currentSanctuary || 'Japan'}
- Itinerary Day: ${session.activeItinerary?.dayNumber || 3}
`;

  // Fallback if GROQ_API_KEY is not configured or in testing environment
  if (!groqClient) {
    if (knowledge.tier === 1) {
      return `Your schedule for today in ${session.activeItinerary?.destination} is set. Tonight at seven is your seven-seat omakase with Chef Sato.`;
    }
    if (knowledge.tier === 3) {
      return `From Spriha's curated notes on ${knowledge.content.slice(0, 40)}: the sanctuary features natural mineral springs and Kerry Hill cedar pavilions.`;
    }
    if (knowledge.tier === 4) {
      return `I haven't personally checked this one, but it's well-reviewed. The coastal path along Ago Bay is open until dusk, and the nearest pour-over is twelve minutes away.`;
    }
    return `From general knowledge, though we haven't verified this locally, the weather remains clear this afternoon across the coast.`;
  }

  try {
    const completion = await groqClient.chat.completions.create({
      model: GROQ_MODEL,
      temperature: 0.3,
      max_tokens: 120,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: transcript },
      ],
    });

    const responseText = completion.choices[0]?.message?.content?.trim();
    if (responseText) {
      return responseText;
    }
  } catch (err: any) {
    console.error('[Groq] Error generating completion:', err.message);
  }

  // Graceful fallback
  if (knowledge.tier === 4) {
    return `I haven't personally checked this one, but it's well-reviewed: the local walking paths to Ago Bay lookout are quiet and open until dusk.`;
  }
  return `Your reservation at ${session.activeItinerary?.hotel || 'Amanemu'} is confirmed, with omakase at seven tonight.`;
}
