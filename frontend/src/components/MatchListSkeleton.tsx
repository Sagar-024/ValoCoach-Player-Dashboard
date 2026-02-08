"use client";

/**
 * Match List Skeleton
 * Section 12: Loading placeholder, prevents layout shift
 */
export default function MatchListSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-[88px] rounded-lg border border-[var(--valo-border)] bg-[var(--valo-bg-surface)] animate-pulse"
          style={{
            borderLeftWidth: "3px",
            borderLeftColor: "var(--valo-border)",
          }}
        >
          <div className="h-full flex items-center gap-4 px-4">
            <div className="flex-[0_0_30%] space-y-2">
              <div className="h-5 bg-[var(--valo-bg-elevated)] rounded w-3/4" />
              <div className="h-4 bg-[var(--valo-bg-elevated)] rounded w-1/2" />
            </div>
            <div className="flex-[0_0_40%] space-y-2">
              <div className="h-3 bg-[var(--valo-bg-elevated)] rounded w-1/3" />
              <div className="h-4 bg-[var(--valo-bg-elevated)] rounded w-2/3" />
              <div className="h-3 bg-[var(--valo-bg-elevated)] rounded w-1/2" />
            </div>
            <div className="flex-[0_0_30%] flex flex-col items-end space-y-2">
              <div className="h-6 bg-[var(--valo-bg-elevated)] rounded-full w-16" />
              <div className="h-3 bg-[var(--valo-bg-elevated)] rounded w-12" />
              <div className="h-4 bg-[var(--valo-bg-elevated)] rounded w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
