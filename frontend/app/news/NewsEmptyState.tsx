import Link from "next/link";
import { SearchX } from "lucide-react";

type NewsEmptyStateProps = {
  hasFilters?: boolean;
};

export default function NewsEmptyState({
  hasFilters = false,
}: NewsEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-card bg-surface p-10 text-center sm:p-14">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart text-muted">
        <SearchX size={22} strokeWidth={1.8} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-heading">
        No news found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {hasFilters
          ? "Try a different search term or category."
          : "News is not available right now."}
      </p>

      {hasFilters && (
        <Link
          href="/news"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
        >
          Clear Filters
        </Link>
      )}
    </div>
  );
}