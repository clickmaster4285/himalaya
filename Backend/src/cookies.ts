import { serialize } from "cookie";
import { SESSION_COOKIE } from "./session";

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

export function setSessionCookieHeader(token: string): string {
  return serialize(SESSION_COOKIE, token, {
    ...cookieBase,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookieHeader(): string {
  return serialize(SESSION_COOKIE, "", {
    ...cookieBase,
    maxAge: 0,
  });
}
