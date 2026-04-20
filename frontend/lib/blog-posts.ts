import { VILLA_BLOG_POSTS, type VillaBlogPost } from "@/lib/villa-blog-posts";

function normalizeSlug(value: string): string {
  return decodeURIComponent(value).trim().toLowerCase();
}

export function getAllBlogSlugs(): string[] {
  return VILLA_BLOG_POSTS.map((p) => normalizeSlug(p.slug));
}

export function getBlogPostBySlug(slug: string): VillaBlogPost | undefined {
  const normalized = normalizeSlug(slug);
  return VILLA_BLOG_POSTS.find((p) => normalizeSlug(p.slug) === normalized);
}

export function blogCanonicalPath(slug: string): string {
  return `/blog/${normalizeSlug(slug)}`;
}

/** When a legacy route matches `href`, canonical blog URL is `/blog/{slug}`. */
export function findBlogSlugByLegacyHref(href: string): string | undefined {
  const normalized = href.startsWith("/") ? href : `/${href}`;
  const match = VILLA_BLOG_POSTS.find((p) => p.href === normalized);
  return match ? normalizeSlug(match.slug) : undefined;
}
