"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-contact";

export default function LocationMap() {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <h2 className="flex items-center gap-2 bg-[#c9a96b] px-5 py-3.5 text-base font-semibold text-white">
        <MapPin className="h-4 w-4" />
        Location
      </h2>
      <div className="aspect-video w-full bg-[#e8e4dc]">
        <iframe
          title="Himalaya Villas & Resorts on Google Maps"
          src="https://www.google.com/maps?q=33.9562%2C73.3850&z=15&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-2 px-5 py-4 text-center sm:flex-row sm:text-left">
        <span className="text-sm font-semibold text-neutral-800">Himalaya Villas & Resorts</span>
        <a
          href={SITE_CONTACT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8b6914] transition hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Google Maps — Directions &amp; Reviews
        </a>
      </div>
    </section>
  );
}
