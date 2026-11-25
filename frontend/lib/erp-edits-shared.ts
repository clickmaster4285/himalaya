// lib/erp-edits-shared.ts
// Pure helpers for ERP "edited pages", shared by the server (lib/erp-edits.ts)
// and the browser (components/cms/ErpPageEdits.tsx). No server-only imports.
//
// An edited page is a list of DOM instructions the ERP visual editor recorded
// against the server-rendered HTML of an existing page on this site. They come
// from GET {ERP}/public/{domain}/page-edits?path=… ({ patches, operations }),
// the same data the ERP's own page-edits.js loader applies. They are untrusted
// data: only known actions, allowlisted style properties, safe URLs and plain
// values survive parsing. HTML is sanitized again in the browser before use
// (components/cms/erp-html.ts).

export type ErpStyle = [property: string, value: string];
export type ErpImage = { src?: string; alt?: string };
export type ErpThemeTag = (typeof THEME_TAGS)[number];
export type ErpLayout = 'image-left' | 'image-right';

export type ErpEdit =
  | {
      type: 'elementEdit';
      selector: string;
      text?: string;
      html?: string;
      image?: ErpImage;
      backgroundImage?: string;
      styles: ErpStyle[];
    }
  | { type: 'sectionMove'; selector: string; target: string; position: 'before' | 'after' }
  | { type: 'sectionRemove'; selector: string }
  | { type: 'sectionDuplicate'; selector: string; id: string }
  | {
      type: 'sectionInsert';
      selector: string;
      id: string;
      position: 'before' | 'after';
      html: string;
      layout?: ErpLayout;
      theme: [tag: ErpThemeTag, styles: ErpStyle[]][];
    };

/**
 * Selectors that point at (or inside) a copy made by a sectionDuplicate edit,
 * or a section added by a sectionInsert edit. Neither exists in the original
 * page, so these resolve only after that step has run.
 */
export const isCopySelector = (selector: unknown): boolean =>
  typeof selector === 'string' && selector.startsWith('[data-erp-clone="');

// Copy/insert ids end up in a data-erp-clone attribute, in selectors and in CSS.
const COPY_ID_REGEX = /^[A-Za-z0-9-]{1,64}$/;

// Mirrors EDITABLE_STYLE_PROPERTIES in the ERP (pageEditor.controller.js).
const ALLOWED_STYLE_PROPERTIES = new Set([
  'color',
  'font-size',
  'font-weight',
  'font-style',
  'font-family',
  'text-align',
  'text-transform',
  'text-decoration',
  'line-height',
  'letter-spacing',
  'background-color',
  'padding',
  'margin',
  'border',
  'border-width',
  'border-style',
  'border-color',
  'border-radius',
  'width',
  'max-width',
  'height',
  'min-height',
  'max-height',
  'object-fit',
  'opacity',
]);

// Typography an inserted section takes from the website, per tag. Mirrors
// THEME_TAGS / TYPE_PROPERTIES / CELL_PROPERTIES in the ERP insertedSections.js.
export const THEME_TAGS = ['h1', 'h2', 'h3', 'h4', 'p', 'li', 'th', 'td'] as const;
const THEME_PROPERTIES = new Set([
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'text-transform',
  'color',
  'padding',
  'background-color',
]);

const STYLE_VALUE_REGEX = /^[\w\s#(),.%'"+\-/]*$/;
const BLOCKED_STYLE_VALUE = /url\(|expression|javascript|@import/i;
const MAX_STYLE_VALUE_LENGTH = 200;
const MAX_SELECTOR_LENGTH = 2000;
const MAX_TEXT_LENGTH = 20000;
const MAX_PATCH_HTML_LENGTH = 50000;
const MAX_SECTION_HTML_LENGTH = 100000;
const MAX_URL_LENGTH = 2000;

// Anti-flicker (components/cms/ErpAntiFlicker.tsx): the <style> that hides
// <main> from the first paint on edited pages, and the window key holding the
// edits request the head script starts for the current path.
export const ANTI_FLICKER_STYLE_ID = 'erp-anti-flicker';
export const BOOT_EDITS_KEY = '__erpEditsPromise';

/**
 * Same path key on server and client: decoded, lowercase, no trailing slash, home is "/".
 * Mirrored by the inline head script in components/cms/ErpAntiFlicker.tsx; keep both in sync.
 */
export function normalizeEditPath(input: string): string {
  let path = (input || '').split(/[?#]/)[0];
  try {
    path = decodeURIComponent(path);
  } catch {
    // Malformed escape sequence: compare the raw path instead.
  }
  path = path.trim().toLowerCase().replace(/\/{2,}/g, '/').replace(/\/+$/, '');
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}

const isSafeStyleValue = (value: string): boolean =>
  value.trim() !== '' &&
  value.length <= MAX_STYLE_VALUE_LENGTH &&
  STYLE_VALUE_REGEX.test(value) &&
  !BLOCKED_STYLE_VALUE.test(value);

export function isSafeStyle(property: string, value: string): boolean {
  return ALLOWED_STYLE_PROPERTIES.has(property) && isSafeStyleValue(value);
}

export function isSafeThemeStyle(property: string, value: string): boolean {
  return THEME_PROPERTIES.has(property) && isSafeStyleValue(value);
}

/** Absolute http(s) URL with no characters that could break out of CSS url("…") or an attribute. */
export function isSafeImageUrl(value: unknown): value is string {
  return typeof value === 'string' && value.length <= MAX_URL_LENGTH && /^https?:\/\/[^\s"'()<>\\]+$/i.test(value);
}

export const isCopyId = (id: unknown): id is string => typeof id === 'string' && COPY_ID_REGEX.test(id);

const str = (v: unknown) => (typeof v === 'string' ? v : '');
const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

function selector(v: unknown): string {
  const s = str(v).trim();
  return s.length > 0 && s.length <= MAX_SELECTOR_LENGTH ? s : '';
}

function parseStyles(raw: unknown, safe: (property: string, value: string) => boolean): ErpStyle[] {
  const styles: ErpStyle[] = [];
  for (const [key, value] of Object.entries(obj(raw))) {
    const property = key.trim().toLowerCase();
    if (typeof value !== 'string') continue;
    if (safe(property, value)) styles.push([property, value.trim()]);
  }
  return styles;
}

function parseImage(raw: unknown): ErpImage | undefined {
  const image = obj(raw);
  const result: ErpImage = {};
  if (isSafeImageUrl(image.src)) result.src = image.src;
  if (typeof image.alt === 'string' && image.alt.length <= 500) result.alt = image.alt;
  return result.src !== undefined || result.alt !== undefined ? result : undefined;
}

function parseTheme(raw: unknown): [ErpThemeTag, ErpStyle[]][] {
  const theme = obj(raw);
  return THEME_TAGS.map((tag) => [tag, parseStyles(theme[tag], isSafeThemeStyle)] as [ErpThemeTag, ErpStyle[]]).filter(
    ([, styles]) => styles.length > 0,
  );
}

const position = (v: unknown): 'before' | 'after' => (v === 'before' ? 'before' : 'after');

function parsePatch(raw: unknown): ErpEdit | null {
  const patch = obj(raw);
  const sel = selector(patch.selector);
  if (!sel) return null;
  const styles = parseStyles(patch.styles, isSafeStyle);
  const text = typeof patch.text === 'string' && patch.text.length <= MAX_TEXT_LENGTH ? patch.text : undefined;
  const html =
    typeof patch.html === 'string' && patch.html.length <= MAX_PATCH_HTML_LENGTH ? patch.html : undefined;
  const image = parseImage(patch.image);
  const backgroundImage = isSafeImageUrl(patch.backgroundImage) ? patch.backgroundImage : undefined;
  if (text === undefined && html === undefined && !image && !backgroundImage && styles.length === 0) return null;
  return {
    type: 'elementEdit',
    selector: sel,
    styles,
    ...(text !== undefined ? { text } : {}),
    ...(html !== undefined ? { html } : {}),
    ...(image ? { image } : {}),
    ...(backgroundImage ? { backgroundImage } : {}),
  };
}

function parseOperation(raw: unknown): ErpEdit | null {
  const op = obj(raw);
  const sel = selector(op.selector);
  if (!sel) return null;
  switch (op.action) {
    case 'move': {
      const target = selector(op.target);
      return target ? { type: 'sectionMove', selector: sel, target, position: position(op.position) } : null;
    }
    case 'remove':
      return { type: 'sectionRemove', selector: sel };
    case 'duplicate':
      return isCopyId(op.id) ? { type: 'sectionDuplicate', selector: sel, id: op.id } : null;
    case 'insert': {
      if (!isCopyId(op.id) || typeof op.html !== 'string' || op.html.length > MAX_SECTION_HTML_LENGTH) return null;
      const layout = op.layout === 'image-left' || op.layout === 'image-right' ? op.layout : undefined;
      return {
        type: 'sectionInsert',
        selector: sel,
        id: op.id,
        position: position(op.position),
        html: op.html,
        theme: parseTheme(op.theme),
        ...(layout ? { layout } : {}),
      };
    }
    default:
      return null;
  }
}

/**
 * ERP page edits ({ patches, operations } from /public/{domain}/page-edits)
 * → safe edit list in apply order: patches first, then operations as listed.
 * Unknown actions and entries without a usable selector are dropped.
 */
export function parsePageEdits(raw: unknown): ErpEdit[] {
  const data = obj(raw);
  const patches = Array.isArray(data.patches) ? data.patches : [];
  const operations = Array.isArray(data.operations) ? data.operations : [];
  return [...patches.map(parsePatch), ...operations.map(parseOperation)].filter((e): e is ErpEdit => e !== null);
}
