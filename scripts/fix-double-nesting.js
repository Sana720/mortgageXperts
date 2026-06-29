const fs = require('fs');
const path = require('path');

const targetDirs = [
  'cash-rate-change-calculator',
  'deposit-calculator',
  'equity-calculator',
  'extra-repayment-calculator',
  'home-guarantee-scheme',
  'home-loan-for-accountants',
  'home-loan-for-doctors',
  'home-loan-for-nurses',
  'home-loan-with-visas',
  'investing-in-property-nepali-mortgage-broker',
  'lmi-calculator',
  'loan-comparison-calculator',
  'no-deposit-home-loans-in-australia',
  'refinancing-a-loan',
  'rent-yield-calculators',
  'self-employed-home-loans',
  'ytd-calculator'
];

const appDir = path.join(__dirname, '..', 'app');

targetDirs.forEach(dir => {
  const clientPath = path.join(appDir, dir, 'ClientPage.tsx');
  if (fs.existsSync(clientPath)) {
    let content = fs.readFileSync(clientPath, 'utf8');
    
    // Replace: {pageContent || "{pageContent || "CONTENT"}"} with {pageContent || "CONTENT"}
    const regex = /\{pageContent\s*\|\|\s*["']\{pageContent\s*\|\|\s*(['"])(.*?)\1\}["']\}/g;
    
    if (content.match(regex)) {
      content = content.replace(regex, (match, quote, innerText) => {
        return `{pageContent || "${innerText}"}`;
      });
      fs.writeFileSync(clientPath, content, 'utf8');
      console.log(`[FIXED] Cleaned nesting in: ${dir}`);
    } else {
      console.log(`[SKIP] No nested pattern matched in: ${dir}`);
    }
  } else {
    console.warn(`[WARN] File not found: ${clientPath}`);
  }
});
