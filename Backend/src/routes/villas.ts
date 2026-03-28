import { Router } from "express";
import { getPublishedVillasMerged, getVillaBySlugPublic } from "../villas-catalog";
import { getSessionFromRequest } from "../req-session";
import { isSuperAdmin } from "../user-dto";
import { findUserById } from "../services/user.service";
import {
  findVillaBySlug,
  createVillaRow,
  updateVillaRow,
  deleteVillaRow,
  listAllVillaRowsAdmin,
  findVillaRowById,
  villaRowToPublic,
  type VillaWriteInput,
} from "../services/villa.service";
import { VILLA_CATEGORIES, type VillaCategory } from "../villa-types";

export const publicVillasRouter = Router();

publicVillasRouter.get("/", async (_req, res) => {
  const villas = await getPublishedVillasMerged();
  return res.json({ villas });
});

publicVillasRouter.get("/:slug", async (req, res) => {
  const villa = await getVillaBySlugPublic(req.params.slug);
  if (!villa) return res.status(404).json({ error: "Not found." });
  return res.json({ villa });
});

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof v === "string") {
    return v
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function parseBody(body: Record<string, unknown>): VillaWriteInput | null {
  const slug = String(body.slug ?? "").trim().toLowerCase();
  const title = String(body.title ?? "").trim();
  const category = String(body.category ?? "").trim() as VillaCategory;
  const description = String(body.description ?? "").trim();
  const price = String(body.price ?? "").trim();
  const image = String(body.image ?? "").trim();
  const size = String(body.size ?? "").trim();
  const content = String(body.content ?? "").trim();
  const bedrooms = Number(body.bedrooms);
  const guests = Number(body.guests);
  const published = body.published !== false;

  if (!slug || !SLUG_RE.test(slug)) return null;
  if (!title || !description || !price || !image || !size || !content) return null;
  if (!Number.isFinite(bedrooms) || bedrooms < 0 || !Number.isFinite(guests) || guests < 0) return null;
  if (!VILLA_CATEGORIES.includes(category)) return null;

  return {
    slug,
    title,
    category,
    description,
    price,
    image,
    gallery: parseStringArray(body.gallery),
    bedrooms: Math.floor(bedrooms),
    guests: Math.floor(guests),
    size,
    highlights: parseStringArray(body.highlights),
    amenities: parseStringArray(body.amenities),
    content,
    published,
  };
}

export const adminVillasRouter = Router();

adminVillasRouter.get("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });
  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }
  const rows = await listAllVillaRowsAdmin();
  return res.json({
    villas: rows.map((r) => ({
      id: r.id,
      published: r.published,
      ...villaRowToPublic(r),
    })),
  });
});

adminVillasRouter.post("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });
  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    const body = req.body as Record<string, unknown>;
    const parsed = parseBody(body);
    if (!parsed) {
      return res.status(400).json({ error: "Invalid villa data or slug format." });
    }
    const existing = await findVillaBySlug(parsed.slug);
    if (existing) {
      return res.status(409).json({ error: "A villa with this slug already exists." });
    }
    const created = await createVillaRow(parsed);
    return res.json({
      villa: { ...villaRowToPublic(created), id: created.id, published: created.published },
    });
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
});

adminVillasRouter.get("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });
  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }
  const row = await findVillaRowById(req.params.id);
  if (!row) return res.status(404).json({ error: "Not found." });
  return res.json({
    villa: {
      ...villaRowToPublic(row),
      id: row.id,
      published: row.published,
    },
  });
});

adminVillasRouter.patch("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });
  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    const body = req.body as Record<string, unknown>;
    const parsed = parseBody(body);
    if (!parsed) {
      return res.status(400).json({ error: "Invalid villa data or slug format." });
    }
    const current = await findVillaRowById(req.params.id);
    if (!current) return res.status(404).json({ error: "Not found." });
    if (parsed.slug !== current.slug) {
      const clash = await findVillaBySlug(parsed.slug);
      if (clash && clash.id !== req.params.id) {
        return res.status(409).json({ error: "Another villa already uses this slug." });
      }
    }
    const updated = await updateVillaRow(req.params.id, parsed);
    if (!updated) return res.status(404).json({ error: "Not found." });
    return res.json({
      villa: { ...villaRowToPublic(updated), id: updated.id, published: updated.published },
    });
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
});

adminVillasRouter.delete("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });
  const user = await findUserById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }
  const ok = await deleteVillaRow(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found." });
  return res.json({ ok: true });
});
