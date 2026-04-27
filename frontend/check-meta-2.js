const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('page.tsx') || file.endsWith('layout.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('app');
const metas = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  
  if (titleMatch || descMatch) {
    metas.push({
      file: file.replace(/\\/g, '/'),
      title: titleMatch ? titleMatch[1] : null,
      description: descMatch ? descMatch[1] : null
    });
  }
});

const dupTitles = {};
const dupDescs = {};

metas.forEach(m => {
  if (m.title) {
    if (!dupTitles[m.title]) dupTitles[m.title] = [];
    dupTitles[m.title].push(m.file);
  }
  if (m.description) {
    if (!dupDescs[m.description]) dupDescs[m.description] = [];
    dupDescs[m.description].push(m.file);
  }
});

console.log('--- Duplicate Titles ---');
for (const [title, files] of Object.entries(dupTitles)) {
  if (files.length > 1) {
    console.log(`\nTitle: "${title}"`);
    files.forEach(f => console.log(`  - ${f}`));
  }
}

console.log('\n--- Duplicate Descriptions ---');
for (const [desc, files] of Object.entries(dupDescs)) {
  if (files.length > 1) {
    console.log(`\nDescription: "${desc}"`);
    files.forEach(f => console.log(`  - ${f}`));
  }
}
