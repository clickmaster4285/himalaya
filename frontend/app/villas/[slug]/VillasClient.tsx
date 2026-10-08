// app/villas/[slug]/VillasClient.tsx
"use client";

import { Check } from "lucide-react";
import { type Room } from "@/content/villas/villa-content";
import { buildWhatsAppVillaBookingUrl, buildWhatsAppVillaEnquiryUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";
import VillaRoomSeoContent from "@/components/VillaRoomSeoContent";

interface VillasClientProps {
  room: Room;
}

export default function VillasClient({ room }: VillasClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT: content */}
        <div className="lg:col-span-2 ">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-6">
              About This Stay
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {room.longDescription}
            </p>

            <h3 className="font-display text-2xl text-neutral-900 mb-6">
              Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {room.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c9a55b] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700">{h}</span>
                </div>
              ))}
            </div>

            {/* Amenities + SEO sections + FAQs */}
            <VillaRoomSeoContent room={room} />
          </div>
        </div>

        {/* RIGHT: booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c9a55b]">
              Per Night
            </p>

            <h3 className="mt-2 font-display text-4xl italic leading-none text-neutral-900">
              PKR {room.price}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Includes breakfast for 2 guests
            </p>

            <div className="mt-7 space-y-3">
              <a
                id="villa_book_now"
                href={buildWhatsAppVillaBookingUrl({
                  name: room.name,
                  tag: room.tag,
                  price: room.price,
                  href: room.slug,
                })}
                target="_blank"
                rel="noopener noreferrer"
                data-event-type="villa_book_now_click"
                onClick={(e) =>
                  trackAndOpen(
                    e,
                    buildWhatsAppVillaBookingUrl({
                      name: room.name,
                      tag: room.tag,
                      price: room.price,
                      href: room.slug,
                    }),
                    {
                      villa: room.name,
                      slug: room.slug,
                      tag: room.tag,
                      price: room.price,
                    }
                  )
                }
                className="flex w-full items-center justify-center rounded-lg bg-[#c9a55b] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-[#a98741]"
              >
                Book Now
              </a>

              <a
                id="villa_enquire"
                href={buildWhatsAppVillaEnquiryUrl({
                  name: room.name,
                  tag: room.tag,
                  price: room.price,
                  slug: room.slug,
                })}
                target="_blank"
                rel="noopener noreferrer"
                data-event-type="villa_enquiry_click"
                onClick={(e) =>
                  trackAndOpen(
                    e,
                    buildWhatsAppVillaEnquiryUrl({
                      name: room.name,
                      tag: room.tag,
                      price: room.price,
                      slug: room.slug,
                    }),
                    {
                      villa: room.name,
                      slug: room.slug,
                      tag: room.tag,
                      price: room.price,
                    }
                  )
                }
                className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-900 transition duration-300 hover:border-[#c9a55b] hover:bg-[#faf7f1]"
              >
                Enquire
              </a>
            </div>

            <div className="my-7 h-px bg-gray-200" />

            <dl className="space-y-4">
              {room.details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-gray-500">{d.label}</dt>
                  <dd className="text-right text-sm font-medium text-neutral-900">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500 max-w-xl mx-auto">
            Max 3 persons per room with the option of 1 extra mattress
            (additional charges apply). Rates include complimentary breakfast for
            2 guests per room.
          </p>
        </div>
      </div>
    </div>
  );
}