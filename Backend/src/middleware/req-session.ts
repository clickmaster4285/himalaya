import type { Request } from "express";
import cookie from "cookie";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "../utils/session";

export async function getSessionFromRequest(req: Request): Promise<SessionPayload | null> {
  const raw = req.headers.cookie;
  if (!raw) return null;
  const parsed = cookie.parse(raw);
  const token = parsed[SESSION_COOKIE];
  if (!token) return null;
  return verifySessionToken(token);
}
