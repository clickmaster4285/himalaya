import type { Express } from "express";
import { authRouter } from "./auth";
import { bookingsRouter } from "./bookings";
import { packagesRouter } from "./packages";
import { expensesRouter } from "./expenses";
import { adminUsersRouter } from "./admin-users";
import { publicVillasRouter, adminVillasRouter } from "./villas";
import { inquiriesRouter } from "./inquiries";

/** Mount every API router on the Express app. */
export function registerRoutes(app: Express): void {
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "himalaya-backend" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/bookings", bookingsRouter);
  app.use("/api/packages", packagesRouter);
  app.use("/api/expenses", expensesRouter);
  app.use("/api/admin/users", adminUsersRouter);
  app.use("/api/villas", publicVillasRouter);
  app.use("/api/admin/villas", adminVillasRouter);
  app.use("/api/inquiries", inquiriesRouter);
}

export const API_ROUTES = {
  health: "GET /api/health",
  auth: "/api/auth",
  bookings: "/api/bookings",
  packages: "/api/packages",
  expenses: "/api/expenses",
  adminUsers: "/api/admin/users",
  villas: "/api/villas",
  adminVillas: "/api/admin/villas",
  inquiries: "/api/inquiries",
} as const;
