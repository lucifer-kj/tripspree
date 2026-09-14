"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotionState } from "@/lib/use-reduced-motion";

interface MaskedLineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

/**
 * MaskedLineReveal encases each line of text in an overflow-hidden wrapper,
 * animating the inner text from translateY(105%) to translateY(0%) as it enters
 * the viewport. Matches the signature Vita Travels line-masking wipe effect.
 */
export function MaskedLineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.12,
  duration = 0.8,
  once = true,
}: MaskedLineRevealProps) {
  const { isReducedMotion } = useReducedMotionState();

  if (isReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, idx) => (
          <div key={idx} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: "108%", opacity: 0.1 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      className={className}
    >
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden leading-tight">
          <motion.div variants={lineVariants} className={lineClassName}>
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
