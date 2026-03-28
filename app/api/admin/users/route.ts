import { listUsersAdmin } from "@/Backend/controllers/user.controller";

export async function GET() {
  return listUsersAdmin();
}
