import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { GUIDE_TOPICS, GUIDES_BY_TOPIC, guideHubPath, guideTopic } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_TOPICS.map((topic) => ({ topic: topic.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: id } = await params;
  const topic = guideTopic(id);
  if (!topic) return {};
  return createPageMetadata({
    title: `${topic.title}: Murree and Bhurban Guides`,
    description: topic.intro,
    path: guideHubPath(topic.id),
  });
}

export default async function GuideHubPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: id } = await params;
  const topic = guideTopic(id);
  if (!topic) notFound();
  const guides = GUIDES_BY_TOPIC[topic.id];

  return (
    <div className="min-h-screen bg-white">
      <Navbar theme="light" />
      <main className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <Link href="/" className="hover:text-[#8b6914]">Home</Link> /{" "}
            <Link href="/guides" className="hover:text-[#8b6914]">Guides</Link> / {topic.title}
          </nav>
          <h1 className="mt-4 font-display text-4xl text-neutral-900 md:text-6xl">{topic.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">{topic.intro}</p>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={guide.href}
                  className="block h-full rounded-xl border border-[#e5e1d8] px-5 py-4 text-[15px] leading-snug text-neutral-800 transition hover:border-[#c9a55b] hover:text-[#8b6914]"
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-2xl text-neutral-900">Other guide topics</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {GUIDE_TOPICS.filter((other) => other.id !== topic.id).map((other) => (
              <li key={other.id}>
                <Link
                  href={guideHubPath(other.id)}
                  className="inline-block rounded-full border border-[#e5e1d8] px-4 py-2 text-sm text-neutral-700 hover:border-[#c9a55b]"
                >
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
