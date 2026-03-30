"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Ban,
  Banknote,
  Building2,
  CheckCircle2,
  CircleCheck,
  LayoutGrid,
  Loader2,
  Plus,
  Table2,
  Timer,
  Users,
} from "lucide-react";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { useDashboardBookings } from "@/components/dashboard/use-dashboard-bookings";
import type { SafeUser } from "@/lib/user-public";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
type BookingStatus = (typeof BOOKING_STATUSES)[number];

const STATUS_LABEL: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

export default function SuperadminDashboardPage() {
  const { bookings, stats, loading, error, reload } = useDashboardBookings();
  const [me, setMe] = useState<SafeUser | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [villaCount, setVillaCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setMe(d.user ?? null))
      .catch(() => setMe(null));
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [uRes, vRes] = await Promise.all([
        fetch("/api/admin/users", { credentials: "include" }),
        fetch("/api/admin/villas", { credentials: "include" }),
      ]);
      if (cancelled) return;
      const uData = await uRes.json().catch(() => ({}));
      const vData = await vRes.json().catch(() => ({}));
      if (uRes.ok && Array.isArray(uData.users)) setUserCount(uData.users.length);
      else setUserCount(null);
      if (vRes.ok && Array.isArray(vData.villas)) setVillaCount(vData.villas.length);
      else setVillaCount(null);
    })();
    return () => {
      cancelled = true;
    };
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

  const name = me?.fullName?.split(/\s+/)[0] ?? "Admin";

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-4">
      <header className="relative overflow-hidden rounded-3xl border border-[#2a241c] bg-gradient-to-br from-[#1c1916] via-[#231d18] to-[#181510] px-6 py-8 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.45)] md:px-9 md:py-10">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#c9a55b]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-[#c9a55b]/10 blur-3xl" />
        <div className="relative">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[#d4b87a]">Superadmin</p>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-[#fdf9f3] md:text-[2.2rem]">
            Estate control, {name}
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-[15px] leading-relaxed text-[#c4b8a8]">
            Full-facility metrics and every booking row — same API your managers use, with override access to status.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/superadmin/users"
          className="group flex flex-col rounded-2xl border border-[#e0d5c8] bg-white p-5 shadow-sm transition hover:border-[#c9a55b]/45 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1916] text-[#e8dfd0]">
              <Users className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7b3a]">Directory</p>
              <p className="font-display text-lg font-semibold text-[#1a1816]">All users</p>
            </div>
          </div>
          <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#6b655c]">
            {userCount === null ? "Open list & roles" : `${userCount} account${userCount === 1 ? "" : "s"} · change guest / manager / superadmin`}
          </p>
          <span className="mt-4 font-sans text-[12px] font-semibold text-[#9a7b3a] group-hover:underline">Manage users →</span>
        </Link>

        <a
          href="#master-bookings"
          className="group flex flex-col rounded-2xl border border-[#e0d5c8] bg-white p-5 shadow-sm transition hover:border-[#c9a55b]/45 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1916] text-[#e8dfd0]">
              <Table2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7b3a]">Pipeline</p>
              <p className="font-display text-lg font-semibold text-[#1a1816]">All bookings</p>
            </div>
          </div>
          <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#6b655c]">
            {loading ? "Loading…" : `${stats.total} total · update status for any guest`}
          </p>
          <span className="mt-4 font-sans text-[12px] font-semibold text-[#9a7b3a] group-hover:underline">Jump to register ↓</span>
        </a>

        <div className="flex flex-col rounded-2xl border border-[#e0d5c8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1c1916] text-[#e8dfd0]">
              <Building2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7b3a]">Catalog</p>
              <p className="font-display text-lg font-semibold text-[#1a1816]">Villas</p>
            </div>
          </div>
          <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#6b655c]">
            {villaCount === null ? "List & publish on the site" : `${villaCount} villa${villaCount === 1 ? "" : "s"} · add new anytime`}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard/superadmin/villas/new"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1c1916] px-3 py-2 font-sans text-[12px] font-semibold text-white transition hover:bg-[#2a241c] min-[380px]:flex-none"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              Add villa
            </Link>
            <Link
              href="/dashboard/superadmin/villas"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#ddd4c8] bg-[#faf8f5] px-3 py-2 font-sans text-[12px] font-semibold text-[#1a1816] transition hover:bg-[#f0ebe4] min-[380px]:flex-none"
            >
              View all
            </Link>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center gap-3 rounded-2xl border border-[#ebe4dc] bg-white/90 px-5 py-4 font-sans text-[15px] text-[#5c564c] shadow-sm">
          <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#c9a55b]" aria-hidden />
          Syncing live booking data…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <DashboardStatCard
              premium
              label="All bookings"
              value={stats.total}
              decor={<LayoutGrid className="h-5 w-5" strokeWidth={1.75} />}
            />
            <DashboardStatCard
              premium
              label="Pending"
              value={stats.pending}
              decor={<Timer className="h-5 w-5 text-amber-700" strokeWidth={1.75} />}
            />
            <DashboardStatCard
              premium
              label="Confirmed"
              value={stats.confirmed}
              decor={<CheckCircle2 className="h-5 w-5 text-emerald-700" strokeWidth={1.75} />}
            />
            <DashboardStatCard
              premium
              label="Total volume (PKR)"
              value={stats.volume.toLocaleString()}
              decor={<Banknote className="h-5 w-5" strokeWidth={1.75} />}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <DashboardStatCard
              premium
              label="Guests (unique)"
              value={stats.uniqueGuests}
              decor={<Users className="h-5 w-5" strokeWidth={1.75} />}
            />
            <DashboardStatCard
              premium
              label="Completed"
              value={stats.completed}
              decor={<CircleCheck className="h-5 w-5 text-slate-600" strokeWidth={1.75} />}
            />
            <DashboardStatCard
              premium
              label="Cancelled"
              value={stats.cancelled}
              decor={<Ban className="h-5 w-5 text-rose-700" strokeWidth={1.75} />}
            />
          </div>
        </>
      )}

      {error && (
        <p className="rounded-2xl border border-red-200/90 bg-red-50 px-5 py-3.5 font-sans text-sm font-medium text-red-800 shadow-sm">
          {error}
        </p>
      )}

      {!loading && (
        <section
          id="master-bookings"
          className="scroll-mt-8 rounded-3xl border border-[#e0d5c8] bg-gradient-to-b from-white to-[#faf7f2] p-1 shadow-[0_20px_50px_-28px_rgba(28,22,16,0.22)]"
        >
          <div className="overflow-hidden rounded-[1.35rem] border border-[#efe8de] bg-white">
            <div className="flex flex-col gap-1 border-b border-[#f0ebe4] bg-gradient-to-r from-[#faf8f5] to-white px-5 py-5 sm:flex-row sm:items-end sm:justify-between md:px-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1c1916] text-[#e8dfd0] shadow-inner shadow-black/20">
                  <Table2 className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-[#1a1816] md:text-[1.35rem]">
                    Master booking register
                  </h2>
                  <p className="mt-1 font-sans text-[13px] text-[#7a7168]">Newest first · full override on status</p>
                </div>
              </div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a7b3a] sm:pb-0.5">
                {bookings.length} record{bookings.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#1c1916] font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9bfb0]">
                  <tr>
                    <th className="px-4 py-3.5 font-medium md:px-5">Ref</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Guest</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Experience</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Package</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Date</th>
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
                      <td className="px-4 py-3.5 md:px-5">
                        <div className="font-semibold text-[#1a1816]">{b.user.fullName}</div>
                        <div className="text-xs text-[#6b655c]">{b.user.email}</div>
                      </td>
                      <td className="px-4 py-3.5 text-[#3d3830] md:px-5">{b.experienceType}</td>
                      <td className="max-w-[200px] truncate px-4 py-3.5 text-[#5c564c] md:px-5" title={b.packageName}>
                        {b.packageName}
                      </td>
                      <td className="min-w-[120px] px-4 py-3.5 text-[#5c564c] md:px-5">
                        <span className="whitespace-nowrap">
                          {new Date(b.bookingDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
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
                        <Select
                          value={b.status}
                          disabled={busyId === b.id}
                          onValueChange={(v) => updateStatus(b.id, v as BookingStatus)}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-9 w-[140px] border-[#ddd4c8] bg-[#faf8f5] text-xs font-semibold text-[#1a1816] shadow-sm",
                              "focus:ring-[#c9a55b]/40",
                            )}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-[#e5dcc8]">
                            {BOOKING_STATUSES.map((s) => (
                              <SelectItem key={s} value={s} className="text-xs font-medium">
                                {STATUS_LABEL[s]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="px-6 py-14 text-center">
                  <p className="font-display text-lg text-[#5c564c]">No bookings yet</p>
                  <p className="mt-2 max-w-sm mx-auto font-sans text-sm text-[#8a8278]">
                    When guests submit requests, they will appear here with live status controls.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
