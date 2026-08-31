"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";
import { trackAndOpen } from "@/lib/trackedClick";
import VillasAccommodations from "@/components/VillasAccommodations";

const villaBenefits = [
  "No shared corridors or lobby crowding — your unit is self-contained.",
  "A private terrace facing the Himalayan range, not a window facing a parking lot or another building.",
  "Flexible dining — in-villa or terrace dining on request, instead of a fixed hotel restaurant slot.",
  "Space for children to actually play, rather than a single room with two beds.",
  "Central heating, which matters more than people expect once Bhurban's evening temperature drops.",
];

const bookingIncludes = [
  "Private accommodation with curated interiors and mountain-facing rooms",
  "Complimentary breakfast for two guests per room",
  "Central heating for comfortable stays year-round, including winter",
  "Free WiFi and smart TVs with streaming access in every villa",
  "Direct booking via WhatsApp, with a concierge available to handle requests",
  "Halal, multi-cuisine dining available in-villa or on the terrace",
];

const tripFit = [
  {
    title: "Couples and honeymooners",
    text: "Usually do best in the Rakaposhi Executive Suite or the Luxury Suite — both pair a private sitting area with panoramic views, which works well for anniversaries.",
  },
  {
    title: "Families of 4–10",
    text: "Generally book a complete villa (Rakaposhi or luxury collection) so children have room to move without disturbing anyone outside the family group, and meal timing stays flexible instead of tied to a hotel breakfast window.",
  },
  {
    title: "Corporate groups of 10–50",
    text: "Can use the Complete Villa along with our private boardroom, which comes with AV equipment, conference WiFi, and full-day catering — a genuinely different setup from a city hotel meeting room, since the whole retreat happens outdoors and indoors on one private property.",
  },
  {
    title: "Solo travelers or short overnight stops",
    text: "Are better served by a single executive room or single luxury room, which keep the cost down without losing the mountain view.",
  },
];

const faqs = [
  {
    q: "What's the difference between a room and a full villa booking?",
    a: "A room booking (like the Single Executive Room) gives you one unit within a shared villa building, still fully private, with its own bathroom and entrance. A complete villa booking reserves the entire building—every room, the living areas, and the garden—exclusively for your group.",
  },
  {
    q: "Is breakfast included in the room rate?",
    a: "Yes. Every rate includes complimentary breakfast for two guests per room. Additional guests can add breakfast for an extra charge.",
  },
  {
    q: "How many people can stay in one room?",
    a: "Each room accommodates a maximum of 3 persons, with the option to add one extra mattress for an additional charge.",
  },
  {
    q: "How far is Himalaya Villas from Islamabad?",
    a: "The property is around a 1.5 to 2-hour drive from Islamabad, depending on traffic on the Kashmir Highway and Murree Expressway.",
  },
];

export default function VillasPageContent() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-12 md:py-20">
        <h2 className="font-display text-4xl text-neutral-900 md:text-5xl leading-tight">
          Luxury Villas in Bhurban, Murree — Private Stays with Full Mountain Views
        </h2>
        <p className="mt-6 max-w-4xl text-[15px] leading-8 text-neutral-700">
          If you&apos;re comparing hotel rooms in Murree against something more private, a villa changes the
          equation. Himalaya Villas &amp; Resorts sits in Bhurban — 8 km above Murree town, on a ridge that
          catches unobstructed views of the Himalayan foothills. Instead of a hotel room off a shared corridor,
          you get a private villa unit with its own terrace, living space, and — depending on the option you
          pick — an entire building to yourself.
        </p>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          This guide walks through every villa and room category we offer, current rates, what&apos;s included,
          and how to decide which one fits your trip.
        </p>

        <h2 className="mt-12 font-display text-3xl text-neutral-900 md:text-4xl">
          Why a Private Villa Beats a Standard Hotel Room in Murree
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Most hotels in Murree, especially the ones clustered around Mall Road, sell you a room: one door off
          a shared hallway, a shared lobby, and a fixed breakfast timing in a communal dining hall. That works
          fine for a quick overnight stop, but it&apos;s a different experience from what families, couples, and
          groups usually want out of a hill retreat.
        </p>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          A villa stay at Himalaya Villas gives you:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700 max-w-4xl">
          {villaBenefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <VillasAccommodations hideViewAllLink />

      <section className="mx-auto max-w-[1200px] px-6 pb-14 md:px-12 md:pb-20">
        <h2 className="font-display text-3xl text-neutral-900 md:text-4xl">
          What Every Villa Booking Includes
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700 max-w-4xl">
          {bookingIncludes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          If you need an extra mattress, that&apos;s available on request for an additional charge — useful for
          families travelling with a third child or an extra guest per room.
        </p>

        <h2 className="mt-12 font-display text-3xl text-neutral-900 md:text-4xl">
          Which Villa Fits Your Trip
        </h2>
        <div className="mt-6 space-y-5 max-w-4xl">
          {tripFit.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-1 text-[15px] leading-8 text-neutral-700">{item.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-3xl text-neutral-900 md:text-4xl">
          Location: Why Bhurban Over Murree Mall Road
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Bhurban is roughly 11 km from Murree Mall Road — about 15–20 minutes by car on a well-maintained,
          scenic road. Most guests staying in Bhurban still make day trips down to Mall Road for shopping and
          street food but return to Bhurban for the quiet and the view.
        </p>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          If your priority is nightlife and walkable markets, Mall Road hotels have the edge. If your priority
          is a peaceful stay with a private terrace and clean mountain air, Bhurban wins — and it&apos;s also
          closer to Patriata (New Murree) and Ayubia National Park for day excursions.
        </p>

        <h2 className="mt-12 font-display text-3xl text-neutral-900 md:text-4xl">How to Book</h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Bookings are handled directly via WhatsApp for personalized assistance—you can check live
          availability, ask about current offers, and confirm your room or villa in a single conversation.
          Direct booking through himalayavillas.com typically gives better rates and more package flexibility
          than third-party platforms.
        </p>
        <div className="mt-8">
          <a
            href={buildWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-event-type="book_now_click"
            onClick={(e) =>
              trackAndOpen(e, buildWhatsAppBookingUrl(), { button: "book_now", cta: "villas_page" })
            }
            className="inline-flex items-center justify-center rounded-sm border border-neutral-900 bg-neutral-900 px-8 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-neutral-800"
          >
            Book Now
          </a>
        </div>
      </section>

      <section className="bg-background py-16 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-neutral-900 md:text-4xl text-center mb-10">FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`villas-faq-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-base md:text-lg font-normal hover:text-primary py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
