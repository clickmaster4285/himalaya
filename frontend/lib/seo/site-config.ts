/** Canonical public origin (no trailing slash). */
export function getSiteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://himalayavillas.com").replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
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
