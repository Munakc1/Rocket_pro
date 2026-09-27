import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/lib/types/news";

type RelatedNewsProps = {
  articles: NewsArticle[];
};

export default function RelatedNews({
  articles,
}: RelatedNewsProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-news-heading"
      className="border-t border-[var(--border-light)] pt-10"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Continue Reading
        </p>

        <h2
          id="related-news-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-heading"
        >
          Related News
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}