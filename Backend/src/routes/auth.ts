import { Router } from "express";
import { hashPassword, comparePassword } from "../password";
import { signSessionToken } from "../session";
import { setSessionCookieHeader, clearSessionCookieHeader } from "../cookies";
import { dashboardPathForRole } from "../dashboard";
import { toSafeUser } from "../user-dto";
import { getSessionFromRequest } from "../req-session";
import { findUserByEmail, findUserById, createGuestUser } from "../services/user.service";
import { isReservedStaffEmail } from "../env";
import { ensureMongoBootstrap } from "../bootstrap";

const MIN_PASSWORD = 6;

export const authRouter = Router();

function bootstrapError(err: unknown) {
  console.error("[auth] MongoDB bootstrap failed:", err);
  const detail = err instanceof Error ? err.message : String(err);
  return {
    status: 503 as const,
    body: {
      error:
        "Database unavailable. Start MongoDB and check DATABASE_URL in backend/.env (add ?directConnection=true for a single local node).",
      ...(process.env.NODE_ENV === "development" ? { detail } : {}),
    },
  };
}

authRouter.post("/login", async (req, res) => {
  try {
    try {
      await ensureMongoBootstrap();
    } catch (err) {
      const e = bootstrapError(err);
      return res.status(e.status).json(e.body);
    }

    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await findUserByEmail(email);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const ok = await comparePassword(password, user.passwordHash!);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.setHeader("Set-Cookie", setSessionCookieHeader(token));
    return res.json({
      user: toSafeUser(user),
      redirectTo: dashboardPathForRole(user.role),
    });
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    try {
      await ensureMongoBootstrap();
    } catch (err) {
      const e = bootstrapError(err);
      return res.status(e.status).json(e.body);
    }

    const fullName = String(req.body?.fullName ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Full name, email, and password are required." });
    }

    if (password.length < MIN_PASSWORD) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD} characters.` });
    }

    if (isReservedStaffEmail(email)) {
      return res.status(403).json({
        error:
          "This email is reserved for a staff account (superadmin or booking manager). Choose a different email.",
      });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await hashPassword(password);
    const user = await createGuestUser({ fullName, email, passwordHash });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.setHeader("Set-Cookie", setSessionCookieHeader(token));
    return res.status(201).json({
      user: toSafeUser(user),
      redirectTo: dashboardPathForRole(user.role),
    });
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
});

authRouter.post("/logout", (_req, res) => {
  res.setHeader("Set-Cookie", clearSessionCookieHeader());
  return res.json({ ok: true });
});

authRouter.get("/me", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.json({ user: null });
  }

  const user = await findUserById(session.userId);
  if (!user || !user.isActive) {
    return res.json({ user: null });
  }

  return res.json({ user: toSafeUser(user) });
});
