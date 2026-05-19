export function getMongoUri(): string {
  const u = process.env.DATABASE_URL ?? process.env.MONGODB_URI ?? "mongodb://localhost:27017/himalaya";
  return u.trim();
}

export function getSuperadminEmail(): string {
  return (process.env.SUPERADMIN_EMAIL ?? "superadmin@gmail.com").trim().toLowerCase();
}

export function getSuperadminPassword(): string {
  return process.env.SUPERADMIN_PASSWORD ?? "123";
}

export function getSuperadminName(): string {
  return process.env.SUPERADMIN_NAME ?? "Super Admin";
}

export function getBookingManagerEmail(): string {
  return (process.env.BOOKING_MANAGER_EMAIL ?? "booking@gmail.com").trim().toLowerCase();
}

export function getBookingManagerPassword(): string {
  return process.env.BOOKING_MANAGER_PASSWORD ?? "123";
}

export function getBookingManagerName(): string {
  return process.env.BOOKING_MANAGER_NAME ?? "Booking Manager";
}

export function getBookingManagerSeed() {
  return {
    email: getBookingManagerEmail(),
    password: getBookingManagerPassword(),
    name: getBookingManagerName(),
  };
}

export function isReservedStaffEmail(email: string): boolean {
  const e = email.trim().toLowerCase();
  return e === getSuperadminEmail() || e === getBookingManagerEmail();
}
