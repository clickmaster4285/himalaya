import { headers } from "next/headers";
import type { Villa } from "@/lib/villa-types";

async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function getPublishedVillas(): Promise<Villa[]> {
  const origin = await siteOrigin();
  const res = await fetch(`${origin}/api/villas`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as { villas?: Villa[] };
  return data.villas ?? [];
}

export async function getVillaBySlugPublic(slug: string): Promise<Villa | null> {
  const origin = await siteOrigin();
  const res = await fetch(`${origin}/api/villas/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = (await res.json()) as { villa?: Villa };
  return data.villa ?? null;
}
