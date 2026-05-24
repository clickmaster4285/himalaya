"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function parseGoogleDateParam(raw: string | null): string | null {
  if (!raw) return null;
  const value = raw.trim();
  if (!value) return null;
  const isoDate = value.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const d = new Date(`${isoDate}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : isoDate;
}

/**
 * Fires GTM `google_hotels_landing` when guests arrive from Google Hotels,
 * and forwards check-in / check-out to the stay booking flow.
 */
export default function GoogleHotelsLandingTracker() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const source = searchParams.get("source");
    if (source !== "google") return;

    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "google_hotels_landing",
      checkin,
      checkout,
      traffic_source: "google_hotels",
    });

    const checkinIso = parseGoogleDateParam(checkin);
    const checkoutIso = parseGoogleDateParam(checkout);
    if (!checkinIso || !checkoutIso) return;

    const qs = new URLSearchParams({
      checkin: checkinIso,
      checkout: checkoutIso,
      source: "google",
    });
    router.replace(`/book/stay?${qs.toString()}`);
  }, [router, searchParams]);

  return null;
}
