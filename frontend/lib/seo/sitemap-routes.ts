import { VILLA_BLOG_POSTS } from "@/lib/villa-blog-posts";
import { blogCanonicalPath } from "@/lib/blog-posts";
import { discoverAppDirectoryRoutes } from "@/lib/seo/discover-app-routes";
import { routeDefFromPath } from "@/lib/seo/sitemap-priorities";

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

/** All static marketing pages under `app/` (auto-discovered on each sitemap build). */
export function getStaticSitemapRouteDefs(): SitemapRouteDef[] {
  const paths = discoverAppDirectoryRoutes().filter((p) => !LEGACY_HREFS.has(p));

  return paths.map((path) => ({
    path,
    ...routeDefFromPath(path),
  }));
}

export function getBlogSitemapRouteDefs(): SitemapRouteDef[] {
  return VILLA_BLOG_POSTS.map((post) => ({
    path: blogCanonicalPath(post.slug),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    lastModified: new Date(post.date),
  }));
}
