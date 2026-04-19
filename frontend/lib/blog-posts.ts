import { VILLA_BLOG_POSTS, type VillaBlogPost } from "@/lib/villa-blog-posts";

export function getAllBlogSlugs(): string[] {
  return VILLA_BLOG_POSTS.map((p) => p.slug);
}

export function getBlogPostBySlug(slug: string): VillaBlogPost | undefined {
  return VILLA_BLOG_POSTS.find((p) => p.slug === slug);
}

export function blogCanonicalPath(slug: string): string {
  return `/blog/${slug}`;
}

/** When a legacy route matches `href`, canonical blog URL is `/blog/{slug}`. */
export function findBlogSlugByLegacyHref(href: string): string | undefined {
  const normalized = href.startsWith("/") ? href : `/${href}`;
  return VILLA_BLOG_POSTS.find((p) => p.href === normalized)?.slug;
}
