"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BookingLite = {
  id: string;
  reference: string;
  packageName: string;
  experienceType: string;
  user: { fullName: string; email: string };
};

type ExpenseRow = {
  id: string;
  bookingId: string;
  title: string;
  quantity: number;
  amount: number;
  notes: string | null;
  createdAt: string | null;
  booking: { reference: string; packageName: string; experienceType: string } | null;
  customer: { fullName: string; email: string } | null;
  createdBy: { fullName: string; email: string } | null;
};

export default function ManagerExpensesPage() {
  const [bookings, setBookings] = useState<BookingLite[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [bookingId, setBookingId] = useState("");
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    const [bRes, eRes] = await Promise.all([
      fetch("/api/bookings", { credentials: "include" }),
      fetch("/api/expenses", { credentials: "include" }),
    ]);
    const bData = await bRes.json().catch(() => ({}));
    const eData = await eRes.json().catch(() => ({}));

    if (!bRes.ok || !eRes.ok) {
      setError(
        (typeof bData.error === "string" && bData.error) ||
          (typeof eData.error === "string" && eData.error) ||
          "Could not load expense data.",
      );
      setBookings([]);
      setExpenses([]);
      setLoading(false);
      return;
    }

    setBookings(Array.isArray(bData.bookings) ? bData.bookings : []);
    setExpenses(Array.isArray(eData.expenses) ? eData.expenses : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const bookingOptions = useMemo(() => {
    return bookings.map((b) => ({
      value: b.id,
      label: `${b.reference} — ${b.user.fullName} (${b.experienceType})`,
    }));
  }, [bookings]);

  async function addExpense() {
    setError(null);
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        bookingId,
        title: title.trim(),
        quantity: Number(quantity || 1),
        amount: Number(amount || 0),
        notes: notes.trim() || null,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Could not add expense.");
      return;
    }
    setTitle("");
    setQuantity("1");
    setAmount("");
    setNotes("");
    await load();
  }

  async function removeExpense(id: string) {
    const res = await fetch(`/api/expenses/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) await load();
  }

  const total = expenses.reduce((s, x) => s + (Number(x.amount) || 0) * (Number(x.quantity) || 1), 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7b3a]">Expense log</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[#1a1816] md:text-[2rem]">
          Customer extras expenses
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-[15px] leading-relaxed text-[#5c564c]">
          If customer asks for something outside your stock, add it here so Booking Manager and Superadmin can track it.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm font-medium text-red-800">{error}</p>
      )}

      <section className="rounded-2xl border border-[#ebe4dc] bg-white p-5 shadow-sm shadow-black/[0.04] md:p-6">
        <h2 className="font-display text-xl font-semibold text-[#1a1816]">Add expense item</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label className="text-[#3d3830]">Booking / customer</Label>
            <select
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select booking...</option>
              {bookingOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-[#3d3830]">Item / service name</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Special cake" className="mt-2" />
          </div>
          <div>
            <Label className="text-[#3d3830]">Amount (PKR)</Label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 8500" className="mt-2" />
          </div>
          <div>
            <Label className="text-[#3d3830]">Quantity</Label>
            <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label className="text-[#3d3830]">Notes (optional)</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Vendor / reason..." className="mt-2" />
          </div>
        </div>
        <div className="mt-5">
          <Button
            type="button"
            onClick={addExpense}
            disabled={!bookingId || !title.trim() || !(Number(amount) >= 0)}
            className="rounded-xl bg-[#9a7b3a] font-sans text-[14px] font-semibold text-white hover:bg-[#856a32]"
          >
            Add expense
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#ebe4dc] bg-white p-5 shadow-sm shadow-black/[0.04] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-[#1a1816]">Expense records</h2>
          <div className="font-sans text-sm text-[#5c564c]">
            Total: <strong className="text-[#1a1816]">PKR {total.toLocaleString()}</strong>
          </div>
        </div>

        {loading ? (
          <p className="font-sans text-[14px] text-[#6b655c]">Loading…</p>
        ) : expenses.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#d4cdc2] bg-white/80 py-12 text-center font-sans text-[15px] text-[#6b655c]">
            No expense records yet.
          </p>
        ) : (
          <div className="space-y-3">
            {expenses.map((x) => (
              <article key={x.id} className="rounded-xl border border-[#f0ebe4] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <p className="font-display text-lg text-[#1a1816]">{x.title}</p>
                    <p className="font-sans text-[13px] text-[#5c564c]">
                      Booking: <strong>{x.booking?.reference ?? x.bookingId}</strong>
                      {x.customer ? ` · ${x.customer.fullName}` : ""}
                    </p>
                    <p className="font-sans text-[12px] text-[#6b655c]">
                      Qty: {x.quantity} · Amount: PKR {x.amount.toLocaleString()}
                      {x.notes ? ` · ${x.notes}` : ""}
                    </p>
                    <p className="font-sans text-[12px] text-[#8a8278]">
                      Added by: {x.createdBy?.fullName ?? "Staff"}
                      {x.createdAt ? ` · ${new Date(x.createdAt).toLocaleString()}` : ""}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => removeExpense(x.id)}
                  >
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

