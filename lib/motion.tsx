"use client";

import { motion, useReducedMotion, type Variants, type Transition } from "framer-motion";
import type { ReactNode } from "react";

/** Professional easing — smooth, no bounce */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.45, 0, 0.55, 1];

export const VIEWPORT = { once: true, margin: "-72px" as const };
export const VIEWPORT_LOOSE = { once: true, margin: "-120px" as const };

export const T_DURATION = 0.55;
export const T_STAGGER = 0.07;

const t = (delay = 0, duration = T_DURATION): Transition => ({
  duration,
  ease: EASE_OUT,
  delay,
});

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: t() },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: t() },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: t() },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: t() },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: t() },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: t() },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: T_STAGGER, delayChildren: 0.06 },
  },
};

export const staggerItem: Variants = fadeInUp;

/** Subtle hover lift for cards — corporate, not playful */
export const motionCardHover = {
  y: -5,
  transition: { duration: 0.35, ease: EASE_OUT },
};

export const motionCardShadow =
  "0 18px 42px rgba(15, 23, 42, 0.08)";

/** Gentle float for hero stat cards */
export const floatY = (offset = 6) => ({
  y: [0, -offset, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: EASE_IN_OUT,
  },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
};

const directionVariants: Record<NonNullable<RevealProps["direction"]>, Variants> = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
  fade: fadeIn,
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={directionVariants[direction]}
      transition={t(delay)}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  viewport = VIEWPORT,
}: {
  children: ReactNode;
  className?: string;
  viewport?: typeof VIEWPORT;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
