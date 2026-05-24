import { VILLA_BLOG_POSTS } from "@/lib/villa-blog-posts";
import { blogCanonicalPath } from "@/lib/blog-posts";

/** Legacy URLs that duplicate `/blog/{slug}` — omit from sitemap to avoid duplicate indexing. */
const LEGACY_HREFS = new Set(
  VILLA_BLOG_POSTS.map((p) => p.href).filter((h): h is string => Boolean(h)),
);

export type SitemapRouteDef = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastModified?: Date;
};

const BOOK_CHILD = ["/stay", "/wedding", "/dining", "/event", "/activities", "/meetings"] as const;

function staticMarketingRoutes(): SitemapRouteDef[] {
  const core: SitemapRouteDef[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
    { path: "/book", changeFrequency: "weekly", priority: 0.95 },
    { path: "/villas", changeFrequency: "weekly", priority: 0.95 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.85 },
    { path: "/experience", changeFrequency: "monthly", priority: 0.85 },
    { path: "/things-to-do-in-murree", changeFrequency: "monthly", priority: 0.88 },
    { path: "/things-to-do-in-murree-in-winter", changeFrequency: "monthly", priority: 0.88 },
    { path: "/family-things-to-do-murree", changeFrequency: "monthly", priority: 0.88 },
    { path: "/best-restaurants-murree", changeFrequency: "monthly", priority: 0.88 },
    { path: "/places-to-visit-near-murree", changeFrequency: "monthly", priority: 0.88 },
    { path: "/outdoor-activities-murree", changeFrequency: "monthly", priority: 0.88 },
    { path: "/things-to-do-in-murree-for-couples", changeFrequency: "monthly", priority: 0.88 },
    { path: "/things-to-do-in-murree-at-night", changeFrequency: "monthly", priority: 0.88 },
    { path: "/murree-3-day-itinerary", changeFrequency: "monthly", priority: 0.88 },
    { path: "/things-to-do-bhurban-murree", changeFrequency: "monthly", priority: 0.88 },
    { path: "/marriage-hall-bhurban-murree", changeFrequency: "monthly", priority: 0.92 },
    { path: "/outdoor-wedding-venue-murree", changeFrequency: "monthly", priority: 0.9 },
    { path: "/wedding-packages-murree-prices", changeFrequency: "monthly", priority: 0.9 },
    { path: "/nikah-venue-bhurban", changeFrequency: "monthly", priority: 0.9 },
    { path: "/walima-hall-murree", changeFrequency: "monthly", priority: 0.9 },
    { path: "/weddings/nikah", changeFrequency: "monthly", priority: 0.9 },
    { path: "/weddings-celebrations", changeFrequency: "monthly", priority: 0.88 },
    { path: "/meetings-events", changeFrequency: "monthly", priority: 0.85 },
    { path: "/weather-forecast", changeFrequency: "weekly", priority: 0.8 },
    { path: "/adventure-games", changeFrequency: "monthly", priority: 0.85 },
  ];

  for (const child of BOOK_CHILD) {
    core.push({
      path: `/book${child}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return core.filter((r) => !LEGACY_HREFS.has(r.path));
}

export function getStaticSitemapRouteDefs(): SitemapRouteDef[] {
  return staticMarketingRoutes();
}

export function getBlogSitemapRouteDefs(): SitemapRouteDef[] {
  return VILLA_BLOG_POSTS.map((post) => ({
    path: blogCanonicalPath(post.slug),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    lastModified: new Date(post.date),
  }));
}
