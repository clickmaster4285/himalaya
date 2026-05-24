import type { Role } from "./types";

export type UserDoc = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
};

export type SafeUser = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
};

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

export function canManageBookings(role: Role): boolean {
  return role === "SUPERADMIN" || role === "BOOKING_MANAGER";
}

export function isSuperAdmin(role: Role): boolean {
  return role === "SUPERADMIN";
}
