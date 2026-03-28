import { logout } from "@/Backend/controllers/auth.controller";

export async function POST() {
  return logout();
}
