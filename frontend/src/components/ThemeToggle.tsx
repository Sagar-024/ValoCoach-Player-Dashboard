"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-11 h-11" />; // Placeholder to prevent layout shift
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--valo-border)] bg-[var(--valo-bg-surface)] hover:bg-[var(--valo-bg-elevated)] hover:border-[var(--valo-primary)]/30 transition-all duration-100 shadow-sm hover:shadow-md group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <svg
        className="w-5 h-5 transition-all duration-100 ease-in-out group-hover:scale-110"
        style={{
          transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
        }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {isDark ? (
          // Moon icon
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          />
        ) : (
          // Sun icon
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        )}
      </svg>
    </button>
  );
}
