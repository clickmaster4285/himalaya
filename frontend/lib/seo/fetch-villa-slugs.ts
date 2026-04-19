import { STATIC_VILLAS } from "@/lib/villas-static-data";

function backendOrigin(): string {
  return (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");
}

/**
 * Villa slugs for sitemap: static catalog plus published villas from API (build / ISR).
 */
export async function getAllVillaSlugsForSitemap(): Promise<string[]> {
  const fromStatic = STATIC_VILLAS.map((v) => v.slug);
  try {
    const res = await fetch(`${backendOrigin()}/api/villas`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [...new Set(fromStatic)];
    const data = (await res.json()) as { villas?: { slug?: string }[] };
    const api = (data.villas ?? []).map((v) => v.slug).filter((s): s is string => Boolean(s));
    return [...new Set([...fromStatic, ...api])];
  } catch {
    return [...new Set(fromStatic)];
  }
}
