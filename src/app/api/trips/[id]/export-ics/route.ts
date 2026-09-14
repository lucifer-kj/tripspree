import { NextResponse } from 'next/server';
import { SEED_TRIP } from '@/lib/seed-data';

function formatIcsDate(dateStr: string, timeStr: string): string {
  const cleanTime = timeStr.replace(/[^0-9:]/g, '').split(':');
  const hours = cleanTime[0]?.padStart(2, '0') || '09';
  const minutes = cleanTime[1]?.padStart(2, '0') || '00';
  const cleanDate = dateStr.replace(/-/g, '');
  return `${cleanDate}T${hours}${minutes}00Z`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await params;
  const trip = SEED_TRIP;

  const events: string[] = [];

  trip.days.forEach((day) => {
    const dayDate = `2026-10-${String(13 + day.dayNumber).padStart(2, '0')}`;

    const slots = [
      { slot: day.morningActivity, name: 'Morning' },
      { slot: day.afternoonActivity, name: 'Afternoon' },
      { slot: day.eveningActivity, name: 'Evening' },
    ];

    slots.forEach((s) => {
      const start = formatIcsDate(dayDate, s.slot.time);
      const end = formatIcsDate(dayDate, String(parseInt(s.slot.time) + 2) + ':00');

      events.push(`BEGIN:VEVENT
UID:${day.id}-${s.name.toLowerCase()}@tripspree.com
DTSTAMP:${formatIcsDate('2026-10-01', '00:00')}
DTSTART:${start}
DTEND:${end}
SUMMARY:${day.sanctuaryName}: ${s.slot.title}
DESCRIPTION:${s.slot.notes || day.curatorNote}
LOCATION:${s.slot.location}
STATUS:CONFIRMED
END:VEVENT`);
    });
  });

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TripSpree Private Travel//Itinerary Engine//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${trip.title}
X-WR-TIMEZONE:Asia/Tokyo
${events.join('\n')}
END:VCALENDAR`;

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="tripspree-${trip.id}.ics"`,
    },
  });
}
