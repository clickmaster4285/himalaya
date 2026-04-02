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
                  Our team approved at least one request. Details are in the table below.
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
            <section className="mt-4 rounded-3xl border border-[#e0d5c8] bg-gradient-to-b from-white to-[#faf7f2] p-1 shadow-[0_20px_50px_-28px_rgba(28,22,16,0.22)]">
              <div className="overflow-hidden rounded-[1.35rem] border border-[#efe8de] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[880px] text-left text-sm">
                    <thead className="bg-[#1c1916] font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9bfb0]">
                      <tr>
                        <th className="px-4 py-3.5 font-medium md:px-5">Ref</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Experience</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Villa / package</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Dates</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Amount</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans">
                      {bookings.map((b, i) => (
                        <tr
                          key={b.id}
                          className={cn(
                            "border-t border-[#f2ebe3] transition-colors hover:bg-[#fdfaf6]",
                            i % 2 === 1 && "bg-[#fdfcfa]/80",
                          )}
                        >
                          <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[11px] text-[#5c564c] md:px-5">
                            {b.reference}
                          </td>
                          <td className="px-4 py-3.5 text-[#3d3830] md:px-5">{b.experienceType}</td>
                          <td className="max-w-[300px] px-4 py-3.5 text-[#5c564c] md:px-5">
                            <div className="truncate" title={b.packageName}>
                              {b.packageName}
                            </div>
                            {b.villaSlug ? (
                              <div className="mt-1 text-[11px] text-[#8a8278]">Villa: {b.villaSlug}</div>
                            ) : null}
                          </td>
                          <td className="min-w-[170px] px-4 py-3.5 text-[#5c564c] md:px-5">
                            <span className="inline-flex items-center gap-2">
                              <Clock className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                              <span className="whitespace-nowrap">
                                {new Date(b.bookingDate).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </span>
                            {b.checkOutDate ? (
                              <span className="mt-1 block text-[11px] text-[#8a8278]">
                                →{" "}
                                {new Date(b.checkOutDate).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            ) : null}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5 font-medium tabular-nums text-[#1a1816] md:px-5">
                            PKR {b.totalAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3.5 md:px-5">
                            <div className="flex flex-col gap-2">
                              <StatusBadge status={b.status} />
                              {b.status === "PENDING" ? (
                                <p className="text-[11px] leading-relaxed text-[#8a8278]">
                                  Waiting for manager confirmation.
                                </p>
                              ) : b.status === "CONFIRMED" ? (
                                <p className="text-[11px] leading-relaxed text-[#8a8278]">
                                  Booking confirmed. Concierge will follow up.
                                </p>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {bookings.length === 0 && (
                    <div className="px-6 py-12 text-center">
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
            </section>
          </div>
        </>
      )}
    </div>
  );
}
