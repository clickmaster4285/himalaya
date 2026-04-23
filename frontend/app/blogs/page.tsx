import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsPageClient from "@/components/blogs/BlogsPageClient";
import { getPublishedVillas } from "@/lib/villas-fetch";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Journal — villa stories & Bhurban guides",
  description:
    "Guides and stories from Himalaya Villas: Bhurban travel, luxury villa life, Murree hills, family stays, and estate notes for discerning guests.",
  path: "/blogs",
  keywords: ["Himalaya Villas blog", "Bhurban Murree guide", "luxury villa Pakistan", "mountain journal"],
  ogImage: "/assets/journal-group-new.jpg",
});

export default async function BlogsPage() {
  const villas = await getPublishedVillas();

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <Navbar />
      <BlogsPageClient villas={villas} />
      <Footer />
    </div>
  );
}
