const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(path.join(__dirname, '..', 'app'), (file) => {
  if (!file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  // Fix {pageContent || "{pageSections?.[x] || ...}"}
  const regex1 = /\{pageContent\s*\|\|\s*["']\{pageSections\?\u002E\[(\d+)\]\s*\|\|\s*["'](.*?)["']\}["']\}/g;
  if (regex1.test(content)) {
    content = content.replace(regex1, '{pageSections?.[$1] || pageContent || "$2"}');
    updated = true;
  }
  
  // Fix {pageContent || `{pageSections?.[x] || ...}`}
  const regex2 = /\{pageContent\s*\|\|\s*\`\{pageSections\?\u002E\[(\d+)\]\s*\|\|\s*["'](.*?)["']\}\`\}/g;
  if (regex2.test(content)) {
    content = content.replace(regex2, '{pageSections?.[$1] || pageContent || "$2"}');
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', file);
  }
});
