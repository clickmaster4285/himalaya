import { Router } from "express";
import { getSessionFromRequest } from "../req-session";
import { canManageBookings } from "../user-dto";
import { findUserById } from "../services/user.service";
import { PackageM } from "../models/schemas";

export const packagesRouter = Router();

packagesRouter.get("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  const me = session ? await findUserById(session.userId) : null;
  const staff = !!me?.isActive && canManageBookings(me.role);

  const q: Record<string, unknown> = {};
  if (!staff) q.active = true;

  const rows = await PackageM.find(q).sort({ experienceType: 1, name: 1 }).lean();
  const packages = (rows as Array<any>).map((p) => ({
    id: String(p._id),
    name: String(p.name),
    experienceType: String(p.experienceType),
    description: p.description == null ? null : String(p.description),
    priceLabel: p.priceLabel == null ? null : String(p.priceLabel),
    active: Boolean(p.active),
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : null,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
  }));

  return res.json({ packages });
});

packagesRouter.post("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const name = String(req.body?.name ?? "").trim();
  const experienceType = String(req.body?.experienceType ?? "").trim();
  const descriptionRaw = req.body?.description;
  const priceLabelRaw = req.body?.priceLabel;
  const activeRaw = req.body?.active;

  const description =
    descriptionRaw === null || descriptionRaw === undefined ? null : String(descriptionRaw).trim() || null;
  const priceLabel =
    priceLabelRaw === null || priceLabelRaw === undefined ? null : String(priceLabelRaw).trim() || null;
  const active = activeRaw === undefined ? true : Boolean(activeRaw);

  if (!name || !experienceType) {
    return res.status(400).json({ error: "name and experienceType are required." });
  }

  const doc = await PackageM.create({ name, experienceType, description, priceLabel, active });
  return res.status(201).json({
    package: {
      id: String(doc._id),
      name: doc.name,
      experienceType: doc.experienceType,
      description: doc.description ?? null,
      priceLabel: doc.priceLabel ?? null,
      active: Boolean(doc.active),
    },
  });
});

packagesRouter.patch("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const id = String(req.params.id ?? "");
  const existing = await PackageM.findById(id).lean();
  if (!existing) return res.status(404).json({ error: "Not found." });

  const patch: Record<string, unknown> = {};

  if (req.body?.name !== undefined) patch.name = String(req.body.name ?? "").trim();
  if (req.body?.experienceType !== undefined) patch.experienceType = String(req.body.experienceType ?? "").trim();
  if (req.body?.description !== undefined)
    patch.description = req.body.description == null ? null : String(req.body.description).trim() || null;
  if (req.body?.priceLabel !== undefined)
    patch.priceLabel = req.body.priceLabel == null ? null : String(req.body.priceLabel).trim() || null;
  if (req.body?.active !== undefined) patch.active = Boolean(req.body.active);

  if (patch.name !== undefined && !String(patch.name)) {
    return res.status(400).json({ error: "name cannot be empty." });
  }
  if (patch.experienceType !== undefined && !String(patch.experienceType)) {
    return res.status(400).json({ error: "experienceType cannot be empty." });
  }

  await PackageM.updateOne({ _id: id }, { $set: patch });
  const updated = await PackageM.findById(id).lean();
  return res.json({
    package: updated
      ? {
          id: String((updated as any)._id),
          name: String((updated as any).name),
          experienceType: String((updated as any).experienceType),
          description: (updated as any).description == null ? null : String((updated as any).description),
          priceLabel: (updated as any).priceLabel == null ? null : String((updated as any).priceLabel),
          active: Boolean((updated as any).active),
        }
      : null,
  });
});

packagesRouter.delete("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const id = String(req.params.id ?? "");
  await PackageM.deleteOne({ _id: id });
  return res.json({ ok: true });
});

