import DashboardShell from "@/components/dashboard/DashboardShell";

const links = [{ href: "/dashboard/manager", label: "All bookings", icon: "inbox" as const }];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Booking manager" links={links}>
      {children}
    </DashboardShell>
  );
}
