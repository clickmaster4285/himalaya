import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedVillas } from "@/lib/villas-fetch";

export const dynamic = "force-dynamic";

const heroBg = "/assets/why-villa-view.jpg";
const symphonyImg = "/assets/philosophy-interior.jpg";
const poolImg = "/assets/why-villa-private.jpg";
const amenitiesImg = "/assets/journal-bonfire.jpg";
const journeyBg = "/assets/why-villa-garden.jpg";

export default async function ExperiencePage() {
  const villas = await getPublishedVillas();
  const villaCards = villas.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      {/* Hero */}
      <section className="relative h-[520px] md:h-[640px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="font-display text-white text-4xl md:text-6xl leading-tight">
              The Himalaya
              <br />
              Experience
            </h1>
            <p className="mt-6 text-white/80 text-[12px] md:text-[13px] tracking-wide">
              Where luxury meets nature, and every moment becomes a cherished
              <br className="hidden md:block" />
              memory
            </p>
          </div>
        </div>
      </section>

      {/* Symphony */}
      <section className="bg-[#F6F1EA] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white border border-[#eadfce] p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={symphonyImg} alt="Himalaya Villas" className="w-full max-w-[520px] h-[340px] object-cover" />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Himalaya Villas</p>
            <h2 className="mt-5 font-display text-3xl md:text-4xl text-neutral-900 leading-tight">
              A Symphony of <span className="italic text-[#c9a55b]">Nature</span> &amp;{" "}
              <span className="italic text-[#c9a55b]">Elegance</span>
            </h2>
            <p className="mt-6 text-[12px] md:text-[13px] text-neutral-600 leading-relaxed max-w-xl">
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
      </section>

      {/* Pool / rating */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poolImg} alt="Experience" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 h-full flex items-end pb-10">
          <div className="bg-white/95 border border-[#eadfce] p-5 w-[260px]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">4.8%</p>
            <p className="mt-2 font-display italic text-[13px] text-neutral-900">Guest Rating</p>
            <p className="mt-2 text-[12px] text-neutral-600 italic">&quot;An Unforgettable Experience&quot;</p>
          </div>
        </div>
      </section>

      {/* Journey cards */}
      <section className="bg-[#F6F1EA] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-4xl md:text-5xl text-neutral-900">
            Your <span className="italic text-[#c9a55b]">Journey</span> Awaits
          </h2>
          <p className="mt-3 text-[12px] text-neutral-500 max-w-xl">
            Choose your perfect experience or continue multiple for an unforgettable stay
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {villaCards.map((v) => (
              <Link
                key={v.slug}
                href={`/villas/${v.slug}`}
                className="bg-white border border-[#eadfce] hover:bg-[#fbf8f2] transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.image} alt={v.title} className="w-full h-[170px] object-cover" />
                <div className="p-5">
                  <p className="font-display text-[16px] text-neutral-900">{v.title}</p>
                  <p className="mt-2 text-[11px] text-neutral-500">{v.description}</p>
                  <p className="mt-4 text-[11px] text-neutral-900">{v.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/villas"
              className="px-10 py-3 border border-neutral-900 text-neutral-900 text-[11px] uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Load More
            </Link>
          </div>
        </div>
      </section>

      {/* Begin Journey */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={journeyBg} alt="Begin your journey" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 h-full flex items-center">
          <div>
            <h2 className="font-display text-white text-4xl md:text-6xl leading-tight">
              Begin Your Journey
              <br />
              Today
            </h2>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white/30 text-white text-[11px] uppercase tracking-widest hover:bg-white/20 transition-colors"
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

