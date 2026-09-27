import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const indices = [
  {
    name: "NEPSE",
    value: 2654.28,
    change: 7.28,
    changePercent: 0.28,
    high: 2678.42,
    low: 2638.15,
  },
  {
    name: "Sensitive",
    value: 471.07,
    change: 2.41,
    changePercent: 0.51,
    high: 474.82,
    low: 467.91,
  },
  {
    name: "Float",
    value: 182.46,
    change: -0.84,
    changePercent: -0.46,
    high: 184.12,
    low: 181.72,
  },
  {
    name: "Banking",
    value: 1511.16,
    change: 5.82,
    changePercent: 0.39,
    high: 1522.45,
    low: 1504.21,
  },
  {
    name: "Hydropower",
    value: 3665.08,
    change: 18.35,
    changePercent: 0.50,
    high: 3690.42,
    low: 3638.17,
  },
];

export default function IndicesPage() {
  return (
    <main className="min-h-screen bg-[#d4efde] px-4 py-6 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-[#656565]">
            NEPSE Data
          </p>

          <h1 className="mt-1 text-3xl font-bold text-black">
            Market Indices
          </h1>

          <p className="mt-2 text-sm text-[#656565]">
            Track NEPSE and major market indices.
          </p>
        </div>

        {/* Main NEPSE Card */}
        <section className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-[#dcffec] p-2">
                  <TrendingUp className="h-5 w-5 text-[#0aa852]" />
                </div>

                <span className="font-semibold text-black">
                  NEPSE Index
                </span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-bold text-black">
                  2,654.28
                </span>

                <span className="mb-1 flex items-center gap-1 text-sm font-semibold text-[#0aa852]">
                  <ArrowUp className="h-4 w-4" />
                  0.28%
                </span>
              </div>

              <p className="mt-2 text-sm text-[#656565]">
                Last updated: Today
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Change" value="+7.28" />
              <Stat label="Day High" value="2,678.42" />
              <Stat label="Day Low" value="2,638.15" />
            </div>
          </div>
        </section>

        {/* Indices Table */}
        <section className="overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="flex items-center gap-3 border-b border-[#d5d5d5] p-5">
            <div className="rounded-lg bg-[#dcffec] p-2">
              <BarChart3 className="h-5 w-5 text-[#0aa852]" />
            </div>

            <div>
              <h2 className="font-bold text-black">
                Major Indices
              </h2>

              <p className="text-sm text-[#656565]">
                Current market index performance
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#d5d5d5] bg-[#edf8f0] text-left text-sm text-[#656565]">
                  <th className="px-5 py-4 font-medium">Index</th>
                  <th className="px-5 py-4 text-right font-medium">
                    Current
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    Change
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    Change %
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    High
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    Low
                  </th>
                </tr>
              </thead>

              <tbody>
                {indices.map((index) => {
                  const positive = index.change >= 0;

                  return (
                    <tr
                      key={index.name}
                      className="border-b border-[#d5d5d5] last:border-0 hover:bg-[#edf8f0]"
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-black">
                          {index.name}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-black">
                        {index.value.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
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
                        {index.change.toFixed(2)}
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

                          {Math.abs(index.changePercent).toFixed(2)}%
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right text-black">
                        {index.high.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td className="px-5 py-4 text-right text-[#656565]">
                        {index.low.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Simple Summary */}
        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Market Direction"
            value="Positive"
            description="Most tracked indices are higher."
          />

          <SummaryCard
            title="Strongest Index"
            value="Hydropower"
            description="+0.50% today"
          />

          <SummaryCard
            title="Weakest Index"
            value="Float"
            description="-0.46% today"
          />
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#d5d5d5] bg-[#edf8f0] px-5 py-4">
      <p className="text-xs text-[#656565]">{label}</p>
      <p className="mt-1 font-semibold text-black">{value}</p>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5">
      <p className="text-sm text-[#656565]">{title}</p>

      <h3 className="mt-2 text-xl font-bold text-black">
        {value}
      </h3>

      <p className="mt-1 text-sm text-[#656565]">
        {description}
      </p>
    </div>
  );
}