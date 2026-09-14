"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ScrollHeadlineProps {
  text: string;
  className?: string;
  isReducedMotion?: boolean;
  as?: "h1" | "h2" | "h3";
}

export function ScrollHeadline({
  text,
  className = "",
  isReducedMotion: forceReduced = false,
  as = "h2",
}: ScrollHeadlineProps) {
  const systemReduced = useReducedMotion();
  const shouldReduce = forceReduced || systemReduced;

  const Component = as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;

  if (shouldReduce) {
    const StaticComponent = as;
    return (
      <StaticComponent className={`font-serif tracking-tight leading-tight ${className}`}>
        {text}
      </StaticComponent>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic bezier for ultra-smooth fluid reveal
      }}
      className={`font-serif tracking-tight leading-tight ${className}`}
    >
      {text}
    </Component>
  );
}