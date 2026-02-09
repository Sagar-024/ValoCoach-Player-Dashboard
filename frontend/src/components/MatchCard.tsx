"use client";

import { Match } from "@/lib/types";
import { formatDate, calculateKD } from "@/lib/utils";
import { memo } from "react";

interface MatchCardProps {
  match: Match;
  onClick: () => void;
  index: number;
}

const MatchCard = memo(function MatchCard({
  match,
  onClick,
  index,
}: MatchCardProps) {
  const kd = calculateKD(match.kills, match.deaths);
  const isWin = match.result === "Won";
  const isLoss = match.result === "Lost";
  const resultClass = isWin ? "win" : isLoss ? "loss" : "draw";

  // Stagger delay
  const delay = `${index * 60}ms`;

  return (
    <div
      onClick={onClick}
      className={`
        w-full cursor-pointer relative overflow-hidden rounded-xl border transition-all duration-200
        ${
          isWin
            ? "bg-[rgba(0,214,163,0.03)] border-[rgba(0,214,163,0.2)] hover:border-[rgba(0,214,163,0.4)]"
            : isLoss
              ? "bg-[rgba(255,70,85,0.03)] border-[rgba(255,70,85,0.2)] hover:border-[rgba(255,70,85,0.4)]"
              : "bg-[rgba(255,184,0,0.03)] border-[rgba(255,184,0,0.2)] hover:border-[rgba(255,184,0,0.4)]"
        }
        hover:shadow-md hover:-translate-y-[2px]
      `}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${match.result} match on ${match.map}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-4">
        {/* Left: Map + Agent */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[120px]">
          <p className="font-display font-bold text-lg text-[var(--valo-text-primary)] leading-none">
            {match.map}
          </p>
          <p className="text-xs font-medium text-[var(--valo-text-secondary)] mt-1">
            {match.agent}
          </p>
        </div>

        {/* Center: Stats */}
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[10px] text-[var(--valo-text-tertiary)] font-bold uppercase tracking-wider">
            {formatDate(match.date_and_time)}
          </p>
          <div className="flex items-center gap-3">
            <p className="font-mono font-bold text-base text-[var(--valo-text-primary)] tracking-tight">
              {match.kills} / {match.deaths} / {match.assists}
            </p>
            <span className="w-1 h-1 rounded-full bg-[var(--valo-text-tertiary)] opacity-50" />
            <p className="text-sm font-medium text-[var(--valo-text-secondary)]">
              {match.ACS} ACS
            </p>
          </div>
        </div>

        {/* Right: Result + K/D */}
        <div className="flex flex-col items-center md:items-end min-w-[100px] gap-2">
          <div
            className={`
            px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
            ${
              isWin
                ? "bg-[rgba(0,214,163,0.1)] text-[var(--valo-success)] border-[rgba(0,214,163,0.2)]"
                : isLoss
                  ? "bg-[rgba(255,70,85,0.1)] text-[var(--valo-danger)] border-[rgba(255,70,85,0.2)]"
                  : "bg-[rgba(255,184,0,0.1)] text-[var(--valo-warning)] border-[rgba(255,184,0,0.2)]"
            }
          `}
          >
            {match.result}
          </div>
          <div className="text-center md:text-right">
            <p className="font-mono font-bold text-xl text-[var(--valo-text-primary)] leading-none">
              {kd.toFixed(2)}
            </p>
            <p className="text-[10px] text-[var(--valo-text-secondary)] mt-0.5">
              KD Ratio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MatchCard;
