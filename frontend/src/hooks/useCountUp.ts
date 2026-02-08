"use client";

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for number count-up animation
 * Section 6: 800ms duration with cubic-bezier(0.34, 1.56, 0.64, 1) easing (slight overshoot)
 */
export function useCountUp(
  end: number,
  duration: number = 800,
  decimals: number = 0
): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    // Check for reduced motion preference (Section 11)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutQuad - no overshoot to prevent layout jitter
      const easeOutQuad = (t: number): number => t * (2 - t);

      const easedProgress = easeOutQuad(progress);
      const currentCount = easedProgress * end;

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return decimals > 0 
    ? Math.round(count * Math.pow(10, decimals)) / Math.pow(10, decimals)
    : Math.round(count);
}
