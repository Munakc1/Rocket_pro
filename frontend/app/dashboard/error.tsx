"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-7 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f1] text-[#e31b1b]">
          <TriangleAlert size={22} />
        </div>

        <h1 className="mt-5 text-xl font-bold text-black">
          Market data unavailable
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#656565]">
          We couldn't load the latest dashboard information.
          Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0aa852] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#078d45]"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}