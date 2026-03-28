"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import type { Villa } from "@/lib/villa-types";
import { cn } from "@/lib/utils";

type Row = Villa & { id: string; published: boolean };

export default function SuperadminVillasPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/villas", { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Failed to load villas");
      setRows([]);
      setLoading(false);
      return;
    }
    setRows(data.villas ?? []);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#9a7b3a]">Catalog</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2rem]">Villas</h1>
          <p className="mt-2 max-w-xl font-sans text-[15px] text-[#5c564c]">
            Create and edit residences. Published villas appear on <strong className="font-semibold text-[#3d3830]">/villas</strong>,{" "}
            experience pages, and guest booking picks.
          </p>
        </div>
        <Link
          href="/dashboard/superadmin/villas/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1c1916] px-5 py-3 font-sans text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#2a241c]"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New villa
        </Link>
      </header>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-sans text-sm text-red-800">{error}</p>
      )}

      <div className="rounded-3xl border border-[#e0d5c8] bg-gradient-to-b from-white to-[#faf7f2] p-1 shadow-[0_16px_40px_-24px_rgba(28,22,16,0.18)]">
        <div className="overflow-hidden rounded-[1.35rem] border border-[#efe8de] bg-white">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 font-sans text-[#6b655c]">
              <Loader2 className="h-5 w-5 animate-spin text-[#c9a55b]" />
              Loading catalog…
            </div>
          ) : rows.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-display text-lg text-[#5c564c]">No villas in the database yet</p>
              <p className="mt-2 font-sans text-sm text-[#8a8278]">
                Run <code className="rounded bg-[#f0ebe4] px-1.5 py-0.5 text-[12px]">npm run db:seed</code> to import the default catalog, or
                create one above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#1c1916] font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9bfb0]">
                  <tr>
                    <th className="px-4 py-3.5 font-medium md:pl-6">Villa</th>
                    <th className="px-4 py-3.5 font-medium">Slug</th>
                    <th className="px-4 py-3.5 font-medium">Category</th>
                    <th className="px-4 py-3.5 font-medium">Price</th>
                    <th className="px-4 py-3.5 font-medium">Status</th>
                    <th className="px-4 py-3.5 pr-6 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((v, i) => (
                    <tr
                      key={v.id}
                      className={cn(
                        "border-t border-[#f2ebe3] transition-colors hover:bg-[#fdfaf6]",
                        i % 2 === 1 && "bg-[#fdfcfa]/80",
                      )}
                    >
                      <td className="px-4 py-3 md:pl-6">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={v.image} alt="" className="h-12 w-16 rounded-lg object-cover ring-1 ring-black/5" />
                          <span className="font-semibold text-[#1a1816]">{v.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[#5c564c]">{v.slug}</td>
                      <td className="px-4 py-3 text-[#5c564c]">{v.category}</td>
                      <td className="px-4 py-3 font-medium text-[#1a1816]">{v.price}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide",
                            v.published ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-900" : "border-amber-300/60 bg-amber-500/10 text-amber-950",
                          )}
                        >
                          {v.published ? "Live" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 pr-6 text-right">
                        <Link
                          href={`/dashboard/superadmin/villas/${v.id}/edit`}
                          className="font-sans text-[13px] font-semibold text-[#9a7b3a] hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
