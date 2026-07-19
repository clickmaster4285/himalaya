import type { Request, Response } from "express";
import { InquiryM } from "../models/schemas";
import { getSessionFromRequest } from "../middleware/req-session";
import { sendInquiryNotificationEmail } from "../services/inquiry-email.service";
import { findUserById } from "../services/user.service";
import { canManageBookings } from "../utils/user-dto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pick(value: unknown, max: number) {
  if (value == null) return "";
  return String(value).trim().slice(0, max);
}

export async function listInquiries(req: Request, res: Response) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) return res.status(401).json({ error: "Unauthorized." });

    const me = await findUserById(session.userId);
    if (!me?.isActive || !canManageBookings(me.role)) {
      return res.status(403).json({ error: "Forbidden." });
    }

    const rows = await InquiryM.find({}).sort({ createdAt: -1 }).lean();
    const inquiries = (rows as Array<Record<string, unknown>>).map((r) => ({
      id: String(r._id),
      fullName: String(r.fullName ?? ""),
      email: String(r.email ?? ""),
      phone: r.phone != null ? String(r.phone) : null,
      checkInDate: r.checkInDate != null ? String(r.checkInDate) : null,
      checkOutDate: r.checkOutDate != null ? String(r.checkOutDate) : null,
      numberOfGuests: r.numberOfGuests != null ? String(r.numberOfGuests) : null,
      message: r.message != null ? String(r.message) : null,
      source: r.source != null ? String(r.source) : null,
      createdAt: r.createdAt ? new Date(r.createdAt as string | Date).toISOString() : null,
    }));

    return res.json({ inquiries });
  } catch (err) {
    console.error("[inquiries] list", err);
    return res.status(500).json({ error: "Could not load inquiries." });
  }
}

export async function createInquiry(req: Request, res: Response) {
  try {
    const fullName = pick(req.body?.fullName, 200);
    const email = pick(req.body?.email, 320).toLowerCase();
    const phone = pick(req.body?.phone, 40);
    const checkInDate = pick(req.body?.checkInDate, 20);
    const checkOutDate = pick(req.body?.checkOutDate, 20);
    const numberOfGuests = pick(req.body?.numberOfGuests, 20);
    const message = pick(req.body?.message, 5000);
    const source = pick(req.body?.source, 120) || "hotels-in-bhurban";

    if (!fullName) {
      return res.status(400).json({ error: "Full name is required." });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    const doc = await InquiryM.create({
      fullName,
      email,
      phone: phone || null,
      checkInDate: checkInDate || null,
      checkOutDate: checkOutDate || null,
      numberOfGuests: numberOfGuests || null,
      message: message || null,
      source,
    });

    const emailResult = await sendInquiryNotificationEmail({
      fullName,
      email,
      phone: phone || null,
      checkInDate: checkInDate || null,
      checkOutDate: checkOutDate || null,
      numberOfGuests: numberOfGuests || null,
      message: message || null,
      source,
    });

    if (!emailResult.staffEmailSent) {
      console.warn("[inquiries] Staff notification NOT sent.", emailResult.detail ?? "");
    }
    if (!emailResult.guestEmailSent) {
      console.warn("[inquiries] Guest confirmation NOT sent.", emailResult.detail ?? "");
    }

    return res.status(201).json({
      ok: true,
      id: doc._id,
      saved: true,
      emailSent: emailResult.emailSent,
      staffEmailSent: emailResult.staffEmailSent,
      guestEmailSent: emailResult.guestEmailSent,
      method: emailResult.method,
      emailDetail: emailResult.detail,
    });
  } catch (err) {
    console.error("[inquiries]", err);
    return res.status(500).json({ error: "Could not save inquiry." });
  }
}

export async function deleteInquiry(req: Request, res: Response) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) return res.status(401).json({ error: "Unauthorized." });

    const me = await findUserById(session.userId);
    if (!me?.isActive || !canManageBookings(me.role)) {
      return res.status(403).json({ error: "Forbidden." });
    }

    const id = String(req.params.id ?? "").trim();
    if (!id) return res.status(400).json({ error: "Inquiry id is required." });

    const result = await InquiryM.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("[inquiries] delete", err);
    return res.status(500).json({ error: "Could not delete inquiry." });
  }
}
