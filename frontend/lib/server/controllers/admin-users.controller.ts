import type { Request, Response } from "express";
import { getSessionFromRequest } from "@/lib/server/middleware/req-session";
import { isSuperAdmin, toSafeUser } from "@/lib/server/utils/user-dto";
import { findUserById, listUsersOrdered, updateUserRole } from "@/lib/server/services/user.service";
import { ROLES, type Role } from "@/lib/server/utils/types";

export async function listUsers(req: Request, res: Response) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const users = await listUsersOrdered();
  return res.json({ users: users.map(toSafeUser) });
}

export async function updateRole(req: Request, res: Response) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const admin = await findUserById(session.userId);
  if (!admin?.isActive || !isSuperAdmin(admin.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  try {
    const role = req.body?.role as Role | undefined;
    if (!role || !ROLES.includes(role)) {
      return res.status(400).json({ error: "Invalid role." });
    }

    const updated = await updateUserRole(req.params.id, role);
    return res.json({ user: toSafeUser(updated) });
  } catch (e) {
    if (e instanceof Error && e.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Not found." });
    }
    return res.status(400).json({ error: "Invalid request." });
  }
}
