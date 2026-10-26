"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/public/images/blogs/visit-murree.jpg";

import { autoLinkParagraph } from "@/lib/internal-links";
import type { Article, Block } from "@/content/types";

/* ================= TYPES ================= */
const article11Images = [
  "/images/articles/modern-villa-architectural-design.webp",
  "/images/articles/luxury-home-interior-design.webp",
  "/images/articles/contemporary-architecture-exterior.webp",
  "/images/articles/building-construction-progress.webp",
  "/images/articles/residential-property-development.webp",
];

type BlockProps = {
  block: Block;
  index: number;
  slug?: string;
  usedKeywords?: Set<string>;
};

/* ================= MAIN COMPONENT ================= */

export default function ArticleClient({ article }: { article: Article }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // ONE Set per page render. Every block shares this, so each keyword
  // links only once. Second+ occurrences are left as plain text.
  const usedKeywords = useMemo(() => new Set<string>(), [article.slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.9, delay: 0.15 });

      gsap.from(".hero-tagline", { opacity: 0, y: 14, duration: 1, delay: 0.7 });

      gsap.from(".hero-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        delay: 0.85,
      });

      gsap.to(".hero-image", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [article.slug]);

  return (
    <>
      <Navbar />

      <div ref={rootRef} className="bg-[#f7f3ea] text-[#1b1b1b] min-h-screen">
        {/* HERO */}
        <header
          ref={heroRef}
          className="relative isolate overflow-hidden h-[88vh] min-h-[600px]"
        >
          <Image
            src={heroImage}
            alt={article.h1}
            fill
            priority
            className="hero-image object-cover scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-4xl text-center text-white">
              <h1 className="text-4xl md:text-6xl font-normal leading-tight">
                {article.h1}
              </h1>

              {article.heroTagline && (
                <p className="hero-tagline mt-8 text-lg text-white/85 max-w-2xl mx-auto">
                  {article.heroTagline}
                </p>
              )}

              <div className="hero-rule mx-auto mt-8 h-px w-24 bg-primary" />
            </div>
          </div>
        </header>

        {/* BODY */}
        <main>
          {article.blocks.map((block, i) => (
            <BlockRenderer
              key={i}
              block={block}
              index={i}
              slug={article.slug}
              usedKeywords={usedKeywords}
            />
          ))}
        </main>
      </div>

      <Footer />
    </>
  );
}

/* ================= BLOCK MAP ================= */

const blockMap: Record<string, React.FC<BlockProps>> = {
  "callout-qa": CalloutQA,
  paragraph: ParagraphBlock,
  section: SectionBlock,
  facts: FactsBlock,
  comparison: ComparisonBlock,
  audience: AudienceBlock,
  related: RelatedBlock,
  cta: CTABlock,
  faqs: FAQBlock,
};

/* ================= BLOCK RENDERER ================= */

function BlockRenderer({ block, index, slug, usedKeywords }: BlockProps) {
  // Guard against undefined or unknown block types
  if (!block?.type) {
    console.warn(`Unknown or missing block type at index ${index}`);
    return null;
  }

  const Component = blockMap[block.type as keyof typeof blockMap];

  if (!Component) {
    console.warn(`No component found for block type: ${block.type}`);
    return null;
  }

  return (
    <Component
      block={block}
      index={index}
      slug={slug}
      usedKeywords={usedKeywords}
    />
  );
}

/* ================= BLOCKS ================= */

function CalloutQA({ block, slug, usedKeywords }: BlockProps) {
  if (block.type !== "callout-qa") return null;

  return (
    <section className="pt-24 bg-[#fbf7ee]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-3xl md:text-4xl font-display">{block.question}</h2>
        <div className="my-8 h-px bg-[#e5dfcf]" />
        <p className="text-gray-700">
          {autoLinkParagraph(block.answer, "callout", {
            slug,
            usedKeywords,
            wrapper: "span",
          })}
        </p>
      </div>
    </section>
  );
}

function ParagraphBlock({ block, slug, usedKeywords }: BlockProps) {
  if (block.type !== "paragraph" || block.text === undefined) return null;

  return (
    <section className="pt-6 pb-16 bg-[#fbf7ee]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        {autoLinkParagraph(block.text, "para", { slug, usedKeywords })}
      </div>
    </section>
  );
}

function SectionBlock({ block, index, slug, usedKeywords }: BlockProps) {
  if (block.type !== "section") return null;

  const imageSrc = article11Images[index % article11Images.length];
  const imageAlt =
    imageSrc
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "")
      ?.replace(/-/g, " ") ?? "Article image";

  const isReversed = index % 2 === 1;

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        {/* FLOAT CONTAINER */}
        <div className="flow-root">
          
          {/* IMAGE (Floated so text wraps around it) */}
          <div
            className={`mb-6 md:mb-4 w-full md:w-[48%] ${
              isReversed ? "md:float-right md:ml-8" : "md:float-left md:mr-8"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-3 border border-[#e5dfcf] pointer-events-none" />
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="relative w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* TEXT & HEADING */}
          <div className="text-gray-800">
            {/* Heading is now inside the flow, so it wraps beside the image */}
            <div className="mb-6">
              {block.eyebrow && (
                <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-2">
                  {block.eyebrow}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-display">
                {block.heading}
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="text-justify">
              {block.paragraphs?.map((p, i) => (
                <div key={i} className="mb-5 overflow-hidden">
                  {autoLinkParagraph(p, `sec-${index}-${i}`, {
                    slug,
                    usedKeywords,
                    wrapper: "span", 
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
function CTABlock({ block }: BlockProps) {
  if (block.type !== "cta") return null;

  return (
    <section className="py-24 bg-primary/10 text-black">
      <div className="max-w-4xl mx-auto px-6 text-center" data-reveal>
        {block.eyebrow && (
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            {block.eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-5xl font-display mb-6">
          {block.heading}
        </h2>
        <p className="text-black text-lg max-w-2xl mx-auto mb-10">
          {block.text}
        </p>
        <Link
          href={block.buttonHref || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-primary text-white font-semibold px-10 py-4 rounded-sm transition-colors"
        >
          {block.buttonLabel}
        </Link>
        {block.footnote && (
          <p className="mt-6 text-sm text-black/70">
            {block.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

function FAQBlock({ block, slug, usedKeywords }: BlockProps) {
  if (block.type !== "faqs") return null;

  if (!block.items || block.items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#fbf7ee]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <div className="rounded-lg border border-[#eadfce] bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl text-[#1b1b1b] mb-6">
            {block.heading}
          </h2>
          
          <div className="space-y-4">
            {block.items.map((item, i) => (
              <article key={i} className="rounded-md border border-[#efe3d2] bg-[#fbf8f2] p-4">
                <h3 className="text-base font-semibold text-[#1b1b1b]">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a4a4a]">
                  {item.a === undefined
                    ? null
                    : autoLinkParagraph(item.a, `faq-${i}`, {
                        slug,
                        usedKeywords,
                        wrapper: "span",
                      })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FactsBlock({ block, slug, usedKeywords }: BlockProps) {
  if (block.type !== "facts") return null;

  if (!block.items || block.items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#fbf7ee] border-y border-[#e5dfcf]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-10">{block.heading}</h2>
        <div className="divide-y divide-[#e5dfcf]">
          {block.items.map((item, i) => (
            <div key={i} className="py-5 grid md:grid-cols-[200px_1fr] gap-4">
              <div className="text-sm uppercase text-[#a68b3b]">
                {item.label}
              </div>
              <div>
                {item.value === undefined
                  ? null
                  : autoLinkParagraph(item.value, `fact-${i}`, {
                      slug,
                      usedKeywords,
                      wrapper: "span",
                    })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonBlock({ block, slug, usedKeywords }: BlockProps) {
  if (block.type !== "comparison") return null;

  if (!block.rows || block.rows.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 bg-[#fbf7ee]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        
        {/* Heading */}
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display text-[#1b1b1b]">
            {block.heading}
          </h2>
        </div>

        {/* Table Card Container */}
        <div className="overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              
              {/* Header */}
              <thead>
                <tr className="bg-[#fbf8f2] border-b border-[#eadfce]">
                  {block.columns?.map((col, i) => (
                    <th 
                      key={i} 
                      className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8b6914]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-[#f0e6d6]">
                {block.rows.map((row, i) => {
                  const values = ['a', 'b', 'c', 'd', 'e']
                    .map(key => row[key as keyof typeof row])
                    .filter(val => val !== undefined);

                  return (
                    <tr 
                      key={i} 
                      className="group hover:bg-[#fbf8f2] transition-colors duration-200"
                    >
                      {/* Feature Column */}
                      <td className="px-6 py-5 font-semibold text-neutral-900 align-top w-1/3">
                        {row.feature}
                      </td>
                      
                      {/* Data Columns */}
                      {values.map((val, j) => (
                        <td 
                          key={j} 
                          className="px-6 py-5 text-[15px] leading-relaxed text-neutral-600 align-top"
                        >
                          {autoLinkParagraph(String(val), `cmp-${i}-${j}`, {
                            slug,
                            usedKeywords,
                            wrapper: "span",
                          })}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

function AudienceBlock({ block, slug, usedKeywords }: BlockProps) {
  if (block.type !== "audience") return null;

  if (!block.items || block.items.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-12">{block.heading}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {block.items.map((item, i) => (
            <div key={i} className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">
                {item.text === undefined
                  ? null
                  : autoLinkParagraph(item.text, `aud-${i}`, {
                      slug,
                      usedKeywords,
                      wrapper: "span",
                    })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedBlock({ block }: BlockProps) {
  if (block.type !== "related") return null;

  // This guard prevents the "Cannot read properties of undefined (reading 'map')" error
  if (!block.items || block.items.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-10">{block.heading}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {block.items.map((item, i) => (
            <Link
              key={i}
              href={item.href || "#"}
              className="border border-[#e5dfcf] p-5 hover:bg-[#fbf7ee] italic transition-colors hover:underline tracking-wide hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}