import "server-only";

import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "@/lib/session";
import type { SafeUser } from "@/lib/user-public";
import { connectDb } from "@/lib/server/db";
import { findUserById } from "@/lib/server/services/user.service";
import { toSafeUser as toServerSafeUser } from "@/lib/server/utils/user-dto";

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Current user from session cookie + MongoDB (no self-fetch). */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const session = await getSessionFromCookies();
  if (!session) return null;

  try {
    await connectDb();
    const user = await findUserById(session.userId);
    if (!user?.isActive) return null;
    const safe = toServerSafeUser(user);
    return {
      ...safe,
      createdAt:
        safe.createdAt instanceof Date ? safe.createdAt.toISOString() : String(safe.createdAt),
    };
  } catch (err) {
    console.error("[server-session] getCurrentUser:", err);
    return null;
  }
}
