import type { Metadata } from "next";
import VillasHero from "@/components/VillasHero";
import VillasPageContent from "@/components/villas/VillasPageContent";
import MomentsSection from "@/components/MomentsSection";
import ReserveSection from "@/components/ReserveSection";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Villas Bhurban Murree - Book Now | Himalaya Villas & Resorts",
  description:
    "Book private villas in Bhurban, Murree with panoramic Himalayan views, private terraces & full-family layouts. See rooms, rates & reviews — reserve today.",
  path: "/villas",
  keywords: [
    "luxury villas Bhurban Murree",
    "private villas Murree",
    "book villa Bhurban",
    "Himalaya Villas",
    "mountain villa stay Pakistan",
  ],
  ogImage: "/assets/gallery-exterior.jpg",
  appendSiteBrand: false,
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Luxury Villas in Bhurban Murree",
  itemListElement: [
    { "@type": "ListItem", position: 1, url: absoluteUrl("/villas/apartment-single-luxury") },
    { "@type": "ListItem", position: 2, url: absoluteUrl("/villas/apartment-complete") },
    { "@type": "ListItem", position: 3, url: absoluteUrl("/villas/rakaposhi-single-executive") },
    { "@type": "ListItem", position: 4, url: absoluteUrl("/villas/rakaposhi-executive-suite") },
    { "@type": "ListItem", position: 5, url: absoluteUrl("/villas/rakaposhi-complete-villa") },
    { "@type": "ListItem", position: 6, url: absoluteUrl("/villas/luxury-attic") },
    { "@type": "ListItem", position: 7, url: absoluteUrl("/villas/luxury-single") },
    { "@type": "ListItem", position: 8, url: absoluteUrl("/villas/luxury-suite") },
    { "@type": "ListItem", position: 9, url: absoluteUrl("/villas/luxury-complete-villa") },
  ],
};

const VillasPage = () => {
  return (
    <div className="min-h-screen">
      <JsonLd items={[{ id: "hv-jsonld-villas-itemlist", data: itemListJsonLd }]} />
      <VillasHero />
      <VillasPageContent />
      <MomentsSection />
      <ReserveSection />
      <Footer />
    </div>
  );
};

export default VillasPage;
