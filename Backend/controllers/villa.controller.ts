import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/server-session";
import { isSuperAdmin } from "@/lib/user-public";
import { UserModel } from "@/Backend/models/user.model";
import { VillaModel, type VillaWriteInput } from "@/Backend/models/villa.model";
import {
  getAllVillasAdmin,
  getPublishedVillas,
  getVillaByIdAdmin,
  getVillaBySlugPublic,
  villaRowToPublic,
} from "@/lib/villas-server";
import { VILLA_CATEGORIES, type VillaCategory } from "@/lib/villa-types";

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

async function requireSuperadmin() {
  const session = await getSessionFromCookies();
  if (!session) return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  const user = await UserModel.findById(session.userId);
  if (!user?.isActive || !isSuperAdmin(user.role)) {
    return { error: NextResponse.json({ error: "Forbidden." }, { status: 403 }) };
  }
  return { user };
}

export async function listVillasPublic() {
  const villas = await getPublishedVillas();
  return NextResponse.json({ villas });
}

export async function listVillasAdmin() {
  const gate = await requireSuperadmin();
  if ("error" in gate) return gate.error;
  const rows = await getAllVillasAdmin();
  return NextResponse.json({
    villas: rows.map((r) => ({
      id: r.id,
      published: r.published,
      ...villaRowToPublic(r),
    })),
  });
}

export async function getVillaAdminById(id: string) {
  const gate = await requireSuperadmin();
  if ("error" in gate) return gate.error;
  const row = await getVillaByIdAdmin(id);
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({
    villa: {
      ...villaRowToPublic(row),
      id: row.id,
      published: row.published,
    },
  });
}

export async function getVillaPublicBySlug(slug: string) {
  const villa = await getVillaBySlugPublic(slug);
  if (!villa) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ villa });
}

export async function createVilla(req: Request) {
  const gate = await requireSuperadmin();
  if ("error" in gate) return gate.error;
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const parsed = parseBody(body);
    if (!parsed) {
      return NextResponse.json({ error: "Invalid villa data or slug format." }, { status: 400 });
    }
    const existing = await VillaModel.findBySlug(parsed.slug);
    if (existing) {
      return NextResponse.json({ error: "A villa with this slug already exists." }, { status: 409 });
    }
    const created = await VillaModel.create(parsed);
    return NextResponse.json({
      villa: { ...villaRowToPublic(created), id: created.id, published: created.published },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function updateVilla(req: Request, id: string) {
  const gate = await requireSuperadmin();
  if ("error" in gate) return gate.error;
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const parsed = parseBody(body);
    if (!parsed) {
      return NextResponse.json({ error: "Invalid villa data or slug format." }, { status: 400 });
    }
    const current = await getVillaByIdAdmin(id);
    if (!current) return NextResponse.json({ error: "Not found." }, { status: 404 });
    if (parsed.slug !== current.slug) {
      const clash = await VillaModel.findBySlug(parsed.slug);
      if (clash && clash.id !== id) {
        return NextResponse.json({ error: "Another villa already uses this slug." }, { status: 409 });
      }
    }
    const updated = await VillaModel.update(id, parsed);
    return NextResponse.json({
      villa: { ...villaRowToPublic(updated), id: updated.id, published: updated.published },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function deleteVilla(id: string) {
  const gate = await requireSuperadmin();
  if ("error" in gate) return gate.error;
  try {
    await VillaModel.delete(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
