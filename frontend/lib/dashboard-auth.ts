import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SessionPayload, SessionRole } from "@/lib/session";
import type { SafeUser } from "@/lib/user-public";
import { dashboardPathForRole } from "@/lib/dashboard-nav";
import { connectDb } from "@/lib/server/db";
import { getSessionFromRequest } from "@/lib/server/middleware/req-session";
import { findUserById } from "@/lib/server/services/user.service";
import { toSafeUser as toServerSafeUser } from "@/lib/server/utils/user-dto";

async function fetchMeUser(): Promise<SafeUser | null> {
  const jar = await cookies();
  const parts = jar.getAll();
  if (parts.length === 0) return null;

  const cookie = parts.map((c) => `${c.name}=${c.value}`).join("; ");
  await connectDb();

  const session = await getSessionFromRequest({ headers: { cookie } } as import("express").Request);
  if (!session) return null;

  const user = await findUserById(session.userId);
  if (!user?.isActive) return null;
  const safe = toServerSafeUser(user);
  return {
    ...safe,
    createdAt: safe.createdAt instanceof Date ? safe.createdAt.toISOString() : String(safe.createdAt),
  };
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
