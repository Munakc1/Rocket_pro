
import Link from "next/link";
import { Marquee } from "@lacspace/ui";

/**
 * ------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------
 */

export interface MarketIndexData {
  name: string;
  value: string;
  changePercent: number;
  href: string;
}

export interface MarketIndexMarqueeProps {
  indices?: MarketIndexData[];
  speed?: number;
  className?: string;
}

/**
 * ------------------------------------------------------------------
 * Default data
 * ------------------------------------------------------------------
 */

const DEFAULT_INDICES: MarketIndexData[] = [
  {
    name: "NEPSE",
    value: "2,647.00",
    changePercent: 1.24,
    href: "/nepse-data/indices",
  },
  {
    name: "BANKING",
    value: "1,511.16",
    changePercent: -0.32,
    href: "/nepse-data/indices/banking",
  },
  {
    name: "HYDROPOWER",
    value: "3,665.08",
    changePercent: 2.08,
    href: "/nepse-data/indices/hydropower",
  },
  {
    name: "SENSITIVE",
    value: "471.07",
    changePercent: -0.56,
    href: "/nepse-data/indices/sensitive",
  },
  {
    name: "FLOAT",
    value: "182.46",
    changePercent: 0.41,
    href: "/nepse-data/indices/float",
  },
];

/**
 * ------------------------------------------------------------------
 * Directional arrow
 * ------------------------------------------------------------------
 */

function TrendArrow({ isPositive }: { isPositive: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${isPositive ? "" : "rotate-180"}`}
    >
      <path
        d="M5 1L9 7.5H1L5 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * ------------------------------------------------------------------
 * Single ticker item
 * ------------------------------------------------------------------
 */

function MarketIndexItem({
  name,
  value,
  changePercent,
  href,
}: MarketIndexData) {
  const isPositive = changePercent >= 0;

  const changeColor = isPositive
    ? "text-[#0aa852]"
    : "text-[#e31b1b]";

  const sign = isPositive ? "+" : "";

  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center gap-2 px-5 py-3 transition-opacity duration-200 hover:opacity-70 sm:gap-2.5 sm:px-6"
      aria-label={`${name} index, ${value}, ${sign}${changePercent.toFixed(
        2
      )} percent`}
    >
      <span className="text-xs font-semibold tracking-wide text-[#000000] sm:text-sm">
        {name}
      </span>

      <span className="text-xs font-medium text-[#656565] sm:text-sm">
        {value}
      </span>

      <span
        className={`flex items-center gap-1 text-xs font-semibold sm:text-sm ${changeColor}`}
      >
        <TrendArrow isPositive={isPositive} />

        {sign}
        {Math.abs(changePercent).toFixed(2)}%
      </span>
    </Link>
  );
}

/**
 * ------------------------------------------------------------------
 * MarketIndexMarquee
 * ------------------------------------------------------------------
 */

export default function MarketIndexMarquee({
  indices = DEFAULT_INDICES,
  speed = 40,
  className = "",
}: MarketIndexMarqueeProps) {
  return (
    <section
      className={`w-full max-w-full overflow-hidden bg-[#fbfbfb] ${className}`}
      aria-label="Market index ticker"
    >
      <div className="w-full max-w-full overflow-hidden">
        <Marquee
          pauseOnHover
          speed={speed}
          className="w-full"
        >
          {[...indices, ...indices].map((index, i) => (
            <MarketIndexItem
              key={`${index.name}-${i}`}
              {...index}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

