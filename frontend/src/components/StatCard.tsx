"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useRef, useState, memo } from "react";

interface StatCardProps {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
}

/**
 * StatCard - Ultra-stable version.
 * Uses font-mono and forced tabular-nums to prevent any horizontal jitter.
 * Removed overshoot easing to prevent vertical jitter.
 */
const StatCard = memo(function StatCard({
  label,
  value,
  decimals = 0,
  suffix = "",
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const animatedValue = useCountUp(isVisible ? value : 0, 1400, decimals);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center justify-center md:items-start md:justify-start h-full gap-1 py-1 px-1 select-none w-full min-w-0 transition-transform duration-300 hover:scale-105 cursor-default"
    >
      {/* Label section */}
      <div className="flex items-center gap-2 mb-0.5">
        <div className="w-1.5 h-1.5 bg-[var(--valo-primary)] rounded-full shrink-0" />
        <h3 className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--valo-text-secondary)] whitespace-nowrap">
          {label}
        </h3>
      </div>

      {/* Value section: Forced monospaced digits to eliminate layout shift */}
      <div className="flex items-baseline gap-1 h-[44px] md:h-[56px] overflow-visible">
        <span
          className="font-mono text-4xl md:text-5xl font-bold text-[var(--valo-text-primary)] tabular-nums"
          style={{
            fontFeatureSettings: '"tnum" 1',
            letterSpacing: "-0.02em",
          }}
        >
          {decimals > 0
            ? animatedValue.toFixed(decimals)
            : Math.floor(animatedValue)}
        </span>
        {suffix && (
          <span className="font-mono text-sm font-semibold text-[var(--valo-text-secondary)] mb-1">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
});

export default StatCard;
