"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
};

type Props = {
  headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28">
        <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-sm">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b6914]">
            Contents
          </p>
          <nav className="space-y-1">
            {headings.map(({ id, text }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`block rounded-lg px-3 py-2 text-sm leading-relaxed transition-all ${
                  activeId === id
                    ? "bg-[#8b6914]/10 font-medium text-[#8b6914] pl-4"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                }`}
              >
                {text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}
