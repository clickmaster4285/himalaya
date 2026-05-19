/**
 * Rewrites Backend-style relative imports to @/lib/server/* aliases.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.join(__dirname, "..", "lib", "server");

const replacements = [
  [/from "\.\.\/controllers\//g, 'from "@/lib/server/controllers/'],
  [/from "\.\.\/utils\//g, 'from "@/lib/server/utils/'],
  [/from "\.\.\/services\//g, 'from "@/lib/server/services/'],
  [/from "\.\.\/middleware\//g, 'from "@/lib/server/middleware/'],
  [/from "\.\.\/config\//g, 'from "@/lib/server/config/'],
  [/from "\.\.\/models\//g, 'from "@/lib/server/models/'],
  [/from "\.\.\/data\//g, 'from "@/lib/server/data/'],
  [/from "\.\.\/templates\//g, 'from "@/lib/server/templates/'],
  [/from "\.\/env"/g, 'from "@/lib/server/config/env"'],
  [/from "\.\/bootstrap"/g, 'from "@/lib/server/config/bootstrap"'],
  [/from "\.\/static-villas"/g, 'from "@/lib/server/data/static-villas"'],
  [/from "\.\/villa-types"/g, 'from "@/lib/server/data/villa-types"'],
  [/from "\.\/layout"/g, 'from "@/lib/server/templates/emails/layout"'],
  [/from "\.\/inquiry-email\.types"/g, 'from "@/lib/server/services/inquiry-email.types"'],
  [/from "\.\/booking-emails"/g, 'from "@/lib/server/templates/emails/booking-emails"'],
  [/from "\.\/inquiry-confirmation"/g, 'from "@/lib/server/templates/emails/inquiry-confirmation"'],
  [/from "\.\/inquiry-staff-notification"/g, 'from "@/lib/server/templates/emails/inquiry-staff-notification"'],
  [/backend\/\.env/g, ".env.local"],
];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith(".ts")) fixFile(p);
  }
}

function fixFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  let changed = false;
  for (const [re, rep] of replacements) {
    if (re.test(text)) {
      text = text.replace(re, rep);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(filePath, text);
}

walk(serverRoot);
console.log("fixed imports under", serverRoot);
