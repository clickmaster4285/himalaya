// components/cms/CmsPostsSection.tsx
// ERP "blogPosts" / "relatedPosts": journal cards like JournalSection.
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CmsSection, { toneText } from "./CmsSection";
import CmsSectionHeading from "./CmsSectionHeading";
import { isExternal, type SectionLayout } from "./cmsContent";

export type CmsPostCard = { title: string; url: string; excerpt: string; image: string; date?: string };

export default function CmsPostsSection({
  data,
  layout,
}: {
  data: { eyebrow?: string; heading?: string; description?: string; posts: CmsPostCard[] };
  layout: SectionLayout;
}) {
  const t = toneText(layout.tone);
  return (
    <CmsSection layout={layout}>
      <CmsSectionHeading eyebrow={data.eyebrow} heading={data.heading} description={data.description} tone={layout.tone} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.posts.map((post, i) => {
          const body = (
            <>
              {post.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized={isExternal(post.image)}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                {post.date && <p className={cn("text-xs tracking-[0.2em] uppercase mb-2", t.accent)}>{post.date}</p>}
                <h3 className={cn("font-display text-2xl font-normal leading-snug group-hover:text-[#c9a55b] transition-colors", t.heading)}>
                  {post.title}
                </h3>
                {post.excerpt && <p className={cn("mt-3 text-sm leading-relaxed line-clamp-3", t.body)}>{post.excerpt}</p>}
                <span className={cn("inline-block mt-5 text-xs font-semibold tracking-[0.2em] uppercase", t.accent)}>Read more ›</span>
              </div>
            </>
          );
          const className = cn("group block rounded-sm overflow-hidden transition-shadow hover:shadow-lg", t.card);
          return isExternal(post.url) ? (
            <a key={i} href={post.url} className={className} target="_blank" rel="noopener noreferrer">{body}</a>
          ) : (
            <Link key={i} href={post.url} className={className}>{body}</Link>
          );
        })}
      </div>
    </CmsSection>
  );
}
