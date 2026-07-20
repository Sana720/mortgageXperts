const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const scanPath = path.join(__dirname, '..', 'paragraphs_scan.json');

if (!fs.existsSync(scanPath)) {
  console.error('paragraphs_scan.json not found!');
  process.exit(1);
}

const scanData = JSON.parse(fs.readFileSync(scanPath, 'utf8'));

function updateAllSections() {
  console.log('--- STARTING ALL SECTIONS DYNAMIC SCRIPT ---');

  for (const item of scanData) {
    if (item.paragraphs.length === 0) continue;

    const relPath = item.file.replace(/\\\\/g, '/').replace(/\\/g, '/');
    let clientPath = path.join(appDir, relPath);
    if (clientPath.startsWith('/')) clientPath = path.join(appDir, relPath.substring(1));
    else clientPath = path.join(appDir, relPath);
    
    // Some fix for absolute paths vs relative paths
    clientPath = clientPath.replace(/app\/app\//, 'app/');

    let pagePath = clientPath.replace(/ClientPage\.tsx$/, 'page.tsx');

    if (!fs.existsSync(clientPath)) {
      // Try resolving directly without first slash
      clientPath = path.join(appDir, relPath.replace(/^[\/\\]/, ''));
      pagePath = clientPath.replace(/ClientPage\.tsx$/, 'page.tsx');
    }

    if (!fs.existsSync(clientPath)) {
      console.warn(`[WARN] Skipping ${item.file} because ClientPage.tsx does not exist at ${clientPath}`);
      continue;
    }

    let clientContent = fs.readFileSync(clientPath, 'utf8');

    // 1. Update ClientPage.tsx props
    if (!clientContent.includes('pageSections?: string[]') && !clientContent.includes('pageSections?:')) {
      // 1.1 Props destructuring
      if (!clientContent.includes('pageSections')) {
        clientContent = clientContent
          .replace(/pageContent \}:/g, 'pageContent, pageSections }:')
          .replace(/pageContent\}:/g, 'pageContent, pageSections}:')
          .replace(/pageContent \}\)/g, 'pageContent, pageSections })')
          .replace(/pageContent\}\)/g, 'pageContent, pageSections})');
      }

      // 1.2 Type definitions
      clientContent = clientContent
        .replace(/pageContent\?\s*:\s*string\s*\}/g, 'pageContent?: string; pageSections?: string[] }')
        .replace(/pageContent\?\s*:\s*unknown\s*\}/g, 'pageContent?: unknown; pageSections?: string[] }')
        .replace(/pageContent\?\s*:\s*any\s*\}/g, 'pageContent?: any; pageSections?: string[] }')
        .replace(/pageContent\?\s*:\s*string\s*;/g, 'pageContent?: string; pageSections?: string[];')
        .replace(/pageContent\?\s*:\s*unknown\s*;/g, 'pageContent?: unknown; pageSections?: string[];')
        .replace(/pageContent\?\s*:\s*any\s*;/g, 'pageContent?: any; pageSections?: string[];');
    }

    // 2. Replace each paragraph in ClientPage.tsx
    item.paragraphs.forEach((paragraph, index) => {
      const originalText = paragraph.text;
      const escapedOriginal = originalText
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape regex chars
        .replace(/\s+/g, '\\s+'); // match any whitespace spacing
        
      const originalRegex = new RegExp(escapedOriginal, 'g');
      
      if (clientContent.match(originalRegex)) {
        if (!clientContent.includes(`pageSections?.[${index}]`)) {
          const isAlreadyDynamic = clientContent.includes(`{pageContent ||`);
          
          if (isAlreadyDynamic && index === 0) {
            clientContent = clientContent.replace(
              new RegExp(`\\{pageContent \\|\\| ['"]${escapedOriginal}['"]\\}`, 'g'),
              `{pageSections?.[0] || pageContent || \`${originalText.replace(/`/g, '\\`')}\`}`
            );
            clientContent = clientContent.replace(
              new RegExp(`\\{pageContent \\|\\| \`${escapedOriginal}\`\\}`, 'g'),
              `{pageSections?.[0] || pageContent || \`${originalText.replace(/`/g, '\\`')}\`}`
            );
          } else {
            // Fix nested quotes by using backticks for the fallback string
            clientContent = clientContent.replace(
              originalRegex,
              `{pageSections?.[${index}] || \`${originalText.replace(/`/g, '\\`')}\`}`
            );
            // We also need to fix if it was already dynamic but not index 0
            clientContent = clientContent.replace(
              new RegExp(`\\{pageContent \\|\\| ['"]\\{pageSections\\?\\.\\[${index}\\] \\|\\| \`(.*?)\`\\}['"]\\}`, 'g'),
              `{pageSections?.[${index}] || \`$1\`}`
            );
          }
        }
      }
    });

    fs.writeFileSync(clientPath, clientContent, 'utf8');
    console.log(`[SUCCESS] Updated ClientPage.tsx for: ${item.file}`);

    // 3. Update page.tsx to extract pageSections
    if (fs.existsSync(pagePath)) {
      let pageContentLocal = fs.readFileSync(pagePath, 'utf8');
      
      if (!pageContentLocal.includes('pageSections')) {
        pageContentLocal = pageContentLocal.replace(
          /const\s*\{\s*settings,\s*pageHeroSettings,\s*pageContent\s*\}\s*=\s*await\s*loadPageData\(/g,
          'const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData('
        );
        
        pageContentLocal = pageContentLocal.replace(
          /pageContent=\{pageContent\}/g,
          'pageContent={pageContent} pageSections={pageSections}'
        );

        fs.writeFileSync(pagePath, pageContentLocal, 'utf8');
        console.log(`[SUCCESS] Updated page.tsx for: ${item.file}`);
      }
    }
  }

  console.log('--- COMPLETED ---');
}

updateAllSections();
