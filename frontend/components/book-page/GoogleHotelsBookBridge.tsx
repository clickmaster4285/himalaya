"use client";

import { Suspense } from "react";
import GoogleHotelsLandingTracker from "@/components/book-page/GoogleHotelsLandingTracker";

export default function GoogleHotelsBookBridge() {
  return (
    <Suspense fallback={null}>
      <GoogleHotelsLandingTracker />
    </Suspense>
  );
}
