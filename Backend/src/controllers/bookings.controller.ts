import type { Request, Response } from "express";
import { getSessionFromRequest } from "../middleware/req-session";
import { canManageBookings } from "../utils/user-dto";
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
import { BOOKING_STATUSES, type BookingStatus } from "../utils/types";
import { sendBookingEmail } from "../services/booking-email.service";
import type { BookingEmailTemplate } from "../templates/emails/booking-emails";
import { BOOKABLE_STAYS } from "../data/bookable-stays";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ARRIVAL_TIMES = ["12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM", "After 6:00 PM"];

function readGuestText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

function todayInPakistan(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function parseCount(value: unknown, min: number, max: number): number | null {
  const count = Number(value);
  return Number.isInteger(count) && count >= min && count <= max ? count : null;
}

export async function listBookings(req: Request, res: Response) {
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
}

export async function villaAvailability(req: Request, res: Response) {
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
}

export async function createBooking(req: Request, res: Response) {
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

    const extrasRaw = req.body?.extras;
    const extrasNoteRaw = req.body?.extrasNote;
    const extrasNote =
      extrasNoteRaw === null || extrasNoteRaw === undefined ? null : String(extrasNoteRaw).trim() || null;
    const extras = Array.isArray(extrasRaw)
      ? extrasRaw
          .map((x) => ({
            title: String(x?.title ?? "").trim(),
            quantity: Number(x?.quantity ?? 1),
            amount: Number(x?.amount ?? 0),
            notes: x?.notes == null ? null : String(x.notes).trim() || null,
          }))
          .filter((x) => x.title)
          .map((x) => ({
            title: x.title,
            quantity: Number.isFinite(x.quantity) && x.quantity > 0 ? x.quantity : 1,
            amount: Number.isFinite(x.amount) && x.amount >= 0 ? x.amount : 0,
            notes: x.notes,
          }))
      : [];

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
      extras,
      extrasNote,
    });

    return res.status(201).json({ booking });
  } catch {
    return res.status(400).json({ error: "Invalid request body." });
  }
}

export async function createGuestStayBooking(req: Request, res: Response) {
  const villaSlug = readGuestText(req.body?.villaSlug, 100).toLowerCase();
  const stay = BOOKABLE_STAYS[villaSlug];
  if (!stay) return res.status(400).json({ error: "Please select a valid villa." });

  const checkInRaw = readGuestText(req.body?.checkInDate, 10);
  const checkOutRaw = readGuestText(req.body?.checkOutDate, 10);
  const checkIn = parseDateOnly(checkInRaw);
  const checkOut = parseDateOnly(checkOutRaw);
  if (!checkIn || !checkOut) {
    return res.status(400).json({ error: "Valid arrival and departure dates are required." });
  }
  if (checkInRaw < todayInPakistan()) {
    return res.status(400).json({ error: "Arrival date cannot be in the past." });
  }
  if (checkOut.getTime() <= checkIn.getTime()) {
    return res.status(400).json({ error: "Departure date must be after arrival." });
  }

  const adults = parseCount(req.body?.adults, 1, 10);
  const children = parseCount(req.body?.children, 0, 9);
  const roomsBooked = parseCount(req.body?.rooms, 1, 10);
  if (adults === null || children === null || roomsBooked === null) {
    return res.status(400).json({ error: "Guest and room counts are invalid." });
  }

  const guestFirstName = readGuestText(req.body?.guestFirstName, 100);
  const guestLastName = readGuestText(req.body?.guestLastName, 100);
  const guestContactEmail = readGuestText(req.body?.guestContactEmail, 320).toLowerCase();
  const guestPhone = readGuestText(req.body?.guestPhone, 40);
  if (!guestFirstName || !guestLastName || !EMAIL_RE.test(guestContactEmail)) {
    return res.status(400).json({ error: "First name, last name, and a valid email address are required." });
  }
  if (guestPhone.replace(/\D/g, "").length < 7) {
    return res.status(400).json({ error: "A valid phone number is required." });
  }
  if (req.body?.termsAccepted !== true) {
    return res.status(400).json({ error: "Please accept the Terms & Conditions and Privacy Policy." });
  }

  const paymentMethod = readGuestText(req.body?.paymentMethod, 40);
  if (paymentMethod !== "Pay at Hotel") {
    return res.status(400).json({ error: "Please select a valid payment method." });
  }

  const expectedArrivalTime = readGuestText(req.body?.expectedArrivalTime, 40);
  if (expectedArrivalTime && !ARRIVAL_TIMES.includes(expectedArrivalTime)) {
    return res.status(400).json({ error: "Expected arrival time is invalid." });
  }

  const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000);
  const totalAmount = stay.nightlyRate * nights * roomsBooked;
  if (!Number.isSafeInteger(totalAmount)) {
    return res.status(400).json({ error: "The booking total is invalid." });
  }

  try {
    if (await hasStayOverlapForVilla(villaSlug, checkIn, checkOut)) {
      return res.status(409).json({
        error: "Those dates are no longer available for this villa. Please choose different dates.",
      });
    }

    const booking = await createBookingForUser({
      experienceType: "Book Your Stay",
      packageName: stay.name,
      bookingDate: checkIn,
      checkOutDate: checkOut,
      totalAmount,
      notes: null,
      villaSlug,
      adults,
      children,
      roomsBooked,
      guestFirstName,
      guestLastName,
      guestContactEmail,
      guestPhone,
      guestDocumentNumber: readGuestText(req.body?.guestDocumentNumber, 100) || null,
      expectedArrivalTime: expectedArrivalTime || null,
      guestAddress: readGuestText(req.body?.guestAddress, 250) || null,
      guestAddress2: readGuestText(req.body?.guestAddress2, 250) || null,
      guestCity: readGuestText(req.body?.guestCity, 100) || null,
      guestRegion: readGuestText(req.body?.guestRegion, 100) || null,
      guestPostalCode: readGuestText(req.body?.guestPostalCode, 30) || null,
      guestCountry: readGuestText(req.body?.guestCountry, 100) || null,
      specialRequests: readGuestText(req.body?.specialRequests, 5000) || null,
      paymentMethod,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
    });

    return res.status(201).json({
      booking: {
        reference: booking.reference,
        status: booking.status,
        totalAmount: booking.totalAmount,
      },
    });
  } catch (error) {
    console.error("[bookings] create guest stay", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("ECONNREFUSED") || message.includes("MongoServerSelectionError")) {
      return res.status(503).json({ error: "Booking service is unavailable. Please try again shortly." });
    }
    return res.status(500).json({ error: "Could not save your booking. Please try again." });
  }
}

export async function getBooking(req: Request, res: Response) {
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
}

export async function patchBooking(req: Request, res: Response) {
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
    const extrasNote =
      req.body?.extrasNote !== undefined
        ? req.body.extrasNote === null
          ? null
          : String(req.body.extrasNote)
        : undefined;
    const extras =
      req.body?.extras !== undefined
        ? Array.isArray(req.body.extras)
          ? req.body.extras
              .map((x: { title?: unknown; quantity?: unknown; amount?: unknown; notes?: unknown }) => ({
                title: String(x?.title ?? "").trim(),
                quantity: Number(x?.quantity ?? 1),
                amount: Number(x?.amount ?? 0),
                notes: x?.notes == null ? null : String(x.notes).trim() || null,
              }))
              .filter((x: { title: string }) => x.title)
              .map((x: { title: string; quantity: number; amount: number; notes: string | null }) => ({
                title: x.title,
                quantity: Number.isFinite(x.quantity) && x.quantity > 0 ? x.quantity : 1,
                amount: Number.isFinite(x.amount) && x.amount >= 0 ? x.amount : 0,
                notes: x.notes,
              }))
          : []
        : undefined;

    if (status && !BOOKING_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const booking = await updateBookingById(req.params.id, {
      status: status ?? existing.status,
      notes: notes !== undefined ? notes : existing.notes,
      extrasNote: extrasNote !== undefined ? extrasNote : existing.extrasNote,
      extras: extras !== undefined ? extras : existing.extras,
    });

    return res.json({ booking });
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
}

const EMAIL_TEMPLATES = ["confirmation", "pending", "cancelled"] as const;

/** Staff: send booking email to guest (confirmation, pending, or cancelled). */
export async function sendBookingEmailRoute(req: Request, res: Response) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const user = await findUserById(session.userId);
  if (!user?.isActive || !canManageBookings(user.role)) {
    return res.status(403).json({ error: "Forbidden. Staff only." });
  }

  const booking = await findBookingById(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found." });
  }

  const template = String(req.body?.template ?? "confirmation").trim().toLowerCase() as BookingEmailTemplate;
  if (!EMAIL_TEMPLATES.includes(template)) {
    return res.status(400).json({
      error: "Invalid template.",
      allowed: EMAIL_TEMPLATES,
    });
  }

  const result = await sendBookingEmail(booking, template);
  if (!result.emailSent) {
    return res.status(result.detail?.includes("SMTP_NOT_CONFIGURED") ? 503 : 502).json({
      ok: false,
      ...result,
    });
  }

  return res.json({ ok: true, ...result });
}
