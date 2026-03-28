import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireDashboardRole } from "@/lib/dashboard-auth";

const links = [
  { href: "/dashboard/user", label: "My bookings", icon: "calendar" as const },
  { href: "/dashboard/user/new", label: "New request", icon: "plus" as const },
];

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("USER");
  return (
    <DashboardShell title="Guest" links={links}>
      {children}
    </DashboardShell>
  );
}
