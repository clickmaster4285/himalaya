import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { GUIDE_TOPICS, GUIDES_BY_TOPIC, guideHubPath } from "@/lib/guides";
import { ESTATE_PAGE_GROUPS } from "@/lib/estate-pages";

export const metadata = createPageMetadata({
  title: "Murree and Bhurban Travel Guides",
  description:
    "Guides to Murree, Bhurban and the Galyat: planning a trip, weather by month, getting here, events and where to stay.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar theme="light" />
      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a07c1f]">Guides</p>
          <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-6xl">Murree and Bhurban Travel Guides</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Practical guides from the team at Himalaya Villas & Resorts in Bhurban, grouped by what you are planning.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {GUIDE_TOPICS.map((topic) => {
              const guides = GUIDES_BY_TOPIC[topic.id];
              return (
                <section key={topic.id} className="rounded-2xl border border-[#e5e1d8] p-7">
                  <h2 className="font-display text-3xl text-neutral-900">
                    <Link href={guideHubPath(topic.id)} className="hover:text-[#8b6914]">
                      {topic.title}
                    </Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-neutral-600">{topic.intro}</p>
                  <ul className="mt-5 space-y-2">
                    {guides.slice(0, 5).map((guide) => (
                      <li key={guide.slug}>
                        <Link href={guide.href} className="text-[15px] text-neutral-800 hover:text-[#8b6914]">
                          {guide.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={guideHubPath(topic.id)}
                    className="mt-6 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[#8b6914]"
                  >
                    All {guides.length} {topic.title.toLowerCase()} guides →
                  </Link>
                </section>
              );
            })}
          </div>

          <h2 className="mt-20 font-display text-3xl text-neutral-900 md:text-4xl">Explore the estate</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ESTATE_PAGE_GROUPS.map((group) => (
              <section key={group.title}>
                <h3 className="font-display text-2xl text-neutral-900">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-neutral-700 hover:text-[#8b6914]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
