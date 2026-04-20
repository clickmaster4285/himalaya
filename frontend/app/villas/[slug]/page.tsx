import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVillaBySlugPublic } from "@/lib/villas-fetch";
import { shouldUnoptimizeImageSrc, getValidImageSrc } from "@/lib/image-utils";
import VillaAmenitiesSection from "@/components/VillaAmenitiesSection";
import VirtualExperienceSection from "@/components/VirtualExperienceSection";
import Footer from "@/components/Footer";
import DetailNavbar from "@/components/DetailNavbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { buildVillaVacationRentalJsonLd } from "@/lib/seo/villa-jsonld";
import { buildWhatsAppBookingUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type MaybePromise<T> = T | Promise<T>;

interface VillasDetailPageProps {
  params: MaybePromise<{ slug: string }>;
}

export async function generateMetadata({ params }: VillasDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const villa = await getVillaBySlugPublic(slug);
  if (!villa) return {};
  return createPageMetadata({
    title: `${villa.title} — Private villa, Bhurban`,
    description: villa.description,
    path: `/villas/${slug}`,
    keywords: [...villa.amenities.slice(0, 12), "Himalaya Villas", "Bhurban", "Murree"],
    ogImage: getValidImageSrc(villa.image),
  });
}

const VillaDetail = async ({ params }: VillasDetailPageProps) => {
  const { slug } = await params;
  const villa = await getVillaBySlugPublic(slug);

  if (!villa) {
    notFound();
  }

  const gallery = villa.gallery ?? [];
  const thumb0 = getValidImageSrc(gallery[0], "/assets/gallery-interior.jpg");
  const thumb1 = getValidImageSrc(gallery[1], "/assets/gallery-dining-night.jpg");
  const extraGallery = Math.max(0, gallery.length - 2);
  const villaFaqs = [
    {
      q: `What type of guests is ${villa.title} ideal for?`,
      a: `${villa.title} is ideal for couples, families, and small private groups seeking a luxury villa stay in Bhurban with scenic views, privacy, and curated hospitality.`,
    },
    {
      q: `What amenities are included in ${villa.title}?`,
      a: `Guests enjoy curated essentials such as high-comfort bedrooms, premium interiors, dedicated living space, mountain-facing ambiance, and key conveniences like WiFi and in-villa support services.`,
    },
    {
      q: "How close is this villa to top Bhurban and Murree attractions?",
      a: "The villa is well-positioned for easy access to local viewpoints, nature routes, and popular Murree-area attractions while still offering a calm and private estate experience.",
    },
    {
      q: "Can I book this villa directly online or through WhatsApp?",
      a: "Yes. You can continue through direct booking support or contact on WhatsApp for quick availability checks and personalized stay planning.",
    },
  ];
  const villaFaqJsonLd = {
    id: `hv-jsonld-villa-faq-${villa.slug}`,
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: villaFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <JsonLd items={[buildVillaVacationRentalJsonLd(villa), villaFaqJsonLd]} />
      <DetailNavbar />

      <section className="mx-auto max-w-[1400px] px-6 pb-10 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 pt-3 text-neutral-700">
          <span className="text-xl">↩</span>
          <Link href="/villas" className="text-[12px] tracking-wide hover:underline">
            Back to Villas
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="border border-[#eadfce] bg-white/0 p-3 lg:col-span-9">
            <div className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
              <Image
                src={getValidImageSrc(villa.image)}
                alt={villa.title || "Villa"}
                fill
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover"
                priority
                unoptimized={shouldUnoptimizeImageSrc(getValidImageSrc(villa.image))}
              />
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6 lg:col-span-3">
            <div className="border border-[#eadfce] p-3">
              <div className="relative h-[190px] w-full md:h-[200px]">
                <Image
                  src={thumb0}
                  alt={`${villa.title} room`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                  unoptimized={shouldUnoptimizeImageSrc(thumb0)}
                />
              </div>
            </div>
            <div className="border border-[#eadfce] p-3">
              <div className="relative h-[190px] w-full md:h-[200px]">
                <Image
                  src={thumb1}
                  alt={`${villa.title} more`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                  unoptimized={shouldUnoptimizeImageSrc(thumb1)}
                />
                {extraGallery > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <span className="text-sm tracking-wide text-white">+{extraGallery} more</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl text-neutral-900 md:text-5xl">{villa.title}</h1>
            <p className="mt-3 max-w-xl text-[12px] text-neutral-500">{villa.description}</p>
          </div>

          <div className="flex items-center gap-3 text-neutral-700">
            <span className="text-[#c9a55b]">★</span>
            <span className="text-[12px]">4.9</span>
            <span className="text-[12px] text-neutral-500">(47 reviews)</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-12 md:px-20 lg:px-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between gap-6 rounded-sm border border-[#e9dfd0] bg-[#f6f1ea] px-6 py-5">
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500">Bedrooms</span>
                <span className="font-display text-lg text-neutral-900">{villa.bedrooms}</span>
              </div>
              <div className="h-8 w-px bg-[#e9dfd0]" />
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500">Guests</span>
                <span className="font-display text-lg text-neutral-900">{villa.guests}</span>
              </div>
              <div className="h-8 w-px bg-[#e9dfd0]" />
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500">Size</span>
                <span className="font-display text-lg text-neutral-900">{villa.size}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl text-neutral-900">About This Villa</h2>
              <p className="mt-4 max-w-3xl text-[13px] italic leading-6 text-neutral-500">{villa.content}</p>
              <p className="mt-5 max-w-3xl text-[14px] leading-7 text-neutral-700">
                This residence is designed for travelers who want more than a standard room. Instead of compressed hotel
                movement, you get a private luxury stay flow: unhurried mornings, open living zones, and space to
                connect with family or guests at your own pace. The interior experience balances comfort and refinement,
                while the location gives you access to the best parts of Bhurban without losing privacy.
              </p>
              <p className="mt-4 max-w-3xl text-[14px] leading-7 text-neutral-700">
                For weekend escapes, this villa supports restorative downtime and scenic reset. For longer stays, the
                layout allows practical day-to-day ease with dedicated zones for rest, conversation, and light work.
                This makes it especially suitable for couples, multi-generational families, and small groups planning a
                private Murree mountain retreat.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-base text-neutral-900">Features &amp; Services</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-10 text-[12px] text-neutral-500 sm:grid-cols-2 lg:grid-cols-3">
                {villa.amenities.slice(0, 6).map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9a55b]" />
                    <span className="tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-display text-base text-neutral-900">Villa Highlights</h3>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {villa.highlights.map((hl) => (
                  <div
                    key={hl}
                    className="flex items-center gap-2 border border-[#e9dfd0] bg-[#f6f1ea] px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-700"
                  >
                    <span className="text-[#c9a55b]">✓</span>
                    <span className="leading-4">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-sm border border-[#e9dfd0] bg-white p-6 md:p-8">
              <h3 className="font-display text-xl text-neutral-900">Room and stay experience details</h3>
              <p className="mt-4 text-[14px] leading-7 text-neutral-700">
                Each bedroom is configured for high-comfort sleep quality with practical circulation and calm lighting.
                Shared spaces are intentionally sized to support group movement, private conversations, and relaxed
                family time. The design language prioritizes warmth and functionality so the villa feels premium while
                still livable for real travel rhythms.
              </p>
              <p className="mt-4 text-[14px] leading-7 text-neutral-700">
                The terrace and surrounding environment create one of the most valuable aspects of the stay: visual
                breathing room. Guests can enjoy morning tea, reading sessions, or evening downtime with uninterrupted
                hillside character. For planners organizing celebrations or milestone stays, this setting also provides
                a strong lifestyle backdrop for photos, dining moments, and small private gatherings.
              </p>
              <h4 className="mt-8 text-lg font-semibold text-neutral-900">Nearby attractions and local access</h4>
              <p className="mt-3 text-[14px] leading-7 text-neutral-700">
                From this villa, guests can plan easy access to key Bhurban-Murree experiences including scenic
                viewpoints, short nature routes, and popular family stops. The advantage is flexibility: you can choose
                active half-days outside and still return to a private quiet base by evening. This balance is a major
                reason why travelers prefer private villas in Bhurban for quality-driven trips.
              </p>
            </div>

            <section className="mt-12 rounded-sm border border-[#e9dfd0] bg-[#fbf8f2] p-6 md:p-8">
              <h3 className="font-display text-xl text-neutral-900">Frequently Asked Questions</h3>
              <div className="mt-5 space-y-4">
                {villaFaqs.map((faq) => (
                  <article key={faq.q} className="rounded-md border border-[#eadfce] bg-white p-4">
                    <h4 className="text-base font-semibold text-neutral-900">{faq.q}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{faq.a}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <aside className="rounded-sm border border-[#efe6d8] bg-white p-7">
            <p className="font-display text-2xl text-neutral-900">{villa.price}</p>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500">per night</p>

            <a
              href={buildWhatsAppBookingUrl(villa.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center bg-neutral-900 py-3 text-[12px] font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800"
            >
              Book Now
            </a>
            <Link
              href="/contact"
              className="mt-3 w-full border border-neutral-300 py-3 text-[12px] font-semibold uppercase tracking-widest text-neutral-900 transition hover:bg-neutral-50"
            >
              Contact Us
            </Link>

            <div className="mt-8">
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">What is included</p>
              <div className="mt-4 space-y-3">
                {villa.amenities.slice(0, 5).map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500">
                    <span className="text-[#c9a55b]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <VillaAmenitiesSection amenities={villa.amenities} />

      <VirtualExperienceSection />

      <Footer />
    </div>
  );
};

export default VillaDetail;
