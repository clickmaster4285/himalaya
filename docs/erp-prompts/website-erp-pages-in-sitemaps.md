# ERP integration update: ERP pages in the right sitemap

> Paste this into the AI coding assistant working in a website repository that is **already connected** to the ERP (set up with `website-integration-master-prompt.md`). Replace `{{ERP_API_URL}}` and `{{SITE_DOMAIN}}` first.

---

This website is already connected to our ERP: pages built in ERP **Page Creation** are served at their slug, and the ERP calls `POST /api/erp-revalidate { path }` on every publish. ERP pages must now appear in this site's sitemap, and in the **right** sitemap: a blog page goes in the blog sitemap, an event page in the events sitemap, and so on, exactly the way the site already splits its own code-owned pages. **Extend the existing integration**; don't rebuild what already works.

- ERP API: `{{ERP_API_URL}}`
- Site domain: `{{SITE_DOMAIN}}`

## Step 0: inspect

1. Find every sitemap the site serves: `app/sitemap.ts`, `app/sitemap*.xml/route.ts`, `generateSitemaps`, `next-sitemap`, a static `public/sitemap*.xml`, a sitemap index, and `robots.txt`. Write down which sections each sitemap covers (for example `sitemap_pages.xml` = top-level pages, `sitemap_blogs.xml` = `/blogs/*`).
2. Find how ERP pages are listed today (`getCmsPages()` or equivalent in `lib/cms.ts`) and whether the sitemap already includes them. **Check for the common bug**: a pages sitemap that skips every path under `/blogs`, `/events`, … (because those sections "have their own sitemap"), while those section sitemaps only list code-owned pages. In that case ERP blog pages are in no sitemap at all.
3. Fetch the real list: `GET {{ERP_API_URL}}/public/{{SITE_DOMAIN}}/pages`. Note every `pageType` value that appears, and whether `publishedAt` / `updatedAt` are present. If you get `404 Website not found`, stop and report it.
4. If the site has the ERP deleted-pages integration (`getDeletedPaths` / `erp-deleted-pages`), deleted paths must stay out of every sitemap. Reuse it.
5. Write a short plan (files to add or change), then implement.

## The ERP endpoint

`GET {{ERP_API_URL}}/public/{{SITE_DOMAIN}}/pages` (public, no auth, rate limit 120 req/min per IP) returns only **published** pages:

```json
{
  "success": true,
  "data": {
    "website": { "name": "…", "domain": "{{SITE_DOMAIN}}" },
    "pages": [
      { "title": "Hotel vs Motel", "slug": "/blogs/hotel-vs-motel", "pageType": "blog", "noindex": false, "publishedAt": "2026-11-20T08:00:00.000Z", "updatedAt": "2026-11-25T10:00:00.000Z" }
    ]
  }
}
```

- `slug`: lowercase, leading `/`, no trailing slash. Validate it before use (the site's existing `isCmsSlug` or `^(\/[a-z0-9_-]+)+$`).
- `pageType`: free text set in the ERP. Seen so far: `blog`, `page`. Expect others (`event`, `villa`, `service`, …).
- `publishedAt` / `updatedAt` may be missing on older ERP versions; fall back to the sitemap's default `lastmod`.

## Part 1: one rule for "which sitemap"

Add one helper (for example `lib/seo/cms-sitemap.ts`, server only) that maps an ERP page to one of **this site's** sitemaps:

1. **URL section first.** If the slug is nested under a section that has its own sitemap (`/blogs/x`, `/blog/x`, `/events/x`, `/villas/x`, `/services/x`, …), it goes there. A section's hub itself (`/blogs`) is not a child: leave it where the site lists it today.
2. **Then `pageType`.** `blog` / `article` / `post` → blog sitemap; `event` → events sitemap; and so on for every section sitemap the site has. Build the map from what Step 0 found; don't invent sitemaps the site doesn't have.
3. **Otherwise** → the general pages sitemap.

Each page goes in **exactly one** sitemap. If the site has a single `sitemap.xml`, everything goes in it and only the filtering below applies.

Then add `getCmsSitemapEntries(section, exclude)` that:

- calls the existing cached ERP pages list (never a new uncached fetch per sitemap; fail open: an ERP error returns `[]` and the sitemap still renders),
- keeps pages where `noindex` is false, the slug is valid, and the rule above picks `section`,
- drops paths the sitemap already lists from code (`exclude`), redirect sources and paths the site's sitemap filter already excludes, and paths deleted in the ERP (if that integration exists),
- returns `{ path, lastmod }` (`updatedAt`, else `publishedAt`, as `YYYY-MM-DD`).

## Part 2: add ERP pages to each sitemap

- In every sitemap route, append `getCmsSitemapEntries(<its section>, <paths it already lists>)` after its own entries. Use the same `changefreq` / `priority` style the sitemap uses for similar pages.
- Remove any older ERP-page logic so nothing is listed twice (especially an old "all ERP pages go in the pages sitemap" block).
- Sitemaps stay static/ISR (keep their `revalidate`). Don't make them dynamic.
- If there is a sitemap index, it doesn't change, unless a section sitemap that didn't exist is now needed. Then add it to the index too.

## Part 3: refresh on publish

`POST /api/erp-revalidate` is called by the ERP for every create, publish, update, unpublish, delete and slug change. Make sure it also refreshes **every** sitemap route (`revalidatePath("/sitemap_pages.xml")`, `revalidatePath("/sitemap_blogs.xml")`, …, or `revalidatePath("/sitemap.xml")`) and expires the ERP pages cache tag (Next.js 16: `revalidateTag(tag, { expire: 0 })`). Keep its secret check and everything else it does.

## Non-negotiables

- Fail open: if the ERP is down, every sitemap still renders with the site's own pages, and the build passes.
- Never list `noindex` pages, unpublished pages, deleted pages, invalid slugs or external URLs.
- No page in two sitemaps; no duplicate `<loc>` in one sitemap.
- ERP data is untrusted: validate slugs; never put raw ERP strings in the XML without validation (slugs that pass the regex need no escaping).
- Type-check, lint and build must pass.

## Acceptance checks (run them and report the results)

1. Every published, indexable page from `GET /public/{{SITE_DOMAIN}}/pages` appears in exactly one sitemap. List them with the sitemap each one landed in.
2. A blog page (`/blogs/x` or `pageType: "blog"`) is in the blog sitemap, not the pages sitemap; an event page is in the events sitemap; a plain page is in the pages sitemap.
3. A `noindex` ERP page is in no sitemap.
4. Publish a new page in the ERP: within seconds it appears in the right sitemap (the revalidate call refreshes it). Unpublish it: it leaves.
5. With `CMS_API_URL` pointing to an unreachable host, every sitemap still returns 200 with the site's own pages, and the build succeeds.

Finish with a summary: files added or changed, the section → sitemap map you used, the `pageType` values seen, and any ERP page that was in no sitemap before this change.
