import type { Metadata } from "next";
import { notFound } from "next/navigation";

import NewsArticle from "../NewsArticle";
import RelatedNews from "../RelatedNews";
import {
  getAllNewsSlugs,
  getNewsBySlug,
  getRelatedNews,
} from "@/lib/api/news";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Rocket Pro",
    };
  }

  return {
    title: `${article.title} | Rocket Pro`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Rocket Pro`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.image
        ? [
            {
              url: article.image,
              alt: article.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await getRelatedNews(article);

  return (
    <main className="min-h-screen bg-app">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <NewsArticle article={article} />

        <div className="mt-14">
          <RelatedNews articles={relatedNews} />
        </div>
      </div>

      <section className="bg-news">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-card bg-surface p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Rocket Pro Market
              </p>

              <h2 className="mt-2 text-xl font-bold text-heading sm:text-2xl">
                Explore the market beyond the headlines.
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Review market information, movers and other Rocket Pro
                resources.
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