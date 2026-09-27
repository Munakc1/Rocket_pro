"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

export default function NewsError() {
  return (
    <main className="min-h-screen bg-app">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1500px] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-2xl border border-card bg-surface p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart text-danger">
            <TriangleAlert size={22} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-heading">
            News unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted">
            We couldn&apos;t load the latest news. Please try again.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
}