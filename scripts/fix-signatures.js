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
  if (!file.endsWith('ClientPage.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  if (!content.includes('pageSections?:')) {
    // Basic replacements for inline types
    const before = content;
    
    // Destructuring args
    content = content.replace('pageContent }:', 'pageContent, pageSections }:')
                     .replace('pageContent}:', 'pageContent, pageSections}:')
                     .replace('pageContent })', 'pageContent, pageSections })')
                     .replace('pageContent})', 'pageContent, pageSections})');

    // Type signature
    content = content.replace('pageContent?: string }', 'pageContent?: string; pageSections?: string[] }')
                     .replace('pageContent?: unknown }', 'pageContent?: unknown; pageSections?: string[] }')
                     .replace('pageContent?: any }', 'pageContent?: any; pageSections?: string[] }')
                     .replace('pageContent?: string;', 'pageContent?: string; pageSections?: string[];')
                     .replace('pageContent?: unknown;', 'pageContent?: unknown; pageSections?: string[];')
                     .replace('pageContent?: any;', 'pageContent?: any; pageSections?: string[];');

    if (content !== before) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Fixed:', file);
    }
  }
});
