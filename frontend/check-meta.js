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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
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
  // Simple regex for 'title: "..."'
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  
  if (titleMatch || descMatch) {
    metas.push({
      file: file,
      title: titleMatch ? titleMatch[1] : 'NO_TITLE',
      description: descMatch ? descMatch[1] : 'NO_DESC'
    });
  }
});

const duplicates = {};
metas.forEach(m => {
  const key = m.title + '|' + m.description;
  if (!duplicates[key]) {
    duplicates[key] = [];
  }
  duplicates[key].push(m.file);
});

console.log('--- Duplicate Meta Tags ---');
let hasDup = false;
for (const [key, files] of Object.entries(duplicates)) {
  if (files.length > 1) {
    hasDup = true;
    console.log('\nTitle: ' + key.split('|')[0]);
    console.log('Description: ' + key.split('|')[1]);
    console.log('Files (' + files.length + '):');
    files.forEach(f => console.log('  - ' + f));
  }
}
if (!hasDup) console.log('No exact duplicates found.');
