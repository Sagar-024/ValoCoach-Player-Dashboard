"use client";

import { FilterType } from "@/lib/types";
import MatchFilter from "./MatchFilter";

interface TopInfoStripProps {
  counts: {
    All: number;
    Won: number;
    Lost: number;
    Draw: number;
  };
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export default function TopInfoStrip({
  counts,
  filter,
  setFilter,
}: TopInfoStripProps) {
  return (
    <div className="w-full mb-10 md:mb-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 md:mb-8">
        {/* Left: Heading + Count */}
        <div className="flex items-center gap-4 self-start md:self-auto pl-2 md:pl-0">
          <div className="w-1.5 h-8 bg-[var(--valo-primary)] rounded-full shadow-[0_0_12px_rgba(255,70,85,0.4)]" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--valo-text-primary)] tracking-tight uppercase">
            Match History
          </h2>
          <span className="font-mono text-sm font-bold text-[var(--valo-text-tertiary)] bg-[var(--valo-bg-elevated)] px-3 py-1 rounded border border-[var(--valo-border)] ml-2">
            {counts.All}
          </span>
        </div>

        {/* Right: Filter Buttons */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <MatchFilter
            counts={counts}
            activeFilter={filter}
            onFilterChange={setFilter}
          />
        </div>
      </div>

      {/* Decorative Separator Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--valo-border)] to-transparent opacity-60 mb-8" />
    </div>
  );
}
