import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/lib/types/news";

type NewsGridProps = {
  articles: NewsArticle[];
};

export default function NewsGrid({
  articles,
}: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
}