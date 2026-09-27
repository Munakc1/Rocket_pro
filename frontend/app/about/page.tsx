import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  GraduationCap,
  Layers3,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

type WhyRocketProItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

type PlatformArea = {
  label: string;
  href: string;
};

const reasons: WhyRocketProItem[] = [
  {
    title: "Market Data",
    description:
      "Access structured information about the Nepal stock market, including indices, prices, trading activity and market breadth.",
    icon: BarChart3,
    href: "/market",
  },
  {
    title: "Market Intelligence",
    description:
      "Understand market movement through organized data, movers, sector performance and market activity.",
    icon: Activity,
    href: "/market/summary",
  },
  {
    title: "Company Insights",
    description:
      "Explore listed companies through company information, price movement, trading activity and relevant market context.",
    icon: Building2,
    href: "/companies",
  },
  {
    title: "Education",
    description:
      "Build stronger market knowledge through resources covering stock market basics, technical analysis, fundamental analysis and risk management.",
    icon: GraduationCap,
    href: "/training",
  },
  {
    title: "Market News",
    description:
      "Follow relevant Nepal market developments, company updates, policy developments and economic information.",
    icon: Newspaper,
    href: "/news",
  },
  {
    title: "One Platform",
    description:
      "Explore market data, companies, movers, news and learning resources through one consistent Rocket Pro experience.",
    icon: Layers3,
    href: "/market",
  },
];

const platformAreas: PlatformArea[] = [
  {
    label: "NEPSE",
    href: "/market/indices",
  },
  {
    label: "Market Data",
    href: "/market",
  },
  {
    label: "Companies",
    href: "/companies",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Education",
    href: "/training",
  },
];

function ValueCard({
  title,
  description,
  icon: Icon,
  href,
}: WhyRocketProItem) {
  return (
    <Link
      href={href}
      className="
        group block h-full rounded-xl
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        focus-visible:ring-primary
      "
      aria-label={`Explore ${title}`}
    >
      <article
        className="
          card bg-surface border-card
          flex h-full flex-col
          rounded-xl p-5 sm:p-6
          transition-all duration-200
          hover:border-brand
          hover:shadow-sm
          motion-reduce:transition-none
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div
            aria-hidden="true"
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-lg border border-card
              bg-badge text-primary
              transition-transform duration-200
              group-hover:-translate-y-0.5
              motion-reduce:transform-none
            "
          >
            <Icon
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </div>

          <ArrowRight
            aria-hidden="true"
            className="
              mt-1 h-4 w-4 shrink-0
              text-muted
              transition-all duration-200
              group-hover:translate-x-0.5
              group-hover:text-primary
              motion-reduce:transform-none
            "
            strokeWidth={1.8}
          />
        </div>

        <div className="mt-5">
          <h3 className="text-base font-semibold leading-6 text-heading sm:text-lg">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            {description}
          </p>
        </div>

        <span
          className="
            mt-auto pt-5
            text-xs font-medium text-primary
            opacity-0 transition-opacity duration-200
            group-hover:opacity-100
            motion-reduce:transition-none
            sm:text-sm
          "
        >
          Explore {title}
        </span>
      </article>
    </Link>
  );
}

export default function WhyRocketPro() {
  return (
    <section
      aria-labelledby="why-rocketpro-heading"
      className="bg-app py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid items-start gap-10
            lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.4fr)]
            lg:gap-14
            xl:gap-20
          "
        >
          {/* Left Content */}
          <div className="lg:sticky lg:top-28">
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.18em] text-primary
              "
            >
              WHY ROCKET PRO
            </p>

            <h2
              id="why-rocketpro-heading"
              className="
                mt-3 max-w-xl
                text-3xl font-bold tracking-tight text-heading
                sm:text-4xl
                lg:text-[2.65rem] lg:leading-[1.12]
              "
            >
              Information That Helps You Understand the Market.
            </h2>

            <p
              className="
                mt-5 max-w-xl
                text-base leading-7 text-body
                sm:text-lg
              "
            >
              Rocket Pro brings Nepal&apos;s market information, company
              insights, market movements, news and educational resources
              together in one focused platform.
            </p>

            {/* Functional Platform Navigation */}
            <nav
              aria-label="Rocket Pro platform areas"
              className="mt-7 max-w-xl"
            >
              <div className="flex flex-wrap gap-2">
                {platformAreas.map((area) => (
                  <Link
                    key={area.label}
                    href={area.href}
                    className="
                      inline-flex items-center
                      rounded-full
                      border border-card
                      bg-panel
                      px-3 py-1.5
                      text-xs font-medium text-secondary
                      transition-colors duration-200
                      hover:border-brand
                      hover:text-primary
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                      focus-visible:ring-offset-2
                      motion-reduce:transition-none
                      sm:text-sm
                    "
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Supporting Context */}
            <div
              className="
                mt-8 max-w-xl
                border-l-2 border-brand
                pl-4
              "
            >
              <p className="text-sm leading-6 text-muted">
                A focused place to explore market information, understand
                movement, review company context and continue learning about
                Nepal&apos;s financial markets.
              </p>
            </div>
          </div>

          {/* Value Cards */}
          <div
            className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2
            "
          >
            {reasons.map((reason) => (
              <ValueCard
                key={reason.title}
                title={reason.title}
                description={reason.description}
                icon={reason.icon}
                href={reason.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}