import { headers } from "next/headers";
import type { Villa } from "@/lib/villa-types";
import { CATALOG_VILLAS, VILLA_CATALOG_SLUGS, isCatalogVillaSlug } from "@/lib/villa-catalog";

async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

function filterToCatalog(villas: Villa[]): Villa[] {
  const allowed = new Set(VILLA_CATALOG_SLUGS);
  return villas.filter((v) => allowed.has(v.slug));
}

export async function getPublishedVillas(): Promise<Villa[]> {
  try {
    const origin = await siteOrigin();
    const res = await fetch(`${origin}/api/villas`, { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { villas?: Villa[] };
      const fromApi = filterToCatalog(data.villas ?? []);
      if (fromApi.length > 0) return fromApi;
    }
  } catch {
    /* use catalog fallback */
  }
  return CATALOG_VILLAS;
}

export async function getVillaBySlugPublic(slug: string): Promise<Villa | null> {
  const catalogMatch = CATALOG_VILLAS.find((v) => v.slug === slug);
  if (catalogMatch) return catalogMatch;

  try {
    const origin = await siteOrigin();
    const res = await fetch(`${origin}/api/villas/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const data = (await res.json()) as { villa?: Villa };
    const villa = data.villa;
    if (!villa || !isCatalogVillaSlug(villa.slug)) return null;
    return villa;
  } catch {
    return null;
  }
}
