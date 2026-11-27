// components/cms/CmsRichText.tsx
// Allow-list HTML sanitizer for ERP rich text (bodyHtml / bioHtml).
// Renders CMS rich-text HTML as React elements through a tag allow-list.
// Nothing is injected as raw HTML: text goes through React (escaped), only
// allow-listed tags are created, and the only attributes kept are a validated
// href on links, src/alt on images and colspan/rowspan on table cells. Unknown
// tags are unwrapped; script-like tags are dropped together with their content.
// Tables (ERP comparison / difference tables) are wrapped in a horizontally
// scrollable box, so wide tables never break the layout on phones.

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { safeHref, safeImage } from "./cmsContent";

function tagClasses(onDark: boolean): Record<string, string> {
  const body = onDark ? "text-white/80" : "text-[#5c564c]";
  const strong = onDark ? "text-white" : "text-[#1a1816]";
  return {
    h1: `font-display font-normal text-3xl md:text-4xl mt-10 mb-4 first:mt-0 ${strong}`,
    h2: `font-display font-normal text-3xl md:text-4xl mt-10 mb-4 first:mt-0 ${strong}`,
    h3: `font-display font-normal text-2xl md:text-3xl mt-8 mb-3 first:mt-0 ${strong}`,
    h4: `font-semibold text-lg md:text-xl mt-6 mb-2 first:mt-0 ${strong}`,
    h5: `font-semibold text-base mt-6 mb-2 first:mt-0 ${strong}`,
    h6: `font-semibold text-sm uppercase tracking-[0.2em] mt-6 mb-2 first:mt-0 ${strong}`,
    p: `text-sm md:text-base leading-relaxed mt-4 first:mt-0 ${body}`,
    ul: `list-disc pl-6 mt-4 space-y-2 text-sm md:text-base marker:text-[#c9a55b] ${body}`,
    ol: `list-decimal pl-6 mt-4 space-y-2 text-sm md:text-base marker:text-[#c9a55b] ${body}`,
    li: "leading-relaxed pl-1",
    blockquote: `border-l-2 border-[#c9a55b] pl-6 my-8 font-display italic text-xl md:text-2xl ${strong}`,
    strong: `font-semibold ${strong}`,
    b: `font-semibold ${strong}`,
    em: "italic",
    i: "italic",
    u: "underline underline-offset-4",
    code: "font-mono text-sm bg-black/5 px-1.5 py-0.5 rounded-sm",
    pre: "font-mono text-sm bg-black/5 p-4 mt-4 overflow-x-auto rounded-sm",
    hr: onDark ? "my-10 border-white/15" : "my-10 border-[#eadfce]",
    br: "",
    img: "my-6 block h-auto w-full max-w-full rounded-sm",
    a: "text-[#c9a55b] underline underline-offset-4 hover:text-[#b8944a] transition-colors",
    // Tables: header row, bold row names (first cell), zebra rows, roomy cells.
    table: `w-full border-collapse text-left text-sm md:text-base [&_tbody_tr>*:first-child]:font-semibold ${
      onDark
        ? "[&_tbody_tr:nth-child(even)]:bg-white/5 [&_tbody_tr>*:first-child]:text-white"
        : "bg-white [&_tbody_tr:nth-child(even)]:bg-[#faf7f2] [&_tbody_tr>*:first-child]:text-[#1a1816]"
    }`,
    caption: `caption-bottom px-4 py-3 text-left text-sm ${onDark ? "text-white/60" : "text-[#737373]"}`,
    thead: "",
    tbody: "",
    tfoot: "",
    tr: `border-b last:border-b-0 ${onDark ? "border-white/10" : "border-[#eadfce]"}`,
    th: `px-4 py-3 align-top font-semibold [thead_&]:text-[11px] [thead_&]:uppercase [thead_&]:tracking-[0.2em] ${
      onDark ? "[thead_&]:bg-white/10 text-white" : "[thead_&]:bg-[#c9a55b]/10 text-[#1a1816]"
    }`,
    td: `px-4 py-3 align-top leading-relaxed ${body}`,
  };
}

/** The scroll box around every table. */
function tableWrapClass(onDark: boolean) {
  return `my-6 w-full overflow-x-auto rounded-sm border ${onDark ? "border-white/15" : "border-[#eadfce] shadow-sm"}`;
}
/** The site's own blog article typography (app/blogs/[slug]). */
function articleClasses(): Record<string, string> {
  const base = tagClasses(false);
  return {
    ...base,
    h1: "mt-10 mb-2 font-bold text-lg text-neutral-900 first:mt-0 scroll-mt-28",
    h2: "mt-10 mb-2 font-bold text-neutral-900 first:mt-0 scroll-mt-28",
    h3: "mt-8 mb-2 font-semibold text-neutral-900 first:mt-0",
    h4: "mt-6 mb-2 font-semibold text-neutral-900 first:mt-0",
    p: "mt-3 text-[15px] leading-7 text-neutral-600 first:mt-0",
    ul: "list-disc pl-6 mt-3 space-y-1 text-[15px] leading-7 text-neutral-600 marker:text-[#8b6914]",
    ol: "list-decimal pl-6 mt-3 space-y-1 text-[15px] leading-7 text-neutral-600 marker:text-[#8b6914]",
    blockquote: "border-l-2 border-[#c9a55b] pl-5 my-8 font-display italic text-xl text-neutral-800",
    strong: "font-semibold text-neutral-900",
    b: "font-semibold text-neutral-900",
    a: "text-[#8b6914] underline underline-offset-2 hover:text-[#6f5410]",
  };
}

/** Same ids as components/blogs/TableOfContents' slugify. */
export function headingId(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}

const ALLOWED_TAGS = new Set(Object.keys(tagClasses(false)));
const VOID_TAGS = new Set(["br", "hr", "img"]);
const TABLE_SECTIONS = new Set(["thead", "tbody", "tfoot"]);
const TABLE_TAGS = new Set(["table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td"]);
// Only elements, never text, may sit directly in these (React hydration).
const NO_TEXT_CHILDREN = new Set(["table", "thead", "tbody", "tfoot", "tr"]);
const SPAN = /^\d{1,2}$/;
const BLOCK_TAGS = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "blockquote", "pre", "hr", "div", "table"]);
const DROP_TAGS = new Set([
  "script", "style", "iframe", "object", "embed", "template", "noscript",
  "svg", "math", "textarea", "select", "button", "form", "head", "title",
]);

type Node = {
  tag: string;
  href?: string;
  src?: string;
  alt?: string;
  colSpan?: number;
  rowSpan?: number;
  children: (Node | string)[];
};

function textOf(node: Node | string): string {
  return typeof node === "string" ? node : node.children.map(textOf).join("");
}

/** The h2 headings of an HTML body (text + anchor id), for a table of contents. */
export function richTextHeadings(html: string): { id: string; text: string }[] {
  return parse(html)
    .children.filter((n): n is Node => typeof n !== "string" && (n.tag === "h2" || n.tag === "h1"))
    .map((n) => {
      const text = textOf(n).replace(/\s+/g, " ").trim();
      return { id: headingId(text), text };
    })
    .filter((h) => h.id);
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function parse(html: string): Node {
  const root: Node = { tag: "", children: [] };
  // Stack of open elements; tag "" = unwrapped unknown element (kept for matching).
  const stack: { name: string; node: Node }[] = [{ name: "#root", node: root }];
  const top = () => stack[stack.length - 1].node;
  let dropping: { name: string; depth: number } | null = null;

  const token = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|[^<]+|</g;
  for (const m of html.matchAll(token)) {
    const [raw, closing, rawName, attrs = ""] = m;
    if (raw.startsWith("<!--")) continue;

    if (!rawName) {
      if (!dropping) top().children.push(decodeEntities(raw));
      continue;
    }

    const name = rawName.toLowerCase();
    const selfClosing = /\/\s*$/.test(attrs);

    if (dropping) {
      if (name === dropping.name && !selfClosing) dropping.depth += closing ? -1 : 1;
      if (dropping.depth === 0) dropping = null;
      continue;
    }

    if (closing) {
      const idx = stack.map((s) => s.name).lastIndexOf(name);
      if (idx > 0) stack.length = idx;
      continue;
    }

    if (DROP_TAGS.has(name)) {
      if (!selfClosing) dropping = { name, depth: 1 };
      continue;
    }

    // HTML's implied end tags: a block closes an open <p>, a new <li> closes the previous one.
    // Keeps the output valid (no <p> inside <p>), which React hydration requires.
    if (BLOCK_TAGS.has(name)) {
      const p = stack.map((s) => s.name).lastIndexOf("p");
      if (p > 0) stack.length = p;
    }
    if (name === "li" && stack[stack.length - 1].name === "li") stack.pop();

    // Tables: HTML's implied structure, so React renders exactly what the browser would.
    if (TABLE_TAGS.has(name) && name !== "table") {
      const table = stack.map((s) => s.name).lastIndexOf("table");
      if (table < 0) continue; // a stray cell or row outside any table
      const open = (tag: string) => {
        const node: Node = { tag, children: [] };
        top().children.push(node);
        stack.push({ name: tag, node });
      };
      const inside = () => stack.slice(table + 1).map((s) => s.name);
      const lastSection = () => Math.max(...[...TABLE_SECTIONS].map((t) => inside().lastIndexOf(t)));
      if (name === "caption" || TABLE_SECTIONS.has(name)) {
        stack.length = table + 1;
      } else if (name === "tr") {
        const section = lastSection();
        stack.length = table + 1 + (section < 0 ? 0 : section + 1);
        if (section < 0) open("tbody");
      } else {
        // th / td: close the open cell, adding the row (and body) HTML implies.
        const row = inside().lastIndexOf("tr");
        if (row < 0) {
          const section = lastSection();
          stack.length = table + 1 + (section < 0 ? 0 : section + 1);
          if (section < 0) open("tbody");
          open("tr");
        } else stack.length = table + 1 + row + 1;
      }
    }

    const allowed = ALLOWED_TAGS.has(name);
    const node: Node = { tag: allowed ? name : "", children: [] };
    if (name === "a") {
      const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
      node.href = safeHref(decodeEntities((href?.[1] ?? href?.[2] ?? href?.[3] ?? "").trim()));
    }
    const attr = (n: string) => {
      const m = new RegExp(`\\b${n}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(attrs);
      return decodeEntities((m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim());
    };
    if (name === "th" || name === "td") {
      const colSpan = attr("colspan");
      const rowSpan = attr("rowspan");
      if (SPAN.test(colSpan) && Number(colSpan) > 1) node.colSpan = Number(colSpan);
      if (SPAN.test(rowSpan) && Number(rowSpan) > 1) node.rowSpan = Number(rowSpan);
    }
    if (name === "img") {
      node.src = safeImage(attr("src"));
      node.alt = attr("alt").slice(0, 300);
      if (!node.src) continue;
    }
    top().children.push(node);
    if (!VOID_TAGS.has(name) && !selfClosing) stack.push({ name, node });
  }
  return root;
}

type RenderContext = { classes: Record<string, string>; anchors: boolean; onDark: boolean; cell: boolean };

const CHECK = /^[✓✔✅]$/; // ✓ ✔ ✅
const CROSS = /^[✗✘✕✖❌]$/; // ✗ ✘ ✕ ✖ ❌
const MARKS = /([✓✔✅✗✘✕✖❌])/;

/** ✓ in the site's success colour and ✗ muted, inside table cells. */
export function markTableSymbols(text: string, onDark = false): ReactNode {
  if (!MARKS.test(text)) return text;
  return text.split(MARKS).map((part, i) =>
    CHECK.test(part) ? (
      <span key={i} className={`font-semibold ${onDark ? "text-emerald-300" : "text-emerald-600"}`}>{part}</span>
    ) : CROSS.test(part) ? (
      <span key={i} className={onDark ? "text-white/40" : "text-neutral-400"}>{part}</span>
    ) : (
      part
    ),
  );
}

function render(node: Node | string, key: number, ctx: RenderContext): ReactNode {
  if (typeof node === "string") return ctx.cell ? <Fragment key={key}>{markTableSymbols(node, ctx.onDark)}</Fragment> : node;
  const inner = node.tag === "th" || node.tag === "td" ? { ...ctx, cell: true } : ctx;
  const children = node.children
    .filter((child) => !(NO_TEXT_CHILDREN.has(node.tag) && typeof child === "string"))
    .map((child, i) => render(child, i, inner));
  const className = ctx.classes[node.tag];

  switch (node.tag) {
    case "":
      return <Fragment key={key}>{children}</Fragment>;
    case "br":
      return <br key={key} />;
    case "hr":
      return <hr key={key} className={className} />;
    case "img":
      // Plain <img>: ERP uploads come from hosts next/image is not configured for.
      // eslint-disable-next-line @next/next/no-img-element
      return node.src ? <img key={key} src={node.src} alt={node.alt ?? ""} className={className} loading="lazy" decoding="async" /> : null;
    case "a":
      if (!node.href) return <Fragment key={key}>{children}</Fragment>;
      if (node.href.startsWith("/")) {
        return <Link key={key} href={node.href} className={className}>{children}</Link>;
      }
      return /^https?:/i.test(node.href) ? (
        <a key={key} href={node.href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
      ) : (
        <a key={key} href={node.href} className={className}>{children}</a>
      );
    case "table": {
      // Wide tables scroll sideways inside their box instead of widening the page.
      const columns = Math.max(0, ...rowsOf(node).map((row) => row.children.filter((c) => typeof c !== "string").length));
      return (
        <div key={key} className={tableWrapClass(ctx.onDark)}>
          <table className={className} style={columns > 2 ? { minWidth: `${Math.min(columns * 9, 96)}rem` } : undefined}>
            {children}
          </table>
        </div>
      );
    }
    case "th":
    case "td": {
      const Cell = node.tag;
      return <Cell key={key} className={className} colSpan={node.colSpan} rowSpan={node.rowSpan}>{children}</Cell>;
    }
    default: {
      const Tag = node.tag as "p";
      const id = ctx.anchors && (node.tag === "h2" || node.tag === "h1") ? headingId(textOf(node).replace(/\s+/g, " ")) || undefined : undefined;
      return <Tag key={key} id={id} className={className}>{children}</Tag>;
    }
  }
}

/** The rows of a table (directly or in its thead/tbody/tfoot). */
function rowsOf(table: Node): Node[] {
  return table.children.flatMap((child) =>
    typeof child === "string" ? [] : child.tag === "tr" ? [child] : TABLE_SECTIONS.has(child.tag) ? rowsOf(child) : [],
  );
}

export default function CmsRichText({
  html,
  className,
  onDark = false,
  variant = "section",
}: {
  html: string;
  className?: string;
  onDark?: boolean;
  /** "article": the site's blog post typography, with anchor ids on h2. */
  variant?: "section" | "article";
}) {
  if (!html.trim()) return null;
  const article = variant === "article";
  const classes = article ? articleClasses() : tagClasses(onDark);
  const ctx: RenderContext = { classes, anchors: article, onDark: !article && onDark, cell: false };
  return <div className={className}>{parse(html).children.map((child, i) => render(child, i, ctx))}</div>;
}
