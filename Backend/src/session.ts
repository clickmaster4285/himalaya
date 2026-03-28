import { SignJWT, jwtVerify } from "jose";
import type { Role } from "./types";

export const SESSION_COOKIE = "hv_session";

export type SessionPayload = {
  userId: string;
  email: string;
  role: Role;
};

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "dev-only-secret-change-me") {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET must be set in production.");
    }
  }
  return new TextEncoder().encode(secret ?? "dev-only-secret-change-me");
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const userId = String(payload.userId ?? "");
    const email = String(payload.email ?? "");
    const role = payload.role as Role;
    if (!userId || !email || !role) return null;
    if (role !== "SUPERADMIN" && role !== "BOOKING_MANAGER" && role !== "USER") return null;
    return { userId, email, role };
  } catch {
    return null;
  }
}
