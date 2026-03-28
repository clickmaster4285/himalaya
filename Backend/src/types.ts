export type Role = "SUPERADMIN" | "BOOKING_MANAGER" | "USER";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export const BOOKING_STATUSES: BookingStatus[] = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export const ROLES: Role[] = ["SUPERADMIN", "BOOKING_MANAGER", "USER"];
