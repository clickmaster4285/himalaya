import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogCanonicalPath, getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog-posts";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { buildBlogPostingJsonLd } from "@/lib/seo/blog-jsonld";
import { getBlogContent } from "@/lib/blog-content";
import { shouldUnoptimizeImageSrc, getValidImageSrc } from "@/lib/image-utils";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const path = blogCanonicalPath(slug);
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path,
    keywords: ["Himalaya Villas", "Bhurban", "Murree", "luxury villa", post.slug.replace(/-/g, " ")],
    ogImage: post.coverImage,
    ogType: "article",
    publishedTime: `${post.date}T12:00:00+05:00`,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const cover = getValidImageSrc(post.coverImage);
  const jsonLd = buildBlogPostingJsonLd(post);
  const content = getBlogContent(post);
  const faqJsonLd = {
    id: `hv-jsonld-blog-faq-${post.slug}`,
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (content.faqs ?? []).map((faq) => ({
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
      <JsonLd items={[jsonLd, faqJsonLd]} />
      <DetailNavbar />

      <article className="mx-auto max-w-[900px] px-6 pb-20 pt-8 md:px-10 md:pt-12">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          <Link href="/blogs" className="hover:text-neutral-800">
            Journal
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-800">Article</span>
        </nav>

        <header className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#8b6914]">
            {post.date} · {post.readMinutes} min read
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal leading-tight text-neutral-900 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">{post.excerpt}</p>
        </header>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#eadfce] bg-neutral-100">
          <Image
            src={cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 900px"
            priority
            unoptimized={shouldUnoptimizeImageSrc(cover)}
          />
        </div>

        <div className="prose prose-neutral mt-12 max-w-none prose-p:text-[15px] prose-p:leading-7 prose-p:text-neutral-600">
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {content.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-bold text-neutral-900">{section.heading}</h2>
              {section.image && (
                <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#eadfce] bg-neutral-100">
                  <Image
                    src={getValidImageSrc(section.image)}
                    alt={section.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 900px) 100vw, 900px"
                    unoptimized={shouldUnoptimizeImageSrc(section.image)}
                  />
                </div>
              )}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-lg border border-[#eadfce] bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl text-neutral-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {content.faqs?.map((faq) => (
              <article key={faq.q} className="rounded-md border border-[#efe3d2] bg-[#fbf8f2] p-4">
                <h3 className="text-base font-semibold text-neutral-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-4 border-t border-[#eadfce] pt-10">
          <Link
            href="/book/stay"
            className="inline-flex items-center justify-center bg-neutral-900 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-800"
          >
            Book a stay
          </Link>
          <Link
            href="/villas"
            className="inline-flex items-center justify-center border border-neutral-300 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:bg-white"
          >
            View villas
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
