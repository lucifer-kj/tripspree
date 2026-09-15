'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Trip,
  Sanctuary,
  TasteProfile,
  CheckInRecord,
  ItineraryAlternative,
  ItineraryDay,
  PatronUser,
  ItineraryDiff,
  PendingSuggestion,
  DirectPreferences,
} from './types';
import { SEED_TRIP, SEED_SANCTUARIES, SEED_TASTE_PROFILE } from './seed-data';

export const DEFAULT_PATRON: PatronUser = {
  id: 'patron-001',
  name: 'Jonathan Sterling',
  email: 'j.sterling@sterling-holdings.co.uk',
  tier: 'Active Patron',
  avatarInitials: 'JS',
  memberSince: 'Autumn 2024',
  assignedCurator: 'Elena Vance',
  preferences: {
    noEarlyTransfers: true,
    preferPrivateDining: true,
    requireThermalBath: true,
    minimalPhysicalStops: false,
  },
};

interface TripSpreeState {
  currentTrip: Trip;
  sanctuaries: Sanctuary[];
  tasteProfile: TasteProfile;
  checkIns: CheckInRecord[];
  isDriverStandingBy: boolean;
  isLiveSync: boolean;

  // Patron Authentication State
  isAuthenticated: boolean;
  currentUser: PatronUser | null;
  bookmarkedDispatches: string[];

  // UX Spec Features 2-4 State
  isCallActive: boolean;
  activeInvitation: { prompt: string; context: string } | null;
  activeDiffs: ItineraryDiff[];

  // Actions
  setTrip: (trip: Trip) => void;
  swapActivity: (dayId: string, alternative: ItineraryAlternative) => void;
  reorderDays: (days: ItineraryDay[]) => void;
  toggleDriverStandingBy: () => void;
  submitCheckIn: (record: { dayNumber: number; sanctuary: string; mood: CheckInRecord['mood']; notes?: string }) => void;
  setTasteProfile: (profile: TasteProfile) => void;
  setLiveSync: (isLive: boolean) => void;
  login: (user?: Partial<PatronUser>) => void;
  logout: () => void;
  toggleBookmark: (dispatchId: string) => void;
  resetToDefaults: () => void;

  // Voice & Suggestion Actions
  setCallActive: (active: boolean) => void;
  setActiveInvitation: (invitation: { prompt: string; context: string } | null) => void;
  addItineraryDiff: (diff: ItineraryDiff) => void;
  dismissDiff: (id: string) => void;
  stagePendingSuggestion: (dayId: string, suggestion: PendingSuggestion) => void;
  acceptPendingSuggestion: (dayId: string) => void;
  dismissPendingSuggestion: (dayId: string) => void;
  updatePreferences: (preferences: Partial<DirectPreferences>) => void;
}

export const useTripSpreeStore = create<TripSpreeState>()(
  persist(
    (set, get) => ({
      currentTrip: SEED_TRIP,
      sanctuaries: SEED_SANCTUARIES,
      tasteProfile: SEED_TASTE_PROFILE,
      checkIns: [
        {
          id: 'checkin-init',
          tripId: 'kyoto-zen-4d',
          dayNumber: 1,
          sanctuary: 'Sowaka Ryokan',
          mood: 'peaceful',
          notes: 'The sukiya room garden is quiet and restorative after transit.',
          timestamp: Date.now() - 86400000,
          adjustmentsApplied: true,
        },
      ],
      isDriverStandingBy: false,
      isLiveSync: true,
      isAuthenticated: true,
      currentUser: DEFAULT_PATRON,
      bookmarkedDispatches: ['kyoto-moss-gardens', 'cyclades-off-season'],
      isCallActive: false,
      activeInvitation: null,
      activeDiffs: [],

      setTrip: (trip) => set({ currentTrip: trip }),

      login: (userData) => {
        set((state) => ({
          isAuthenticated: true,
          currentUser: {
            ...(state.currentUser || DEFAULT_PATRON),
            ...(userData || {}),
          },
        }));
      },

      logout: () => {
        set({
          isAuthenticated: false,
        });
      },

      toggleBookmark: (dispatchId) => {
        set((state) => {
          const exists = state.bookmarkedDispatches.includes(dispatchId);
          return {
            bookmarkedDispatches: exists
              ? state.bookmarkedDispatches.filter((id) => id !== dispatchId)
              : [...state.bookmarkedDispatches, dispatchId],
          };
        });
      },


      swapActivity: (dayId, alternative) => {
        const trip = get().currentTrip;
        const updatedDays = trip.days.map((day) => {
          if (day.id !== dayId) return day;

          const slotKey = alternative.timeSlot === 'morning' 
            ? 'morningActivity' 
            : alternative.timeSlot === 'afternoon' 
            ? 'afternoonActivity' 
            : 'eveningActivity';

          const currentActivity = day[slotKey];
          const newCurrentActivity = {
            time: currentActivity.time,
            title: alternative.title,
            location: alternative.location,
            notes: alternative.description,
            confidenceTier: alternative.confidenceTier,
          };

          const newAlternativeFromOld: ItineraryAlternative = {
            id: `alt-${Date.now()}`,
            title: currentActivity.title,
            timeSlot: alternative.timeSlot,
            location: currentActivity.location,
            description: currentActivity.notes || 'Original planned activity for this day.',
            confidenceTier: currentActivity.confidenceTier || 'Verified',
            curatorEndorsement: 'Previously scheduled curator selection.',
          };

          const remainingAlternatives = day.alternatives.filter((a) => a.id !== alternative.id);

          return {
            ...day,
            [slotKey]: newCurrentActivity,
            alternatives: [newAlternativeFromOld, ...remainingAlternatives],
          };
        });

        set({ currentTrip: { ...trip, days: updatedDays } });
      },

      reorderDays: (reorderedDays) => {
        const trip = get().currentTrip;
        const sequentialDays = reorderedDays.map((day, idx) => ({
          ...day,
          dayNumber: idx + 1,
        }));
        set({ currentTrip: { ...trip, days: sequentialDays } });
      },

      toggleDriverStandingBy: () => {
        set((state) => ({ isDriverStandingBy: !state.isDriverStandingBy }));
      },

      submitCheckIn: ({ dayNumber, sanctuary, mood, notes }) => {
        const trip = get().currentTrip;
        let staged: PendingSuggestion | undefined = undefined;

        // If traveler reports fatigue, stage a lighter suggestion for next day without auto-mutating
        if (mood === 'fatigued' || mood === 'needs-adjustment') {
          const nextDay = trip.days.find((d) => d.dayNumber === dayNumber + 1);
          if (nextDay) {
            staged = {
              slotKey: 'afternoonActivity',
              suggestedActivity: {
                time: '14:30 JST',
                title: 'Private Cedar Bath & Sukiya Courtyard Tea Ceremony',
                location: `${sanctuary} Tea Cloister`,
                notes: 'Restorative stillness. Replaces active afternoon transit with private garden reflection.',
                confidenceTier: 'Verified',
              },
              rationale: 'We noticed today ran long. Tomorrow afternoon is staged for unhurried courtyard tea and cedar soaking.',
              trigger: 'fatigue',
              status: 'pending',
            };

            // Set contextual voice invitation per UX §2
            set({
              activeInvitation: {
                prompt: 'Want to talk it through?',
                context: `You noted feeling ${mood} after Day ${dayNumber}. We have staged a restorative afternoon for Day ${dayNumber + 1}.`,
              },
            });

            // Stage on the actual trip day without altering live slots
            const updatedDays = trip.days.map((d) =>
              d.dayNumber === dayNumber + 1 ? { ...d, pendingSuggestion: staged } : d
            );
            set({ currentTrip: { ...trip, days: updatedDays } });
          }
        }

        const newRecord: CheckInRecord = {
          id: `checkin-${Date.now()}`,
          tripId: trip.id,
          dayNumber,
          sanctuary,
          mood,
          notes,
          timestamp: Date.now(),
          adjustmentsApplied: false,
          stagedSuggestion: staged,
        };

        set((state) => ({
          checkIns: [newRecord, ...state.checkIns],
        }));
      },

      setCallActive: (active) => set({ isCallActive: active }),

      setActiveInvitation: (invitation) => set({ activeInvitation: invitation }),

      addItineraryDiff: (diff) =>
        set((state) => ({
          activeDiffs: [diff, ...state.activeDiffs],
        })),

      dismissDiff: (id) =>
        set((state) => ({
          activeDiffs: state.activeDiffs.filter((d) => d.id !== id),
        })),

      stagePendingSuggestion: (dayId, suggestion) => {
        const trip = get().currentTrip;
        const updatedDays = trip.days.map((d) =>
          d.id === dayId ? { ...d, pendingSuggestion: suggestion } : d
        );
        set({ currentTrip: { ...trip, days: updatedDays } });
      },

      acceptPendingSuggestion: (dayId) => {
        const trip = get().currentTrip;
        const day = trip.days.find((d) => d.id === dayId);
        if (!day || !day.pendingSuggestion) return;

        const suggestion = day.pendingSuggestion;
        const slotKey = suggestion.slotKey;
        const previousSlot = day[slotKey];

        // Create diff card per UX §2
        const newDiff: ItineraryDiff = {
          id: `diff-${Date.now()}`,
          dayNumber: day.dayNumber,
          timeSlot: slotKey === 'morningActivity' ? 'morning' : slotKey === 'afternoonActivity' ? 'afternoon' : 'evening',
          previousTitle: previousSlot.title,
          newTitle: suggestion.suggestedActivity.title,
          location: suggestion.suggestedActivity.location,
          rationale: suggestion.rationale,
          timestamp: Date.now(),
        };

        // Commit change to live slot and mark suggestion accepted
        const updatedDays = trip.days.map((d) => {
          if (d.id !== dayId) return d;
          return {
            ...d,
            [slotKey]: suggestion.suggestedActivity,
            pendingSuggestion: {
              ...suggestion,
              status: 'accepted' as const,
            },
          };
        });

        set((state) => ({
          currentTrip: { ...trip, days: updatedDays },
          activeDiffs: [newDiff, ...state.activeDiffs],
          activeInvitation: null,
        }));
      },

      dismissPendingSuggestion: (dayId) => {
        const trip = get().currentTrip;
        const updatedDays = trip.days.map((d) => {
          if (d.id !== dayId) return d;
          return {
            ...d,
            pendingSuggestion: d.pendingSuggestion
              ? { ...d.pendingSuggestion, status: 'dismissed' as const }
              : undefined,
          };
        });
        set({ currentTrip: { ...trip, days: updatedDays }, activeInvitation: null });
      },

      updatePreferences: (prefs) => {
        set((state) => ({
          currentUser: state.currentUser
            ? {
                ...state.currentUser,
                preferences: {
                  ...(state.currentUser.preferences || DEFAULT_PATRON.preferences!),
                  ...prefs,
                },
              }
            : null,
        }));
      },

      setTasteProfile: (profile) => set({ tasteProfile: profile }),

      setLiveSync: (isLive) => set({ isLiveSync: isLive }),

      resetToDefaults: () =>
        set({
          currentTrip: SEED_TRIP,
          sanctuaries: SEED_SANCTUARIES,
          tasteProfile: SEED_TASTE_PROFILE,
          isDriverStandingBy: false,
          isLiveSync: true,
          isAuthenticated: true,
          currentUser: DEFAULT_PATRON,
          bookmarkedDispatches: ['kyoto-moss-gardens', 'cyclades-off-season'],
          isCallActive: false,
          activeInvitation: null,
          activeDiffs: [],
        }),
    }),
    {
      name: 'tripspree-storage-v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        currentTrip: state.currentTrip,
        tasteProfile: state.tasteProfile,
        checkIns: state.checkIns,
        isDriverStandingBy: state.isDriverStandingBy,
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        bookmarkedDispatches: state.bookmarkedDispatches,
        activeDiffs: state.activeDiffs,
        activeInvitation: state.activeInvitation,
      }),
    }
  )
);
