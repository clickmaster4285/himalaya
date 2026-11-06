/** Canonical public origin (no trailing slash). Always non-www. */
export function getSiteOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://himalayavillas.com").replace(/\/$/, "");
  return raw.replace(/^(https?:\/\/)www\./i, "$1");
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteOrigin()}${p}`;
}

/**
 * Optional comma-separated absolute profile URLs (Facebook, Instagram, etc.).
 * Example: https://www.facebook.com/yourpage,https://www.instagram.com/yourprofile
 */
export function orgSameAsFromEnv(): string[] | undefined {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) return undefined;
  const urls = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return urls.length ? urls : undefined;
}

/**
 * HIM-TRUST-0007: one trading name everywhere (titles, schema, copy).
 * The other names the business has used are declared once, as aliases, in the Organization node.
 */
export const BRAND = {
  name: "Himalaya Villas & Resorts",
  titleSuffix: " | Himalaya Villas & Resorts",
  alternateNames: ["Himalaya Villas", "Himalaya Premium Villas"],
} as const;
