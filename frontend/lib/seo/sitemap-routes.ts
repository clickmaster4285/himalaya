import type { Article } from "@/content/types";
import { VILLA_BLOG_POSTS } from "@/lib/villa-blog-posts";
import { blogCanonicalPath } from "@/lib/blog-posts";
import { allArticles } from "@/content/allArticles";

/** Legacy URLs that duplicate `/blogs/{slug}` — omit from sitemap to avoid duplicate indexing. */
const LEGACY_HREFS = new Set(
  VILLA_BLOG_POSTS.map((p) => p.href).filter((h): h is string => Boolean(h)),
);

const CATEGORY_ALIAS: Record<string, string> = {
  page: "pages",
  pages: "pages",
  blog: "blog",
  blogs: "blog",
  article: "blog",
  villa: "villas",
  villas: "villas",
  event: "events",
  events: "events",
  wedding: "events",
  weddings: "events",
  banquet: "events",
  dining: "events",
  weather: "weather",
  forecast: "weather",
  temperature: "weather",
  temperatures: "weather",
  temp: "weather",
  snow: "weather",
  climate: "weather",
};

function normalizeArticleCategory(category?: string): string {
  if (!category || !category.trim()) return "pages";
  const normalized = category.trim().toLowerCase();
  return CATEGORY_ALIAS[normalized] ?? normalized;
}

function inferArticleCategory(article: Article): string {
  const explicitCategory = normalizeArticleCategory(article.sitemapCategory);
  if (article.sitemapCategory && explicitCategory !== "pages") {
    return explicitCategory;
  }

  const lookup = [article.slug, article.title, article.metaDescription, article.eyebrow]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/(\bblog\b|\barticle\b|\bnews\b)/.test(lookup)) return "blog";
  if (/(weather|temperature|temperatur|forecast|snow|rain|climate)/.test(lookup)) return "weather";
  if (/(event|events|wedding|banquet|celebration|celebrations|corporate|retreat|dining|function|party)/.test(lookup)) return "events";

  return "pages";
}

export function getArticleSitemapRouteDefs(categoryName: string): SitemapRouteDef[] {
  const category = normalizeArticleCategory(categoryName);

  return allArticles
    .map((article) => ({
      category: inferArticleCategory(article),
      path: `/${article.slug}`,
    }))
    .filter((item) => item.category === category)
    .map((item) => ({
      path: item.path,
      changeFrequency: "monthly" as const,
      priority: category === "blog" ? 0.75 : category === "villas" ? 0.8 : 0.65,
    }));
}

export function getAllArticleSitemapRouteDefs(): SitemapRouteDef[] {
  return allArticles.map((article) => ({
    path: `/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
}

export type SitemapRouteDef = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastModified?: Date;
};

const BOOK_CHILD = ["/stay", "/wedding", "/dining", "/event", "/activities", "/meetings"] as const;

function staticMarketingRoutes(includeBookRoutes = true): SitemapRouteDef[] {
  const core: SitemapRouteDef[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
    { path: "/book", changeFrequency: "weekly", priority: 0.95 },
    { path: "/villas", changeFrequency: "weekly", priority: 0.95 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.85 },
    { path: "/experience", changeFrequency: "monthly", priority: 0.85 },
    { path: "/thing-to-do-bhurban-murree2", changeFrequency: "monthly", priority: 0.65 },
  ];

  if (includeBookRoutes) {
    for (const child of BOOK_CHILD) {
      core.push({
        path: `/book${child}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return core.filter((r) => !LEGACY_HREFS.has(r.path));
}

export function getStaticSitemapRouteDefs(options?: { includeBookRoutes?: boolean }): SitemapRouteDef[] {
  return staticMarketingRoutes(options?.includeBookRoutes ?? true);
}

export function getBlogSitemapRouteDefs(): SitemapRouteDef[] {
  return VILLA_BLOG_POSTS.map((post) => ({
    path: blogCanonicalPath(post.slug),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    lastModified: new Date(post.date),
  }));
}
