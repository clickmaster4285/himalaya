import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SessionPayload, SessionRole } from "@/lib/session";
import type { SafeUser } from "@/lib/user-public";
import { dashboardPathForRole } from "@/lib/dashboard-nav";

const BACKEND = (process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:5000").replace(/\/$/, "");

/**
 * Ask the API server who is logged in (same `hv_session` cookie the browser sends).
 * JWT is verified only on the backend — no JWT_SECRET mismatch with Next.js.
 */
async function fetchMeUser(): Promise<SafeUser | null> {
  const jar = await cookies();
  const parts = jar.getAll();
  if (parts.length === 0) return null;

  const cookie = parts.map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${BACKEND}/api/auth/me`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json().catch(() => ({}))) as { user?: SafeUser | null };
  return data.user ?? null;
}

function userToPayload(user: SafeUser): SessionPayload {
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
}

export async function getSessionPayload(): Promise<SessionPayload | null> {
  const user = await fetchMeUser();
  if (!user) return null;
  return userToPayload(user);
}

/** Any logged-in user may access `/dashboard/*`; nested layouts enforce role. */
export async function requireDashboardSession(): Promise<SessionPayload> {
  const user = await fetchMeUser();
  if (!user) {
    redirect("/login?from=/dashboard");
  }
  return userToPayload(user);
}

export async function requireDashboardRole(allowed: SessionRole | readonly SessionRole[]): Promise<SessionPayload> {
  const payload = await requireDashboardSession();
  const list = Array.isArray(allowed) ? allowed : [allowed];
  if (!list.includes(payload.role)) {
    redirect(dashboardPathForRole(payload.role));
  }
  return payload;
}
