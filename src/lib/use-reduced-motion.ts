"use client";

import { useSyncExternalStore, useCallback } from "react";

function subscribeMediaQuery(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMediaSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMediaServerSnapshot() {
  return false;
}

function subscribeLocalStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredSnapshot() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("tripspree_reduced_motion");
}

export function useReducedMotionState() {
  const prefersReduced = useSyncExternalStore(
    subscribeMediaQuery,
    getMediaSnapshot,
    getMediaServerSnapshot
  );

  const storedOverride = useSyncExternalStore(
    subscribeLocalStorage,
    getStoredSnapshot,
    () => null
  );

  const manualOverride =
    storedOverride === "true" ? true : storedOverride === "false" ? false : null;

  const isReduced = manualOverride !== null ? manualOverride : prefersReduced;

  const toggleReducedMotion = useCallback(() => {
    const nextVal = manualOverride === null ? !prefersReduced : !manualOverride;
    localStorage.setItem("tripspree_reduced_motion", String(nextVal));
    window.dispatchEvent(new Event("storage"));
  }, [manualOverride, prefersReduced]);

  return {
    isReducedMotion: isReduced,
    toggleReducedMotion,
    manualOverride,
  };
}