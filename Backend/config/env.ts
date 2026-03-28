/**
 * Central place for backend-related environment variables (seed + auth rules).
 */
export function getSuperadminEmail() {
  return (process.env.SUPERADMIN_EMAIL ?? "superadmin@gmail.com").trim().toLowerCase();
}

export function getSuperadminPassword() {
  return process.env.SUPERADMIN_PASSWORD ?? "123";
}

export function getSuperadminName() {
  return process.env.SUPERADMIN_NAME ?? "Super Admin";
}

export function isReservedSuperadminEmail(email: string) {
  return email.trim().toLowerCase() === getSuperadminEmail();
}

/** Default manager login: booking@gmail.com / 123 — override via .env */
export function getBookingManagerEmail() {
  return (process.env.BOOKING_MANAGER_EMAIL ?? "booking@gmail.com").trim().toLowerCase();
}

export function getBookingManagerPassword() {
  return process.env.BOOKING_MANAGER_PASSWORD ?? "123";
}

export function getBookingManagerName() {
  return process.env.BOOKING_MANAGER_NAME ?? "Booking Manager";
}

export function getBookingManagerSeed() {
  return {
    email: getBookingManagerEmail(),
    password: getBookingManagerPassword(),
    name: getBookingManagerName(),
  };
}

/** @deprecated use getBookingManagerSeed */
export function getOptionalManagerSeed() {
  return getBookingManagerSeed();
}

export function isReservedStaffEmail(email: string) {
  const e = email.trim().toLowerCase();
  return e === getSuperadminEmail() || e === getBookingManagerEmail();
}
