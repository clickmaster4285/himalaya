import Link from "next/link";
import BookingCtaStrip from "@/components/book-page/BookingCtaStrip";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

const BOOK_WHATSAPP = buildWhatsAppBookingUrl();
const VILLAS_WHATSAPP = buildWhatsAppBookingUrl("villas in bhurban murree");

export default function BookingKeywordSections() {
  return (
    <section className="bg-white px-6 py-20 md:py-28 border-b border-[#eae3d5]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <div>
          <div className="flex items-center gap-3 text-[#c9a55b] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="h-[1px] w-8 bg-[#c9a55b]" />
            <span>PLAN YOUR STAY</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1b261b] leading-[1.1] tracking-tight">
            Book beyond a typical
            <span className="block italic text-[#c9a55b] font-light mt-1">hotel in bhurban</span>
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-light max-w-3xl">
            If you are comparing a bhurban hotel murree room with limited privacy, Himalaya Premium
            Villas offers private suites and full-estate bookings in the Murree Hills — staffed dining, mountain
            terraces, and direct rates without OTA commissions. Most guests from Islamabad and Rawalpindi reach us in
            about 90 minutes via the Murree Expressway.
          </p>
          <BookingCtaStrip
            className="mt-8"
            buttons={[
              {
                label: "Book villas in bhurban murree",
                href: "/book/stay",
                variant: "dark",
              },
              {
                label: "WhatsApp: bhurban hotel murree rates",
                href: BOOK_WHATSAPP,
                external: true,
                variant: "whatsapp",
              },
              { label: "View all villas", href: "/villas", variant: "outline" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
              Bhurban hotels vs private villa hire
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-light mb-4">
              Lists of bhurban hotels and a shared resort in bhurban often mean one
              room, shared breakfast timing, and other guests in the corridor. When you book the estate for your
              group, you choose suite layouts, meal schedules, and outdoor time without competing for restaurant
              tables.
            </p>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-light">
              Families, honeymoon couples, and corporate retreats use this page to compare options before confirming on{" "}
              <Link href="/book/stay" className="font-semibold text-[#8b6914] underline underline-offset-4">
                Book Your Stay
              </Link>{" "}
              or WhatsApp — we reply with availability and a clear package outline.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-[#1b261b] mb-4">
              Among the best hotels in bhurban murree — privately
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-light mb-4">
              Rankings of the best hotels in bhurban murree and bhurban best hotels{" "}
              focus on star ratings and room counts. We focus on exclusivity: limited overlapping bookings, in-villa
              meals, prayer and event coordination when needed, and the calm of a pine-forest ridge above Murree town.
            </p>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-light">
              Want the service polish associated with the best hotel in bhurban but with villa-level
              space? Message us with dates and guest count — peak Eid and summer weekends fill early.
            </p>
          </div>
        </div>

        <BookingCtaStrip
          title="Hold your dates before peak season fills"
          subtitle="Direct booking — best rate, human reservations, flexible changes on most stays."
          buttons={[
            {
              label: "Reserve best hotel in bhurban style stay",
              href: VILLAS_WHATSAPP,
              external: true,
              variant: "gold",
            },
            {
              label: "Compare hotels in Bhurban guide",
              href: "/hotels-in-bhurban",
              variant: "outline",
            },
            {
              label: "Ask about resort in bhurban private hire",
              href: BOOK_WHATSAPP,
              external: true,
              variant: "whatsapp",
            },
          ]}
        />
      </div>
    </section>
  );
}
