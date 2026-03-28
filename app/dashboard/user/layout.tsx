import DashboardShell from "@/components/dashboard/DashboardShell";

const links = [
  { href: "/dashboard/user", label: "My bookings", icon: "calendar" as const },
  { href: "/dashboard/user/new", label: "New request", icon: "plus" as const },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Guest" links={links}>
      {children}
    </DashboardShell>
  );
}
