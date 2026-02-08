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
    <>
      <div
        onClick={onClick}
        className={`match-card ${resultClass} w-full cursor-pointer relative overflow-hidden`}
        style={{
          animationDelay: delay,
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${match.result} match on ${match.map}`}
      >
        {/* Left: Map + Agent */}
        <div className="match-card-left">
          <p
            className="font-display font-bold text-[var(--valo-text-primary)] truncate"
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {match.map}
          </p>
          <p className="text-sm font-medium text-[var(--valo-text-secondary)] truncate mt-0.5">
            {match.agent}
          </p>
        </div>

        {/* Center: Stats */}
        <div className="match-card-center">
          <p className="text-xs text-[var(--valo-text-tertiary)] md:mb-2 font-medium uppercase tracking-wider">
            {formatDate(match.date_and_time)}
          </p>
          <div className="flex items-center gap-3">
            <p
              className="font-mono font-bold text-[var(--valo-text-primary)]"
              style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
            >
              {match.kills}/{match.deaths}/{match.assists}
            </p>
            <span className="text-xs text-[var(--valo-text-tertiary)]">•</span>
            <p className="text-sm text-[var(--valo-text-secondary)]">
              {match.ACS} ACS
            </p>
          </div>
        </div>

        {/* Right: Result + K/D */}
        <div className="match-card-right">
          <div className="result-badge">{match.result}</div>
          <div className="text-right">
            <p className="font-mono font-bold text-[var(--valo-text-primary)] kd-ratio leading-none">
              {kd.toFixed(2)}
            </p>
            <p className="text-xs text-[var(--valo-text-primary)] mt-1">
              {match.headshot_percentage.toFixed(1)}% HS
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Base (Mobile) Styles - Compact Grid */
        .match-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "left right"
            "center center";
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--valo-bg-elevated);
          border: 1px solid var(--valo-border);
          border-radius: 12px;
          border-left: 4px solid transparent;
          transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation: slideUp 600ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .match-card:hover {
          background: var(--valo-bg-surface);
          transform: translateY(-4px) scale-[1.01];
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .match-card.win:hover {
          border-color: var(--valo-success);
          box-shadow:
            0 20px 25px -5px rgba(0, 214, 163, 0.2),
            0 10px 10px -5px rgba(0, 214, 163, 0.1),
            0 0 0 1px var(--valo-success),
            0 0 30px -5px rgba(0, 214, 163, 0.3);
        }

        .match-card.loss:hover {
          border-color: var(--valo-danger);
          box-shadow:
            0 20px 25px -5px rgba(255, 70, 85, 0.2),
            0 10px 10px -5px rgba(255, 70, 85, 0.1),
            0 0 0 1px var(--valo-danger),
            0 0 30px -5px rgba(255, 70, 85, 0.3);
        }

        .match-card.draw:hover {
          border-color: var(--valo-warning);
          box-shadow:
            0 20px 25px -5px rgba(255, 184, 0, 0.2),
            0 10px 10px -5px rgba(255, 184, 0, 0.1),
            0 0 0 1px var(--valo-warning),
            0 0 30px -5px rgba(255, 184, 0, 0.3);
        }

        /* Result Styles */
        .match-card.win {
          border-left-color: #00d6a3;
          background: linear-gradient(
            90deg,
            rgba(0, 214, 163, 0.08) 0%,
            transparent 20%
          );
        }
        .match-card.loss {
          border-left-color: #ff4655;
          background: linear-gradient(
            90deg,
            rgba(255, 70, 85, 0.08) 0%,
            transparent 20%
          );
        }
        .match-card.draw {
          border-left-color: #ffb800;
          background: linear-gradient(
            90deg,
            rgba(255, 184, 0, 0.06) 0%,
            transparent 20%
          );
        }

        /* Result Badge */
        .result-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .match-card.win .result-badge {
          background: rgba(0, 214, 163, 0.2);
          color: #00ffb8;
          border: 1px solid rgba(0, 214, 163, 0.3);
        }
        .match-card.loss .result-badge {
          background: rgba(255, 70, 85, 0.2);
          color: #ff6b77;
          border: 1px solid rgba(255, 70, 85, 0.3);
        }
        .match-card.draw .result-badge {
          background: rgba(255, 184, 0, 0.2);
          color: #ffd166;
          border: 1px solid rgba(255, 184, 0, 0.3);
        }

        .kd-ratio {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .match-card-left {
          grid-area: left;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .match-card-center {
          grid-area: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 4px 0;
          margin-top: 4px;
          gap: 16px;
        }

        .match-card-right {
          grid-area: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .text-right {
          text-align: right;
        }

        /* Tablet/Desktop Styles (min-width: 768px) */
        @media (min-width: 768px) {
          .match-card {
            grid-template-columns: 1fr 1.2fr 0.8fr;
            grid-template-areas: none;
            gap: 24px;
            padding: 32px;
            border-radius: 16px;
          }

          .match-card-left {
            grid-area: auto;
            gap: 4px;
          }

          .match-card-center {
            grid-area: auto;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            background: none;
            border-radius: 0;
            padding: 0;
            margin-top: 0;
          }

          .match-card-right {
            grid-area: auto;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
          }

          .result-badge {
            padding: 6px 12px;
            font-size: 0.75rem;
          }

          .kd-ratio {
            font-size: 1.75rem;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
});

export default MatchCard;
