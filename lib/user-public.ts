import type { User } from "@prisma/client";

export type SafeUser = Pick<User, "id" | "fullName" | "email" | "role" | "isActive" | "createdAt">;

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

export function canManageBookings(role: User["role"]) {
  return role === "SUPERADMIN" || role === "BOOKING_MANAGER";
}

export function isSuperAdmin(role: User["role"]) {
  return role === "SUPERADMIN";
}
