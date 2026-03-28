import { BookingStatus, type Booking, type Prisma } from "@prisma/client";
import { db } from "@/lib/db";

const includeUserBrief = {
  user: { select: { id: true, fullName: true, email: true, role: true } },
} satisfies Prisma.BookingInclude;

export function generateBookingReference() {
  return `HV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export const BookingModel = {
  findById(id: string) {
    return db.booking.findUnique({
      where: { id },
      include: includeUserBrief,
    });
  },

  listForStaff() {
    return db.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: includeUserBrief,
    });
  },

  listForGuest(userId: string) {
    return db.booking.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: includeUserBrief,
    });
  },

  createForUser(params: {
    userId: string;
    experienceType: string;
    packageName: string;
    bookingDate: Date;
    totalAmount: number;
    notes: string | null;
  }) {
    return db.booking.create({
      data: {
        reference: generateBookingReference(),
        experienceType: params.experienceType,
        packageName: params.packageName,
        bookingDate: params.bookingDate,
        totalAmount: params.totalAmount,
        notes: params.notes,
        status: BookingStatus.PENDING,
        userId: params.userId,
      },
      include: includeUserBrief,
    });
  },

  updateById(
    id: string,
    data: { status?: BookingStatus; notes?: string | null },
  ) {
    return db.booking.update({
      where: { id },
      data,
      include: includeUserBrief,
    });
  },
};

export type { Booking };
