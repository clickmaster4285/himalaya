/** Use with next/image when `src` may be an absolute URL from CMS/admin (optimization only applies to configured remotes). */
export function shouldUnoptimizeImageSrc(src: string): boolean {
  return /^https?:\/\//i.test(src ?? "");
}

export function getValidImageSrc(src?: string, fallback: string = "/assets/villa-exterior.jpg"): string {
  if (!src) return fallback;
  const t = src.trim();
  if (!t) return fallback;
  if (t.startsWith("/") || t.startsWith("data:")) return t;
  try {
    new URL(t);
    return t;
  } catch {
    return fallback;
  }
}
