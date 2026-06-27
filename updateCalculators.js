const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const calculatorFolders = fs.readdirSync(appDir).filter(f => f.includes('calculator'));

calculatorFolders.forEach(folder => {
  const clientPagePath = path.join(appDir, folder, 'ClientPage.tsx');
  if (fs.existsSync(clientPagePath)) {
    let content = fs.readFileSync(clientPagePath, 'utf-8');
    
    // Add import if not exists
    if (!content.includes('RoadmapGuideCard')) {
      content = content.replace(
        'import { SubPageHero } from "../components/SubPageHero";',
        'import { SubPageHero } from "../components/SubPageHero";\nimport { RoadmapGuideCard } from "../components/RoadmapGuideCard";'
      );
    }

    // Use regex to replace the Guide section
    const guideRegex = /\{\/\*\s*(?:GUIDE DOWNLOAD CARD|ROADMAP \/ GUIDE DOWNLOAD SECTION)\s*\*\/\}\s*<section[\s\S]*?<\/section>/;
    
    const replacement = `{/* GUIDE DOWNLOAD CARD */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <RoadmapGuideCard />
        </div>
      </section>`;

    content = content.replace(guideRegex, replacement);

    fs.writeFileSync(clientPagePath, content, 'utf-8');
    console.log('Updated', folder);
  }
});
