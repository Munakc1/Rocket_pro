import type { Metadata } from "next";

import FeaturedNews from "./FeaturedNews";
import NewsCategories from "./NewsCategories";
import NewsCard from "./NewsCard";
import NewsEmptyState from "./NewsEmptyState";
import NewsHeader from "./NewsHeader";
import NewsPagination from "./NewsPagination";
import NewsSearch from "./NewsSearch";
import {
  getFeaturedNews,
  getLatestNews,
} from "@/lib/api/news";
import type { NewsCategory } from "@/lib/types/news";

export const metadata: Metadata = {
  title: "Rocket Pro — Latest Nepal Market News",
  description:
    "Read Nepal market, company, IPO, policy, economy and financial education news with Rocket Pro.",
};

type NewsPageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
};

const validCategories: NewsCategory[] = [
  "market",
  "company",
  "ipo",
  "policy",
  "economy",
  "education",
];

function normalizeCategory(
  value?: string,
): NewsCategory | "all" {
  if (!value || value === "all") {
    return "all";
  }

  return validCategories.includes(value as NewsCategory)
    ? (value as NewsCategory)
    : "all";
}

function normalizeSort(
  value?: string,
): "latest" | "oldest" {
  return value === "oldest" ? "oldest" : "latest";
}

function normalizePage(value?: string): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export default async function NewsPage({
  searchParams,
}: NewsPageProps) {
  const params = await searchParams;

  const category = normalizeCategory(params.category);
  const search = params.search?.trim() ?? "";
  const sort = normalizeSort(params.sort);
  const page = normalizePage(params.page);

  const [featuredNews, latestNews] = await Promise.all([
    getFeaturedNews(),
    getLatestNews({
      category,
      search,
      sort,
      page,
      limit: 9,
    }),
  ]);

  const hasFilters =
    Boolean(search) || category !== "all";

  return (
    <main className="min-h-screen bg-app">
      <NewsHeader />

      <NewsCategories />

      {featuredNews.length > 0 &&
        !hasFilters &&
        page === 1 && (
          <FeaturedNews articles={featuredNews} />
        )}

      <section
        aria-labelledby="latest-news-heading"
        className="bg-app"
      >
        <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Newsroom
              </p>

              <h2
                id="latest-news-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
              >
                Latest News
              </h2>

              <p className="mt-2 text-sm text-muted">
                Browse the latest Rocket Pro news coverage and educational
                content.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <NewsSearch />
            </div>
          </div>

          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {latestNews.total}{" "}
              {latestNews.total === 1 ? "article" : "articles"}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">
                Sort:
              </span>

              <a
                href={buildSortUrl(
                  category,
                  search,
                  "latest",
                )}
                className={[
                  "rounded-lg border px-3 py-2 text-xs font-semibold",
                  sort === "latest"
                    ? "border-brand bg-badge text-primary"
                    : "border-card bg-surface text-muted",
                ].join(" ")}
              >
                Latest
              </a>

              <a
                href={buildSortUrl(
                  category,
                  search,
                  "oldest",
                )}
                className={[
                  "rounded-lg border px-3 py-2 text-xs font-semibold",
                  sort === "oldest"
                    ? "border-brand bg-badge text-primary"
                    : "border-card bg-surface text-muted",
                ].join(" ")}
              >
                Oldest
              </a>
            </div>
          </div>

          {latestNews.articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {latestNews.articles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                  />
                ))}
              </div>

              <NewsPagination
                page={latestNews.page}
                totalPages={latestNews.totalPages}
              />
            </>
          ) : (
            <NewsEmptyState hasFilters={hasFilters} />
          )}
        </div>
      </section>

      <section className="bg-news">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-card bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Explore Rocket Pro
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-heading">
                Connect news with market information.
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Explore market information, company data and market movers
                alongside Rocket Pro&apos;s news experience.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/market"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
              >
                Explore Market
              </a>

              <a
                href="/nepse-data/market-movers"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand bg-surface px-5 text-sm font-semibold text-primary transition-colors hover:bg-badge focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
              >
                Market Movers
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function buildSortUrl(
  category: NewsCategory | "all",
  search: string,
  sort: "latest" | "oldest",
) {
  const params = new URLSearchParams();

  if (category !== "all") {
    params.set("category", category);
  }

  if (search) {
    params.set("search", search);
  }

  params.set("sort", sort);

  return `/news?${params.toString()}`;
}