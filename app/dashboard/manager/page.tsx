"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { useDashboardBookings } from "@/components/dashboard/use-dashboard-bookings";
import type { SafeUser } from "@/lib/user-public";

const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
type BookingStatus = (typeof BOOKING_STATUSES)[number];

export default function ManagerDashboardPage() {
  const { bookings, stats, loading, error, reload } = useDashboardBookings();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [me, setMe] = useState<SafeUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setMe(d.user ?? null))
      .catch(() => setMe(null));
  }, []);

  async function updateStatus(id: string, status: BookingStatus) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (res.ok) await reload();
    } finally {
      setBusyId(null);
    }
  }

  const name = me?.fullName?.split(/\s+/)[0] ?? "Manager";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a]">Booking manager</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2rem]">
          Hello, {name}
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-[15px] leading-relaxed text-[#5c564c]">
          Below is <strong className="font-semibold text-[#3d3830]">live data</strong> from every guest.{" "}
          <strong className="font-semibold text-[#7a6129]">Confirm</strong> so guests see{" "}
          <strong className="font-semibold text-emerald-800">Confirmed</strong> on their dashboard.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 font-sans text-[15px] text-[#6b655c]">
          <Loader2 className="h-5 w-5 animate-spin text-[#9a7b3a]" aria-hidden />
          Loading estate bookings…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <DashboardStatCard label="Total requests" value={stats.total} />
            <DashboardStatCard label="Needs your OK" value={stats.pending} tone="amber" />
            <DashboardStatCard label="Confirmed" value={stats.confirmed} tone="emerald" />
            <DashboardStatCard label="Pipeline (PKR)" value={stats.volume.toLocaleString()} />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <DashboardStatCard label="Unique guests" value={stats.uniqueGuests} hint="Distinct accounts with a booking" />
            <DashboardStatCard label="Completed" value={stats.completed} tone="slate" />
            <DashboardStatCard label="Declined / cancelled" value={stats.cancelled} tone="rose" />
          </div>
        </>
      )}

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm font-medium text-red-800">{error}</p>
      )}

      {!loading && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-[#1a1816]">Every request</h2>
          {bookings.map((b) => {
            const busy = busyId === b.id;
            return (
              <article
                key={b.id}
                className="rounded-2xl border border-[#ebe4dc] bg-white p-5 shadow-sm shadow-black/[0.04] md:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-mono text-[11px] font-medium text-[#8a8278]">{b.reference}</p>
                    <h3 className="font-display text-xl font-semibold text-[#1a1816]">{b.experienceType}</h3>
                    <p className="font-sans text-[14px] text-[#5c564c]">{b.packageName}</p>
                    <p className="font-sans text-[13px] text-[#6b655c]">
                      <span className="font-semibold text-[#3d3830]">{b.user.fullName}</span> · {b.user.email}
                    </p>
                    <p className="font-sans text-[13px] text-[#6b655c]">
                      Date:{" "}
                      <time dateTime={b.bookingDate}>
                        {new Date(b.bookingDate).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </p>
                  </div>
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                    <p className="font-sans text-lg font-semibold tabular-nums text-[#1a1816]">PKR {b.totalAmount.toLocaleString()}</p>
                    <span
                      className={cn(
                        "inline-flex w-fit rounded-full px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider",
                        b.status === "PENDING" && "bg-amber-100 text-amber-900",
                        b.status === "CONFIRMED" && "bg-emerald-100 text-emerald-900",
                        b.status === "CANCELLED" && "bg-red-100 text-red-900",
                        b.status === "COMPLETED" && "bg-slate-100 text-slate-800",
                      )}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#f0ebe4] pt-5">
                  {b.status === "PENDING" && (
                    <Button
                      type="button"
                      disabled={busy}
                      onClick={() => updateStatus(b.id, "CONFIRMED")}
                      className="rounded-xl bg-[#9a7b3a] font-sans text-[14px] font-semibold text-white hover:bg-[#856a32]"
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" strokeWidth={2.5} />}
                      Confirm booking
                    </Button>
                  )}
                  {b.status === "PENDING" && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={busy}
                      onClick={() => updateStatus(b.id, "CANCELLED")}
                      className="rounded-xl border-[#d4cdc2] font-sans text-[14px] font-medium"
                    >
                      <XCircle className="h-4 w-4 text-red-600" strokeWidth={2} />
                      Decline
                    </Button>
                  )}
                  <label className="ml-auto flex items-center gap-2 font-sans text-[13px] text-[#5c564c]">
                    <span className="hidden sm:inline">Set status:</span>
                    <select
                      value={b.status}
                      disabled={busy}
                      onChange={(e) => updateStatus(b.id, e.target.value as BookingStatus)}
                      className="rounded-lg border border-[#d4cdc2] bg-[#fafafa] px-3 py-2 text-[13px] font-medium text-[#1a1816]"
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            );
          })}
          {bookings.length === 0 && (
            <p className="rounded-2xl border border-dashed border-[#d4cdc2] bg-white/80 py-12 text-center font-sans text-[15px] text-[#6b655c]">
              No bookings yet. When guests submit requests, they will appear here.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
