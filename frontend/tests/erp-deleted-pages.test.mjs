// tests/erp-deleted-pages.test.mjs
// ERP Page Delete Requests (lib/erp-deleted-pages.ts, read by proxy.ts):
// payload validation, which requests are checked, the per-process cache
// (one ERP call per 30 s window, shared in-flight request), fail-open with the
// last good list, and the 410 response.
// Run: npm run test:erp   (Node 24+)
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Resolve the app's "@/…" alias and extensionless TS imports, as Next does.
const root = fileURLToPath(new URL('..', import.meta.url));
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) specifier = pathToFileURL(`${root}${specifier.slice(2)}.ts`).href;
    else if (specifier.startsWith('.') && !/\.[cm]?[jt]s$/.test(specifier) && context.parentURL?.endsWith('.ts'))
      specifier = `${specifier}.ts`;
    return next(specifier, context);
  },
});

process.env.CMS_API_URL = 'https://erp.test';
process.env.CMS_SITE_DOMAIN = 'himalayavillas.com';

let calls = 0;
let respond = () => Response.json({ success: true, data: { pages: [] } });
globalThis.fetch = async (url) => {
  calls++;
  assert.equal(String(url), 'https://erp.test/public/himalayavillas.com/deleted-pages');
  return respond();
};
const payload = (pages) => () => Response.json({ success: true, data: { website: {}, pages } });

const mod = await import('../lib/erp-deleted-pages.ts');
const { parseDeletedPaths, shouldCheckDeletedPath, getDeletedPaths, clearDeletedPathsCache, deletedPageResponse } = mod;

test('payload: keeps valid paths, normalized; drops "/", junk and non-strings', () => {
  const paths = parseDeletedPaths({
    data: {
      pages: [
        { path: '/villas/old-villa', deletedAt: '2026-11-27T10:15:00.000Z' },
        { path: '/Blogs/Some-Post/' },
        { path: '/' },
        { path: '' },
        { path: 'no-slash' },
        { path: '/has space' },
        { path: '/with?query' },
        { path: '/with#hash' },
        { path: 42 },
        null,
        'string',
        { path: `/${'a'.repeat(3000)}` },
      ],
    },
  });
  assert.deepEqual(paths.sort(), ['/blogs/some-post', '/villas/old-villa']);
});

test('payload: an invalid shape throws (so the last good list is kept)', () => {
  for (const bad of [null, {}, { data: {} }, { data: { pages: {} } }, 'x']) {
    assert.throws(() => parseDeletedPaths(bad));
  }
  assert.deepEqual(parseDeletedPaths({ data: { pages: [] } }), []);
});

test('only GET/HEAD page requests are checked', () => {
  for (const p of ['/that-page', '/That-Page/', '/villas/old-villa', '/blogs/a.b-c']) {
    assert.equal(shouldCheckDeletedPath('GET', p), true, p);
  }
  assert.equal(shouldCheckDeletedPath('HEAD', '/that-page'), true);
  for (const m of ['POST', 'PUT', 'DELETE', 'OPTIONS']) assert.equal(shouldCheckDeletedPath(m, '/that-page'), false);
  for (const p of [
    '/',
    '',
    '/api',
    '/api/erp-revalidate',
    '/_next/static/chunks/a.js',
    '/erp-preview',
    '/robots.txt',
    '/sitemap_pages.xml',
    '/sitemap.xml',
    '/favicon.ico',
    '/assets/hero.jpg',
    '/uploads/x.webp',
  ]) {
    assert.equal(shouldCheckDeletedPath('GET', p), false, p);
  }
});

test('cache: 50 requests in a row and 20 concurrent ones cause one ERP call', async () => {
  respond = payload([{ path: '/that-page' }]);
  clearDeletedPathsCache();
  calls = 0;
  await Promise.all(Array.from({ length: 20 }, () => getDeletedPaths()));
  for (let i = 0; i < 50; i++) assert.equal((await getDeletedPaths()).has('/that-page'), true);
  assert.equal(calls, 1);
});

test('cache: after the TTL, one background refresh; stale list served meanwhile', async () => {
  respond = payload([{ path: '/that-page' }]);
  clearDeletedPathsCache();
  await getDeletedPaths();
  calls = 0;
  respond = payload([]);
  const realNow = Date.now;
  Date.now = () => realNow() + 31_000;
  try {
    const results = await Promise.all(Array.from({ length: 10 }, () => getDeletedPaths()));
    assert.equal(results.every((s) => s.has('/that-page')), true); // stale while refreshing
    await new Promise((r) => setTimeout(r, 10));
    assert.equal(calls, 1);
    assert.equal((await getDeletedPaths()).has('/that-page'), false); // refreshed: restored page is back
  } finally {
    Date.now = realNow;
  }
});

test('clearDeletedPathsCache: the next request waits for the new list', async () => {
  respond = payload([]);
  clearDeletedPathsCache();
  assert.equal((await getDeletedPaths()).size, 0);
  respond = payload([{ path: '/now-deleted' }]);
  clearDeletedPathsCache();
  assert.equal((await getDeletedPaths()).has('/now-deleted'), true);
});

test('fail open: ERP down, 5xx or invalid JSON keep the last good list', async () => {
  respond = payload([{ path: '/gone' }]);
  clearDeletedPathsCache();
  await getDeletedPaths();
  const errors = console.error;
  console.error = () => {};
  try {
    for (const failure of [
      () => {
        throw new TypeError('fetch failed');
      },
      () => new Response('oops', { status: 503 }),
      () => new Response('<html>', { status: 200, headers: { 'content-type': 'text/html' } }),
      () => Response.json({ success: false }),
      () => new Response('Cannot GET', { status: 404 }),
    ]) {
      respond = failure;
      clearDeletedPathsCache();
      const paths = await getDeletedPaths();
      assert.deepEqual([...paths], ['/gone']);
    }
    // A failure is not retried on every request: one call per window.
    calls = 0;
    await getDeletedPaths();
    await getDeletedPaths();
    assert.equal(calls, 0);
  } finally {
    console.error = errors;
  }
});

test('410 response: status, headers, static body', async () => {
  const res = deletedPageResponse();
  assert.equal(res.status, 410);
  assert.equal(res.headers.get('x-robots-tag'), 'noindex');
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.match(res.headers.get('content-type'), /text\/html/);
  const html = await res.text();
  assert.match(html, /This page has been removed/);
  assert.match(html, /href="\/"/);
  assert.doesNotMatch(html, /<script/i);
});
