"use client";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  Search,
} from "lucide-react";
import { useState } from "react";

const stocks = [
  {
    symbol: "SNORL",
    company: "Singati Hydro Energy",
    ltp: 900,
    change: -72,
    changePercent: -7.41,
    volume: 125430,
    turnover: 112887000,
  },
  {
    symbol: "ILBS",
    company: "Infinity Laghubitta",
    ltp: 845.5,
    change: 75.5,
    changePercent: 9.81,
    volume: 45210,
    turnover: 38250455,
  },
  {
    symbol: "IGIPO",
    company: "Ingwa Hydropower",
    ltp: 512,
    change: 42.5,
    changePercent: 9.05,
    volume: 38420,
    turnover: 19671040,
  },
  {
    symbol: "HATHY",
    company: "Himalayan Hydropower",
    ltp: 580,
    change: -102,
    changePercent: -15,
    volume: 28650,
    turnover: 16617000,
  },
  {
    symbol: "NABIL",
    company: "Nabil Bank",
    ltp: 535,
    change: 5.5,
    changePercent: 1.04,
    volume: 78450,
    turnover: 41970750,
  },
  {
    symbol: "UPPER",
    company: "Upper Tamakoshi",
    ltp: 225,
    change: 3,
    changePercent: 1.35,
    volume: 89420,
    turnover: 20119500,
  },
  {
    symbol: "SHIVM",
    company: "Shivam Cement",
    ltp: 610,
    change: 8,
    changePercent: 1.33,
    volume: 32450,
    turnover: 19794500,
  },
];

export default function LiveMarketPage() {
  const [search, setSearch] = useState("");

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#d4efde] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-[#656565]">
            Market
          </p>

          <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">
                Live Market
              </h1>

              <p className="mt-2 text-sm text-[#656565]">
                Monitor current NEPSE market activity and stock movements.
              </p>
            </div>

            {/* Market Status */}
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#01c45a] bg-[#dcffec] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0aa852]" />

              <span className="text-sm font-semibold text-[#0aa852]">
                Market Open
              </span>
            </div>
          </div>
        </div>

        {/* NEPSE Overview */}
        <section className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-6">
          <div className="grid gap-6 md:grid-cols-4">

            <div>
              <p className="text-sm text-[#656565]">
                NEPSE Index
              </p>

              <h2 className="mt-2 text-3xl font-bold text-black">
                2,654.28
              </h2>

              <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#0aa852]">
                <ArrowUp className="h-4 w-4" />
                +7.28 (+0.28%)
              </p>
            </div>

            <MarketStat
              title="Turnover"
              value="Rs. 9.10B"
            />

            <MarketStat
              title="Traded Stocks"
              value="345"
            />

            <MarketStat
              title="Transactions"
              value="78,420"
            />

          </div>
        </section>

        {/* Search */}
        <section className="flex flex-col gap-4 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

            <input
              type="text"
              placeholder="Search symbol or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#d5d5d5] bg-white py-3 pl-10 pr-4 text-sm text-black outline-none focus:border-[#0aa852]"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-[#656565]">
            <Activity className="h-4 w-4 text-[#0aa852]" />
            Live market activity
          </div>

        </section>

        {/* Market Movers */}
        <section className="grid gap-4 md:grid-cols-2">

          {/* Gainers */}
          <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5">

            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#dcffec] p-2">
                <ArrowUp className="h-4 w-4 text-[#0aa852]" />
              </div>

              <div>
                <h2 className="font-bold text-black">
                  Top Gainers
                </h2>

                <p className="text-xs text-[#656565]">
                  Strongest price movements
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {stocks
                .filter((stock) => stock.change > 0)
                .slice(0, 3)
                .map((stock) => (
                  <MoverRow
                    key={stock.symbol}
                    symbol={stock.symbol}
                    price={stock.ltp}
                    change={stock.changePercent}
                    positive
                  />
                ))}
            </div>

          </div>

          {/* Losers */}
          <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5">

            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#fff0f0] p-2">
                <ArrowDown className="h-4 w-4 text-[#e31b1b]" />
              </div>

              <div>
                <h2 className="font-bold text-black">
                  Top Losers
                </h2>

                <p className="text-xs text-[#656565]">
                  Weakest price movements
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {stocks
                .filter((stock) => stock.change < 0)
                .slice(0, 3)
                .map((stock) => (
                  <MoverRow
                    key={stock.symbol}
                    symbol={stock.symbol}
                    price={stock.ltp}
                    change={stock.changePercent}
                    positive={false}
                  />
                ))}
            </div>

          </div>

        </section>

        {/* Live Stock Table */}
        <section className="overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb]">

          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="font-bold text-black">
              Live Market Prices
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Current stock price and trading activity
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

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

                {filteredStocks.map((stock) => {
                  const positive = stock.change >= 0;

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

          {filteredStocks.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-medium text-black">
                No stocks found
              </p>

              <p className="mt-1 text-sm text-[#656565]">
                Try another symbol or company name.
              </p>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

function MarketStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#edf8f0] p-4">
      <p className="text-sm text-[#656565]">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-black">
        {value}
      </p>
    </div>
  );
}

function MoverRow({
  symbol,
  price,
  change,
  positive,
}: {
  symbol: string;
  price: number;
  change: number;
  positive: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#edf8f0] px-4 py-3">

      <div>
        <p className="font-bold text-black">
          {symbol}
        </p>

        <p className="text-xs text-[#656565]">
          Rs. {price.toFixed(2)}
        </p>
      </div>

      <p
        className={`text-sm font-semibold ${
          positive
            ? "text-[#0aa852]"
            : "text-[#e31b1b]"
        }`}
      >
        {positive ? "+" : ""}
        {change.toFixed(2)}%
      </p>

    </div>
  );
}