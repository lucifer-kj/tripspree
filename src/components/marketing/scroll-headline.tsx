"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

interface ScrollHeadlineProps {
  text: string;
  className?: string;
  isReducedMotion?: boolean;
  as?: "h1" | "h2" | "h3";
  mode?: "reveal" | "scrub";
}

function WordScrub({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(start + 1.5 / total, 1);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.3em] last:mr-0 transition-colors"
    >
      {word}
    </motion.span>
  );
}

export function ScrollHeadline({
  text,
  className = "",
  isReducedMotion: forceReduced = false,
  as = "h2",
  mode = "reveal",
}: ScrollHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const systemReduced = useReducedMotion();
  const shouldReduce = forceReduced || systemReduced;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 35%"],
  });

  const Component = as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;

  if (shouldReduce) {
    const StaticComponent = as;
    return (
      <StaticComponent className={`font-serif tracking-tight leading-tight ${className}`}>
        {text}
      </StaticComponent>
    );
  }

  if (mode === "scrub") {
    const words = text.split(" ");
    return (
      <div ref={containerRef} className="inline-block">
        <Component className={`font-serif tracking-tight leading-tight ${className}`}>
          {words.map((word, i) => (
            <WordScrub
              key={i}
              word={word}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </Component>
      </div>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`font-serif tracking-tight leading-tight ${className}`}
    >
      {text}
    </Component>
  );
}
