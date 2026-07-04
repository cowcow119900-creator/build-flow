"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";

type Props = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1600,
  decimals = 0,
  className,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useCountUp(target, duration, inView, decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()}
      {suffix}
    </span>
  );
}
