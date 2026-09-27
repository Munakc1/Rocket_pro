"use client";

import Link from "next/link";
import {
  BarChart3,
  Minus,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";

export type MarketBreadthData = {
  advancing: number;
  declining: number;
  unchanged: number;
  totalTraded?: number;
};

export type MarketBreadthProps = {
  data?: MarketBreadthData;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  className?: string;
};

export const DEFAULT_MARKET_BREADTH: MarketBreadthData = {
  advancing: 142,
  declining: 167,
  unchanged: 36,
  totalTraded: 345,
};

type BreadthMetricProps = {
  label: string;
  value: number;
  percentage: number;
  icon: ReactNode;
  iconClassName: string;
  valueClassName: string;
};

function BreadthMetric({
  label,
  value,
  percentage,
  icon,
  iconClassName,
  valueClassName,
}: BreadthMetricProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-sm font-medium text-secondary">
            {label}
          </span>

          <span className="shrink-0 text-xs font-medium text-muted">
            {percentage}%
          </span>
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <span className={`text-xl font-bold ${valueClassName}`}>
            {value}
          </span>

          <span className="text-xs text-muted">stocks</span>
        </div>
      </div>
    </div>
  );
}

function MarketBreadthSkeleton() {
  return (
    <section
      className="w-full bg-[#d4efde] px-4 py-12 sm:px-6 lg:px-8"
      aria-label="Loading market breadth"
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-[1506px]">
        <div className="mb-7 space-y-3">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-white/70" />

          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-white/60" />
        </div>

        <div className="rounded-2xl border border-card bg-panel p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-3">
                <div className="h-10 w-full animate-pulse rounded-xl bg-chart" />
                <div className="h-5 w-24 animate-pulse rounded bg-chart" />
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="h-4 w-40 animate-pulse rounded bg-chart" />
            <div className="h-4 w-full animate-pulse rounded-full bg-chart" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketBreadthError({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  return (
    <section className="w-full bg-[#d4efde] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1506px]">
        <div className="rounded-2xl border border-card bg-panel p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart">
            <BarChart3
              size={22}
              strokeWidth={1.8}
              className="text-primary"
            />
          </div>

          <h2 className="mt-4 text-lg font-bold text-heading">
            Market breadth unavailable
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            We couldn&apos;t load the latest market breadth data.
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyMarketBreadth() {
  return (
    <section className="w-full bg-[#d4efde] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1506px]">
        <div className="rounded-2xl border border-card bg-panel p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart">
            <BarChart3
              size={22}
              strokeWidth={1.8}
              className="text-muted"
            />
          </div>

          <h2 className="mt-4 text-lg font-bold text-heading">
            No market breadth data
          </h2>

          <p className="mt-2 text-sm text-muted">
            Market breadth data is not available right now.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function MarketBreadth({
  data = DEFAULT_MARKET_BREADTH,
  isLoading = false,
  isError = false,
  onRetry,
  className = "",
}: MarketBreadthProps) {
  if (isLoading) {
    return <MarketBreadthSkeleton />;
  }

  if (isError) {
    return <MarketBreadthError onRetry={onRetry} />;
  }

  if (!data) {
    return <EmptyMarketBreadth />;
  }

  const advancing = Math.max(0, data.advancing);
  const declining = Math.max(0, data.declining);
  const unchanged = Math.max(0, data.unchanged);

  const calculatedTotal = advancing + declining + unchanged;

  const total =
    typeof data.totalTraded === "number" && data.totalTraded > 0
      ? Math.max(data.totalTraded, calculatedTotal)
      : calculatedTotal;

  if (total === 0) {
    return <EmptyMarketBreadth />;
  }

  const advancingPercentage = Math.round((advancing / total) * 100);
  const decliningPercentage = Math.round((declining / total) * 100);
  const unchangedPercentage = Math.round((unchanged / total) * 100);

  return (
    <section
      className={`w-full bg-[#d4efde] px-4 py-12 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby="market-breadth-heading"
    >
      <div className="mx-auto w-full max-w-[1506px]">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-badge"
                aria-hidden="true"
              >
                <BarChart3
                  size={18}
                  strokeWidth={2}
                  className="text-primary"
                />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                NEPSE Market
              </span>
            </div>

            <h2
              id="market-breadth-heading"
              className="text-2xl font-bold tracking-tight text-heading sm:text-3xl"
            >
              Market Breadth
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              See how stocks are moving across today&apos;s market.
            </p>
          </div>

          {/* Total Traded */}
          <div className="flex items-center gap-2 self-start rounded-full bg-panel px-4 py-2 shadow-sm sm:self-auto">
            <span
              className="h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />

            <span className="text-sm text-muted">
              Total Traded
            </span>

            <span className="text-sm font-bold text-heading">
              {total}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-card bg-panel shadow-sm">
          <div className="p-5 sm:p-6 lg:p-7">
            {/* Metrics */}
            <div className="grid gap-5 md:grid-cols-3 md:gap-0">
              <div className="md:border-r md:border-[var(--border-light)] md:pr-6">
                <BreadthMetric
                  label="Advancing"
                  value={advancing}
                  percentage={advancingPercentage}
                  icon={
                    <TrendingUp
                      size={19}
                      strokeWidth={2}
                    />
                  }
                  iconClassName="bg-badge text-primary"
                  valueClassName="text-primary"
                />
              </div>

              <div className="md:px-6">
                <BreadthMetric
                  label="Declining"
                  value={declining}
                  percentage={decliningPercentage}
                  icon={
                    <TrendingDown
                      size={19}
                      strokeWidth={2}
                    />
                  }
                  iconClassName="bg-[color-mix(in_oklab,var(--danger)_8%,transparent)] text-danger"
                  valueClassName="text-danger"
                />
              </div>

              <div className="md:border-l md:border-[var(--border-light)] md:pl-6">
                <BreadthMetric
                  label="Unchanged"
                  value={unchanged}
                  percentage={unchangedPercentage}
                  icon={
                    <Minus
                      size={19}
                      strokeWidth={2}
                    />
                  }
                  iconClassName="bg-chart text-muted"
                  valueClassName="text-muted"
                />
              </div>
            </div>

            {/* Market Distribution */}
            <div className="mt-7 border-t border-[var(--border-light)] pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-heading">
                    Market Distribution
                  </h3>

                  <p className="mt-1 text-xs text-muted">
                    Percentage of traded stocks by daily movement
                  </p>
                </div>

                {/* Legend */}
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-2"
                  aria-label="Market breadth legend"
                >
                  <div className="flex items-center gap-1.5 text-xs text-secondary">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    Advancing
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-secondary">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-danger"
                      aria-hidden="true"
                    />
                    Declining
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-secondary">
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-muted"
                      aria-hidden="true"
                    />
                    Unchanged
                  </div>
                </div>
              </div>

              {/* Distribution Bar */}
              <div
                className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-[var(--border-light)]"
                role="img"
                aria-label={`Market distribution: ${advancingPercentage}% advancing, ${decliningPercentage}% declining, ${unchangedPercentage}% unchanged`}
              >
                {advancingPercentage > 0 && (
                  <div
                    className="h-full bg-primary transition-[width] duration-500"
                    style={{
                      width: `${advancingPercentage}%`,
                    }}
                  />
                )}

                {decliningPercentage > 0 && (
                  <div
                    className="h-full bg-danger transition-[width] duration-500"
                    style={{
                      width: `${decliningPercentage}%`,
                    }}
                  />
                )}

                {unchangedPercentage > 0 && (
                  <div
                    className="h-full bg-muted transition-[width] duration-500"
                    style={{
                      width: `${unchangedPercentage}%`,
                    }}
                  />
                )}
              </div>

              {/* Percentage Summary */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-chart px-3 py-3">
                  <p className="text-xs text-muted">
                    Advancing
                  </p>

                  <p className="mt-1 text-sm font-bold text-primary">
                    {advancingPercentage}%
                  </p>
                </div>

                <div className="rounded-xl bg-[color-mix(in_oklab,var(--danger)_6%,transparent)] px-3 py-3">
                  <p className="text-xs text-muted">
                    Declining
                  </p>

                  <p className="mt-1 text-sm font-bold text-danger">
                    {decliningPercentage}%
                  </p>
                </div>

                <div className="rounded-xl bg-[var(--border-light)] px-3 py-3">
                  <p className="text-xs text-muted">
                    Unchanged
                  </p>

                  <p className="mt-1 text-sm font-bold text-muted">
                    {unchangedPercentage}%
                  </p>
                </div>
              </div>
            </div>

            {/* Market Movers Link */}
            <div className="mt-6 flex justify-end border-t border-[var(--border-light)] pt-5">
              <Link
                href="/nepse-data/market-movers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
              >
                View Market Movers
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}