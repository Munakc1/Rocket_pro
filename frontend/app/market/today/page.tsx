"use client";

import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

const stocks = [
  {
    symbol: "SNORL",
    company: "Singati Hydro Energy",
    sector: "Hydropower",
    ltp: 900.0,
    change: -72.0,
    changePercent: -7.41,
    volume: 125430,
    turnover: 112887000,
  },
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
    ltp: 512.0,
    change: 42.5,
    changePercent: 9.05,
    volume: 38420,
    turnover: 19671040,
  },
  {
    symbol: "HATHY",
    company: "Himalayan Hydropower",
    sector: "Hydropower",
    ltp: 580.0,
    change: -102.0,
    changePercent: -15.0,
    volume: 28650,
    turnover: 16617000,
  },
  {
    symbol: "NABIL",
    company: "Nabil Bank",
    sector: "Commercial Bank",
    ltp: 535.0,
    change: 5.5,
    changePercent: 1.04,
    volume: 78450,
    turnover: 41970750,
  },
  {
    symbol: "NIFRA",
    company: "Nepal Infrastructure Bank",
    sector: "Investment",
    ltp: 285.0,
    change: -2.5,
    changePercent: -0.87,
    volume: 65420,
    turnover: 18644700,
  },
  {
    symbol: "SHIVM",
    company: "Shivam Cement",
    sector: "Manufacturing",
    ltp: 610.0,
    change: 8.0,
    changePercent: 1.33,
    volume: 32450,
    turnover: 19794500,
  },
  {
    symbol: "UPPER",
    company: "Upper Tamakoshi",
    sector: "Hydropower",
    ltp: 225.0,
    change: 3.0,
    changePercent: 1.35,
    volume: 89420,
    turnover: 20119500,
  },
];

export default function SharePricePage() {
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
            NEPSE Data
          </p>

          <h1 className="mt-1 text-3xl font-bold text-black">
            Today&apos;s Share Price
          </h1>

          <p className="mt-2 text-sm text-[#656565]">
            View today&apos;s latest share prices and market activity.
          </p>
        </div>

        {/* Search + Status */}
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

          <div className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0aa852]" />

            <span className="text-[#656565]">
              Market Data
            </span>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            title="Listed Stocks"
            value="345"
          />

          <SummaryCard
            title="Gainers"
            value="156"
          />

          <SummaryCard
            title="Losers"
            value="132"
          />

          <SummaryCard
            title="Unchanged"
            value="57"
          />

        </section>

        {/* Price Table */}
        <section className="overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb]">

          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="font-bold text-black">
              Share Prices
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Latest trading information
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-[#d5d5d5] bg-[#edf8f0] text-left text-sm text-[#656565]">

                  <th className="px-5 py-4 font-medium">
                    Symbol
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Company
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

                      {/* Symbol */}
                      <td className="px-5 py-4">
                        <span className="font-bold text-black">
                          {stock.symbol}
                        </span>

                        <p className="mt-1 text-xs text-[#656565]">
                          {stock.sector}
                        </p>
                      </td>

                      {/* Company */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-black">
                          {stock.company}
                        </span>
                      </td>

                      {/* LTP */}
                      <td className="px-5 py-4 text-right font-semibold text-black">
                        Rs. {stock.ltp.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      {/* Change */}
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

                      {/* Change % */}
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

                      {/* Volume */}
                      <td className="px-5 py-4 text-right text-black">
                        {stock.volume.toLocaleString("en-IN")}
                      </td>

                      {/* Turnover */}
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

          {/* Empty Search */}
          {filteredStocks.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-medium text-black">
                No companies found
              </p>

              <p className="mt-1 text-sm text-[#656565]">
                Try another company name or symbol.
              </p>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5">

      <p className="text-sm text-[#656565]">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-black">
        {value}
      </p>

    </div>
  );
}