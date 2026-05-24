export const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const ROLES = ["SUPERADMIN", "BOOKING_MANAGER", "USER"] as const;
export type Role = (typeof ROLES)[number];
