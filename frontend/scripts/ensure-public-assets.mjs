/**
 * Ensures every /assets/* path referenced in source exists under public/assets.
 * Missing files are generated from the closest available source image (sharp).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(frontendRoot, "public", "assets");

const SOURCE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

/** Prefer a themed source when we can; otherwise fall back to gallery-exterior.jpg. */
const SOURCE_BY_BASENAME = {
  "baby-shower-floral.webp": "gallery-garden.jpg",
  "baby-shower-group.webp": "journal-group-new.jpg",
  "baby-shower1.webp": "gallery-garden.jpg",
  "birthday-cake.webp": "gallery-dining-night.jpg",
  "birthday-dancefloor.webp": "concert1.webp",
  "birthday-decor.webp": "gallery-interior.jpg",
  "birthday-party1.webp": "journal-group-new.jpg",
  "birthday1.webp": "gallery-garden.jpg",
  "birthday2.webp": "concert2.webp",
  "birthday3.webp": "team-dinner1.webp",
  "diaper-cake-display.webp": "gallery-interior.jpg",
  "eid-decor.webp": "gallery-garden.jpg",
  "eid-feast.webp": "gallery-dining-night.jpg",
  "eid1.webp": "journal-group-new.jpg",
  "family-reunion-group.webp": "journal-group-new.jpg",
  "family-reunion1.webp": "gallery-garden.jpg",
  "farewell1.webp": "team-dinner1.webp",
  "farewell2.webp": "conference2.webp",
  "floral-baby-shower.webp": "gallery-garden.jpg",
  "gender-reveal-confetti.webp": "gallery-interior.jpg",
  "gender-reveal1.webp": "gallery-garden.jpg",
  "grad-cap-toss.webp": "journal-group-new.jpg",
  "grad-celebration.webp": "concert1.webp",
  "grad-ceremony.webp": "gallery-exterior.jpg",
  "grad-party-dancefloor.webp": "concert2.webp",
  "grad-photo-booth.webp": "gallery-interior.jpg",
  "graduation-party2.webp": "journal-group-new.jpg",
  "graduation1.webp": "gallery-garden.jpg",
  "meeting2.jpg": "conference1.webp",
  "moments1.webp": "gallery-exterior.jpg",
  "moments2.webp": "gallery-sunlight.jpg",
  "murree-panoramic-view.jpg": "murree-mountain-hero.jpg",
  "murree-spring.jpg": "murree-forest-pines.jpg",
  "murree-summer.jpg": "murree-mountain-hero.jpg",
  "murree-sunset-mountains.jpg": "murree-sunrise-mountains.jpg",
  "retirement1.webp": "team.webp",
  "retirement2.webp": "conference1.webp",
  "retirement3.webp": "team-dinner1.webp",
  "retirement4.webp": "conference2.webp",
  "villa-celebration.webp": "gallery-garden.jpg",
  "villa-garden.webp": "gallery-garden.jpg",
  "band3.jpg": "band2.jpg",
};

const DEFAULT_SOURCE = "gallery-exterior.jpg";

function collectReferencedAssets() {
  const refs = new Set();
  const exts = new Set([".tsx", ".ts", ".jsx", ".js"]);

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!exts.has(path.extname(entry.name))) continue;
      const text = fs.readFileSync(full, "utf8");
      for (const match of text.matchAll(/\/assets\/[a-zA-Z0-9._-]+/g)) {
        refs.add(match[0].slice("/assets/".length));
      }
    }
  }

  walk(frontendRoot);
  return refs;
}

function resolveSourcePath(basename) {
  const mapped = SOURCE_BY_BASENAME[basename];
  const candidates = mapped ? [mapped, DEFAULT_SOURCE] : [DEFAULT_SOURCE];

  for (const name of candidates) {
    const full = path.join(assetsDir, name);
    if (fs.existsSync(full)) return full;
  }

  for (const file of fs.readdirSync(assetsDir)) {
    const ext = path.extname(file).toLowerCase();
    if (SOURCE_EXTENSIONS.includes(ext)) {
      return path.join(assetsDir, file);
    }
  }

  throw new Error(`No source image found in ${assetsDir}`);
}

async function writeAsset(basename) {
  const target = path.join(assetsDir, basename);
  if (fs.existsSync(target)) return false;

  const sourcePath = resolveSourcePath(basename);
  const ext = path.extname(basename).toLowerCase();

  fs.mkdirSync(assetsDir, { recursive: true });

  if (ext === ".webp") {
    await sharp(sourcePath).webp({ quality: 82 }).toFile(target);
  } else if (ext === ".jpg" || ext === ".jpeg") {
    await sharp(sourcePath).jpeg({ quality: 85, mozjpeg: true }).toFile(target);
  } else if (ext === ".png") {
    await sharp(sourcePath).png().toFile(target);
  } else {
    fs.copyFileSync(sourcePath, target);
  }

  return true;
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const referenced = collectReferencedAssets();
  const created = [];

  for (const basename of [...referenced].sort()) {
    if (basename === "...") continue;
    if (await writeAsset(basename)) {
      created.push(basename);
    }
  }

  if (created.length) {
    console.log(`[ensure-public-assets] Created ${created.length} missing asset(s):`);
    for (const name of created) console.log(`  + ${name}`);
  } else {
    console.log("[ensure-public-assets] All referenced assets already exist.");
  }
}

main().catch((err) => {
  console.error("[ensure-public-assets] Failed:", err);
  process.exit(1);
});
