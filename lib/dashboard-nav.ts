export function dashboardPathForRole(role: string): string {
  switch (role) {
    case "SUPERADMIN":
      return "/dashboard/superadmin";
    case "BOOKING_MANAGER":
      return "/dashboard/manager";
    default:
      return "/dashboard/user";
  }
}
