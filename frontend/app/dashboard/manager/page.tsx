"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Loader2, Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { useDashboardBookings, type DashboardBooking } from "@/components/dashboard/use-dashboard-bookings";
import type { SafeUser } from "@/lib/user-public";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
type BookingStatus = (typeof BOOKING_STATUSES)[number];

const STATUS_LABEL: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

export default function ManagerDashboardPage() {
  const { bookings, stats, loading, error, reload } = useDashboardBookings();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [me, setMe] = useState<SafeUser | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | BookingStatus>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "ALL" && b.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [
        b.reference,
        b.experienceType,
        b.packageName,
        b.user?.fullName,
        b.user?.email,
        b.guestPhone,
        b.guestContactEmail,
        b.villaSlug,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [bookings, query, statusFilter]);

  function stayDetailLines(b: DashboardBooking) {
    if (b.experienceType !== "Book Your Stay") return null;
    const lines: string[] = [];
    if (b.adults != null) {
      lines.push(
        `Guests: ${b.adults} adult${b.adults === 1 ? "" : "s"}${b.children != null ? `, ${b.children} child${b.children === 1 ? "" : "ren"}` : ""}`,
      );
    }
    if (b.villaSlug) lines.push(`Villa slug: ${b.villaSlug}`);
    if (b.guestFirstName || b.guestLastName) {
      lines.push(`Lead guest: ${[b.guestFirstName, b.guestLastName].filter(Boolean).join(" ")}`);
    }
    if (b.guestPhone) lines.push(`Phone: ${b.guestPhone}`);
    if (b.guestContactEmail) lines.push(`Contact email: ${b.guestContactEmail}`);
    if (b.paymentMethod) lines.push(`Payment: ${b.paymentMethod}`);
    if (b.notes) lines.push(`Guest notes: ${b.notes}`);
    if (b.extrasNote) lines.push(`Extras requested: ${b.extrasNote}`);
    if (Array.isArray(b.extras) && b.extras.length > 0) {
      const items = b.extras
        .map((x) => `${x.title}${x.quantity > 1 ? ` ×${x.quantity}` : ""}${x.amount > 0 ? ` (PKR ${x.amount.toLocaleString()})` : ""}`)
        .join(" · ");
      lines.push(`Extras items: ${items}`);
    }
    if (lines.length === 0) return null;
    return (
      <ul className="mt-3 space-y-1.5 font-sans text-[12px] leading-relaxed text-[#5c564c]">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }

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
        <section className="scroll-mt-8 rounded-3xl border border-[#e0d5c8] bg-gradient-to-b from-white to-[#faf7f2] p-1 shadow-[0_20px_50px_-28px_rgba(28,22,16,0.22)]">
          <div className="overflow-hidden rounded-[1.35rem] border border-[#efe8de] bg-white">
            <div className="flex flex-col gap-4 border-b border-[#f0ebe4] bg-gradient-to-r from-[#faf8f5] to-white px-5 py-5 sm:flex-row sm:items-end sm:justify-between md:px-6">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-[#1a1816] md:text-[1.35rem]">
                  Booking register
                </h2>
                <p className="mt-1 font-sans text-[13px] text-[#7a7168]">Newest first · confirm or update status</p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-[260px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8278]" aria-hidden />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search ref, guest, email, villa…"
                    className="h-10 w-full rounded-xl border border-[#ddd4c8] bg-white pl-9 pr-3 font-sans text-[13px] text-[#1a1816] shadow-sm outline-none ring-0 placeholder:text-[#9a938a] focus:border-[#c9a55b]/60 focus:ring-2 focus:ring-[#c9a55b]/15"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as "ALL" | BookingStatus)}>
                  <SelectTrigger className="h-10 w-full rounded-xl border-[#ddd4c8] bg-[#faf8f5] font-sans text-[12px] font-semibold text-[#1a1816] shadow-sm focus:ring-[#c9a55b]/40 sm:w-[170px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="border-[#e5dcc8]">
                    <SelectItem value="ALL" className="text-xs font-medium">
                      All statuses
                    </SelectItem>
                    {BOOKING_STATUSES.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs font-medium">
                        {STATUS_LABEL[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={reload} className="h-10 rounded-xl">
                  Refresh
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-[#1c1916] font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9bfb0]">
                  <tr>
                    <th className="px-4 py-3.5 font-medium md:px-5">Ref</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Guest</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Experience</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Package</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Date</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Amount</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Status</th>
                    <th className="px-4 py-3.5 font-medium md:px-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-sans">
                  {filtered.map((b, i) => {
                    const busy = busyId === b.id;
                    const expanded = expandedId === b.id;
                    const canExpand = b.experienceType === "Book Your Stay";
                    return (
                      <>
                        <tr
                          key={b.id}
                          className={cn(
                            "border-t border-[#f2ebe3] align-top transition-colors hover:bg-[#fdfaf6]",
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
                          <td className="max-w-[260px] truncate px-4 py-3.5 text-[#5c564c] md:px-5" title={b.packageName}>
                            {b.packageName}
                          </td>
                          <td className="min-w-[140px] px-4 py-3.5 text-[#5c564c] md:px-5">
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
                              disabled={busy}
                              onValueChange={(v) => updateStatus(b.id, v as BookingStatus)}
                            >
                              <SelectTrigger className="h-9 w-[150px] border-[#ddd4c8] bg-[#faf8f5] text-xs font-semibold text-[#1a1816] shadow-sm focus:ring-[#c9a55b]/40">
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
                          <td className="px-4 py-3.5 md:px-5">
                            <div className="flex flex-wrap items-center gap-2">
                              {b.status === "PENDING" ? (
                                <>
                                  <Button
                                    type="button"
                                    size="sm"
                                    disabled={busy}
                                    onClick={() => updateStatus(b.id, "CONFIRMED")}
                                    className="h-9 rounded-lg bg-[#9a7b3a] px-3 font-sans text-[12px] font-semibold text-white hover:bg-[#856a32]"
                                  >
                                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" strokeWidth={2.5} />}
                                    Confirm
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    disabled={busy}
                                    onClick={() => updateStatus(b.id, "CANCELLED")}
                                    className="h-9 rounded-lg border-[#ddd4c8] bg-white px-3 font-sans text-[12px] font-semibold text-[#1a1816] hover:bg-[#f6f1ea]"
                                  >
                                    <XCircle className="h-4 w-4 text-red-600" strokeWidth={2} />
                                    Decline
                                  </Button>
                                </>
                              ) : null}
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={!canExpand}
                                onClick={() => setExpandedId(expanded ? null : b.id)}
                                className={cn(
                                  "h-9 rounded-lg border-[#ddd4c8] bg-white px-3 font-sans text-[12px] font-semibold text-[#1a1816] hover:bg-[#f6f1ea]",
                                  !canExpand && "opacity-50",
                                )}
                              >
                                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                        {expanded && (
                          <tr key={`${b.id}-details`} className="border-t border-[#f2ebe3] bg-[#fbf8f3]">
                            <td colSpan={8} className="px-4 py-4 md:px-5">
                              <div className="rounded-xl border border-[#efe8de] bg-white px-4 py-3">
                                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a7b3a]">
                                  Stay details
                                </p>
                                {stayDetailLines(b)}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="px-6 py-14 text-center">
                  <p className="font-display text-lg text-[#5c564c]">No bookings found</p>
                  <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-[#8a8278]">
                    Try clearing filters or searching by reference, guest name, email, or villa.
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
