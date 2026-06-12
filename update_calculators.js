const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync('app').filter(d => d.includes('calculator') || d === 'refinancing-feasibility');

dirs.forEach(d => {
  const p = path.join('app', d, 'ClientPage.tsx');
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    let themeColor = 'emerald';
    const themeMatch = content.match(/themeColor="([a-z]+)"/);
    if (themeMatch) {
      themeColor = themeMatch[1];
    }

    // Match the entire wrapper opening + the gradient bar
    // e.g. <div className="w-full max-w-[500px] bg-gradient-to-b ... relative overflow-hidden">
    //        {/* Top decorative gradient bar */}
    //        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ..." />
    
    const regex = /(<div className="w-full max-w-\[5\d{2}px\].*?relative overflow-hidden">)\s*\{\/\*\s*Top decorative gradient bar\s*\*\/}\s*<div className="absolute top-0 inset-x-0 h-1\.5 bg-gradient-to-r[^"]+" \/>/s;
    
    const match = content.match(regex);
    if (match) {
      console.log('UPDATING:', d);
      let wrapperClasses = match[1];
      
      // Replace styling classes in the wrapper
      wrapperClasses = wrapperClasses.replace(
        /bg-gradient-to-b from-white via-white to-slate-50\/50 border border-slate-200\/60 rounded-\[32px\] p-8 shadow-\[.*?\] hover:shadow-\[.*?\]/,
        'bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden'
      );
      
      const newCornerDecoration = `
                {/* Signature Benchmark Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-${themeColor}-50 rounded-bl-full opacity-50 pointer-events-none" />`;
      
      content = content.replace(regex, wrapperClasses + newCornerDecoration);
      
      // ALSO standardize the input fields inside the calculator to match the pristine white style
      // Instead of bg-slate-50/80 we want pure white borders
      content = content.replace(/bg-slate-50\/80 border border-slate-200\/80/g, 'bg-white border border-slate-200 shadow-sm');
      content = content.replace(/bg-slate-50 border border-slate-200/g, 'bg-white border border-slate-200 shadow-sm');
      
      fs.writeFileSync(p, content, 'utf8');
    } else {
      console.log('NO MATCH:', d);
    }
  }
});
