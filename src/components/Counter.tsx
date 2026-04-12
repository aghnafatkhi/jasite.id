import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, animate, motion } from "motion/react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration, 
        ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
