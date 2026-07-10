import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireDashboardRole } from "@/lib/dashboard-auth";

const links = [
  { href: "/admin", label: "Overview", icon: "layout" as const },
  { href: "/admin/villas", label: "Villas", icon: "building" as const },
  { href: "/admin/packages", label: "Packages", icon: "box" as const },
  { href: "/admin/expenses", label: "Expenses", icon: "money" as const },
  { href: "/admin/users", label: "Users & roles", icon: "users" as const },
];

export default async function SuperadminLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("SUPERADMIN");
  return (
    <DashboardShell title="Admin" links={links}>
      {children}
    </DashboardShell>
  );
}
