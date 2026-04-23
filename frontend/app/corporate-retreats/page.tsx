import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Corporate Retreats in Bhurban | Private Executive Venue",
  description:
    "Host corporate retreats in Bhurban with private venue space, executive stay comfort, focused strategy sessions, and premium hospitality support.",
  path: "/corporate-retreats",
  ogImage: "/assets/amenities-interior-real.jpg",
  keywords: ["corporate retreat Bhurban", "executive offsite Murree", "private business venue Pakistan"],
});

export default function CorporateRetreatsPage() {
  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <JsonLd
        items={[
          {
            id: "hv-jsonld-corporate-service",
            data: {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Corporate retreats at Himalaya Premium Villas",
              serviceType: "Executive offsite and retreat hosting",
              areaServed: "Bhurban, Murree, Pakistan",
            },
          },
        ]}
      />
      <Navbar />
      <main className="mx-auto max-w-[1000px] px-6 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">Corporate Retreats in Bhurban</h1>
        <p className="mt-5 text-[15px] leading-8 text-neutral-700">
          High-performing teams need environments that improve focus, trust, and clarity. Corporate retreats at
          Himalaya Premium Villas are designed for organizations that want strategic output without city-level
          distraction. The Bhurban setting creates a practical advantage: cooler weather, private movement, and a calm
          operational context where leadership discussions and team sessions become more effective.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Unlike busy hotel conference ecosystems, our private venue model helps teams maintain continuity across
          planning blocks, meals, and informal debriefs. This reduces transition friction and protects meeting quality.
          Whether you are running executive workshops, annual alignment sessions, or client relationship retreats, the
          space supports both productivity and hospitality outcomes in one place.
        </p>

        <h2 className="mt-10 font-display text-2xl text-neutral-900">Built for strategy, leadership, and team cohesion</h2>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Corporate retreat success usually depends on two factors: structure and atmosphere. We support both. Teams can
          run focused sessions in dedicated areas while still enjoying private downtime and high-comfort stay flow. This
          balance prevents decision fatigue and keeps participants engaged throughout multi-day programs.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700">
          <li>Private executive environment for confidential planning and leadership meetings.</li>
          <li>Flexible layouts for workshops, breakout sessions, and board-level strategy discussions.</li>
          <li>Integrated stay + hospitality model for smoother schedules and better team rhythm.</li>
          <li>Premium ambiance suitable for internal leadership and external client hosting.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-neutral-900">Typical retreat formats</h2>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Teams commonly book 2 to 4 day formats including goal-setting, roadmap reviews, and capability workshops. A
          strong retreat structure often includes morning strategy blocks, lighter afternoon collaboration sessions, and
          evening relationship-building over curated dining. This approach improves retention and execution quality after
          the team returns to regular operations.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          Another major benefit is alignment speed. In-office planning cycles are often interrupted by calls, urgent
          tasks, and fragmented attendance. A private retreat environment creates uninterrupted blocks where leadership
          can resolve priorities, finalize ownership, and lock execution direction in one cycle. For companies scaling
          teams or entering new planning phases, this level of focused collaboration produces measurable performance
          value after the retreat ends.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-neutral-700">
          If your retreat includes client engagement or celebration components, you can pair this page with our{" "}
          <Link href="/dining" className="font-medium text-[#8b6914] underline underline-offset-4">
            dining experiences
          </Link>{" "}
          and{" "}
          <Link href="/weddings" className="font-medium text-[#8b6914] underline underline-offset-4">
            premium event hosting framework
          </Link>{" "}
          for higher-end programming.
        </p>

        <div className="mt-12 rounded-lg border border-[#eadfce] bg-white p-6">
          <h3 className="text-xl font-semibold text-neutral-900">Book a corporate retreat consultation</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Send your team size, dates, and retreat goals. We will share a practical retreat structure with stay and
            service recommendations.
          </p>
          <a
            href={buildWhatsAppBookingUrl("a corporate retreat at Himalaya Villas")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center bg-neutral-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-800"
          >
            Plan Corporate Retreat on WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

