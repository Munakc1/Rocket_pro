"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

export default function NewsErrorState() {
  function retry() {
    window.location.reload();
  }

  return (
    <div className="rounded-2xl border border-card bg-surface p-10 text-center sm:p-14">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart text-danger">
        <TriangleAlert size={22} strokeWidth={1.8} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-heading">
        News unavailable
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        We couldn&apos;t load the latest news. Please try again.
      </p>

      <button
        type="button"
        onClick={retry}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
      >
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>
  );
}