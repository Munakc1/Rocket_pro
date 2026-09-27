import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Clock3,
  ExternalLink,
  Share2,
} from "lucide-react";
import type { NewsArticle as NewsArticleType } from "@/lib/types/news";
import NewsShareButton from "./NewsShareButton";

type NewsArticleProps = {
  article: NewsArticleType;
};

const categoryLabels: Record<
  NewsArticleType["category"],
  string
> = {
  market: "बजार",
  company: "कम्पनी",
  ipo: "IPO",
  policy: "नीति",
  economy: "अर्थतन्त्र",
  education: "शिक्षा",
};

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function NewsArticle({
  article,
}: NewsArticleProps) {
  return (
    <article>
      <Link
        href="/news"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)]"
      >
        <ArrowLeft size={16} />
        Back to News
      </Link>

      <header className="max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-badge px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            {categoryLabels[article.category]}
          </span>

          {article.featured && (
            <span className="text-xs font-semibold text-muted">
              Featured
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-heading sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
          {article.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-meta">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>

          {article.readTime && (
            <>
              <span aria-hidden="true">·</span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} />
                {article.readTime} min read
              </span>
            </>
          )}

          {article.author && (
            <>
              <span aria-hidden="true">·</span>
              <span>By {article.author}</span>
            </>
          )}

          {article.source && (
            <>
              <span aria-hidden="true">·</span>
              <span>Source: {article.source}</span>
            </>
          )}
        </div>
      </header>

      {article.image && (
        <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl bg-news">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <div className="prose prose-neutral max-w-none">
            {article.content.map((paragraph, index) => (
              <p
                key={`${article.id}-paragraph-${index}`}
                className="mb-6 text-base leading-8 text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {article.companySymbol && (
            <div className="mt-8 rounded-2xl border border-card bg-news p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge text-primary">
                    <Building2 size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-muted">
                      Listed Company
                    </p>

                    <p className="font-bold text-heading">
                      {article.companySymbol}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/company/${encodeURIComponent(article.companySymbol)}`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-brand px-4 text-sm font-semibold text-primary transition-colors hover:bg-badge focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)]"
                >
                  View Company
                  <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-[var(--border-light)] pt-6">
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-card bg-surface px-3 py-1.5 text-xs font-medium text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-2xl border border-card bg-news p-5">
            <div className="flex items-center gap-2">
              <Share2
                size={17}
                className="text-primary"
              />

              <h2 className="text-sm font-bold text-heading">
                Share Article
              </h2>
            </div>

            <p className="mt-2 text-xs leading-5 text-muted">
              Share this article using your browser&apos;s available sharing
              tools.
            </p>

            <NewsShareButton />
          </div>

          <div className="mt-5 rounded-2xl border border-card bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Explore
            </p>

            <div className="mt-4 space-y-3">
              <Link
                href="/market"
                className="block text-sm font-semibold text-heading transition-colors hover:text-primary"
              >
                Market Overview →
              </Link>

              <Link
                href="/nepse-data/market-movers"
                className="block text-sm font-semibold text-heading transition-colors hover:text-primary"
              >
                Market Movers →
              </Link>

              <Link
                href="/training"
                className="block text-sm font-semibold text-heading transition-colors hover:text-primary"
              >
                Financial Education →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
