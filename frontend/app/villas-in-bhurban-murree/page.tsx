import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why Villas Are the Ultimate Luxury Stay in Bhurban and Murree",
  description:
    "Looking for the perfect luxury stay in Bhurban or Murree? Discover why private villas offer unmatched privacy, space and exclusivity compared to hotels. Book at Himalaya Premium Villas.",
  keywords: ["villas in Bhurban Murree", "luxury villas Bhurban", "private villas Murree", "Himalaya Premium Villas"],
  alternates: {
    canonical: "/villas-in-bhurban-murree",
  },
  openGraph: {
    title: "Why Villas Are the Ultimate Luxury Stay in Bhurban and Murree",
    description:
      "Discover why private villas in Bhurban Murree provide unmatched privacy, space, and exclusivity compared to hotels.",
    url: "/villas-in-bhurban-murree",
    type: "article",
    images: ["/assets/blog-bhurban-murree-activity-guide.png"],
  },
};

const articleSizes = "(max-width: 896px) 100vw, 896px";

function HeroBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="not-prose mb-10 overflow-hidden rounded-2xl border border-[#e7ddcf] bg-neutral-100 shadow-lg md:rounded-3xl">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className="h-auto w-full object-cover"
        sizes={articleSizes}
        priority
      />
    </div>
  );
}

function SectionTitle({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    <h2
      className={cn(
        "not-prose scroll-mt-24 border-b-2 border-[#1c1916]/15 pb-4 font-display text-2xl font-bold leading-snug tracking-tight text-[#1A1A1A] md:text-[1.95rem]",
        first ? "mt-8" : "mt-16",
      )}
    >
      {children}
    </h2>
  );
}

const faqs = [
  {
    q: "Where exactly is Himalaya Premium Villas located?",
    a: "Himalaya Premium Villas is located in Bhurban near Murree, Punjab, Pakistan, around 1.5 to 2 hours from Islamabad, in a serene gated setting with cedar forests and Himalayan views.",
  },
  {
    q: "What is the difference between booking a villa and a hotel room in Murree?",
    a: "A hotel room is private accommodation within a shared property. A villa at Himalaya Premium Villas offers complete exclusivity with no shared lobbies, no shared dining crowds, and private indoor-outdoor spaces for your group.",
  },
  {
    q: "How many guests can Himalaya Premium Villas accommodate?",
    a: "We offer Presidential Suites, Family Residences, and premium stays for couples, families, and larger groups. For custom group arrangements, our team can tailor capacity and setup based on your event.",
  },
  {
    q: "Can I host a wedding or private event at Himalaya Villas?",
    a: "Yes. The estate is built for destination weddings, private events, and corporate retreats, with support for venue setup, catering, decor, lighting, staging, and complete coordination.",
  },
  {
    q: "Is Himalaya Premium Villas suitable for families with young children?",
    a: "Yes. The estate is private and gated with open lawns, safe play areas, and family-friendly activities in a controlled environment.",
  },
  {
    q: "What season is best for Bhurban and Murree?",
    a: "Bhurban and Murree are beautiful year-round: summer for cool weather, winter for snowfall, and spring/autumn for quieter luxury retreats.",
  },
];

export default function VillasInBhurbanMurreePage() {
  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <DetailNavbar />

      <main className="mx-auto max-w-4xl px-6 py-32 md:py-40">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center font-medium text-[hsl(var(--primary))] transition-colors hover:text-opacity-80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
        </Link>

        <article className="prose prose-lg prose-slate max-w-none">
          <h1 className="not-prose mb-8 scroll-mt-24 font-display text-3xl font-bold leading-tight tracking-tight text-[#1A1A1A] md:text-4xl">
            Why Villas Are the Ultimate Luxury Stay in Bhurban &amp; Murree
          </h1>

          <HeroBanner
            src="/assets/blog-bhurban-murree-activity-guide.png"
            alt="Things to do near Bhurban Murree — scenic hills, activities, and travel guide"
          />

          <p>
            If you have ever planned a trip to Murree or Bhurban, you already know the excitement: crisp mountain air, winding roads
            through cedar forests, and mornings above the clouds. But then comes the real question: where should you stay?
          </p>
          <p>
            Most travelers instinctively choose hotels. Yet a growing number of discerning guests now choose private villas for one
            reason: the experience is entirely different.
          </p>
          <p>
            At Himalaya Premium Villas, families, couples, corporate teams, and wedding groups consistently say the same thing: they
            came for the mountains, but stayed for the lifestyle.
          </p>
          <p>Here is why villas in Bhurban Murree offer what hotels simply cannot.</p>

          <SectionTitle first>1. Privacy that no hotel can offer</SectionTitle>
          <p>
            During peak periods in Murree and Bhurban, hotels can become crowded. Shared corridors, busy lobbies, and noisy dining
            areas can dilute the idea of a calm mountain retreat.
          </p>
          <p>
            A private villa changes everything. At Himalaya Premium Villas, you are not booking one room. You are securing an
            exclusive luxury estate experience with private terraces, lounges, and outdoor space for your group only.
          </p>
          <ul>
            <li>Families needing safe open space for children</li>
            <li>Couples wanting a romantic and uninterrupted retreat</li>
            <li>Groups celebrating anniversaries, birthdays, or reunions</li>
            <li>Corporate teams requiring privacy, focus, and exclusivity</li>
          </ul>

          <div className="not-prose my-10 overflow-hidden rounded-xl border border-[#e7ddcf] bg-white shadow-sm">
            <Image
              src="/assets/why-villa-view.jpg"
              alt="Luxury private villa in the Bhurban Murree hills"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes={articleSizes}
              loading="lazy"
            />
          </div>

          <SectionTitle>2. Space to truly breathe in luxury</SectionTitle>
          <p>
            A standard hotel room offers limited freedom for families and groups. Luxury villas in Bhurban provide expansive
            multi-bedroom layouts, private terraces, king-sized bedrooms, elegant lounges, and immersive mountain views.
          </p>
          <p>
            This is not just accommodation. It is a private mountain residence where your group can gather, relax, and experience the
            hills without compromise.
          </p>
          <div className="not-prose my-10 overflow-hidden rounded-xl border border-[#e7ddcf] bg-white shadow-sm">
            <Image
              src="/assets/journal-group-new.jpg"
              alt="Family enjoying private terrace views in Bhurban"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes={articleSizes}
              loading="lazy"
            />
          </div>

          <SectionTitle>3. A fully personalized luxury experience</SectionTitle>
          <p>
            Hotels often follow fixed schedules and standardized service. A private villa allows complete personalization around your
            needs, timing, and occasion.
          </p>
          <ul>
            <li>Private chef with bespoke gourmet meals</li>
            <li>Romantic bonfire setups</li>
            <li>Luxury breakfast on your private terrace</li>
            <li>Customized event planning and curated mountain experiences</li>
          </ul>

          <SectionTitle>4. The mountains as your private backdrop</SectionTitle>
          <p>
            Bhurban offers sweeping views of Murree hills and the greater Himalayan ranges. Experiencing this from a private terrace
            is fundamentally different from viewing it through a hotel window.
          </p>
          <p>
            At Himalaya Premium Villas, landscaped gardens, open terraces, and panoramic viewpoints are designed so you can live inside
            the landscape, not merely observe it.
          </p>
          <div className="not-prose my-10 overflow-hidden rounded-xl border border-[#e7ddcf] bg-white shadow-sm">
            <Image
              src="/assets/why-villa-private.jpg"
              alt="Private hillside estate with panoramic mountain setting"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes={articleSizes}
              loading="lazy"
            />
          </div>

          <SectionTitle>5. Perfect for weddings and exclusive events</SectionTitle>
          <p>
            For destination weddings, milestone celebrations, corporate retreats, and private family gatherings, villas offer control
            and elegance without shared venues or rigid timing restrictions.
          </p>
          <ul>
            <li>Elegant setup with lighting, staging, and seating</li>
            <li>Private gourmet catering and custom menus</li>
            <li>Decor consultation and execution</li>
            <li>Entertainment and guest experience planning</li>
            <li>Optional adventure add-ons such as ziplining and rock climbing</li>
          </ul>

          <SectionTitle>6. Exceptional value for luxury group stays</SectionTitle>
          <p>
            While villas appear premium at first glance, for groups of 8 to 12 guests they can deliver stronger value per person than
            multiple hotel rooms plus external services. More importantly, your group shares one connected luxury residence and one
            cohesive experience.
          </p>

          <SectionTitle>7. Complete seclusion in peak season</SectionTitle>
          <p>
            Murree can become crowded during holidays. A private gated estate in Bhurban gives you peace even during high demand:
            reduced noise, fewer interruptions, and uninterrupted mountain calm.
          </p>
          <div className="not-prose my-10 overflow-hidden rounded-xl border border-[#e7ddcf] bg-white shadow-sm">
            <Image
              src="/assets/journal-bonfire.jpg"
              alt="Private bonfire evening experience at luxury villa"
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes={articleSizes}
              loading="lazy"
            />
          </div>

          <SectionTitle>8. Curated experiences beyond a hotel stay</SectionTitle>
          <p>A villa stay extends beyond rooms and meals. The estate becomes your private luxury playground.</p>
          <ul>
            <li>Sunrise forest walks through cedar trails</li>
            <li>Private ziplining and rock climbing experiences</li>
            <li>Stargazing under clear mountain skies</li>
            <li>Guided nature excursions around Bhurban</li>
            <li>Exclusive bonfire evenings</li>
            <li>Safe open play areas for children</li>
          </ul>

          <h2 className="not-prose mt-16 border-b-2 border-[#1c1916]/15 pb-4 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[1.85rem]">
            The verdict
          </h2>
          <p>
            Hotels offer convenience. Villas in Bhurban Murree offer privacy, space, exclusivity, and personalization that define a
            truly elevated mountain experience.
          </p>
          <p>
            Himalaya Premium Villas is not a hotel. It is a private luxury estate crafted for guests who want to experience the
            mountains peacefully, privately, and on their own terms.
          </p>

          <section className="my-12 rounded-xl border border-[#d9ccbb] bg-white p-7 shadow-sm">
            <h3 className="mt-0 font-display text-2xl text-[#1A1A1A]">Thinking about a luxury stay in Bhurban?</h3>
            <p className="mb-4">
              Do not settle for a standard hotel room. Elevate your escape into a private luxury mountain experience.
            </p>
            <ul className="mb-6">
              <li>Presidential Suite and Family Residences available</li>
              <li>Private chef and bespoke dining experiences</li>
              <li>Ideal for families, couples, and luxury group stays</li>
              <li>Limited monthly bookings for complete exclusivity</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book/stay"
                className="inline-flex rounded-xl bg-[#1c1916] px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-[#2a241c]"
              >
                Check availability and book now
              </Link>
              <a
                href="https://wa.me/923045679000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-[#c9a55b] px-5 py-2.5 font-sans text-sm font-semibold text-[#6b5428] transition hover:bg-[#f5efe4]"
              >
                WhatsApp: +92 304 567 9000
              </a>
            </div>
          </section>

          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="mb-8 font-display text-3xl font-medium text-[#1A1A1A]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-medium text-slate-900">{faq.q}</h3>
                  <p className="m-0 leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
