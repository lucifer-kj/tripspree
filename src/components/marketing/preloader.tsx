"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
  isReducedMotion?: boolean;
}

export function Preloader({ onComplete, isReducedMotion = false }: PreloaderProps) {
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (isReducedMotion) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setHasDismissed(true);
      setTimeout(() => {
        onComplete?.();
      }, 400);
    }, 600);

    return () => clearTimeout(timer);
  }, [isReducedMotion, onComplete]);

  if (isReducedMotion || hasDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0717] text-[#f5f3ff] select-none"
        role="status"
        aria-live="polite"
        aria-label="Loading TripSpree"
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-2"
          >
            <Image
              src="/images/brand/logo.png"
              alt="TripSpree Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-serif text-xl tracking-[0.2em] uppercase text-white font-light">
              TripSpree
            </h1>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#a0a0a0] mt-1.5">
              Bespoke Travel
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}