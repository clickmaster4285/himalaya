// components/cms/CmsArticle.tsx
// ERP-created blog pages rendered in the site's own blog article layout
// (the same UI as app/blogs/[slug]): Journal breadcrumb, date + read time,
// display title, cover image, article body with the sticky Contents sidebar,
// FAQ card, action buttons and related links. ERP section JSON only supplies
// the content; every bit of styling is the site's.
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/blogs/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedGuides, type RelatedGuideLink } from "@/components/seo/RelatedGuides";
import { featuredGuides, guideHubPath } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo/site-config";
import type { CmsPage, CmsSection } from "@/lib/cms";
import CmsRichText, { headingId, richTextHeadings } from "./CmsRichText";
import { SITE_CHROME, postCards, renderSection } from "./CmsSectionRenderer";
import { button, isExternal, items, pick, safeImage, type CmsLink } from "./cmsContent";

/** ERP page types shown in the blog article layout. */
const ARTICLE_TYPES = new Set(["blog", "article", "post", "news"]);

export function isArticlePage(page: CmsPage) {
  return ARTICLE_TYPES.has(page.pageType.toLowerCase());
}

/** Sections that become part of the article body / sidebar, not full-width bands. */
const BODY_TYPES = new Set(["richText", "customContent", "text", "image", "imageText"]);
const HANDLED_TYPES = new Set([...BODY_TYPES, "hero", "author", "faq", "cta", "blogPosts", "relatedPosts"]);

const stripTags = (html: string) => html.replace(/<[^>]*>/g, " ");

function isoDate(iso: string) {
  const d = new Date(iso);
  // en-CA formats as YYYY-MM-DD, the same date style the site's blog posts use.
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });
}

const btnPrimary =
  "inline-flex items-center justify-center bg-neutral-900 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-800";
const btnSecondary =
  "inline-flex items-center justify-center border border-neutral-300 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 hover:bg-white";

function ActionLink({ link, className }: { link: CmsLink; className: string }) {
  return isExternal(link.link) ? (
    <a href={link.link} className={className} target="_blank" rel="noopener noreferrer">
      {link.text}
    </a>
  ) : (
    <Link href={link.link} className={className}>
      {link.text}
    </Link>
  );
}

/** One body section in the article column, in ERP order. */
function BodyBlock({ section }: { section: CmsSection }) {
  const c = section.content;
  const heading = section.type === "image" ? "" : pick(c, "heading");
  const html = section.type === "text" ? "" : pick(c, "bodyHtml");
  const body = section.type === "text" ? pick(c, "body") : "";
  const image = safeImage(pick(c, "image"));
  const caption = pick(c, "caption");
  if (!heading && !html && !body && !image) return null;

  return (
    <section className="mt-10 first:mt-0">
      {heading && (
        <h2 id={headingId(heading)} className="scroll-mt-28 font-bold text-neutral-900">
          {heading}
        </h2>
      )}
      {image && (
        <figure className="mt-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#eadfce] bg-neutral-100">
            <Image
              src={image}
              alt={pick(c, "alt") || heading || caption || ""}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 900px"
              unoptimized={isExternal(image)}
            />
          </div>
          {caption && <figcaption className="mt-2 text-xs text-neutral-500">{caption}</figcaption>}
        </figure>
      )}
      {body &&
        body
          .split(/\n{2,}|\r\n\r\n/)
          .map((p) => p.trim())
          .filter(Boolean)
          .map((p, i) => (
            <p key={i} className="mt-3 whitespace-pre-line text-[15px] leading-7 text-neutral-600">
              {p}
            </p>
          ))}
      {html && <CmsRichText html={html} variant="article" className={heading || image ? "mt-3" : ""} />}
    </section>
  );
}

export default function CmsArticle({ page }: { page: CmsPage }) {
  const sections = page.sections.filter((s) => !SITE_CHROME.has(s.type));
  const hero = sections.find((s) => s.type === "hero")?.content ?? {};
  const body = sections.filter((s) => BODY_TYPES.has(s.type));
  const author = sections.find((s) => s.type === "author")?.content;
  const faqSection = sections.find((s) => s.type === "faq");
  const cta = sections.find((s) => s.type === "cta")?.content;
  const related = sections.find((s) => s.type === "relatedPosts" || s.type === "blogPosts");
  // Anything else the ERP adds (gallery, video, stats, ...) still renders,
  // as the site's full-width CMS sections below the article.
  const extras = sections
    .filter((s) => !HANDLED_TYPES.has(s.type))
    .map((s) => ({ section: s, node: renderSection(s, page) }))
    .filter((s) => s.node !== null);

  const title = pick(hero, "heading", "title") || page.title;
  const intro = pick(hero, "description");
  const cover = safeImage(pick(hero, "image", "backgroundImage")) || safeImage(page.featuredImage);
  const date = isoDate(page.publishedAt);

  const words = [intro, ...body.map((s) => [pick(s.content, "heading"), pick(s.content, "body"), stripTags(pick(s.content, "bodyHtml"))].join(" "))]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(words / 200));

  const tocHeadings = body.flatMap((s) => {
    const heading = s.type === "image" ? "" : pick(s.content, "heading");
    const own = heading ? [{ id: headingId(heading), text: heading }] : [];
    return [...own, ...(s.type === "text" ? [] : richTextHeadings(pick(s.content, "bodyHtml")))];
  }).filter((h, i, all) => h.id && all.findIndex((o) => o.id === h.id) === i);

  const faqs = faqSection
    ? items(faqSection.content)
        .map((i) => ({ question: pick(i, "question"), answer: pick(i, "answer") }))
        .filter((i) => i.question && i.answer)
    : [];

  const actions: CmsLink[] = cta
    ? [button(cta, "primary"), button(cta, "secondary")].filter((b): b is CmsLink => !!b)
    : [];
  const buttons = actions.length
    ? actions
    : [
        { text: "Book a stay", link: "/book/stay" },
        { text: "View villas", link: "/villas" },
      ];

  const erpRelated: RelatedGuideLink[] = related
    ? postCards(related, page).map((p) => ({ href: p.url, title: p.title }))
    : [];
  const relatedLinks = erpRelated.length
    ? erpRelated
    : featuredGuides(["plan-your-trip", "weather-and-seasons", "stays"], page.slug);
  const relatedHeading = (related && pick(related.content, "heading")) || "Related guides";

  const authorName = author ? pick(author, "name") : "";
  const jsonLd = [
    {
      id: "hv-jsonld-cms-article",
      data: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        ...(intro ? { description: intro } : {}),
        ...(cover ? { image: absoluteUrl(cover) } : {}),
        ...(page.publishedAt ? { datePublished: page.publishedAt } : {}),
        ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
        mainEntityOfPage: absoluteUrl(page.slug),
      },
    },
    ...(faqs.length
      ? [
          {
            id: "hv-jsonld-cms-article-faq",
            data: {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          },
        ]
      : []),
  ];

  let ctaText: ReactNode = null;
  if (cta && (pick(cta, "heading") || pick(cta, "description"))) {
    ctaText = (
      <div className="w-full">
        {pick(cta, "heading") && <h2 className="font-display text-2xl text-neutral-900">{pick(cta, "heading")}</h2>}
        {pick(cta, "description") && (
          <p className="mt-2 text-[15px] leading-7 text-neutral-600">{pick(cta, "description")}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1EA]" data-cms-page={page.slug}>
      <JsonLd items={jsonLd} />
      <Navbar theme="light" />

      <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-28 md:px-10 md:pt-32">
        <div className="flex gap-12">
          <article className="min-w-0 flex-1">
            <nav className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              <Link href="/blogs" className="hover:text-neutral-800">
                Journal
              </Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-800">Article</span>
            </nav>

            <header className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#8b6914]">
                {date ? `${date} · ` : ""}
                {readMinutes} min read
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">{title}</h1>
            </header>

            {cover && (
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-sm border border-[#eadfce] bg-neutral-100">
                <Image
                  src={cover}
                  alt={pick(hero, "alt") || title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                  priority
                  unoptimized={isExternal(cover)}
                />
              </div>
            )}

            <div className="mt-12">
              {intro && <p className="mb-10 text-[15px] leading-7 text-neutral-600">{intro}</p>}
              {body.map((s) => (
                <BodyBlock key={s.id} section={s} />
              ))}
            </div>

            {author && authorName && (
              <section className="mt-14 flex flex-col gap-5 rounded-lg border border-[#eadfce] bg-white p-6 sm:flex-row md:p-8">
                {safeImage(pick(author, "image")) && (
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={safeImage(pick(author, "image"))}
                      alt={authorName}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized={isExternal(safeImage(pick(author, "image")))}
                    />
                  </span>
                )}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b6914]">
                    {pick(author, "heading", "label") || "About the author"}
                  </p>
                  <p className="mt-2 font-display text-2xl text-neutral-900">{authorName}</p>
                  {pick(author, "role") && <p className="mt-1 text-sm text-neutral-500">{pick(author, "role")}</p>}
                  {pick(author, "bioHtml") && <CmsRichText html={pick(author, "bioHtml")} variant="article" className="mt-3" />}
                </div>
              </section>
            )}

            {faqs.length > 0 && (
              <section className="mt-14 rounded-lg border border-[#eadfce] bg-white p-6 md:p-8">
                <h2 className="font-display text-2xl text-neutral-900">
                  {pick(faqSection!.content, "heading") || "Frequently Asked Questions"}
                </h2>
                <div className="mt-6 space-y-4">
                  {faqs.map((faq, i) => (
                    <article key={i} className="rounded-md border border-[#efe3d2] bg-[#fbf8f2] p-4">
                      <h3 className="text-base font-semibold text-neutral-900">{faq.question}</h3>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-14 flex flex-wrap gap-4 border-t border-[#eadfce] pt-10">
              {ctaText}
              {buttons.map((b, i) => (
                <ActionLink key={i} link={b} className={i === 0 ? btnPrimary : btnSecondary} />
              ))}
            </div>
          </article>

          <TableOfContents headings={tocHeadings} />
        </div>
      </div>

      {extras.map(({ section, node }) => (
        <div key={section.id} data-cms-section={section.type}>
          {node}
        </div>
      ))}

      <RelatedGuides
        heading={relatedHeading}
        guides={relatedLinks}
        hub={erpRelated.length ? undefined : { href: guideHubPath("plan-your-trip"), title: "Plan Your Trip" }}
      />
      <Footer />
    </div>
  );
}
