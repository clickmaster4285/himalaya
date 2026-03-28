import { createVilla, listVillasAdmin } from "@/Backend/controllers/villa.controller";

export async function GET() {
  return listVillasAdmin();
}

export async function POST(req: Request) {
  return createVilla(req);
}
