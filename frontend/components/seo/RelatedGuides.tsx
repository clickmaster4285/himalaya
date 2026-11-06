import Link from "next/link";

export type RelatedGuideLink = { href: string; title: string };

type Props = {
  heading?: string;
  guides: RelatedGuideLink[];
  hub?: { href: string; title: string };
  className?: string;
};

/**
 * HIM-ARCH-0001: contextual links into the guide hubs. Plain anchors in the server HTML, so a
 * crawler that does not run JavaScript still follows them.
 */
export function RelatedGuides({ heading = "Related guides", guides, hub, className = "" }: Props) {
  if (!guides.length) return null;
  return (
    <section aria-labelledby="related-guides-heading" className={`bg-[#faf7f1] px-6 py-14 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <h2 id="related-guides-heading" className="font-display text-3xl text-neutral-900 md:text-4xl">
          {heading}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="block h-full rounded-xl border border-[#e5e1d8] bg-white px-5 py-4 text-[15px] leading-snug text-neutral-800 transition hover:border-[#c9a55b] hover:text-[#8b6914]"
              >
                {guide.title}
              </Link>
            </li>
          ))}
        </ul>
        {hub && (
          <p className="mt-8 text-sm text-neutral-600">
            More in{" "}
            <Link href={hub.href} className="font-semibold text-[#8b6914] underline underline-offset-4">
              {hub.title}
            </Link>{" "}
            · <Link href="/guides" className="font-semibold text-[#8b6914] underline underline-offset-4">All guides</Link>
          </p>
        )}
      </div>
    </section>
  );
}
