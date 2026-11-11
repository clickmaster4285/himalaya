// components/cms/cmsContent.ts
// Helpers for reading untrusted ERP section content and settings.

export type Content = Record<string, unknown>;

/** First non-empty string among the given keys (the ERP has legacy aliases). */
export function pick(c: Content, ...keys: string[]): string {
  for (const k of keys) {
    const v = c[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

export function items(c: Content): Content[] {
  const v = c.items;
  return Array.isArray(v) ? v.filter((i): i is Content => !!i && typeof i === "object" && !Array.isArray(i)) : [];
}

/** Only allow same-site paths, anchors and http(s)/mailto/tel links. */
export function safeHref(url: string): string {
  const u = url.trim();
  // Allow-list below; backslashes and control characters are never valid here.
  if (!u || /[\\\u0000-\u001f\u007f]/.test(u)) return "";
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  if (u.startsWith("#")) return u;
  return /^(https?:\/\/|mailto:|tel:)/i.test(u) ? u : "";
}

/** Images must be absolute http(s) URLs or site-relative paths. */
export function safeImage(url: string): string {
  const u = url.trim();
  if (/[\s\\"'<>]/.test(u)) return "";
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  return /^https?:\/\//i.test(u) ? u : "";
}

export type CmsLink = { text: string; link: string };

export function button(c: Content, prefix: "primary" | "secondary"): CmsLink | undefined {
  const text = pick(c, `${prefix}Label`, `${prefix}Button`);
  const link = safeHref(pick(c, `${prefix}Url`, `${prefix}Link`));
  return text && link ? { text, link } : undefined;
}

export const isExternal = (href: string) => /^(https?:)?\/\//i.test(href);

/* ------------------------------ settings ------------------------------ */

export type Tone = "light" | "muted" | "dark" | "gold";
export type Width = "narrow" | "default" | "wide" | "superWide" | "full";
export type Motion = "none" | "fade-up" | "fade" | "zoom" | "slide-in";

export type SectionLayout = {
  tone: Tone;
  width: Width;
  padding: [number, number] | null;
  motion: Motion;
  columns: number | null;
  layout: string;
};

/** ERP background → Himalaya palette (cream, sand, forest green, gold). */
function tone(v: unknown, fallback: Tone): Tone {
  switch (v) {
    case "dark":
    case "secondary":
      return "dark";
    case "muted":
      return "muted";
    case "primary":
    case "gradient":
    case "accent":
      return "gold";
    case "light":
    case "default":
    case "white":
      return "light";
    default:
      return fallback;
  }
}

function width(v: unknown, fallback: Width): Width {
  return v === "narrow" || v === "default" || v === "wide" || v === "superWide" || v === "full" ? v : fallback;
}

function motion(v: unknown): Motion {
  return v === "none" || v === "fade" || v === "zoom" || v === "slide-in" ? v : "fade-up";
}

function padding(v: unknown): [number, number] | null {
  if (!Array.isArray(v) || v.length !== 2) return null;
  const [top, bottom] = v.map((n) => (typeof n === "number" && Number.isFinite(n) ? Math.min(Math.max(n, 0), 240) : NaN));
  return Number.isNaN(top) || Number.isNaN(bottom) ? null : [top, bottom];
}

export function sectionLayout(
  settings: Content,
  defaults: { tone?: Tone; width?: Width } = {},
): SectionLayout {
  const cols = typeof settings.columns === "number" ? Math.round(settings.columns) : NaN;
  return {
    tone: tone(settings.background, defaults.tone ?? "light"),
    width: width(settings.width, defaults.width ?? "wide"),
    padding: padding(settings.paddingY),
    motion: motion(settings.motion),
    columns: cols >= 1 && cols <= 4 ? cols : null,
    layout: typeof settings.layout === "string" ? settings.layout : "",
  };
}
