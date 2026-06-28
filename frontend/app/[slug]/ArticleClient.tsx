"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/public/images/articles/article1-villa.jpg";

import type { Article } from "@/content/types";

/* ================= TYPES ================= */
const article11Images = [
  "/images/articles/article-image1.jpg",
  "/images/articles/article-image5.jpg",
  "/images/articles/article-image6.jpg",
  "/images/articles/article-image1.jpg",
  "/images/articles/article-image10.jpg",
];

type BlockProps = {
  block?: any;
  index: number;
};

/* ================= MAIN COMPONENT ================= */

export default function ArticleClient({ article }: { article: Article }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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
            <BlockRenderer key={i} block={block} index={i} />
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
  "cta": CTABlock,
  "faqs": FAQBlock, // ← ADD THIS
};

/* ================= BLOCK RENDERER ================= */

function BlockRenderer({ block, index }: BlockProps) {
  const Component = blockMap[block.type];
  if (!Component) return null;

  return <Component block={block} index={index} />;
}

/* ================= BLOCKS ================= */

function CalloutQA({ block }: BlockProps) {
  return (
    <section className="pt-24 bg-[#fbf7ee]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-3xl md:text-4xl font-display">{block.question}</h2>
        <div className="my-8 h-px bg-[#e5dfcf]" />
        <p className="text-gray-700">{block.answer}</p>
      </div>
    </section>
  );
}

function ParagraphBlock({ block }: BlockProps) {
  return (
    <section className="pt-6 pb-16 bg-[#fbf7ee]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <p className="text-gray-700 leading-relaxed">{block.text}</p>
      </div>
    </section>
  );
}

/* ================= SECTION ================= */

function SectionBlock({ block, index }: BlockProps) {
  const imageSrc = article11Images[index % article11Images.length];
  const imageAlt = `Article image ${index + 1}`;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <div className="grid gap-12 md:gap-16 items-center md:grid-cols-2">
          {/* TEXT */}
          <div>
            {block.eyebrow && (
              <p className="text-sm uppercase tracking-widest text-[#a68b3b] mb-3">
                {block.eyebrow}
              </p>
            )}

            <h2 className="text-3xl md:text-4xl font-display mb-6">
              {block.heading}
            </h2>

            <div className="space-y-5 text-gray-800 text-justify">
              {block.paragraphs?.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <div className="relative">
              <div className="absolute -inset-3 border border-[#e5dfcf]" />
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="relative w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CTA BLOCK ================= */

function CTABlock({ block }: BlockProps) {
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
          href={block.buttonHref}
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

/* ================= FAQ BLOCK ================= */

function FAQBlock({ block }: BlockProps) {
  return (
    <section className="py-24 bg-[#fbf7ee]  ">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-3xl md:text-4xl font-display text-[#1b1b1b] mb-10 text-center">
          {block.heading}
        </h2>

        <div className="space-y-6">
          {block.items.map((item: any, i: number) => (
            <div key={i} className="pt-6 first:pt-0">
              <h3 className="text-lg font-semibold text-[#1b1b1b] mb-3">
                {item.q}
              </h3>
              <p className="text-[#4a4a4a] leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= OTHER BLOCKS ================= */

function FactsBlock({ block }: BlockProps) {
  return (
    <section className="py-24 bg-[#fbf7ee] border-y border-[#e5dfcf]">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-10">{block.heading}</h2>

        <div className="divide-y divide-[#e5dfcf]">
          {block.items.map((item: any, i: number) => (
            <div key={i} className="py-5 grid md:grid-cols-[200px_1fr] gap-4">
              <div className="text-sm uppercase text-[#a68b3b]">
                {item.label}
              </div>
              <div>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonBlock({ block }: BlockProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-10">{block.heading}</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e5dfcf]">
                {block.columns.map((col: string, i: number) => (
                  <th key={i} className="py-3 text-left font-semibold text-[#1b1b1b]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {block.rows.map((row: any, i: number) => {
                // Get all values from the row (a, b, c, d, e) as an array
                const values = ['a', 'b', 'c', 'd', 'e']
                  .map(key => row[key])
                  .filter(val => val !== undefined);
                
                return (
                  <tr key={i} className="border-b border-[#e5dfcf] hover:bg-[#fbf7ee]/50 transition-colors">
                    <td className="py-4 font-medium text-[#1b1b1b]">{row.feature}</td>
                    {values.map((val, j) => (
                      <td key={j} className="py-4 text-[#4a4a4a]">
                        {val}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      
      </div>
    </section>
  );
}

function AudienceBlock({ block }: BlockProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-12">{block.heading}</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {block.items.map((it: any, i: number) => (
            <div key={i} className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-gray-700">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedBlock({ block }: BlockProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6" data-reveal>
        <h2 className="text-4xl font-bold mb-10">{block.heading}</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {block.items.map((item: any, i: number) => (
            <Link
              key={i}
              href={item.href}
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