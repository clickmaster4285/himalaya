import { Router } from "express";
import { getSessionFromRequest } from "../req-session";
import { canManageBookings } from "../user-dto";
import { findUserById } from "../services/user.service";
import {
  listBookingsForStaff,
  listBookingsForGuest,
  findBookingById,
  createBookingForUser,
  updateBookingById,
} from "../services/booking.service";
import { BOOKING_STATUSES, type BookingStatus } from "../types";

export const bookingsRouter = Router();

bookingsRouter.get("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const user = await findUserById(session.userId);
  if (!user?.isActive) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const bookings = canManageBookings(user.role)
    ? await listBookingsForStaff()
    : await listBookingsForGuest(user.id);

  return res.json({ bookings });
});

bookingsRouter.post("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const user = await findUserById(session.userId);
  if (!user?.isActive) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const experienceType = String(req.body?.experienceType ?? "").trim();
    const packageName = String(req.body?.packageName ?? "").trim();
    const bookingDateRaw = String(req.body?.bookingDate ?? "");
    const totalAmount = Number(req.body?.totalAmount ?? NaN);
    const notes = req.body?.notes != null ? String(req.body.notes) : null;

    if (!experienceType || !packageName || !bookingDateRaw || Number.isNaN(totalAmount)) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const bookingDate = new Date(bookingDateRaw);
    if (Number.isNaN(bookingDate.getTime())) {
      return res.status(400).json({ error: "Invalid bookingDate." });
    }

    const booking = await createBookingForUser({
      userId: user.id,
      experienceType,
      packageName,
      bookingDate,
      totalAmount,
      notes,
    });

    return res.status(201).json({ booking });
  } catch {
    return res.status(400).json({ error: "Invalid request body." });
  }
});

bookingsRouter.get("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const user = await findUserById(session.userId);
  if (!user?.isActive) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const booking = await findBookingById(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Not found." });
  }

  const allowed = canManageBookings(user.role) || booking.userId === user.id;
  if (!allowed) {
    return res.status(403).json({ error: "Forbidden." });
  }

  return res.json({ booking });
});

bookingsRouter.patch("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const user = await findUserById(session.userId);
  if (!user?.isActive || !canManageBookings(user.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const existing = await findBookingById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: "Not found." });
  }

  try {
    const status = req.body?.status as BookingStatus | undefined;
    const notes =
      req.body?.notes !== undefined ? (req.body.notes === null ? null : String(req.body.notes)) : undefined;

    if (status && !BOOKING_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const booking = await updateBookingById(req.params.id, {
      status: status ?? existing.status,
      notes: notes !== undefined ? notes : existing.notes,
    });

    return res.json({ booking });
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
});
