'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Trip, Sanctuary, TasteProfile, CheckInRecord, ItineraryAlternative, ItineraryDay, PatronUser } from './types';
import { SEED_TRIP, SEED_SANCTUARIES, SEED_TASTE_PROFILE } from './seed-data';

export const DEFAULT_PATRON: PatronUser = {
  id: 'patron-001',
  name: 'Jonathan Sterling',
  email: 'j.sterling@sterling-holdings.co.uk',
  tier: "Founder's Circle Patron",
  avatarInitials: 'JS',
  memberSince: 'Autumn 2024',
  assignedCurator: 'Elena Vance',
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
        const newRecord: CheckInRecord = {
          id: `checkin-${Date.now()}`,
          tripId: get().currentTrip.id,
          dayNumber,
          sanctuary,
          mood,
          notes,
          timestamp: Date.now(),
          adjustmentsApplied: true,
        };

        set((state) => ({
          checkIns: [newRecord, ...state.checkIns],
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
      }),
    }
  )
);
