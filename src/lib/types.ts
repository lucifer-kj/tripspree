export type ConfidenceTier = 'Verified' | 'Team-Vetted' | 'Unverified' | 'General';

export interface Sanctuary {
  id: string;
  name: string;
  realm: string;
  location: string;
  description: string;
  curatorNotes: string;
  heroImage: string;
  heroPhotographer: string;
  amenities: string[];
  confidenceTier: ConfidenceTier;
  roomType: string;
}

export interface ActivitySlot {
  time: string;
  title: string;
  location: string;
  notes?: string;
  confidenceTier?: ConfidenceTier;
}

export interface ItineraryAlternative {
  id: string;
  title: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  location: string;
  description: string;
  confidenceTier: ConfidenceTier;
  curatorEndorsement: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  destination: string;
  sanctuaryName: string;
  morningActivity: ActivitySlot;
  afternoonActivity: ActivitySlot;
  eveningActivity: ActivitySlot;
  curatorNote: string;
  confidenceTier: ConfidenceTier;
  alternatives: ItineraryAlternative[];
}

export interface Trip {
  id: string;
  title: string;
  patronName: string;
  patronEmail: string;
  realm: string;
  status: 'draft' | 'confirmed' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  curatorName: string;
  curatorTitle: string;
  driverName?: string;
  driverCar?: string;
  driverStandingBy?: boolean;
  days: ItineraryDay[];
}

export interface TasteProfile {
  id: string;
  pace: 'unhurried' | 'balanced' | 'immersive';
  architecturalPurity: number; // 1 to 10
  stillnessIndex: number; // 1 to 10
  culinaryFocus: 'kaiseki' | 'counter-omakase' | 'tea-ceremony' | 'local-harvest';
  preferredRealms: string[];
  archetypeTitle: string;
  archetypeDescription: string;
  matchedSanctuaries: string[];
  createdAt: number;
}

export interface CheckInRecord {
  id: string;
  tripId: string;
  dayNumber: number;
  sanctuary: string;
  mood: 'exceptional' | 'peaceful' | 'fatigued' | 'needs-adjustment';
  notes?: string;
  timestamp: number;
  adjustmentsApplied: boolean;
}

export interface PatronUser {
  id: string;
  name: string;
  email: string;
  tier: string;
  avatarInitials: string;
  memberSince: string;
  assignedCurator: string;
}

export interface JournalBookmark {
  dispatchId: string;
  savedAt: number;
  personalNotes?: string;
}

