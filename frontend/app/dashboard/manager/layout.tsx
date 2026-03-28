import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireDashboardRole } from "@/lib/dashboard-auth";

const links = [{ href: "/dashboard/manager", label: "All bookings", icon: "inbox" as const }];

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("BOOKING_MANAGER");
  return (
    <DashboardShell title="Booking manager" links={links}>
      {children}
    </DashboardShell>
  );
}
