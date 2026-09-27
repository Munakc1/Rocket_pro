"use client";

import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  ChevronRight,
  Clock3,
  Coins,
  Gauge,
  LineChart as LineChartIcon,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import MarketBreadth, {
  type MarketBreadthData,
} from "@/components/MarketBreadth";

/* =========================================================
   TYPES
========================================================= */

export type MarketDirection = "positive" | "negative" | "neutral";

export type MarketMetric = {
  label: string;
  value: string;
  change?: string;
  direction?: MarketDirection;
  icon?: React.ReactNode;
};

export type StockSummary = {
  rank?: number;
  symbol: string;
  company?: string;
  ltp: string;
  change?: string;
  changePercent?: string;
  volume?: string;
  turnover?: string;
  direction?: MarketDirection;
};

export type SectorSummary = {
  name: string;
  value: string;
  changePercent: string;
  direction?: MarketDirection;
};

export type TechnicalSnapshotData = {
  rsi?: string;
  macd?: string;
  sma20?: string;
  sma50?: string;
  sma200?: string;
};

export type MarketSummaryData = {
  marketStatus?: "open" | "closed";

  lastUpdated?: string;

  nepse?: {
    value: string;
    change: string;
    changePercent: string;
    direction: MarketDirection;
    chart?: number[];
    /** Optional matching x-axis labels (e.g. times). Falls back to index. */
    chartLabels?: string[];
  };

  overview?: {
    turnover?: string;
    tradedShares?: string;
    transactions?: string;
    tradedCompanies?: string;
    marketCapitalization?: string;
  };

  breadth?: MarketBreadthData;

  topGainers?: StockSummary[];
  topLosers?: StockSummary[];
  mostActive?: StockSummary[];
  turnoverLeaders?: StockSummary[];

  sectors?: SectorSummary[];

  technical?: TechnicalSnapshotData;
};

export type MarketSummaryProps = {
  data?: MarketSummaryData;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  className?: string;
};

/* =========================================================
   DEFAULT EMPTY DATA
========================================================= */

export const DEFAULT_MARKET_SUMMARY: MarketSummaryData = {
  marketStatus: "closed",

  lastUpdated: undefined,

  nepse: undefined,

  overview: undefined,

  breadth: undefined,

  topGainers: [],
  topLosers: [],
  mostActive: [],
  turnoverLeaders: [],

  sectors: [],

  technical: {},
};

/* =========================================================
   HELPERS
========================================================= */

function getDirectionClass(direction?: MarketDirection) {
  if (direction === "positive") {
    return "text-primary";
  }

  if (direction === "negative") {
    return "text-danger";
  }

  return "text-muted";
}

function getDirectionBg(direction?: MarketDirection) {
  if (direction === "positive") {
    return "bg-badge";
  }

  if (direction === "negative") {
    return "bg-[color-mix(in_oklab,var(--danger)_8%,transparent)]";
  }

  return "bg-chart";
}

function getDirectionIcon(direction?: MarketDirection) {
  if (direction === "positive") {
    return <ArrowUpRight size={15} strokeWidth={2} />;
  }

  if (direction === "negative") {
    return <ArrowDownRight size={15} strokeWidth={2} />;
  }

  return null;
}

function parsePercent(value?: string) {
  if (!value) return 0;
  const parsed = Number.parseFloat(value.replace("%", "").replace("+", ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

/* =========================================================
   PAGE HEADER
========================================================= */

function SummaryHeader({
  status = "closed",
  lastUpdated,
}: {
  status?: "open" | "closed";
  lastUpdated?: string;
}) {
  const isOpen = status === "open";

  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-badge text-primary">
            <BarChart3 size={18} strokeWidth={2} />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            NEPSE Market
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
          Daily Market Summary
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          A quick overview of today&apos;s NEPSE market performance, activity
          and market breadth.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-card bg-surface px-4 py-2.5 shadow-sm">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isOpen ? "bg-primary" : "bg-muted"
            }`}
          />

          <span className="text-sm font-semibold text-body">
            {isOpen ? "Market Open" : "Market Closed"}
          </span>
        </div>

        {lastUpdated && (
          <div className="inline-flex items-center gap-2 rounded-full border border-card bg-surface px-4 py-2.5 shadow-sm">
            <Clock3 size={15} className="text-muted" />

            <span className="text-sm text-muted">Last Updated:</span>

            <span className="text-sm font-semibold text-heading">
              {lastUpdated}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MARKET OVERVIEW
========================================================= */

function OverviewCard({ label, value, change, direction, icon }: MarketMetric) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            {label}
          </p>

          <p className="mt-2 text-2xl font-extrabold tracking-tight text-heading">
            {value || "—"}
          </p>
        </div>

        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-badge text-primary">
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-sm font-bold ${getDirectionClass(
              direction,
            )}`}
          >
            {getDirectionIcon(direction)}
            {change}
          </span>

          <span className="text-xs text-muted">today</span>
        </div>
      )}
    </div>
  );
}

function MarketOverview({ data }: { data?: MarketSummaryData["overview"] }) {
  const metrics: MarketMetric[] = [
    {
      label: "Turnover",
      value: data?.turnover ?? "—",
      icon: <Wallet size={19} strokeWidth={1.8} />,
    },
    {
      label: "Traded Shares",
      value: data?.tradedShares ?? "—",
      icon: <Coins size={19} strokeWidth={1.8} />,
    },
    {
      label: "Transactions",
      value: data?.transactions ?? "—",
      icon: <Activity size={19} strokeWidth={1.8} />,
    },
    {
      label: "Traded Companies",
      value: data?.tradedCompanies ?? "—",
      icon: <Building2 size={19} strokeWidth={1.8} />,
    },
    {
      label: "Market Capitalization",
      value: data?.marketCapitalization ?? "—",
      icon: <BarChart3 size={19} strokeWidth={1.8} />,
    },
  ];

  return (
    <section aria-labelledby="market-overview-heading">
      <SectionHeading
        eyebrow="MARKET ACTIVITY"
        title="Market Overview"
        description="Key numbers from today's trading session."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <OverviewCard key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   NEPSE PERFORMANCE (Recharts Area/Line chart)
========================================================= */

function NepseChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string | number;
}) {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;

  return (
    <div className="rounded-lg border border-card bg-surface px-3 py-2 shadow-lg">
      {label !== undefined && (
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
      )}
      <p className="text-sm font-extrabold text-heading">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

function MiniMarketChart({
  points,
  labels,
  direction,
}: {
  points?: number[];
  labels?: string[];
  direction?: MarketDirection;
}) {
  if (!points || points.length < 2) {
    return (
      <div className="flex h-full min-h-[190px] items-center justify-center rounded-2xl bg-chart">
        <div className="text-center">
          <LineChartIcon
            size={28}
            className="mx-auto text-primary"
            strokeWidth={1.5}
          />

          <p className="mt-2 text-xs text-muted">
            Intraday chart data unavailable
          </p>
        </div>
      </div>
    );
  }

  const stroke = direction === "negative" ? "var(--danger)" : "var(--primary)";

  const chartData = points.map((value, index) => ({
    label: labels?.[index] ?? String(index + 1),
    value,
  }));

  const values = points;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min || 1) * 0.08;

  return (
    <div className="relative min-h-[190px] overflow-hidden rounded-2xl bg-chart p-3">
      <ResponsiveContainer width="100%" height="100%" minHeight={190}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="nepseAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.28} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="label" hide />
          <YAxis domain={[min - pad, max + pad]} hide />

          <Tooltip
            content={<NepseChartTooltip />}
            cursor={{ stroke: "var(--border-light)", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2.5}
            fill="url(#nepseAreaFill)"
            dot={false}
            activeDot={{ r: 4.5, strokeWidth: 2, stroke: "var(--surface)", fill: stroke }}
            isAnimationActive
            animationDuration={600}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function NepsePerformance({ data }: { data?: MarketSummaryData["nepse"] }) {
  const direction = data?.direction ?? "neutral";

  return (
    <section aria-labelledby="nepse-performance-heading">
      <SectionHeading
        eyebrow="INDEX PERFORMANCE"
        title="NEPSE Index"
        description="Intraday index performance and daily movement."
      />

      <div className="card overflow-hidden">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge text-primary">
                  <TrendingUp size={19} strokeWidth={1.8} />
                </div>

                <span className="text-sm font-bold text-body">NEPSE</span>
              </div>

              <div className="mt-7">
                <p className="text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
                  {data?.value ?? "—"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold ${getDirectionBg(
                      direction,
                    )} ${getDirectionClass(direction)}`}
                  >
                    {getDirectionIcon(direction)}
                    {data?.change ?? "—"}
                  </span>

                  <span
                    className={`text-sm font-bold ${getDirectionClass(direction)}`}
                  >
                    {data?.changePercent ?? "—"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/nepse-data/chart"
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary transition-opacity hover:opacity-80"
            >
              View Full Chart
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="border-t border-card p-4 lg:border-l lg:border-t-0">
            <MiniMarketChart
              points={data?.chart}
              labels={data?.chartLabels}
              direction={direction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[0.13em] text-primary">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-heading">
        {title}
      </h2>

      {description && <p className="mt-1.5 text-sm text-muted">{description}</p>}
    </div>
  );
}

/* =========================================================
   MARKET TABLE
========================================================= */

function StockTable({
  stocks,
  type,
}: {
  stocks: StockSummary[];
  type: "gainers" | "losers" | "active" | "turnover";
}) {
  if (!stocks.length) {
    return <EmptyTableState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-card">
            {type !== "active" && type !== "turnover" && (
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">
                #
              </th>
            )}

            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">
              Symbol
            </th>

            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-muted">
              Company
            </th>

            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted">
              LTP
            </th>

            {(type === "gainers" || type === "losers") && (
              <>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted">
                  Change
                </th>

                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted">
                  Change %
                </th>
              </>
            )}

            {(type === "active" ||
              type === "turnover" ||
              type === "gainers" ||
              type === "losers") && (
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted">
                Volume
              </th>
            )}

            {(type === "active" || type === "turnover") && (
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wide text-muted">
                Turnover
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {stocks.map((stock, index) => {
            const direction =
              stock.direction ??
              (type === "gainers"
                ? "positive"
                : type === "losers"
                  ? "negative"
                  : "neutral");

            return (
              <tr
                key={`${stock.symbol}-${index}`}
                className="border-b border-card last:border-b-0"
              >
                {type !== "active" && type !== "turnover" && (
                  <td className="px-4 py-4 text-sm font-semibold text-muted">
                    {stock.rank ?? index + 1}
                  </td>
                )}

                <td className="px-4 py-4">
                  <span className="font-bold text-heading">{stock.symbol}</span>
                </td>

                <td className="max-w-[220px] truncate px-4 py-4 text-sm text-body">
                  {stock.company ?? "—"}
                </td>

                <td className="px-4 py-4 text-right text-sm font-bold text-stock-price">
                  {stock.ltp}
                </td>

                {(type === "gainers" || type === "losers") && (
                  <>
                    <td
                      className={`px-4 py-4 text-right text-sm font-semibold ${getDirectionClass(
                        direction,
                      )}`}
                    >
                      {stock.change ?? "—"}
                    </td>

                    <td
                      className={`px-4 py-4 text-right text-sm font-bold ${getDirectionClass(
                        direction,
                      )}`}
                    >
                      {stock.changePercent ?? "—"}
                    </td>
                  </>
                )}

                {(type === "active" ||
                  type === "turnover" ||
                  type === "gainers" ||
                  type === "losers") && (
                  <td className="px-4 py-4 text-right text-sm text-body">
                    {stock.volume ?? "—"}
                  </td>
                )}

                {(type === "active" || type === "turnover") && (
                  <td className="px-4 py-4 text-right text-sm font-semibold text-body">
                    {stock.turnover ?? "—"}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EmptyTableState() {
  return (
    <div className="flex min-h-[180px] items-center justify-center bg-chart px-6 text-center">
      <div>
        <BarChart3 size={28} strokeWidth={1.6} className="mx-auto text-muted" />

        <p className="mt-3 text-sm font-semibold text-heading">
          No market data available
        </p>

        <p className="mt-1 text-xs text-muted">
          Market information will appear here when data is available.
        </p>
      </div>
    </div>
  );
}

function StockSection({
  title,
  eyebrow,
  description,
  stocks,
  type,
  href,
  linkLabel,
}: {
  title: string;
  eyebrow: string;
  description: string;
  stocks: StockSummary[];
  type: "gainers" | "losers" | "active" | "turnover";
  href: string;
  linkLabel: string;
}) {
  return (
    <section>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <div className="card overflow-hidden">
        <StockTable stocks={stocks} type={type} />

        <div className="flex justify-end border-t border-card px-5 py-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80"
          >
            {linkLabel}
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTOR PERFORMANCE (Recharts horizontal Bar chart)
========================================================= */

function SectorBarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { name: string; change: number; value: string } }>;
}) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload;
  const isNegative = item.change < 0;

  return (
    <div className="rounded-lg border border-card bg-surface px-3 py-2 shadow-lg">
      <p className="text-xs font-bold text-heading">{item.name}</p>
      <p className="text-[11px] text-muted">Index: {item.value}</p>
      <p
        className={`mt-0.5 text-sm font-extrabold ${
          isNegative ? "text-danger" : "text-primary"
        }`}
      >
        {item.change > 0 ? "+" : ""}
        {item.change}%
      </p>
    </div>
  );
}

function SectorBarChart({ sectors }: { sectors: SectorSummary[] }) {
  const data = sectors.map((sector) => ({
    name: sector.name,
    value: sector.value,
    change: parsePercent(sector.changePercent),
    direction:
      sector.direction ??
      (parsePercent(sector.changePercent) < 0 ? "negative" : "positive"),
  }));

  const chartHeight = Math.max(240, data.length * 44);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 28, left: 4, bottom: 4 }}
        barCategoryGap={12}
      >
        <CartesianGrid
          horizontal={false}
          stroke="var(--border-light)"
          strokeDasharray="3 3"
        />

        <XAxis
          type="number"
          tickFormatter={(value) => `${value}%`}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="category"
          dataKey="name"
          width={150}
          tick={{ fontSize: 12, fill: "var(--body)", fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          content={<SectorBarTooltip />}
          cursor={{ fill: "var(--chart)" }}
        />

        <Bar dataKey="change" radius={[0, 6, 6, 0]} maxBarSize={16} isAnimationActive animationDuration={600}>
          {data.map((entry, index) => (
            <Cell
              key={`sector-bar-${index}`}
              fill={entry.direction === "negative" ? "var(--danger)" : "var(--primary)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function SectorPerformance({ sectors = [] }: { sectors?: SectorSummary[] }) {
  return (
    <section>
      <SectionHeading
        eyebrow="SECTOR PERFORMANCE"
        title="Sector Performance"
        description="Daily movement across NEPSE market sectors."
      />

      <div className="card overflow-hidden">
        {!sectors.length ? (
          <EmptyTableState />
        ) : (
          <>
            <div className="p-5">
              <SectorBarChart sectors={sectors} />
            </div>

            <div className="divide-y divide-[var(--border-light)] border-t border-card">
              {sectors.map((sector) => {
                const direction = sector.direction ?? "neutral";

                return (
                  <div
                    key={sector.name}
                    className="flex items-center justify-between gap-4 px-5 py-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-heading">
                        {sector.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        Index: {sector.value}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold ${getDirectionBg(
                        direction,
                      )} ${getDirectionClass(direction)}`}
                    >
                      {getDirectionIcon(direction)}
                      {sector.changePercent}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   MARKET ACTIVITY
========================================================= */

function MarketActivity({ data }: { data?: MarketSummaryData["overview"] }) {
  const items: [string, string | undefined][] = [
    ["Total Turnover", data?.turnover],
    ["Total Volume", data?.tradedShares],
    ["Transactions", data?.transactions],
    ["Traded Companies", data?.tradedCompanies],
    ["Market Capitalization", data?.marketCapitalization],
  ];

  return (
    <section>
      <SectionHeading
        eyebrow="TRADING ACTIVITY"
        title="Market Activity"
        description="A compact view of today's overall market activity."
      />

      <div className="card divide-y divide-[var(--border-light)]">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <span className="text-sm text-muted">{label}</span>

            <span className="text-sm font-bold text-heading">
              {value || "—"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   MARKET HIGHLIGHTS
========================================================= */

function MarketHighlights({ data }: { data?: MarketSummaryData }) {
  const highestGainer = data?.topGainers?.[0];
  const highestLoser = data?.topLosers?.[0];
  const highestTurnover = data?.turnoverLeaders?.[0];
  const highestVolume = data?.mostActive?.[0];

  const highlights = [
    {
      label: "Highest Gainer",
      value: highestGainer?.symbol ?? "—",
      detail: highestGainer?.changePercent ?? "—",
      direction: "positive" as MarketDirection,
      icon: <TrendingUp size={18} />,
    },
    {
      label: "Highest Loser",
      value: highestLoser?.symbol ?? "—",
      detail: highestLoser?.changePercent ?? "—",
      direction: "negative" as MarketDirection,
      icon: <TrendingDown size={18} />,
    },
    {
      label: "Highest Turnover",
      value: highestTurnover?.symbol ?? "—",
      detail: highestTurnover?.turnover ?? "—",
      direction: "neutral" as MarketDirection,
      icon: <Wallet size={18} />,
    },
    {
      label: "Highest Volume",
      value: highestVolume?.symbol ?? "—",
      detail: highestVolume?.volume ?? "—",
      direction: "neutral" as MarketDirection,
      icon: <Activity size={18} />,
    },
  ];

  return (
    <section>
      <SectionHeading
        eyebrow="MARKET HIGHLIGHTS"
        title="Today's Highlights"
        description="Key market leaders from the trading session."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                {item.label}
              </span>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${getDirectionBg(
                  item.direction,
                )} ${getDirectionClass(item.direction)}`}
              >
                {item.icon}
              </div>
            </div>

            <p className="mt-5 text-xl font-extrabold text-heading">
              {item.value}
            </p>

            <p
              className={`mt-1 text-sm font-bold ${getDirectionClass(
                item.direction,
              )}`}
            >
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   TECHNICAL SNAPSHOT
========================================================= */

function TechnicalSnapshot({ technical }: { technical?: TechnicalSnapshotData }) {
  const items: [string, string | undefined][] = [
    ["RSI (14)", technical?.rsi],
    ["MACD", technical?.macd],
    ["SMA 20", technical?.sma20],
    ["SMA 50", technical?.sma50],
    ["SMA 200", technical?.sma200],
  ];

  return (
    <section>
      <SectionHeading
        eyebrow="TECHNICAL SNAPSHOT"
        title="Market Indicators"
        description="Selected technical indicators for the broader market."
      />

      <div className="card overflow-hidden">
        <div className="grid divide-y divide-[var(--border-light)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {items.map(([label, value]) => (
            <div key={label} className="p-5">
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-primary" strokeWidth={1.8} />

                <span className="text-xs font-bold uppercase tracking-wide text-muted">
                  {label}
                </span>
              </div>

              <p className="mt-4 text-xl font-extrabold text-heading">
                {value || "—"}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-card px-5 py-4">
          <Link
            href="/nepse-data/technical-analysis"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80"
          >
            View Technical Analysis
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   LOADING
========================================================= */

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-chart ${className}`} />;
}

function MarketSummarySkeleton() {
  return (
    <main className="min-h-screen bg-app py-10 sm:py-12">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SkeletonBlock className="h-5 w-28" />
          <SkeletonBlock className="mt-4 h-10 w-72 max-w-full" />
          <SkeletonBlock className="mt-3 h-5 w-[520px] max-w-full" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="card p-5">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="mt-4 h-8 w-32" />
              <SkeletonBlock className="mt-4 h-4 w-20" />
            </div>
          ))}
        </div>

        <div className="mt-10 card p-6">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="mt-4 h-8 w-64" />
          <SkeletonBlock className="mt-6 h-48 w-full" />
        </div>

        <div className="mt-10 card overflow-hidden">
          <div className="p-5">
            <SkeletonBlock className="h-5 w-48" />
            <SkeletonBlock className="mt-3 h-4 w-72" />
          </div>

          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border-t border-card px-5 py-4">
              <SkeletonBlock className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   ERROR
========================================================= */

function MarketSummaryError({ onRetry }: { onRetry?: () => void }) {
  return (
    <main className="min-h-screen bg-app py-10 sm:py-12">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="card flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-badge text-primary">
            <BarChart3 size={24} strokeWidth={1.8} />
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-heading">
            Market data unavailable
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            We couldn&apos;t load the latest NEPSE market data. Please try
            again.
          </p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   MAIN MARKET SUMMARY
========================================================= */

export default function MarketSummary({
  data = DEFAULT_MARKET_SUMMARY,
  isLoading = false,
  isError = false,
  onRetry,
  className = "",
}: MarketSummaryProps) {
  if (isLoading) {
    return <MarketSummarySkeleton />;
  }

  if (isError) {
    return <MarketSummaryError onRetry={onRetry} />;
  }

  return (
    <main className={`min-h-screen bg-app py-10 sm:py-12 ${className}`}>
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <SummaryHeader status={data.marketStatus} lastUpdated={data.lastUpdated} />

        <div className="space-y-12">
          {/* MARKET OVERVIEW */}
          <MarketOverview data={data.overview} />

          {/* NEPSE PERFORMANCE — Recharts Area chart */}
          <NepsePerformance data={data.nepse} />

          {/* MARKET BREADTH */}
          <section>
            <MarketBreadth data={data.breadth} isLoading={false} isError={false} />
          </section>

          {/* TOP GAINERS / LOSERS */}
          <div className="grid gap-10 xl:grid-cols-2">
            <StockSection
              eyebrow="MARKET MOVERS"
              title="Top Gainers"
              description="Stocks with the strongest positive daily movement."
              stocks={data.topGainers ?? []}
              type="gainers"
              href="/nepse-data/market-movers?type=gainers"
              linkLabel="View All Gainers"
            />

            <StockSection
              eyebrow="MARKET MOVERS"
              title="Top Losers"
              description="Stocks with the strongest negative daily movement."
              stocks={data.topLosers ?? []}
              type="losers"
              href="/nepse-data/market-movers?type=losers"
              linkLabel="View All Losers"
            />
          </div>

          {/* ACTIVE / TURNOVER */}
          <div className="grid gap-10 xl:grid-cols-2">
            <StockSection
              eyebrow="TRADING ACTIVITY"
              title="Most Active Stocks"
              description="Stocks receiving the highest trading activity."
              stocks={data.mostActive ?? []}
              type="active"
              href="/nepse-data/market-movers"
              linkLabel="View Market Movers"
            />

            <StockSection
              eyebrow="TRADING ACTIVITY"
              title="Turnover Leaders"
              description="Stocks contributing the highest turnover."
              stocks={data.turnoverLeaders ?? []}
              type="turnover"
              href="/nepse-data/market-movers?sort=turnover"
              linkLabel="View Turnover Leaders"
            />
          </div>

          {/* SECTORS — Recharts horizontal Bar chart */}
          <SectorPerformance sectors={data.sectors ?? []} />

          {/* ACTIVITY + HIGHLIGHTS */}
          <div className="grid gap-10 xl:grid-cols-[0.8fr_1.2fr]">
            <MarketActivity data={data.overview} />

            <MarketHighlights data={data} />
          </div>

          {/* TECHNICAL SNAPSHOT */}
          <TechnicalSnapshot technical={data.technical} />
        </div>
      </div>
    </main>
  );
}