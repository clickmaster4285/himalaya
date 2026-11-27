# ERP update: what connected websites need for sitemaps and Page Delete Requests

> Paste this into the AI coding assistant working in the **ERP repository** (backend + admin). It lists what connected websites now rely on. The website side is described in the "ERP integration update: delete pages" website prompt and in `website-erp-pages-in-sitemaps.md` (ERP pages in the right sitemap).

---

Connected websites now (1) answer **410 Gone** for URLs in a Page Delete Request marked **Done** and drop them from their sitemaps, and (2) put every published ERP page into the sitemap that matches its URL section or `pageType`. Both depend on the ERP's public API and on the ERP calling each website's revalidate webhook at the right moments. Check each point below against the code, fix what is missing, and **don't change the shape of existing responses**: add fields only.

## Step 0: inspect

1. Find the public router (`/public/:domain/...`): `pages`, `pages/:slug`, `edited-pages`, `page-edits`, `preview/:token`, and `deleted-pages`. Note its rate limiting and CORS.
2. Find the Page Creation and Page Delete Requests controllers/services and every place that changes a page's public state: create, publish, update, unpublish, delete, slug change, noindex change, pageType change, and a delete request moving to or from **Done**.
3. Find the code that calls a website's `POST {site}/api/erp-revalidate` (bearer secret per website) and where the website URL and secret are stored.
4. Check what production actually serves: on `https://apierp.clickmasters.pk`, `GET /public/himalayavillas.com/deleted-pages` currently answers Express's `Cannot GET` (404). The route isn't deployed there, or isn't mounted.
5. Write a short plan, then implement.

## Part 1: `GET /public/:domain/deleted-pages` (must be live in production)

Public, no auth, CORS `*`, same rate limit as the other `/public` routes (120 req/min per IP).

```json
{
  "success": true,
  "message": "Deleted pages retrieved successfully",
  "data": {
    "website": { "name": "…", "domain": "example.com" },
    "pages": [{ "path": "/villas/old-villa", "deletedAt": "2026-11-27T10:15:00.000Z" }]
  }
}
```

- Only requests whose status is **Done**. One entry per URL; dedupe when two Done requests cover the same URL (keep the earliest `deletedAt`).
- `path`: the URL's pathname only. Decoded, lowercase, leading `/`, no trailing slash, no query or hash, no host. Store it normalized at save time, and normalize again on read for old rows.
- Never `/`: refuse a delete request for the home page on save (validation error in the admin), and filter it out on read anyway.
- Refuse URLs on other domains than the website's (with or without `www.`) on save.
- Unknown or inactive domain: `404 { "success": false, "message": "Website not found" }`, the same as the other public routes. Websites treat any error as "keep the last good list".
- An empty `pages` array is a normal answer, not a 404.
- Make sure the route is mounted in the production server and deployed. Add a test that hits it.

## Part 2: `GET /public/:domain/pages` (sitemap data)

Websites build their sitemaps from this list. Keep the current fields (`title`, `slug`, `pageType`, `noindex`) and add:

- `publishedAt`: ISO date of the first publish.
- `updatedAt`: ISO date of the last published change (used as `<lastmod>`).

Also:

- Only **published** pages, as today. Drafts never appear.
- Exclude pages whose URL is in a **Done** delete request, so the list and `deleted-pages` never disagree.
- `pageType`: keep one fixed list of values in the ERP (for example `page`, `blog`, `event`, `villa`, `service`), lowercase, chosen from a select in the admin rather than typed free text. Websites route `blog` pages to their blog sitemap, `event` pages to their events sitemap, and so on. Migrate existing free-text values to that list.
- Optional but useful: in the Page Creation editor, show the URL the page will be served at next to the slug and page type, so editors see that `/blogs/...` + `blog` go together.

## Part 3: call the website's revalidate webhook every time public state changes

`POST {websiteUrl}/api/erp-revalidate` with `Authorization: Bearer <website revalidate secret>` and body `{ "path": "/the-page" }`. Call it:

| Event | Paths to send |
| --- | --- |
| Page created **and published** (first publish) | the page's slug |
| Published page updated | the slug |
| Page unpublished or deleted | the slug |
| Slug changed | the **old** slug and the **new** slug |
| `noindex` or `pageType` changed | the slug (its sitemap changes) |
| Page Editing: edits published or removed | the edited path |
| Delete request moved **to Done** | every URL of the request |
| Delete request moved **away from Done** (Processing, Rejected, …) or deleted | every URL of the request |

- The website refreshes its pages cache, its deleted-pages cache and **all** its sitemaps on any valid call, so one call per path is enough.
- Send the call after the database commit, never before.
- Don't block or fail the admin action on the webhook: run it in the background with a 5 s timeout and up to 3 retries with backoff (for example 2 s, 10 s, 60 s). Log failures with the website, path and status, and show the last webhook result on the website's settings screen.
- A `401` means a wrong secret: don't retry it, show it to the admin.
- Websites without a configured revalidate URL are skipped silently. They pick changes up from their cache TTLs (30 s for deletions, a few minutes for pages).

## Non-negotiables

- Never change or remove existing response fields; only add.
- Public routes stay read-only, unauthenticated and rate limited; never expose drafts, preview tokens or internal IDs.
- The home page can never be deleted through a delete request.
- Webhook failures never break saving in the admin.
- Tests and lint must pass.

## Acceptance checks (run them and report the results)

1. `curl https://apierp.clickmasters.pk/public/himalayavillas.com/deleted-pages` returns `200` with `data.pages` (empty or not). An unknown domain returns `404 Website not found`.
2. Create a delete request for `https://himalayavillas.com/Some-Page/?x=1` and mark it Done: the endpoint lists `{ "path": "/some-page" }`, the website's revalidate route receives `{ "path": "/some-page" }`, and `curl -I https://himalayavillas.com/some-page` returns `410`.
3. A delete request for `/` (or the bare domain) is refused in the admin.
4. Move the request back to Processing: it leaves the endpoint, the webhook fires again, and the page returns `200`.
5. `GET /public/himalayavillas.com/pages` includes `publishedAt` and `updatedAt` for every page and never includes a page that is in a Done delete request.
6. Publish a new `blog` page at `/blogs/new-post`: the webhook fires, and within seconds it is in `https://himalayavillas.com/sitemap_blogs.xml`, not in `sitemap_pages.xml`.
7. Change a page's slug: the webhook fires for both the old and the new slug.
8. With the website down, saving in the admin still succeeds; the webhook is retried and the failure is logged.

Finish with a summary: files added or changed, what was missing in production, the final `pageType` list, and where webhook results are shown.
