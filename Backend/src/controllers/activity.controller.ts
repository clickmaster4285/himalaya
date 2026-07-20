import type { Request, Response } from "express";
import cookie from "cookie";
import { ActivityM } from "../models/schemas";
import { getSessionFromRequest } from "../middleware/req-session";
import { SESSION_COOKIE } from "../utils/session";

function getSessionIdFromRequest(req: Request): string | null {
  const rawCookie = req.headers.cookie;
  if (!rawCookie) return null;

  try {
    const parsed = cookie.parse(rawCookie);
    const value = parsed[SESSION_COOKIE];
    return value ? String(value).trim() : null;
  } catch {
    return null;
  }
}

export async function trackActivity(req: Request, res: Response) {
  try {
    const session = await getSessionFromRequest(req);
    const sessionId = getSessionIdFromRequest(req) || (req.body?.sessionId ? String(req.body.sessionId) : null);
    const eventType = req.body?.eventType ? String(req.body.eventType).trim() : "";

    if (!eventType) {
      return res.status(400).json({ error: "eventType is required." });
    }

    const activity = await ActivityM.create({
      userId: session?.userId ?? null,
      sessionId,
      eventType,
      page: req.body?.page ? String(req.body.page) : null,
      elementId: req.body?.elementId ? String(req.body.elementId) : null,
      elementText: req.body?.elementText ? String(req.body.elementText) : null,
      metadata: req.body?.metadata ?? {},
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
console.log("activity", activity);

    return res.status(201).json({ ok: true, activity });
  } catch (error) {
    console.error("[activity] track", error);
    return res.status(500).json({ message: "Failed to track event" });
  }
}



export async function getActivities(req: Request, res: Response) {
  try {
    const { 
      userId, 
      sessionId, 
      eventType, 
      page,
      startDate,
      endDate,
      limit = "50",
      offset = "0",
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    // Convert string values to numbers with proper type checking
    const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : 50;
    const offsetNum = typeof offset === 'string' ? parseInt(offset, 10) : 0;

    // Build filter object
    const filter: any = {};

    if (userId && typeof userId === 'string') {
      filter.userId = userId;
    }

    if (sessionId && typeof sessionId === 'string') {
      filter.sessionId = sessionId;
    }

    if (eventType && typeof eventType === 'string') {
      filter.eventType = eventType;
    }

    if (page && typeof page === 'string') {
      filter.page = page;
    }

    // Date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      
      if (startDate && typeof startDate === 'string') {
        filter.createdAt.$gte = new Date(startDate);
      }
      
      if (endDate && typeof endDate === 'string') {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    // Build sort object
    const sort: any = {};
    const sortByStr = typeof sortBy === 'string' ? sortBy : 'createdAt';
    const sortOrderStr = typeof sortOrder === 'string' ? sortOrder : 'desc';
    sort[sortByStr] = sortOrderStr === "asc" ? 1 : -1;

    // Execute query with pagination
    const [activities, totalCount] = await Promise.all([
      ActivityM.find(filter)
        .sort(sort)
        .limit(limitNum)
        .skip(offsetNum)
        .lean(),
      ActivityM.countDocuments(filter)
    ]);

    return res.status(200).json({
      ok: true,
      data: activities,
      pagination: {
        total: totalCount,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + activities.length < totalCount
      }
    });
  } catch (error) {
    console.error("[activity] get", error);
    return res.status(500).json({ 
      message: "Failed to retrieve activities",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}