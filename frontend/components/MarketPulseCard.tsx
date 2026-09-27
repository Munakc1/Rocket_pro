
import Link from "next/link";

function DotIcon() {
  return (
    <span className="h-2 w-2 shrink-0 rounded-full bg-[#0aa852]" />
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 15 15"
      className="h-[15px] w-[15px] shrink-0"
      aria-hidden="true"
    >
      <path
        d="M3 12L12 3M12 3H5M12 3V10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const stats = [
  {
    value: "2,647",
    label: "NEPSE Index",
    href: "/market",
  },
  {
    value: "NPR 9.1B",
    label: "Turnover",
    href: "/market#turnover",
  },
  {
    value: "345",
    label: "Traded Stocks",
    href: "/market#stocks",
  },
];

export default function MarketPulseCard() {
  return (
    <div className="flex h-full flex-col items-start rounded-[30px] bg-[#fbfbfb] pb-[45px] pl-6 pr-8 pt-[30px]">
      <div className="flex w-full flex-col gap-6">
        {/* Badge */}
        <Link
          href="/market"
          className="flex h-7 w-fit items-center gap-[7px] rounded-[30px] border-[0.5px] border-[#0aa852] bg-[#dcffec] px-2.5 py-1.5 transition hover:bg-[#c6f7dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0aa852]"
        >
          <DotIcon />

          <p className="whitespace-nowrap font-['Space_Grotesk'] text-xs font-medium tracking-[0.6px] text-[#0aa852]">
            NEPAL&apos;S FINANCIAL PULSE
          </p>
        </Link>

        {/* Hero Heading */}
        <h1 className="font-serif text-[42px] font-bold leading-[1.08] tracking-tight text-black md:text-[50px]">
          Understand Nepal&apos;s Market.
          <br />
          <span className="text-[#0aa852]">
            Trade With Better Information.
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-[520px] font-sans text-[15px] font-normal leading-relaxed text-[#474747]">
          Explore NEPSE market data, company information, market movements,
          news, technical insights and learning resources in one platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href="/market/live"
            className="flex h-[40px] items-center gap-[7px] rounded-xl bg-[#0aa852] px-4 text-xs font-medium text-white transition hover:bg-[#088f46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0aa852]"
          >
            Explore Live Market
            <ArrowRight />
          </Link>

          <Link
            href="/market"
            className="flex h-[40px] items-center justify-center rounded-xl border-[0.5px] border-[#0aa852] bg-white px-[18px] text-xs font-medium text-[#0aa852] transition hover:bg-[#dcffec] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0aa852]"
          >
            Explore Market Data
          </Link>
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-[#d5d5d5]" />

        {/* Market Stats */}
        <div className="flex flex-wrap items-center gap-x-16 gap-y-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex flex-col gap-1 rounded-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0aa852]"
            >
              <p className="font-['Space_Grotesk'] text-[28px] font-medium text-black transition group-hover:text-[#0aa852]">
                {stat.value}
              </p>

              <p className="font-['Space_Grotesk'] text-xs font-normal text-[#535353] group-hover:underline group-hover:underline-offset-4">
                {stat.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
