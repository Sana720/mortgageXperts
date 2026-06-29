const fs = require('fs');
const path = require('path');

const targetDirs = [
  'nepali-mortgage-broker-in-australia',
  'refinancing-a-loan',
  'investing-in-property-nepali-mortgage-broker',
  'home-guarantee-scheme',
  'no-deposit-home-loans',
  'self-employed-home-loans',
  'home-loan-for-nurses',
  'home-loan-for-accountants',
  'home-loan-for-doctors',
  'home-loan-with-visas'
];

targetDirs.forEach(dir => {
  const clientPagePath = path.join(__dirname, 'app', dir, 'ClientPage.tsx');
  const pagePath = path.join(__dirname, 'app', dir, 'page.tsx');
  const targetFile = fs.existsSync(clientPagePath) ? clientPagePath : fs.existsSync(pagePath) ? pagePath : null;

  if (!targetFile) {
    console.log(`${dir}: Not found`);
    return;
  }

  const content = fs.readFileSync(targetFile, 'utf8');
  
  // Find all sections or IDs in the file
  const ids = [];
  const idRegex = /id=["']([^"']+)["']/g;
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(match[1]);
  }

  console.log(`${dir} (${path.basename(targetFile)}):`);
  console.log(`  IDs: ${ids.join(', ')}`);
  console.log(`  Contains RoadmapSection: ${content.includes('RoadmapSection')}`);
});
