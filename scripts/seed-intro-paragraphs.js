const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Helper to load env variables manually from .env
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    });
  }
}

async function seed() {
  loadEnv();
  console.log('Connecting to database:', process.env.DB_NAME || 'mortgage_xperts');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mortgage_xperts',
    port: parseInt(process.env.DB_PORT || '3306'),
  });

  // Ensure table exists
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS page_content (
      page_path VARCHAR(191) PRIMARY KEY,
      content LONGTEXT NOT NULL
    )
  `);

  const introParagraphs = [
    [
      '/',
      'At Mortgage Xperts, we simplify the complex home loan journey. We compare over 40 leading lenders and find the most competitive rates, low-deposit schemes, and government grants tailored for you.'
    ],
    [
      '/nepali-mortgage-broker-in-australia',
      'For many Australians, buying a first home is a dream that quickly becomes overwhelming. Once you start dealing with complex terms, restrictive lender buffers, and dense regulatory requirements, it is easy to get lost.'
    ],
    [
      '/home-loan-for-nurses',
      'Many lenders offer home loan discounts and perks specifically to nurses, due to the steady income and job security their profession provides. These benefits make it easier and more affordable to buy your home.'
    ],
    [
      '/home-loan-for-doctors',
      'Medical careers represent the lowest risk class for Australian banks. Enjoy premium loan package enhancements, including up to 95% LVR with zero LMI and heavily discounted interest rates.'
    ],
    [
      '/home-loan-for-accountants',
      'Accountants and financial professionals often have access to waived LMI, discounted interest rates, and flexible lending policies because banks recognize their stable earnings and financial responsibility.'
    ],
    [
      '/home-guarantee-scheme',
      'If saving for a 20% deposit feels like a never-ending struggle, the First Home Guarantee (FHBG) scheme backed by the Australian Government can help you buy your home with just a 5% deposit.'
    ],
    [
      '/no-deposit-home-loans-in-australia',
      'Stop renting and start owning. By utilizing family guarantor loans, first-home buyer schemes, and specialty lenders, you can purchase a home with a minimal deposit or even zero cash out-of-pocket.'
    ],
    [
      '/home-loan-with-visas',
      'Buying property in Australia as a temporary visa holder or non-resident can be complex. We verify your visa class policies, review overseas credit criteria, and ensure FIRB submissions are filed correctly.'
    ],
    [
      '/non-resident-home-loans',
      'Buying property in Australia as a temporary visa holder or non-resident can be complex. We verify your visa class policies, review overseas credit criteria, and ensure FIRB submissions are filed correctly.'
    ],
    [
      '/refinancing-a-loan',
      'Refinancing your home loan is like upgrading to a better utility plan. If your mortgage is more than two years old, we can help you switch lenders to save thousands in interest and fees annually.'
    ],
    [
      '/self-employed-home-loans',
      'Getting a home loan can be different when you\'re self-employed. With our low-doc and alt-doc lending options, you can secure the finance you need using alternative proof of income.'
    ],
    [
      '/investing-in-property-nepali-mortgage-broker',
      'Investing in property is one of the most effective ways for Australians to grow long-term wealth. When structured properly, a property portfolio provides both capital growth and consistent rental cash flow.'
    ],
    [
      '/loan-repayment-calculator',
      'Estimate your weekly, fortnightly, or monthly home loan repayments. See how interest accumulates and discover how extra repayments could help you save thousands and pay off your mortgage sooner.'
    ],
    [
      '/loan-comparison-calculator',
      'Evaluating different interest rates, loan terms, and repayment frequencies enables you to pick the best home loan product. Analyze Loan 1 and Loan 2 directly to review payment differences and total interest savings.'
    ],
    [
      '/rent-yield-calculators',
      'Rental yield is a key metric used by smart property investors to evaluate the cash flow performance of real estate. Use this calculator to compare gross and net yields for any Australian property.'
    ],
    [
      '/equity-calculator',
      'Your home is one of your greatest assets. Over time, principal repayments and market growth build equity. Use this calculator to figure out your usable equity to buy an investment property, renovate, or consolidate debts.'
    ],
    [
      '/stamp-duty-calculator',
      'Stamp duty (transfer duty tax) on properties is calculated on standard government brackets. Concessions exist to help first home buyers purchase homes with up to 100% discounts on transfer duty.'
    ],
    [
      '/stamp-duty-calculator/stamp-duty-calculator',
      'Stamp duty (transfer duty tax) on properties is calculated on standard government brackets. Concessions exist to help first home buyers purchase homes with up to 100% discounts on transfer duty.'
    ],
    [
      '/stamp-duty-calculator/stamp-duty-in-nsw',
      'Model transfer duty fees, registration costs, and grants in New South Wales. Check if you qualify for the FHBAS exemption up to $800,000.'
    ],
    [
      '/deposit-calculator',
      'Calculate how compound interest and regular savings grow your home deposit over time. Build a realistic plan to unlock home ownership and compare savings frequencies.'
    ],
    [
      '/extra-repayment-calculator',
      'Mortgage interest compounding can be tackled by paying extra amounts weekly, fortnightly, or monthly. Input your current terms and see how much interest and time you will save.'
    ],
    [
      '/lmi-calculator',
      'Borrowing more than 80% of a property\'s value generally triggers Lenders Mortgage Insurance (LMI). Use our calculator to evaluate your ratios and projected premiums.'
    ],
    [
      '/cash-rate-change-calculator',
      'Whenever the Reserve Bank of Australia (RBA) adjusts the official cash rate, lenders typically pass this change onto variable rate home loans. Use this calculator to model how much your repayment will rise or fall.'
    ],
    [
      '/ytd-calculator',
      'Annualising Year-to-Date (YTD) income is the standard method used by Australian banks to assess casual, part-time, and self-employed applicants. Use this tool to predict your lender-assessable income.'
    ],
    [
      '/branches/adelaide',
      'Adelaide is one of Australia\'s fastest-growing and most affordable capital cities. Our local mortgage brokers have deep knowledge of the Adelaide market, helping you secure the right home loan.'
    ],
    [
      '/branches/brisbane',
      'Brisbane is booming ahead of the 2032 Olympics. Our local Brisbane brokers are embedded in the Queensland market, helping buyers and investors capitalize on QLD\'s incredible growth story.'
    ],
    [
      '/branches/melbourne',
      'Melbourne\'s diverse property market requires local expertise. From first-home buyers in the outer suburbs to inner-city investors, our Melbourne brokers customize your loan to fit your budget.'
    ],
    [
      '/branches/perth',
      'Perth has recorded some of Australia\'s strongest property price growth in recent years. Our local brokers understand WA\'s unique lending landscape and how to fast-track your approval.'
    ],
    [
      '/branches/sydney',
      'Sydney\'s property market is highly competitive. Our local Sydney-based mortgage brokers compare 40+ lenders to locate the best interest rate, government grants, and loan structures for you.'
    ],
    [
      '/about-us-nepali-mortgage-broker-in-australia',
      'We are Australia\'s leading Nepali-owned mortgage brokerage, committed to helping the community achieve homeownership through transparent advice, bilingual support, and access to 40+ lenders.'
    ],
    [
      '/our-team',
      'Our team of licensed, bilingual mortgage brokers brings years of experience helping Australian families and the Nepali community navigate the home loan journey.'
    ],
    [
      '/first-home-guide',
      'Everything a first home buyer needs to know — from government grants and deposit schemes to choosing the right loan type and navigating the settlement process.'
    ],
    [
      '/free-resources',
      'Download guides, use our free calculators, and access expert checklists to help you make smarter property and mortgage decisions at every stage.'
    ]
  ];

  for (const [path, content] of introParagraphs) {
    await connection.execute(
      'INSERT INTO page_content (page_path, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = VALUES(content)',
      [path, content]
    );
    console.log(`Seeded intro paragraph for: ${path}`);
  }

  await connection.end();
  console.log('Seeding completed successfully!');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
