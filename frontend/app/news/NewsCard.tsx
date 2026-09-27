import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import type { NewsArticle } from "@/lib/types/news";

type NewsCardProps = {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
};

const categoryLabels: Record<NewsArticle["category"], string> = {
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

export default function NewsCard({
  article,
  variant = "default",
}: NewsCardProps) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <article
      className={[
        "group overflow-hidden rounded-2xl border border-card bg-surface",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-md",
      ].join(" ")}
    >
      <Link
        href={`/news/${article.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-inset"
      >
        {article.image && (
          <div
            className={[
              "relative overflow-hidden bg-news",
              isFeatured
                ? "aspect-[16/9]"
                : isCompact
                  ? "aspect-[16/10]"
                  : "aspect-[16/9]",
            ].join(" ")}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes={
                isFeatured
                  ? "(max-width: 1024px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div
          className={[
            isCompact ? "p-4" : "p-5",
            isFeatured ? "sm:p-6" : "",
          ].join(" ")}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-badge px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
              {categoryLabels[article.category]}
            </span>

            {article.featured && (
              <span className="text-[11px] font-semibold text-muted">
                Featured
              </span>
            )}
          </div>

          <h2
            className={[
              "font-bold tracking-tight text-heading",
              isFeatured
                ? "text-xl leading-8 sm:text-2xl"
                : isCompact
                  ? "text-base leading-6"
                  : "text-lg leading-7",
            ].join(" ")}
          >
            {article.title}
          </h2>

          {!isCompact && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
              {article.excerpt}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-meta">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>

            {article.readTime && (
              <>
                <span aria-hidden="true">·</span>

                <span className="inline-flex items-center gap-1">
                  <Clock3 size={13} aria-hidden="true" />
                  {article.readTime} min read
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}