// lib/seo/cms-sitemap.ts
// Pages created in the ERP (Page Creation, GET /public/:domain/pages) go into
// the sitemap that matches them, the same way code-owned pages are split:
//   /blogs/… or pageType "blog"     → sitemap_blogs.xml (and sitemap_blog.xml)
//   /events/… or pageType "event"   → sitemap_events.xml
//   /villas/… or pageType "villa"   → sitemap_villas.xml
//   /book/…                         → sitemap_book.xml
//   anything else                   → sitemap_pages.xml
// The URL section wins over pageType, so a page sits in the sitemap of the
// section it is served under. noindex, deleted (Page Delete Requests) and
// redirected paths are left out. /api/erp-revalidate refreshes every sitemap
// when the ERP publishes, so a new page shows up immediately.
import "server-only";
import { getCmsPages, isCmsSlug, type CmsPageSummary } from "@/lib/cms";
import { withoutDeletedPaths } from "@/lib/erp-deleted-pages-server";
import { isExcludedFromSitemap } from "@/lib/seo/sitemap-filter";

export type CmsSitemapSection = "pages" | "blogs" | "events" | "villas" | "book";

const SECTION_BY_SEGMENT: Record<string, CmsSitemapSection> = {
  blogs: "blogs",
  blog: "blogs",
  events: "events",
  villas: "villas",
  book: "book",
};

const SECTION_BY_PAGE_TYPE: Record<string, CmsSitemapSection> = {
  blog: "blogs",
  blogs: "blogs",
  article: "blogs",
  post: "blogs",
  event: "events",
  events: "events",
  villa: "villas",
  villas: "villas",
};

/** Which sitemap an ERP page belongs in: URL section first, then pageType, else "pages". */
export function cmsSitemapSection(page: Pick<CmsPageSummary, "slug" | "pageType">): CmsSitemapSection {
  const segment = page.slug.split("/")[1]?.toLowerCase() ?? "";
  const nested = page.slug.split("/").length > 2;
  // "/blogs" itself is a hub page (code-owned); only children belong to the section.
  if (nested && SECTION_BY_SEGMENT[segment]) return SECTION_BY_SEGMENT[segment];
  return SECTION_BY_PAGE_TYPE[page.pageType.trim().toLowerCase()] ?? "pages";
}

export type CmsSitemapEntry = { path: string; lastmod?: string };

/**
 * Published, indexable ERP pages for one sitemap. Empty when the ERP is
 * unreachable, so a sitemap never breaks. `exclude` drops paths the sitemap
 * already lists from code.
 */
export async function getCmsSitemapEntries(
  section: CmsSitemapSection,
  exclude: Iterable<string> = [],
): Promise<CmsSitemapEntry[]> {
  const skip = new Set(exclude);
  const pages = (await getCmsPages()).filter(
    (page) =>
      !page.noindex &&
      isCmsSlug(page.slug) &&
      !skip.has(page.slug) &&
      !isExcludedFromSitemap(page.slug) &&
      cmsSitemapSection(page) === section,
  );
  const visible = await withoutDeletedPaths(pages, (page) => page.slug);
  const seen = new Set<string>();
  return visible.flatMap((page) => {
    if (seen.has(page.slug)) return [];
    seen.add(page.slug);
    const date = new Date(page.publishedAt);
    return [{ path: page.slug, lastmod: Number.isNaN(date.getTime()) ? undefined : date.toISOString().split("T")[0] }];
  });
}
