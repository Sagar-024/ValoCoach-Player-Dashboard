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
      className="inline-flex items-center p-1 md:p-2 gap-1 md:gap-2 rounded-2xl bg-[var(--valo-bg-surface)]/80 backdrop-blur-xl border border-[var(--valo-border)] shadow-lg"
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
              relative flex items-center gap-2 md:gap-4 
              px-3 py-2 md:px-10 md:py-4
              rounded-xl 
              text-xs md:text-base font-bold
              transition-all duration-200 ease-out
              border
              outline-none focus-visible:ring-2 focus-visible:ring-[var(--valo-primary)]/50
              select-none cursor-pointer
              group
              ${
                isActive
                  ? `${colors.active} shadow-lg`
                  : "border-transparent text-[var(--valo-text-secondary)] hover:text-[var(--valo-text-primary)] hover:bg-[var(--valo-bg-elevated)] hover:scale-[1.02] active:scale-[0.98]"
              }
            `}
          >
            {/* Ripple effect on click */}
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </span>

            {/* Label */}
            <span className="tracking-wide relative z-10">{filter}</span>

            {/* Count Badge */}
            <span
              className={`
                relative z-10
                flex items-center justify-center 
                h-6 min-w-[24px] px-1.5 md:h-8 md:min-w-[32px] md:px-3
                rounded-lg 
                text-[10px] md:text-sm font-bold
                transition-all duration-200
                ${
                  isActive
                    ? `${colors.badge} shadow-md`
                    : "bg-[var(--valo-bg-elevated)] text-[var(--valo-text-primary)] group-hover:scale-110"
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
