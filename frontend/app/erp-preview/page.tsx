// app/erp-preview/page.tsx
// Live preview of an unsaved ERP draft, framed by the ERP page editor:
//   /erp-preview?token=<48 hex>
// The draft is parsed by the same parser (lib/cms) and rendered by the same
// CmsPageView as the published page at its slug, so they look identical.
// Never cached, never indexed, never in the sitemap. Framing is allowed only
// for ERP_ADMIN_ORIGINS (proxy.ts); other routes keep X-Frame-Options.
import type { Metadata } from "next";
import { cache } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CmsPageView } from "@/components/cms/CmsRoute";
import { buildCmsMetadata, getCmsPreviewPage, isPreviewToken } from "@/lib/cms";
import { withEditedPageSeo } from "@/lib/erp-edits";
import { erpAdminOrigins } from "@/lib/erp-preview";
import ErpPreviewBridge from "./ErpPreviewBridge";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type Props = { searchParams: Promise<{ token?: string | string[] }> };

const NO_INDEX = { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } };

// Per-request dedupe only (metadata + page share one ERP call); not a data cache.
const loadDraft = cache(async (token: string) => (isPreviewToken(token) ? getCmsPreviewPage(token) : null));

async function draftFrom(searchParams: Props["searchParams"]) {
  const { token } = await searchParams;
  return loadDraft(typeof token === "string" ? token : "");
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = await draftFrom(searchParams);
  if (!page) return { title: "Preview expired", robots: NO_INDEX, alternates: { canonical: null } };
  // Same SEO as the published page (title, description, OG, canonical = its
  // real slug, never this URL), but always noindex, nofollow.
  const metadata = await withEditedPageSeo(page.slug, buildCmsMetadata(page));
  return { ...metadata, robots: NO_INDEX };
}

export default async function ErpPreviewPage({ searchParams }: Props) {
  const page = await draftFrom(searchParams);
  const bridge = <ErpPreviewBridge origins={erpAdminOrigins()} />;

  if (!page) {
    return (
      <>
        <Navbar theme="light" />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#faf7f1] px-6 pt-20 md:pt-24">
          <p className="text-center text-base text-neutral-600">Preview expired. Reopen it from the ERP editor.</p>
        </main>
        <Footer />
        {bridge}
      </>
    );
  }

  return (
    <>
      <CmsPageView page={page} />
      {bridge}
    </>
  );
}
