"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronRight,
  Eye,
  Newspaper,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type MarketStat = {
  label: string;
  value: string;
  change: string;
  percentage: string;
  negative: boolean;
  href: string;
};

type Stock = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
};

type NewsItem = {
  category: string;
  title: string;
  date: string;
};

/* ============================================================
   MARKET DATA
============================================================ */

const marketStats: MarketStat[] = [
  {
    label: "NEPSE Index",
    value: "2,647.00",
    change: "-7.28",
    percentage: "-0.27%",
    negative: true,
    href: "/market",
  },
  {
    label: "Turnover",
    value: "NPR 9.10B",
    change: "+12.4%",
    percentage: "Today",
    negative: false,
    href: "/market/summary",
  },
  {
    label: "Traded Stocks",
    value: "345",
    change: "+18",
    percentage: "vs. previous",
    negative: false,
    href: "/market",
  },
  {
    label: "Market Breadth",
    value: "156 / 142",
    change: "Advancing",
    percentage: "Declining",
    negative: false,
    href: "/market",
  },
];

/* ============================================================
   WATCHLIST
============================================================ */

const watchlist: Stock[] = [
  {
    symbol: "SNORL",
    name: "Shivam Cements",
    price: "NPR 412.50",
    change: "+13.66%",
    positive: true,
  },
  {
    symbol: "ILBS",
    name: "Infinity Laghubitta",
    price: "NPR 1,284.00",
    change: "+9.81%",
    positive: true,
  },
  {
    symbol: "IGIPO",
    name: "Ingwa Hydropower",
    price: "NPR 438.20",
    change: "+9.05%",
    positive: true,
  },
  {
    symbol: "HATHY",
    name: "Hathway Investment",
    price: "NPR 985.00",
    change: "-15.00%",
    positive: false,
  },
];

/* ============================================================
   NEWS
============================================================ */

const news: NewsItem[] = [
  {
    category: "Market",
    title: "NEPSE market activity and daily market overview",
    date: "Today",
  },
  {
    category: "Companies",
    title: "Listed companies and sector performance update",
    date: "Today",
  },
  {
    category: "Education",
    title: "Understanding volume and price movement",
    date: "Yesterday",
  },
];

/* ============================================================
   CHART DATA
============================================================ */

const chartData = [
  48, 58, 52, 65, 61, 74, 68, 81, 72, 77,
  69, 63, 70, 58, 54, 61, 57, 49, 55, 47,
];

/* ============================================================
   DASHBOARD
============================================================ */

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [marketPeriod, setMarketPeriod] = useState("1D");

  /* ----------------------------------------------------------
     FILTER WATCHLIST
  ---------------------------------------------------------- */

  const filteredWatchlist = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return watchlist;
    }

    return watchlist.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-full space-y-6 bg-[#d4efde] p-4 sm:p-6 lg:p-8">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-[#656565]">
            Rocket Pro Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#000000] sm:text-3xl">
            Market Overview
          </h1>

          <p className="mt-1 text-sm text-[#656565]">
            Monitor Nepal&apos;s market, your watchlist, news and insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/watchlist"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm font-semibold text-[#000000] transition hover:border-[#01c45a] hover:text-[#0aa852]"
          >
            <Eye size={17} />
            Watchlist
          </Link>

          <Link
            href="/market"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#0aa852] px-4 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(10,168,82,0.18)] transition hover:bg-[#088f46]"
          >
            Explore Market
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <section className="rounded-2xl border border-[#d5d5d5] bg-white p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#656565]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your watchlist by symbol or company..."
            className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] pl-10 pr-4 text-sm text-[#000000] outline-none transition placeholder:text-[#94a3b8] focus:border-[#01c45a] focus:ring-2 focus:ring-[#dcffec]"
          />
        </div>
      </section>

      {/* ======================================================
          MARKET STATUS
      ====================================================== */}

      <section className="flex flex-col gap-3 rounded-2xl border border-[#d5d5d5] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e31b1b]" />

          <div>
            <p className="text-sm font-semibold text-[#000000]">
              Market Closed
            </p>

            <p className="text-xs text-[#656565]">
              Last market session data
            </p>
          </div>
        </div>

        <Link
          href="/market/summary"
          className="text-sm font-semibold text-[#0aa852] hover:underline"
        >
          View summary
        </Link>
      </section>

      {/* ======================================================
          MARKET STATS
      ====================================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {marketStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-[#d5d5d5] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#01c45a] hover:shadow-[0_12px_35px_rgba(10,168,82,0.07)]"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-[#656565]">
                {stat.label}
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dcffec] text-[#0aa852]">
                {stat.negative ? (
                  <TrendingDown size={17} />
                ) : (
                  <TrendingUp size={17} />
                )}
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold tracking-tight text-[#000000]">
              {stat.value}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span
                className={
                  stat.negative
                    ? "font-semibold text-[#e31b1b]"
                    : "font-semibold text-[#0aa852]"
                }
              >
                {stat.change}
              </span>

              <span className="text-[#656565]">
                {stat.percentage}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ======================================================
          MAIN GRID
      ====================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">

        {/* ====================================================
            MARKET OVERVIEW
        ==================================================== */}

        <div className="rounded-2xl border border-[#d5d5d5] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#ececec] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-[#000000]">
                NEPSE Market Overview
              </h2>

              <p className="mt-1 text-xs text-[#656565]">
                Latest available market information
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-[#edf8f0] p-1">
              {["1D", "1W", "1M"].map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setMarketPeriod(period)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    marketPeriod === period
                      ? "bg-[#0aa852] text-white"
                      : "text-[#656565] hover:text-[#0aa852]"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-2xl bg-[#edf8f0] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#656565]">
                    NEPSE Index
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#000000]">
                    2,647.00
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#e31b1b]">
                    -7.28 (-0.27%)
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#e31b1b]">
                  <TrendingDown size={19} />
                </div>
              </div>

              {/* Chart */}
              <div className="mt-8 flex h-32 items-end gap-1 overflow-hidden rounded-xl bg-white/70 px-3 pb-3">
                {chartData.map((height, index) => (
                  <div
                    key={`${marketPeriod}-${index}`}
                    className="flex-1 rounded-t-sm bg-[#0aa852]/70 transition-all duration-300"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs text-[#656565]">
                Showing {marketPeriod} market view
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MiniStat
                label="Turnover"
                value="NPR 9.10B"
              />

              <MiniStat
                label="Transactions"
                value="42.8K"
              />

              <MiniStat
                label="Advancing"
                value="156"
              />

              <MiniStat
                label="Declining"
                value="142"
              />
            </div>
          </div>
        </div>

        {/* ====================================================
            QUICK ACTIONS
        ==================================================== */}

        <div className="rounded-2xl border border-[#d5d5d5] bg-white">
          <div className="border-b border-[#ececec] px-5 py-4">
            <h2 className="font-bold text-[#000000]">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-[#656565]">
              Access your frequently used tools
            </p>
          </div>

          <div className="grid gap-3 p-5">
            <QuickAction
              href="/dashboard/watchlist"
              icon={<Eye size={19} />}
              title="My Watchlist"
              description="Track your selected companies"
            />

            <QuickAction
              href="/dashboard/alerts"
              icon={<Bell size={19} />}
              title="Market Alerts"
              description="Manage price and market alerts"
            />

            <QuickAction
              href="/dashboard/news"
              icon={<Newspaper size={19} />}
              title="Saved News"
              description="Read your saved market news"
            />

            <QuickAction
              href="/dashboard/training"
              icon={<BookOpen size={19} />}
              title="Training"
              description="Learn market concepts"
            />

            <QuickAction
              href="/dashboard/payments"
              icon={<Wallet size={19} />}
              title="Payments"
              description="View your payment history"
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          WATCHLIST + MARKET MOVERS
      ====================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ====================================================
            WATCHLIST
        ==================================================== */}

        <div className="rounded-2xl border border-[#d5d5d5] bg-white">
          <div className="flex items-center justify-between border-b border-[#ececec] px-5 py-4">
            <div>
              <h2 className="font-bold text-[#000000]">
                Watchlist
              </h2>

              <p className="mt-1 text-xs text-[#656565]">
                Your tracked companies
              </p>
            </div>

            <Link
              href="/dashboard/watchlist"
              className="text-sm font-semibold text-[#0aa852] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[#ececec]">
            {filteredWatchlist.length > 0 ? (
              filteredWatchlist.map((stock) => (
                <Link
                  key={stock.symbol}
                  href={`/company/${stock.symbol}`}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-[#f1f9f4]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf8f0] text-xs font-bold text-[#0aa852]">
                      {stock.symbol.slice(0, 2)}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#000000]">
                        {stock.symbol}
                      </p>

                      <p className="mt-0.5 max-w-[180px] truncate text-xs text-[#656565]">
                        {stock.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#393838]">
                      {stock.price}
                    </p>

                    <p
                      className={`mt-0.5 text-xs font-semibold ${
                        stock.positive
                          ? "text-[#0aa852]"
                          : "text-[#e31b1b]"
                      }`}
                    >
                      {stock.change}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-10 text-center">
                <Search className="mx-auto h-6 w-6 text-[#94a3b8]" />

                <p className="mt-3 text-sm font-semibold text-[#000000]">
                  No companies found
                </p>

                <p className="mt-1 text-xs text-[#656565]">
                  Try searching with another symbol or company name.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ====================================================
            MARKET MOVERS
        ==================================================== */}

        <div className="rounded-2xl border border-[#d5d5d5] bg-white">
          <div className="flex items-center justify-between border-b border-[#ececec] px-5 py-4">
            <div>
              <h2 className="font-bold text-[#000000]">
                Market Movers
              </h2>

              <p className="mt-1 text-xs text-[#656565]">
                Notable price movements
              </p>
            </div>

            <Link
              href="/movers"
              className="text-sm font-semibold text-[#0aa852] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-[#ececec]">
            {watchlist.map((stock) => (
              <Link
                key={`mover-${stock.symbol}`}
                href={`/company/${stock.symbol}`}
                className="flex items-center justify-between px-5 py-4 transition hover:bg-[#f1f9f4]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      stock.positive
                        ? "bg-[#dcffec] text-[#0aa852]"
                        : "bg-[#fff1f1] text-[#e31b1b]"
                    }`}
                  >
                    {stock.positive ? (
                      <TrendingUp size={17} />
                    ) : (
                      <TrendingDown size={17} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#000000]">
                      {stock.symbol}
                    </p>

                    <p className="text-xs text-[#656565]">
                      {stock.name}
                    </p>
                  </div>
                </div>

                <div
                  className={`text-sm font-bold ${
                    stock.positive
                      ? "text-[#0aa852]"
                      : "text-[#e31b1b]"
                  }`}
                >
                  {stock.change}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          NEWS
      ====================================================== */}

      <section className="rounded-2xl border border-[#d5d5d5] bg-white">
        <div className="flex items-center justify-between border-b border-[#ececec] px-5 py-4">
          <div>
            <h2 className="font-bold text-[#000000]">
              Latest News
            </h2>

            <p className="mt-1 text-xs text-[#656565]">
              Market information and educational updates
            </p>
          </div>

          <Link
            href="/dashboard/news"
            className="text-sm font-semibold text-[#0aa852] hover:underline"
          >
            View news
          </Link>
        </div>

        <div className="divide-y divide-[#ececec]">
          {news.map((item) => (
            <Link
              key={item.title}
              href="/dashboard/news"
              className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-[#f1f9f4]"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf8f0] text-[#0aa852]">
                  <Newspaper size={18} />
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-semibold text-[#0aa852]">
                    {item.category}
                  </span>

                  <p className="mt-1 truncate text-sm font-semibold text-[#000000]">
                    {item.title}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xs text-[#656565]">
                {item.date}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="rounded-2xl bg-gradient-to-r from-[#0aa852] to-[#01c45a] p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-white/80">
              Keep learning
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Build better market knowledge with Rocket Pro.
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-white/80">
              Explore educational resources covering NEPSE, market
              analysis, company fundamentals and technical concepts.
            </p>
          </div>

          <Link
            href="/dashboard/training"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#0aa852] transition hover:bg-[#f4fff8]"
          >
            Explore Training
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   MINI STAT
============================================================ */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#d5d5d5] bg-white p-3 transition hover:border-[#01c45a]">
      <p className="text-[11px] font-medium text-[#656565]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#000000]">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-[#ececec] bg-[#fbfbfb] p-3 transition hover:border-[#01c45a] hover:bg-[#f1f9f4]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dcffec] text-[#0aa852]">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#000000]">
          {title}
        </span>

        <span className="mt-0.5 block truncate text-xs text-[#656565]">
          {description}
        </span>
      </span>

      <ChevronRight
        size={17}
        className="shrink-0 text-[#94a3b8] transition group-hover:translate-x-0.5 group-hover:text-[#0aa852]"
      />
    </Link>
  );
}

