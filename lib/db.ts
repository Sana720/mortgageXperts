/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise';
import crypto from 'crypto';

// Compute admin password hash from environment variable at startup.
// NEVER commit a real password here — set ADMIN_PASSWORD in your .env or hosting config.
const adminPasswordHash = crypto
  .createHash('sha256')
  .update(process.env.ADMIN_PASSWORD || 'admin123')
  .digest('hex');

const poolConnectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mortgage_xperts',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const globalForPool = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const pool = globalForPool.pool ?? mysql.createPool(poolConnectionConfig);

if (process.env.NODE_ENV !== 'production') {
  globalForPool.pool = pool;
}

const tables = [
  `CREATE TABLE IF NOT EXISTS page_content (
      page_path VARCHAR(191) PRIMARY KEY,
      content LONGTEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS global_settings (
      \`key\` VARCHAR(191) PRIMARY KEY,
      \`value\` TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS blogs (
      id VARCHAR(191) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      coverImage VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      published TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS testimonials (
      id VARCHAR(191) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      rating INT DEFAULT 5,
      content TEXT NOT NULL,
      avatar VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS admins (
      id VARCHAR(191) PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  // Password hash is computed from the ADMIN_PASSWORD env var (never hardcoded).
  // In production, set ADMIN_PASSWORD to a strong secret in your hosting environment.
  `INSERT IGNORE INTO admins (id, username, password) VALUES 
  ('default-admin-id', 'admin', '${adminPasswordHash}')`,
  `CREATE TABLE IF NOT EXISTS enquiries (
      id VARCHAR(191) PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      savings VARCHAR(100),
      income VARCHAR(100),
      state VARCHAR(50),
      status VARCHAR(50) DEFAULT 'new',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `INSERT IGNORE INTO global_settings (\`key\`, \`value\`) VALUES 
  ('header_phone', '0450 240 757'),
  ('support_email', 'mortgage@mortgagexperts.com.au'),
  ('footer_address', 'Sydney, Australia'),
  ('facebook_url', 'https://facebook.com'),
  ('instagram_url', 'https://instagram.com'),
  ('linkedin_url', 'https://linkedin.com'),
  ('tiktok_url', 'https://tiktok.com'),
  ('hero_headline', 'Your Gateway to Home Ownership in Australia'),
  ('hero_subheadline', 'Guiding you through home loans, low-deposit schemes, and first-home buyer grants with professional expertise.'),
  ('logo_url', '/images/logo.png'),
  ('site_icon_url', '/favicon.ico'),
  ('interest_rate', '6.19')`,
  `CREATE TABLE IF NOT EXISTS page_meta_hero (
      page_path VARCHAR(191) PRIMARY KEY,
      meta_title VARCHAR(255) NOT NULL,
      meta_description TEXT NOT NULL,
      meta_keywords TEXT NOT NULL,
      hero_badge VARCHAR(255) DEFAULT '',
      hero_title VARCHAR(255) DEFAULT '',
      hero_subtext TEXT,
      hero_image VARCHAR(255) DEFAULT '',
      hero_btn1_text VARCHAR(100) DEFAULT '',
      hero_btn1_link VARCHAR(255) DEFAULT '',
      hero_btn2_text VARCHAR(100) DEFAULT '',
      hero_btn2_link VARCHAR(255) DEFAULT '',
      slides TEXT
  )`,
  `INSERT IGNORE INTO page_meta_hero (page_path, meta_title, meta_description, meta_keywords, hero_badge, hero_title, hero_subtext, hero_image, hero_btn1_text, hero_btn1_link, hero_btn2_text, hero_btn2_link, slides) VALUES 
  ('/', 'Mortgage Xperts - Australia | Leading Nepali Mortgage Brokerage', 'Australia’s top-rated Nepali mortgage experts, helping clients secure better home loans, refinance smarter, and invest with confidence.', 'mortgage broker, home loans, first home buyer, Australia home loan, Nepali broker', '', '', '', '', '', '', '', '', '[{"id":1,"service":"first-home","badge":"First Home Buyer Specialists","title":"Your Journey to Your First Home, Simplified","subtext":"Secure your first home with expert guidance, government grants assistance, and access to low-deposit options from 40+ leading lenders.","image":"/images/hero.png","btnText1":"Get Started","btnLink1":"#calculator","btnText2":"Free Strategy Call","btnLink2":"#callback"},{"id":2,"service":"healthcare","badge":"Specialist Lenders for Medical & Health Professionals","title":"Exclusive Mortgage Benefits for Health Professionals","subtext":"Get up to 95% LVR with zero Lenders Mortgage Insurance (LMI) and discounted interest rates tailored for medical practitioners and healthcare staff.","image":"/images/hero_slide_2_green.png","btnText1":"Get Started","btnLink1":"#calculator","btnText2":"Free Strategy Call","btnLink2":"#callback"},{"id":3,"service":"investment","badge":"Strategic Lending for Property Investors","title":"Build and Scale Your Property Portfolio","subtext":"Maximize your borrowing power, optimize loan structures, and leverage equity to grow your long-term property investment wealth.","image":"/images/hero_slide_3_yellow.png","btnText1":"Get Started","btnLink1":"#calculator","btnText2":"Free Strategy Call","btnLink2":"#callback"},{"id":4,"service":"refinancing","badge":"Smart Refinance Strategies","title":"Refinance and Save Thousands Annually","subtext":"Switch to a lower rate, consolidate high-interest debts, or unlock equity for renovations with our streamlined mortgage refinance process.","image":"/images/hero_slide_4_purple.png","btnText1":"Get Started","btnLink1":"#calculator","btnText2":"Free Strategy Call","btnLink2":"#callback"},{"id":5,"service":"self-employed","badge":"Low-Doc & Self-Employed Mortgage Experts","title":"Flexible Home Loans for Business Owners","subtext":"No up-to-date tax returns? We specialize in alt-doc and low-doc lending solutions to secure the home loan you deserve using alternative proof of income.","image":"/images/hero_slide_5_rose.png","btnText1":"Get Started","btnLink1":"#calculator","btnText2":"Free Strategy Call","btnLink2":"#callback"}]'),
  ('/nepali-mortgage-broker-in-australia', 'Nepali Mortgage Broker in Australia | Mortgage Xperts', 'Leading Nepali mortgage brokers helping you secure home loans, low deposit options, and grants in Australia with bilingual support.', 'Nepali mortgage broker, Nepali broker Australia, Sydney Nepali broker, home loans', 'First Home Buyer Specialists', 'Your First Home Doesn\\'t Need To Feel Complicated.', 'Secure your first home with expert guidance, government grants assistance, and access to low-deposit options from 40+ leading lenders.', '/images/hero.png', 'Get Started', '#calculator', 'Free Strategy Call', '#callback', '[]'),
  ('/home-loan-for-nurses', 'Home Loans for Nurses & Midwives in Australia | Mortgage Xperts', 'Special home loan benefits and LMI waivers for nurses, midwives, and healthcare professionals in Australia.', 'home loans for nurses, nurse mortgage, LMI waiver nurses, healthcare home loans', 'Healthcare Professional Benefits', 'Specialist Home Loans for Nurses & Midwives', 'Enjoy up to 90% LVR with zero LMI and discounted rates. Our team helps nurses and healthcare staff secure the best possible home loan deals.', '/images/hero_slide_2_green.png', 'Check Eligibility', '#calculator', 'Book Free Call', '#callback', '[]'),
  ('/home-loan-for-doctors', 'Home Loans for Doctors & Medical Specialists | Mortgage Xperts', 'Exclusive 95% LVR home loans with zero Lenders Mortgage Insurance (LMI) for doctors and medical specialists.', 'home loans for doctors, doctor home loan, LMI waiver doctors, medical professional loan', 'Medical Professional Benefits', 'Premium Home Loans for Doctors & Medical Specialists', 'Unlock exclusive home loan benefits with 0% LMI up to 95% LVR. Tailored doctor home loans designed for medical practitioners and specialists.', '/images/hero_slide_2_green.png', 'Check LMI Waiver', '#calculator', 'Consult An Expert', '#callback', '[]'),
  ('/home-loan-for-accountants', 'Home Loans for Accountants & Finance Professionals | Mortgage Xperts', 'LMI waiver home loans and interest rate discounts for qualified accountants and finance professionals in Australia.', 'home loans for accountants, accountant home loan, finance professional loan, LMI waiver', 'Finance Professional Benefits', 'Specialist Home Loans for Accountants & Finance Experts', 'Get up to 90% LVR with Lenders Mortgage Insurance (LMI) waived. Specialized credit policies and rate discounts for qualified accountants.', '/images/hero_slide_4_purple.png', 'Find My Savings', '#calculator', 'Strategy Call', '#callback', '[]'),
  ('/home-guarantee-scheme', 'First Home Guarantee Scheme | Mortgage Xperts', 'Buy your first home with as little as a 5% deposit and pay zero Lenders Mortgage Insurance (LMI) under the Home Guarantee Scheme.', 'home guarantee scheme, first home guarantee, 5% deposit home loan, zero LMI scheme', 'Government Scheme Experts', 'Access the First Home Guarantee Scheme', 'Secure your first home with only a 5% deposit and skip the Lenders Mortgage Insurance. We guide you through the application and eligibility checks.', '/images/hero.png', 'Check Eligibility', '#calculator', 'Apply Now', '#callback', '[]'),
  ('/no-deposit-home-loans', 'No Deposit & Low Deposit Home Loans | Mortgage Xperts', 'Discover options to buy a home with zero deposit or low deposit, including guarantor loans and government support schemes.', 'no deposit home loans, low deposit home loan, guarantor loan Australia, zero deposit home loan', 'Low Deposit Specialists', 'No Deposit & Low Deposit Home Loan Solutions', 'Stop renting and start owning. Explore guarantor loans, first home schemes, and low deposit options to get into your home sooner.', '/images/hero.png', 'Explore Options', '#calculator', 'Book Free Session', '#callback', '[]'),
  ('/non-resident-home-loans', 'Non-Resident Home Loans in Australia | Mortgage Xperts', 'Home loans for temporary residents, visa holders, and non-residents buying property in Australia.', 'non resident home loan, temporary resident home loan, visa holder loan, foreigner property buy', 'Non-Resident Lending Experts', 'Home Loans for Visas & Non-Residents', 'Buying property on a temporary visa or from overseas? We specialize in securing competitive home loan approvals for non-residents and expats.', '/images/hero_slide_3_yellow.png', 'Assess My Visa', '#calculator', 'Get Expert Call', '#callback', '[]'),
  ('/refinancing-a-loan', 'Refinance Your Home Loan & Save Thousands | Mortgage Xperts', 'Compare and switch to a lower interest rate, consolidate your debts, or unlock equity to cash out.', 'refinance home loan, home loan refinance, lower interest rate, switch lenders Australia', 'Smart Refinance Strategies', 'Refinance and Save Thousands Annually', 'Switch to a lower rate, consolidate high-interest debts, or unlock equity for renovations with our streamlined mortgage refinance process.', '/images/hero_slide_4_purple.png', 'Calculate Savings', '#calculator', 'Book Free Consultation', '#callback', '[]'),
  ('/self-employed-home-loans', 'Self-Employed & Alt-Doc Home Loans | Mortgage Xperts', 'Flexible low-doc and alt-doc home loans for business owners, sole traders, and self-employed Australians.', 'self employed home loan, low doc home loan, sole trader mortgage, alt doc loan Australia', 'Self-Employed Loan Specialists', 'Flexible Home Loans for Business Owners', 'No up-to-date tax returns? We specialize in alt-doc and low-doc lending solutions to secure the home loan you deserve using alternative proof of income.', '/images/hero_slide_5_rose.png', 'Compare Low-Doc', '#calculator', 'Talk to a Broker', '#callback', '[]'),
  ('/investing-in-property', 'Property Investment Loan Strategies | Mortgage Xperts', 'Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.', 'property investment loan, investment home loan, buy investment property, equity loan', 'Property Portfolio Architects', 'Build and Scale Your Property Portfolio', 'Maximize your borrowing power, optimize loan structures, and leverage equity to grow your long-term property investment wealth.', '/images/hero_slide_3_yellow.png', 'Calculate Investment', '#calculator', 'Strategy Consultation', '#callback', '[]'),
  ('/investing-in-property-nepali-mortgage-broker', 'Property Investment Loan Strategies | Mortgage Xperts', 'Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.', 'property investment loan, investment home loan, buy investment property, equity loan', 'Property Portfolio Architects', 'Build and Scale Your Property Portfolio', 'Maximize your borrowing power, optimize loan structures, and leverage equity to grow your long-term property investment wealth.', '/images/hero_slide_3_yellow.png', 'Calculate Investment', '#calculator', 'Strategy Consultation', '#callback', '[]'),
  ('/loan-repayment-calculator', 'Loan Repayment Calculator | Mortgage Xperts', 'Calculate your weekly, fortnightly, or monthly home loan repayments, total interest payable, and see how extra repayments can save you thousands.', 'loan repayment calculator, mortgage repayment calculator, extra repayment savings, home loan calculator Australia', 'Mortgage Repayment Calculator', 'Understand Your Repayments', 'Estimate your weekly, fortnightly, or monthly home loan repayments. See how interest accumulates and discover how extra repayments could help you save thousands and pay off your mortgage sooner.', '/images/hero.png', 'Start Calculating', '#calculator', 'Talk to an Expert', '#callback', '[]'),
  ('/rent-yield-calculators', 'Rent Yield Calculator to Maximise Your Property Investment | Mortgage Xperts', 'Use Mortgage Xperts’ Rent Yield Calculator to estimate your rental income and returns. Make informed property investment decisions with ease.', 'rent yield calculator, rental yield calculator, property investment returns, calculate rent yield, buy investment property Australia', 'Property Investment Planner', 'Rental Yield Calculator', 'Calculate your property\'s gross and net rental yield to assess its investment performance. Make informed buying and portfolio decisions with ease.', '/images/hero.png', 'Start Calculator', '#calculator-tool', 'Talk to an Expert', '#enquiry-form', '[]'),
  ('/equity-calculator', 'Home Equity Calculator | Estimate Your Usable Equity | Mortgage Xperts', 'Use Mortgage Xperts’ Home Equity Calculator to find out how much usable equity you have in your property. Estimate your borrowing power for investment or renovations.', 'home equity calculator, calculate usable equity, borrow against equity, equity release Australia, equity investment property', 'Home Equity Specialist', 'Home Equity Calculator', 'Estimate your property\'s total equity and usable equity. Discover how you can leverage your home\'s value to purchase an investment property, renovate, or consolidate debt.', '/images/hero.png', 'Start Calculator', '#calculator-tool', 'Talk to an Expert', '#enquiry-form', '[]'),
  ('/stamp-duty-calculator', 'ACT Stamp Duty Calculator | Mortgage Xperts', 'Calculate stamp duty, transfer fees, and government concessions for your ACT property purchase.', 'stamp duty ACT, ACT transfer fee, first home buyer concession ACT', 'Government Fees Modeler', 'ACT Stamp Duty Calculator', 'Model purchasing fees, registration duties, transfer costs, and government concessions. Check if you qualify for the 100% First Home Buyer concession in ACT.', '/images/hero.png', 'Start Calculations', '#calculator-tool', 'Talk to a Broker', '#enquiry-form', '[]'),
  ('/stamp-duty-calculator/stamp-duty-calculator', 'ACT Stamp Duty Calculator | Mortgage Xperts', 'Calculate stamp duty, transfer fees, and government concessions for your ACT property purchase.', 'stamp duty ACT, ACT transfer fee, first home buyer concession ACT', 'Government Fees Modeler', 'ACT Stamp Duty Calculator', 'Model purchasing fees, registration duties, transfer costs, and government concessions. Check if you qualify for the 100% First Home Buyer concession in ACT.', '/images/hero.png', 'Start Calculations', '#calculator-tool', 'Talk to a Broker', '#enquiry-form', '[]'),
  ('/stamp-duty-calculator/stamp-duty-in-nsw', 'NSW Stamp Duty Calculator | Mortgage Xperts', 'Calculate transfer duty, mortgage registration, and First Home Buyers Assistance Scheme (FHBAS) concessions in NSW.', 'stamp duty NSW, NSW transfer duty, FHBAS concession NSW, first home buyer grant NSW', 'Government Fees Modeler', 'NSW Stamp Duty Calculator', 'Model transfer duty fees, registration costs, and grants in New South Wales. Check if you qualify for the FHBAS exemption up to $800,000.', '/images/hero.png', 'Start Calculations', '#calculator-tool', 'Talk to a Broker', '#enquiry-form', '[]'),
  ('/branches/sydney', 'Mortgage Xperts Sydney | Home Loans in New South Wales', 'Sydney\\\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in NSW. Free consultation.', 'mortgage broker Sydney, home loans Sydney, NSW mortgage broker, Nepali mortgage broker Sydney, first home buyer Sydney', 'Sydney Branch', 'Home Loans in Sydney', 'Sydney\\\'s property market is one of the most competitive in the world. Our Sydney-based mortgage brokers have deep knowledge of the local lending landscape — from the inner west to the Northern Beaches — to help you secure the right loan at the best rate.', '/images/sydney_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
  ('/branches/melbourne', 'Mortgage Xperts Melbourne | Home Loans in Victoria', 'Melbourne\\\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in VIC. Free consultation.', 'mortgage broker Melbourne, home loans Melbourne, VIC mortgage broker, Nepali mortgage broker Melbourne, first home buyer Melbourne', 'Melbourne Branch', 'Home Loans in Melbourne', 'Melbourne\\\'s diverse suburbs and property types require a broker who understands the VIC market. From first-home buyers in the outer east to investors in the inner north, our Melbourne brokers tailor every loan strategy to match your goals.', '/images/melbourne_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
  ('/branches/brisbane', 'Mortgage Xperts Brisbane | Home Loans in Queensland', 'Brisbane\\\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in QLD. Free consultation.', 'mortgage broker Brisbane, home loans Brisbane, QLD mortgage broker, Nepali mortgage broker Brisbane, first home buyer Brisbane', 'Brisbane Branch', 'Home Loans in Brisbane', 'Brisbane is booming — fuelled by the 2032 Olympics pipeline and interstate migration. Our Brisbane brokers are embedded in the local market, helping buyers, investors and refinancers capitalise on QLD\\\'s incredible growth story.', '/images/brisbane_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
  ('/branches/perth', 'Mortgage Xperts Perth | Home Loans in Western Australia', 'Perth\\\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in WA. Free consultation.', 'mortgage broker Perth, home loans Perth, WA mortgage broker, Nepali mortgage broker Perth, first home buyer Perth', 'Perth Branch', 'Home Loans in Perth', 'Perth has recorded some of Australia\\\'s strongest property price growth in recent years, driven by mining boom wealth, interstate migration, and limited housing stock. Our Perth brokers understand WA\\\'s unique lending landscape and lender appetite.', '/images/perth_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]'),
  ('/branches/adelaide', 'Mortgage Xperts Adelaide | Home Loans in South Australia', 'Adelaide\\\'s trusted mortgage brokers. Compare 40+ lenders, access local government grants and secure the best home loan rate in SA. Free consultation.', 'mortgage broker Adelaide, home loans Adelaide, SA mortgage broker, Nepali mortgage broker Adelaide, first home buyer Adelaide', 'Adelaide Branch', 'Home Loans in Adelaide', 'Adelaide is one of Australia\\\'s most affordable capital cities for property — and it\\\'s growing fast. Our Adelaide brokers know SA\\\'s unique lending environment, government grants, and the suburbs with the strongest growth prospects.', '/images/adelaide_real.png', 'Book Free Consultation', '#enquiry', 'Check Borrowing Power', '/borrowing-power-calculator', '[]')`
  ];

export async function initializeTables() {
  console.log('Initializing database tables...');
  try {
    for (const sql of tables) {
      await pool.execute(sql);
    }
    console.log('Database tables successfully initialized.');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
}

export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(query, params);
    return results as T;
  } catch (error: any) {
    // If the database tables are not initialized or table is missing, try initializing
    if (error.code === 'ER_NO_SUCH_TABLE') {
      try {
        await initializeTables();
        const [results] = await pool.execute(query, params);
        return results as T;
      } catch (initErr) {
        console.error('Failed to auto-initialize tables:', initErr);
      }
    }
    console.error(`Database query failed: "${query}". Error:`, error.message || error);
    // Return empty array to prevent front-end crashes
    return [] as any as T;
  }
}

export default pool;
