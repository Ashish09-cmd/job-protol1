"use client";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number; 
  prefix?: string;
  suffix?: string;
  className?: string;
}

// Starts fast, slows down near the end
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  end,
  duration = 1000,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who turned off animations
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(easeOutCubic(progress) * end));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Only start counting once the element is visible, and only once
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className ?? ""}`}
      aria-label={`${prefix}${end.toLocaleString("en-US")}${suffix}`}
    >
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
