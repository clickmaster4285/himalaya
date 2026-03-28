import { requireDashboardSession } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardSession();
  return children;
}
