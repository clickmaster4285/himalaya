export function dashboardPathForRole(role: string): string {
  switch (role) {
    case "SUPERADMIN":
      return "/superadmin";
    case "BOOKING_MANAGER":
      return "/manager";
    default:
      return "/user";
  }
}
