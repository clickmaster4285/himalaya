import { getVillaPublicBySlug } from "@/Backend/controllers/villa.controller";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  return getVillaPublicBySlug(slug);
}
