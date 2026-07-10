export function dashboardPathForRole(role: string): string {
  switch (role) {
    case "SUPERADMIN":
      return "/admin";
    case "BOOKING_MANAGER":
      return "/manager";
    default:
      return "/user";
  }
}
