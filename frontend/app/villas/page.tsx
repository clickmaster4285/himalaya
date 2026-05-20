import type { Metadata } from "next";
import Link from "next/link";
import VillasHero from "@/components/VillasHero";
import VillaConfigurations from "@/components/VillaConfigurations";
import VillasSection from "@/components/VillasSection";
import MomentsSection from "@/components/MomentsSection";
import ReserveSection from "@/components/ReserveSection";
import VillasCtaGroup from "@/components/VillasCtaGroup";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import { getPublishedVillas } from "@/lib/villas-fetch";

export const metadata: Metadata = createPageMetadata({
  title: "Private Luxury Villas in Bhurban | Book Murree Stays",
  description:
    "Explore villas in bhurban murree and private suites at Himalaya Premium Villas — a premium alternative to any hotel in bhurban, bhurban hotel murree listings, and crowded bhurban hotels.",
  path: "/villas",
  keywords: [
    "hotel in bhurban",
    "bhurban hotel murree",
    "bhurban hotels",
    "best hotel in bhurban",
    "resort in bhurban",
    "best hotels in bhurban murree",
    "bhurban best hotels",
    "villas in bhurban murree",
    "luxury villas Bhurban",
    "Himalaya Premium Villas",
  ],
  ogImage: "/assets/gallery-exterior.jpg",
});

export const dynamic = "force-dynamic";

const VillasPage = async () => {
  const villas = await getPublishedVillas();
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
        <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">
          Villas in Bhurban Murree — Private Stays Above the Crowds
        </h1>
        <p className="mt-6 max-w-4xl text-[15px] leading-8 text-neutral-700">
          If you have been comparing a <strong>bhurban hotel murree</strong> option with shared lobbies and fixed
          check-in times, our <strong>villas in bhurban murree</strong> offer a different rhythm: full living spaces,
          mountain-facing terraces, and hospitality planned around your group — not a front desk queue. Himalaya
          Premium Villas sits in the pine hills above Murree town, designed for families, couples, and private
          celebrations who want the estate to themselves.
        </p>

        <VillasCtaGroup
          className="mt-10"
          title="Ready to reserve your villa?"
          subtitle="Pick dates on our booking page or message us on WhatsApp for suite and full-estate rates."
        />

        <h2 className="mt-12 font-display text-2xl text-neutral-900">
          More space than a typical hotel in bhurban
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          A standard <strong>hotel in bhurban</strong> works when you need one or two rooms for a short night. When the
          trip is about everyone gathering — cousins, parents, children, in-laws — a private villa layout keeps meals,
          lounging, and late conversations under one roof. Choose an individual suite for smaller groups or reserve
          the complete villa when you want every bedroom and terrace for your party alone.
        </p>

        <h2 className="mt-12 font-display text-2xl text-neutral-900">
          How we compare with bhurban hotels &amp; resorts
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Travellers browsing <strong>bhurban hotels</strong> or a <strong>resort in bhurban</strong> often ask for the
          same things: cool weather, views, and easy access from Islamabad. We deliver that setting with an important
          difference — the property is booked for your group, so there are no strangers in the corridor or competing
          restaurant timings. For guests who want the <strong>best hotel in bhurban</strong> experience without hotel
          compromises, our suites and lodges combine villa privacy with staffed dining and concierge support.
        </p>

        <h2 className="mt-12 font-display text-2xl text-neutral-900">
          Recognized among the best hotels in Bhurban Murree
        </h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Himalaya Villas is proudly recognized among the best hotels in Bhurban Murree for luxury stays, family
          vacations, and corporate retreats. If you are searching for the best hotels in Bhurban Murree with
          breathtaking mountain views, our estate offers an unforgettable premium experience — ranked among the best
          hotels in Bhurban Murree for luxury interiors, peaceful surroundings, and exceptional hospitality.
        </p>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Families looking for the best hotels in Bhurban Murree choose Himalaya Villas for spacious suites, a scenic
          environment, and private comfort. We stand out as one of the best hotels in Bhurban Murree for weddings,
          private events, and luxury group stays — experience premium hospitality at a property designed for travellers
          who want elegance without shared corridors.
        </p>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Among the best hotels in Bhurban Murree, we offer a unique blend of private luxury villas and resort-style
          amenities. Travellers visiting Murree often consider us one of the best hotels in Bhurban Murree for peaceful,
          secure family stays — with limited monthly bookings, in-villa meals, and terraces for photography and bonfire
          evenings. Discover why Himalaya Villas is counted among the best hotels in Bhurban Murree for luxury
          vacations and weekend getaways, and why guests describe our care as a world-class hospitality experience for
          local and international visitors alike.
        </p>

        <VillasCtaGroup
          variant="banner"
          className="mt-12"
          title="Limited bookings each month"
          subtitle="Secure Suite 1, Suite 2, or the complete villa before your Eid, wedding, or family weekend fills up."
        />

        <h2 className="mt-12 font-display text-2xl text-neutral-900">Choose the right villa for your trip</h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-8 text-neutral-700">
          Start with group size and purpose. Families benefit from lodge-style bedrooms and shared lounges; couples
          often prefer sunset-facing suites; executive groups need larger indoor-outdoor zones for meetings and retreats.
          Explore activities from our{" "}
          <Link href="/experience" className="font-medium text-[#8b6914] underline underline-offset-4">
            Bhurban experience guide
          </Link>{" "}
          or read planning notes in our{" "}
          <Link href="/blogs" className="font-medium text-[#8b6914] underline underline-offset-4">
            travel journal
          </Link>
          . For a broader look at estate stays versus shared properties, see{" "}
          <Link href="/hotels-in-bhurban" className="font-medium text-[#8b6914] underline underline-offset-4">
            hotels in Bhurban
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
          Compare live availability and complete your reservation on{" "}
          <Link href="/book/stay" className="font-medium text-[#8b6914] underline underline-offset-4">
            Book Your Stay
          </Link>
          . Our team replies on WhatsApp with clear pricing for suites or the full estate — ideal when you have
          outgrown typical hotel rooms but still want five-star care in the Murree Hills.
        </p>

        <VillasCtaGroup
          className="mt-10"
          title="Compare suites & book direct"
          subtitle="No hidden fees — confirm availability and pricing with our team in one conversation."
        />
      </section>
      <VillaConfigurations />
      <VillasSection initialVillas={villas} />
      <MomentsSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default VillasPage;
