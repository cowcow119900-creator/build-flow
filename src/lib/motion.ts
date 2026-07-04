import type { Variants, Transition } from "motion/react";

// ─── Base Transitions ────────────────────────────────────────────
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  spring: { type: "spring", stiffness: 400, damping: 30 } as Transition,
  springGentle: { type: "spring", stiffness: 200, damping: 28 } as Transition,
  springBouncy: { type: "spring", stiffness: 500, damping: 25 } as Transition,
};

// ─── Shared Variants ─────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: ease.out } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: ease.out } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: ease.out } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0 },
  },
};

// ─── Button Variants ─────────────────────────────────────────────
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: ease.springBouncy },
  tap: { scale: 0.96, transition: { duration: 0.08 } },
};

// ─── Card Variants ───────────────────────────────────────────────
export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  hover: {
    y: -6,
    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
    transition: ease.springGentle,
  },
};

// ─── Modal / Panel ───────────────────────────────────────────────
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const panelSlideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: ease.springGentle },
  exit: { opacity: 0, y: 40, transition: { duration: 0.22 } },
};

export const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: ease.springGentle },
  exit: { x: "100%", transition: { duration: 0.25, ease: ease.smooth } },
};

export const drawerFromBottom: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: ease.springGentle },
  exit: { y: "100%", transition: { duration: 0.25, ease: ease.smooth } },
};

// ─── Toast ───────────────────────────────────────────────────────
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: ease.springBouncy },
  exit: { opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.18 } },
};

// ─── Hero Sequence ────────────────────────────────────────────────
export const heroText: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out, delay: i * 0.12 },
  }),
};

export const heroCard: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...ease.springGentle, delay: i * 0.15 },
  }),
};
