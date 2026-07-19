"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Mail, Phone, RefreshCw, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

type InquiryRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  numberOfGuests: string | null;
  message: string | null;
  source: string | null;
  createdAt: string | null;
};

function formatSource(source: string | null) {
  if (!source) return "Website";
  return source
    .split(/[-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatWhen(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function ManagerInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not load inquiries.");
        setInquiries([]);
        return;
      }
      setInquiries(Array.isArray(data.inquiries) ? data.inquiries : []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const onFocus = () => load(true);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [load]);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    let today = 0;
    let week = 0;
    for (const row of inquiries) {
      if (!row.createdAt) continue;
      const d = new Date(row.createdAt);
      if (d >= startOfToday) today += 1;
      if (d >= startOfWeek) week += 1;
    }
    return { total: inquiries.length, today, week };
  }, [inquiries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter((row) => {
      const haystack = [
        row.fullName,
        row.email,
        row.phone,
        row.message,
        row.source,
        row.checkInDate,
        row.checkOutDate,
        row.numberOfGuests,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [inquiries, query]);

  async function removeInquiry(id: string, fullName: string) {
    const ok = window.confirm(`Delete inquiry from "${fullName}"? This cannot be undone.`);
    if (!ok) return;

    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Could not delete inquiry.");
        return;
      }
      if (expandedId === id) setExpandedId(null);
      await load(true);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a]">Booking manager</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2rem]">Inquiries</h1>
          <p className="mt-2 max-w-2xl font-sans text-[15px] leading-relaxed text-[#5c564c]">
            Every inquiry from the website is saved here — contact forms, Bhurban bookings, and event quotes.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="shrink-0 border-[#e5dcc8] bg-white font-sans text-[13px]"
          onClick={() => load(true)}
          disabled={refreshing}
        >
          {refreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStatCard label="Total inquiries" value={stats.total} tone="default" />
        <DashboardStatCard label="Today" value={stats.today} tone="amber" />
        <DashboardStatCard label="Last 7 days" value={stats.week} tone="emerald" />
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9288]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, phone, message, source…"
          className="w-full rounded-xl border border-[#ebe4dc] bg-white py-2.5 pl-10 pr-4 font-sans text-[14px] text-[#1a1816] shadow-sm outline-none ring-[#c9a55b]/30 placeholder:text-[#9a9288] focus:ring-2"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 font-sans text-[14px] text-rose-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 font-sans text-[14px] text-[#6b655c]">
          <Loader2 className="h-5 w-5 animate-spin text-[#9a7b3a]" />
          Loading inquiries…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#e5dcc8] bg-white/60 px-6 py-14 text-center">
          <p className="font-display text-xl text-[#3d3830]">
            {query ? "No inquiries match your search." : "No inquiries yet."}
          </p>
          <p className="mt-2 font-sans text-[14px] text-[#6b655c]">
            New form submissions from the website will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((row) => {
            const open = expandedId === row.id;
            return (
              <article
                key={row.id}
                className="overflow-hidden rounded-2xl border border-[#ebe4dc] bg-white shadow-sm shadow-black/[0.03]"
              >
                <div className="flex items-start gap-2 px-5 py-4">
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-start gap-4 text-left transition hover:opacity-90"
                    onClick={() => setExpandedId(open ? null : row.id)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-semibold text-[#1a1816]">{row.fullName}</h2>
                        <span className="rounded-full bg-[#f3eee4] px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-[#7a6129]">
                          {formatSource(row.source)}
                        </span>
                      </div>
                      <p className="mt-1 font-sans text-[13px] text-[#6b655c]">{formatWhen(row.createdAt)}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[13px] text-[#5c564c]">
                        <span className="inline-flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-[#9a7b3a]" />
                          {row.email}
                        </span>
                        {row.phone && (
                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-[#9a7b3a]" />
                            {row.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="mt-1 shrink-0 text-[#9a9288]">
                      {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                  </button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                    disabled={deletingId === row.id}
                    aria-label={`Delete inquiry from ${row.fullName}`}
                    onClick={() => removeInquiry(row.id, row.fullName)}
                  >
                    {deletingId === row.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {open && (
                  <div className="border-t border-[#f0ebe3] bg-[#faf8f5]/80 px-5 py-4">
                    <dl className="grid gap-3 font-sans text-[13px] sm:grid-cols-2">
                      {row.checkInDate && (
                        <div>
                          <dt className="font-semibold text-[#7a6f62]">Check-in</dt>
                          <dd className="mt-0.5 text-[#3d3830]">{row.checkInDate}</dd>
                        </div>
                      )}
                      {row.checkOutDate && (
                        <div>
                          <dt className="font-semibold text-[#7a6f62]">Check-out</dt>
                          <dd className="mt-0.5 text-[#3d3830]">{row.checkOutDate}</dd>
                        </div>
                      )}
                      {row.numberOfGuests && (
                        <div>
                          <dt className="font-semibold text-[#7a6f62]">Guests</dt>
                          <dd className="mt-0.5 text-[#3d3830]">{row.numberOfGuests}</dd>
                        </div>
                      )}
                    </dl>
                    {row.message && (
                      <div className="mt-4">
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a6f62]">
                          Message
                        </p>
                        <p className={cn("mt-2 whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-[#3d3830]")}>
                          {row.message}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
