const fs = require('fs');

const files = [
  'app/refinancing-feasibility/ClientPage.tsx',
  'app/lmi-calculator/ClientPage.tsx',
  'app/extra-repayment-calculator/ClientPage.tsx',
  'app/borrowing-power-calculator/ClientPage.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace all instances of ${themeColor} with blue
    content = content.replace(/\$\{themeColor\}/g, 'blue');
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
