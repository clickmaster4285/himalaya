import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireDashboardRole } from "@/lib/dashboard-auth";

const links = [
  { href: "/manager", label: "All bookings", icon: "inbox" as const },
  { href: "/manager/packages", label: "Packages", icon: "box" as const },
  { href: "/manager/expenses", label: "Expenses", icon: "money" as const },
];

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("BOOKING_MANAGER");
  return (
    <DashboardShell title="Booking manager" links={links}>
      {children}
    </DashboardShell>
  );
}
