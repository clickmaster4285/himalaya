import type { Metadata } from "next";
import Link from "next/link";
import VillasHero from "@/components/VillasHero";
import VillaConfigurations from "@/components/VillaConfigurations";
import VillasSection from "@/components/VillasSection";
import MomentsSection from "@/components/MomentsSection";
import ReserveSection from "@/components/ReserveSection";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Private Luxury Villas in Bhurban | Book Murree Stays",
  description:
    "Explore luxury villas in Bhurban Murree with private suites, family lodges, and scenic mountain stays. Compare amenities, pricing, and book direct.",
  path: "/villas",
  keywords: [
    "luxury villas in Bhurban",
    "Murree private villas",
    "book villa in Bhurban",
    "mountain stay Pakistan",
  ],
  ogImage: "/assets/gallery-exterior.jpg",
});

const VillasPage = () => {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Luxury Villas in Bhurban Murree",
    itemListElement: [
      { "@type": "ListItem", position: 1, url: absoluteUrl("/villas") },
      { "@type": "ListItem", position: 2, url: absoluteUrl("/book/stay") },
      { "@type": "ListItem", position: 3, url: absoluteUrl("/experience") },
    ],
  };

  return (
    <div className="min-h-screen">
      <JsonLd items={[{ id: "hv-jsonld-villas-itemlist", data: itemListJsonLd }]} />
      <VillasHero />
      <section className="mx-auto max-w-[1200px] px-6 py-14 md:px-12 md:py-20">
        <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">Luxury Villas in Bhurban Murree</h1>
        <p className="mt-6 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Discover private luxury villas in Bhurban designed for travelers who want space, privacy, and personalized
          hospitality in the Murree hills. Unlike standard hotel rooms, our villas offer full-living layouts, scenic
          mountain viewpoints, dedicated guest support, and premium amenities for families, couples, and private group
          stays. Whether you are planning a weekend retreat, a destination celebration, or a longer mountain workcation,
          this collection helps you compare villa styles, guest capacity, and experience quality in one place.
        </p>
        <h2 className="mt-10 font-display text-2xl text-neutral-900">Choose the right villa for your trip</h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Start with your group size and stay purpose. For families, larger lodge-style options provide multiple
          bedrooms and comfortable common areas. For couples, suites with panoramic views and elevated privacy create a
          calm atmosphere for anniversaries and special escapes. For executive and event travel, premium layouts with
          larger indoor-outdoor zones allow smoother hosting and a better guest experience. You can also explore
          activities near the estate from our{" "}
          <Link href="/experience" className="font-medium text-[#8b6914] underline underline-offset-4">
            Bhurban experience guide
          </Link>{" "}
          and read planning tips in our{" "}
          <Link href="/blogs" className="font-medium text-[#8b6914] underline underline-offset-4">
            travel journal
          </Link>
          .
        </p>
        <h3 className="mt-10 text-xl font-semibold text-neutral-900">What every villa booking includes</h3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-8 text-neutral-700">
          <li>Private accommodation with curated interiors and mountain-facing ambiance.</li>
          <li>Core comfort amenities for premium short and extended stays.</li>
          <li>Direct booking pathways for better communication and request handling.</li>
          <li>Fast access to sightseeing, local experiences, and seasonal hill attractions.</li>
        </ul>
        <p className="mt-6 max-w-4xl text-[15px] leading-8 text-neutral-700">
          To compare live availability and complete your reservation with date selection, continue to{" "}
          <Link href="/book/stay" className="font-medium text-[#8b6914] underline underline-offset-4">
            Book Your Stay
          </Link>
          . For travelers researching nearby attractions before booking, our destination content on Bhurban and Murree
          provides itinerary ideas, weather-aware planning tips, and seasonal recommendations.
        </p>
      </section>
      <VillaConfigurations />
      <VillasSection />
      <MomentsSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default VillasPage;
