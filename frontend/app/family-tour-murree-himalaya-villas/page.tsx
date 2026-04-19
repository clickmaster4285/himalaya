import type { Metadata } from "next";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogCanonicalPath, findBlogSlugByLegacyHref, getBlogPostBySlug } from "@/lib/blog-posts";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const slug = findBlogSlugByLegacyHref("/family-tour-murree-himalaya-villas");
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  if (!slug || !post) {
    return createPageMetadata({
      title: "Why Himalaya Villas & Resorts in Murree Are Best for a Family Tour | Himalaya Villas",
      description:
        "Planning a family tour to Murree or Bhurban? Discover why Himalaya Premium Villas & Resorts is the perfect family stay—private, safe, spacious & full of activities for all ages.",
      path: "/family-tour-murree-himalaya-villas",
      keywords: ["family tour Bhurban Murree", "family stay Murree", "Himalaya Premium Villas family"],
      ogImage: "/assets/blog-family-tour-featured-banner.png",
      appendSiteBrand: false,
    });
  }
  return createPageMetadata({
    title: "Why Himalaya Villas & Resorts in Murree Are Best for a Family Tour | Himalaya Villas",
    description:
      "Planning a family tour to Murree or Bhurban? Discover why Himalaya Premium Villas & Resorts is the perfect family stay—private, safe, spacious & full of activities for all ages.",
    path: "/family-tour-murree-himalaya-villas",
    canonicalPath: blogCanonicalPath(slug),
    keywords: [
      "family tour Bhurban Murree",
      "family stay Murree",
      "Himalaya Premium Villas family",
      "luxury villa Bhurban children",
    ],
    ogImage: post.coverImage,
    ogType: "article",
    publishedTime: `${post.date}T12:00:00+05:00`,
    appendSiteBrand: false,
  });
}

function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mb-12 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-900/5 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full object-cover" fetchPriority="high" />
    </div>
  );
}

function InlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-900/5 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" />
    </div>
  );
}

export default function FamilyTourMurreeHimalayaVillasPage() {
  const faqs = [
    {
      q: "Is Himalaya Premium Villas suitable for families with young children?",
      a: "Yes, the estate is fully gated and secure, allowing children to move freely and safely. Dedicated play areas and outdoor activities ensure kids stay engaged throughout the trip.",
    },
    {
      q: "Can the villa accommodate large family groups?",
      a: "Absolutely. The villas are designed for large families, offering multiple bedrooms, spacious living areas, and complete privacy under one roof.",
    },
    {
      q: "What activities are available for children?",
      a: "Children can enjoy ziplining, rock climbing, outdoor play areas, open lawns, nature walks, and bonfire evenings — all within a safe environment.",
    },
    {
      q: "What is the best time for a family tour to Bhurban Murree?",
      a: "Summer is ideal for escaping heat, winter offers snowfall, while spring and autumn are perfect for peaceful and scenic family trips.",
    },
  ];

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
          <h1 className="not-prose mb-8 font-display text-4xl font-medium leading-tight tracking-tight text-[#1A1A1A] md:text-5xl">
            Why Himalaya Villas &amp; Resorts in Murree Are Best for a Family Tour
          </h1>

          <div className="mb-10 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-white/50 p-8 shadow-sm">
            <p className="mb-4 text-lg leading-relaxed text-slate-700">
              Every Pakistani family has one dream trip on their list — Murree. The cool air, lush green hills, the refreshing scent of
              pine trees, children playing freely in open spaces, and peaceful evenings away from the noise of the city — it&apos;s a
              destination that never loses its charm, no matter how many times you visit.
            </p>
            <p className="mb-4 text-lg font-medium leading-relaxed text-slate-800">But here&apos;s what most families eventually realize:</p>
            <p className="mb-4 text-lg leading-relaxed text-slate-700">
              The destination is always beautiful — it&apos;s the accommodation that defines the experience.
            </p>
            <p className="mb-0 text-lg leading-relaxed text-slate-700">
              Cramped hotel rooms. Limited space for children. Crowded lobbies. Fixed meal schedules. That&apos;s exactly why more
              families are now choosing Himalaya Premium Villas &amp; Resorts in Bhurban — and once they experience it, they rarely
              return to traditional hotels.
            </p>
          </div>

          <FeaturedImage
            src="/assets/blog-family-tour-featured-banner.png"
            alt="Family-friendly luxury villa balcony with panoramic mountain views in Bhurban Murree"
          />

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">1. A Private Luxury Estate — Not Just a Room</h2>
              <p className="leading-relaxed text-slate-700">When traveling with family, space and privacy are essential.</p>
              <p className="leading-relaxed text-slate-700">
                At Himalaya Premium Villas, you don&apos;t just book a room — you reserve a private luxury estate designed for premium
                family living.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Spacious multi-bedroom suites</li>
                <li>Exclusive Presidential Estate</li>
                <li>En-suite bathrooms in every bedroom</li>
                <li>Elegant living and dining areas</li>
                <li>Private terraces with panoramic views</li>
                <li>Beautifully landscaped lawns</li>
              </ul>
              <p className="leading-relaxed text-slate-700">
                This is refined, high-end mountain living — ideal for families who value comfort, privacy, and exclusivity.
              </p>
              <InlineImage
                src="/assets/villa-alpine-real.jpg"
                alt="Alpine-style luxury villa exterior and mountain setting at Himalaya Premium Villas Bhurban"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">2. Safe, Open Spaces for Children</h2>
              <p className="leading-relaxed text-slate-700">Family travel should be relaxing — not stressful.</p>
              <p className="leading-relaxed text-slate-700">
                The fully gated estate ensures children can move freely in a secure and private environment, while parents unwind with
                peace of mind.
              </p>
              <p className="leading-relaxed text-slate-700">Features include:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Dedicated outdoor play areas</li>
                <li>Large private lawns</li>
                <li>Zipline adventure</li>
                <li>Rock climbing activities</li>
                <li>Guided nature walks</li>
                <li>Bonfire evenings</li>
              </ul>
              <p className="leading-relaxed text-slate-700">It&apos;s a perfect balance of safety, fun, and luxury.</p>
              <InlineImage
                src="/assets/gallery-sunlight.jpg"
                alt="Bright open outdoor spaces and lawns for children to play safely at the private estate"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">3. Bhurban — The Most Peaceful Location in Murree</h2>
              <p className="leading-relaxed text-slate-700">
                While Murree can get crowded, Bhurban offers a more premium and tranquil experience.
              </p>
              <p className="leading-relaxed text-slate-700">Surrounded by forests and mountains, Bhurban provides:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Scenic views</li>
                <li>Peaceful surroundings</li>
                <li>Easy access to attractions</li>
              </ul>
              <p className="leading-relaxed text-slate-700">Nearby family-friendly destinations include:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Patriata (New Murree)</li>
                <li>Kashmir Point &amp; Pindi Point</li>
                <li>Ayubia National Park</li>
                <li>Nathia Gali</li>
                <li>Mall Road Murree</li>
              </ul>
              <p className="leading-relaxed text-slate-700">You enjoy luxury, privacy, and accessibility — all in one place.</p>
              <InlineImage
                src="/assets/journal-1.jpg"
                alt="Serene mountain landscape and forested hills near Bhurban for peaceful family getaways"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">4. Private Chef &amp; Customised Dining</h2>
              <p className="leading-relaxed text-slate-700">
                Dining is one of the highlights of any family trip — and here, it&apos;s completely personalized.
              </p>
              <p className="leading-relaxed text-slate-700">Enjoy:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Fresh desi breakfasts on your private terrace</li>
                <li>Customized lunch and dinner menus</li>
                <li>Premium BBQ nights</li>
                <li>Meals tailored for children and elders</li>
                <li>Flexible dining times</li>
              </ul>
              <p className="leading-relaxed text-slate-700">This is bespoke dining, designed exclusively for your family.</p>
              <InlineImage
                src="/assets/gallery-dining-night.jpg"
                alt="Evening dining and warm hospitality in a private luxury villa setting"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">5. Complete Privacy — No Shared Spaces</h2>
              <p className="leading-relaxed text-slate-700">Unlike hotels, there are:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>No shared lobbies</li>
                <li>No crowded dining areas</li>
                <li>No noise from other guests</li>
                <li>No waiting lines</li>
              </ul>
              <p className="leading-relaxed text-slate-700">
                The entire estate is exclusively yours, offering unmatched privacy and comfort.
              </p>
              <p className="leading-relaxed text-slate-700">Perfect for:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Family gatherings</li>
                <li>Eid celebrations</li>
                <li>Birthdays</li>
                <li>Private retreats</li>
              </ul>
              <InlineImage
                src="/assets/services-events-real.jpg"
                alt="Private estate venue suited for exclusive family gatherings and celebrations in the hills"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">6. Ideal for Multi-Generational Families</h2>
              <p className="leading-relaxed text-slate-700">Himalaya Villas is thoughtfully designed for every age group:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Elders enjoy peaceful terraces</li>
                <li>Parents relax in private luxury spaces</li>
                <li>Teenagers engage in outdoor activities</li>
                <li>Children play safely in open areas</li>
              </ul>
              <p className="leading-relaxed text-slate-700">It&apos;s a complete family-friendly luxury experience.</p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">7. A Premium Experience in Every Season</h2>
              <p className="leading-relaxed text-slate-700">Bhurban is beautiful all year round:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>
                  <strong className="text-slate-900">Summer:</strong> Cool weather and greenery
                </li>
                <li>
                  <strong className="text-slate-900">Winter:</strong> Snowfall and cozy luxury
                </li>
                <li>
                  <strong className="text-slate-900">Spring:</strong> Fresh air and blooming landscapes
                </li>
                <li>
                  <strong className="text-slate-900">Autumn:</strong> Quiet, scenic, and peaceful
                </li>
              </ul>
              <p className="leading-relaxed text-slate-700">Each season offers a unique and premium mountain experience.</p>
              <InlineImage
                src="/assets/journal-4.jpg"
                alt="Mountain views and seasonal beauty around Bhurban and Murree for family holidays"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">8. A Family Experience That Truly Matters</h2>
              <p className="leading-relaxed text-slate-700">A family trip is about more than just travel — it&apos;s about connection.</p>
              <p className="leading-relaxed text-slate-700">At Himalaya Villas, you enjoy:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Quality time without distractions</li>
                <li>A peaceful private environment</li>
                <li>Meaningful shared moments</li>
              </ul>
              <p className="leading-relaxed text-slate-700">This is what turns a vacation into a lasting memory.</p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">The Verdict</h2>
              <p className="leading-relaxed text-slate-700">
                Murree and Bhurban will always be among Pakistan&apos;s most loved family destinations.
              </p>
              <p className="leading-relaxed text-slate-700">
                But the experience you truly remember is the one where you had space, privacy, luxury.
              </p>
              <p className="mb-0 leading-relaxed text-slate-700">
                Himalaya Premium Villas &amp; Resorts delivers exactly that — a private, premium mountain retreat designed for families.
              </p>
            </section>

            <section className="rounded-xl border border-[#d9ccbb] bg-white p-8 shadow-sm">
              <h2 className="mb-4 mt-0 font-display text-2xl font-semibold text-[#1A1A1A]">Plan Your Family Tour to Murree</h2>
              <p className="leading-relaxed text-slate-700">Give your family an experience they&apos;ll cherish for years.</p>
              <ul className="mb-6 mt-4 list-none space-y-2 pl-0 text-slate-700">
                <li>✅ Private gated luxury estate</li>
                <li>✅ Multi-bedroom family suites</li>
                <li>✅ Personal chef &amp; customised dining</li>
                <li>✅ Outdoor activities &amp; experiences</li>
                <li>✅ Limited bookings for exclusivity</li>
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/book/stay"
                  className="inline-flex items-center justify-center rounded-xl bg-[#1c1916] px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-[#2a241c]"
                >
                  👉 Check Availability &amp; Book Now
                </Link>
                <a
                  href="https://wa.me/923045679000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[#c9a55b] px-5 py-2.5 font-sans text-sm font-semibold text-[#6b5428] transition hover:bg-[#f5efe4]"
                >
                  📲 WhatsApp: +92 304 567 9000
                </a>
                <a
                  href="https://www.himalayavillas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 font-sans text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  🌐 www.himalayavillas.com
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
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
