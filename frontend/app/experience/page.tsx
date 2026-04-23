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

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Things to Do in Bhurban Murree | Luxury Experience Guide",
  description:
    "Discover top things to do in Bhurban Murree including hiking, viewpoints, dining, family activities, and curated villa experiences near Himalaya Villas.",
  path: "/experience",
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
    <div className="min-h-screen bg-[#F6F1EA]">
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
                    alt="Himalaya Villas philosophy interior design"
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
                Himalaya Villas
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
      <section className="relative h-[320px] sm:h-[380px] md:h-[480px] lg:h-[560px] overflow-hidden">
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
      </section>

      {/* Journey Cards Section */}
      <section className="bg-[#F6F1EA] py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900">
              Your <span className="italic text-[#c9a55b]">Journey</span> Awaits
            </h2>
            <p className="mt-2 sm:mt-3 text-[11px] sm:text-[12px] text-neutral-500 max-w-xl mx-auto lg:mx-0">
              Choose your perfect experience or continue multiple for an unforgettable stay
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {villaCards.map((v) => (
              <Link
                key={v.slug}
                href={`/villas/${v.slug}`}
                className="bg-white border border-[#eadfce] hover:bg-[#fbf8f2] transition-all duration-300 hover:shadow-lg group block"
              >
                <div className="relative h-[200px] sm:h-[180px] md:h-[170px] w-full overflow-hidden">
                  <Image
                    src={getValidImageSrc(v.image)}
                    alt={v.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={shouldUnoptimizeImageSrc(getValidImageSrc(v.image))}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-[15px] sm:text-[16px] text-neutral-900 line-clamp-1">
                    {v.title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[10px] sm:text-[11px] text-neutral-500 line-clamp-2">
                    {v.description}
                  </p>
                  <p className="mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-[11px] text-neutral-900 font-semibold">
                    {v.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/villas"
              className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 border border-neutral-900 text-neutral-900 text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Load More
            </Link>
          </div>
        </div>
      </section>

      {/* Begin Journey CTA Section */}
      <section className="relative h-[350px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden">
        <Image
          src={journeyBg}
          alt="Begin your journey at Himalaya Villas"
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center justify-center lg:justify-start text-center lg:text-left">
          <div>
            <h2 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Begin Your Journey
              <br />
              Today
            </h2>
            <Link
              href="/book"
              className="mt-5 sm:mt-6 md:mt-8 inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 border border-white/30 text-white text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              Book Now via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}