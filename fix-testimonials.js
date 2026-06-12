const fs = require('fs');
const files = [
  'app/top-nepali-mortgage-broker-in-australia/ClientPage.tsx',
  'app/nepali-mortgage-broker-in-brisbane/ClientPage.tsx',
  'app/best-nepali-mortgage-broker-australia/ClientPage.tsx',
  'app/about-us-nepali-mortgage-broker-in-australia/ClientPage.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<TestimonialSection settings=\{settings\} \/>/g, '<TestimonialSection />');
    fs.writeFileSync(file, content);
    console.log('Fixed TestimonialSection prop in ' + file);
  }
});
