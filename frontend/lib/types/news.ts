export const NEWS_CATEGORIES = [
  "market",
  "company",
  "ipo",
  "policy",
  "economy",
  "education",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: NewsCategory;
  image?: string;
  publishedAt: string;
  author?: string;
  source?: string;
  readTime?: number;
  featured?: boolean;
  companySymbol?: string;
  tags?: string[];
};

export type NewsQuery = {
  category?: NewsCategory | "all";
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
};

export type NewsResponse = {
  articles: NewsArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};