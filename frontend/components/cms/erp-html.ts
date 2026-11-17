// components/cms/erp-html.ts
// Browser-only allowlist sanitizer for HTML from the ERP page editor (rich
// text patches and added sections). The ERP sanitizes on save
// (sanitizeArticleHtml in the ERP backend); this mirrors the same allowlist so
// the site never trusts the API blindly. Parsing happens in an inert
// <template>, so nothing runs or loads until the clean fragment is inserted.
import { isSafeImageUrl } from '@/lib/erp-edits-shared';

const ALLOWED_TAGS = new Set([
  'h2', 'h3', 'h4', 'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'code', 'pre',
  'blockquote', 'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody',
  'tfoot', 'tr', 'th', 'td',
]);
const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  th: ['colspan', 'rowspan'],
  td: ['colspan', 'rowspan'],
};
const DROP_WITH_CONTENT = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template', 'form', 'input', 'button',
  'select', 'textarea', 'svg', 'math', 'head', 'title', 'meta', 'link', 'video', 'audio', 'source',
]);
// <span style="font-size:…"> on selected words is the only inline style kept.
const FONT_SIZE = /^\d{1,3}(\.\d{1,2})?(px|em|rem|%)$/;
const RENAME: Record<string, string> = { h1: 'h2', h5: 'h4', h6: 'h4' };

function safeHref(value: string | null): string {
  const raw = (value || '').trim();
  if (!raw) return '';
  if (raw.startsWith('#') || (raw.startsWith('/') && !raw.startsWith('//'))) return raw;
  try {
    const url = new URL(raw);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}

function rename(element: Element, tag: string): Element {
  const replacement = element.ownerDocument.createElement(tag);
  replacement.append(...Array.from(element.childNodes));
  element.replaceWith(replacement);
  return replacement;
}

function cleanElement(element: Element) {
  const tag = element.tagName.toLowerCase();
  if (DROP_WITH_CONTENT.has(tag)) {
    element.remove();
    return;
  }
  if (tag === 'span') {
    const size = /(?:^|;)\s*font-size\s*:\s*([^;]+)/i.exec(element.getAttribute('style') || '')?.[1]?.trim();
    if (!size || !FONT_SIZE.test(size)) {
      element.replaceWith(...Array.from(element.childNodes));
      return;
    }
    for (const { name } of Array.from(element.attributes)) element.removeAttribute(name);
    element.setAttribute('style', `font-size:${size}`);
    return;
  }
  let node = element;
  if (RENAME[tag]) node = rename(element, RENAME[tag]);
  else if (!ALLOWED_TAGS.has(tag)) {
    element.replaceWith(...Array.from(element.childNodes));
    return;
  }
  const finalTag = node.tagName.toLowerCase();
  const allowed = ALLOWED_ATTRS[finalTag] || [];
  for (const { name } of Array.from(node.attributes)) {
    if (!allowed.includes(name.toLowerCase())) node.removeAttribute(name);
  }
  if (finalTag === 'a') {
    const href = safeHref(node.getAttribute('href'));
    if (href) node.setAttribute('href', href);
    else node.removeAttribute('href');
    if (node.getAttribute('target') === '_blank') node.setAttribute('rel', 'noopener noreferrer');
    else node.removeAttribute('target');
  }
  if (finalTag === 'img') {
    const src = node.getAttribute('src');
    if (!isSafeImageUrl(src)) {
      node.remove();
      return;
    }
    node.setAttribute('loading', 'lazy');
    node.setAttribute('decoding', 'async');
  }
}

// Children first, so an unwrapped or renamed element only moves clean nodes.
function cleanChildren(parent: Node) {
  for (const child of Array.from(parent.childNodes)) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      cleanChildren(child);
      cleanElement(child as Element);
    } else if (child.nodeType !== Node.TEXT_NODE) {
      child.remove(); // comments, processing instructions, CDATA
    }
  }
}

/** Sanitized, inert DOM fragment for ERP-authored HTML. */
export function sanitizeErpHtml(html: string): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = html;
  const fragment = template.content;
  cleanChildren(fragment);
  return document.importNode(fragment, true);
}
