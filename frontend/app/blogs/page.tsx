import DetailNavbar from "@/components/DetailNavbar";
import Footer from "@/components/Footer";
import BlogsPageClient from "@/components/blogs/BlogsPageClient";
import { getPublishedVillas } from "@/lib/villas-fetch";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const villas = await getPublishedVillas();

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <DetailNavbar />
      <BlogsPageClient villas={villas} />
      <Footer />
    </div>
  );
}
