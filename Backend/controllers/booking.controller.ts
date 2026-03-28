import { BookingStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/server-session";
import { canManageBookings } from "@/lib/user-public";
import { UserModel } from "@/Backend/models/user.model";
import { BookingModel } from "@/Backend/models/booking.model";

export async function listBookings() {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await UserModel.findById(session.userId);
  if (!user?.isActive) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const bookings = canManageBookings(user.role)
    ? await BookingModel.listForStaff()
    : await BookingModel.listForGuest(user.id);

  return NextResponse.json({ bookings });
}

export async function createBooking(req: Request) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await UserModel.findById(session.userId);
  if (!user?.isActive) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const experienceType = String(body?.experienceType ?? "").trim();
    const packageName = String(body?.packageName ?? "").trim();
    const bookingDateRaw = String(body?.bookingDate ?? "");
    const totalAmount = Number(body?.totalAmount ?? NaN);
    const notes = body?.notes != null ? String(body.notes) : null;

    if (!experienceType || !packageName || !bookingDateRaw || Number.isNaN(totalAmount)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const bookingDate = new Date(bookingDateRaw);
    if (Number.isNaN(bookingDate.getTime())) {
      return NextResponse.json({ error: "Invalid bookingDate." }, { status: 400 });
    }

    const booking = await BookingModel.createForUser({
      userId: user.id,
      experienceType,
      packageName,
      bookingDate,
      totalAmount,
      notes,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}

export async function getBookingById(_req: Request, id: string) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await UserModel.findById(session.userId);
  if (!user?.isActive) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const booking = await BookingModel.findById(id);
  if (!booking) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const allowed = canManageBookings(user.role) || booking.userId === user.id;
  if (!allowed) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  return NextResponse.json({ booking });
}

export async function patchBooking(req: Request, id: string) {
  const session = await getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await UserModel.findById(session.userId);
  if (!user?.isActive || !canManageBookings(user.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const existing = await BookingModel.findById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const body = await req.json();
    const status = body?.status as BookingStatus | undefined;
    const notes = body?.notes !== undefined ? (body.notes === null ? null : String(body.notes)) : undefined;

    if (status && !Object.values(BookingStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const booking = await BookingModel.updateById(id, {
      status: status ?? existing.status,
      notes: notes !== undefined ? notes : existing.notes,
    });

    return NextResponse.json({ booking });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
