"use client";

import {
  ArrowDown,
  ArrowUp,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface Stock {
  symbol: string;
  company: string;
  sector: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
  turnover: number;
}

const stocks: Stock[] = [
  {
    symbol: "ILBS",
    company: "Infinity Laghubitta",
    sector: "Microfinance",
    ltp: 845.5,
    change: 75.5,
    changePercent: 9.81,
    volume: 45210,
    turnover: 38250455,
  },
  {
    symbol: "IGIPO",
    company: "Ingwa Hydropower",
    sector: "Hydropower",
    ltp: 512,
    change: 42.5,
    changePercent: 9.05,
    volume: 38420,
    turnover: 19671040,
  },
  {
    symbol: "HATHY",
    company: "Himalayan Hydropower",
    sector: "Hydropower",
    ltp: 580,
    change: -102,
    changePercent: -15,
    volume: 28650,
    turnover: 16617000,
  },
  {
    symbol: "SNORL",
    company: "Singati Hydro Energy",
    sector: "Hydropower",
    ltp: 900,
    change: -72,
    changePercent: -7.41,
    volume: 125430,
    turnover: 112887000,
  },
  {
    symbol: "UPPER",
    company: "Upper Tamakoshi",
    sector: "Hydropower",
    ltp: 225,
    change: 3,
    changePercent: 1.35,
    volume: 89420,
    turnover: 20119500,
  },
  {
    symbol: "SHIVM",
    company: "Shivam Cement",
    sector: "Manufacturing",
    ltp: 610,
    change: 8,
    changePercent: 1.33,
    volume: 32450,
    turnover: 19794500,
  },
  {
    symbol: "NABIL",
    company: "Nabil Bank",
    sector: "Commercial Bank",
    ltp: 535,
    change: 5.5,
    changePercent: 1.04,
    volume: 78450,
    turnover: 41970750,
  },
  {
    symbol: "NIFRA",
    company: "Nepal Infrastructure Bank",
    sector: "Investment",
    ltp: 285,
    change: -2.5,
    changePercent: -0.87,
    volume: 65420,
    turnover: 18644700,
  },
];

export default function MarketMoversPage() {
  const [search, setSearch] = useState("");

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.company.toLowerCase().includes(search.toLowerCase())
  );

  const gainers = filteredStocks
    .filter((stock) => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent);

  const losers = filteredStocks
    .filter((stock) => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent);

  const mostActive = [...filteredStocks].sort(
    (a, b) => b.volume - a.volume
  );

  return (
    <main className="min-h-screen bg-[#d4efde] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-[#656565]">
            Market
          </p>

          <h1 className="mt-1 text-3xl font-bold text-black">
            Market Movers
          </h1>

          <p className="mt-2 text-sm text-[#656565]">
            See the stocks with the biggest price movements and trading activity.
          </p>
        </div>

        {/* Search */}
        <section className="flex flex-col gap-4 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

            <input
              type="text"
              placeholder="Search company or symbol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#d5d5d5] bg-white py-3 pl-10 pr-4 text-sm text-black outline-none focus:border-[#0aa852]"
            />
          </div>

          <div className="text-sm text-[#656565]">
            Today&apos;s market movers
          </div>

        </section>

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            title="Top Gainer"
            value={gainers[0]?.symbol ?? "-"}
            change={
              gainers[0]
                ? `+${gainers[0].changePercent.toFixed(2)}%`
                : "-"
            }
            positive
          />

          <SummaryCard
            title="Top Loser"
            value={losers[0]?.symbol ?? "-"}
            change={
              losers[0]
                ? `${losers[0].changePercent.toFixed(2)}%`
                : "-"
            }
            positive={false}
          />

          <SummaryCard
            title="Most Active"
            value={mostActive[0]?.symbol ?? "-"}
            change={
              mostActive[0]
                ? `${mostActive[0].volume.toLocaleString("en-IN")} volume`
                : "-"
            }
            positive
          />

          <SummaryCard
            title="Stocks Tracked"
            value={filteredStocks.length.toString()}
            change="Market movers"
            positive
          />

        </section>

        {/* Gainers + Losers */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* Gainers */}
          <MoverSection
            title="Top Gainers"
            description="Stocks with the highest positive price change."
            icon={<TrendingUp className="h-5 w-5 text-[#0aa852]" />}
            stocks={gainers}
            positive
          />

          {/* Losers */}
          <MoverSection
            title="Top Losers"
            description="Stocks with the largest negative price change."
            icon={<TrendingDown className="h-5 w-5 text-[#e31b1b]" />}
            stocks={losers}
            positive={false}
          />

        </section>

        {/* Most Active */}
        <section className="overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb]">

          <div className="border-b border-[#d5d5d5] p-5">

            <h2 className="font-bold text-black">
              Most Active Stocks
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Stocks with the highest trading volume.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              <thead>
                <tr className="border-b border-[#d5d5d5] bg-[#edf8f0] text-sm text-[#656565]">

                  <th className="px-5 py-4 text-left font-medium">
                    Symbol
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    LTP
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Change
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Change %
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Volume
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Turnover
                  </th>

                </tr>
              </thead>

              <tbody>

                {mostActive.map((stock) => {
                  const positive = stock.changePercent >= 0;

                  return (
                    <tr
                      key={stock.symbol}
                      className="border-b border-[#d5d5d5] last:border-0 hover:bg-[#edf8f0]"
                    >

                      <td className="px-5 py-4">
                        <p className="font-bold text-black">
                          {stock.symbol}
                        </p>

                        <p className="mt-1 text-xs text-[#656565]">
                          {stock.company}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-black">
                        Rs.{" "}
                        {stock.ltp.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td
                        className={`px-5 py-4 text-right font-medium ${
                          positive
                            ? "text-[#0aa852]"
                            : "text-[#e31b1b]"
                        }`}
                      >
                        {positive ? "+" : ""}
                        {stock.change.toFixed(2)}
                      </td>

                      <td
                        className={`px-5 py-4 text-right font-semibold ${
                          positive
                            ? "text-[#0aa852]"
                            : "text-[#e31b1b]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">

                          {positive ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}

                          {Math.abs(stock.changePercent).toFixed(2)}%

                        </span>
                      </td>

                      <td className="px-5 py-4 text-right text-black">
                        {stock.volume.toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4 text-right font-medium text-black">
                        Rs.{" "}
                        {stock.turnover.toLocaleString("en-IN")}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

      </div>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  change,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5">

      <p className="text-sm text-[#656565]">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-black">
        {value}
      </h3>

      <p
        className={`mt-2 text-sm font-semibold ${
          positive
            ? "text-[#0aa852]"
            : "text-[#e31b1b]"
        }`}
      >
        {change}
      </p>

    </div>
  );
}

function MoverSection({
  title,
  description,
  icon,
  stocks,
  positive,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  stocks: Stock[];
  positive: boolean;
}) {
  return (
    <section className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-[#dcffec] p-2">
          {icon}
        </div>

        <div>
          <h2 className="font-bold text-black">
            {title}
          </h2>

          <p className="text-xs text-[#656565]">
            {description}
          </p>
        </div>

      </div>

      <div className="mt-5 space-y-3">

        {stocks.slice(0, 5).map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between rounded-xl bg-[#edf8f0] px-4 py-4"
          >

            <div>
              <p className="font-bold text-black">
                {stock.symbol}
              </p>

              <p className="mt-1 text-xs text-[#656565]">
                {stock.company}
              </p>
            </div>

            <div className="text-right">

              <p className="font-semibold text-black">
                Rs. {stock.ltp.toFixed(2)}
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  positive
                    ? "text-[#0aa852]"
                    : "text-[#e31b1b]"
                }`}
              >
                {positive ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}