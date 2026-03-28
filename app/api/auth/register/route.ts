import { register } from "@/Backend/controllers/auth.controller";

export async function POST(req: Request) {
  return register(req);
}
