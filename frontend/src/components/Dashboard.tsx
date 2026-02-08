"use client";

import { PlayerData, FilterType } from "@/lib/types";
import { filterMatches } from "@/lib/utils";
import { useState, useMemo } from "react";
import TopInfoStrip from "./TopInfoStrip";
import MatchList from "./MatchList";
import PerformanceChart from "./PerformanceChart";
import Container from "@/components/Container";

interface DashboardProps {
  data: PlayerData;
}

export default function Dashboard({ data }: DashboardProps) {
  const [filter, setFilter] = useState<FilterType>("All");

  const filteredMatches = useMemo(
    () => filterMatches(data.matches, filter),
    [data.matches, filter],
  );

  // Calculate counts for badges
  const counts = useMemo(
    () => ({
      All: data.matches.length,
      Won: data.matches.filter((m) => m.result === "Won").length,
      Lost: data.matches.filter((m) => m.result === "Lost").length,
      Draw: data.matches.filter((m) => m.result === "Draw").length,
    }),
    [data.matches],
  );

  return (
    <>
      <section className="w-full relative pt-10 pb-12 md:pt-12 md:pb-20">
        <Container>
          {/* Section Header */}
          <TopInfoStrip counts={counts} filter={filter} setFilter={setFilter} />

          {/* Matches Grid */}
          <MatchList matches={filteredMatches} />
        </Container>
      </section>
    </>
  );
}
