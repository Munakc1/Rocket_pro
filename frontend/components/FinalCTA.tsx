
import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Newspaper,
} from "lucide-react";

const items = [
  {
    icon: BarChart3,
    title: "Live Market",
    description: "Track NEPSE market activity and daily movements.",
    href: "/market/live",
  },
  {
    icon: Newspaper,
    title: "Market News",
    description: "Stay informed with the latest market updates.",
    href: "/news",
  },
  {
    icon: BookOpen,
    title: "Market Training",
    description: "Build your knowledge with practical market education.",
    href: "/training",
  },
];

export default function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="w-full bg-[#D6F0E0] px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* 1550px MAIN CONTAINER */}
      <div className="mx-auto w-full max-w-[1500px]">
        {/* Main CTA */}
        <div className="overflow-hidden rounded-3xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            {/* Subtle background decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#dcffec] opacity-60 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#e8f3e8] opacity-80 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {/* Eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#01c45a] bg-[#dcffec] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0aa852]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#0aa852]"
                />
                Rocket Pro
              </div>

              {/* Heading */}
              <h2
                id="final-cta-title"
                className="text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl lg:text-5xl"
              >
                Stay Connected to the
                <span className="block text-[#0aa852]">
                  Nepal Market
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#656565] sm:text-base sm:leading-8">
                Track market movements, explore company information, read
                financial news, and build your market knowledge with Rocket
                Pro.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/market/live"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#089548] focus:outline-none focus:ring-2 focus:ring-[#0aa852] focus:ring-offset-2 focus:ring-offset-[#fbfbfb]"
                >
                  Explore Live Market
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>

                <Link
                  href="/news"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#d5d5d5] bg-white px-6 py-3 text-sm font-semibold text-[#000000] transition-colors hover:border-[#01c45a] hover:bg-[#f1f9f4] focus:outline-none focus:ring-2 focus:ring-[#0aa852] focus:ring-offset-2 focus:ring-offset-[#fbfbfb]"
                >
                  Read Latest News
                  <Newspaper
                    aria-hidden="true"
                    className="h-4 w-4 text-[#0aa852]"
                  />
                </Link>
              </div>
            </div>

            {/* Quick navigation cards */}
            <div className="relative z-10 mx-auto mt-12 grid w-full max-w-6xl gap-3 border-t border-[#ececec] pt-8 sm:grid-cols-3">
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-[#d5d5d5] hover:bg-[#f1f9f4] focus:outline-none focus:ring-2 focus:ring-[#0aa852] focus:ring-offset-2 focus:ring-offset-[#fbfbfb]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dcffec] text-[#0aa852]">
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-[#000000]">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[#656565]">
                          {item.description}
                        </p>
                      </div>

                      <ArrowRight
                        aria-hidden="true"
                        className="ml-auto mt-1 h-4 w-4 shrink-0 text-[#656565] transition-transform group-hover:translate-x-1 group-hover:text-[#0aa852]"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

