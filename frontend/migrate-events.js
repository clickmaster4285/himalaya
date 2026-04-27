const fs = require('fs');
const path = require('path');

const baseDirs = [
  path.join(__dirname, 'app/music'),
  path.join(__dirname, 'app/corporate'),
  path.join(__dirname, 'app/family-celebrations'),
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const linkMap = {};

for (const baseDir of baseDirs) {
  if (!fs.existsSync(baseDir)) continue;

  const subDirs = fs.readdirSync(baseDir).filter(name => {
    return fs.statSync(path.join(baseDir, name)).isDirectory();
  });

  for (const subDir of subDirs) {
    const dirPath = path.join(baseDir, subDir);
    const files = fs.readdirSync(dirPath);
    const pageFile = files.find(f => f === 'page.jsx' || f === 'page.tsx');
    
    if (!pageFile) continue;

    const pagePath = path.join(dirPath, pageFile);
    let content = fs.readFileSync(pagePath, 'utf8');

    // Extract H1
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (!h1Match) continue;

    // Clean up H1 text (remove tags like <br/> and extra spaces)
    const h1Html = h1Match[1];
    const h1Text = h1Html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    const newSlug = slugify(h1Text);
    
    console.log(`Processing: ${path.basename(baseDir)}/${subDir} -> ${newSlug} (H1: ${h1Text})`);

    // Map for updating events/page.tsx
    linkMap[`/${path.basename(baseDir)}/${subDir}`] = `/${path.basename(baseDir)}/${newSlug}`;

    // Update description <p> after H1
    // Let's find the first <p> after H1
    const pRegex = /(<h1[^>]*>[\s\S]*?<\/h1>\s*)<p[^>]*>([\s\S]*?)<\/p>/;
    const pMatch = content.match(pRegex);
    
    let descriptionText = `Experience the best ${h1Text.toLowerCase()} at Himalaya Villas & Resorts. Our premium services ensure a memorable event.`;
    
    if (pMatch) {
      const pText = pMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (!pText.toLowerCase().includes(h1Text.toLowerCase())) {
        // Inject keyword into existing description
        descriptionText = `Host your ${h1Text.toLowerCase()} with us. ${pText}`;
        content = content.replace(pMatch[2], descriptionText);
        fs.writeFileSync(pagePath, content);
      } else {
        descriptionText = pText;
      }
    }

    // Check if layout exists
    const ext = path.extname(pageFile); // .jsx or .tsx
    const layoutPath = path.join(dirPath, `layout${ext}`);
    
    if (!fs.existsSync(layoutPath)) {
      const layoutContent = `import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata({
  title: "${h1Text} | Himalaya Villas & Resorts",
  description: "${descriptionText.replace(/"/g, '&quot;')}",
  path: "/${path.basename(baseDir)}/${newSlug}",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
`;
      fs.writeFileSync(layoutPath, layoutContent);
    }

    // Remove any existing export const metadata from page
    if (content.includes('export const metadata')) {
       content = content.replace(/export\s+const\s+metadata[\s\S]*?\}\);?/, '');
       fs.writeFileSync(pagePath, content);
    }

    // Rename directory if slug changed
    if (subDir !== newSlug) {
      const newDirPath = path.join(baseDir, newSlug);
      if (!fs.existsSync(newDirPath)) {
        fs.renameSync(dirPath, newDirPath);
      }
    }
  }
}

console.log("LINK MAP:");
console.log(JSON.stringify(linkMap, null, 2));

// Update events/page.tsx
const eventsPagePath = path.join(__dirname, 'app/events/page.tsx');
if (fs.existsSync(eventsPagePath)) {
  let eventsContent = fs.readFileSync(eventsPagePath, 'utf8');
  let changed = false;
  for (const [oldLink, newLink] of Object.entries(linkMap)) {
    if (oldLink !== newLink) {
      const search = `href: "${oldLink}"`;
      const replace = `href: "${newLink}"`;
      if (eventsContent.includes(search)) {
        eventsContent = eventsContent.replace(new RegExp(search, 'g'), replace);
        changed = true;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(eventsPagePath, eventsContent);
    console.log("Updated events/page.tsx with new links!");
  }
}

