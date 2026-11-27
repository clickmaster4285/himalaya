// components/cms/erp-html.ts
// Browser-only allowlist sanitizer for HTML from the ERP page editor. The ERP
// sanitizes on save (sanitizeArticleHtml / custom section sanitizer in the ERP
// backend); this is defence in depth, so the site never trusts the API
// blindly. Parsing happens in an inert <template>, so nothing runs or loads
// until the clean fragment is inserted. Three allowlists:
//   - "rich":    elementEdit.html, rich text on an existing element.
//   - "section": a normal added section (sectionInsert), incl. buttons and cards.
//   - "custom":  a custom added section (kind "custom"): layout tags, media,
//                allowlisted video/map embeds and inline SVG.
// Never kept in any mode: script, style, forms and inputs, object/embed, SVG
// <use>/<foreignObject>, on* attributes, javascript:/data: URLs.
import { isSafeImageUrl } from '@/lib/erp-edits-shared';

export type ErpHtmlMode = 'rich' | 'section' | 'custom';

const RICH_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'span']);

const SECTION_TAGS = new Set([
  'h2', 'h3', 'h4', 'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'code', 'pre',
  'blockquote', 'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody',
  'tfoot', 'tr', 'th', 'td', 'span', 'div',
]);

const SVG_TAGS = new Set([
  'svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon', 'defs',
  'lineargradient', 'radialgradient', 'stop', 'symbol', 'clippath', 'mask', 'title', 'desc',
]);

const CUSTOM_TAGS = new Set([
  // layout and text
  'div', 'span', 'section', 'article', 'header', 'footer', 'aside', 'nav', 'main',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
  'strong', 'b', 'em', 'i', 'u', 's', 'small', 'sub', 'sup', 'mark', 'code', 'pre', 'kbd',
  'abbr', 'cite', 'q', 'time', 'del', 'ins', 'blockquote', 'a', 'img',
  // lists and tables
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'table', 'caption', 'colgroup', 'col', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  // media and widgets
  'figure', 'figcaption', 'picture', 'source', 'details', 'summary', 'button', 'video', 'audio', 'iframe',
  ...SVG_TAGS,
]);

// Removed together with their content (in every mode).
const DROP_WITH_CONTENT = new Set([
  'script', 'style', 'noscript', 'template', 'object', 'embed', 'applet', 'frame', 'frameset', 'portal',
  'form', 'input', 'select', 'option', 'optgroup', 'textarea', 'datalist', 'output', 'fieldset', 'label',
  'math', 'use', 'foreignobject', 'animate', 'animatemotion', 'animatetransform', 'set', 'image',
  'head', 'meta', 'link', 'base',
]);
// Dropped with content unless the mode allows them (media in normal sections, etc.).
const MEDIA = new Set(['iframe', 'svg', 'video', 'audio', 'source', 'button']);

const ATTRS: Record<ErpHtmlMode, Record<string, string[]>> = {
  rich: { a: ['href', 'target', 'rel'] },
  section: {
    a: ['href', 'title', 'target', 'rel', 'class'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
    div: ['class'],
  },
  custom: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
    col: ['span'],
    colgroup: ['span'],
    ol: ['start', 'reversed', 'type'],
    li: ['value'],
    time: ['datetime'],
    details: ['open'],
    source: ['src', 'srcset', 'type', 'media'],
    video: ['src', 'poster', 'controls', 'autoplay', 'muted', 'loop', 'playsinline', 'preload', 'width', 'height'],
    audio: ['src', 'controls', 'autoplay', 'muted', 'loop', 'preload'],
    iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'loading', 'referrerpolicy', 'frameborder'],
    button: ['type'],
  },
};
const CUSTOM_GLOBAL_ATTRS = new Set(['class', 'id', 'style', 'title', 'role']);
// SVG presentation attributes (no href / xlink:href, no event handlers).
const SVG_ATTRS = new Set([
  'viewbox', 'xmlns', 'width', 'height', 'fill', 'fill-opacity', 'fill-rule', 'clip-rule', 'stroke',
  'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset',
  'stroke-miterlimit', 'stroke-opacity', 'opacity', 'd', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1',
  'y1', 'x2', 'y2', 'points', 'transform', 'offset', 'stop-color', 'stop-opacity', 'gradientunits',
  'gradienttransform', 'spreadmethod', 'fx', 'fy', 'preserveaspectratio', 'clip-path', 'mask',
  'clippathunits', 'maskunits', 'pathlength', 'vector-effect', 'color', 'display', 'visibility',
  'font-family', 'font-size', 'font-weight', 'text-anchor', 'dominant-baseline', 'focusable',
]);

// Embeds allowed in custom sections: YouTube, Vimeo and Google Maps only.
const IFRAME_SRC = [
  /^https:\/\/www\.youtube\.com\/embed\//i,
  /^https:\/\/www\.youtube-nocookie\.com\//i,
  /^https:\/\/player\.vimeo\.com\//i,
  /^https:\/\/www\.google\.com\/maps/i,
];

// <span style="font-size:…"> on selected words is the only inline style kept
// outside custom sections.
const FONT_SIZE = /^\d{1,3}(\.\d{1,2})?(px|em|rem|%)$/;
const RENAME: Record<string, string> = { h1: 'h2', h5: 'h4', h6: 'h4' };
const BUTTON_CLASS = new Set(['erp-btn', 'erp-btn erp-btn-outline']);
const CARD_CLASS = new Set(['erp-cards', 'erp-card']);
// Declarations removed from custom style attributes.
const BLOCKED_DECLARATION = /expression|javascript:|behavior|-moz-binding|@import|[<\\]/i;
const SPAN_NUMBER = /^\d{1,3}$/;

function safeHref(value: string | null): string {
  const raw = (value || '').trim();
  if (!raw || /[\u0000-\u001f\u007f\\]/.test(raw)) return '';
  if (raw.startsWith('#') || (raw.startsWith('/') && !raw.startsWith('//'))) return raw;
  try {
    const url = new URL(raw);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}

/** Custom section style attribute: keeps declarations without risky content. */
function cleanStyle(style: string): string {
  return style
    .split(';')
    .map((declaration) => declaration.trim())
    .filter((declaration) => {
      if (!/^-?[a-z][a-z0-9-]*\s*:/i.test(declaration) || BLOCKED_DECLARATION.test(declaration)) return false;
      // Every url( must be url(https://…), optionally quoted.
      const urls = declaration.match(/url\(\s*["']?[^"')]*/gi) || [];
      return urls.every((url) => /^url\(\s*["']?https:\/\//i.test(url));
    })
    .join(';');
}

const unwrap = (element: Element) => element.replaceWith(...Array.from(element.childNodes));

function rename(element: Element, tag: string): Element {
  const replacement = element.ownerDocument.createElement(tag);
  replacement.append(...Array.from(element.childNodes));
  element.replaceWith(replacement);
  return replacement;
}

function fontSizeSpan(element: Element) {
  const size = /(?:^|;)\s*font-size\s*:\s*([^;]+)/i.exec(element.getAttribute('style') || '')?.[1]?.trim();
  if (!size || !FONT_SIZE.test(size)) return unwrap(element);
  for (const { name } of Array.from(element.attributes)) element.removeAttribute(name);
  element.setAttribute('style', `font-size:${size}`);
}

function keepAttribute(mode: ErpHtmlMode, tag: string, name: string, svg: boolean): boolean {
  if (name.startsWith('on') || name.startsWith('data-erp')) return false;
  if ((ATTRS[mode][tag] || []).includes(name)) return true;
  if (mode !== 'custom') return false;
  if (CUSTOM_GLOBAL_ATTRS.has(name) || /^(aria|data)-[a-z0-9_.-]+$/.test(name)) return true;
  return svg && SVG_ATTRS.has(name);
}

function cleanAttributes(node: Element, mode: ErpHtmlMode, tag: string, svg: boolean) {
  for (const { name, value } of Array.from(node.attributes)) {
    const lower = name.toLowerCase();
    if (!keepAttribute(mode, tag, lower, svg)) node.removeAttribute(name);
    else if (lower === 'style') {
      const clean = cleanStyle(value);
      if (clean) node.setAttribute('style', clean);
      else node.removeAttribute('style');
    } else if (svg && /url\(/i.test(value) && !/^\s*url\(\s*#[\w-]+\s*\)\s*$/i.test(value)) {
      node.removeAttribute(name); // SVG paint refs only to local #ids
    } else if ((lower === 'colspan' || lower === 'rowspan' || lower === 'span') && !SPAN_NUMBER.test(value.trim())) {
      node.removeAttribute(name);
    } else if (/^\s*(javascript|vbscript|data):/i.test(value)) {
      node.removeAttribute(name);
    }
  }
}

/** Element-specific rules. Returns false when the element was removed. */
function cleanSpecial(node: Element, mode: ErpHtmlMode, tag: string): boolean {
  switch (tag) {
    case 'a': {
      const href = safeHref(node.getAttribute('href'));
      if (href) node.setAttribute('href', href);
      else node.removeAttribute('href');
      if (node.getAttribute('target') === '_blank') node.setAttribute('rel', 'noopener noreferrer');
      else node.removeAttribute('target');
      if (mode === 'section' && node.hasAttribute('class') && !BUTTON_CLASS.has(node.getAttribute('class') || '')) {
        node.removeAttribute('class');
      }
      return true;
    }
    case 'img': {
      if (!isSafeImageUrl(node.getAttribute('src'))) {
        node.remove();
        return false;
      }
      if (!node.hasAttribute('loading')) node.setAttribute('loading', 'lazy');
      node.setAttribute('decoding', 'async');
      return true;
    }
    case 'video':
    case 'audio':
    case 'source': {
      for (const name of ['src', 'poster']) {
        if (node.hasAttribute(name) && !isSafeImageUrl(node.getAttribute(name))) node.removeAttribute(name);
      }
      // srcset: every candidate must be an http(s) URL.
      const srcset = node.getAttribute('srcset');
      if (srcset !== null && !srcset.split(',').every((part) => isSafeImageUrl(part.trim().split(/\s+/)[0]))) {
        node.removeAttribute('srcset');
      }
      return true;
    }
    case 'iframe': {
      const src = (node.getAttribute('src') || '').trim();
      if (!isSafeImageUrl(src) || !IFRAME_SRC.some((pattern) => pattern.test(src))) {
        node.remove();
        return false;
      }
      if (!node.hasAttribute('loading')) node.setAttribute('loading', 'lazy');
      node.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      return true;
    }
    case 'button':
      node.setAttribute('type', 'button');
      return true;
    case 'div':
      if (mode === 'section' && !CARD_CLASS.has(node.getAttribute('class') || '')) {
        unwrap(node);
        return false;
      }
      return true;
    default:
      return true;
  }
}

function cleanElement(element: Element, mode: ErpHtmlMode) {
  const tag = element.localName.toLowerCase();
  const svg = element.namespaceURI === 'http://www.w3.org/2000/svg';
  // An SVG <title>/<desc> is text; an HTML <title> in the body is not expected.
  if (DROP_WITH_CONTENT.has(tag) || (tag === 'title' && !svg)) return element.remove();

  const allowed = mode === 'rich' ? RICH_TAGS : mode === 'section' ? SECTION_TAGS : CUSTOM_TAGS;
  if (mode !== 'custom' && MEDIA.has(tag)) return element.remove();
  // SVG tags only count inside an <svg>; HTML-namespace look-alikes are unwrapped.
  if (SVG_TAGS.has(tag) && !svg) return unwrap(element);
  if (tag === 'span' && mode !== 'custom') return fontSizeSpan(element);

  let node = element;
  if (mode === 'section' && RENAME[tag]) node = rename(element, RENAME[tag]);
  else if (!allowed.has(tag)) return unwrap(element);

  const finalTag = node.localName.toLowerCase();
  cleanAttributes(node, mode, finalTag, svg);
  cleanSpecial(node, mode, finalTag);
}

// Children first, so an unwrapped or renamed element only moves clean nodes.
function cleanChildren(parent: Node, mode: ErpHtmlMode) {
  for (const child of Array.from(parent.childNodes)) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      cleanChildren(child, mode);
      cleanElement(child as Element, mode);
    } else if (child.nodeType !== Node.TEXT_NODE) {
      child.remove(); // comments, processing instructions, CDATA
    }
  }
}

/** Sanitized, inert DOM fragment for ERP-authored HTML. */
export function sanitizeErpHtml(html: string, mode: ErpHtmlMode = 'section'): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = html;
  const fragment = template.content;
  cleanChildren(fragment, mode);
  return document.importNode(fragment, true);
}
