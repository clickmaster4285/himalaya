import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/server-session";
import { isSuperAdmin, toSafeUser } from "@/lib/user-public";
import { UserModel } from "@/Backend/models/user.model";

export async function listUsersAdmin() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await UserModel.findById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const users = await UserModel.listAllOrderedByCreated();
  return NextResponse.json({ users: users.map(toSafeUser) });
}

export async function patchUserRole(req: Request, targetUserId: string) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const admin = await UserModel.findById(session.userId);
  if (!admin?.isActive || !isSuperAdmin(admin.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  try {
    const body = await req.json();
    const role = body?.role as Role | undefined;
    if (!role || !Object.values(Role).includes(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    const updated = await UserModel.updateRole(targetUserId, role);
    return NextResponse.json({ user: toSafeUser(updated) });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
