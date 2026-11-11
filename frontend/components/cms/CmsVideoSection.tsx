// components/cms/CmsVideoSection.tsx
// ERP "video": YouTube / Vimeo embed.
import CmsSection from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import type { SectionLayout } from "./cmsContent";

/**
 * Builds an embed URL from a YouTube/Vimeo link. Only the parsed video id is
 * used — the ERP URL itself is never put into the iframe — so an ERP value
 * can't point the iframe at an arbitrary site.
 */
export function videoEmbedUrl(url: string): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return "";
  }
  const host = u.hostname.replace(/^www\./, "");
  let id = "";
  if (host === "youtu.be") id = u.pathname.slice(1);
  else if (host === "youtube.com" || host === "m.youtube.com") {
    id = u.searchParams.get("v") ?? (u.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ?? "");
  }
  if (/^[\w-]{6,20}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const vimeoId = u.pathname.match(/(\d{5,12})/)?.[1];
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return "";
}

export default function CmsVideoSection({
  data,
  layout,
}: {
  data: { heading?: string; description?: string; embedUrl: string };
  layout: SectionLayout;
}) {
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading heading={data.heading} description={data.description} tone={layout.tone} />
      <div className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden rounded-sm bg-[#1b261b]">
        <iframe
          src={data.embedUrl}
          title={data.heading || "Himalaya Villas & Resorts video"}
          className="absolute inset-0 size-full"
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </CmsSection>
  );
}
