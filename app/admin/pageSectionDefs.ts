/**
 * Page Section Definitions
 * -------------------------
 * Maps each page path to an array of human-readable section labels.
 * The array index corresponds to pageSections[N] used in each ClientPage.tsx.
 * The admin CMS shows these labels instead of raw JSON array indices.
 */

export interface SectionDef {
  label: string;
  hint: string;
  multiline?: boolean;
  defaultValue?: string; // show a larger textarea vs single-line
}

export const PAGE_SECTION_DEFS: Record<string, SectionDef[]> = {
  // ─── SERVICE PAGES ──────────────────────────────────────────────────────────

  "/nepali-mortgage-broker-in-australia": [
    { label: "Section 0 — Main intro paragraph (buying a first home...)", hint: "E.g. 'For many Australians, buying a first home is a dream that quickly becomes overwhelming...'", multiline: true , defaultValue: "For many Australians, buying a first home is a dream that quickly becomes overwhelming. Once you start dealing with complex terms, restrictive lender buffers, and dense regulatory requirements, it is easy to get lost." },
    { label: "Section 1 — Lender mapping paragraph", hint: "E.g. 'We map your exact profiles across 30+ Australian lenders to unlock maximum capacity.'", multiline: true , defaultValue: "We map your exact profiles across 30+ Australian lenders to unlock maximum capacity." },
    { label: "Section 2 — Deposit strategy intro (Is it smarter to wait...)", hint: "Introduction to the deposit comparison section", multiline: true , defaultValue: "Is it smarter to wait years to save 20% to avoid Lenders Mortgage Insurance, or buy immediately with a 5% deposit using government schemes? Let's evaluate the strategic trade-offs." },
    { label: "Section 3 — Guarantor/scheme advantage text", hint: "Benefit of using government incentives vs waiting", multiline: true , defaultValue: "Leveraging government incentives allows you to purchase immediately, bypassing rising house price inflation while saving substantial LMI costs." },
    { label: "Section 4 — Larger deposit advantage text", hint: "Benefit of a structured 20% deposit position", multiline: true , defaultValue: "Ideal for structured wealth positions, a larger deposit lowers overall monthly repayments and provides immediate equity buffer cushions." },
    { label: "Section 5 — Founder bio / quote (first instance)", hint: "Aakash KC founder quote in the broker profile section", multiline: true , defaultValue: "\"Aakash founded Mortgage Xperts to provide the Nepalese community in Australia with transparent, client-first mortgage advice. Having arrived as an immigrant himself, he understands the dream of home ownership. He has helped over 500+ families secure low-deposit approvals and max borrowing capacity.\"" },
    { label: "Section 6 — Founder bio / quote (second instance)", hint: "Second instance of broker profile quote", multiline: true , defaultValue: "\"Aakash founded Mortgage Xperts to provide the Nepalese community in Australia with transparent, client-first mortgage advice. Having arrived as an immigrant himself, he understands the dream of home ownership. He has helped over 500+ families secure low-deposit approvals.\"" },
  ],

  "/refinancing-a-loan": [
    { label: "Section 0 — Unused / hero fallback", hint: "Not actively used on this page", multiline: true },
    { label: "Section 1 — Refinancing saves money intro", hint: "E.g. 'Refinancing can save you thousands over the life of your loan...'", multiline: true , defaultValue: "Refinancing can save you thousands over the life of your loan. We help you compare your current loan with better options from a range of lenders so you can make an informed choice." },
    { label: "Section 2 — Costs & setup fees intro", hint: "Intro paragraph for the refinancing costs section", multiline: true , defaultValue: "Refinancing can come with some setup and settlement costs. We work with you to work out the total costs upfront and compare them against your repayments savings to make sure it is a profitable move." },
    { label: "Section 3 — Common traps intro", hint: "Intro for the 'common refinancing traps' section", multiline: true , defaultValue: "Refinancing can save you thousands – but only if you avoid these common traps. We help you look at the full picture, not just the advertised interest rate." },
    { label: "Section 4 — Readiness checklist intro", hint: "Intro text above the refinancing readiness checklist", multiline: true , defaultValue: "Are you financially ready to switch lenders and secure a better deal? Tap the checklist options below to assess your current refinancing readiness." },
    { label: "Section 5 — Contact form intro", hint: "Text above the callback/enquiry form", multiline: true , defaultValue: "Fill out your details below and a senior finance expert will contact you within 2 business hours. We'll look at your current rates, calculate genuine potential savings, and identify banks offering cash back deals." },
    { label: "Section 6 — Broker bio / quote (first)", hint: "Founder quote in the team profile card", multiline: true , defaultValue: "\"Aakash founded Mortgage Xperts to support the community in Australia with professional, transparent home loan advice. Having helped over 500+ families refinance and secure rates, he is dedicated to maximizing your financial freedom.\"" },
    { label: "Section 7 — Broker bio / quote (second)", hint: "Second broker quote instance", multiline: true , defaultValue: "\"Aakash KC is the founder of Mortgage Xperts. He guides the Nepalese community in Australia to find tailored lending structures, negotiate lower interest rates, and skip LMI fees.\"" },
  ],

  "/investing-in-property-nepali-mortgage-broker": [
    { label: "Section 0 — Main intro paragraph (property investing overview)", hint: "Opening paragraph for the property investing section", multiline: true },
    { label: "Section 1 — Tangible asset class description", hint: "Why property is different from shares — double-value security", multiline: true , defaultValue: "Unlike volatile shares, real estate is a tangible asset class providing double-value security: value growth along with rental income." },
    { label: "Section 2 — Asset choice intro (not all assets perform similarly)", hint: "Intro to the investment asset comparison section", multiline: true , defaultValue: "Not all investment assets perform similarly. Your choice depends directly on your borrowing capability and capital strategy." },
    { label: "Section 3 — Calculator intro paragraph", hint: "Text above the rent yield / cash flow calculator", multiline: true , defaultValue: "Model your rental yields, deposits, interest repayments, and monthly cash flow to evaluate property feasibility." },
    { label: "Section 4 — Investment readiness checklist intro", hint: "Text above the financial readiness checklist", multiline: true , defaultValue: "Are you financially positioned to start building or expanding your property portfolio? Review the requirements below and assess your current investment readiness." },
    { label: "Section 5 — Contact form intro", hint: "Text above the callback / strategy enquiry form", multiline: true , defaultValue: "Connect with our brokers to review your borrowing potential, structure your loan, and set up your investment portfolio path." },
    { label: "Section 6 — Expert positioning statement", hint: "E.g. 'We look past generic rates to structure your loans...'", multiline: true , defaultValue: "We look past generic rates to structure your loans for optimal tax outcomes, maximum equity leverage, and minimal deposit costs." },
  ],

  "/self-employed-home-loans": [
    { label: "Section 0 — Main intro paragraph", hint: "Opening overview of self-employed home loan process", multiline: true },
    { label: "Section 1 — Specialist matching paragraph", hint: "E.g. 'Self-employed lending policies vary dramatically between banks...'", multiline: true , defaultValue: "Self-employed lending policies vary dramatically between banks. Our specialists can review your trust, company, or sole trader structure and match you with the right lender." },
  ],

  "/home-loan-for-nurses": [
    { label: "Section 0 — Main intro paragraph (nurse loan overview)", hint: "Opening paragraph for the nurses home loan section", multiline: true },
    { label: "Section 1 — 10% deposit / LMI waiver text", hint: "Description of 10% deposit option and LMI savings", multiline: true , defaultValue: "If you have a deposit of 10% (instead of the standard 20%), you might still avoid paying LMI altogether, saving you thousands in upfront bank fees." },
    { label: "Section 2 — LMI waiver eligibility note", hint: "Nurses eligible for LMI waivers via specialist packages", multiline: true , defaultValue: "Nurses may be eligible for LMI waivers through specialized medical lending packages, or through government-backed schemes." },
    { label: "Section 3 — Government grants intro", hint: "Intro to the government grants section for nurses", multiline: true , defaultValue: "In addition to lender benefits, you may be eligible for government grants and schemes designed to support first-home buyers and essential workers:" },
    { label: "Section 4 — Unused (skip)", hint: "Not actively used", multiline: false , defaultValue: "Calculate how much you can borrow as a nurse or midwife, including interest rate discounts and Lenders Mortgage Insurance waivers." },
    { label: "Section 5 — Document checklist intro", hint: "Text above the document requirement checklist", multiline: true , defaultValue: "To access exclusive rate cuts and LMI waivers, lenders will require proof of your qualifications and registration. Track your readiness using our checklist below." },
    { label: "Section 6 — Income assessment note", hint: "How lenders assess shift allowances, overtime, casual contracts", multiline: true , defaultValue: "Different lenders assess shift allowances, overtime, and casual contracts differently. Our specialists can review your payslips to maximize assessed income." },
  ],

  "/home-loan-for-doctors": [
    { label: "Section 0 — Main intro paragraph", hint: "Opening paragraph for the doctors home loan section", multiline: true , defaultValue: "Doctors and medical professionals, whether you’re a full-time salaried doctor, a casual medical practitioner, or self-employed running your own practice under an Australian Business Number (ABN), often have access to special home loan benefits. Lenders recognise the stable income, high earning potential, and lower risk profile of medical careers and provide tailored home loan options to reflect this." },
    { label: "Section 1 — LMI waiver explanation", hint: "Doctors eligible for LMI waiver details", multiline: true , defaultValue: "Medical careers represent the lowest risk class for Australian banks. Enjoy these premium loan package enhancements:" },
    { label: "Section 2 — Income assessment note", hint: "How lenders assess doctor income", multiline: true , defaultValue: "Lenders Mortgage Insurance (LMI) is a one-off insurance premium required if your deposit is below 20% of the property price. Many lenders waive LMI for doctors who meet criteria like being registered with a recognised medical board, having a stable income, and earning over $120,000 per year." },
  ],

  "/home-loan-for-accountants": [
    { label: "Section 0 — Main intro paragraph", hint: "Opening overview — accountants get special home loan offers", multiline: true },
    { label: "Section 1 — Jane example case study", hint: "CPA-registered accountant case study showing rate benefits", multiline: true , defaultValue: "Jane is a CPA-registered accountant earning $130,000 a year as a salaried employee. Because of her stable job and professional registration, her lender offers her a home loan with a discounted interest rate and waived LMI, even though her deposit is just 10%." },
    { label: "Section 2 — LMI waiver explanation", hint: "How accountants can avoid LMI with 10% deposit", multiline: true , defaultValue: "Normally, if your deposit is less than 20%, you pay Lenders Mortgage Insurance (LMI), which protects the lender if you can’t repay the loan. However, accountants registered with bodies like CPA Australia and earning over $120,000 can sometimes avoid LMI even with deposits as low as 10%." },
    { label: "Section 3 — Mark self-employed case study", hint: "Self-employed accountant qualifying for LMI waiver", multiline: true , defaultValue: "Mark is a self-employed accountant registered with CPA Australia. He wants to buy a $700,000 home. Normally, a 10% deposit ($70,000) would require LMI, but Mark qualifies for an LMI waiver because of his registration and income." },
    { label: "Section 4 — Low-doc loan note", hint: "Business tax returns and low-doc loan option for accountants", multiline: true , defaultValue: "Provide business tax returns and financials. Some lenders offer flexible low-doc loans based on accountant-declared figures." },
    { label: "Section 5 — Emily borrowing case study", hint: "Emily CPA buying $600k home with LMI waiver example", multiline: true , defaultValue: "Emily, a CPA-registered accountant earning $125,000, wants to buy a $600,000 home. With a 10% deposit of $60,000 and strong financials, she qualifies to borrow the remaining $540,000 without paying LMI. Her stable income also helps her get a loan amount that comfortably fits her budget." },
    { label: "Section 6 — Broker advantage text", hint: "Why mortgage brokers help accountants get better packages", multiline: true , defaultValue: "Mortgage brokers understand lender offers for accountants and can help you secure the best package." },
    { label: "Section 7 — Tom broker success story", hint: "Tom found LMI waiver through broker — savings story", multiline: true , defaultValue: "Tom is a self-employed accountant who didn’t know about LMI waivers. A mortgage broker helped him find a lender offering this benefit, saving him thousands. The broker also helped Tom gather his documents, making the process smooth and successful." },
    { label: "Section 8 — Calculator intro", hint: "Text above the interest rate / LMI calculator tool", multiline: true , defaultValue: "Calculate your potential interest rate cuts and check if you meet the professional LMI waiver thresholds." },
    { label: "Section 9 — LMI waiver threshold note", hint: "Avoid LMI up to 90% LVR for registered accountants", multiline: true , defaultValue: "Avoid paying expensive LMI up to 90% LVR if you meet registration criteria." },
    { label: "Section 10 — FAQ intro", hint: "Intro text above the FAQ section", multiline: true , defaultValue: "Everything you need to know about the home loan process for accountants and finance professionals." },
    { label: "Section 11 — Income assessment specialist note", hint: "Specialists review trust/company structures to maximize income", multiline: true , defaultValue: "Different lenders assess partner distributions, trust income, and casual corporate contracts differently. Our specialists can review your structure to maximize assessed income." },
  ],

  "/home-guarantee-scheme": [
    { label: "Section 0 — Main intro paragraph", hint: "Opening explanation of the First Home Guarantee scheme", multiline: true },
    { label: "Section 1 — Skip renting CTA text", hint: "Benefit of using government guarantee to buy now", multiline: true , defaultValue: "Skip years of renting and saving. Leverage the government guarantee to purchase your home safely and cost-effectively today." },
    { label: "Section 2 — LMI savings explanation", hint: "How much LMI is saved under the scheme ($10k–$30k+)", multiline: true , defaultValue: "Lenders Mortgage Insurance (LMI) can cost anywhere from $10,000 to $30,000+, depending on your loan size. With the First Home Guarantee, that money stays back in your pocket." },
    { label: "Section 3 — Calculator intro", hint: "Text above the deposit / LMI calculator tool", multiline: true , defaultValue: "Calculate your required deposit and see how much Lenders Mortgage Insurance (LMI) you avoid paying under the scheme." },
  ],

  "/no-deposit-home-loans-in-australia": [
    { label: "Section 0 — Unused / hero fallback", hint: "Not actively rendered on this page", multiline: true },
    { label: "Section 1 — Main intro paragraph (no deposit overview)", hint: "5% or 0% deposit routes via guarantor and government schemes", multiline: true , defaultValue: "By utilizing family guarantor loans, First Home Buyer government schemes, and alternative assessment criteria, you can secure a mortgage with a deposit as low as 5%—or even 0% in cash out-of-pocket. Our specialists guide you through all routes to minimize up-front cash requirements and completely waive or reduce Lenders Mortgage Insurance (LMI)." },
    { label: "Section 2 — Rental ledger as savings note", hint: "12-month lease ledger accepted as genuine savings by some lenders", multiline: true , defaultValue: "Have a great history of paying rent? Some specialty lenders now accept a 12-month lease ledger as alternative proof of genuine savings for 5% deposit loans." },
    { label: "Section 3 — Calculator comparison intro", hint: "Compare guarantor vs government vs standard loans", multiline: true , defaultValue: "Compare guarantor support, government schemes, and standard loans to calculate cash deposit and LMI savings." },
    { label: "Section 4 — Guarantor loan benefit text", hint: "Using parental guarantor to bypass deposit entirely", multiline: true , defaultValue: "Using parental guarantor support allows you to bypass deposit requirements entirely and avoid LMI fees." },
    { label: "Section 5 — Government scheme benefit text", hint: "5% deposit with government backing to avoid LMI", multiline: true , defaultValue: "Pay only 5% deposit and get government backing to avoid Lenders Mortgage Insurance." },
    { label: "Section 6 — FAQ intro", hint: "Intro to the FAQ section on guarantors / schemes", multiline: true , defaultValue: "Here are quick answers to common questions about guarantor loans, government low-deposit schemes, and using alternative genuine savings." },
    { label: "Section 7 — Specialist callback CTA text", hint: "Every borrower's situation is unique — call us to design a custom structure", multiline: true , defaultValue: "Every borrower’s financial position and parental equity situation are unique. Our accredited mortgage specialists can sit down with you to design a custom lending structure." },
  ],

  "/home-loan-with-visas": [
    { label: "Section 0 — Main intro paragraph", hint: "Buying property on a temporary visa or from overseas", multiline: true },
    { label: "Section 1 — Visa type lender note", hint: "Different visas get different lender policies", multiline: true , defaultValue: "The Australian Government has introduced a two-year ban on foreign persons purchasing established (previously owned) residential properties. This ban applies from 1 April 2025 to 31 March 2027 and aims to improve housing affordability." },
  ],

  "/non-resident-home-loans": [
    { label: "Section 0 — Main intro paragraph", hint: "Non-resident and expat home loan overview", multiline: true },
    { label: "Section 1 — FIRB and lender note", hint: "FIRB approval requirements and specialist lenders", multiline: true },
  ],

  // ─── CALCULATOR PAGES ───────────────────────────────────────────────────────

  "/refinancing-feasibility": [
    { label: "Section 0 — Calculator context paragraph", hint: "E.g. 'Refinancing should save you more than it costs...'", multiline: true , defaultValue: "Refinancing should save you more than it costs. Our calculator compares your current mortgage repayments with a lower interest rate, subtracting upfront setup costs to define your break-even period." },
  ],

  "/borrowing-power-calculator": [
    { label: "Section 0 — Post-submit confirmation text", hint: "Text shown after the lead capture form is submitted", multiline: true , defaultValue: "Thank you. An investment loan strategist from Mortgage Xperts will call you shortly to discuss your borrowing options." },
  ],

  "/rent-yield-calculators": [
    { label: "Section 0 — Calculator intro paragraph", hint: "Opening paragraph explaining rental yield", multiline: true },
    { label: "Section 1 — Unused (skip)", hint: "Not used on this page", multiline: false },
    { label: "Section 2 — FAQ intro", hint: "Intro text above the rental yield FAQ section", multiline: true , defaultValue: "Everything you need to know about calculating and understanding rental yields." },
    { label: "Section 3 — Contact form intro", hint: "Text above the broker callback form", multiline: true , defaultValue: "Structuring an investment loan requires careful planning of borrowing limits, interest-only terms, and offset accounts. Submit a callback request and one of our bilingual mortgage experts will guide you to secure the best loan strategy." },
  ],

  "/ytd-calculator": [
    { label: "Section 0 — Calculator intro paragraph", hint: "Intro explaining YTD income annualisation method", multiline: true },
  ],

  "/lmi-calculator": [
    { label: "Section 0 — Unused / hero fallback", hint: "Not actively rendered", multiline: false },
    { label: "Section 1 — Calculator type label", hint: "E.g. 'Type: Lenders Mortgage Insurance (LMI) Assessment'", multiline: false , defaultValue: "<span className=\"font-bold\">Type:</span> Lenders Mortgage Insurance (LMI) Assessment" },
  ],

  // ─── CONTENT / GUIDE PAGES ──────────────────────────────────────────────────

  "/about-us-nepali-mortgage-broker-in-australia": [
    { label: "Section 0 — Main intro paragraph", hint: "Opening paragraph about the company's mission and story", multiline: true },
    { label: "Section 1 — Values / community paragraph", hint: "Community commitment and bilingual support", multiline: true },
  ],

  "/our-team": [
    { label: "Section 0 — Team intro paragraph", hint: "Opening paragraph describing the team", multiline: true },
  ],

  "/first-home-guide": [
    { label: "Section 0 — Guide intro paragraph", hint: "Opening overview of the first home buyer guide", multiline: true },
    { label: "Section 1 — Grants section text", hint: "First home buyer grants explained", multiline: true },
  ],

  "/free-resources": [
    { label: "Section 0 — Resources intro paragraph", hint: "Opening paragraph for the free resources page", multiline: true },
  ],

  "/refinancing-guide": [
    { label: "Section 0 — Guide intro paragraph", hint: "Opening overview of the refinancing guide", multiline: true },
    { label: "Section 1 — Key steps overview", hint: "Overview of steps to refinance", multiline: true },
  ],

  "/property-investment-guide": [
    { label: "Section 0 — Guide intro paragraph", hint: "Opening overview of the property investment guide", multiline: true },
  ],

  // ─── BRANCH PAGES ───────────────────────────────────────────────────────────

  "/branches/sydney": [
    { label: "Section 0 — Local market context paragraph", hint: "Sydney property market overview for this branch page", multiline: true },
  ],
  "/branches/melbourne": [
    { label: "Section 0 — Local market context paragraph", hint: "Melbourne property market overview", multiline: true },
  ],
  "/branches/brisbane": [
    { label: "Section 0 — Local market context paragraph", hint: "Brisbane property market overview", multiline: true },
  ],
  "/branches/perth": [
    { label: "Section 0 — Local market context paragraph", hint: "Perth property market overview", multiline: true },
  ],
  "/branches/adelaide": [
    { label: "Section 0 — Local market context paragraph", hint: "Adelaide property market overview", multiline: true },
  ],
};

/** Returns the section defs for a given page path, or a generic fallback. */
export function getSectionDefs(pagePath: string): SectionDef[] {
  return PAGE_SECTION_DEFS[pagePath] ?? [];
}
