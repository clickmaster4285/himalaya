import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedVillas } from "@/lib/villas-fetch";
import { shouldUnoptimizeImageSrc, getValidImageSrc } from "@/lib/image-utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { absoluteUrl } from "@/lib/seo/site-config";
import VillasAccommodations from "@/components/VillasAccommodations";
import VirtualTourBookButton from "@/components/VirtualTourBookButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Virtual Tour - Himalaya Villas & Resorts Bhurban Murree",
  description:
    "Take a virtual tour of Himalaya Villas in Bhurban, Murree—explore luxury suites, mountain views & private terraces online before you book your stay.",
  path: "/virtual-tour",
  keywords: [
    "things to do in Bhurban Murree",
    "Bhurban travel experiences",
    "Murree activities guide",
    "luxury mountain getaway Pakistan",
  ],
  ogImage: "/assets/why-villa-view.jpg",
});

const heroBg = "/assets/why-villa-view.jpg";
const symphonyImg = "/assets/philosophy-interior.jpg";
const poolImg = "/assets/why-villa-private.jpg";
const journeyBg = "/assets/why-villa-garden.jpg";

export default async function ExperiencePage() {
  const villas = await getPublishedVillas();
  const villaCards = villas.slice(0, 6);
  const experiencesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Things to do in Bhurban Murree",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Nature walks and trails", url: absoluteUrl("/experience") },
      { "@type": "ListItem", position: 2, name: "Villa dining and relaxation", url: absoluteUrl("/book/dining") },
      { "@type": "ListItem", position: 3, name: "Scenic viewpoints and local tours", url: absoluteUrl("/blogs") },
    ],
  };

  return (
    <section  id="virtual-tour-section" className="min-h-screen bg-[#F6F1EA]">
      <JsonLd items={[{ id: "hv-jsonld-experience-itemlist", data: experiencesJsonLd }]} />
      
      {/* Hero Section - Mobile Responsive */}
      <section className="relative h-[400px] sm:h-[480px] md:h-[560px] lg:h-[640px] w-full overflow-hidden">
        <Image
          src={heroBg}
          alt="Mountain experiences in Bhurban Murree"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-3xl">
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              The Himalaya
              <br />
              Experience
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-6 text-white/80 text-[11px] sm:text-[12px] md:text-[13px] tracking-wide">
              Where luxury meets nature, and every moment becomes a cherished
              <br className="hidden sm:block" />
              memory
            </p>
          </div>
        </div>
      </section>

      {/* Symphony Section - Fixed Image Display */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Image Container - Will definitely show */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="bg-white border border-[#eadfce] p-3 sm:p-4 shadow-lg w-full max-w-[520px]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={symphonyImg}
                    alt="Himalaya Villas & Resorts philosophy interior design"
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 520px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-neutral-500">
                Himalaya Villas & Resorts
              </p>
              <h2 className="mt-3 sm:mt-4 md:mt-5 font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 leading-tight">
                A Symphony of <span className="italic text-[#c9a55b]">Nature</span> &amp;{" "}
                <span className="italic text-[#c9a55b]">Elegance</span>
              </h2>
              <p className="mt-4 sm:mt-5 md:mt-6 text-[11px] sm:text-[12px] md:text-[13px] text-neutral-600 leading-relaxed">
                Nestled in the pristine Himalayan ranges, our villas offer more than just accommodation—they provide a
                transformative experience. Every element has been thoughtfully designed to harmonize luxury with the raw
                beauty of nature.
                <br />
                <br />
                From the moment you arrive, you&apos;ll be immersed in a world where time slows down, where the air is
                pure, and where every sunrise brings new possibilities for adventure, relaxation, and rejuvenation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Plan Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-900">
            Your complete Bhurban experience plan
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-[15px] leading-7 sm:leading-8 text-neutral-700">
            Bhurban and nearby Murree offer a balanced mix of calm nature, panoramic drives, local food culture, and
            outdoor activities for all travel types. Start your day with fresh mountain air and short scenic walks
            around the estate before heading to local viewpoints and forest routes. During afternoons, families often
            prefer light sightseeing and relaxed dining, while couples may choose quieter nature spots and private villa
            downtime. In the evening, the region is ideal for slow-paced conversations, tea sessions, and weather-led
            experiences that are difficult to recreate in urban destinations.
          </p>
          
          <h3 className="mt-6 sm:mt-7 md:mt-8 text-lg sm:text-xl font-semibold text-neutral-900">
            Recommended itinerary blocks
          </h3>
          <ul className="mt-3 sm:mt-4 list-disc space-y-1.5 sm:space-y-2 pl-5 sm:pl-6 text-sm sm:text-[15px] leading-7 sm:leading-8 text-neutral-700">
            <li>Morning: short trails, sunrise viewpoints, and local breakfast stops.</li>
            <li>Afternoon: family-friendly outings, light exploration, and estate relaxation.</li>
            <li>Evening: curated dining, private villa leisure time, and mountain sunset sessions.</li>
            <li>Day-two options: nearby attractions, guided local routes, and photography spots.</li>
          </ul>
          
          <p className="mt-5 sm:mt-6 text-sm sm:text-[15px] leading-7 sm:leading-8 text-neutral-700">
            If you are planning your stay around activities first, compare available residences in{" "}
            <Link href="/villas" className="font-medium text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
              our villa collection
            </Link>
            , then lock in dates via{" "}
            <Link href="/book/stay" className="font-medium text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
              Book Your Stay
            </Link>
            . For deeper destination planning and insider recommendations, explore our latest{" "}
            <Link href="/blogs" className="font-medium text-[#8b6914] underline underline-offset-4 hover:text-[#6d5210] transition-colors">
              Bhurban travel blogs
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pool / Rating Section */}
      {/* <section className="relative h-[320px] sm:h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden">
        <Image 
          src={poolImg} 
          alt="Luxury pool experience" 
          fill 
          sizes="100vw" 
          className="object-cover object-center" 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-end pb-6 sm:pb-8 md:pb-10">
          <div className="bg-white/95 backdrop-blur-sm border border-[#eadfce] p-4 sm:p-5 w-[200px] sm:w-[220px] md:w-[260px] shadow-lg">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-500">4.8 / 5</p>
            <p className="mt-1 sm:mt-2 font-display italic text-[11px] sm:text-[12px] md:text-[13px] text-neutral-900">
              Guest Rating
            </p>
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-[11px] md:text-[12px] text-neutral-600 italic">
              &quot;An Unforgettable Experience&quot;
            </p>
          </div>
        </div>
      </section> */}

      <VillasAccommodations/>
      {/* Begin Journey CTA Section */}
         {/* Begin Journey CTA Section - Now using the component */}
      <VirtualTourBookButton 
        backgroundImage={journeyBg}
        title="Begin Your Journey"
        subtitle="Today"
        buttonText="Book Now via WhatsApp"
        buttonLink="/book"
      />


      <Footer />
    </section>
  );
}