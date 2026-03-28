import { login } from "@/Backend/controllers/auth.controller";

export async function POST(req: Request) {
  return login(req);
}
