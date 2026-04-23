import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsPageClient from "@/components/blogs/BlogsPageClient";
import { getPublishedVillas } from "@/lib/villas-fetch";
import { createPageMetadata } from "@/lib/seo/build-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Journal | Mountain Stories & Retreat Insights",
  description:
    "Read curated journal entries from Himalaya Villas featuring mountain lifestyle notes, retreat inspiration, and premium Bhurban stay insights.",
  path: "/journal",
  keywords: ["Himalaya Journal", "Bhurban mountain stories", "retreat insights", "luxury villa journal"],
  ogImage: "/assets/journal-group-new.jpg",
});

export default async function JournalPage() {
  const villas = await getPublishedVillas();

  return (
    <div className="min-h-screen bg-[#F6F1EA]">
      <Navbar />
      <BlogsPageClient villas={villas} />
      <Footer />
    </div>
  );
}

