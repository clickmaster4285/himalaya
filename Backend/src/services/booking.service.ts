import type { BookingStatus } from "../types";
import { BookingM, UserM } from "../models/schemas";

export function generateBookingReference() {
  return `HV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

type UserBrief = { id: string; fullName: string; email: string; role: string };

function briefFromLean(u: { _id: string; fullName: string; email: string; role: string }): UserBrief {
  return { id: u._id, fullName: u.fullName, email: u.email, role: u.role };
}

export type BookingApi = {
  id: string;
  reference: string;
  experienceType: string;
  packageName: string;
  bookingDate: string;
  totalAmount: number;
  status: BookingStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: UserBrief;
  villaSlug: string | null;
  checkOutDate: string | null;
  adults: number | null;
  children: number | null;
  guestPhone: string | null;
  guestFirstName: string | null;
  guestLastName: string | null;
  guestContactEmail: string | null;
  paymentMethod: string | null;
};

type LeanBooking = {
  _id: string;
  reference: string;
  experienceType: string;
  packageName: string;
  bookingDate: Date;
  totalAmount: number;
  status: BookingStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  villaSlug?: string | null;
  checkOutDate?: Date | null;
  adults?: number | null;
  children?: number | null;
  guestPhone?: string | null;
  guestFirstName?: string | null;
  guestLastName?: string | null;
  guestContactEmail?: string | null;
  paymentMethod?: string | null;
};

function mapBooking(b: LeanBooking, user: UserBrief): BookingApi {
  return {
    id: b._id,
    reference: b.reference,
    experienceType: b.experienceType,
    packageName: b.packageName,
    bookingDate: b.bookingDate.toISOString(),
    totalAmount: b.totalAmount,
    status: b.status,
    notes: b.notes,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    userId: b.userId,
    user,
    villaSlug: b.villaSlug ?? null,
    checkOutDate: b.checkOutDate ? b.checkOutDate.toISOString() : null,
    adults: b.adults ?? null,
    children: b.children ?? null,
    guestPhone: b.guestPhone ?? null,
    guestFirstName: b.guestFirstName ?? null,
    guestLastName: b.guestLastName ?? null,
    guestContactEmail: b.guestContactEmail ?? null,
    paymentMethod: b.paymentMethod ?? null,
  };
}

async function attachUsers(bookings: Array<Record<string, unknown>>): Promise<BookingApi[]> {
  const userIds = [...new Set(bookings.map((b) => String(b.userId)))];
  const users = await UserM.find({ _id: { $in: userIds } })
    .select("_id fullName email role")
    .lean();
  const map = Object.fromEntries(
    users.map((u) => [
      u._id,
      briefFromLean(u as unknown as { _id: string; fullName: string; email: string; role: string }),
    ]),
  );
  return bookings.map((raw) => {
    const b = raw as LeanBooking;
    const u = map[b.userId];
    if (!u) {
      return mapBooking(b, { id: b.userId, fullName: "?", email: "?", role: "USER" });
    }
    return mapBooking(b, u);
  });
}

export async function listBookingsForStaff() {
  const rows = await BookingM.find().sort({ createdAt: -1 }).lean();
  return attachUsers(rows as Array<Record<string, unknown>>);
}

export async function listBookingsForGuest(userId: string) {
  const rows = await BookingM.find({ userId }).sort({ createdAt: -1 }).lean();
  return attachUsers(rows as Array<Record<string, unknown>>);
}

export async function findBookingById(id: string) {
  const row = await BookingM.findById(id).lean();
  if (!row) return null;
  const [withUser] = await attachUsers([row as Record<string, unknown>]);
  return withUser;
}

/** Stay occupies [checkIn, checkOut) — checkOut is morning departure (exclusive). */
export function stayRangesOverlap(
  checkInA: Date,
  checkOutA: Date,
  checkInB: Date,
  checkOutB: Date,
): boolean {
  const a = checkInA.getTime();
  const ae = checkOutA.getTime();
  const b = checkInB.getTime();
  const be = checkOutB.getTime();
  return a < be && b < ae;
}

export async function listStayOccupiedRangesForVilla(villaSlug: string) {
  const slug = villaSlug.trim().toLowerCase();
  const rows = await BookingM.find({
    experienceType: "Book Your Stay",
    villaSlug: slug,
    status: { $in: ["PENDING", "CONFIRMED"] },
    checkOutDate: { $exists: true, $ne: null },
  })
    .select("bookingDate checkOutDate")
    .lean();

  return rows.map((raw) => {
    const r = raw as unknown as { bookingDate: Date; checkOutDate: Date };
    return {
      checkIn: r.bookingDate.toISOString(),
      checkOut: r.checkOutDate.toISOString(),
    };
  });
}

/** True if new stay overlaps any existing PENDING/CONFIRMED stay for this villa. */
export async function hasStayOverlapForVilla(
  villaSlug: string,
  checkIn: Date,
  checkOut: Date,
  excludeBookingId?: string,
): Promise<boolean> {
  const slug = villaSlug.trim().toLowerCase();
  const q: Record<string, unknown> = {
    experienceType: "Book Your Stay",
    villaSlug: slug,
    status: { $in: ["PENDING", "CONFIRMED"] },
    checkOutDate: { $exists: true, $ne: null },
  };
  if (excludeBookingId) {
    q._id = { $ne: excludeBookingId };
  }
  const rows = await BookingM.find(q).select("bookingDate checkOutDate").lean();

  for (const raw of rows) {
    const r = raw as unknown as { bookingDate: Date; checkOutDate: Date };
    const exIn = new Date(r.bookingDate);
    const exOut = new Date(r.checkOutDate);
    if (stayRangesOverlap(checkIn, checkOut, exIn, exOut)) return true;
  }
  return false;
}

export type CreateBookingParams = {
  userId: string;
  experienceType: string;
  packageName: string;
  bookingDate: Date;
  totalAmount: number;
  notes: string | null;
  villaSlug?: string | null;
  checkOutDate?: Date | null;
  adults?: number | null;
  children?: number | null;
  guestPhone?: string | null;
  guestFirstName?: string | null;
  guestLastName?: string | null;
  guestContactEmail?: string | null;
  paymentMethod?: string | null;
};

export async function createBookingForUser(params: CreateBookingParams) {
  const doc = await BookingM.create({
    reference: generateBookingReference(),
    experienceType: params.experienceType,
    packageName: params.packageName,
    bookingDate: params.bookingDate,
    totalAmount: params.totalAmount,
    notes: params.notes,
    status: "PENDING",
    userId: params.userId,
    villaSlug: params.villaSlug ?? null,
    checkOutDate: params.checkOutDate ?? null,
    adults: params.adults ?? null,
    children: params.children ?? null,
    guestPhone: params.guestPhone ?? null,
    guestFirstName: params.guestFirstName ?? null,
    guestLastName: params.guestLastName ?? null,
    guestContactEmail: params.guestContactEmail ?? null,
    paymentMethod: params.paymentMethod ?? null,
  });
  const full = await findBookingById(doc._id);
  if (!full) throw new Error("CREATE_FAILED");
  return full;
}

export async function updateBookingById(
  id: string,
  data: { status?: BookingStatus; notes?: string | null },
) {
  const existing = await BookingM.findById(id).lean();
  if (!existing) return null;
  const ex = existing as unknown as { status: BookingStatus; notes: string | null };
  const nextStatus = data.status ?? ex.status;
  const nextNotes = data.notes !== undefined ? data.notes : ex.notes;
  await BookingM.updateOne({ _id: id }, { $set: { status: nextStatus, notes: nextNotes } });
  return findBookingById(id);
}
