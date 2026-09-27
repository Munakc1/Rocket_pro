import Link from "next/link";

const indicators = [
  {
    name: "RSI",
    fullName: "Relative Strength Index",
    description:
      "A momentum indicator commonly used to identify overbought and oversold conditions.",
  },
  {
    name: "MACD",
    fullName: "Moving Average Convergence Divergence",
    description:
      "Used to study momentum, trend direction, and potential changes in market momentum.",
  },
  {
    name: "EMA",
    fullName: "Exponential Moving Average",
    description:
      "A moving average that gives greater weight to recent prices and helps identify trends.",
  },
  {
    name: "Bollinger Bands",
    fullName: "Volatility Indicator",
    description:
      "Uses a moving average and standard deviations to help understand price volatility.",
  },
  {
    name: "ATR",
    fullName: "Average True Range",
    description:
      "A volatility indicator that measures the typical range of price movement.",
  },
  {
    name: "ADX",
    fullName: "Average Directional Index",
    description:
      "Helps measure the strength of a price trend without directly indicating its direction.",
  },
];

const analysisAreas = [
  {
    title: "Technical Analysis",
    description:
      "Study price movement, trends, momentum, volume, and technical indicators to understand market behavior.",
    icon: "chart",
  },
  {
    title: "Fundamental Analysis",
    description:
      "Look at company financials, earnings, business performance, valuation, and other fundamental information.",
    icon: "building",
  },
  {
    title: "Market Analysis",
    description:
      "Understand sector movement, index behavior, market breadth, volume, and broader market activity.",
    icon: "market",
  },
];

function AnalysisIcon({ type }: { type: string }) {
  if (type === "building") {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 21V5l8-3 8 3v16" />
        <path d="M8 9h1" />
        <path d="M15 9h1" />
        <path d="M8 13h1" />
        <path d="M15 13h1" />
        <path d="M10 21v-4h4v4" />
      </svg>
    );
  }

  if (type === "market") {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 3-4 3 2 5-7" />
      </svg>
    );
  }

  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M7 16l3-5 3 2 4-7" />
      <path d="M7 16h10" />
    </svg>
  );
}

export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-[#d4efde] pt-[125px]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="bg-gradient-to-b from-[#d4efde] to-[#e8f3e8] px-4 pb-20 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left */}
            <div>
              <div className="mb-5 inline-flex rounded-full border border-[#01c45a] bg-[#dcffec] px-4 py-2">
                <span className="text-sm font-medium text-[#0aa852]">
                  RocketPro Analysis
                </span>
              </div>

              <h1 className="max-w-[720px] text-4xl font-semibold leading-tight tracking-[-1.5px] text-black sm:text-5xl lg:text-6xl">
                Understand the market beyond the{" "}
                <span className="text-[#0aa852]">price.</span>
              </h1>

              <p className="mt-6 max-w-[650px] text-lg leading-8 text-[#474747]">
                Explore technical indicators, fundamental concepts, market
                trends, and analytical tools that can help you study companies
                and understand Nepal's stock market.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/nepse-data"
                  className="rounded-full bg-[#0aa852] px-7 py-3.5 font-medium text-white transition hover:bg-[#078f4a]"
                >
                  Explore NEPSE Data
                </Link>

                <Link
                  href="/market"
                  className="rounded-full border border-[#01c45a] bg-white px-7 py-3.5 font-medium text-[#0aa852] transition hover:bg-[#f1f9f4]"
                >
                  View Market
                </Link>
              </div>
            </div>

            {/* Right Analysis Card */}
            <div className="rounded-[32px] border border-[#d5d5d5] bg-[#fbfbfb] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#656565]">
                    Market Analysis
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-black">
                    Technical View
                  </h2>
                </div>

                <div className="rounded-full bg-[#dcffec] px-3 py-1.5 text-sm font-medium text-[#0aa852]">
                  Analysis
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#edf8f0] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#656565]">Trend</p>
                    <p className="mt-1 text-xl font-semibold text-black">
                      Market Movement
                    </p>
                  </div>

                  <span className="text-sm font-medium text-[#0aa852]">
                    Technical
                  </span>
                </div>

                {/* Chart */}
                <div className="relative mt-7 h-[170px]">
                  <div className="absolute left-0 right-0 top-0 border-t border-[#d5d5d5]" />
                  <div className="absolute left-0 right-0 top-1/3 border-t border-[#d5d5d5]" />
                  <div className="absolute left-0 right-0 top-2/3 border-t border-[#d5d5d5]" />
                  <div className="absolute bottom-0 left-0 right-0 border-t border-[#d5d5d5]" />

                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 500 170"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 140 C35 125 45 135 75 110 C105 85 115 105 145 92 C175 80 185 100 215 72 C245 45 260 70 290 58 C320 45 330 65 355 42 C380 20 400 38 425 25 C450 12 475 22 500 8"
                      fill="none"
                      stroke="#0aa852"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="mt-4 flex justify-between text-xs text-[#656565]">
                  <span>Price</span>
                  <span>Momentum</span>
                  <span>Trend</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[#ececec] bg-white p-4">
                  <p className="text-xs text-[#656565]">RSI</p>
                  <p className="mt-1 font-semibold text-black">Momentum</p>
                </div>

                <div className="rounded-2xl border border-[#ececec] bg-white p-4">
                  <p className="text-xs text-[#656565]">MACD</p>
                  <p className="mt-1 font-semibold text-black">Trend</p>
                </div>

                <div className="rounded-2xl border border-[#ececec] bg-white p-4">
                  <p className="text-xs text-[#656565]">EMA</p>
                  <p className="mt-1 font-semibold text-black">Average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          THREE ANALYSIS TYPES
      ====================================================== */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[750px]">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-[#0aa852]">
              Analysis Framework
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-1px] text-black sm:text-4xl">
              Different ways to study the market.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#656565]">
              Market analysis can involve multiple perspectives. Each approach
              looks at different types of information and can be used as part
              of independent research.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {analysisAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#d5d5d5] bg-[#fbfbfb] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#01c45a] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dcffec] text-[#0aa852]">
                  <AnalysisIcon type={item.icon} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-black">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-[#656565]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL INDICATORS
      ====================================================== */}
      <section className="bg-[#f1f9f4] px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-[720px]">
              <p className="text-sm font-semibold uppercase tracking-[2px] text-[#0aa852]">
                Technical Indicators
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-1px] text-black sm:text-4xl">
                Tools for studying price and momentum.
              </h2>

              <p className="mt-4 leading-7 text-[#656565]">
                Technical indicators transform price and volume information
                into different measurements that traders and analysts may use
                when studying market behavior.
              </p>
            </div>

            <Link
              href="/nepse-data"
              className="inline-flex shrink-0 rounded-full border border-[#01c45a] bg-white px-6 py-3 font-medium text-[#0aa852] transition hover:bg-[#dcffec]"
            >
              Open NEPSE Data →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((indicator) => (
              <div
                key={indicator.name}
                className="rounded-[24px] border border-[#d5d5d5] bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-black">
                      {indicator.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#656565]">
                      {indicator.fullName}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dcffec] text-[#0aa852]">
                    ↗
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#656565]">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW TO USE ANALYSIS
      ====================================================== */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[2px] text-[#0aa852]">
                Research Process
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-1px] text-black sm:text-4xl">
                Build your analysis step by step.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#656565]">
                Analysis becomes more useful when different pieces of
                information are considered together rather than relying on a
                single indicator or signal.
              </p>
            </div>

            <div className="rounded-[30px] border border-[#d5d5d5] bg-[#fbfbfb] p-7">
              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "Start with the company",
                    text: "Understand the business, sector, financial position, and relevant company information.",
                  },
                  {
                    number: "02",
                    title: "Study the market",
                    text: "Look at index movement, sector performance, volume, and broader market conditions.",
                  },
                  {
                    number: "03",
                    title: "Review the chart",
                    text: "Use price action and technical indicators to study trends and momentum.",
                  },
                  {
                    number: "04",
                    title: "Do your own research",
                    text: "Consider multiple sources of information before making an investment decision.",
                  },
                ].map((step, index) => (
                  <div key={step.number}>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcffec] text-sm font-semibold text-[#0aa852]">
                        {step.number}
                      </div>

                      <div>
                        <h3 className="font-semibold text-black">
                          {step.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[#656565]">
                          {step.text}
                        </p>
                      </div>
                    </div>

                    {index < 3 && (
                      <div className="ml-5 mt-5 h-5 border-l border-[#d5d5d5]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTE
      ====================================================== */}
      <section className="bg-[#f1f9f4] px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-[28px] border border-[#d5d5d5] bg-white p-7 sm:p-9">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcffec] text-[#0aa852]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 10v6" />
                  <path d="M12 7h.01" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black">
                  Important note
                </h3>

                <p className="mt-2 leading-7 text-[#656565]">
                  Technical and fundamental analysis are tools for research,
                  not guarantees of future returns. Market prices can move
                  unexpectedly, and investment decisions involve risk. Always
                  conduct your own research and consider your individual
                  circumstances before investing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-[#d4efde] px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="rounded-[34px] border border-[#01c45a] bg-white px-6 py-12 shadow-[0_15px_50px_rgba(0,0,0,0.06)] sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dcffec]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0aa852"
                strokeWidth="1.8"
              >
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="m7 15 3-4 3 2 5-7" />
              </svg>
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-1px] text-black sm:text-4xl">
              Ready to explore the market?
            </h2>

            <p className="mx-auto mt-4 max-w-[650px] leading-7 text-[#656565]">
              Explore NEPSE data, follow market activity, and use RocketPro as
              part of your own research process.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/market"
                className="rounded-full bg-[#0aa852] px-7 py-3.5 font-medium text-white transition hover:bg-[#078f4a]"
              >
                Explore Market
              </Link>

              <Link
                href="/nepse-data"
                className="rounded-full border border-[#01c45a] bg-white px-7 py-3.5 font-medium text-[#0aa852] transition hover:bg-[#f1f9f4]"
              >
                NEPSE Data
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}