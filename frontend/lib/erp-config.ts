// lib/erp-config.ts
// ERP connection settings shared by the server-only clients (lib/cms.ts,
// lib/erp-edits.ts) and proxy.ts (lib/erp-deleted-pages.ts). No server-only
// imports, so the proxy bundle can use it too. Never NEXT_PUBLIC_ variables.

/** ERP backend base URL. */
export const CMS_API_URL = (
  process.env.CMS_API_URL ??
  (process.env.NODE_ENV === "development" ? "https://apierp.clickmasters.pk" : undefined)
)?.replace(/\/+$/, "");

/** The domain this site is registered under in the ERP. */
export const CMS_SITE_DOMAIN = (process.env.CMS_SITE_DOMAIN ?? "himalayavillas.com")
  .trim()
  .toLowerCase()
  .replace(/^https?:\/\//, "")
  .replace(/^www\./, "")
  .replace(/\/.*$/, "");

export const cmsBaseUrl = () => `${CMS_API_URL}/public/${encodeURIComponent(CMS_SITE_DOMAIN)}`;
