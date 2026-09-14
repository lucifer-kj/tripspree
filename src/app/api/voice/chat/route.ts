import { NextResponse } from 'next/server';
import { SEED_TRIP } from '@/lib/seed-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, currentSanctuary, dayNumber } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const q = query.toLowerCase();
    const trip = SEED_TRIP;
    const currentDay = trip.days.find((d) => d.dayNumber === (dayNumber || 2)) || trip.days[1];

    // Check if Groq API key is available in environment
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            temperature: 0.3,
            max_tokens: 120,
            messages: [
              {
                role: 'system',
                content: `You are Elena Vance, Lead Travel Agent & Director for TripSpree's bespoke travel service.
Demeanor: serene, literary, refined, brief (under 40 words).
Current traveler context:
- Destination: ${currentDay.destination}
- Current Sanctuary: ${currentSanctuary || currentDay.sanctuaryName}
- Today's Schedule: Morning: ${currentDay.morningActivity.title}; Afternoon: ${currentDay.afternoonActivity.title}; Evening: ${currentDay.eveningActivity.title}
Answer directly without pleasantries like 'Certainly!' or 'I\\'d be glad to help.'`,
              },
              { role: 'user', content: query },
            ],
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const answer = data.choices[0]?.message?.content?.trim();
          if (answer) {
            return NextResponse.json({
              reply: answer,
              curator: 'Elena Vance',
              confidenceTier: 'Verified',
            });
          }
        }
      } catch {
        // Fall through to deterministic response
      }
    }

    // Deterministic curated fallback responses based on trip state
    let reply = `Your arrangements for ${currentDay.destination} are confirmed. Tonight at eight is your private charcoal kaiseki on the pavilion terrace.`;

    if (q.includes('dinner') || q.includes('food') || q.includes('kaiseki') || q.includes('chef')) {
      reply = `Dinner tonight is at 20:00: private riverside charcoal kaiseki with Chef Kubota on Table 4 overlooking the Oi River.`;
    } else if (q.includes('driver') || q.includes('car') || q.includes('transfer') || q.includes('tanaka')) {
      reply = `Mr. Tanaka is stationed with the black Alphard at the North Cloister Gate. Shoe covers and cool towels are prepared.`;
    } else if (q.includes('swap') || q.includes('alternative') || q.includes('tea') || q.includes('change')) {
      reply = `You can swap today's afternoon garden visit for Master Sen's private tea ceremony directly in the Trip Designer drawer. I have pre-cleared access.`;
    } else if (q.includes('weather') || q.includes('rain') || q.includes('temperature')) {
      reply = `From general knowledge, today brings quiet autumn drizzle at 18°C across Arashiyama. We have provided oilpaper umbrellas at the pier.`;
    } else if (q.includes('wifi') || q.includes('internet') || q.includes('code')) {
      reply = `Sanctuary Wi-Fi is 'HOSHINOYA_PRIVATE' with direct line to concierge desk on extension #01.`;
    }

    return NextResponse.json({
      reply,
      curator: 'Elena Vance',
      confidenceTier: 'Verified',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
