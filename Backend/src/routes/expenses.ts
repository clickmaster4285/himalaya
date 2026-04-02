import { Router } from "express";
import { ExpenseM, BookingM, UserM } from "../models/schemas";
import { getSessionFromRequest } from "../req-session";
import { canManageBookings } from "../user-dto";
import { findUserById } from "../services/user.service";

export const expensesRouter = Router();

expensesRouter.get("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const bookingId = String(req.query.bookingId ?? "").trim();
  const q: Record<string, unknown> = {};
  if (bookingId) q.bookingId = bookingId;

  const rows = await ExpenseM.find(q).sort({ createdAt: -1 }).lean();
  const bookingIds = [...new Set((rows as Array<any>).map((r) => String(r.bookingId)))];
  const userIds = [...new Set((rows as Array<any>).flatMap((r) => [String(r.customerUserId), String(r.createdByUserId)]))];

  const [bookings, users] = await Promise.all([
    BookingM.find({ _id: { $in: bookingIds } }).select("_id reference experienceType packageName userId").lean(),
    UserM.find({ _id: { $in: userIds } }).select("_id fullName email").lean(),
  ]);

  const bookingMap = new Map((bookings as Array<any>).map((b) => [String(b._id), b]));
  const userMap = new Map((users as Array<any>).map((u) => [String(u._id), u]));

  const expenses = (rows as Array<any>).map((r) => {
    const booking = bookingMap.get(String(r.bookingId));
    const customer = userMap.get(String(r.customerUserId));
    const creator = userMap.get(String(r.createdByUserId));
    return {
      id: String(r._id),
      bookingId: String(r.bookingId),
      customerUserId: String(r.customerUserId),
      title: String(r.title),
      quantity: Number(r.quantity ?? 1),
      amount: Number(r.amount ?? 0),
      notes: r.notes == null ? null : String(r.notes),
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
      updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : null,
      booking: booking
        ? {
            id: String(booking._id),
            reference: String(booking.reference),
            experienceType: String(booking.experienceType),
            packageName: String(booking.packageName),
          }
        : null,
      customer: customer
        ? { id: String(customer._id), fullName: String(customer.fullName), email: String(customer.email) }
        : null,
      createdBy: creator
        ? { id: String(creator._id), fullName: String(creator.fullName), email: String(creator.email) }
        : null,
    };
  });

  return res.json({ expenses });
});

expensesRouter.post("/", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const bookingId = String(req.body?.bookingId ?? "").trim();
  const title = String(req.body?.title ?? "").trim();
  const quantity = Number(req.body?.quantity ?? 1);
  const amount = Number(req.body?.amount ?? NaN);
  const notesRaw = req.body?.notes;
  const notes = notesRaw == null ? null : String(notesRaw).trim() || null;

  if (!bookingId || !title || !Number.isFinite(amount) || amount < 0) {
    return res.status(400).json({ error: "bookingId, title, and valid amount are required." });
  }

  const booking = await BookingM.findById(bookingId).select("_id userId").lean();
  if (!booking) return res.status(404).json({ error: "Booking not found." });

  const doc = await ExpenseM.create({
    bookingId,
    customerUserId: String((booking as any).userId),
    title,
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    amount,
    notes,
    createdByUserId: me.id,
  });

  return res.status(201).json({
    expense: {
      id: String(doc._id),
      bookingId: String(doc.bookingId),
      customerUserId: String(doc.customerUserId),
      title: doc.title,
      quantity: doc.quantity,
      amount: doc.amount,
      notes: doc.notes ?? null,
    },
  });
});

expensesRouter.patch("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const id = String(req.params.id ?? "");
  const existing = await ExpenseM.findById(id).lean();
  if (!existing) return res.status(404).json({ error: "Not found." });

  const patch: Record<string, unknown> = {};
  if (req.body?.title !== undefined) patch.title = String(req.body.title ?? "").trim();
  if (req.body?.quantity !== undefined) {
    const q = Number(req.body.quantity);
    patch.quantity = Number.isFinite(q) && q > 0 ? q : 1;
  }
  if (req.body?.amount !== undefined) {
    const a = Number(req.body.amount);
    if (!Number.isFinite(a) || a < 0) return res.status(400).json({ error: "Invalid amount." });
    patch.amount = a;
  }
  if (req.body?.notes !== undefined) patch.notes = req.body.notes == null ? null : String(req.body.notes).trim() || null;

  if (patch.title !== undefined && !String(patch.title)) {
    return res.status(400).json({ error: "title cannot be empty." });
  }

  await ExpenseM.updateOne({ _id: id }, { $set: patch });
  const updated = await ExpenseM.findById(id).lean();
  return res.json({ expense: updated });
});

expensesRouter.delete("/:id", async (req, res) => {
  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Unauthorized." });

  const me = await findUserById(session.userId);
  if (!me?.isActive || !canManageBookings(me.role)) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const id = String(req.params.id ?? "");
  await ExpenseM.deleteOne({ _id: id });
  return res.json({ ok: true });
});

