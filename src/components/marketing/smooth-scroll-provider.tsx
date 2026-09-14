"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotionState } from "@/lib/use-reduced-motion";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider integrates the Lenis smooth-scrolling engine for
 * the (marketing) route group. Replaces native jittery scrolling with a
 * fluid, cinematic camera-pan feel, ensuring scroll-linked parallax and
 * typography reveals trigger with mathematical precision.
 *
 * Automatically disabled when prefers-reduced-motion is requested.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const { isReducedMotion } = useReducedMotionState();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isReducedMotion]);

  return <>{children}</>;
}
