import { deleteVilla, getVillaAdminById, updateVilla } from "@/Backend/controllers/villa.controller";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  return getVillaAdminById(id);
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  return updateVilla(req, id);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  return deleteVilla(id);
}
