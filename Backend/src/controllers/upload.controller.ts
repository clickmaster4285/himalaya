import type { Request, Response } from "express";
import { getSessionFromRequest } from "../middleware/req-session";
import { isSuperAdmin } from "../utils/user-dto";
import { findUserById } from "../services/user.service";

export async function uploadImage(req: Request, res: Response) {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });
  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  return res.json({ url: `/uploads/${file.filename}` });
}
