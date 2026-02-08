"use client";

import { Match } from "@/lib/types";
import { useEffect, useRef } from "react";
import { formatDate, calculateKD } from "@/lib/utils";

interface MatchModalProps {
  match: Match | null;
  onClose: () => void;
}

/**
 * Match Modal Component
 * Section 7G: 600px width, max 80vh, centered, backdrop blur
 * Section 11: Focus trap, ESC key, click outside, focus return
 */
export default function MatchModal({ match, onClose }: MatchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!match) return;

    // Store previous active element for focus return (Section 11)
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    // ESC key handler (Section 11)
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    // Focus trap (Section 11)
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "unset";
    };
  }, [match]);

  const handleClose = () => {
    onClose();
    // Return focus to trigger element (Section 11)
    setTimeout(() => {
      previousActiveElementRef.current?.focus();
    }, 100);
  };

  if (!match) return null;

  const kd = calculateKD(match.kills, match.deaths);

  // Determine badge styles
  const isWin = match.result === "Won";
  const resultsColor = isWin ? "var(--valo-success)" : "var(--valo-danger)";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 animate-fadeIn"
        style={{
          backdropFilter: "blur(8px)",
          zIndex: "var(--z-modal-backdrop)",
        }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[600px] max-h-[85vh] overflow-y-auto bg-[var(--valo-bg-surface)] rounded-2xl border border-[var(--valo-border)] shadow-level-3 animate-scaleIn flex flex-col"
        style={{ zIndex: "var(--z-modal)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header (Sticky) */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-[var(--valo-border)] bg-[var(--valo-bg-surface)]/95 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h3
              id="modal-title"
              className="font-display text-2xl font-bold text-[var(--valo-text-primary)] tracking-tight"
            >
              Match Details
            </h3>
            {/* Result Badge */}
            <div
              className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border"
              style={{
                borderColor: resultsColor,
                color: resultsColor,
                backgroundColor: isWin
                  ? "rgba(0, 214, 163, 0.1)"
                  : "rgba(255, 70, 85, 0.1)",
              }}
            >
              {match.result}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--valo-text-tertiary)] hover:text-[var(--valo-text-primary)] hover:bg-[var(--valo-bg-elevated)] transition-all duration-200"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-8">
          {/* Top Meta: Map & Agent */}
          <div className="flex items-center gap-6">
            <div className="flex-1 p-4 rounded-xl border border-[var(--valo-border)] bg-[var(--valo-bg-elevated)]/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[var(--valo-border)]/20 to-transparent -mr-4 -mt-4 rounded-full blur-xl group-hover:bg-[var(--valo-primary)]/10 transition-colors" />
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--valo-text-tertiary)] mb-1">
                Map
              </p>
              <p className="font-display text-3xl font-bold text-[var(--valo-text-primary)]">
                {match.map}
              </p>
            </div>

            <div className="flex-1 p-4 rounded-xl border border-[var(--valo-border)] bg-[var(--valo-bg-elevated)]/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[var(--valo-border)]/20 to-transparent -mr-4 -mt-4 rounded-full blur-xl group-hover:bg-[var(--valo-primary)]/10 transition-colors" />
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--valo-text-tertiary)] mb-1">
                Agent
              </p>
              <p className="font-display text-3xl font-bold text-[var(--valo-text-primary)]">
                {match.agent}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div>
            <h4 className="text-sm font-bold text-[var(--valo-text-secondary)] uppercase tracking-widest mb-4 opacity-70">
              Performance
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <StatsBox
                label="KDA"
                value={`${match.kills} / ${match.deaths} / ${match.assists}`}
              />
              <StatsBox label="KD Ratio" value={kd.toFixed(2)} />
              <StatsBox label="ACS" value={match.ACS.toString()} />
              <StatsBox
                label="HS%"
                value={`${match.headshot_percentage.toFixed(1)}%`}
              />
            </div>
          </div>

          {/* Footer Date */}
          <div className="pt-6 border-t border-[var(--valo-border)] flex items-center justify-between text-sm text-[var(--valo-text-tertiary)]">
            <span>
              Match ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
            <span className="font-mono">{formatDate(match.date_and_time)}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}

function StatsBox({ label, value }: { label: string; value: string }) {
  const isKDA = label.toLowerCase().includes("kda");

  return (
    <div
      className={`
      group relative overflow-hidden
      flex flex-col justify-between
      p-10 min-h-[125px]
      bg-white dark:bg-[#1a1f2e]
      shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_4px_16px_-2px_rgba(0,0,0,0.08),0_8px_24px_-4px_rgba(0,0,0,0.06)]
      dark:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.4),0_4px_16px_-2px_rgba(0,0,0,0.3),0_8px_24px_-4px_rgba(0,0,0,0.25)]
      hover:shadow-[0_4px_12px_-1px_rgba(0,0,0,0.12),0_8px_24px_-2px_rgba(0,0,0,0.1),0_16px_40px_-4px_rgba(0,0,0,0.08)]
      dark:hover:shadow-[0_4px_12px_-1px_rgba(0,0,0,0.5),0_8px_24px_-2px_rgba(0,0,0,0.4),0_16px_40px_-4px_rgba(0,0,0,0.35)]
      transition-all duration-500 ease-out
      ${isKDA ? "min-h-[135px]" : ""}
    `}
    >
      {/* Diagonal Racing Stripes */}
      <div className="absolute -right-8 top-0 bottom-0 w-24 bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent dark:from-rose-400/15 dark:via-rose-400/8 transform skew-x-[-12deg] group-hover:skew-x-[-8deg] transition-transform duration-700 ease-out" />
      <div className="absolute -right-12 top-0 bottom-0 w-16 bg-gradient-to-br from-violet-500/8 via-violet-500/3 to-transparent dark:from-violet-400/12 dark:via-violet-400/6 transform skew-x-[-12deg] group-hover:skew-x-[-8deg] transition-transform duration-700 ease-out delay-75" />

      {/* Label */}
      <div className="relative z-10 flex items-center gap-2.5 mb-2">
        <div
          className={`w-1.5 h-1.5 ${isKDA ? "bg-rose-500" : "bg-black/30 dark:bg-white/30"} rounded-full`}
        />
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-black/70 dark:text-white/70 transition-colors">
          {label}
        </p>
      </div>

      {/* Value */}
      <p
        className={`
        relative z-10 font-display font-semibold tracking-tighter leading-[0.85] text-black dark:text-white
        ${isKDA ? "text-4xl" : "text-3xl"}
        tabular-nums transition-transform duration-500 ease-out
        group-hover:scale-105 origin-bottom-left
      `}
      >
        {value}
      </p>

      {/* Micro Corner Detail */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <div className="flex gap-0.5">
          <div className="w-0.5 h-2.5 bg-black/10 dark:bg-white/10" />
          <div className="w-0.5 h-2.5 bg-rose-500/50" />
        </div>
      </div>
    </div>
  );
}
