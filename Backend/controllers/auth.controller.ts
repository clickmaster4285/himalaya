import { NextResponse } from "next/server";
import { hashPassword, comparePassword } from "@/lib/auth-password";
import { attachSessionCookie, clearSessionCookie } from "@/lib/auth-cookies";
import { signSessionToken } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/dashboard-nav";
import { toSafeUser } from "@/lib/user-public";
import { getSessionFromCookies } from "@/lib/server-session";
import { UserModel } from "@/Backend/models/user.model";
import { isReservedStaffEmail } from "@/Backend/config/env";
const MIN_PASSWORD = 6;

export async function login(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await UserModel.findByEmail(email);
    if (!user || !user.isActive) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: toSafeUser(user),
      redirectTo: dashboardPathForRole(user.role),
    });
    return attachSessionCookie(response, token);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function register(req: Request) {
  try {
    const body = await req.json();
    const fullName = String(body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Full name, email, and password are required." }, { status: 400 });
    }

    if (password.length < MIN_PASSWORD) {
      return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD} characters.` }, { status: 400 });
    }

    if (isReservedStaffEmail(email)) {
      return NextResponse.json(
        { error: "This email is reserved for a staff account (superadmin or booking manager). Choose a different email." },
        { status: 403 },
      );
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await UserModel.createGuest({ fullName, email, passwordHash });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        user: toSafeUser(user),
        redirectTo: dashboardPathForRole(user.role),
      },
      { status: 201 },
    );
    return attachSessionCookie(response, token);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function logout() {
  const response = NextResponse.json({ ok: true });
  return clearSessionCookie(response);
}

export async function me() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = await UserModel.findById(session.userId);
  if (!user || !user.isActive) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: toSafeUser(user) });
}
