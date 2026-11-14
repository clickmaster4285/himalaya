// components/cms/CmsSectionRenderer.tsx
// Maps ERP section JSON onto Himalaya Villas section components.
// The ERP controls content and layout settings only; styling always comes
// from these components. Header/navbar/footer are skipped (the site's own
// Navbar and Footer render instead); unknown types ("newsletter", "html",
// "columns", ...) are skipped silently. Nothing from the ERP is injected as
// raw HTML or executed as script (rich text goes through CmsRichText).
import type { CmsPage, CmsSection } from "@/lib/cms";
import CmsHero from "./CmsHero";
import CmsTextSection from "./CmsTextSection";
import CmsRichTextSection from "./CmsRichTextSection";
import CmsFeaturesSection, { type CmsFeatureItem } from "./CmsFeaturesSection";
import CmsImageTextSection from "./CmsImageTextSection";
import CmsStatsSection from "./CmsStatsSection";
import CmsTestimonialsSection from "./CmsTestimonialsSection";
import CmsTeamSection from "./CmsTeamSection";
import CmsTimelineSection from "./CmsTimelineSection";
import CmsPricingSection from "./CmsPricingSection";
import CmsGallerySection from "./CmsGallerySection";
import CmsLogosSection from "./CmsLogosSection";
import CmsVideoSection, { videoEmbedUrl } from "./CmsVideoSection";
import CmsContactSection from "./CmsContactSection";
import CmsFaqSection from "./CmsFaqSection";
import CmsCtaSection from "./CmsCtaSection";
import CmsPostsSection, { type CmsPostCard } from "./CmsPostsSection";
import CmsAuthorSection from "./CmsAuthorSection";
import CmsBentoSection from "./CmsBentoSection";
import { button, items, pick, safeHref, safeImage, sectionLayout, type Tone, type Width } from "./cmsContent";

// The site's own Navbar/Footer replace the ERP chrome sections.
export const SITE_CHROME = new Set(["header", "navbar", "footer"]);

const GRID_VARIANT: Record<string, "cards" | "numbered" | "icons"> = {
  features: "icons",
  services: "icons",
  benefits: "icons",
  cards: "cards",
  process: "numbered",
};

// Default band per type when the ERP leaves `background` unset/"default",
// alternating cream / sand / forest green like the estate's landing pages.
const DEFAULTS: Record<string, { tone?: Tone; width?: Width }> = {
  stats: { tone: "dark" },
  testimonials: { tone: "muted" },
  process: { tone: "dark" },
  cta: { tone: "muted" },
  faq: { tone: "light" },
  text: { width: "default" },
  richText: { width: "narrow" },
  customContent: { width: "narrow" },
};

function layoutFor(section: CmsSection) {
  const settings = { ...section.settings };
  // "default" in the ERP means "the site's default", not a specific colour.
  if (settings.background === "default") delete settings.background;
  return sectionLayout(settings, DEFAULTS[section.type]);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Karachi" });
}

export function postCards(section: CmsSection, page: CmsPage): CmsPostCard[] {
  const c = section.content;
  const cards: CmsPostCard[] =
    c.mode === "manual"
      ? items(c).map((i) => ({
          title: pick(i, "title"),
          url: safeHref(pick(i, "url")),
          excerpt: pick(i, "description", "excerpt"),
          image: safeImage(pick(i, "image")),
        }))
      : page.posts.map((p) => ({
          title: p.title,
          url: safeHref(p.url),
          excerpt: p.excerpt,
          image: safeImage(p.image),
          date: formatDate(p.publishedAt),
        }));
  const limit = typeof c.limit === "number" ? Math.min(Math.max(Math.floor(c.limit), 1), 24) : 3;
  return cards.filter((p) => p.title && p.url && p.url !== page.slug).slice(0, limit);
}

export function renderSection(section: CmsSection, page: CmsPage) {
  const c = section.content;
  const type = section.type;
  const layout = layoutFor(section);

  if (SITE_CHROME.has(type)) return null;

  if (type in GRID_VARIANT) {
    const list: CmsFeatureItem[] = items(c)
      .map((i) => ({
        icon: pick(i, "icon"),
        title: pick(i, "title"),
        description: pick(i, "description"),
        image: safeImage(pick(i, "image")),
        url: safeHref(pick(i, "url")),
        linkLabel: pick(i, "linkLabel"),
      }))
      .filter((i) => i.title);
    if (!list.length) return null;
    return (
      <CmsFeaturesSection
        layout={layout}
        data={{
          eyebrow: pick(c, "eyebrow"),
          heading: pick(c, "heading"),
          description: pick(c, "description"),
          items: list,
          variant: GRID_VARIANT[type],
        }}
      />
    );
  }

  switch (type) {
    case "hero": {
      const heading = pick(c, "heading", "title");
      if (!heading) return null;
      return (
        <CmsHero
          layout={layout}
          data={{
            eyebrow: pick(c, "eyebrow", "subtitle"),
            heading,
            description: pick(c, "description"),
            meta: pick(c, "meta"),
            image: safeImage(pick(c, "image", "backgroundImage")),
            alt: pick(c, "alt"),
            cta: button(c, "primary"),
            secondaryCta: button(c, "secondary"),
          }}
        />
      );
    }

    case "text": {
      const heading = pick(c, "heading");
      const body = pick(c, "body");
      if (!heading && !body) return null;
      return (
        <CmsTextSection
          layout={layout}
          data={{ eyebrow: pick(c, "eyebrow"), heading, body, cta: button(c, "primary"), secondaryCta: button(c, "secondary") }}
        />
      );
    }

    case "richText":
    case "customContent": {
      const html = pick(c, "bodyHtml");
      if (!html) return null;
      return <CmsRichTextSection layout={layout} data={{ heading: pick(c, "heading"), html }} />;
    }

    case "image":
    case "imageText": {
      const image = safeImage(pick(c, "image"));
      const bodyHtml = pick(c, "bodyHtml");
      if (!image && !bodyHtml && !pick(c, "heading")) return null;
      return (
        <CmsImageTextSection
          layout={layout}
          data={{
            eyebrow: pick(c, "eyebrow"),
            heading: type === "image" ? "" : pick(c, "heading"),
            bodyHtml: type === "image" ? "" : bodyHtml,
            image,
            alt: pick(c, "alt"),
            caption: pick(c, "caption"),
            cta: button(c, "primary"),
            imagePosition: section.settings.imagePosition === "left" ? "left" : "right",
          }}
        />
      );
    }

    case "stats": {
      const list = items(c)
        .map((i) => ({ value: pick(i, "value"), label: pick(i, "label") }))
        .filter((i) => i.value);
      if (!list.length) return null;
      return <CmsStatsSection layout={layout} data={{ heading: pick(c, "heading"), description: pick(c, "description"), items: list }} />;
    }

    case "bento": {
      const list = items(c)
        .map((i) => ({
          title: pick(i, "title"),
          description: pick(i, "description"),
          span: pick(i, "span"),
          image: safeImage(pick(i, "image")),
        }))
        .filter((i) => i.title);
      if (!list.length) return null;
      return <CmsBentoSection layout={layout} data={{ heading: pick(c, "heading"), items: list }} />;
    }

    case "author": {
      const name = pick(c, "name");
      if (!name) return null;
      return (
        <CmsAuthorSection
          layout={layout}
          data={{
            label: pick(c, "heading"),
            name,
            role: pick(c, "role"),
            image: safeImage(pick(c, "image")),
            bioHtml: pick(c, "bioHtml"),
          }}
        />
      );
    }

    case "blogPosts":
    case "relatedPosts": {
      const posts = postCards(section, page);
      if (!posts.length) return null;
      return (
        <CmsPostsSection
          layout={layout}
          data={{ eyebrow: pick(c, "eyebrow"), heading: pick(c, "heading"), description: pick(c, "description"), posts }}
        />
      );
    }

    case "testimonials": {
      const list = items(c)
        .map((i) => ({ quote: pick(i, "quote"), name: pick(i, "name"), role: pick(i, "role"), image: safeImage(pick(i, "image")) }))
        .filter((i) => i.quote);
      if (!list.length) return null;
      return <CmsTestimonialsSection layout={layout} data={{ eyebrow: pick(c, "eyebrow"), heading: pick(c, "heading"), items: list }} />;
    }

    case "team": {
      const list = items(c)
        .map((i) => ({ name: pick(i, "name"), role: pick(i, "role"), image: safeImage(pick(i, "image")), bio: pick(i, "bio") }))
        .filter((i) => i.name);
      if (!list.length) return null;
      return <CmsTeamSection layout={layout} data={{ heading: pick(c, "heading"), description: pick(c, "description"), items: list }} />;
    }

    case "timeline": {
      const list = items(c)
        .map((i) => ({ date: pick(i, "date"), title: pick(i, "title"), description: pick(i, "description") }))
        .filter((i) => i.title);
      if (!list.length) return null;
      return <CmsTimelineSection layout={layout} data={{ heading: pick(c, "heading"), description: pick(c, "description"), items: list }} />;
    }

    case "pricing": {
      const list = items(c)
        .map((i) => {
          const text = pick(i, "buttonLabel");
          const link = safeHref(pick(i, "buttonUrl"));
          const features = Array.isArray(i.features)
            ? i.features.filter((f): f is string => typeof f === "string").map((f) => f.trim())
            : pick(i, "features").split(/\r?\n/).map((f) => f.trim());
          return {
            name: pick(i, "name"),
            price: pick(i, "price"),
            period: pick(i, "period"),
            description: pick(i, "description"),
            features: features.filter(Boolean),
            cta: text && link ? { text, link } : undefined,
            featured: i.featured === true,
          };
        })
        .filter((i) => i.name);
      if (!list.length) return null;
      return (
        <CmsPricingSection
          layout={layout}
          data={{ eyebrow: pick(c, "eyebrow"), heading: pick(c, "heading"), description: pick(c, "description"), items: list }}
        />
      );
    }

    case "gallery": {
      const list = items(c)
        .map((i) => ({ image: safeImage(pick(i, "image")), caption: pick(i, "caption") }))
        .filter((i) => i.image);
      if (!list.length) return null;
      return (
        <CmsGallerySection
          layout={layout}
          data={{ eyebrow: pick(c, "eyebrow"), heading: pick(c, "heading"), description: pick(c, "description"), items: list }}
        />
      );
    }

    case "logos": {
      const list = items(c)
        .map((i) => ({ image: safeImage(pick(i, "image")), name: pick(i, "name"), url: safeHref(pick(i, "url")) }))
        .filter((i) => i.image || i.name);
      if (!list.length) return null;
      return <CmsLogosSection layout={layout} data={{ heading: pick(c, "heading"), items: list }} />;
    }

    case "video": {
      const embedUrl = videoEmbedUrl(pick(c, "videoUrl"));
      if (!embedUrl) return null;
      return <CmsVideoSection layout={layout} data={{ heading: pick(c, "heading"), description: pick(c, "description"), embedUrl }} />;
    }

    case "contact": {
      const data = {
        heading: pick(c, "heading"),
        description: pick(c, "description"),
        image: safeImage(pick(c, "image")),
        email: pick(c, "email"),
        phone: pick(c, "phone"),
        address: pick(c, "address"),
        buttonLabel: pick(c, "buttonLabel"),
      };
      if (!data.heading && !data.email && !data.phone && !data.address) return null;
      return <CmsContactSection layout={layout} data={data} />;
    }

    case "faq": {
      const list = items(c)
        .map((i) => ({ question: pick(i, "question", "q"), answer: pick(i, "answer", "a") }))
        .filter((i) => i.question && i.answer);
      if (!list.length) return null;
      return (
        <CmsFaqSection
          layout={layout}
          data={{ eyebrow: pick(c, "eyebrow"), heading: pick(c, "heading") || "Frequently asked questions", description: pick(c, "description"), items: list }}
        />
      );
    }

    case "cta": {
      const heading = pick(c, "heading");
      if (!heading) return null;
      return (
        <CmsCtaSection
          layout={layout}
          data={{
            eyebrow: pick(c, "eyebrow"),
            heading,
            description: pick(c, "description"),
            cta: button(c, "primary"),
            secondaryCta: button(c, "secondary"),
          }}
        />
      );
    }

    default:
      return null;
  }
}

/** Sections that actually render (chrome, unknown and empty sections dropped). */
export function renderableSections(page: CmsPage) {
  return page.sections
    .map((section) => ({ section, node: renderSection(section, page) }))
    .filter((s) => s.node !== null);
}

export default function CmsSectionRenderer({ sections }: { sections: ReturnType<typeof renderableSections> }) {
  return (
    <>
      {sections.map(({ section, node }) => (
        <div key={section.id} data-cms-section={section.type} id={`cms-${section.id.replace(/[^A-Za-z0-9_-]/g, "")}`}>
          {node}
        </div>
      ))}
    </>
  );
}
