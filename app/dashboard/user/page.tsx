"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { useDashboardBookings } from "@/components/dashboard/use-dashboard-bookings";
import type { SafeUser } from "@/lib/user-public";

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider",
        s === "PENDING" && "bg-amber-100 text-amber-950 ring-1 ring-amber-200/80",
        s === "CONFIRMED" && "bg-emerald-100 text-emerald-950 ring-1 ring-emerald-200/80",
        s === "CANCELLED" && "bg-red-100 text-red-950 ring-1 ring-red-200/80",
        s === "COMPLETED" && "bg-slate-100 text-slate-800 ring-1 ring-slate-200/80",
      )}
    >
      {s}
    </span>
  );
}

export default function UserDashboardPage() {
  const { bookings, stats, loading, error, reload } = useDashboardBookings();
  const [me, setMe] = useState<SafeUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setMe(d.user ?? null))
      .catch(() => setMe(null));
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") reload();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [reload]);

  const firstName = me?.fullName?.split(/\s+/)[0] ?? "Guest";
  const hasConfirmed = bookings.some((b) => b.status === "CONFIRMED");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a]">Your estate dashboard</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2.25rem]">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-xl font-sans text-[15px] leading-relaxed text-[#5c564c]">
            Live numbers from your account. New requests stay <strong className="text-[#7a6129]">Pending</strong> until the
            booking manager confirms.
          </p>
        </div>
        <Link
          href="/dashboard/user/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9a7b3a] px-5 py-3 font-sans text-[14px] font-bold text-white shadow-md shadow-[#6b5428]/25 transition-colors hover:bg-[#856a32]"
        >
          <PlusCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
          New request
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 font-sans text-[15px] text-[#6b655c]">
          <Loader2 className="h-5 w-5 animate-spin text-[#9a7b3a]" aria-hidden />
          Loading your data…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <DashboardStatCard label="Total requests" value={stats.total} />
            <DashboardStatCard label="Pending" value={stats.pending} tone="amber" />
            <DashboardStatCard label="Confirmed" value={stats.confirmed} tone="emerald" />
            <DashboardStatCard label="Your volume (PKR)" value={stats.volume.toLocaleString()} />
          </div>

          {hasConfirmed && (
            <div className="flex gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/90 p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" strokeWidth={1.75} aria-hidden />
              <div>
                <p className="font-sans text-[15px] font-semibold text-emerald-950">You have confirmed bookings</p>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-emerald-900/85">
                  Our team approved at least one request. Details are on each card below.
                </p>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm font-medium text-red-800">
              {error}
            </p>
          )}

          <div>
            <h2 className="font-display text-xl font-semibold text-[#1a1816]">All your bookings</h2>
            <p className="mt-1 font-sans text-sm text-[#6b655c]">Newest first — same data your manager sees for your rows only.</p>
            <div className="mt-4 space-y-4">
              {bookings.map((b) => (
                <article
                  key={b.id}
                  className="rounded-2xl border border-[#ebe4dc] bg-white p-5 shadow-sm shadow-black/[0.04] md:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] font-medium text-[#8a8278]">{b.reference}</p>
                      <h3 className="font-display mt-1 text-xl font-semibold text-[#1a1816]">{b.experienceType}</h3>
                      <p className="font-sans text-[14px] text-[#5c564c]">{b.packageName}</p>
                      <p className="mt-2 flex items-center gap-2 font-sans text-[13px] text-[#6b655c]">
                        <Clock className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                        <time dateTime={b.bookingDate}>
                          {new Date(b.bookingDate).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </p>
                      {b.status === "PENDING" && (
                        <p className="mt-3 rounded-lg bg-amber-50/90 px-3 py-2 font-sans text-[12px] leading-relaxed text-amber-950 ring-1 ring-amber-100">
                          Waiting for the booking manager to confirm.
                        </p>
                      )}
                      {b.status === "CONFIRMED" && (
                        <p className="mt-3 rounded-lg bg-emerald-50/90 px-3 py-2 font-sans text-[12px] leading-relaxed text-emerald-950 ring-1 ring-emerald-100">
                          <strong>Booking confirmed.</strong> Concierge will follow up.
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                      <StatusBadge status={b.status} />
                      <p className="font-sans text-lg font-semibold tabular-nums text-[#1a1816]">
                        PKR {b.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
              {bookings.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#d4cdc2] bg-white/80 px-6 py-12 text-center">
                  <p className="font-sans text-[15px] text-[#5c564c]">No bookings yet — start your first request.</p>
                  <Link
                    href="/dashboard/user/new"
                    className="mt-4 inline-flex rounded-xl bg-[#9a7b3a] px-5 py-2.5 font-sans text-[14px] font-semibold text-white hover:bg-[#856a32]"
                  >
                    New booking request
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
