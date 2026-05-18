import type { Request, Response } from "express";
import { InquiryM } from "../models/schemas";
import { sendInquiryNotificationEmail } from "../services/inquiry-email.service";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function pick(value: unknown, max: number) {
  if (value == null) return "";
  return String(value).trim().slice(0, max);
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
