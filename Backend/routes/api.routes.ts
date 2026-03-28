/**
 * Route map: Next.js App Router files → controllers (single source of truth for API surface).
 *
 * | Method | Path | Controller |
 * |--------|------|--------------|
 * | POST | /api/auth/login | auth.controller → login |
 * | POST | /api/auth/register | auth.controller → register |
 * | POST | /api/auth/logout | auth.controller → logout |
 * | GET | /api/auth/me | auth.controller → me |
 * | GET | /api/bookings | booking.controller → listBookings |
 * | POST | /api/bookings | booking.controller → createBooking |
 * | GET | /api/bookings/[id] | booking.controller → getBookingById |
 * | PATCH | /api/bookings/[id] | booking.controller → patchBooking |
 * | GET | /api/admin/users | user.controller → listUsersAdmin |
 * | PATCH | /api/admin/users/[id]/role | user.controller → patchUserRole |
 */

export const API_ROUTE_TABLE = [
  { method: "POST", path: "/api/auth/login", handler: "auth.login" },
  { method: "POST", path: "/api/auth/register", handler: "auth.register" },
  { method: "POST", path: "/api/auth/logout", handler: "auth.logout" },
  { method: "GET", path: "/api/auth/me", handler: "auth.me" },
  { method: "GET", path: "/api/bookings", handler: "booking.listBookings" },
  { method: "POST", path: "/api/bookings", handler: "booking.createBooking" },
  { method: "GET", path: "/api/bookings/:id", handler: "booking.getBookingById" },
  { method: "PATCH", path: "/api/bookings/:id", handler: "booking.patchBooking" },
  { method: "GET", path: "/api/admin/users", handler: "user.listUsersAdmin" },
  { method: "PATCH", path: "/api/admin/users/:id/role", handler: "user.patchUserRole" },
] as const;
