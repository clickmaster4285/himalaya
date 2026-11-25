// components/cms/ErpAntiFlicker.tsx
// Blocking inline <head> script that keeps visitors from ever seeing the
// original content of a page that has published ERP edits. It runs before the
// body is parsed, so the decision is made before the first paint:
//   - the list of edited paths is embedded by the server (cached, tag
//     erp-edited-pages; the same list on every route, so pages stay static);
//   - if the current path is in it, <main> is hidden by a <style>, and the
//     request for that path's edits starts at once, in parallel with the JS
//     bundle (window.__erpEditsPromise, consumed by ErpPageEdits.tsx).
// Fail-safe: the hiding is a 1.5 s CSS animation, so the page shows on its own
// even if JS or the request fails. (An animation, not `opacity:0!important`:
// important declarations override animations, so that could never end.)
// Unedited pages: nothing is added and nothing is requested.
import { getEditedPaths } from '@/lib/erp-edits';
import { ANTI_FLICKER_STYLE_ID, BOOT_EDITS_KEY } from '@/lib/erp-edits-shared';

const HIDE_CSS = 'main{animation:erp-hide 1.5s!important}@keyframes erp-hide{from,to{opacity:0}}';

// Path normalization mirrors normalizeEditPath (lib/erp-edits-shared.ts).
// The promise resolves to the API JSON, or null on any failure (never rejects,
// so a blocked request logs no unhandled rejection).
const script = (paths: string[]) =>
  `(function(){try{` +
  `var P=${JSON.stringify(paths).replace(/</g, '\\u003c')};` +
  `if(!P.length)return;` +
  `var d=document,h=d.documentElement,p=location.pathname;` +
  `try{p=decodeURIComponent(p)}catch(e){}` +
  `p=p.trim().toLowerCase().replace(/\\/{2,}/g,'/').replace(/\\/+$/,'');` +
  `if(p.charAt(0)!=='/')p='/'+p;` +
  `if(P.indexOf(p)<0||h.getAttribute('data-anti-flicker')==='off')return;` +
  `var s=d.createElement('style');s.id=${JSON.stringify(ANTI_FLICKER_STYLE_ID)};` +
  `s.textContent=${JSON.stringify(HIDE_CSS)};d.head.appendChild(s);` +
  `var r=fetch('/api/erp-edits?path='+encodeURIComponent(p),{cache:'no-store',headers:{Accept:'application/json'}})` +
  `.then(function(x){return x.ok?x.json():null}).catch(function(){return null});` +
  `r.path=p;window[${JSON.stringify(BOOT_EDITS_KEY)}]=r` +
  `}catch(e){}})()`;

export default async function ErpAntiFlicker() {
  const paths = await getEditedPaths();
  if (paths.length === 0) return null;
  return <script dangerouslySetInnerHTML={{ __html: script(paths) }} />;
}
