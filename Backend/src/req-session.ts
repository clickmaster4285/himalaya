import cookie from "cookie";
import type { Request } from "express";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "./session";

export async function getSessionFromRequest(req: Request): Promise<SessionPayload | null> {
  const raw = req.headers.cookie;
  if (!raw) return null;
  const parsed = cookie.parse(raw);
  const token = parsed[SESSION_COOKIE];
  if (!token) return null;
  return verifySessionToken(token);
}
