"use client";

import { FilterType } from "@/lib/types";

interface MatchFilterProps {
  counts: {
    All: number;
    Won: number;
    Lost: number;
    Draw: number;
  };
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function MatchFilter({
  counts,
  activeFilter,
  onFilterChange,
}: MatchFilterProps) {
  const filters: FilterType[] = ["All", "Won", "Lost", "Draw"];

  // Semantic color configurations
  const filterColors = {
    All: {
      active:
        "bg-[var(--valo-primary)]/15 text-[var(--valo-primary)] border-[var(--valo-primary)]/30",
      badge: "bg-[var(--valo-primary)] text-white",
    },
    Won: {
      active:
        "bg-[var(--valo-success)]/15 text-[var(--valo-success)] border-[var(--valo-success)]/30",
      badge: "bg-[var(--valo-success)] text-white",
    },
    Lost: {
      active:
        "bg-[var(--valo-danger)]/15 text-[var(--valo-danger)] border-[var(--valo-danger)]/30",
      badge: "bg-[var(--valo-danger)] text-white",
    },
    Draw: {
      active:
        "bg-[var(--valo-warning)]/15 text-[var(--valo-warning)] border-[var(--valo-warning)]/30",
      badge: "bg-[var(--valo-warning)] text-[var(--valo-bg-deep)]",
    },
  };

  return (
    <div
      className="inline-flex items-center p-1 md:p-1.5 gap-0.5 md:gap-1.5 rounded-xl bg-[var(--valo-bg-surface)] border border-[var(--valo-border)]/50 shadow-[var(--shadow-premium-soft)]"
      role="tablist"
      aria-label="Match filters"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const count = counts[filter];
        const colors = filterColors[filter];

        return (
          <button
            key={filter}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${filter}`}
            onClick={() => onFilterChange(filter)}
            className={`
              relative flex items-center gap-1.5 md:gap-3 
              px-2 py-1.5 md:px-5 md:py-2.5
              rounded-lg
              text-[9px] md:text-sm font-bold
              transition-all duration-300 ease-out
              select-none cursor-pointer
              group overflow-hidden
              ${
                isActive
                  ? `${colors.active} border border-[var(--valo-primary)]/40 scale-[1.02]`
                  : "border border-transparent text-[var(--valo-text-secondary)] hover:text-[var(--valo-text-primary)] hover:bg-[var(--valo-bg-elevated)] hover:scale-[1.01]"
              }
            `}
            style={{
              boxShadow: isActive
                ? "0 4px 10px -2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,70,85,0.1)"
                : "none",
              textShadow: isActive ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
            }}
          >
            {/* 3D Glass Highlight Header */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            )}

            {/* Label */}
            <span className="tracking-widest relative z-10 uppercase">
              {filter}
            </span>

            {/* Count Badge */}
            <span
              className={`
                relative z-10
                flex items-center justify-center 
                h-3.5 min-w-[18px] px-1 md:h-5 md:min-w-[26px] md:px-2
                rounded-md 
                text-[7px] md:text-[10px] font-bold
                transition-all duration-300
                ${
                  isActive
                    ? `${colors.badge} shadow-[0_2px_4px_rgba(0,0,0,0.3)]`
                    : "bg-[var(--valo-bg-elevated)] text-[var(--valo-text-primary)]"
                }
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
