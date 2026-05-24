import "server-only";

import { addDays, format } from "date-fns";
import {
  getDefaultNightlyRatePkr,
  getPriceFeedHorizonDays,
  getTaxRate,
} from "@/lib/google-hotels/config";
import type { GoogleHotelsAvailabilityRow } from "@/lib/google-hotels/types";

const NIGHT_STAYS = [1, 2, 3, 4, 5, 6, 7] as const;

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur.trim());
  return out;
}

function parseSheetRows(csv: string): GoogleHotelsAvailabilityRow[] {
  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const header = parseCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, "_"));
  const idx = {
    checkin: header.findIndex((h) => h === "checkin" || h === "checkin_date" || h === "check_in"),
    nights: header.findIndex((h) => h === "nights" || h === "night"),
    base: header.findIndex(
      (h) =>
        h === "base_rate" ||
        h === "baserate" ||
        h === "rate" ||
        h === "nightly_rate" ||
        h === "price",
    ),
    tax: header.findIndex((h) => h === "tax" || h === "taxes"),
    available: header.findIndex((h) => h === "available" || h === "availability"),
  };

  if (idx.checkin < 0 || idx.nights < 0 || idx.base < 0) return [];

  const rows: GoogleHotelsAvailabilityRow[] = [];

  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line);
    const availableRaw = idx.available >= 0 ? cols[idx.available]?.toLowerCase() : "yes";
    if (availableRaw === "no" || availableRaw === "false" || availableRaw === "0") continue;

    const checkinDate = cols[idx.checkin]?.slice(0, 10);
    const nights = Number.parseInt(cols[idx.nights] ?? "", 10);
    const rateRaw = Number.parseInt((cols[idx.base] ?? "").replace(/[^\d]/g, ""), 10);
    if (!checkinDate || !/^\d{4}-\d{2}-\d{2}$/.test(checkinDate)) continue;
    if (!Number.isFinite(nights) || nights < 1 || nights > 30) continue;
    if (!Number.isFinite(rateRaw) || rateRaw <= 0) continue;

    const taxRate = getTaxRate();
    const baseHeader = header[idx.base] ?? "";
    const baseRate =
      baseHeader === "nightly_rate" || baseHeader === "price" ? rateRaw * nights : rateRaw;
    const taxCol =
      idx.tax >= 0 ? Number.parseInt((cols[idx.tax] ?? "").replace(/[^\d]/g, ""), 10) : NaN;
    const tax = Number.isFinite(taxCol) && taxCol >= 0 ? taxCol : Math.round(baseRate * taxRate);

    rows.push({ checkinDate, nights, baseRate, tax });
  }

  return rows;
}

async function fetchSheetCsv(): Promise<string | null> {
  const sheetId = process.env.GOOGLE_HOTELS_SHEET_ID?.trim();
  if (!sheetId) return null;

  const gid = process.env.GOOGLE_HOTELS_SHEET_GID?.trim() || "0";
  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/export?format=csv&gid=${encodeURIComponent(gid)}`;

  const res = await fetch(url, {
    next: { revalidate: 0 },
    headers: { Accept: "text/csv" },
  });
  if (!res.ok) return null;
  return res.text();
}

function generateFallbackAvailability(): GoogleHotelsAvailabilityRow[] {
  const nightly = getDefaultNightlyRatePkr();
  const taxRate = getTaxRate();
  const horizon = getPriceFeedHorizonDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rows: GoogleHotelsAvailabilityRow[] = [];

  for (let d = 0; d < horizon; d++) {
    const checkin = addDays(today, d);
    const checkinDate = format(checkin, "yyyy-MM-dd");

    for (const nights of NIGHT_STAYS) {
      const baseRate = nightly * nights;
      const tax = Math.round(baseRate * taxRate);
      rows.push({ checkinDate, nights, baseRate, tax });
    }
  }

  return rows;
}

function dedupeRows(rows: GoogleHotelsAvailabilityRow[]): GoogleHotelsAvailabilityRow[] {
  const map = new Map<string, GoogleHotelsAvailabilityRow>();
  for (const row of rows) {
    map.set(`${row.checkinDate}:${row.nights}`, row);
  }
  return [...map.values()].sort((a, b) => {
    const c = a.checkinDate.localeCompare(b.checkinDate);
    return c !== 0 ? c : a.nights - b.nights;
  });
}

/** Rows for the Google Transaction (price) feed — sheet when configured, else generated defaults. */
export async function getAvailabilityData(): Promise<GoogleHotelsAvailabilityRow[]> {
  try {
    const csv = await fetchSheetCsv();
    if (csv) {
      const parsed = parseSheetRows(csv);
      if (parsed.length > 0) return dedupeRows(parsed);
    }
  } catch (err) {
    console.error("[google-hotels] sheet fetch failed:", err);
  }

  return generateFallbackAvailability();
}
