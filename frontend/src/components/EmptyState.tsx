"use client";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "No matches found",
  description = "Try adjusting your filters to see more results",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 rounded-2xl border border-[var(--valo-border)] bg-[var(--valo-bg-surface)] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Icon */}
      {icon ? (
        <div className="mb-6 relative z-10">{icon}</div>
      ) : (
        <div className="mb-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-[var(--valo-bg-elevated)] border border-[var(--valo-border)] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[var(--valo-text-tertiary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="text-center space-y-2 relative z-10 max-w-md">
        <h3 className="font-display text-xl font-bold text-[var(--valo-text-primary)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--valo-text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-[var(--valo-primary)] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-[var(--valo-secondary)] opacity-5 rounded-full blur-2xl" />
    </div>
  );
}
