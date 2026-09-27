import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { PricingTable, FAQ, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing — Rocket Pro Plans for Nepal Market Data & Training",
  description:
    "Compare Rocket Pro plans for NEPSE market data, company insights, market news and stock market education. Pick the plan that matches how you invest.",
};

type Tier = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "NPR 0",
    period: "forever",
    features: [
      "NEPSE indices and market summary",
      "Market breadth and sector performance",
      "Today's share price and market movers",
      "Market and company news",
    ],
    ctaLabel: "Start free",
    ctaHref: "/signup",
  },
  {
    name: "Pro",
    price: "NPR 999",
    period: "per month",
    features: [
      "Everything in Free",
      "Full company insights and watchlist",
      "Price alerts for your tracked companies",
      "Training modules on technical and fundamental analysis",
      "Priority access to new learning content",
    ],
    ctaLabel: "Choose Pro",
    ctaHref: "/signup",
    featured: true,
  },
  {
    name: "Pro Annual",
    price: "NPR 9,990",
    period: "per year",
    features: [
      "Everything in Pro",
      "Two months free compared to monthly billing",
      "Annual learning paths and revision material",
      "Direct support for your questions",
    ],
    ctaLabel: "Choose Pro Annual",
    ctaHref: "/contact",
  },
];

const faqs = [
  {
    q: "What do the plans include?",
    a: "Every plan includes NEPSE market information, indices, market summary, breadth, sector performance and news. Pro and Pro Annual add company insights, watchlists, alerts and the full education library.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. Monthly and annual access stays active until the end of the period you have already paid for, and you can cancel before the next renewal.",
  },
  {
    q: "Is Rocket Pro investment advice?",
    a: "No. Rocket Pro provides market information and educational resources to help you understand the market. It does not provide personalised investment recommendations.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "Payments are processed through the supported digital wallets and bank transfer options available at checkout. Contact us if you need an invoice.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-app py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              PRICING
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              Plans that grow with how you invest
            </h1>

            <p className="mt-5 text-base leading-7 text-body sm:text-lg">
              Start with free market information. Move up when you want
              deeper company insight, watchlists and structured learning for
              Nepal&apos;s stock market.
            </p>
          </div>

          <div className="mt-14">
            <PricingTable tiers={tiers} />
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Prices are shown in Nepali Rupees (NPR) and exclude applicable
            taxes. Need something else?{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary transition hover:underline"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-panel py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              Included in every plan
            </h2>
          </div>

          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "NEPSE indices and daily summary",
              "Sector performance and market breadth",
              "Company and market news",
              "Stock market basics and risk management",
              "Technical and fundamental analysis training",
              "Market information built for Nepal",
            ].map((item) => (
              <li
                key={item}
                className="card flex items-start gap-3 bg-surface rounded-xl border-card p-5 text-sm leading-6 text-body"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  strokeWidth={2.2}
                />

                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <Section
        eyebrow="FAQ"
        title="Questions before you subscribe"
        className="bg-app"
      >
        <FAQ items={faqs} />
      </Section>
    </>
  );
}
