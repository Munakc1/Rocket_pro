import type {
  NewsArticle,
  NewsCategory,
  NewsQuery,
  NewsResponse,
} from "@/lib/types/news";

const NEWS_PAGE_SIZE = 9;

/**
 * DEVELOPMENT DATA ONLY
 *
 * These articles are intentionally generic development content.
 * They are NOT verified financial news and must not be presented
 * as real-world market events.
 *
 * Replace this provider with the real Rocket Pro backend/API when available.
 */
const DEVELOPMENT_NEWS: NewsArticle[] = [
  {
    id: "dev-market-001",
    slug: "development-market-information-update",
    title: "Development market information update",
    excerpt:
      "Sample editorial content used to demonstrate the Rocket Pro market-news experience while the production news API is being connected.",
    content: [
      "This is development content for the Rocket Pro News experience.",
      "The article is intentionally written without claiming a real market event, company announcement, regulatory decision, or financial result.",
      "When the production news API is connected, verified editorial content can be supplied through the same typed data interface.",
    ],
    category: "market",
    image: "/images/a.jpg",
    publishedAt: "2026-09-25T10:00:00+05:45",
    readTime: 2,
    featured: true,
    tags: ["market"],
  },
  {
    id: "dev-company-001",
    slug: "development-company-news-example",
    title: "Development company news example",
    excerpt:
      "A sample company-news article demonstrating how listed-company coverage can appear inside Rocket Pro.",
    content: [
      "This sample article demonstrates the company-news layout.",
      "No real company announcement or financial result is being represented here.",
      "Production company information should come from a verified source or Rocket Pro backend data service.",
    ],
    category: "company",
    image: "/images/b.jpg",
    publishedAt: "2026-09-24T15:30:00+05:45",
    readTime: 2,
    tags: ["company"],
  },
  {
    id: "dev-ipo-001",
    slug: "development-ipo-information-example",
    title: "Development IPO information example",
    excerpt:
      "A development article showing how IPO-related information can be organized for Rocket Pro users.",
    content: [
      "This is sample IPO content for development purposes.",
      "No IPO approval, issue date, application status, or regulatory decision is being claimed.",
      "Production IPO information should be populated from verified data sources.",
    ],
    category: "ipo",
    image: "/images/c.jpg",
    publishedAt: "2026-09-24T12:15:00+05:45",
    readTime: 3,
    tags: ["IPO"],
  },
  {
    id: "dev-policy-001",
    slug: "development-policy-update-example",
    title: "Development policy update example",
    excerpt:
      "A neutral development article demonstrating Rocket Pro's policy-news presentation.",
    content: [
      "This is development content demonstrating the policy-news category.",
      "No government, regulator, or policy announcement is being represented as factual.",
      "Verified policy information can be connected through the production news provider.",
    ],
    category: "policy",
    image: "/images/a.jpg",
    publishedAt: "2026-09-23T16:00:00+05:45",
    readTime: 2,
    tags: ["policy"],
  },
  {
    id: "dev-economy-001",
    slug: "development-economy-example",
    title: "Development economy article example",
    excerpt:
      "A sample economic-news article demonstrating the editorial structure of Rocket Pro.",
    content: [
      "This article exists only to demonstrate the Rocket Pro economy-news interface.",
      "It does not report a verified economic statistic or real-world event.",
      "Production economic coverage should use verified information from the connected news provider.",
    ],
    category: "economy",
    image: "/images/b.jpg",
    publishedAt: "2026-09-23T11:00:00+05:45",
    readTime: 2,
    tags: ["economy"],
  },
  {
    id: "dev-education-001",
    slug: "development-financial-education-example",
    title: "Development financial education example",
    excerpt:
      "A sample educational article showing how financial-learning content can be presented on Rocket Pro.",
    content: [
      "This is development educational content.",
      "Rocket Pro can use this section for market terminology, technical-analysis concepts, financial statements, and other educational resources.",
      "Educational content should remain informational and should not be presented as personalized financial advice.",
    ],
    category: "education",
    image: "/images/c.jpg",
    publishedAt: "2026-09-22T09:00:00+05:45",
    readTime: 3,
    tags: ["education"],
  },
  {
    id: "dev-market-002",
    slug: "development-market-analysis-example",
    title: "Development market analysis example",
    excerpt:
      "A development placeholder for market-analysis coverage within the Rocket Pro news platform.",
    content: [
      "This is a neutral development article.",
      "It demonstrates how market-analysis content can be structured without making a prediction or investment recommendation.",
    ],
    category: "market",
    image: "/images/c.jpg",
    publishedAt: "2026-09-21T14:00:00+05:45",
    readTime: 2,
    tags: ["market", "analysis"],
  },
  {
    id: "dev-company-002",
    slug: "development-listed-company-example",
    title: "Development listed-company coverage example",
    excerpt:
      "A sample article for demonstrating listed-company coverage and navigation.",
    content: [
      "This is sample development content for a listed-company news workflow.",
      "Company-specific information should be supplied from verified production data before publication.",
    ],
    category: "company",
    image: "/images/a.jpg",
    publishedAt: "2026-09-20T13:00:00+05:45",
    readTime: 2,
    tags: ["company"],
  },
  {
    id: "dev-ipo-002",
    slug: "development-public-issue-example",
    title: "Development public-issue article example",
    excerpt:
      "A development placeholder for public-issue and IPO information.",
    content: [
      "This is development-only IPO content.",
      "No real public issue, approval, subscription result, or regulatory action is being reported.",
    ],
    category: "ipo",
    image: "/images/b.jpg",
    publishedAt: "2026-09-19T10:30:00+05:45",
    readTime: 2,
    tags: ["IPO"],
  },
  {
    id: "dev-policy-002",
    slug: "development-capital-market-policy-example",
    title: "Development capital-market policy example",
    excerpt:
      "A sample policy-news article for demonstrating the Rocket Pro editorial experience.",
    content: [
      "This is development content for the policy category.",
      "Production policy stories should be based on verified regulatory or government information.",
    ],
    category: "policy",
    image: "/images/c.jpg",
    publishedAt: "2026-09-18T15:00:00+05:45",
    readTime: 2,
    tags: ["policy"],
  },
];

function normalizeSearch(value?: string): string {
  return value?.trim().toLowerCase() ?? "";
}

function sortArticles(
  articles: NewsArticle[],
  sort: "latest" | "oldest",
): NewsArticle[] {
  return [...articles].sort((a, b) => {
    const first = new Date(a.publishedAt).getTime();
    const second = new Date(b.publishedAt).getTime();

    return sort === "oldest" ? first - second : second - first;
  });
}

function filterArticles(
  articles: NewsArticle[],
  query: NewsQuery,
): NewsArticle[] {
  const category = query.category ?? "all";
  const search = normalizeSearch(query.search);

  return articles.filter((article) => {
    const categoryMatches =
      category === "all" || article.category === category;

    if (!categoryMatches) {
      return false;
    }

    if (!search) {
      return true;
    }

    const searchableText = [
      article.title,
      article.excerpt,
      article.category,
      article.author,
      article.source,
      ...(article.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });
}

export async function getLatestNews(
  query: NewsQuery = {},
): Promise<NewsResponse> {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.max(1, query.limit ?? NEWS_PAGE_SIZE);
  const sort = query.sort ?? "latest";

  const filtered = filterArticles(DEVELOPMENT_NEWS, query);
  const sorted = sortArticles(filtered, sort);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * limit;
  const articles = sorted.slice(start, start + limit);

  return {
    articles,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export async function getFeaturedNews(): Promise<NewsArticle[]> {
  return sortArticles(
    DEVELOPMENT_NEWS.filter((article) => article.featured),
    "latest",
  );
}

export async function getNewsByCategory(
  category: NewsCategory,
  options: Omit<NewsQuery, "category"> = {},
): Promise<NewsResponse> {
  return getLatestNews({
    ...options,
    category,
  });
}

export async function getNewsById(
  id: string,
): Promise<NewsArticle | null> {
  return DEVELOPMENT_NEWS.find((article) => article.id === id) ?? null;
}

export async function getNewsBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  return (
    DEVELOPMENT_NEWS.find((article) => article.slug === slug) ?? null
  );
}

export async function searchNews(
  search: string,
  options: Omit<NewsQuery, "search"> = {},
): Promise<NewsResponse> {
  return getLatestNews({
    ...options,
    search,
  });
}

export async function getRelatedNews(
  article: NewsArticle,
  limit = 4,
): Promise<NewsArticle[]> {
  return sortArticles(
    DEVELOPMENT_NEWS.filter((candidate) => {
      if (candidate.id === article.id) {
        return false;
      }

      if (candidate.category === article.category) {
        return true;
      }

      return (candidate.tags ?? []).some((tag) =>
        (article.tags ?? []).includes(tag),
      );
    }),
    "latest",
  ).slice(0, limit);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  return DEVELOPMENT_NEWS.map((article) => article.slug);
}