import { getSiteOrigin } from "@/lib/seo/site-config";

/** Google Hotel List / Transaction feed property id — must match Hotel Center. */
export const GOOGLE_HOTELS_PROPERTY_ID = "himalaya-villas-bhurban";

export const GOOGLE_HOTELS_PROPERTY = {
  id: GOOGLE_HOTELS_PROPERTY_ID,
  name: "Himalaya Villas",
  phone: "+923045679000",
  category: "hotel",
  latitude: 33.9614,
  longitude: 73.4653,
  address: {
    addr1: "Mohra Iswal, Near Kashmiri Bazar",
    city: "Bhurban",
    province: "Punjab",
    postalCode: "47190",
    country: "PK",
  },
} as const;

export const GOOGLE_HOTELS_POINT_OF_SALE_ID = "direct";

/** Default nightly PKR when sheet/env override is not set (lowest villa tier). */
export function getDefaultNightlyRatePkr(): number {
  const raw = process.env.GOOGLE_HOTELS_BASE_RATE_PKR?.trim();
  const n = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 45_000;
}

export function getTaxRate(): number {
  const raw = process.env.GOOGLE_HOTELS_TAX_RATE?.trim();
  const n = raw ? Number.parseFloat(raw) : NaN;
  return Number.isFinite(n) && n >= 0 && n <= 1 ? n : 0.16;
}

/** How many future check-in days to emit in the price feed (Google requires ~90). */
export function getPriceFeedHorizonDays(): number {
  const raw = process.env.GOOGLE_HOTELS_HORIZON_DAYS?.trim();
  const n = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n >= 30 && n <= 365 ? n : 90;
}

export function getBookLandingUrl(): string {
  const origin = getSiteOrigin();
  return `${origin}/book?checkin=CHECKINDATETIME&checkout=CHECKOUTDATETIME&source=google`;
}
