// components/MarketAtGlance.tsx
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BarChart3,
  Scale,
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

type Tone = "primary" | "danger";

export type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: Tone;
  href: string; // page this card opens
  change?: string; // shown as a badge when provided
  note?: string;
};

// Change each href to the real route in your app.
// You can also pass live data: <MarketAtGlance stats={myStats} />
const defaultStats: Stat[] = [
  {
    label: "NEPSE Index",
    value: "2,647.18",
    icon: TrendingUp,
    tone: "primary",
    href: "/nepse-data",
    change: "+1.24%",
    note: "vs previous close",
  },
  {
    label: "Turnover",
    value: "Rs. 9.10 Arba",
    icon: Banknote,
    tone: "primary",
    href: "/nepse-data#turnover",
    change: "+8.4%",
    note: "vs previous session",
  },
  {
    label: "Traded Stocks",
    value: "345",
    icon: BarChart3,
    tone: "primary",
    href: "/nepse-data#stocks",
    note: "companies traded today",
  },
  {
    label: "Advancers",
    value: "184",
    icon: ArrowUpRight,
    tone: "primary",
    href: "/nepse-data?filter=advancers",
    note: "stocks closed higher",
  },
  {
    label: "Decliners",
    value: "121",
    icon: TrendingDown,
    tone: "danger",
    href: "/nepse-data?filter=decliners",
    note: "stocks closed lower",
  },
  {
    label: "Market Breadth",
    value: "1.52",
    icon: Scale,
    tone: "primary",
    href: "/nepse-data#breadth",
    note: "advancers ÷ decliners",
  },
];

const toneText: Record<Tone, string> = {
  primary: "text-[#0aa852]",
  danger: "text-[#e31b1b]",
};

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;

  return (
    <Link
      href={stat.href}
      aria-label={`${stat.label}: ${stat.value}. Open details`}
      className="group flex flex-col gap-5 rounded-3xl border border-[#d5d5d5] bg-[#fbfbfb] p-6 transition-colors duration-200 hover:border-[#01c45a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0aa852]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf8f0]">
            <Icon
              size={22}
              strokeWidth={2}
              className={toneText[stat.tone]}
              aria-hidden="true"
            />
          </span>

          <h3 className="font-['Space_Grotesk'] text-[15px] font-medium tracking-[0.4px] text-[#656565]">
            {stat.label}
          </h3>
        </div>

        {stat.change ? (
          <span className="flex h-7 shrink-0 items-center gap-1 rounded-full border-[0.5px] border-[#0aa852] bg-[#dcffec] px-2.5 font-['Space_Grotesk'] text-xs font-bold text-[#0aa852]">
            <TrendingUp size={13} strokeWidth={2.5} aria-hidden="true" />
            {stat.change}
          </span>
        ) : (
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="shrink-0 text-[#656565] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0aa852]"
          />
        )}
      </div>

      <div>
        <p
          className={`font-['Space_Grotesk'] text-[32px] font-bold leading-tight ${
            stat.tone === "danger" ? "text-[#e31b1b]" : "text-[#000000]"
          }`}
        >
          {stat.value}
        </p>

        {stat.note && (
          <p className="mt-1 text-sm text-[#656565]">{stat.note}</p>
        )}
      </div>
    </Link>
  );
}

export default function MarketAtGlance() {
  const stats = defaultStats;

  return (
    <section
      aria-labelledby="market-at-a-glance-heading"
      className="bg-[#d4efde]"
    >
      {/* pt-28 / sm:pt-32 keeps the section clear of the navbar. Adjust to your navbar height. */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2
            id="market-at-a-glance-heading"
            className="font-serif text-3xl font-bold leading-tight text-[#000000] sm:text-4xl"
          >
            Today&apos;s NEPSE at a Glance
          </h2>

          <p className="mt-2 text-[15px] leading-relaxed text-[#656565]">
            The numbers that define today&apos;s trading session, in one view.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}