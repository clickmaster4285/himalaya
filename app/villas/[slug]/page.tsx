import Link from "next/link";
import { findVillaBySlug, villas } from "@/lib/villas";
import { notFound } from "next/navigation";
import VillaAmenitiesSection from "@/components/VillaAmenitiesSection";
import VirtualExperienceSection from "@/components/VirtualExperienceSection";
import Footer from "@/components/Footer";
import DetailNavbar from "@/components/DetailNavbar";

type MaybePromise<T> = T | Promise<T>;

interface VillasDetailPageProps {
  params: MaybePromise<{ slug: string }>;
}

export async function generateStaticParams() {
  return villas.map((villa) => ({ slug: villa.slug }));
}

export const dynamicParams = true;

const VillaDetail = async ({ params }: VillasDetailPageProps) => {
  const { slug } = await params;
  const villa = findVillaBySlug(slug);

  if (!villa) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <DetailNavbar />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-10">
        <div className="flex items-center gap-3 text-neutral-700 pt-3">
          <span className="text-xl">↩</span>
          <Link href="/villas" className="text-[12px] tracking-wide hover:underline">
            Back to Villas
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-9 border border-[#eadfce] bg-white/0 p-3">
            <div className="relative overflow-hidden">
              <img src={villa.image} alt={villa.title} className="w-full h-[320px] md:h-[420px] object-cover" />
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-rows-2 gap-6">
            <div className="border border-[#eadfce] p-3">
              <img
                src={villa.gallery?.[0] ?? "/assets/gallery-interior.jpg"}
                alt={`${villa.title} room`}
                className="w-full h-[190px] md:h-[200px] object-cover"
              />
            </div>
            <div className="border border-[#eadfce] p-3 relative">
              <img
                src={villa.gallery?.[1] ?? "/assets/gallery-dining-night.jpg"}
                alt={`${villa.title} more`}
                className="w-full h-[190px] md:h-[200px] object-cover"
              />
              <div className="absolute inset-3 bg-black/35 flex items-center justify-center">
                <span className="text-white text-sm tracking-wide">+2 more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-neutral-900">{villa.title}</h1>
            <p className="mt-3 text-[12px] text-neutral-500 max-w-xl">{villa.description}</p>
          </div>

          <div className="flex items-center gap-3 text-neutral-700">
            <span className="text-[#c9a55b]">★</span>
            <span className="text-[12px]">4.9</span>
            <span className="text-[12px] text-neutral-500">(47 reviews)</span>
          </div>
        </div>
      </section>

      <main className="px-6 md:px-20 lg:px-28 py-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <section className="lg:col-span-2">
            <div className="bg-[#f6f1ea] border border-[#e9dfd0] rounded-sm px-6 py-5 flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500">Bedrooms</span>
                <span className="text-lg font-display text-neutral-900">{villa.bedrooms}</span>
              </div>
              <div className="h-8 w-px bg-[#e9dfd0]" />
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500">Guests</span>
                <span className="text-lg font-display text-neutral-900">{villa.guests}</span>
              </div>
              <div className="h-8 w-px bg-[#e9dfd0]" />
              <div className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-neutral-500">Size</span>
                <span className="text-lg font-display text-neutral-900">{villa.size}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-xl text-neutral-900">About This Villa</h2>
              <p className="mt-4 text-[13px] leading-6 text-neutral-500 italic max-w-3xl">{villa.content}</p>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-base text-neutral-900">Features &amp; Services</h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-10 text-[12px] text-neutral-500">
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
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {villa.highlights.map((hl) => (
                  <div
                    key={hl}
                    className="flex items-center gap-2 bg-[#f6f1ea] border border-[#e9dfd0] px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-700"
                  >
                    <span className="text-[#c9a55b]">✓</span>
                    <span className="leading-4">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="bg-white border border-[#efe6d8] rounded-sm p-7">
            <p className="text-2xl font-display text-neutral-900">{villa.price}</p>
            <p className="text-[11px] uppercase tracking-widest text-neutral-500 mt-1">per night</p>

            <Link
              href={`/book?villa=${encodeURIComponent(villa.slug)}`}
              className="mt-6 w-full bg-neutral-900 text-white py-3 text-[12px] font-semibold uppercase tracking-widest hover:bg-neutral-800 transition inline-flex items-center justify-center"
            >
              Book Now
            </Link>
            <button className="mt-3 w-full border border-neutral-300 text-neutral-900 py-3 text-[12px] font-semibold uppercase tracking-widest hover:bg-neutral-50 transition">
              Contact Us
            </button>

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
