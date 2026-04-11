import type { Metadata } from "next";
import Image from "next/image";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Things to Do Near Bhurban Murree | Complete Travel & Activity Guide | Himalaya Villas",
  description:
    "Discover the best things to do near Bhurban Murree, including Patriata, Ayubia, Mall Road, hiking trails, and scenic viewpoints. Perfect travel guide for families and tourists staying at Himalaya Villas.",
  keywords: [
    "Things to do in Bhurban Murree",
    "Bhurban Murree activities",
    "Patriata chairlift",
    "Ayubia National Park",
    "Mall Road Murree",
    "Himalaya Villas Bhurban",
  ],
  alternates: {
    canonical: "/thing-to-do-bhurban-murree2",
  },
  openGraph: {
    title: "Things to Do Near Bhurban Murree | Complete Travel & Activity Guide | Himalaya Villas",
    description:
      "Discover the best things to do near Bhurban Murree, including Patriata, Ayubia, Mall Road, hiking trails, and scenic viewpoints.",
    url: "/thing-to-do-bhurban-murree2",
    type: "article",
    images: ["/assets/blog-bhurban-things-to-do-featured-v2.png"],
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

function InlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-[#e7ddcf] bg-white shadow-sm">
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

export default function ThingToDoBhurbanMurree2Page() {
  const faqs = [
    {
      q: "What is the best time to visit Bhurban Murree?",
      a: "The best time to visit is from April to October for pleasant weather and outdoor activities. For snowfall lovers, December to February offers a magical winter experience.",
    },
    {
      q: "How far is Bhurban from Islamabad?",
      a: "Bhurban is approximately a 1.5 to 2-hour drive from Islamabad, making it an ideal destination for weekend trips.",
    },
    {
      q: "Are there family-friendly activities in Bhurban?",
      a: "Yes, Bhurban offers many family-friendly activities, including nature walks, horse riding, visiting Patriata, and exploring scenic viewpoints.",
    },
    {
      q: "Is Bhurban suitable for couples or honeymoons?",
      a: "Absolutely. Its peaceful environment, scenic beauty, and luxury accommodations make it perfect for couples and honeymooners.",
    },
    {
      q: "What should I pack for a trip to Bhurban?",
      a: "Pack warm clothing (even for summer evenings), comfortable walking shoes, sunscreen, and a camera to capture the beautiful landscapes.",
    },
    {
      q: "Can I visit Bhurban in winter?",
      a: "Yes, Bhurban is stunning in winter with snowfall. However, roads can be slippery, so it’s important to travel carefully and check weather conditions in advance.",
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
          <h1 className="not-prose text-4xl font-medium leading-tight text-[#1A1A1A] md:text-5xl mb-8 font-display">
            Things to Do Near Bhurban Murree — A Complete Activity Guide
          </h1>

          <HeroBanner
            src="/assets/blog-bhurban-things-to-do-featured-v2.png"
            alt="Things to do near Bhurban Murree — a complete activity guide: mountains, chairlift, crafts, dining, and hiking"
          />

          <div className="not-prose mb-12 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-white/50 p-8 shadow-sm">
            <p className="mb-0 text-lg leading-relaxed text-slate-700">
              Bhurban and Murree offer far more than just scenic beauty — they deliver a complete travel experience. From adventure
              and exploration to relaxation and luxury, there’s something for every traveler. Here is our essential guide on the best
              things to do in Bhurban Murree to make your trip unforgettable.
            </p>
          </div>

          <div className="space-y-12 not-prose">
            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">
                1. Ride the Patriata Chairlift &amp; Cable Car
              </h2>
              <p className="leading-relaxed text-slate-700">
                As one of the main attractions near Bhurban, Patriata (New Murree) offers incredible views of the forested hills.
                Riding the world-class chairlift and cable car provides a birds-eye view of the majestic mountains, making it an
                essential activity for families and tourists alike.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">2. Take a Nature Walk in Bhurban Forest</h2>
              <p className="leading-relaxed text-slate-700">
                One of the simplest yet most refreshing activities is exploring the natural beauty of Bhurban’s forests. Surrounded by
                pine, oak, and cedar trees, this experience offers pure tranquility.
              </p>
              <p className="mt-4 font-medium text-slate-900">What to expect:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                <li>Fresh mountain air</li>
                <li>Peaceful walking trails</li>
                <li>Birdwatching opportunities</li>
              </ul>
              <p className="mt-4 italic text-slate-700">
                Perfect for morning walks or evening strolls in a calm, luxury setting.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">3. Visit Mall Road Murree</h2>
              <p className="leading-relaxed text-slate-700">
                A visit to Mall Road Murree is a must for anyone exploring the region. Located about 20–25 minutes from Bhurban, it’s
                the vibrant heart of Murree.
              </p>
              <p className="mt-4 font-medium text-slate-900">Highlights:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                <li>Street food and local cuisine</li>
                <li>Shopping for handicrafts and souvenirs</li>
                <li>Lively evening atmosphere</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">4. Visit Kashmir Point &amp; Pindi Point</h2>
              <p className="leading-relaxed text-slate-700">
                For breathtaking views, head to Kashmir Point and Pindi Point. These iconic viewpoints offer some of the most scenic
                landscapes in the region.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>
                  <strong className="text-slate-900">Kashmir Point:</strong> Peaceful ambiance with mountain views
                </li>
                <li>
                  <strong className="text-slate-900">Pindi Point:</strong> Stunning overlooks and chairlift experiences
                </li>
              </ul>
              <p className="mt-4 italic text-slate-700">Perfect for relaxation, photography, and family visits.</p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">
                5. Experience Luxury Dining at PC Bhurban
              </h2>
              <p className="leading-relaxed text-slate-700">
                A visit to Pearl Continental Bhurban adds a touch of elegance to your trip.
              </p>
              <p className="mt-4 font-medium text-slate-900">Why visit?</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                <li>Fine dining with panoramic views</li>
                <li>Premium coffee experiences</li>
                <li>Beautifully maintained surroundings</li>
              </ul>
              <p className="mt-4 italic text-slate-700">
                It’s ideal for those seeking a refined and upscale dining experience.
              </p>
              <InlineImage
                src="/assets/blog-bhurban-pc-fine-dining-interior.png"
                alt="Upscale fine dining restaurant with panoramic mountain views at Pearl Continental Bhurban"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">6. Go Hiking and Trekking</h2>
              <p className="leading-relaxed text-slate-700">
                Adventure seekers can explore a variety of scenic hiking trails around Bhurban and Murree.
              </p>
              <p className="mt-4 font-medium text-slate-900">Popular options:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                <li>Bhurban to Murree trail</li>
                <li>Patriata forest trails</li>
              </ul>
              <p className="mt-4 italic text-slate-700">
                These trails are beginner-friendly yet rewarding, offering stunning natural views and peaceful surroundings.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">7. Discover Ayubia National Park</h2>
              <p className="leading-relaxed text-slate-700">
                Located about 30–40 minutes away, Ayubia National Park is a must-visit destination for nature lovers.
              </p>
              <p className="mt-4 font-medium text-slate-900">Top attractions:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                <li>Pipeline walking track</li>
                <li>Wildlife spotting</li>
                <li>Dense forest landscapes</li>
              </ul>
              <p className="mt-4 italic text-slate-700">
                It’s one of the best places for eco-tourism and outdoor exploration.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">
                8. Enjoy Horse Riding &amp; Local Activities
              </h2>
              <p className="leading-relaxed text-slate-700">
                Horse riding is a popular activity in Murree and nearby areas like Patriata. It’s especially enjoyable for:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Families</li>
                <li>Children</li>
                <li>First-time visitors</li>
              </ul>
              <p className="mt-4 italic text-slate-700">A fun way to experience the hills in a traditional style.</p>
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">9. Capture Stunning Sunset Views</h2>
              <p className="leading-relaxed text-slate-700">
                Bhurban is famous for its breathtaking sunsets. Watching the sun set behind the mountains creates a truly memorable
                moment.
              </p>
              <p className="mt-4 font-medium text-slate-900">Best spots:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                <li>Private villa terraces</li>
                <li>Scenic hill viewpoints</li>
                <li>Open natural clearings</li>
              </ul>
              <InlineImage
                src="/assets/blog-bhurban-sunset-mountains.png"
                alt="Sunset over the mountain ranges of Bhurban Murree with a luxury resort on the hillside"
              />
            </section>

            <section>
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">10. Relax in Luxury at Himalaya Villas</h2>
              <p className="leading-relaxed text-slate-700">
                Sometimes, the best experience is simply to unwind in a private, luxury setting. At Himalaya Villas, you can:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                <li>Enjoy peaceful, exclusive surroundings</li>
                <li>Take in uninterrupted mountain views</li>
                <li>Spend quality time with family</li>
                <li>Experience premium comfort and privacy</li>
              </ul>
              <p className="mt-4 italic text-slate-700">
                It’s the perfect base for exploring Bhurban while enjoying a high-end, tranquil retreat.
              </p>
              <InlineImage
                src="/assets/blog-bhurban-terrace-dining-dusk.png"
                alt="Luxury outdoor dining on a terrace overlooking the scenic mountain valley of Bhurban Murree at dusk"
              />
            </section>

            <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-8">
              <h2 className="mb-4 font-display text-2xl font-semibold text-[#1A1A1A]">Final Thoughts</h2>
              <p className="leading-relaxed text-slate-700">
                Bhurban and Murree offer far more than just scenic beauty — they deliver a complete travel experience. From adventure
                and exploration to relaxation and luxury, there’s something for every traveler.
              </p>
              <p className="mt-4 leading-relaxed text-slate-700 m-0">
                Plan your stay at Himalaya Villas and discover Bhurban in a way that is comfortable, memorable, and truly premium.
              </p>
            </section>

            <section className="mt-16 border-t border-slate-200 pt-12">
              <h2 className="mb-8 font-display text-3xl font-medium text-[#1A1A1A]">
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
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
