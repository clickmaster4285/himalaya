import type { Metadata } from "next";
import Link from "next/link";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Dining in Bhurban | Private Villa Culinary Experience",
  description:
    "Enjoy luxury dining in Bhurban with private chef support, curated menus, and mountain-view meals tailored for families, couples, and events.",
  path: "/dining",
  ogImage: "/assets/gallery-dining-night.jpg",
  keywords: ["luxury dining Bhurban", "private chef Murree", "villa dining experience Pakistan"],
});

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <JsonLd
        items={[
          {
            id: "hv-jsonld-dining-service",
            data: {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Private dining at Himalaya Premium Villas",
              serviceType: "Curated in-villa dining and event catering",
              areaServed: "Bhurban, Murree, Pakistan",
            },
          },
        ]}
      />
      <DetailNavbar />
      <main className="mx-auto max-w-[1000px] px-6 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">Luxury Dining in Bhurban</h1>
        <p className="mt-5 text-[15px] leading-8 text-neutral-700">
          Dining is often the emotional center of a mountain stay. At Himalaya Premium Villas, we treat meals as
          curated experiences, not routine service slots. The objective is simple: deliver food, atmosphere, and timing
          that match the purpose of your trip. Whether you are here for family leisure, couple downtime, or a hosted
          gathering, the dining flow is built around your schedule and preferences.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          In Bhurban, setting quality matters as much as menu quality. Mountain views, cleaner air, and slower evening
          pacing naturally elevate mealtime experience. Our private format helps groups avoid crowded dining rooms and
          rigid service windows, making every meal feel intentional and comfortable.
        </p>

        <h2 className="mt-10 font-display text-2xl text-neutral-900">What the dining experience includes</h2>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Guests can request customized dining plans for breakfast, lunch, dinner, and special moments. This includes
          family-focused meal pacing, celebration dinners, and premium evening setups. The format is especially useful
          for groups with mixed tastes, children, or elders because adjustments can be coordinated in advance.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700">
          <li>Private villa dining with flexible service windows.</li>
          <li>Menu planning support based on guest profile and trip purpose.</li>
          <li>Event-compatible catering potential for milestone gatherings.</li>
          <li>Calm premium ambiance without external crowd disruption.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-neutral-900">Who this is ideal for</h2>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Couples generally prefer terrace-style evening sessions and slower curated dinners. Families benefit from
          practical flexibility and comfort-focused meal timing. Corporate groups often combine structured sessions with
          premium dining breaks that support informal decision-making and relationship building. For weddings and private
          events, this dining model also integrates naturally with celebration planning and guest hospitality.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          If you are planning a complete destination experience, combine this page with{" "}
          <Link href="/weddings" className="font-medium text-[#8b6914] underline underline-offset-4">
            wedding hosting
          </Link>{" "}
          or{" "}
          <Link href="/corporate-retreats" className="font-medium text-[#8b6914] underline underline-offset-4">
            corporate retreat planning
          </Link>{" "}
          for a unified premium itinerary.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          From a guest-experience perspective, curated dining also improves the perceived value of the full stay.
          Memorable food moments anchor the emotional highlights of a trip, especially when paired with mountain
          sunsets, private conversations, and celebration milestones. Instead of treating meals as a logistical
          requirement, this approach turns dining into a conversion-driving differentiator for premium Bhurban travel.
          It is one of the most effective ways to elevate both leisure stays and hosted event journeys.
        </p>

        <div className="mt-12 rounded-lg border border-[#eadfce] bg-white p-6">
          <h3 className="text-xl font-semibold text-neutral-900">Plan your dining experience</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Share your group size, preferred cuisine style, and dates. We will help you shape a dining plan that fits
            your stay and event schedule.
          </p>
          <a
            href={buildWhatsAppBookingUrl("a private dining experience in Bhurban")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center bg-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-800"
          >
            Plan Dining on WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

