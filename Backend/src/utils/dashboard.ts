import type { Role } from "./types";

export function dashboardPathForRole(role: Role): string {
  switch (role) {
    case "SUPERADMIN":
      return "/admin";
    case "BOOKING_MANAGER":
      return "/manager";
    default:
      return "/user";
  }
}
