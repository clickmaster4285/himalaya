"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Pkg = {
  id: string;
  name: string;
  experienceType: string;
  description: string | null;
  priceLabel: string | null;
  active: boolean;
};

export default function ManagerPackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [name, setName] = useState("");
  const [experienceType, setExperienceType] = useState("Dining");
  const [priceLabel, setPriceLabel] = useState("");
  const [description, setDescription] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/packages", { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Failed to load packages.");
      setPackages([]);
    } else {
      setPackages(Array.isArray(data.packages) ? data.packages : []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...packages].sort((a, b) => {
      const t = (a.experienceType || "").localeCompare(b.experienceType || "");
      if (t !== 0) return t;
      return (a.name || "").localeCompare(b.name || "");
    });
    if (!q) return list;
    return list.filter((p) => {
      const haystack = [p.name, p.experienceType, p.priceLabel, p.description].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [packages, query]);

  async function addPackage() {
    setError(null);
    const res = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: name.trim(),
        experienceType: experienceType.trim(),
        priceLabel: priceLabel.trim() || null,
        description: description.trim() || null,
        active: true,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Could not add package.");
      return;
    }
    setName("");
    setPriceLabel("");
    setDescription("");
    await load();
  }

  async function toggleActive(p: Pkg) {
    const res = await fetch(`/api/packages/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ active: !p.active }),
    });
    if (res.ok) await load();
  }

  async function remove(p: Pkg) {
    const res = await fetch(`/api/packages/${p.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) await load();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a]">Packages</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2rem]">
          Manage packages
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-[15px] leading-relaxed text-[#5c564c]">
          Add packages guests can request. These are visible to booking staff and can be used in booking flows.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm font-medium text-red-800">
          {error}
        </p>
      )}

      <section className="rounded-2xl border border-[#ebe4dc] bg-white p-5 shadow-sm shadow-black/[0.04] md:p-6">
        <h2 className="font-display text-xl font-semibold text-[#1a1816]">Add a package</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label className="text-[#3d3830]">Package name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Romantic Dinner" className="mt-2" />
          </div>
          <div>
            <Label className="text-[#3d3830]">Experience type</Label>
            <Input
              value={experienceType}
              onChange={(e) => setExperienceType(e.target.value)}
              placeholder="e.g. Dining"
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-[#3d3830]">Price label (optional)</Label>
            <Input
              value={priceLabel}
              onChange={(e) => setPriceLabel(e.target.value)}
              placeholder="e.g. PKR 25,000"
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-[#3d3830]">Description (optional)</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short details..."
              className="mt-2"
            />
          </div>
        </div>
        <div className="mt-5">
          <Button
            type="button"
            onClick={addPackage}
            disabled={!name.trim() || !experienceType.trim()}
            className="rounded-xl bg-[#9a7b3a] font-sans text-[14px] font-semibold text-white hover:bg-[#856a32]"
          >
            Add package
          </Button>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-[#1a1816]">All packages</h2>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={load} disabled={loading} className="rounded-xl">
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="font-sans text-[14px] text-[#6b655c]">Loading…</p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8278]" aria-hidden />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, type, price…"
                  className="h-10 w-full rounded-xl border border-[#ddd4c8] bg-white pl-9 pr-3 font-sans text-[13px] text-[#1a1816] shadow-sm outline-none ring-0 placeholder:text-[#9a938a] focus:border-[#c9a55b]/60 focus:ring-2 focus:ring-[#c9a55b]/15"
                />
              </div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a7b3a]">
                {filtered.length} package{filtered.length === 1 ? "" : "s"}
              </p>
            </div>

            <section className="rounded-3xl border border-[#e0d5c8] bg-gradient-to-b from-white to-[#faf7f2] p-1 shadow-[0_20px_50px_-28px_rgba(28,22,16,0.22)]">
              <div className="overflow-hidden rounded-[1.35rem] border border-[#efe8de] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="bg-[#1c1916] font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9bfb0]">
                      <tr>
                        <th className="px-4 py-3.5 font-medium md:px-5">Name</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Type</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Price</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Description</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Status</th>
                        <th className="px-4 py-3.5 font-medium md:px-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans">
                      {filtered.map((p, i) => (
                        <tr
                          key={p.id}
                          className={cn(
                            "border-t border-[#f2ebe3] transition-colors hover:bg-[#fdfaf6]",
                            i % 2 === 1 && "bg-[#fdfcfa]/80",
                          )}
                        >
                          <td className="px-4 py-3.5 md:px-5">
                            <div className="font-semibold text-[#1a1816]">{p.name}</div>
                          </td>
                          <td className="px-4 py-3.5 text-[#3d3830] md:px-5">{p.experienceType || "—"}</td>
                          <td className="whitespace-nowrap px-4 py-3.5 font-medium tabular-nums text-[#1a1816] md:px-5">
                            {p.priceLabel || "—"}
                          </td>
                          <td className="max-w-[380px] px-4 py-3.5 text-[#5c564c] md:px-5">
                            <div className="line-clamp-2" title={p.description ?? undefined}>
                              {p.description || "—"}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 md:px-5">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider",
                                p.active ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700",
                              )}
                            >
                              {p.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 md:px-5">
                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="h-9 rounded-lg border-[#ddd4c8] bg-white px-3 font-sans text-[12px] font-semibold text-[#1a1816] hover:bg-[#f6f1ea]"
                                onClick={() => toggleActive(p)}
                              >
                                {p.active ? "Disable" : "Enable"}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="h-9 rounded-lg border-red-200 bg-white px-3 font-sans text-[12px] font-semibold text-red-700 hover:bg-red-50"
                                onClick={() => remove(p)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filtered.length === 0 && (
                    <div className="px-6 py-14 text-center">
                      <p className="font-display text-lg text-[#5c564c]">No packages found</p>
                      <p className="mx-auto mt-2 max-w-sm font-sans text-sm text-[#8a8278]">
                        Try adjusting your search, or add your first package above.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {packages.length === 0 && (
              <p className="rounded-2xl border border-dashed border-[#d4cdc2] bg-white/80 py-12 text-center font-sans text-[15px] text-[#6b655c]">
                No packages yet. Add your first package above.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

