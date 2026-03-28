import type { Role } from "./types";

export function dashboardPathForRole(role: Role): string {
  switch (role) {
    case "SUPERADMIN":
      return "/dashboard/superadmin";
    case "BOOKING_MANAGER":
      return "/dashboard/manager";
    default:
      return "/dashboard/user";
  }
}
