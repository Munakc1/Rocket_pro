"use client";

import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { useState } from "react";

const sectors = [
  {
    name: "Banking",
    index: 1511.16,
    change: 5.82,
    changePercent: 0.39,
    turnover: 1850000000,
    volume: 2450000,
    companies: 20,
  },
  {
    name: "Hydropower",
    index: 3665.08,
    change: 18.35,
    changePercent: 0.5,
    turnover: 2150000000,
    volume: 3250000,
    companies: 95,
  },
  {
    name: "Finance",
    index: 2874.52,
    change: 12.45,
    changePercent: 0.44,
    turnover: 620000000,
    volume: 850000,
    companies: 15,
  },
  {
    name: "Microfinance",
    index: 4521.36,
    change: -28.42,
    changePercent: -0.63,
    turnover: 580000000,
    volume: 420000,
    companies: 55,
  },
  {
    name: "Hotels & Tourism",
    index: 689.42,
    change: 4.82,
    changePercent: 0.7,
    turnover: 310000000,
    volume: 390000,
    companies: 8,
  },
  {
    name: "Life Insurance",
    index: 5321.18,
    change: -18.62,
    changePercent: -0.35,
    turnover: 420000000,
    volume: 280000,
    companies: 14,
  },
  {
    name: "Non-Life Insurance",
    index: 12456.72,
    change: 52.18,
    changePercent: 0.42,
    turnover: 365000000,
    volume: 310000,
    companies: 12,
  },
  {
    name: "Manufacturing",
    index: 8452.36,
    change: 21.45,
    changePercent: 0.25,
    turnover: 290000000,
    volume: 185000,
    companies: 7,
  },
];

export default function SectorPerformancePage() {
  const [search, setSearch] = useState("");

  const filteredSectors = sectors.filter((sector) =>
    sector.name.toLowerCase().includes(search.toLowerCase())
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
            Sector Performance
          </h1>

          <p className="mt-2 text-sm text-[#656565]">
            Track the performance of major NEPSE market sectors.
          </p>
        </div>

        {/* Search */}
        <section className="flex flex-col gap-4 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

            <input
              type="text"
              placeholder="Search sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#d5d5d5] bg-white py-3 pl-10 pr-4 text-sm text-black outline-none focus:border-[#0aa852]"
            />
          </div>

          <div className="text-sm text-[#656565]">
            Market sectors
          </div>
        </section>

        {/* Top Cards */}
        <section className="grid gap-4 md:grid-cols-3">

          <SummaryCard
            title="Top Gainer"
            value="Hotels & Tourism"
            change="+0.70%"
            positive
          />

          <SummaryCard
            title="Top Loser"
            value="Microfinance"
            change="-0.63%"
            positive={false}
          />

          <SummaryCard
            title="Most Active"
            value="Hydropower"
            change="Rs. 2.15B turnover"
            positive
          />

        </section>

        {/* Sector Table */}
        <section className="overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb]">

          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="font-bold text-black">
              Sector Performance
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Current sector index and trading activity
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-[#d5d5d5] bg-[#edf8f0] text-left text-sm text-[#656565]">

                  <th className="px-5 py-4 font-medium">
                    Sector
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Index
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Change
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Change %
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Turnover
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Volume
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Companies
                  </th>

                </tr>
              </thead>

              <tbody>
                {filteredSectors.map((sector) => {
                  const positive = sector.change >= 0;

                  return (
                    <tr
                      key={sector.name}
                      className="border-b border-[#d5d5d5] last:border-0 hover:bg-[#edf8f0]"
                    >

                      {/* Sector */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-black">
                          {sector.name}
                        </span>
                      </td>

                      {/* Index */}
                      <td className="px-5 py-4 text-right font-semibold text-black">
                        {sector.index.toLocaleString("en-IN", {
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
                        {sector.change.toFixed(2)}
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

                          {Math.abs(sector.changePercent).toFixed(2)}%
                        </span>
                      </td>

                      {/* Turnover */}
                      <td className="px-5 py-4 text-right font-medium text-black">
                        Rs.{" "}
                        {(sector.turnover / 10000000).toFixed(2)} Cr
                      </td>

                      {/* Volume */}
                      <td className="px-5 py-4 text-right text-black">
                        {sector.volume.toLocaleString("en-IN")}
                      </td>

                      {/* Companies */}
                      <td className="px-5 py-4 text-right text-[#656565]">
                        {sector.companies}
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* Empty Search */}
          {filteredSectors.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-medium text-black">
                No sector found
              </p>

              <p className="mt-1 text-sm text-[#656565]">
                Try another sector name.
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

      <h3 className="mt-2 text-xl font-bold text-black">
        {value}
      </h3>

      <p
        className={`mt-2 text-sm font-semibold ${
          positive ? "text-[#0aa852]" : "text-[#e31b1b]"
        }`}
      >
        {change}
      </p>

    </div>
  );
}