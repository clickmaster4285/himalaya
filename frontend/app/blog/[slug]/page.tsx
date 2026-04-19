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

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <JsonLd items={[jsonLd]} />
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
          <p>
            This guide is part of the Himalaya Villas journal. For availability, private tours, and bespoke mountain
            stays in Bhurban, continue to our booking desk or explore villas below.
          </p>
          {post.href && post.href !== blogCanonicalPath(post.slug) ? (
            <p>
              <Link href={post.href} className="font-medium text-[#8b6914] underline underline-offset-4">
                Open the full editorial layout for this story
              </Link>
              {" — same topic, expanded on-page design."}
            </p>
          ) : null}
          {post.relatedVillaSlug ? (
            <p>
              Related residence:{" "}
              <Link
                href={`/villas/${encodeURIComponent(post.relatedVillaSlug)}`}
                className="font-medium text-[#8b6914] underline underline-offset-4"
              >
                View villa
              </Link>
              .
            </p>
          ) : null}
        </div>

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
