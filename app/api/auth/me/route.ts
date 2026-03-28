import { me } from "@/Backend/controllers/auth.controller";

export async function GET() {
  return me();
}
