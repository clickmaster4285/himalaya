import DashboardShell from "@/components/dashboard/DashboardShell";

const links = [
  { href: "/dashboard/superadmin", label: "Overview", icon: "layout" as const },
  { href: "/dashboard/superadmin/villas", label: "Villas", icon: "building" as const },
  { href: "/dashboard/superadmin/users", label: "Users & roles", icon: "users" as const },
];

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Superadmin" links={links}>
      {children}
    </DashboardShell>
  );
}
