"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-track"?: string;
};

export default function MotionButton({
  children,
  className,
  onClick,
  type = "button",
  disabled,
  ...rest
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03, transition: { type: "spring", stiffness: 500, damping: 25 } }}
      whileTap={{ scale: disabled ? 1 : 0.96, transition: { duration: 0.08 } }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
