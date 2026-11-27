'use client';
// components/cms/ErpPageEdits.tsx
// Applies published ERP "edited page" instructions (text, rich text, images,
// styles, section moves/removals/duplicates and added sections, incl. buttons,
// cards and custom sections with their own CSS) to the current
// route's DOM in the browser, the same way the ERP's page-edits.js loader does
// (ERP backend services/digitalOperations/externalPageEdits.service.js). Mounted once in
// the root layout so it covers code-owned and CMS pages, on first load and on
// every client-side navigation. Renders nothing.
//
// React safety: every change is recorded and reverted in the layout-effect
// cleanup. React runs that cleanup during the commit's mutation phase, and this
// component sits before <main> in <body>, so the DOM is back to the shape React
// expects before React patches or removes the old route's nodes. Removals only
// hide (display: none), moved nodes go back to their original parent and
// sibling, and copies and added sections (data-erp-clone) are removed, so
// React's tree is never left inconsistent and nothing leaks into the next page.
import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';
import {
  ANTI_FLICKER_STYLE_ID,
  BOOT_EDITS_KEY,
  isCopyId,
  isCopySelector,
  isSafeCustomCss,
  isSafeImageUrl,
  isSafeStyle,
  isSafeThemeStyle,
  normalizeEditPath,
  type ErpEdit,
  type ErpStyle,
} from '@/lib/erp-edits-shared';
import { sanitizeErpHtml } from '@/components/cms/erp-html';

const CACHE_TTL_MS = 60_000;
const MAX_HIDE_MS = 1500;
const MAX_WAIT_FOR_DOM_MS = 1500;
const API = '/api/erp-edits';
// How often an open page checks the ERP for newly published edits.
const LIVE_POLL_MS = Math.max(2000, Number(process.env.NEXT_PUBLIC_ERP_LIVE_POLL_MS) || 5000);

const warn = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.warn('[erp-edits]', ...args);
};

/* ------------------------------ data cache ------------------------------ */

type Cached<T> = { at: number; promise: Promise<T>; value?: T };

let pathsCache: Cached<Set<string>> | null = null;
const editsCache = new Map<string, Cached<ErpEdit[]>>();

// No result is kept: a request is only shared while it is still loading (the
// list starts loading when the bundle runs and the first route reuses it).
// Every navigation after that asks again, so ERP publishes show immediately.
const fresh = <T,>(c: Cached<T> | null | undefined): c is Cached<T> =>
  !!c && c.value === undefined && Date.now() - c.at < CACHE_TTL_MS;

async function getJson(url: string): Promise<Record<string, unknown>> {
  const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return (await res.json()) ?? {};
}

function editedPaths(): Cached<Set<string>> {
  if (fresh(pathsCache)) return pathsCache;
  const entry: Cached<Set<string>> = {
    at: Date.now(),
    promise: getJson(API)
      .then((json) => new Set((Array.isArray(json.paths) ? json.paths : []).filter((p): p is string => typeof p === 'string')))
      .catch((error) => {
        warn('could not load edited pages list', error);
        return new Set<string>();
      }),
  };
  entry.promise.then((value) => (entry.value = value));
  pathsCache = entry;
  return entry;
}

function pageEdits(path: string): Promise<ErpEdit[]> {
  const cached = editsCache.get(path);
  if (fresh(cached)) return cached.promise;
  const promise = getJson(`${API}?path=${encodeURIComponent(path)}`).then((json) =>
    Array.isArray(json.edits) ? (json.edits as ErpEdit[]) : [],
  );
  const entry: Cached<ErpEdit[]> = { at: Date.now(), promise };
  promise.then((value) => (entry.value = value)).catch(() => editsCache.delete(path));
  editsCache.set(path, entry);
  return promise;
}

// The edits request the <head> script (ErpAntiFlicker.tsx) started for the
// first page's path, before hydration. Taken off window once; used only by
// the first load of that path, and dropped on the first navigation elsewhere,
// so a finished result is never reused for a later visit.
type BootEdits = Promise<Record<string, unknown> | null> & { path?: string };
let boot: BootEdits | null = null;

if (typeof window !== 'undefined') {
  // Start loading the list as soon as the client bundle runs.
  editedPaths();
  const w = window as unknown as Record<string, unknown>;
  const pending = w[BOOT_EDITS_KEY] as BootEdits | undefined;
  if (pending && typeof pending.then === 'function' && typeof pending.path === 'string') boot = pending;
  delete w[BOOT_EDITS_KEY];
}

/* ---------------------------- DOM resolution ---------------------------- */

type Styled = HTMLElement | SVGElement;
// `null` = a copy selector ([data-erp-clone="…"]): looked up when the step runs,
// because copies only exist once their sectionDuplicate step has run.
type Resolved = { edit: ErpEdit; el: Styled | null; target?: Styled | null };

function query(selector: string): Styled | null {
  try {
    const el = document.querySelector(selector);
    return el && 'style' in el ? (el as Styled) : null;
  } catch {
    return null; // invalid selector
  }
}

/**
 * Resolves every selector against the current (original) DOM, before any
 * change. Copy selectors are deferred (null) and never count as missing.
 */
function resolveAll(edits: ErpEdit[]): { resolved: Resolved[]; missing: number } {
  const resolved: Resolved[] = [];
  let missing = 0;
  const resolve = (selector: string) => (isCopySelector(selector) ? null : query(selector));
  const found = (selector: string, el: Styled | null) => !!el || isCopySelector(selector);
  for (const edit of edits) {
    const el = resolve(edit.selector);
    const target = edit.type === 'sectionMove' ? resolve(edit.target) : undefined;
    if (!found(edit.selector, el) || (edit.type === 'sectionMove' && !found(edit.target, target!))) {
      missing++;
      continue;
    }
    resolved.push({ edit, el, target });
  }
  return { resolved, missing };
}

/**
 * Waits (briefly) until the route's content is in the DOM: resolves as soon as
 * every selector matches, or with whatever matched at the deadline.
 */
function waitForTargets(edits: ErpEdit[], isCancelled: () => boolean): Promise<Resolved[]> {
  return new Promise((resolve) => {
    let result = resolveAll(edits);
    if (result.missing === 0) return resolve(result.resolved);

    let frame = 0;
    const finish = () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      resolve(isCancelled() ? [] : result.resolved);
    };
    const observer = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        result = resolveAll(edits);
        if (result.missing === 0 || isCancelled()) finish();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(() => {
      if (result.missing) warn(`${result.missing} edit target(s) not found on this page`);
      finish();
    }, MAX_WAIT_FOR_DOM_MS);
  });
}

/* ---------------------------- apply / revert ---------------------------- */

// Containers that manage their own layout; makeRoomFor leaves them alone.
const SLIDER_CLASS = /swiper|slick|carousel|owl-|splide|flickity|glide/i;
const MAX_ROOM_DEPTH = 12;
const POSITIONED = /^(absolute|fixed|sticky)$/;

// Text/border settings on a table, its body or a row also go on its cells.
// Mirrors targetsFor in the ERP styleUtils.js.
const TABLE_PART = /^(TABLE|THEAD|TBODY|TFOOT|TR)$/;
const CELL_PROPERTY =
  /^(font-family|font-size|font-weight|font-style|line-height|letter-spacing|text-transform|text-align|border-color)$/;

// Responsive/lazy image attributes that would bring the old file back.
// Same lists as the ERP's page-edits.js.
const LAZY_SRC = [
  'data-src', 'data-lazy-src', 'data-original', 'data-lazy', 'data-ll-src', 'data-orig-src',
  'data-pagespeed-lazy-src', 'data-actualsrc', 'data-echo',
];
const LAZY_SRCSET = ['data-srcset', 'data-lazy-srcset', 'data-ll-srcset'];
const LAZY_BACKGROUND = [
  'data-bg', 'data-background', 'data-bg-image', 'data-background-image', 'data-lazy-background', 'data-ll-bg',
];

/*
 * Sections added in the ERP editor ("insert"). REFERENCE_SECTION_CSS is
 * addSectionStyle from the ERP's page-edits.js, copied verbatim, so added
 * sections (incl. buttons, cards and image-left/right) look as in the editor
 * preview. Keep it in sync with that script. Typography comes from each
 * section's `theme` (this site's fonts, sampled by the editor).
 */
const SECTION_STYLE_ID = 'erp-section-style';
const REFERENCE_SECTION_CSS =
  '.erp-section{box-sizing:border-box;width:100%;max-width:1200px;margin:48px auto;padding:0 20px}.erp-section>*:first-child{margin-top:0}.erp-section p{margin:0 0 12px}.erp-section h2,.erp-section h3,.erp-section h4{margin:24px 0 12px}.erp-section ul,.erp-section ol{margin:12px 0;padding-left:1.5em}.erp-section ul{list-style:disc}.erp-section ol{list-style:decimal}.erp-section img{display:block;max-width:100%;height:auto;margin:16px 0}.erp-section table{width:100%;border-collapse:separate;border-spacing:0;margin:16px 0;border:1px solid rgba(127,127,127,.35);overflow:hidden}.erp-section th,.erp-section td{border:0 solid rgba(127,127,127,.35);border-right-width:1px;border-bottom-width:1px;padding:10px 12px;text-align:left;vertical-align:top}.erp-section tr>:last-child{border-right-width:0}.erp-section tr:last-child>*{border-bottom-width:0}.erp-section th{font-weight:600;background:rgba(127,127,127,.08)}.erp-section td p,.erp-section th p{margin:0}.erp-section a.erp-btn{display:inline-block;margin:8px 12px 8px 0;padding:12px 24px;border:2px solid var(--erp-btn-bg,#ea580c);border-radius:var(--erp-btn-radius,8px);background:var(--erp-btn-bg,#ea580c);color:var(--erp-btn-color,#fff);font-weight:600;line-height:1.2;text-decoration:none;cursor:pointer}.erp-section a.erp-btn:hover{opacity:.88}.erp-section a.erp-btn.erp-btn-outline{background:transparent;color:var(--erp-btn-bg,#ea580c)}.erp-section .erp-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin:24px 0}.erp-section .erp-card{box-sizing:border-box;padding:24px;border:1px solid rgba(127,127,127,.25);border-radius:12px;background:rgba(127,127,127,.04)}.erp-section .erp-card>*:first-child{margin-top:0}.erp-section .erp-card>*:last-child{margin-bottom:0}.erp-section .erp-card img{margin:0 0 16px;border-radius:8px}.erp-section.erp-layout-image-left,.erp-section.erp-layout-image-right{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:repeat(var(--erp-text-rows,1),auto) 1fr;column-gap:40px;align-items:start}.erp-layout-image-left>*{grid-column:2}.erp-layout-image-left>img:first-of-type{grid-column:1;grid-row:1/-1}.erp-layout-image-right>*{grid-column:1}.erp-layout-image-right>img:first-of-type{grid-column:2;grid-row:1/-1}.erp-layout-image-left>img:first-of-type,.erp-layout-image-right>img:first-of-type{width:100%;height:auto;margin:0;align-self:center}@media (max-width:767px){.erp-section.erp-layout-image-left,.erp-section.erp-layout-image-right{display:block}.erp-layout-image-left>img:first-of-type,.erp-layout-image-right>img:first-of-type{margin:16px 0}}';
/*
 * Site additions, after the reference so it stays untouched. Only properties
 * the reference leaves unset: Tailwind's preflight resets heading sizes, so
 * these give a fallback when a section's theme has none (theme rules are more
 * specific and win), and wide tables scroll sideways on phones.
 */
const SITE_SECTION_CSS = [
  '.erp-section h1{font-size:2.5rem;line-height:1.1;margin:24px 0 12px}',
  '.erp-section h2{font-size:2.25rem;line-height:1.15}',
  '.erp-section h3{font-size:1.5rem;line-height:1.25}',
  '.erp-section h4{font-size:1.25rem;line-height:1.3}',
  '.erp-section li{margin:4px 0}',
  '.erp-section strong,.erp-section b{font-weight:600}',
  '.erp-section a:not(.erp-btn){color:#8b6914;text-decoration:underline;text-underline-offset:4px}',
  '.erp-section blockquote{margin:16px 0;padding-left:16px;border-left:4px solid #c9a55b}',
  '.erp-section hr{margin:24px 0;border:0;border-top:1px solid #eadfce}',
  '.erp-section figcaption{margin-top:8px;font-size:.875rem;color:#737373}',
  '@media (max-width:767px){',
  '.erp-section{margin:32px auto}',
  '.erp-section h1{font-size:2rem}',
  '.erp-section h2{font-size:1.875rem}',
  '.erp-section table{display:block;overflow-x:auto;max-width:100%}',
  '}',
].join('');

// Text in cells and list items is wrapped in <p> by the editor; it follows the cell.
const INHERIT_INNER_PARAGRAPH =
  'font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;' +
  'line-height:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit';

// "btn" theme: these become CSS variables used by a.erp-btn; the rest styles a.erp-btn.
const BUTTON_VARIABLES: Record<string, string> = {
  'background-color': '--erp-btn-bg',
  color: '--erp-btn-color',
  'border-radius': '--erp-btn-radius',
};

type InsertEdit = Extract<ErpEdit, { type: 'sectionInsert' }>;
type ElementEdit = Extract<ErpEdit, { type: 'elementEdit' }>;

function ensureSectionStyle() {
  if (document.getElementById(SECTION_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SECTION_STYLE_ID;
  style.textContent = REFERENCE_SECTION_CSS + SITE_SECTION_CSS;
  document.head.appendChild(style);
}

const scopeOf = (id: string) => `.erp-section[data-erp-clone="${id}"]`;

/** CSS for one added section's typography and button style, scoped to that section. */
function sectionThemeCss(edit: InsertEdit): string {
  if (!isCopyId(edit.id)) return '';
  const scope = scopeOf(edit.id);
  const declarations = (styles: ErpStyle[], rename?: Record<string, string>) =>
    styles.map(([property, value]) => `${rename?.[property] ?? property}:${value}`).join(';');
  const rules = edit.theme
    .map(([tag, styles]) => {
      const safe = styles.filter(([property, value]) => isSafeThemeStyle(property, value));
      if (!safe.length) return '';
      if (tag !== 'btn') return `${scope} ${tag}{${declarations(safe)}}`;
      const colours = safe.filter(([property]) => BUTTON_VARIABLES[property]);
      const rest = safe.filter(([property]) => !BUTTON_VARIABLES[property]);
      return (
        (colours.length ? `${scope}{${declarations(colours, BUTTON_VARIABLES)}}` : '') +
        (rest.length ? `${scope} a.erp-btn{${declarations(rest)}}` : '')
      );
    })
    .join('');
  if (!rules) return '';
  return `${rules}${scope} th p,${scope} td p,${scope} li p{${INHERIT_INNER_PARAGRAPH}}`;
}

/** A custom section's own CSS, nested in its scope ("&" is the section). */
function customSectionCss(edit: InsertEdit): string {
  if (edit.kind !== 'custom' || !isCopyId(edit.id) || !isSafeCustomCss(edit.css) || !edit.css.trim()) return '';
  return `${scopeOf(edit.id)}{${edit.css}}`;
}

/* ------------------------- making room for content ------------------------ */
// Mirrors liftFixedHeight / coveredTop / contentTop / topGaps / keepTopGaps /
// makeRoomForCopy in the ERP's page-edits.js. Measuring helpers are pure; the
// writes go through EditSession.setStyle so they are reverted.

const isSlider = (node: Element) => typeof node.className === 'string' && SLIDER_CLASS.test(node.className);

// The lowest allowed top for the content holding an element, per ancestor.
type Gap = { node: HTMLElement; child: Element; gap: number };

/** How far down from the top of the node its padding or an overlaid (positioned) header reaches. */
function coveredTop(node: HTMLElement, child: Element): number {
  const box = node.getBoundingClientRect();
  const style = getComputedStyle(node);
  let covered = parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth) || 0;
  const y = box.top + 2;
  if (y < 0 || y > window.innerHeight || !document.elementsFromPoint) return covered;
  for (const at of [0.1, 0.5, 0.9]) {
    for (const element of document.elementsFromPoint(box.left + box.width * at, y)) {
      if (element.contains(node) || child.contains(element) || element.contains(child)) continue;
      const rect = element.getBoundingClientRect();
      if (rect.height >= box.height * 0.6 || rect.top > box.top + 2) continue;
      for (let item: Element | null = element; item && item !== node; item = item.parentElement) {
        if (POSITIONED.test(getComputedStyle(item).position)) {
          covered = Math.max(covered, rect.bottom - box.top);
          break;
        }
      }
    }
  }
  return covered;
}

/** Top of the content around the child: it and the in-flow elements before it. */
function contentTop(child: Element): number {
  let top = child.getBoundingClientRect().top;
  for (let item = child.previousElementSibling; item; item = item.previousElementSibling) {
    const rect = item.getBoundingClientRect();
    if (rect.height && !POSITIONED.test(getComputedStyle(item).position)) top = Math.min(top, rect.top);
  }
  return top;
}

/** Taken before the content changes, so keepTopGaps can tell when it grew upwards. */
function topGaps(element: Element | null): Gap[] {
  const gaps: Gap[] = [];
  let child = element;
  let node = element?.parentElement ?? null;
  for (let depth = 0; child && node && node !== document.body && depth < MAX_ROOM_DEPTH; depth++) {
    if (isSlider(node)) break;
    const gap = contentTop(child) - node.getBoundingClientRect().top;
    gaps.push({ node, child, gap: Math.min(gap, coveredTop(node, child) + 24) });
    child = node;
    node = node.parentElement;
  }
  return gaps;
}

const changesText = (edit: ElementEdit) => edit.text !== undefined || edit.html !== undefined;

class EditSession {
  // Original style attribute of every element touched (restored last).
  private styles = new Map<Styled, string | null>();
  // Structural changes (text, moves, copies), undone in reverse order.
  private undo: (() => void)[] = [];
  // Changed text and added sections, measured again once images and fonts load.
  private grow: [Styled, Gap[]][] = [];
  // Bumped by revert, so late load/font callbacks of an old apply do nothing.
  private generation = 0;

  private setStyle(el: Styled, property: string, value: string) {
    if (!this.styles.has(el)) this.styles.set(el, el.getAttribute('style'));
    el.style.setProperty(property, value, 'important');
  }

  /** The step's element: resolved up front, or looked up now for copy selectors. */
  private live(selector: string, early: Styled | null | undefined): Styled | null {
    const el = early ?? (isCopySelector(selector) ? query(selector) : null);
    return el?.isConnected ? el : null;
  }

  /** Sets (or removes, for null) an attribute; revert puts the previous value back. */
  private setAttr(el: Element, name: string, value: string | null) {
    const original = el.getAttribute(name);
    if (original === value) return;
    this.undo.push(() => {
      if (original === null) el.removeAttribute(name);
      else el.setAttribute(name, original);
    });
    if (value === null) el.removeAttribute(name);
    else el.setAttribute(name, value);
  }

  /** Takes a node out of the page; revert puts it back in the same place. */
  private detach(node: Element) {
    const parent = node.parentNode;
    if (!parent) return;
    const next = node.nextSibling;
    node.remove();
    this.undo.push(() => {
      if (next && next.parentNode === parent) parent.insertBefore(node, next);
      else parent.appendChild(node);
    });
  }

  private replaceContent(el: Styled, content: Node[] | DocumentFragment) {
    const nodes = Array.from(el.childNodes);
    this.undo.push(() => el.replaceChildren(...nodes));
    if (content instanceof DocumentFragment) el.replaceChildren(content);
    else el.replaceChildren(...content);
  }

  /** <style> in <head> for one added section, removed again on revert. */
  private addStyle(css: string, attribute: string, id: string) {
    if (!css) return;
    const style = document.createElement('style');
    style.setAttribute(attribute, id);
    style.textContent = css;
    document.head.appendChild(style);
    this.undo.push(() => style.remove());
  }

  private editImage(el: Styled, edit: ElementEdit) {
    const { image, backgroundImage } = edit;
    if (image && el.tagName === 'IMG') {
      if (isSafeImageUrl(image.src)) {
        this.setAttr(el, 'src', image.src);
        // next/image and lazy loaders would load the old file from these.
        for (const name of ['srcset', 'sizes', ...LAZY_SRCSET]) if (el.hasAttribute(name)) this.setAttr(el, name, null);
        for (const name of LAZY_SRC) if (el.hasAttribute(name)) this.setAttr(el, name, image.src);
        el.closest('picture')?.querySelectorAll('source').forEach((source) => this.detach(source));
      }
      if (typeof image.alt === 'string') this.setAttr(el, 'alt', image.alt);
    }
    if (isSafeImageUrl(backgroundImage)) {
      this.setStyle(el, 'background-image', `url("${backgroundImage}")`);
      for (const name of LAZY_BACKGROUND) if (el.hasAttribute(name)) this.setAttr(el, name, null);
    }
  }

  private editElement(el: Styled, edit: ElementEdit) {
    this.editImage(el, edit);
    if (typeof edit.html === 'string') {
      // Rich text (paragraphs, bold, links, font sizes), sanitized again here.
      this.replaceContent(el, sanitizeErpHtml(edit.html, 'rich'));
    } else if (typeof edit.text === 'string') {
      // Plain text: every line break shows as a new line.
      const content: Node[] = [];
      edit.text.split('\n').forEach((line, i) => {
        if (i) content.push(document.createElement('br'));
        content.push(document.createTextNode(line));
      });
      this.replaceContent(el, content);
    }
    for (const [property, value] of edit.styles) {
      if (!isSafeStyle(property, value)) continue;
      this.setStyle(el, property, value);
      const descendants =
        property === 'color' || property === 'text-decoration'
          ? el.querySelectorAll('*')
          : TABLE_PART.test(el.tagName) && CELL_PROPERTY.test(property)
            ? el.querySelectorAll('th,td')
            : null;
      descendants?.forEach((child) => {
        if ('style' in child) this.setStyle(child as Styled, property, value);
      });
    }
  }

  /** New section written in the ERP editor, placed before/after the anchor. */
  private insert(anchor: Styled, edit: InsertEdit) {
    if (!isCopyId(edit.id) || document.querySelector(`[data-erp-clone="${edit.id}"]`)) return;
    ensureSectionStyle();
    const custom = edit.kind === 'custom';
    const section = document.createElement('section');
    section.className = custom ? 'erp-section erp-custom' : 'erp-section';
    section.setAttribute('data-erp-clone', edit.id);
    if (edit.layout) section.classList.add(`erp-layout-${edit.layout}`);
    section.append(sanitizeErpHtml(edit.html, custom ? 'custom' : 'section'));
    // Image left/right: the image spans every text row.
    const textRows = section.children.length - (section.querySelector(':scope > img') ? 1 : 0);
    section.style.setProperty('--erp-text-rows', String(Math.max(textRows, 1)));
    const gaps = topGaps(anchor);
    if (edit.position === 'before') anchor.before(section);
    else anchor.after(section);
    // React doesn't know about added sections: always take them out on cleanup.
    this.undo.push(() => section.remove());
    // Theme first, then the custom CSS, so the section's own CSS wins.
    this.addStyle(sectionThemeCss(edit), 'data-erp-theme', edit.id);
    this.addStyle(customSectionCss(edit), 'data-erp-custom', edit.id);
    this.grow.push([section, gaps]);
  }

  private move(el: Styled, target: Styled, position: 'before' | 'after') {
    const parent = el.parentNode;
    if (!parent || target === el || el.contains(target)) return;
    const next = el.nextSibling;
    this.undo.push(() => {
      try {
        if (next && next.parentNode === parent) parent.insertBefore(el, next);
        else if (!next) parent.appendChild(el);
      } catch (error) {
        warn('could not restore moved section', error);
      }
    });
    if (position === 'before') target.before(el);
    else target.after(el);
  }

  private duplicate(el: Styled, id: string) {
    if (document.querySelector(`[data-erp-clone="${id}"]`)) return;
    const copy = el.cloneNode(true) as Styled;
    copy.setAttribute('data-erp-clone', id);
    const gaps = topGaps(el);
    el.after(copy);
    // React doesn't know about copies: always take them out again on cleanup.
    this.undo.push(() => copy.remove());
    this.makeRoomFor(copy, gaps);
  }

  private coverBackground(node: Styled) {
    const style = getComputedStyle(node);
    if (style.backgroundImage !== 'none' && /^auto/.test(style.backgroundSize)) {
      this.setStyle(node, 'background-size', 'cover');
    }
  }

  /** Lifts a fixed height (not one set in the editor) when that makes the box grow. */
  private liftFixedHeight(node: Styled) {
    if (node.style.getPropertyPriority('height') === 'important' && node.style.height !== 'auto') return;
    const height = node.getBoundingClientRect().height;
    const saved = (['height', 'max-height'] as const).map(
      (p) => [p, node.style.getPropertyValue(p), node.style.getPropertyPriority(p)] as const,
    );
    this.setStyle(node, 'height', 'auto');
    this.setStyle(node, 'max-height', 'none');
    if (node.getBoundingClientRect().height <= height + 1) {
      // Didn't grow: not a fixed height. Put the inline values back.
      for (const [p, value, priority] of saved) {
        if (value) node.style.setProperty(p, value, priority);
        else node.style.removeProperty(p);
      }
      return;
    }
    this.coverBackground(node);
  }

  /** A fixed-height hero with centred content grows upwards: grow it until clear of the header. */
  private keepTopGaps(gaps: Gap[]) {
    for (const entry of gaps) {
      const { node } = entry;
      if (!node.isConnected || !node.contains(entry.child)) continue;
      if (node.style.getPropertyPriority('height') === 'important' && node.style.height !== 'auto') continue;
      const lostNow = () => entry.gap - (contentTop(entry.child) - node.getBoundingClientRect().top);
      let grew = false;
      // Centred content only moves down by half the extra height.
      let factor = 1;
      for (let tries = 0; tries < 4; tries++) {
        const lost = lostNow();
        const height = parseFloat(getComputedStyle(node).height);
        if (lost <= 1 || !Number.isFinite(height)) break;
        const add = Math.ceil(lost * factor);
        this.setStyle(node, 'min-height', `${height + add}px`);
        const moved = lost - lostNow();
        if (moved <= 0.5) break;
        grew = true;
        factor = Math.min(add / moved, 4);
      }
      if (grew) this.coverBackground(node);
    }
  }

  /**
   * Lets new or longer content and its containers grow: fixed heights are
   * lifted, non-wrapping rows wrap and horizontal clipping is lifted. Sliders
   * are left alone.
   */
  private makeRoomFor(el: Styled, gaps: Gap[]) {
    this.keepTopGaps(gaps);
    if (!/auto|scroll/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 1) {
      this.liftFixedHeight(el);
    }
    let node = el.parentElement;
    for (let depth = 0; node && node !== document.body && depth < MAX_ROOM_DEPTH; depth++, node = node.parentElement) {
      if (isSlider(node)) break;
      const style = getComputedStyle(node);
      let box = node.getBoundingClientRect();
      if (
        style.display.includes('flex') &&
        style.flexDirection.startsWith('row') &&
        style.flexWrap === 'nowrap' &&
        el.getBoundingClientRect().right > box.right + 1
      ) {
        this.setStyle(node, 'flex-wrap', 'wrap');
      }
      const elBox = el.getBoundingClientRect();
      box = node.getBoundingClientRect();
      // Only a fixed height is lifted; nothing else is resized.
      if (elBox.bottom > box.bottom + 1) this.liftFixedHeight(node);
      if (elBox.right > box.right + 1 && /hidden|clip/.test(style.overflowX)) {
        this.setStyle(node, 'width', 'auto');
        this.setStyle(node, 'max-width', 'none');
      }
    }
  }

  private makeRoom() {
    for (const [el, gaps] of this.grow) if (el.isConnected) this.makeRoomFor(el, gaps);
  }

  apply(resolved: Resolved[]) {
    const generation = this.generation;
    // Layout before the text changes, to keep heroes from growing upwards.
    const gaps = new Map<Resolved, Gap[]>();
    for (const entry of resolved) {
      const { edit, el } = entry;
      if (edit.type === 'elementEdit' && el && changesText(edit)) gaps.set(entry, topGaps(el));
    }
    // 1. Element edits on the original page (text, rich text, images, styles).
    for (const entry of resolved) {
      const { edit, el } = entry;
      if (edit.type !== 'elementEdit' || isCopySelector(edit.selector)) continue;
      const live = this.live(edit.selector, el);
      if (!live) continue;
      this.editElement(live, edit);
      if (changesText(edit)) this.grow.push([live, gaps.get(entry) ?? []]);
    }
    // 2. Moves, removals, duplicates and added sections, in order. Copy
    //    selectors (copies and added sections) resolve now.
    for (const { edit, el, target } of resolved) {
      if (edit.type === 'elementEdit') continue;
      const live = this.live(edit.selector, el);
      if (!live) continue;
      if (edit.type === 'sectionRemove') {
        // Hidden, not removed: React still owns the node (see top of file).
        this.setStyle(live, 'display', 'none');
      } else if (edit.type === 'sectionMove') {
        const liveTarget = this.live(edit.target, target);
        if (liveTarget) this.move(live, liveTarget, edit.position);
      } else if (edit.type === 'sectionDuplicate') {
        this.duplicate(live, edit.id);
      } else if (edit.type === 'sectionInsert') {
        this.insert(live, edit);
      }
    }
    // 3. Last: element edits on copies and added sections (their own text and colours).
    for (const { edit } of resolved) {
      if (edit.type !== 'elementEdit' || !isCopySelector(edit.selector)) continue;
      const live = this.live(edit.selector, null);
      if (!live) continue;
      const before = changesText(edit) ? topGaps(live) : [];
      this.editElement(live, edit);
      if (changesText(edit)) this.grow.push([live, before]);
    }
    // 4. Changed text and added sections may no longer fit a fixed-height box
    //    (e.g. a hero). Measured again once images and web fonts have loaded.
    this.makeRoom();
    if (!this.grow.length) return;
    const again = () => {
      if (generation === this.generation) this.makeRoom();
    };
    if (document.readyState !== 'complete') window.addEventListener('load', again, { once: true });
    document.fonts?.ready.then(again).catch(() => {});
  }

  revert() {
    this.generation++;
    this.grow = [];
    // Reverse order: a moved node's recorded sibling may be a copy, and copies
    // may have been moved, so each change is undone against the DOM it saw.
    for (const step of this.undo.reverse()) step();
    this.styles.forEach((original, el) => {
      if (original === null) el.removeAttribute('style');
      else el.setAttribute('style', original);
    });
    this.undo = [];
    this.styles.clear();
  }
}

/** Removes the first-paint hiding added by the <head> script, if still there. */
function removeAntiFlicker() {
  document.getElementById(ANTI_FLICKER_STYLE_ID)?.remove();
}

/** Hides <main> while edits load; returns an idempotent reveal function. */
function hideMain(): () => void {
  const main = document.querySelector<HTMLElement>('body > main');
  if (!main) return () => {};
  const value = main.style.getPropertyValue('opacity');
  const priority = main.style.getPropertyPriority('opacity');
  main.style.setProperty('opacity', '0', 'important');
  let revealed = false;
  const timer = setTimeout(() => reveal(), MAX_HIDE_MS);
  function reveal() {
    if (revealed) return;
    revealed = true;
    clearTimeout(timer);
    if (value) main!.style.setProperty('opacity', value, priority);
    else main!.style.removeProperty('opacity');
  }
  return reveal;
}

/* ------------------------------- component ------------------------------ */

export default function ErpPageEdits() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const path = normalizeEditPath(pathname ?? '/');
    const session = new EditSession();
    let cancelled = false;
    let reveal = () => {};
    // Live updates: what is currently applied, so a background check can tell
    // when the ERP published something new for this page.
    let applied = '[]';
    let ready = false;
    let checking = false;

    // First load of an edited page: the <head> script has hidden <main> since
    // the first paint and already requested this path's edits. Its <style> is
    // left in place on cleanup (a StrictMode re-run reuses it); any run for
    // another path removes it before paint.
    if (boot && boot.path !== path) boot = null;
    const initial = boot;
    if (initial) reveal = removeAntiFlicker;
    else removeAntiFlicker();

    // When the list is already known (client navigations), hide before paint
    // so the unedited page never flashes.
    const paths = editedPaths();
    if (!initial && paths.value?.has(path)) reveal = hideMain();

    (async () => {
      let edits: ErpEdit[];
      if (initial) {
        const json = await initial;
        if (cancelled) return;
        if (!json) return warn('could not load edits for this page');
        edits = Array.isArray(json.edits) ? (json.edits as ErpEdit[]) : [];
      } else {
        const edited = paths.value ?? (await paths.promise);
        if (cancelled || !edited.has(path)) return;
        edits = await pageEdits(path);
      }
      if (cancelled || edits.length === 0) return;
      const resolved = await waitForTargets(edits, () => cancelled);
      if (cancelled) return;
      // Reveal and apply in the same task: no paint in between, and the
      // recorded <main> style never includes the temporary opacity.
      reveal();
      session.apply(resolved);
      applied = JSON.stringify(edits);
    })()
      .catch((error) => warn('could not apply edits', error))
      .finally(() => {
        // Cancelled runs were revealed (or handed on) by the cleanup.
        if (!cancelled) reveal();
        ready = true;
      });

    // Ask the ERP again in the background (only while the tab is visible) and
    // swap in the new edits when they changed, so a publish shows on an open
    // page without a refresh. Asks per path, so a page that had no edits on
    // load picks up its first ones too.
    const check = async () => {
      if (!ready || checking || cancelled || document.visibilityState !== 'visible') return;
      checking = true;
      try {
        const edits = await pageEdits(path);
        const signature = JSON.stringify(edits);
        if (cancelled || signature === applied) return;
        // Revert first, then resolve against the original DOM and re-apply in
        // the same task: the page never paints half-updated.
        session.revert();
        if (edits.length) session.apply(resolveAll(edits).resolved);
        applied = signature;
      } catch (error) {
        warn('could not check for new edits', error);
      } finally {
        checking = false;
      }
    };
    const timer = setInterval(check, LIVE_POLL_MS);
    const onVisible = () => void check();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);

    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
      if (!initial) reveal();
      session.revert();
    };
  }, [pathname]);

  return null;
}
