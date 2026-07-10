import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireDashboardRole } from "@/lib/dashboard-auth";

const links = [
  { href: "/superadmin", label: "Overview", icon: "layout" as const },
  { href: "/superadmin/villas", label: "Villas", icon: "building" as const },
  { href: "/superadmin/packages", label: "Packages", icon: "box" as const },
  { href: "/superadmin/expenses", label: "Expenses", icon: "money" as const },
  { href: "/superadmin/users", label: "Users & roles", icon: "users" as const },
];

export default async function SuperadminLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("SUPERADMIN");
  return (
    <DashboardShell title="Superadmin" links={links}>
      {children}
    </DashboardShell>
  );
}
