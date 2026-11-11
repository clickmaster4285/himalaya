// app/[slug]/[...rest]/page.tsx
// Nested ERP CMS pages ("/a/b", "/a/b/c") under first segments that no
// code-owned route claims. Static routes (/villas/..., /blogs/..., etc.)
// always win; this only renders ERP pages and otherwise 404s.
import type { Metadata } from "next";
import CmsRoute, { cmsPath, cmsRouteMetadata } from "@/components/cms/CmsRoute";

// Rendered on demand (no ERP calls at build time). Publishes refresh instantly
// via /api/erp-revalidate; this interval is only a safety net.
export const revalidate = 300;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string; rest: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, rest } = await params;
  return cmsRouteMetadata(cmsPath([slug, ...rest]));
}

export default async function NestedCmsPage({ params }: Props) {
  const { slug, rest } = await params;
  return <CmsRoute path={cmsPath([slug, ...rest])} />;
}
