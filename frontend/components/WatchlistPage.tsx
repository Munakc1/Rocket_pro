
"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Building2,
  ChevronDown,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { WatchlistStock } from "@/lib/api/watchlist";

type SortOption =
  | "default"
  | "symbol"
  | "ltp"
  | "changePercent"
  | "volume"
  | "turnover";

type Props = {
  initialStocks: WatchlistStock[];
};

const availableStocks: WatchlistStock[] = [
  {
    symbol: "NABIL",
    companyName: "Nabil Bank Limited",
    sector: "Commercial Banks",
    ltp: 548,
    change: 8,
    changePercent: 1.48,
    volume: 125400,
    turnover: 68200000,
  },
  {
    symbol: "NICA",
    companyName: "NIC Asia Bank Limited",
    sector: "Commercial Banks",
    ltp: 412,
    change: -4,
    changePercent: -0.96,
    volume: 98400,
    turnover: 40500000,
  },
  {
    symbol: "HBL",
    companyName: "Himalayan Bank Limited",
    sector: "Commercial Banks",
    ltp: 615.5,
    change: 6.5,
    changePercent: 1.07,
    volume: 76200,
    turnover: 46900000,
  },
  {
    symbol: "NLIC",
    companyName: "Nepal Life Insurance Company",
    sector: "Life Insurance",
    ltp: 735,
    change: -7,
    changePercent: -0.94,
    volume: 45100,
    turnover: 33100000,
  },
  {
    symbol: "SHIVM",
    companyName: "Shivam Cements Limited",
    sector: "Manufacturing & Processing",
    ltp: 548,
    change: 12,
    changePercent: 2.24,
    volume: 163500,
    turnover: 89600000,
  },
  {
    symbol: "UPPER",
    companyName: "Upper Tamakoshi Hydropower Limited",
    sector: "Hydropower",
    ltp: 218,
    change: 3,
    changePercent: 1.4,
    volume: 245600,
    turnover: 53400000,
  },
  {
    symbol: "NHPC",
    companyName: "National Hydro Power Company",
    sector: "Hydropower",
    ltp: 286,
    change: -5,
    changePercent: -1.72,
    volume: 118700,
    turnover: 33900000,
  },
  {
    symbol: "HDHPC",
    companyName: "Himal Dolakha Hydropower Company",
    sector: "Hydropower",
    ltp: 214,
    change: 2,
    changePercent: 0.94,
    volume: 84200,
    turnover: 18000000,
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatPrice(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatTurnover(value: number) {
  if (value >= 1_000_000_000) {
    return `NPR ${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 1_000_000) {
    return `NPR ${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `NPR ${(value / 1_000).toFixed(1)}K`;
  }

  return `NPR ${formatNumber(value)}`;
}

function formatVolume(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return formatNumber(value);
}

export default function WatchlistPage({ initialStocks }: Props) {
  const [stocks, setStocks] = useState<WatchlistStock[]>(initialStocks);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All Sectors");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showAddStock, setShowAddStock] = useState(false);
  const [addSearch, setAddSearch] = useState("");

  const sectors = useMemo(() => {
    return [
      "All Sectors",
      ...Array.from(
        new Set(availableStocks.map((stock) => stock.sector)),
      ),
    ];
  }, []);

  const filteredStocks = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = stocks.filter((stock) => {
      const matchesSearch =
        !query ||
        stock.symbol.toLowerCase().includes(query) ||
        stock.companyName.toLowerCase().includes(query);

      const matchesSector =
        sector === "All Sectors" || stock.sector === sector;

      return matchesSearch && matchesSector;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "symbol":
          return a.symbol.localeCompare(b.symbol);

        case "ltp":
          return b.ltp - a.ltp;

        case "changePercent":
          return b.changePercent - a.changePercent;

        case "volume":
          return b.volume - a.volume;

        case "turnover":
          return b.turnover - a.turnover;

        default:
          return 0;
      }
    });
  }, [stocks, search, sector, sortBy]);

  const gainers = stocks.filter((stock) => stock.change > 0).length;
  const losers = stocks.filter((stock) => stock.change < 0).length;
  const unchanged = stocks.filter((stock) => stock.change === 0).length;

  function removeStock(symbol: string) {
    setStocks((current) =>
      current.filter((stock) => stock.symbol !== symbol),
    );
  }

  function addStock(stock: WatchlistStock) {
    setStocks((current) => {
      if (current.some((item) => item.symbol === stock.symbol)) {
        return current;
      }

      return [...current, stock];
    });

    setAddSearch("");
    setShowAddStock(false);
  }

  const addResults = availableStocks.filter((stock) => {
    const query = addSearch.trim().toLowerCase();

    if (!query) return true;

    return (
      stock.symbol.toLowerCase().includes(query) ||
      stock.companyName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-full bg-[#d4efde]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Building2
                  className="h-5 w-5 text-[#0aa852]"
                  strokeWidth={1.8}
                />

                <span className="text-xs font-medium uppercase tracking-wide text-[#656565]">
                  Dashboard
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#000] sm:text-3xl">
                Watchlist
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-[#656565]">
                Track the NEPSE companies you care about and monitor their
                latest market movements.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddStock(true)}
              className="
                inline-flex
                h-10
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#0aa852]
                px-4
                text-sm
                font-semibold
                text-white
                transition-colors
                hover:bg-[#01c45a]
                focus:outline-none
                focus:ring-2
                focus:ring-[#01c45a]/30
              "
            >
              <span className="text-lg leading-none">+</span>
              Add Stock
            </button>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <SummaryCard
            label="Total Stocks"
            value={stocks.length}
            icon={<Building2 className="h-4 w-4" />}
          />

          <SummaryCard
            label="Gainers"
            value={gainers}
            valueClassName="text-[#0aa852]"
            icon={<TrendingUp className="h-4 w-4" />}
          />

          <SummaryCard
            label="Losers"
            value={losers}
            valueClassName="text-[#e31b1b]"
            icon={<TrendingDown className="h-4 w-4" />}
          />

          <SummaryCard
            label="Unchanged"
            value={unchanged}
            valueClassName="text-[#656565]"
            icon={<ArrowUpDown className="h-4 w-4" />}
          />
        </section>

        {/* Toolbar */}
        <section className="mb-4 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] p-3">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]"
                strokeWidth={1.8}
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search symbol or company..."
                aria-label="Search watchlist"
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-[#d5d5d5]
                  bg-[#fbfbfb]
                  pl-9
                  pr-9
                  text-sm
                  text-[#000]
                  outline-none
                  placeholder:text-[#656565]
                  focus:border-[#01c45a]
                  focus:ring-2
                  focus:ring-[#01c45a]/20
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656565] hover:text-[#0aa852]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sector */}
            <div className="relative">
              <select
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                className="
                  h-10
                  w-full
                  min-w-[190px]
                  appearance-none
                  rounded-lg
                  border
                  border-[#d5d5d5]
                  bg-[#fbfbfb]
                  px-3
                  pr-9
                  text-sm
                  text-[#000]
                  outline-none
                  focus:border-[#01c45a]
                  focus:ring-2
                  focus:ring-[#01c45a]/20
                "
              >
                {sectors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="
                  h-10
                  w-full
                  min-w-[170px]
                  appearance-none
                  rounded-lg
                  border
                  border-[#d5d5d5]
                  bg-[#fbfbfb]
                  px-3
                  pr-9
                  text-sm
                  text-[#000]
                  outline-none
                  focus:border-[#01c45a]
                  focus:ring-2
                  focus:ring-[#01c45a]/20
                "
              >
                <option value="default">Default Order</option>
                <option value="symbol">Symbol</option>
                <option value="ltp">LTP: High to Low</option>
                <option value="changePercent">
                  Change %: High to Low
                </option>
                <option value="volume">Volume: High to Low</option>
                <option value="turnover">Turnover: High to Low</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656565]" />
            </div>
          </div>
        </section>

        {/* Desktop Table */}
        {filteredStocks.length > 0 ? (
          <>
            <section className="hidden overflow-hidden rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#d5d5d5] bg-[#e8f3e8]">
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Symbol
                      </th>

                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Company
                      </th>

                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Sector
                      </th>

                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        LTP
                      </th>

                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Change
                      </th>

                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Change %
                      </th>

                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Volume
                      </th>

                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Turnover
                      </th>

                      <th className="w-16 px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-[#656565]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStocks.map((stock) => (
                      <StockTableRow
                        key={stock.symbol}
                        stock={stock}
                        onRemove={() => removeStock(stock.symbol)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Mobile */}
            <section className="space-y-3 lg:hidden">
              {filteredStocks.map((stock) => (
                <StockMobileCard
                  key={stock.symbol}
                  stock={stock}
                  onRemove={() => removeStock(stock.symbol)}
                />
              ))}
            </section>
          </>
        ) : (
          <EmptyState
            hasSearch={Boolean(search || sector !== "All Sectors")}
            onClear={() => {
              setSearch("");
              setSector("All Sectors");
            }}
            onAdd={() => setShowAddStock(true)}
          />
        )}
      </div>

      {/* Add Stock Modal */}
      {showAddStock && (
        <AddStockModal
          stocks={stocks}
          search={addSearch}
          results={addResults}
          onSearch={setAddSearch}
          onAdd={addStock}
          onClose={() => {
            setShowAddStock(false);
            setAddSearch("");
          }}
        />
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  valueClassName = "text-[#000]",
  icon,
}: {
  label: string;
  value: number;
  valueClassName?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[#656565]">{label}</p>

        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#dcffec] text-[#0aa852]">
          {icon}
        </span>
      </div>

      <p className={`mt-2 text-xl font-bold ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}

function StockTableRow({
  stock,
  onRemove,
}: {
  stock: WatchlistStock;
  onRemove: () => void;
}) {
  const positive = stock.change > 0;
  const negative = stock.change < 0;

  return (
    <tr className="group border-b border-[#d5d5d5] last:border-b-0 hover:bg-[#edf8f0]">
      <td className="px-5 py-4">
        <Link
          href={`/dashboard/company/${stock.symbol}`}
          className="font-semibold text-[#000] transition-colors hover:text-[#0aa852]"
        >
          {stock.symbol}
        </Link>
      </td>

      <td className="px-5 py-4">
        <Link
          href={`/dashboard/company/${stock.symbol}`}
          className="text-sm font-medium text-[#000] transition-colors hover:text-[#0aa852]"
        >
          {stock.companyName}
        </Link>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex rounded-md bg-[#dcffec] px-2 py-1 text-[11px] font-medium text-[#0aa852]">
          {stock.sector}
        </span>
      </td>

      <td className="px-5 py-4 text-right text-sm font-semibold text-[#000]">
        {formatPrice(stock.ltp)}
      </td>

      <td
        className={`px-5 py-4 text-right text-sm font-semibold ${
          positive
            ? "text-[#0aa852]"
            : negative
              ? "text-[#e31b1b]"
              : "text-[#656565]"
        }`}
      >
        <span className="inline-flex items-center gap-1">
          {positive && <ArrowUp className="h-3.5 w-3.5" />}
          {negative && <ArrowDown className="h-3.5 w-3.5" />}
          {stock.change > 0 ? "+" : ""}
          {formatPrice(stock.change)}
        </span>
      </td>

      <td
        className={`px-5 py-4 text-right text-sm font-semibold ${
          positive
            ? "text-[#0aa852]"
            : negative
              ? "text-[#e31b1b]"
              : "text-[#656565]"
        }`}
      >
        {stock.changePercent > 0 ? "+" : ""}
        {stock.changePercent.toFixed(2)}%
      </td>

      <td className="px-5 py-4 text-right text-sm text-[#656565]">
        {formatVolume(stock.volume)}
      </td>

      <td className="px-5 py-4 text-right text-sm text-[#656565]">
        {formatTurnover(stock.turnover)}
      </td>

      <td className="px-5 py-4 text-center">
        <button
          type="button"
          onClick={onRemove}
          title={`Remove ${stock.symbol} from watchlist`}
          aria-label={`Remove ${stock.symbol} from watchlist`}
          className="
            inline-flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-[#0aa852]
            transition-colors
            hover:bg-[#dcffec]
            focus:outline-none
            focus:ring-2
            focus:ring-[#01c45a]/30
          "
        >
          <Star className="h-4 w-4 fill-current" strokeWidth={1.8} />
        </button>
      </td>
    </tr>
  );
}

function StockMobileCard({
  stock,
  onRemove,
}: {
  stock: WatchlistStock;
  onRemove: () => void;
}) {
  const positive = stock.change > 0;
  const negative = stock.change < 0;

  const valueClass = positive
    ? "text-[#0aa852]"
    : negative
      ? "text-[#e31b1b]"
      : "text-[#656565]";

  return (
    <div className="rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/company/${stock.symbol}`}
              className="font-bold text-[#000] hover:text-[#0aa852]"
            >
              {stock.symbol}
            </Link>

            <span className="rounded-md bg-[#dcffec] px-2 py-0.5 text-[10px] font-medium text-[#0aa852]">
              {stock.sector}
            </span>
          </div>

          <p className="mt-1 truncate text-xs text-[#656565]">
            {stock.companyName}
          </p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${stock.symbol} from watchlist`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#0aa852] hover:bg-[#dcffec]"
        >
          <Star className="h-4 w-4 fill-current" />
        </button>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#656565]">
            LTP
          </p>

          <p className="mt-0.5 text-lg font-bold text-[#000]">
            NPR {formatPrice(stock.ltp)}
          </p>
        </div>

        <div className={`text-right ${valueClass}`}>
          <p className="text-sm font-semibold">
            {stock.change > 0 ? "+" : ""}
            {formatPrice(stock.change)}
          </p>

          <p className="text-xs font-semibold">
            {stock.changePercent > 0 ? "+" : ""}
            {stock.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#d5d5d5] pt-3">
        <div>
          <p className="text-[10px] text-[#656565]">Volume</p>
          <p className="mt-0.5 text-xs font-medium text-[#000]">
            {formatVolume(stock.volume)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-[#656565]">Turnover</p>
          <p className="mt-0.5 text-xs font-medium text-[#000]">
            {formatTurnover(stock.turnover)}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  hasSearch,
  onClear,
  onAdd,
}: {
  hasSearch: boolean;
  onClear: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcffec]">
        <Star className="h-5 w-5 text-[#0aa852]" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-[#000]">
        {hasSearch ? "No stocks found" : "Your watchlist is empty"}
      </h2>

      <p className="mt-1 max-w-md text-sm leading-6 text-[#656565]">
        {hasSearch
          ? "Try changing your search or sector filter."
          : "Add NEPSE companies to your watchlist to quickly track their price movements and market activity."}
      </p>

      {hasSearch ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-lg border border-[#d5d5d5] bg-[#fbfbfb] px-4 py-2 text-sm font-medium text-[#000] hover:border-[#01c45a] hover:text-[#0aa852]"
        >
          Clear Filters
        </button>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="mt-5 rounded-lg bg-[#0aa852] px-4 py-2 text-sm font-semibold text-white hover:bg-[#01c45a]"
        >
          + Add Your First Stock
        </button>
      )}
    </div>
  );
}

function AddStockModal({
  stocks,
  search,
  results,
  onSearch,
  onAdd,
  onClose,
}: {
  stocks: WatchlistStock[];
  search: string;
  results: WatchlistStock[];
  onSearch: (value: string) => void;
  onAdd: (stock: WatchlistStock) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-stock-title"
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#d5d5d5] px-5 py-4">
          <div>
            <h2
              id="add-stock-title"
              className="text-base font-semibold text-[#000]"
            >
              Add to Watchlist
            </h2>

            <p className="mt-0.5 text-xs text-[#656565]">
              Search for a company or symbol.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close add stock dialog"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#656565] hover:bg-[#edf8f0] hover:text-[#0aa852]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]"
              strokeWidth={1.8}
            />

            <input
              autoFocus
              type="search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search symbol or company..."
              className="
                h-10
                w-full
                rounded-lg
                border
                border-[#d5d5d5]
                bg-[#fbfbfb]
                pl-9
                pr-3
                text-sm
                text-[#000]
                outline-none
                placeholder:text-[#656565]
                focus:border-[#01c45a]
                focus:ring-2
                focus:ring-[#01c45a]/20
              "
            />
          </div>

          <div className="mt-4 max-h-[320px] space-y-2 overflow-y-auto">
            {results.map((stock) => {
              const alreadyAdded = stocks.some(
                (item) => item.symbol === stock.symbol,
              );

              return (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between rounded-lg border border-[#d5d5d5] bg-[#fbfbfb] p-3 hover:bg-[#edf8f0]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#000]">
                      {stock.symbol}
                    </p>

                    <p className="truncate text-xs text-[#656565]">
                      {stock.companyName}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={alreadyAdded}
                    onClick={() => onAdd(stock)}
                    className={`
                      shrink-0
                      rounded-md
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      transition-colors
                      ${
                        alreadyAdded
                          ? "cursor-not-allowed bg-[#e8f3e8] text-[#656565]"
                          : "bg-[#dcffec] text-[#0aa852] hover:bg-[#0aa852] hover:text-white"
                      }
                    `}
                  >
                    {alreadyAdded ? "Added" : "Add"}
                  </button>
                </div>
              );
            })}

            {results.length === 0 && (
              <div className="py-8 text-center text-sm text-[#656565]">
                No companies found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

