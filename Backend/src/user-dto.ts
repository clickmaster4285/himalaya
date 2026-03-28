import type { Role } from "./types";

export type UserDoc = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  passwordHash?: string;
};

export type SafeUser = Pick<UserDoc, "id" | "fullName" | "email" | "role" | "isActive" | "createdAt">;

export function toSafeUser(user: UserDoc): SafeUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

export function canManageBookings(role: Role) {
  return role === "SUPERADMIN" || role === "BOOKING_MANAGER";
}

export function isSuperAdmin(role: Role) {
  return role === "SUPERADMIN";
}
