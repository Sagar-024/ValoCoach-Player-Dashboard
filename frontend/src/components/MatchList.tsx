"use client";

import { Match } from "@/lib/types";
import MatchCard from "./MatchCard";
import MatchModal from "./MatchModal";
import EmptyState from "./EmptyState";
import { useState } from "react";

export default function MatchList({ matches }: { matches: Match[] }) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  if (matches.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 z-10 relative">
        {matches.map((match, index) => (
          <MatchCard
            key={match.match_id}
            match={match}
            index={index}
            onClick={() => setSelectedMatch(match)}
          />
        ))}
      </div>

      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </>
  );
}
