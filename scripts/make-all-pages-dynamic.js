const fs = require('fs');
const path = require('path');

const targets = [
  {
    dir: 'cash-rate-change-calculator',
    original: 'Whenever the Reserve Bank of Australia (RBA) adjusts the official cash rate, lenders typically pass this change onto variable rate home loans. Use this calculator to model how much your repayment will rise or fall.'
  },
  {
    dir: 'deposit-calculator',
    original: 'Calculate how compound interest and regular savings grow your home deposit over time. Build a realistic plan to unlock home ownership and compare savings frequencies.'
  },
  {
    dir: 'equity-calculator',
    original: 'Your home is one of your greatest assets. Over time, principal repayments and market growth build equity. Use this calculator to figure out your usable equity to buy an investment property, renovate, or consolidate debts.'
  },
  {
    dir: 'extra-repayment-calculator',
    original: 'Mortgage interest compounding can be tackled by paying extra amounts weekly, fortnightly, or monthly. Input your current terms and see how much interest and time you will save.'
  },
  {
    dir: 'home-guarantee-scheme',
    original: 'If saving for a 20% deposit has felt like a never-ending struggle, you’re not alone. That’s why the First Home Guarantee (FHBG), backed by the Australian Government and administered by Housing Australia, could be your breakthrough into the property market. Under the guarantee, the government steps in to guarantee the difference between your 5% deposit and the standard 20% deposit.'
  },
  {
    dir: 'home-loan-for-accountants',
    original: 'Accountants often have access to special home loan offers because lenders recognise their stable income, financial knowledge, and responsible money management. These benefits can include waived Lenders Mortgage Insurance (LMI), special interest rates, and flexible lending policies.'
  },
  {
    dir: 'home-loan-for-doctors',
    original: 'Medical careers represent the lowest risk class for Australian banks. Enjoy these premium loan package enhancements:'
  },
  {
    dir: 'home-loan-for-nurses',
    original: 'Many lenders offer home loan discounts and perks specifically to nurses, due to the steady income and job security their profession provides. These benefits make it easier and more affordable to buy your home.'
  },
  {
    dir: 'home-loan-with-visas',
    original: 'A non-resident home loan is designed for people living overseas or those who don’t hold Australian citizenship or permanent residency. This includes foreign nationals, temporary visa holders, and Australians living abroad. Since lenders view non-residents as higher-risk borrowers, they apply stricter criteria, including more documentation and often larger deposits than regular home loans.'
  },
  {
    dir: 'investing-in-property-nepali-mortgage-broker',
    original: 'Investing in property is one of the most effective ways for Australians to grow their wealth over time. When structured properly, a property portfolio provides double-sided growth: long-term asset value appreciation alongside consistent rental cash flows.'
  },
  {
    dir: 'lmi-calculator',
    original: 'Borrowing more than 80% of a property\'s value generally triggers Lenders Mortgage Insurance (LMI). Use our calculator to evaluate your ratios and projected premiums.'
  },
  {
    dir: 'loan-comparison-calculator',
    original: 'Evaluating different interest rates, loan terms, and repayment frequencies enables you to pick the best home loan product. Analyze Loan 1 and Loan 2 directly to review payment differences and total interest savings.'
  },
  {
    dir: 'no-deposit-home-loans-in-australia',
    original: 'Saving for a full 20% deposit in Australia\'s current market can take years, all while property values and rents continue to rise. Fortunately, you don\'t necessarily need a massive cash stockpile to purchase your home.'
  },
  {
    dir: 'refinancing-a-loan',
    original: 'Refinancing your home loan is like upgrading your car or utility bill to a better rate without changing address. If your mortgage is more than two years old, or your financial position has changed, you could be paying a large interest premium to your bank. Here\'s how we help you switch lenders to save.'
  },
  {
    dir: 'rent-yield-calculators',
    original: 'Rental yield is a key metric used by smart property investors to evaluate the cash flow performance of real estate. Use this calculator to compare gross and net yields for any Australian property.'
  },
  {
    dir: 'self-employed-home-loans',
    original: 'Getting a home loan can be a bit different if you’re self-employed, but with the right preparation, it’s definitely possible to secure the finance you need. Understanding what lenders require and how they assess your income will help you approach the process confidently.'
  },
  {
    dir: 'stamp-duty-calculator',
    original: 'Stamp duty (transfer duty tax) on {stateCode} properties is calculated on standard government brackets. Concessions exist to help first home buyers purchase homes with up to 100% discounts on transfer duty.',
    customReplacement: '{pageContent || `Stamp duty (transfer duty tax) on ${stateCode} properties is calculated on standard government brackets. Concessions exist to help first home buyers purchase homes with up to 100% discounts on transfer duty.`}'
  },
  {
    dir: 'ytd-calculator',
    original: 'Annualising Year-to-Date (YTD) income is the standard method used by Australian banks to assess casual, part-time, and self-employed applicants. Use this tool to predict your lender-assessable income.'
  }
];

const appDir = path.join(__dirname, '..', 'app');

function makePagesDynamic() {
  console.log('--- STARTING ALL PAGES DYNAMIC SCRIPT ---');

  for (const target of targets) {
    const pagePath = path.join(appDir, target.dir, 'page.tsx');
    const clientPath = path.join(appDir, target.dir, 'ClientPage.tsx');

    if (!fs.existsSync(pagePath) || !fs.existsSync(clientPath)) {
      console.warn(`[WARN] Skipping ${target.dir} because page.tsx or ClientPage.tsx does not exist.`);
      continue;
    }

    // 1. Update page.tsx
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // Check if pageContent is already destructured
    if (!pageContent.includes('pageContent')) {
      // replace destructured loader return values
      pageContent = pageContent.replace(
        /const\s*\{\s*settings,\s*pageHeroSettings\s*\}\s*=\s*await\s*loadPageData\(/g,
        'const { settings, pageHeroSettings, pageContent } = await loadPageData('
      );
      
      // pass to ClientPage
      pageContent = pageContent.replace(
        /<ClientPage\s+settings=\{settings\}\s+pageHeroSettings=\{pageHeroSettings\}/g,
        '<ClientPage settings={settings} pageHeroSettings={pageHeroSettings} pageContent={pageContent}'
      );
      pageContent = pageContent.replace(
        /<ClientPage\s+pageHeroSettings=\{pageHeroSettings\}\s+settings=\{settings\}/g,
        '<ClientPage pageHeroSettings={pageHeroSettings} settings={settings} pageContent={pageContent}'
      );

      fs.writeFileSync(pagePath, pageContent, 'utf8');
      console.log(`[SUCCESS] Updated page.tsx for: ${target.dir}`);
    } else {
      console.log(`[INFO] pageContent already present in page.tsx for: ${target.dir}`);
    }

    // 2. Update ClientPage.tsx
    let clientContent = fs.readFileSync(clientPath, 'utf8');
    
    // Add pageContent property to parameter signature if not already present
    if (!clientContent.includes('pageContent?: string') && !clientContent.includes('pageContent?:string')) {
      // Find the first export function ClientPage or function ClientPage
      clientContent = clientContent.replace(
        /export\s+function\s+ClientPage\s*\(\s*\{\s*settings\s*=\s*\{\}\s*,\s*pageHeroSettings\s*\}\s*:\s*\{\s*settings\?\s*:\s*Record<string,\s*string>\s*;\s*pageHeroSettings\?\s*:\s*PageHeroSettings\s*\}\)/g,
        'export function ClientPage({ settings = {}, pageHeroSettings, pageContent }: { settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string })'
      );
      clientContent = clientContent.replace(
        /export\s+function\s+ClientPage\s*\(\s*\{\s*settings\s*,\s*pageHeroSettings\s*\}\s*:\s*ClientPageProps\s*\)/g,
        'export function ClientPage({ settings, pageHeroSettings, pageContent }: ClientPageProps)'
      );
      clientContent = clientContent.replace(
        /export\s+function\s+ClientPage\s*\(\s*\{\s*settings\s*=\s*\{\}\s*,\s*pageHeroSettings\s*\}\s*:\s*ClientPageProps\s*\)/g,
        'export function ClientPage({ settings = {}, pageHeroSettings, pageContent }: ClientPageProps)'
      );
      // Wait, look at target interfaces or props definition
      clientContent = clientContent.replace(
        /interface\s+ClientPageProps\s*\{([\s\S]*?)\}/,
        (match, p1) => {
          if (!p1.includes('pageContent')) {
            return `interface ClientPageProps {${p1}  pageContent?: string;\n}`;
          }
          return match;
        }
      );
    }

    // Replace target paragraph with dynamic equivalent
    const escapedOriginal = target.original
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape regex chars
      .replace(/\s+/g, '\\s+'); // match any whitespace spacing
    
    const originalRegex = new RegExp(escapedOriginal, 'g');
    
    if (clientContent.match(originalRegex)) {
      const replacement = target.customReplacement || `{pageContent || "${target.original}"}`;
      clientContent = clientContent.replace(originalRegex, replacement);
      fs.writeFileSync(clientPath, clientContent, 'utf8');
      console.log(`[SUCCESS] Replaced intro paragraph in ClientPage.tsx for: ${target.dir}`);
    } else {
      // Let's check if the replacement is already done
      if (clientContent.includes('pageContent ||')) {
        console.log(`[INFO] Already dynamic in ClientPage.tsx for: ${target.dir}`);
      } else {
        console.warn(`[WARN] Could not find original text in ClientPage.tsx for: ${target.dir}`);
      }
    }
  }

  // 3. Update branches/[city] route
  const branchPagePath = path.join(appDir, 'branches', '[city]', 'page.tsx');
  const branchClientPath = path.join(appDir, 'branches', '[city]', 'ClientPage.tsx');

  if (fs.existsSync(branchPagePath) && fs.existsSync(branchClientPath)) {
    // page.tsx
    let bpContent = fs.readFileSync(branchPagePath, 'utf8');
    if (!bpContent.includes('pageContent')) {
      bpContent = bpContent.replace(
        /const\s*\{\s*settings,\s*pageHeroSettings\s*\}\s*=\s*await\s*loadPageData\(/g,
        'const { settings, pageHeroSettings, pageContent } = await loadPageData('
      );
      bpContent = bpContent.replace(
        /<BranchClientPage\s+cityData=\{cityData\}\s+settings=\{settings\}\s+pageHeroSettings=\{pageHeroSettings\}/g,
        '<BranchClientPage cityData={cityData} settings={settings} pageHeroSettings={pageHeroSettings} pageContent={pageContent}'
      );
      fs.writeFileSync(branchPagePath, bpContent, 'utf8');
      console.log(`[SUCCESS] Updated branch page.tsx`);
    }

    // ClientPage.tsx
    let bcContent = fs.readFileSync(branchClientPath, 'utf8');
    if (!bcContent.includes('pageContent?: string') && !bcContent.includes('pageContent?:string')) {
      bcContent = bcContent.replace(
        /export\s+default\s+function\s+BranchClientPage\s*\(\s*\{\s*cityData\s*,\s*settings\s*=\s*\{\}\s*,\s*pageHeroSettings\s*,\s*\}\s*:\s*\{\s*cityData\s*:\s*CityData\s*;\s*settings\?\s*:\s*Record<string,\s*string>\s*;\s*pageHeroSettings\?\s*:\s*PageHeroSettings\s*;\s*\}\)/g,
        'export default function BranchClientPage({ cityData, settings = {}, pageHeroSettings, pageContent }: { cityData: CityData; settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string })'
      );
      bcContent = bcContent.replace(
        /export\s+default\s+function\s+BranchClientPage\s*\(\s*\{\s*cityData\s*,\s*settings\s*=\s*\{\}\s*,\s*pageHeroSettings\s*\}/g,
        'export default function BranchClientPage({ cityData, settings = {}, pageHeroSettings, pageContent }'
      );
      bcContent = bcContent.replace(
        /cityData\s*:\s*CityData\s*;\s*settings\?\s*:\s*Record<string,\s*string>\s*;\s*pageHeroSettings\?\s*:\s*PageHeroSettings\s*;/g,
        'cityData: CityData; settings?: Record<string, string>; pageHeroSettings?: PageHeroSettings; pageContent?: string;'
      );
    }
    if (!bcContent.includes('pageContent || cityData.description')) {
      bcContent = bcContent.replace(
        /const\s+subtextText\s*=\s*pageHeroSettings\?\.hero_subtext\s*\|\|\s*cityData\.description;/g,
        'const subtextText = pageHeroSettings?.hero_subtext || pageContent || cityData.description;'
      );
      fs.writeFileSync(branchClientPath, bcContent, 'utf8');
      console.log(`[SUCCESS] Updated branch ClientPage.tsx to use pageContent`);
    }
  }

  console.log('--- ALL PAGES DYNAMIC SCRIPT COMPLETED ---');
}

makePagesDynamic();
