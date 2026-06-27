const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

const filesToUpdate = [
  'loan-comparison-calculator/ClientPage.tsx',
  'loan-repayment-calculator/ClientPage.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(appDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Add import if missing
    if (!content.includes('RoadmapGuideCard')) {
      content = content.replace(
        'import { SubPageHero } from "../components/SubPageHero";',
        'import { SubPageHero } from "../components/SubPageHero";\nimport { RoadmapGuideCard } from "../components/RoadmapGuideCard";'
      );
    }

    if (file.includes('loan-comparison-calculator')) {
      // Find the specific section for loan-comparison-calculator
      const comparisonRegex = /\{\/\*\s*MID-PAGE CONTEXT ENQUIRY SECTION\s*\*\/\}\s*<section[\s\S]*?<\/section>/;
      
      const replacement = `{/* GUIDE DOWNLOAD CARD */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <RoadmapGuideCard />
        </div>
      </section>`;

      content = content.replace(comparisonRegex, replacement);
    } else if (file.includes('loan-repayment-calculator')) {
      // Find the specific section for loan-repayment-calculator
      const repaymentRegex = /\{\/\*\s*ROADMAP \/ GUIDE DOWNLOAD SECTION.*?<section[\s\S]*?<\/section>/;
      
      const replacement = `{/* GUIDE DOWNLOAD CARD */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <RoadmapGuideCard />
        </div>
      </section>`;

      content = content.replace(repaymentRegex, replacement);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});
