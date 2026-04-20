import type { Metadata } from "next";
import Link from "next/link";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Wedding Venue in Bhurban | Himalaya Villas",
  description:
    "Plan your destination wedding in Bhurban with private luxury venue space, curated decor, premium hospitality, and personalized event coordination.",
  path: "/weddings",
  ogImage: "/assets/services-events-real.jpg",
  keywords: ["wedding venue Bhurban", "destination wedding Murree", "luxury wedding villa Pakistan"],
});

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <JsonLd
        items={[
          {
            id: "hv-jsonld-weddings-service",
            data: {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Destination weddings at Himalaya Premium Villas",
              serviceType: "Wedding venue and event hospitality",
              areaServed: "Bhurban, Murree, Pakistan",
            },
          },
        ]}
      />
      <DetailNavbar />
      <main className="mx-auto max-w-[1000px] px-6 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">Luxury Wedding Venue in Bhurban</h1>
        <p className="mt-5 text-[15px] leading-8 text-neutral-700">
          A destination wedding should feel deeply personal, visually unforgettable, and operationally effortless for
          the families involved. At Himalaya Premium Villas, we host weddings in a private mountain estate setting that
          replaces generic banquet flow with atmosphere, exclusivity, and refined hospitality. The Bhurban location
          gives you a naturally cinematic backdrop: elevated views, cool weather, and premium open-air energy that
          transforms both day and night functions into high-impact experiences.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          What couples value most here is control without complexity. Instead of splitting events across crowded
          commercial spaces, you can coordinate key moments within one private ecosystem. That means smoother guest
          movement, better event continuity, and fewer last-minute compromises. From intimate nikah setups to large
          family celebrations, the venue supports flexible layouts while preserving a coherent luxury identity.
        </p>

        <h2 className="mt-10 font-display text-2xl text-neutral-900">What the wedding experience includes</h2>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Our wedding support model is built around planning clarity. You can align decor direction, service flow,
          staging priorities, and guest hospitality requirements before event week, reducing operational stress during
          execution. Families typically coordinate multi-function timelines including welcome gatherings, signature
          dinners, ceremony events, and post-event recovery sessions.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700">
          <li>Private estate atmosphere for premium wedding privacy and cleaner guest experience.</li>
          <li>Flexible indoor-outdoor event potential with mountain-facing visual depth.</li>
          <li>Curated hospitality support for family comfort, vendor flow, and on-day coordination.</li>
          <li>Space suitable for both intimate premium ceremonies and larger destination functions.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-neutral-900">Why couples choose Bhurban for destination weddings</h2>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Bhurban offers a practical advantage over urban wedding zones: climate quality, scenic value, and a slower
          emotional pace that improves guest presence and event memory. Families can turn wedding travel into a complete
          premium stay, not just a single event day. This creates stronger shared moments and better content value for
          photography, films, and family storytelling.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Operationally, destination weddings also benefit from tighter guest concentration. When close relatives and
          key guests remain in the same environment, communication quality improves and timeline drift is reduced. This
          is particularly important for multi-event formats where ceremonies, dinners, and social moments are spread
          across different time windows. A private estate framework supports that continuity while preserving the luxury
          atmosphere couples expect from a premium Bhurban wedding experience.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          For couples evaluating wedding venues in Bhurban and Murree, the strongest decision criteria are venue
          privacy, service adaptability, and hospitality consistency. Himalaya Premium Villas is designed around these
          outcomes. You can also explore our{" "}
          <Link href="/corporate-retreats" className="font-medium text-[#8b6914] underline underline-offset-4">
            corporate retreats
          </Link>{" "}
          and{" "}
          <Link href="/dining" className="font-medium text-[#8b6914] underline underline-offset-4">
            curated dining services
          </Link>{" "}
          for pre/post wedding events.
        </p>

        <div className="mt-12 rounded-lg border border-[#eadfce] bg-white p-6">
          <h3 className="text-xl font-semibold text-neutral-900">Plan your wedding consultation</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Share your expected guest count, preferred dates, and event type. Our team will help you design a wedding
            flow that matches your style and timeline.
          </p>
          <a
            href={buildWhatsAppBookingUrl("a destination wedding at Himalaya Villas")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center bg-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-800"
          >
            Plan Your Wedding on WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

