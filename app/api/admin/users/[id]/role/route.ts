import { patchUserRole } from "@/Backend/controllers/user.controller";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  return patchUserRole(req, id);
}
