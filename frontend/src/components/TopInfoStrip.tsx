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
    <div className="section-header">
      {/* Left: Heading + Count */}
      <div className="flex items-center gap-6">
        <h2 className="section-title">Recent Matches</h2>
        <span className="section-count">({counts.All})</span>
      </div>

      {/* Right: Filter Buttons */}
      <MatchFilter
        counts={counts}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}
