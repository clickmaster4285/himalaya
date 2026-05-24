/**
 * One-time sync: copies lib/server and app/api routes from Cursor workspace root
 * into this Next.js frontend project. Run from frontend/: node scripts/sync-migrated-api.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.join(__dirname, "..");
const workspaceRoot = path.join(frontendRoot, "..", "..", "..");

const sources = [
  { from: path.join(workspaceRoot, "lib", "server"), to: path.join(frontendRoot, "lib", "server") },
  { from: path.join(workspaceRoot, "app", "api"), to: path.join(frontendRoot, "app", "api") },
];

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn("skip missing:", src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

for (const { from, to } of sources) {
  if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true });
  copyDir(from, to);
  console.log("copied", from, "->", to);
}

// Remove legacy Express proxy routes if present
const legacy = [
  path.join(frontendRoot, "app", "api", "[[...slug]]", "route.ts"),
  path.join(frontendRoot, "app", "api", "auth", "[...segments]", "route.ts"),
];
for (const f of legacy) {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log("removed legacy", f);
  }
}

console.log("done");
