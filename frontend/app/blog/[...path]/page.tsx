// app/blog/[...path]/page.tsx
// "/blog/..." serves a page created in the ERP CMS at that path; anything
// else keeps the legacy permanent redirect to the matching "/blogs/..." URL.
import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import CmsRoute, { cmsPath, cmsRouteMetadata } from "@/components/cms/CmsRoute";
import { getCmsPage } from "@/lib/cms";

// Rendered on demand. Publishes refresh instantly via /api/erp-revalidate.
export const revalidate = 300;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ path: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  return cmsRouteMetadata(cmsPath(["blog", ...path]));
}

export default async function BlogCmsPage({ params }: Props) {
  const { path } = await params;
  const slug = cmsPath(["blog", ...path]);
  if (!(await getCmsPage(slug))) {
    permanentRedirect(`/blogs/${path.map(encodeURIComponent).join("/")}`);
  }
  return <CmsRoute path={slug} />;
}
