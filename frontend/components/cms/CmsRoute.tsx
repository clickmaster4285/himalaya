// components/cms/CmsRoute.tsx
// Renders whatever page the ERP has published at a URL path, inside the
// site's own Navbar and Footer. Used as the fallback of app/[slug] (for slugs
// no article owns) and by app/[slug]/[...rest] for nested ERP slugs.
// No per-page code: path in, page out.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildCmsMetadata, getCmsPage } from "@/lib/cms";
import { withEditedPageSeo } from "@/lib/erp-edits";
import CmsSectionRenderer, { renderableSections } from "./CmsSectionRenderer";
import { heroIsDark } from "./CmsHero";
import { safeImage, sectionLayout } from "./cmsContent";

/** "/a/b" from route segments (["a", "b"]). */
export function cmsPath(segments: string[]) {
  return `/${segments.map((s) => s.toLowerCase()).join("/")}`;
}

export async function cmsRouteMetadata(path: string): Promise<Metadata> {
  return withEditedPageSeo(path, buildCmsMetadata(await getCmsPage(path)));
}

export default async function CmsRoute({ path }: { path: string }) {
  const page = await getCmsPage(path);
  if (!page) notFound();

  const sections = renderableSections(page);
  const first = sections[0]?.section;
  // The fixed Navbar is transparent with white text: only start under it
  // when the page opens with a dark hero; otherwise use its light theme.
  const darkTop =
    first?.type === "hero" &&
    heroIsDark(sectionLayout(first.settings), !!safeImage(String(first.content.image ?? first.content.backgroundImage ?? "")));

  return (
    <>
      <Navbar theme={darkTop ? "dark" : "light"} />
      {/* Hero variants pad for the fixed Navbar themselves. */}
      <main className={first?.type === "hero" ? "bg-[#faf7f1]" : "bg-[#faf7f1] pt-20 md:pt-24"} data-cms-page={page.slug}>
        <CmsSectionRenderer sections={sections} />
      </main>
      <Footer />
    </>
  );
}
