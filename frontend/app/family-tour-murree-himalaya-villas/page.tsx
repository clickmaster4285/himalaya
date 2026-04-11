import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why Himalaya Villas & Resorts in Murree Are Best for a Family Tour | Himalaya Villas",
  description:
    "Planning a family tour to Murree or Bhurban? Discover why Himalaya Premium Villas & Resorts is the perfect family stay — private, safe, spacious & full of activities for all ages.",
  keywords: [
    "family tour Bhurban Murree",
    "family stay Murree",
    "Himalaya Premium Villas family",
    "luxury villa Bhurban children",
  ],
  alternates: {
    canonical: "/family-tour-murree-himalaya-villas",
  },
  openGraph: {
    title: "Why Himalaya Villas & Resorts in Murree Are Best for a Family Tour | Himalaya Villas",
    description:
      "Private gated estate, multi-bedroom suites, personalised dining, and activities for all ages — ideal for your Murree family tour.",
    url: "/family-tour-murree-himalaya-villas",
    type: "article",
    images: ["/assets/blog-family-tour-featured-banner.png"],
  },
};

const articleSizes = "(max-width: 896px) 100vw, 896px";

function HeroBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="not-prose mb-10 overflow-hidden rounded-2xl border border-[#e7ddcf] bg-neutral-900 shadow-lg md:rounded-3xl">
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

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-xl border border-[#e7ddcf] bg-white shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className="h-auto w-full object-cover"
        sizes={articleSizes}
        loading="lazy"
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
    q: "Is Himalaya Premium Villas suitable for families with young children?",
    a: "Yes. The estate is fully gated and secure, so children can move freely in a controlled environment. Dedicated play areas and outdoor activities keep kids engaged throughout your stay.",
  },
  {
    q: "Can the villa accommodate large family groups?",
    a: "Absolutely. Our residences are designed for larger families, with multiple bedrooms, spacious living and dining areas, and complete privacy under one roof.",
  },
  {
    q: "What activities are available for children?",
    a: "Children can enjoy ziplining, rock climbing, outdoor play areas, open lawns, nature walks, and bonfire evenings — all within a safe, private setting.",
  },
  {
    q: "What is the best time for a family tour to Bhurban Murree?",
    a: "Summer is ideal for escaping heat; winter offers snowfall and cosy evenings; spring and autumn are perfect for quieter, scenic family trips.",
  },
];

export default function FamilyTourMurreePage() {
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
            Why Himalaya Villas &amp; Resorts in Murree Are Best for a Family Tour
          </h1>

          <HeroBanner
            src="/assets/blog-family-tour-featured-banner.png"
            alt="Why Himalaya Villas and Resorts in Murree are best for a family tour — private villa balcony with mountain views"
          />

          <p>
            Every Pakistani family has one dream trip on their list — Murree. The cool air, lush green hills, the refreshing scent of
            pine trees, children playing freely in open spaces, and peaceful evenings away from city noise — it is a destination that
            never loses its charm, no matter how many times you visit.
          </p>
          <p>
            But here is what most families eventually realize: the destination is always beautiful — it is the accommodation that
            defines the experience. Cramped hotel rooms, limited space for children, crowded lobbies, and fixed meal schedules. That is
            exactly why more families are now choosing Himalaya Premium Villas & Resorts in Bhurban — and once they experience it, they
            rarely return to traditional hotels.
          </p>

          <SectionTitle first>1. A private luxury estate — not just a room</SectionTitle>
          <p>When traveling with family, space and privacy are essential.</p>
          <p>
            At Himalaya Premium Villas, you do not just book a room — you reserve a private luxury estate designed for premium family
            living.
          </p>
          <ul>
            <li>Spacious multi-bedroom suites</li>
            <li>Exclusive Presidential Estate</li>
            <li>En-suite bathrooms in every bedroom</li>
            <li>Elegant living and dining areas</li>
            <li>Private terraces with panoramic views</li>
            <li>Beautifully landscaped lawns</li>
          </ul>
          <p>This is refined, high-end mountain living — ideal for families who value comfort, privacy, and exclusivity.</p>

          <ArticleImage
            src="/assets/blog-family-tour-estate-collage.png"
            alt="Luxury private estate with pool, gated entrance, private dining, and outdoor activities at Himalaya Villas"
          />

          <SectionTitle>2. Safe, open spaces for children</SectionTitle>
          <p>Family travel should be relaxing — not stressful.</p>
          <p>
            The fully gated estate ensures children can move freely in a secure and private environment, while parents unwind with peace
            of mind.
          </p>
          <p>Features include:</p>
          <ul>
            <li>Dedicated outdoor play areas</li>
            <li>Large private lawns</li>
            <li>Zipline adventure</li>
            <li>Rock climbing activities</li>
            <li>Guided nature walks</li>
            <li>Bonfire evenings</li>
          </ul>
          <p>It is a perfect balance of safety, fun, and luxury.</p>

          <ArticleImage
            src="/assets/journal-group-new.jpg"
            alt="Family enjoying outdoor space and mountain views at a private villa"
          />

          <SectionTitle>3. Bhurban — the most peaceful location in Murree</SectionTitle>
          <p>While Murree can get crowded, Bhurban offers a more premium and tranquil experience.</p>
          <p>Surrounded by forests and mountains, Bhurban provides scenic views, peaceful surroundings, and easy access to attractions.</p>
          <p>Nearby family-friendly destinations include:</p>
          <ul>
            <li>Patriata (New Murree)</li>
            <li>Kashmir Point &amp; Pindi Point</li>
            <li>Ayubia National Park</li>
            <li>Nathia Gali</li>
            <li>Mall Road Murree</li>
          </ul>
          <p>You enjoy luxury, privacy, and accessibility — all in one place.</p>

          <ArticleImage
            src="/assets/blog-family-tour-bhurban-guide.png"
            alt="Things to do near Bhurban Murree — activities and scenic highlights for families"
          />

          <SectionTitle>4. Private chef &amp; customised dining</SectionTitle>
          <p>Dining is one of the highlights of any family trip — and here, it is completely personalised.</p>
          <p>Enjoy:</p>
          <ul>
            <li>Fresh desi breakfasts on your private terrace</li>
            <li>Customised lunch and dinner menus</li>
            <li>Premium BBQ nights</li>
            <li>Meals tailored for children and elders</li>
            <li>Flexible dining times</li>
          </ul>
          <p>This is bespoke dining, designed exclusively for your family.</p>

          <ArticleImage
            src="/assets/gallery-dining-night.jpg"
            alt="Private dining and evening hospitality at Himalaya Premium Villas"
          />

          <SectionTitle>5. Complete privacy — no shared spaces</SectionTitle>
          <p>Unlike hotels, there are:</p>
          <ul>
            <li>No shared lobbies</li>
            <li>No crowded dining areas</li>
            <li>No noise from other guests</li>
            <li>No waiting lines</li>
          </ul>
          <p>The entire estate is exclusively yours, offering unmatched privacy and comfort.</p>
          <p>Perfect for:</p>
          <ul>
            <li>Family gatherings</li>
            <li>Eid celebrations</li>
            <li>Birthdays</li>
            <li>Private retreats</li>
          </ul>

          <ArticleImage
            src="/assets/why-villa-private.jpg"
            alt="Private gated luxury estate surrounded by cedar forest in Bhurban"
          />

          <SectionTitle>6. Ideal for multi-generational families</SectionTitle>
          <p>Himalaya Villas is thoughtfully designed for every age group:</p>
          <ul>
            <li>Elders enjoy peaceful terraces</li>
            <li>Parents relax in private luxury spaces</li>
            <li>Teenagers engage in outdoor activities</li>
            <li>Children play safely in open areas</li>
          </ul>
          <p>It is a complete family-friendly luxury experience.</p>

          <SectionTitle>7. A premium experience in every season</SectionTitle>
          <p>Bhurban is beautiful all year round:</p>
          <ul>
            <li>
              <strong>Summer:</strong> cool weather and greenery
            </li>
            <li>
              <strong>Winter:</strong> snowfall and cosy luxury
            </li>
            <li>
              <strong>Spring:</strong> fresh air and blooming landscapes
            </li>
            <li>
              <strong>Autumn:</strong> quiet, scenic, and peaceful
            </li>
          </ul>
          <p>Each season offers a unique and premium mountain experience.</p>

          <ArticleImage
            src="/assets/why-villa-garden.jpg"
            alt="Landscaped gardens and outdoor space at Himalaya Premium Villas"
          />

          <SectionTitle>8. A family experience that truly matters</SectionTitle>
          <p>A family trip is about more than just travel — it is about connection.</p>
          <p>At Himalaya Villas, you enjoy:</p>
          <ul>
            <li>Quality time without distractions</li>
            <li>A peaceful private environment</li>
            <li>Meaningful shared moments</li>
          </ul>
          <p>This is what turns a vacation into a lasting memory.</p>

          <h2 className="not-prose mt-16 border-b-2 border-[#1c1916]/15 pb-4 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-[1.85rem]">
            The verdict
          </h2>
          <p>
            Murree and Bhurban will always be among Pakistan&apos;s most loved family destinations. But the experience you truly
            remember is the one where you had space, privacy, and luxury.
          </p>
          <p>
            Himalaya Premium Villas &amp; Resorts delivers exactly that — a private, premium mountain retreat designed for families.
          </p>

          <section className="not-prose my-12 rounded-xl border border-[#d9ccbb] bg-white p-7 shadow-sm">
            <h3 className="mt-0 font-display text-2xl text-[#1A1A1A]">Plan your family tour to Murree</h3>
            <p className="mb-4 font-sans text-base text-slate-700">
              Give your family an experience they will cherish for years.
            </p>
            <ul className="mb-6 list-none space-y-2 pl-0 font-sans text-sm text-slate-700">
              <li>✅ Private gated luxury estate</li>
              <li>✅ Multi-bedroom family suites</li>
              <li>✅ Personal chef &amp; customised dining</li>
              <li>✅ Outdoor activities &amp; experiences</li>
              <li>✅ Limited bookings for exclusivity</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book/stay"
                className="inline-flex rounded-xl bg-[#1c1916] px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-[#2a241c]"
              >
                Check availability &amp; book now
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

          <section className="not-prose mt-16 border-t border-slate-200 pt-12">
            <h2 className="mb-8 font-display text-3xl font-medium text-[#1A1A1A]">Frequently asked questions</h2>
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
