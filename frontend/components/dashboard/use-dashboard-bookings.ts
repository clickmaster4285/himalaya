"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type DashboardBooking = {
  id: string;
  reference: string;
  experienceType: string;
  packageName: string;
  bookingDate: string;
  totalAmount: number;
  status: string;
  user: { fullName: string; email: string; id?: string };
};

export type BookingStats = {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  volume: number;
  uniqueGuests: number;
};

export function computeBookingStats(bookings: DashboardBooking[]): BookingStats {
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const volume = bookings.reduce((s, b) => s + (Number(b.totalAmount) || 0), 0);
  const guestIds = new Set(bookings.map((b) => b.user?.id).filter(Boolean));
  return {
    total: bookings.length,
    pending,
    confirmed,
    cancelled,
    completed,
    volume,
    uniqueGuests: guestIds.size,
  };
}

export function useDashboardBookings() {
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/bookings", { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Failed to load");
      setBookings([]);
    } else {
      setBookings(data.bookings ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const stats = useMemo(() => computeBookingStats(bookings), [bookings]);

  return { bookings, stats, loading, error, reload };
}
