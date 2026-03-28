export type SessionRole = "SUPERADMIN" | "BOOKING_MANAGER" | "USER";

export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
  role: SessionRole;
  isActive: boolean;
  createdAt: string;
};

export function toSafeUser(user: SafeUser): SafeUser {
  return user;
}

export function canManageBookings(role: SessionRole) {
  return role === "SUPERADMIN" || role === "BOOKING_MANAGER";
}

export function isSuperAdmin(role: SessionRole) {
  return role === "SUPERADMIN";
}
