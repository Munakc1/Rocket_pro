import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/lib/types/news";

type FeaturedNewsProps = {
  articles: NewsArticle[];
};

export default function FeaturedNews({
  articles,
}: FeaturedNewsProps) {
  if (!articles.length) {
    return null;
  }

  const [primary, ...secondary] = articles;

  return (
    <section
      aria-labelledby="featured-news-heading"
      className="bg-news"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Editorial Highlights
          </p>

          <h2
            id="featured-news-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
          >
            Featured News
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <NewsCard
            article={primary}
            variant="featured"
          />

          {secondary.length > 0 && (
            <div className="grid gap-5">
              {secondary.slice(0, 2).map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}