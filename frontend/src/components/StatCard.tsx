"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useRef, useState, memo } from "react";

interface StatCardProps {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
}

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
      className="flex flex-col items-center justify-center md:items-start md:justify-start h-full gap-1 select-none w-full min-w-0"
    >
      {/* Label section */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--valo-text-secondary)] whitespace-nowrap">
          {label}
        </h3>
      </div>

      <div className="flex items-baseline gap-1">
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
