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
  
  if (fs.existsSync(clientPagePath)) {
    const content = fs.readFileSync(clientPagePath, 'utf8');
    console.log(`${dir}: ClientPage.tsx exists, has SubPageHero: ${content.includes('SubPageHero')}`);
  } else if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf8');
    console.log(`${dir}: page.tsx exists, has SubPageHero: ${content.includes('SubPageHero')}`);
  } else {
    console.log(`${dir}: Neither file exists`);
  }
});
