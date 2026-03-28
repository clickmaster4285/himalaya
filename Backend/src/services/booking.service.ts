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
};

function mapBooking(
  b: {
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
  },
  user: UserBrief,
): BookingApi {
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
    const b = raw as Parameters<typeof mapBooking>[0];
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

export async function createBookingForUser(params: {
  userId: string;
  experienceType: string;
  packageName: string;
  bookingDate: Date;
  totalAmount: number;
  notes: string | null;
}) {
  const doc = await BookingM.create({
    reference: generateBookingReference(),
    experienceType: params.experienceType,
    packageName: params.packageName,
    bookingDate: params.bookingDate,
    totalAmount: params.totalAmount,
    notes: params.notes,
    status: "PENDING",
    userId: params.userId,
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
