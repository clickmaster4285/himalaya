import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server-session";
import { dashboardPathForRole } from "@/lib/dashboard-nav";

export default async function DashboardIndexPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?from=/dashboard");
  }
  redirect(dashboardPathForRole(user.role));
}
