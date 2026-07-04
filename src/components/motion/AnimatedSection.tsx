"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Variants } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  duration = 0.55,
  once = true,
  threshold = 0.12,
}: Props) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once, amount: threshold });

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, ease: [0, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
