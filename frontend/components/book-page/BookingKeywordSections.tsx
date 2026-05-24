import Link from "next/link";
import BookingCtaStrip from "@/components/book-page/BookingCtaStrip";
import EventInfoCards from "@/components/EventInfoCards";
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
            If you are comparing a bhurban hotel murree room with limited privacy, Himalaya Premium Villas offers
            private suites and full-estate bookings in the Murree Hills. For travelers who value comfort, scenery, and
            privacy, we remain one of the best hotels in Bhurban Murree — with staffed dining, mountain terraces, and
            direct rates without OTA commissions. Most guests from Islamabad reach us in about 90 minutes.
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
              Direct booking benefits
            </h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-light mb-4">
              Limited overlapping bookings, in-villa meals, prayer and event coordination when needed, and the calm of a
              pine-forest ridge above Murree town — the exclusivity guests expect from the best hotel in bhurban, with
              villa-level space for your whole group.
            </p>
            <p className="text-[14px] text-neutral-600 leading-relaxed font-light">
              Message us with dates and guest count on this page or WhatsApp — peak Eid and summer weekends fill early.
            </p>
          </div>
        </div>

        <EventInfoCards
          title="Among the best hotels in Bhurban Murree"
          subtitle="Why guests book Himalaya Villas instead of a standard bhurban hotel murree room."
          cards={[
            {
              title: "Comfort, scenery & privacy",
              description:
                "For travelers who value comfort, scenery, and privacy, Himalaya Villas remains one of the best hotels in Bhurban Murree — book direct for clear packages and the lowest available rates.",
            },
            {
              title: "Luxury near Murree Hills",
              description:
                "Himalaya Villas is among the best hotels in Bhurban Murree for guests seeking luxury stays near the natural beauty of the Murree Hills, with private villas and estate-wide hospitality.",
            },
            {
              title: "Mountain charm & modern luxury",
              description:
                "Combining mountain charm with modern luxury, Himalaya Villas continues to be recognized among the best hotels in Bhurban Murree for family breaks, honeymoons, and corporate retreats.",
            },
          ]}
        />

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
