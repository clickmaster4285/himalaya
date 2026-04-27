const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('app');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/title:\s*(?:["'`])([\s\S]*?)(?:["'`])/);
  const descMatch = content.match(/description:\s*(?:["'`])([\s\S]*?)(?:["'`])/);
  
  if (titleMatch || descMatch) {
    console.log(file);
    if (titleMatch) console.log("  T: " + titleMatch[1].replace(/\r?\n|\r/g, ""));
    if (descMatch) console.log("  D: " + descMatch[1].substring(0, 80).replace(/\r?\n|\r/g, "") + "...");
  }
});
