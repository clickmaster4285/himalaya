"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type Heading = {
  id: string;
  text: string;
};

type Props = {
  headings: Heading[];
};

/** Space kept above a heading for the fixed Navbar when jumping to it. */
const SCROLL_OFFSET = 112;

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

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

  // Long contents lists scroll inside the sidebar: keep the active entry visible
  // (scrolling only the sidebar, never the page).
  useEffect(() => {
    const nav = navRef.current;
    const link = activeId ? nav?.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`) : null;
    if (!nav || !link) return;
    const top = link.offsetTop - nav.offsetTop;
    if (top < nav.scrollTop || top + link.offsetHeight > nav.scrollTop + nav.clientHeight) {
      nav.scrollTo({ top: top - nav.clientHeight / 3, behavior: "smooth" });
    }
  }, [activeId]);

  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return; // let the browser handle the plain #hash link
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28">
        <div
          className="flex flex-col rounded-xl border border-[#eadfce] bg-white p-5 shadow-sm"
          // Inline so the cap never depends on a generated utility class.
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b6914]">
            Contents
          </p>
          <nav
            ref={navRef}
            className="relative -mr-2 space-y-1 pr-2"
            style={{ minHeight: 0, overflowY: "auto", overscrollBehavior: "contain" }}
          >
            {headings.map(({ id, text }) => (
              <a
                key={id}
                href={`#${id}`}
                data-toc-id={id}
                onClick={(e) => jumpTo(e, id)}
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
