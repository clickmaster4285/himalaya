import { cookies, headers } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "@/lib/session";
import type { SafeUser } from "@/lib/user-public";

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const cookie = h.get("cookie") ?? "";
  const res = await fetch(`${proto}://${host}/api/auth/me`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { user: SafeUser | null };
  return data.user ?? null;
}
