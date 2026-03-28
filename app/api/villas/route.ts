import { listVillasPublic } from "@/Backend/controllers/villa.controller";

export async function GET() {
  return listVillasPublic();
}
