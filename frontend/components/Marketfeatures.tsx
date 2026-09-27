"use client";

import Link from "next/link";

import {
  LineChart,
  Wallet,
  BarChart3,
  Clock,
  type LucideIcon,
} from "lucide-react";

export type MarketStatusValue = "Open" | "Closed" | "Pre-Open";

export interface MarketOverview {
  nepse: {
    current: number;
    previousClose: number;
  };

  turnover: {
    value: string;
    label: string;
  };

  tradedStocks: {
    value: number;
    label: string;
  };

  marketStatus: {
    status: MarketStatusValue;
  };
}

export interface MarketAtGlanceProps {
  data?: MarketOverview;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export const DEFAULT_MARKET_OVERVIEW: MarketOverview = {
  nepse: {
    current: 2647.0,
    previousClose: 2654.28,
  },

  turnover: {
    value: "NPR 9.1B",
    label: "Today",
  },

  tradedStocks: {
    value: 345,
    label: "Listed / Traded",
  },

  marketStatus: {
    status: "Closed",
  },
};

/* ============================================================
   HELPERS
============================================================ */

function calculateChange(
  current: number,
  previousClose: number,
): number {
  if (!previousClose) return 0;

  return ((current - previousClose) / previousClose) * 100;
}

function formatValue(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ============================================================
   TREND ARROW
============================================================ */

function TrendArrow({ positive }: { positive: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={positive ? "rotate-0" : "rotate-180"}
    >
      <path
        d="M12 19V5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M6 11L12 5L18 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   MARKET STATUS STYLES
============================================================ */

const statusStyles: Record<
  MarketStatusValue,
  {
    dot: string;
    text: string;
    pulse: boolean;
  }
> = {
  Open: {
    dot: "bg-[#0aa852]",
    text: "text-[#0aa852]",
    pulse: true,
  },

  Closed: {
    dot: "bg-[#e31b1b]",
    text: "text-[#e31b1b]",
    pulse: false,
  },

  "Pre-Open": {
    dot: "bg-[#656565]",
    text: "text-[#656565]",
    pulse: true,
  },
};

/* ============================================================
   GLANCE CARD
============================================================ */

interface GlanceCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  subLabel: string;
  children?: React.ReactNode;
  accent?: boolean;
}

function GlanceCard({
  href,
  icon: Icon,
  label,
  value,
  subLabel,
  children,
  accent = false,
}: GlanceCardProps) {
  return (
    <Link
      href={href}
      className={[
        "group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl",
        "border bg-[#fbfbfb] p-6",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-[#0aa852] focus:ring-offset-2",
        accent
          ? "border-[#01c45a]"
          : "border-[#d5d5d5]",
      ].join(" ")}
      aria-label={`${label}: ${value}`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#656565]">
            {label}
          </p>
        </div>

        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            accent
              ? "bg-[#dcffec] text-[#0aa852]"
              : "bg-[#edf8f0] text-[#0aa852]",
          ].join(" ")}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      {/* Card Content */}
      <div className="mt-6">
        <p className="text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl">
          {value}
        </p>

        <p className="mt-2 text-sm text-[#656565]">
          {subLabel}
        </p>

        {children}
      </div>

      {/* Hover Bottom Line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#0aa852] transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

/* ============================================================
   LOADING SKELETON
============================================================ */

function LoadingSkeleton() {
  return (
    <section className="w-full bg-[#D6F0E0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* Header Skeleton */}
        <div className="mb-7">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-white/70" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-white/60" />
        </div>

        {/* Card Skeletons */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[210px] animate-pulse rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-6"
            >
              <div className="flex items-start justify-between">
                <div className="h-4 w-28 rounded bg-[#e8f3e8]" />

                <div className="h-10 w-10 rounded-xl bg-[#edf8f0]" />
              </div>

              <div className="mt-10 h-10 w-40 rounded-lg bg-[#e8f3e8]" />

              <div className="mt-4 h-4 w-24 rounded bg-[#edf8f0]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function MarketAtGlance({
  data = DEFAULT_MARKET_OVERVIEW,
  isLoading = false,
  isError = false,
  className = "",
}: MarketAtGlanceProps) {
  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (isError) {
    return (
      <section
        className={`w-full overflow-hidden bg-[#D6F0E0] px-4 py-12 sm:px-6 lg:px-8 ${className}`}
      >
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f9f4] text-[#e31b1b]">
              <LineChart size={24} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#000000]">
              Market data unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-[#656565]">
              We could not load the latest market overview.
              Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     MARKET CALCULATIONS
  ============================================================ */

  const changePercent = calculateChange(
    data.nepse.current,
    data.nepse.previousClose,
  );

  const isPositive = changePercent >= 0;

  const formattedChange = `${
    isPositive ? "+" : ""
  }${changePercent.toFixed(2)}%`;

  const marketStatus = data.marketStatus.status;

  const currentStatus = statusStyles[marketStatus];

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <section
      className={`w-full overflow-hidden bg-[#D6F0E0] px-4 py-12 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* ======================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0aa852]">
              Market Overview
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
              Market at a Glance
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656565]">
              A quick snapshot of today&apos;s Nepal stock market activity.
            </p>
          </div>

          {/* Market Status Badge */}
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fbfbfb] px-4 py-2 text-sm font-medium shadow-sm"
            aria-label={`Market status: ${marketStatus}`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                currentStatus.dot
              } ${
                currentStatus.pulse ? "animate-pulse" : ""
              }`}
            />

            <span className={currentStatus.text}>
              {marketStatus}
            </span>
          </div>
        </div>

        {/* ======================================================
            MARKET CARDS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* ==================================================
              NEPSE
          ================================================== */}

          <GlanceCard
            href="/nepse-data/summary"
            icon={LineChart}
            label="NEPSE"
            value={formatValue(data.nepse.current)}
            subLabel="Previous Close"
            accent
          >
            <div
              className={[
                "mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
                isPositive
                  ? "bg-[#dcffec] text-[#0aa852]"
                  : "bg-[#fff0f0] text-[#e31b1b]",
              ].join(" ")}
            >
              <TrendArrow positive={isPositive} />

              <span>{formattedChange}</span>
            </div>

            <p className="mt-3 text-xs text-[#656565]">
              Close: {formatValue(data.nepse.previousClose)}
            </p>
          </GlanceCard>

          {/* ==================================================
              TURNOVER
          ================================================== */}

          <GlanceCard
            href="/live-market"
            icon={Wallet}
            label="Turnover"
            value={data.turnover.value}
            subLabel={data.turnover.label}
          />

          {/* ==================================================
              TRADED STOCKS
          ================================================== */}

          <GlanceCard
            href="/live-market"
            icon={BarChart3}
            label="Traded Stocks"
            value={data.tradedStocks.value.toLocaleString("en-US")}
            subLabel={data.tradedStocks.label}
          />

          {/* ==================================================
              MARKET STATUS
          ================================================== */}

          <GlanceCard
            href="/live-market"
            icon={Clock}
            label="Market Status"
            value={marketStatus}
            subLabel="Today's Trading Session"
          >
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  currentStatus.dot
                } ${
                  currentStatus.pulse ? "animate-pulse" : ""
                }`}
              />

              <span
                className={`text-sm font-semibold ${currentStatus.text}`}
              >
                {marketStatus === "Open"
                  ? "Market is currently open"
                  : marketStatus === "Pre-Open"
                    ? "Market opens soon"
                    : "Trading session ended"}
              </span>
            </div>
          </GlanceCard>
        </div>
      </div>
    </section>
  );
}