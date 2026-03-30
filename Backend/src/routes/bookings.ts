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
  listStayOccupiedRangesForVilla,
  hasStayOverlapForVilla,
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

/** Public: blocked date ranges for a villa (stay bookings). Query: ?villaSlug= */
bookingsRouter.get("/villa-availability", async (req, res) => {
  const villaSlug = String(req.query.villaSlug ?? "").trim().toLowerCase();
  if (!villaSlug) {
    return res.status(400).json({ error: "villaSlug is required." });
  }
  try {
    const ranges = await listStayOccupiedRangesForVilla(villaSlug);
    return res.json({ ranges });
  } catch {
    return res.status(500).json({ error: "Could not load availability." });
  }
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
    const notesRaw = req.body?.notes;
    const notes =
      notesRaw === null || notesRaw === undefined ? null : String(notesRaw).trim() || null;

    if (!experienceType || !packageName || !bookingDateRaw || Number.isNaN(totalAmount) || totalAmount < 0) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const bookingDate = new Date(bookingDateRaw);
    if (Number.isNaN(bookingDate.getTime())) {
      return res.status(400).json({ error: "Invalid bookingDate." });
    }

    const isStay = experienceType === "Book Your Stay";
    let checkOutDate: Date | null = null;
    let villaSlug: string | null = null;
    let adults: number | null = null;
    let children: number | null = null;
    let guestPhone: string | null = null;
    let guestFirstName: string | null = null;
    let guestLastName: string | null = null;
    let guestContactEmail: string | null = null;
    let paymentMethod: string | null = null;

    if (isStay) {
      const checkOutRaw = String(req.body?.checkOutDate ?? "");
      const villa = String(req.body?.villaSlug ?? "").trim().toLowerCase();
      const adultsN = Number(req.body?.adults ?? NaN);
      const childrenN = Number(req.body?.children ?? 0);

      if (!checkOutRaw || !villa || Number.isNaN(adultsN) || adultsN < 1) {
        return res.status(400).json({
          error: "Stay booking requires check-out date, villa, and at least one adult.",
        });
      }

      checkOutDate = new Date(checkOutRaw);
      if (Number.isNaN(checkOutDate.getTime())) {
        return res.status(400).json({ error: "Invalid checkOutDate." });
      }

      if (checkOutDate.getTime() <= bookingDate.getTime()) {
        return res.status(400).json({ error: "Check-out must be after check-in." });
      }

      villaSlug = villa;
      adults = adultsN;
      children = Number.isFinite(childrenN) && childrenN >= 0 ? childrenN : 0;
      guestPhone = req.body?.guestPhone != null ? String(req.body.guestPhone).trim() || null : null;
      guestFirstName =
        req.body?.guestFirstName != null ? String(req.body.guestFirstName).trim() || null : null;
      guestLastName =
        req.body?.guestLastName != null ? String(req.body.guestLastName).trim() || null : null;
      guestContactEmail =
        req.body?.guestContactEmail != null ? String(req.body.guestContactEmail).trim().toLowerCase() || null : null;
      paymentMethod =
        req.body?.paymentMethod != null ? String(req.body.paymentMethod).trim() || null : null;

      if (!guestPhone) {
        return res.status(400).json({ error: "Phone number is required for stay bookings." });
      }

      const overlap = await hasStayOverlapForVilla(villa, bookingDate, checkOutDate);
      if (overlap) {
        return res.status(409).json({
          error: "Those dates are no longer available for this villa. Please choose different dates.",
        });
      }
    }

    const booking = await createBookingForUser({
      userId: user.id,
      experienceType,
      packageName,
      bookingDate,
      totalAmount,
      notes,
      villaSlug,
      checkOutDate,
      adults,
      children,
      guestPhone,
      guestFirstName,
      guestLastName,
      guestContactEmail,
      paymentMethod,
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
