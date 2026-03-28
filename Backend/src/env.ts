export function getMongoUri(): string {
  const u = process.env.DATABASE_URL ?? process.env.MONGODB_URI;
  if (!u?.trim()) {
    throw new Error("Set DATABASE_URL or MONGODB_URI in backend/.env");
  }
  return u.trim();
}

export function getSuperadminEmail() {
  return (process.env.SUPERADMIN_EMAIL ?? "superadmin@gmail.com").trim().toLowerCase();
}

export function getSuperadminPassword() {
  return process.env.SUPERADMIN_PASSWORD ?? "123";
}

export function getSuperadminName() {
  return process.env.SUPERADMIN_NAME ?? "Super Admin";
}

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

export function isReservedStaffEmail(email: string) {
  const e = email.trim().toLowerCase();
  return e === getSuperadminEmail() || e === getBookingManagerEmail();
}
