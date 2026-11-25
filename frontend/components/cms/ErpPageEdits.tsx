'use client';
// components/cms/ErpPageEdits.tsx
// Applies published ERP "edited page" instructions (text, rich text, images,
// styles, section moves/removals/duplicates and added sections) to the current
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
  isSafeImageUrl,
  isSafeStyle,
  isSafeThemeStyle,
  normalizeEditPath,
  type ErpEdit,
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

// Containers that manage their own layout; makeRoomForCopy leaves them alone.
const SLIDER_CLASS = /swiper|slick|carousel|owl-|splide|flickity|glide/i;
const MAX_ROOM_DEPTH = 12;

// Text/border settings on a table, its body or a row also go on its cells.
// Mirrors targetsFor in the ERP styleUtils.js.
const TABLE_PART = /^(TABLE|THEAD|TBODY|TFOOT|TR)$/;
const CELL_PROPERTY =
  /^(font-family|font-size|font-weight|font-style|line-height|letter-spacing|text-transform|text-align|border-color)$/;

// Responsive/lazy image attributes that would bring the old file back.
const LAZY_SRC = ['data-src', 'data-lazy-src', 'data-original', 'data-lazy', 'data-ll-src', 'data-orig-src'];
const LAZY_SRCSET = ['data-srcset', 'data-lazy-srcset', 'data-ll-srcset'];
const LAZY_BACKGROUND = ['data-bg', 'data-background', 'data-bg-image', 'data-background-image'];

/*
 * Sections added in the ERP editor ("insert"). The layout rules mirror
 * INSERTED_SECTION_CSS in the ERP (insertedSections.js / page-edits.js), so the
 * live page matches the editor preview; typography comes from each section's
 * `theme` (the site's own fonts, sampled by the editor). Tables, rules and
 * quotes use this site's warm gold palette, as on the site's own tables.
 * Tailwind's preflight resets lists, headings and tables, so they are restored.
 */
const SECTION_STYLE_ID = 'erp-section-style';
const SECTION_CSS = [
  '.erp-section{box-sizing:border-box;width:100%;max-width:1200px;margin:48px auto;padding:0 20px}',
  '.erp-section>*:first-child{margin-top:0}',
  '.erp-section>*:last-child{margin-bottom:0}',
  '.erp-section p{margin:0 0 12px}',
  '.erp-section h1,.erp-section h2,.erp-section h3,.erp-section h4{margin:24px 0 12px}',
  '.erp-section h2{font-size:2.25rem;line-height:1.15}',
  '.erp-section h3{font-size:1.5rem;line-height:1.25}',
  '.erp-section h4{font-size:1.25rem;line-height:1.3}',
  '.erp-section ul,.erp-section ol{margin:12px 0;padding-left:1.5em}',
  '.erp-section ul{list-style:disc}',
  '.erp-section ol{list-style:decimal}',
  '.erp-section li{margin:4px 0}',
  '.erp-section li::marker{color:#c9a55b}',
  '.erp-section a{color:#8b6914;text-decoration:underline;text-underline-offset:4px}',
  '.erp-section strong,.erp-section b{font-weight:600}',
  '.erp-section blockquote{margin:16px 0;padding-left:16px;border-left:4px solid #c9a55b}',
  '.erp-section hr{margin:24px 0;border:0;border-top:1px solid #eadfce}',
  '.erp-section img{display:block;max-width:100%;height:auto;margin:16px 0;border-radius:16px}',
  '.erp-section figcaption{margin-top:8px;font-size:.875rem;color:#737373}',
  '.erp-section table{width:100%;border-collapse:separate;border-spacing:0;margin:16px 0;border:1px solid #eadfce;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 20px 25px -5px rgba(0,0,0,.06),0 8px 10px -6px rgba(0,0,0,.06)}',
  '.erp-section th,.erp-section td{border:0 solid #f0e8dc;border-right-width:1px;border-bottom-width:1px;padding:14px 18px;text-align:left;vertical-align:top}',
  '.erp-section tr>:last-child{border-right-width:0}',
  '.erp-section tr:last-child>*{border-bottom-width:0}',
  '.erp-section th{font-weight:600;background:rgba(201,165,91,.1);color:#1b1b1b}',
  '.erp-section td p,.erp-section th p{margin:0}',
  '.erp-section.erp-layout-image-left,.erp-section.erp-layout-image-right{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:repeat(var(--erp-text-rows,1),auto) 1fr;column-gap:40px;align-items:start}',
  '.erp-layout-image-left>*{grid-column:2}',
  '.erp-layout-image-left>img:first-of-type{grid-column:1;grid-row:1/-1}',
  '.erp-layout-image-right>*{grid-column:1}',
  '.erp-layout-image-right>img:first-of-type{grid-column:2;grid-row:1/-1}',
  '.erp-layout-image-left>img:first-of-type,.erp-layout-image-right>img:first-of-type{width:100%;height:auto;margin:0;align-self:center}',
  '@media (max-width:767px){',
  '.erp-section{margin:32px auto}',
  '.erp-section h2{font-size:1.875rem}',
  '.erp-section table{display:block;overflow-x:auto}',
  '.erp-section.erp-layout-image-left,.erp-section.erp-layout-image-right{display:block}',
  '.erp-layout-image-left>img:first-of-type,.erp-layout-image-right>img:first-of-type{margin:16px 0}',
  '}',
].join('');

// Text in cells and list items is wrapped in <p> by the editor; it follows the cell.
const INHERIT_INNER_PARAGRAPH =
  'font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;' +
  'line-height:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit';

function ensureSectionStyle() {
  if (document.getElementById(SECTION_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SECTION_STYLE_ID;
  style.textContent = SECTION_CSS;
  document.head.appendChild(style);
}

/** CSS for one added section's typography, scoped to that section. */
function sectionThemeCss(edit: Extract<ErpEdit, { type: 'sectionInsert' }>): string {
  if (!isCopyId(edit.id)) return '';
  const scope = `.erp-section[data-erp-clone="${edit.id}"]`;
  const rules = edit.theme
    .map(([tag, styles]) => {
      const declarations = styles
        .filter(([property, value]) => isSafeThemeStyle(property, value))
        .map(([property, value]) => `${property}:${value}`)
        .join(';');
      return declarations ? `${scope} ${tag}{${declarations}}` : '';
    })
    .join('');
  if (!rules) return '';
  return `${rules}${scope} th p,${scope} td p,${scope} li p{${INHERIT_INNER_PARAGRAPH}}`;
}

class EditSession {
  // Original style attribute of every element touched (restored last).
  private styles = new Map<Styled, string | null>();
  // Structural changes (text, moves, copies), undone in reverse order.
  private undo: (() => void)[] = [];

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
    this.undo.push(() => {
      if (original === null) el.removeAttribute(name);
      else el.setAttribute(name, original);
    });
    if (value === null) el.removeAttribute(name);
    else el.setAttribute(name, value);
  }

  private replaceContent(el: Styled, content: Node[] | DocumentFragment) {
    const nodes = Array.from(el.childNodes);
    this.undo.push(() => el.replaceChildren(...nodes));
    if (content instanceof DocumentFragment) el.replaceChildren(content);
    else el.replaceChildren(...content);
  }

  private editImage(el: Styled, edit: Extract<ErpEdit, { type: 'elementEdit' }>) {
    const { image, backgroundImage } = edit;
    if (image && el.tagName === 'IMG') {
      if (isSafeImageUrl(image.src)) {
        this.setAttr(el, 'src', image.src);
        // next/image and lazy loaders would load the old file from these.
        for (const name of ['srcset', 'sizes', ...LAZY_SRCSET]) if (el.hasAttribute(name)) this.setAttr(el, name, null);
        for (const name of LAZY_SRC) if (el.hasAttribute(name)) this.setAttr(el, name, image.src);
        el.closest('picture')
          ?.querySelectorAll('source')
          .forEach((source) => {
            if (source.hasAttribute('srcset')) this.setAttr(source, 'srcset', null);
          });
      }
      if (typeof image.alt === 'string') this.setAttr(el, 'alt', image.alt);
    }
    if (isSafeImageUrl(backgroundImage)) {
      this.setStyle(el, 'background-image', `url("${backgroundImage}")`);
      for (const name of LAZY_BACKGROUND) if (el.hasAttribute(name)) this.setAttr(el, name, null);
    }
  }

  private editElement(el: Styled, edit: Extract<ErpEdit, { type: 'elementEdit' }>) {
    this.editImage(el, edit);
    if (typeof edit.html === 'string') {
      // Rich text (links, paragraphs, bold…), sanitized again here.
      this.replaceContent(el, sanitizeErpHtml(edit.html));
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
  private insert(anchor: Styled, edit: Extract<ErpEdit, { type: 'sectionInsert' }>) {
    if (!isCopyId(edit.id) || document.querySelector(`[data-erp-clone="${edit.id}"]`)) return;
    ensureSectionStyle();
    const section = document.createElement('section');
    section.className = 'erp-section';
    section.setAttribute('data-erp-clone', edit.id);
    if (edit.layout) section.classList.add(`erp-layout-${edit.layout}`);
    section.append(sanitizeErpHtml(edit.html));
    // Image left/right: the image spans every text row.
    const textRows = section.children.length - (section.querySelector(':scope > img') ? 1 : 0);
    section.style.setProperty('--erp-text-rows', String(Math.max(textRows, 1)));
    if (edit.position === 'before') anchor.before(section);
    else anchor.after(section);
    // React doesn't know about added sections: always take them out on cleanup.
    this.undo.push(() => section.remove());

    const css = sectionThemeCss(edit);
    if (css) {
      const theme = document.createElement('style');
      theme.setAttribute('data-erp-theme', edit.id);
      theme.textContent = css;
      document.head.appendChild(theme);
      this.undo.push(() => theme.remove());
    }
    this.makeRoomForCopy(section);
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
    const copy = el.cloneNode(true) as Styled;
    copy.setAttribute('data-erp-clone', id);
    el.after(copy);
    // React doesn't know about copies: always take them out again on cleanup.
    this.undo.push(() => copy.remove());
    this.makeRoomForCopy(copy);
  }

  /**
   * Lifts fixed heights, no-wrap rows and horizontal clipping on the copy's
   * ancestors so the copy isn't hidden. Sliders are left alone, and a height is
   * only lifted when that actually makes the container grow.
   */
  private makeRoomForCopy(copy: Styled) {
    let node = copy.parentElement;
    for (let depth = 0; node && node !== document.body && depth < MAX_ROOM_DEPTH; depth++, node = node.parentElement) {
      if (typeof node.className === 'string' && SLIDER_CLASS.test(node.className)) break;
      const style = getComputedStyle(node);
      let box = node.getBoundingClientRect();
      let copyBox = copy.getBoundingClientRect();

      if (
        style.display.includes('flex') &&
        style.flexDirection.startsWith('row') &&
        style.flexWrap === 'nowrap' &&
        copyBox.right > box.right + 1
      ) {
        this.setStyle(node, 'flex-wrap', 'wrap');
      }

      copyBox = copy.getBoundingClientRect();
      box = node.getBoundingClientRect();
      if (copyBox.bottom > box.bottom + 1) {
        const saved = (['height', 'max-height'] as const).map(
          (p) => [p, node!.style.getPropertyValue(p), node!.style.getPropertyPriority(p)] as const,
        );
        this.setStyle(node, 'height', 'auto');
        this.setStyle(node, 'max-height', 'none');
        if (node.getBoundingClientRect().height <= box.height + 1) {
          // Didn't grow: not a fixed height. Put the inline values back.
          for (const [p, value, priority] of saved) {
            if (value) node.style.setProperty(p, value, priority);
            else node.style.removeProperty(p);
          }
        }
      }

      if (copyBox.right > box.right + 1 && (style.overflowX === 'hidden' || style.overflowX === 'clip')) {
        this.setStyle(node, 'width', 'auto');
        this.setStyle(node, 'max-width', 'none');
      }
    }
  }

  apply(resolved: Resolved[]) {
    // 1. Element edits on the original page (text + styles).
    for (const { edit, el } of resolved) {
      if (edit.type !== 'elementEdit' || isCopySelector(edit.selector)) continue;
      const live = this.live(edit.selector, el);
      if (live) this.editElement(live, edit);
    }
    // 2. Moves, removals, duplicates and added sections, in order. Copy
    //    selectors (copies and added sections) resolve now.
    for (const { edit, el, target } of resolved) {
      if (edit.type === 'elementEdit') continue;
      const live = this.live(edit.selector, el);
      if (!live) continue;
      if (edit.type === 'sectionRemove') {
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
      if (live) this.editElement(live, edit);
    }
  }

  revert() {
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
