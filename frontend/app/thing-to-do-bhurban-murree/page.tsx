import type { Metadata } from "next";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogCanonicalPath, findBlogSlugByLegacyHref, getBlogPostBySlug } from "@/lib/blog-posts";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const slug = findBlogSlugByLegacyHref("/thing-to-do-bhurban-murree");
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  if (!slug || !post) {
    return createPageMetadata({
      title: "Things to Do Near Bhurban Murree | Complete Travel & Activity Guide | Himalaya Villas",
      description:
        "Discover the best things to do near Bhurban Murree, including Patriata, Ayubia, Mall Road, hiking trails, and scenic viewpoints. Perfect travel guide for families and tourists staying at Himalaya Villas.",
      path: "/thing-to-do-bhurban-murree",
      appendSiteBrand: false,
    });
  }
  return createPageMetadata({
    title: "Things to Do Near Bhurban Murree | Complete Travel & Activity Guide | Himalaya Villas",
    description:
      "Discover the best things to do near Bhurban Murree, including Patriata, Ayubia, Mall Road, hiking trails, and scenic viewpoints. Perfect travel guide for families and tourists staying at Himalaya Villas.",
    path: "/thing-to-do-bhurban-murree",
    canonicalPath: blogCanonicalPath(slug),
    keywords: ["Bhurban", "Murree", "things to do", "Patriata", "Ayubia", "Himalaya Villas"],
    ogImage: post.coverImage,
    ogType: "article",
    publishedTime: `${post.date}T12:00:00+05:00`,
    appendSiteBrand: false,
  });
}

function InlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-900/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" />
    </div>
  );
}

export default function ThingToDoBhurbanMurreePage() {
  const faqs = [
    {
      q: "What is the best time to visit Bhurban Murree?",
      a: "The best time to visit is from April to October for pleasant weather and outdoor activities. For snowfall lovers, December to February offers a magical winter experience."
    },
    {
      q: "How far is Bhurban from Islamabad?",
      a: "Bhurban is approximately a 1.5 to 2-hour drive from Islamabad, making it an ideal destination for weekend trips."
    },
    {
      q: "Are there family-friendly activities in Bhurban?",
      a: "Yes, Bhurban offers many family-friendly activities, including nature walks, horse riding, visiting Patriata, and exploring scenic viewpoints."
    },
    {
      q: "Is Bhurban suitable for couples or honeymoons?",
      a: "Absolutely. Its peaceful environment, scenic beauty, and luxury accommodations make it perfect for couples and honeymooners."
    },
    {
      q: "What should I pack for a trip to Bhurban?",
      a: "Pack warm clothing (even for summer evenings), comfortable walking shoes, sunscreen, and a camera to capture the beautiful landscapes."
    },
    {
      q: "Can I visit Bhurban in winter?",
      a: "Yes, Bhurban is stunning in winter with snowfall. However, roads can be slippery, so it’s important to travel carefully and check weather conditions in advance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <DetailNavbar />
      
      <main className="max-w-4xl mx-auto px-6 py-32 md:py-40">
        <Link href="/blogs" className="inline-flex items-center text-[hsl(var(--primary))] hover:text-opacity-80 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
        </Link>
        <article className="prose prose-lg prose-slate max-w-none">
          <h1 className="not-prose text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] leading-tight mb-8">
            Things to Do Near Bhurban Murree — A Complete Activity Guide
          </h1>

          <div className="bg-white/50 p-8 rounded-xl border border-[hsl(var(--primary)/0.2)] mb-12 shadow-sm">
            <p className="text-lg text-slate-700 leading-relaxed mb-0">
              Bhurban and Murree offer far more than just scenic beauty — they deliver a complete travel experience. 
              From adventure and exploration to relaxation and luxury, there’s something for every traveler. 
              Here is our essential guide on the best things to do in Bhurban Murree to make your trip unforgettable.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">1. Ride the Patriata Chairlift & Cable Car</h2>
              <p className="text-slate-700 leading-relaxed">
                As one of the main attractions near Bhurban, Patriata (New Murree) offers incredible views of the forested hills. 
                Riding the world-class chairlift and cable car provides a birds-eye view of the majestic mountains, making it an essential activity for families and tourists alike.
              </p>
              <InlineImage
                src="/assets/blog-bhurban-patriata-chairlift.png"
                alt="Scenic view of Patriata chairlift moving over lush green mountains in Bhurban Murree"
              />
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">2. Take a Nature Walk in Bhurban Forest</h2>
              <p className="text-slate-700 leading-relaxed">
                One of the simplest yet most refreshing activities is exploring the natural beauty of Bhurban’s forests. 
                Surrounded by pine, oak, and cedar trees, this experience offers pure tranquility.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Fresh mountain air</li>
                <li>Peaceful walking trails</li>
                <li>Birdwatching opportunities</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">Perfect for morning walks or evening strolls in a calm, luxury setting.</p>
              <InlineImage
                src="/assets/blog-bhurban-forest-nature-walk.png"
                alt="Peaceful nature walk trail surrounded by dense pine trees in Bhurban Murree"
              />
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">3. Visit Mall Road Murree</h2>
              <p className="text-slate-700 leading-relaxed">
                A visit to Mall Road Murree is a must for anyone exploring the region. Located about 20–25 minutes from Bhurban, it’s the vibrant heart of Murree.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Street food and local cuisine</li>
                <li>Shopping for handicrafts and souvenirs</li>
                <li>Lively evening atmosphere</li>
              </ul>
              <InlineImage
                src="/assets/blog-bhurban-mall-road-night.png"
                alt="Vibrant evening at Mall Road Murree with lit shops and tourists"
              />
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">4. Visit Kashmir Point & Pindi Point</h2>
              <p className="text-slate-700 leading-relaxed">
                For breathtaking views, head to Kashmir Point and Pindi Point. These iconic viewpoints offer some of the most scenic landscapes in the region.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li><strong className="text-slate-900">Kashmir Point:</strong> Peaceful ambiance with mountain views</li>
                <li><strong className="text-slate-900">Pindi Point:</strong> Stunning overlooks and chairlift experiences</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">Perfect for relaxation, photography, and family visits.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">5. Experience Luxury Dining at PC Bhurban</h2>
              <p className="text-slate-700 leading-relaxed">
                A visit to Pearl Continental Bhurban adds a touch of elegance to your trip. 
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Fine dining with panoramic views</li>
                <li>Premium coffee experiences</li>
                <li>Beautifully maintained surroundings</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">It’s ideal for those seeking a refined and upscale dining experience.</p>
              <InlineImage
                src="/assets/blog-bhurban-pc-fine-dining-interior.png"
                alt="Upscale fine dining restaurant with panoramic mountain views at Pearl Continental Bhurban"
              />
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">6. Go Hiking and Trekking</h2>
              <p className="text-slate-700 leading-relaxed">
                Adventure seekers can explore a variety of scenic hiking trails around Bhurban and Murree.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Bhurban to Murree trail</li>
                <li>Patriata forest trails</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">These trails are beginner-friendly yet rewarding, offering stunning natural views and peaceful surroundings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">7. Discover Ayubia National Park</h2>
              <p className="text-slate-700 leading-relaxed">
                Located about 30–40 minutes away, Ayubia National Park is a must-visit destination for nature lovers.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Pipeline walking track</li>
                <li>Wildlife spotting</li>
                <li>Dense forest landscapes</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">It’s one of the best places for eco-tourism and outdoor exploration.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">8. Enjoy Horse Riding & Local Activities</h2>
              <p className="text-slate-700 leading-relaxed">
                Horse riding is a popular activity in Murree and nearby areas like Patriata. It’s particularly enjoyable for:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Families</li>
                <li>Children</li>
                <li>First-time visitors</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">A fun way to experience the hills in a traditional style.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">9. Capture Stunning Sunset Views</h2>
              <p className="text-slate-700 leading-relaxed">
                Bhurban is famous for its breathtaking sunsets. Watching the sun set behind the mountains creates a truly memorable moment.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
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
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">10. Relax in Luxury at Himalaya Villas</h2>
              <p className="text-slate-700 leading-relaxed">
                Sometimes, the best experience is simply to unwind in a private, luxury setting. At Himalaya Villas, you can:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>Enjoy peaceful, exclusive surroundings</li>
                <li>Take in uninterrupted mountain views</li>
                <li>Spend quality time with family</li>
                <li>Experience premium comfort and privacy</li>
              </ul>
              <p className="text-slate-700 mt-4 italic">It’s the perfect base for exploring Bhurban while enjoying a high-end, tranquil retreat.</p>
              <InlineImage
                src="/assets/blog-bhurban-terrace-dining-dusk.png"
                alt="Luxury outdoor dining on a terrace overlooking the scenic mountain valley of Bhurban Murree at dusk"
              />
            </section>

            <section className="bg-slate-50 p-8 rounded-xl border border-slate-200 mt-12">
              <h2 className="text-2xl font-display font-semibold text-[#1A1A1A] mb-4">Final Thoughts</h2>
              <p className="text-slate-700 leading-relaxed m-0">
                Plan your stay at Himalaya Villas and discover Bhurban in a way that is comfortable, memorable, and truly premium.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-3xl font-display font-medium text-[#1A1A1A] mb-8">Frequently Asked Questions (FAQs)</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                    <h3 className="text-lg font-medium text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600 m-0 leading-relaxed">{faq.a}</p>
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
