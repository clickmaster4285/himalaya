"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Shield, UsersRound } from "lucide-react";
import type { SafeUser } from "@/lib/user-public";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ROLES = ["SUPERADMIN", "BOOKING_MANAGER", "USER"] as const;
type Role = (typeof ROLES)[number];

const ROLE_LABEL: Record<Role, string> = {
  SUPERADMIN: "Superadmin",
  BOOKING_MANAGER: "Booking manager",
  USER: "Guest",
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function roleBadgeClass(role: Role) {
  switch (role) {
    case "SUPERADMIN":
      return "border-[#c9a55b]/45 bg-[#c9a55b]/12 text-[#5c4a24]";
    case "BOOKING_MANAGER":
      return "border-sky-300/60 bg-sky-500/10 text-sky-950";
    default:
      return "border-[#e0d8cc] bg-[#f5f2ed] text-[#4a4540]";
  }
}

export default function SuperadminUsersPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users", { credentials: "include" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Failed to load users");
      setUsers([]);
      setLoading(false);
      return;
    }
    setUsers(data.users ?? []);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function changeRole(userId: string, role: Role) {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role }),
    });
    if (res.ok) await load();
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        ROLE_LABEL[u.role as Role].toLowerCase().includes(q) ||
        (u.role as string).toLowerCase().includes(q),
    );
  }, [users, query]);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-4">
      <header className="relative overflow-hidden rounded-3xl border border-[#2a241c] bg-gradient-to-br from-[#1c1916] via-[#231d18] to-[#181510] px-6 py-8 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.45)] md:px-9 md:py-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-[#c9a55b]/12 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9a55b]/20 text-[#e8cf9a] ring-1 ring-[#c9a55b]/30">
              <Shield className="h-6 w-6" strokeWidth={1.6} aria-hidden />
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#d4b87a]">Directory</p>
              <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight text-[#fdf9f3] md:text-[2.05rem]">
                Users &amp; roles
              </h1>
              <p className="mt-2 max-w-xl font-sans text-[15px] leading-relaxed text-[#c4b8a8]">
                Assign booking manager or superadmin access. Changes apply immediately for new sessions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-[13px] text-[#c9bfb0] backdrop-blur-sm">
            <UsersRound className="h-4 w-4 text-[#d4b87a]" aria-hidden />
            <span className="tabular-nums font-semibold text-[#fdf9f3]">{users.length}</span>
            <span>accounts</span>
          </div>
        </div>
      </header>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9084]"
          strokeWidth={2}
          aria-hidden
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or role…"
          className="h-12 rounded-2xl border-[#e0d5c8] bg-white pl-11 pr-4 font-sans text-[15px] shadow-sm placeholder:text-[#a39a8e] focus-visible:ring-[#c9a55b]/35"
          aria-label="Filter users"
        />
      </div>

      {error && (
        <p className="rounded-2xl border border-red-200/90 bg-red-50 px-5 py-3.5 text-sm font-medium text-red-800 shadow-sm">
          {error}
        </p>
      )}

      <div className="rounded-3xl border border-[#e0d5c8] bg-gradient-to-b from-white to-[#faf7f2] p-1 shadow-[0_20px_50px_-28px_rgba(28,22,16,0.2)]">
        <div className="overflow-hidden rounded-[1.35rem] border border-[#efe8de] bg-white">
          {loading && !error ? (
            <div className="px-6 py-16 text-center font-sans text-sm text-[#6b655c]">Loading users…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-[#1c1916] font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9bfb0]">
                  <tr>
                    <th className="px-4 py-3.5 font-medium md:pl-6">User</th>
                    <th className="px-4 py-3.5 font-medium">Email</th>
                    <th className="px-4 py-3.5 pr-5 font-medium md:pr-6">Access level</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr
                      key={u.id}
                      className={cn(
                        "border-t border-[#f2ebe3] transition-colors hover:bg-[#fdfaf6]",
                        i % 2 === 1 && "bg-[#fdfcfa]/80",
                      )}
                    >
                      <td className="px-4 py-4 md:pl-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a241c] to-[#1a1612] font-sans text-[12px] font-bold uppercase tracking-wide text-[#e8dfd0] ring-2 ring-[#c9a55b]/25"
                            aria-hidden
                          >
                            {initialsFromName(u.fullName)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-[#1a1816]">{u.fullName}</span>
                              <span
                                className={cn(
                                  "inline-flex rounded-full border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide",
                                  roleBadgeClass(u.role as Role),
                                )}
                              >
                                {ROLE_LABEL[u.role as Role]}
                              </span>
                            </div>
                            <p className="mt-0.5 font-sans text-[11px] text-[#9a9084]">
                              {u.isActive ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-[220px] truncate px-4 py-4 text-[#5c564c] md:max-w-none" title={u.email}>
                        {u.email}
                      </td>
                      <td className="px-4 py-4 pr-5 md:pr-6">
                        <Select value={u.role} onValueChange={(v) => changeRole(u.id, v as Role)}>
                          <SelectTrigger
                            className={cn(
                              "h-10 w-full max-w-[220px] border-[#ddd4c8] bg-[#faf8f5] text-left text-xs font-semibold text-[#1a1816] shadow-sm",
                              "focus:ring-[#c9a55b]/40",
                            )}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-[#e5dcc8]">
                            {ROLES.map((r) => (
                              <SelectItem key={r} value={r} className="text-xs font-medium">
                                {ROLE_LABEL[r]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loading && users.length === 0 && !error && (
                <div className="px-6 py-14 text-center">
                  <p className="font-display text-lg text-[#5c564c]">No accounts</p>
                  <p className="mt-2 text-sm text-[#8a8278]">
                    Check that the API server is running and MongoDB is up — staff users are created from <code className="rounded bg-[#f0ebe4] px-1">backend/.env</code> on first login.
                  </p>
                </div>
              )}
              {users.length > 0 && filtered.length === 0 && (
                <div className="px-6 py-14 text-center">
                  <p className="font-display text-lg text-[#5c564c]">No matches</p>
                  <p className="mt-2 text-sm text-[#8a8278]">Try a different search term.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
