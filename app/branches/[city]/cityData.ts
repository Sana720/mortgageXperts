import { CityData } from "./ClientPage";

export const cityDataMap: Record<string, CityData> = {
  sydney: {
    city: "Sydney",
    state: "New South Wales",
    stateShort: "NSW",
    slug: "sydney",
    tagline: "Personalised Home Loan Solutions",
    description:
      "Buying your first home, refinancing or investing in Sydney? Mortgage Xperts helps you compare suitable home loan options, understand your borrowing capacity and make informed property finance decisions. We assist home buyers, healthcare professionals, homeowners, investors and self-employed borrowers across Greater Sydney and regional New South Wales, with personalised consultations by phone and online.",
    heroImage: "/images/sydney_real.png",
    accentColor: "#2563EB",
    accentLight: "#EFF6FF",
    accentDark: "#1e3a8a",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Understanding Home Loans in Sydney",
    marketDetail:
      "Sydney property buyers can face very different financing requirements depending on whether they are purchasing an apartment, established house, townhouse or newly constructed home. For apartment buyers, lenders may consider factors such as property size, location, building characteristics and strata information. For borrowers purchasing a higher-value home, deposit requirements, loan-to-value ratio and Lenders Mortgage Insurance (LMI) may become particularly important. Mortgage Xperts compares suitable home loan products and lending policies across our lender panel, helping you understand the financing implications of your chosen property and financial position.",
    suburbs: [
      "Parramatta", "Chatswood", "Bondi", "Strathfield", "Burwood", "Liverpool",
      "Penrith", "Castle Hill", "Blacktown", "Hurstville", "Campbelltown", "Manly",
      "Ryde", "Hornsby", "Epping", "Macquarie Park", "Rhodes", "Auburn",
      "Bankstown", "Marrickville", "Newtown", "Surry Hills", "Randwick", "Coogee",
      "Cronulla", "Miranda", "Baulkham Hills", "Kellyville", "Richmond", "Kensington"
    ],
    localTips: [
      {
        title: "First Home Buyer Support in New South Wales",
        desc: "Eligible first home buyers purchasing a new or established home valued up to $800,000 may qualify for a transfer duty exemption under the NSW First Home Buyers Assistance Scheme. Concessions may also apply to qualifying homes valued above $800,000 and below $1 million. Understanding these potential savings, together with your deposit, purchase costs and borrowing capacity, can help you establish a realistic property budget before making an offer."
      },
      {
        title: "Home Loans for Sydney Healthcare Professionals",
        desc: "Nurses, midwives, doctors and other healthcare professionals may receive employment income that includes base salary, overtime, shift allowances and penalty rates. Different lenders can assess these income components differently. Mortgage Xperts reviews suitable lender policies and explores potential LMI concessions for eligible professions, taking account of your individual circumstances. Whether you work in a hospital, community healthcare service or private practice, we help you assess your borrowing options."
      },
      {
        title: "Compare 40+ Lenders",
        desc: "We compare suitable home loan products and lending policies across our comprehensive lender panel, helping you understand the financing implications of your chosen property and financial position."
      },
      {
        title: "Personalised Consultations",
        desc: "From first home purchases and investment loans to refinancing and construction finance, we offer personalised assistance by phone and online throughout Greater Sydney and regional NSW."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to healthcare professionals, first-home buyers, homeowners and property investors across Greater Sydney, New South Wales and Australia-wide.",
    },
    uniqueAdvantages: [
      { iconKey: "MapPin", title: "Sydney Market Understanding", desc: "Expert guidance on apartment strata requirements, established houses, and new constructions across Greater Sydney." },
      { iconKey: "Users", title: "Multilingual Guidance", desc: "We proudly assist clients in English, Nepali and Hindi, offering accessible advice tailored to your circumstances." },
      { iconKey: "TrendingUp", title: "Tailored Loan Structuring", desc: "Careful assessment of deposit requirements, loan-to-value ratios (LVR) and potential LMI concessions." },
      { iconKey: "Clock", title: "Prompt Assessments", desc: "Request your free assessment online for rapid review of your borrowing capacity and loan options." },
      { iconKey: "Shield", title: "No Client Fees", desc: "Our residential mortgage advisory service is paid by the lender, with zero fees charged to you." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare suitable loan products and policies across 40+ leading Australian banks and lenders." },
    ],
    nearbyAreas: ["Blue Mountains", "Central Coast", "Illawarra", "Hunter Valley", "Southern Highlands"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
  },

  melbourne: {
    city: "Melbourne",
    state: "Victoria",
    stateShort: "VIC",
    slug: "melbourne",
    tagline: "Local Expertise. Melbourne-Specific Lending.",
    description:
      "Melbourne's diverse suburbs and property types require a broker who understands the VIC market. From first-home buyers in the outer east to investors in the inner north, our Melbourne brokers tailor every loan strategy to match your goals.",
    heroImage: "/images/melbourne_real.png",
    accentColor: "#7C3AED",
    accentLight: "#F5F3FF",
    accentDark: "#4c1d95",
    medianHousePrice: "$942K",
    avgLoanSize: "$620K",
    approvalRate: "95%",
    clientsHelped: "500+",
    marketInsight: "Melbourne Offers Opportunity — If You Have the Right Strategy",
    marketDetail:
      "Melbourne's property market is recovering with strong growth in the inner suburbs. Our Melbourne brokers know the VIC stamp duty thresholds, grant eligibility rules and which lenders offer the best rates for apartments vs houses.",
    suburbs: [
      "Richmond", "Fitzroy", "Brunswick", "Doncaster", "Dandenong", "Frankston",
      "Craigieburn", "Werribee", "Box Hill", "Clayton", "Footscray", "Moonee Ponds",
      "St Kilda", "South Yarra", "Camberwell", "Hawthorn", "Preston", "Coburg",
      "Glen Waverley", "Mount Waverley", "Epping", "Tarneit", "Point Cook", "Ringwood",
      "Springvale", "Oakleigh", "Bundoora", "Reservoir", "Geelong", "Carlton"
    ],
    localTips: [
      { title: "VIC Stamp Duty Concessions", desc: "Victorian first home buyers are exempt from stamp duty on homes under $600K and receive concessions up to $750K." },
      { title: "First Home Owner Grant", desc: "Eligible VIC buyers of new properties outside Melbourne can access a $10,000 FHOG — we handle the eligibility check." },
      { title: "Apartment vs House Lending", desc: "Some Melbourne lenders treat apartments differently — we identify which lenders value your property type most favourably." },
      { title: "Outer Suburb Growth Zones", desc: "Areas like Craigieburn, Wyndham and Pakenham offer strong yields — we can structure investment loans for these corridors." },
    ],
    teamLead: {
      name: "Sunita Rai",
      title: "Senior Mortgage Broker — Melbourne Branch",
      image: "/images/team_melbourne.png",
      bio: "Sunita brings 7 years of Melbourne mortgage experience with a specialisation in VIC grant applications, first home buyers and refinancing strategies for the middle-ring suburbs.",
    },
    uniqueAdvantages: [
      { iconKey: "MapPin", title: "All Melbourne Zones", desc: "From bayside to the outer growth corridors — we know every council zone and lender restriction in VIC." },
      { iconKey: "Home", title: "VIC Grant Specialists", desc: "We maximise every available Victorian government incentive for first home buyers and owner-occupiers." },
      { iconKey: "Building2", title: "Apartment Expertise", desc: "Specific lender knowledge for inner-Melbourne apartment lending where postcode restrictions apply." },
      { iconKey: "Clock", title: "Fast Pre-Approval", desc: "48-hour pre-approval turnaround for Melbourne buyers ready to bid at auction." },
      { iconKey: "Shield", title: "No Broker Fees", desc: "Our service is completely free to you — we are remunerated by the lending institution." },
      { iconKey: "CheckCircle2", title: "Nepali Community Hub", desc: "Melbourne's Nepali diaspora trusts Mortgage Xperts for honest, bilingual mortgage support." },
    ],
    nearbyAreas: ["Geelong", "Ballarat", "Bendigo", "Mornington Peninsula", "Yarra Valley"],
    officeAddress: "Level 2, 459 Collins Street, Melbourne VIC 3000",
    officePhone: "0450 240 757",
  },

  brisbane: {
    city: "Brisbane",
    state: "Queensland",
    stateShort: "QLD",
    slug: "brisbane",
    tagline: "Home Loans for Buyers, Owners and Investors",
    description:
      "Planning to buy or build in Brisbane? Mortgage Xperts helps you assess your borrowing capacity, compare home loan options and understand the financial commitments involved in purchasing property. We support first home buyers, healthcare professionals, property investors, existing homeowners and self-employed borrowers across Brisbane and Queensland.",
    heroImage: "/images/brisbane_real.png",
    accentColor: "#D97706",
    accentLight: "#FFFBEB",
    accentDark: "#92400e",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Buying Established Homes and New Builds in Brisbane",
    marketDetail:
      "A borrower purchasing an established home may face different upfront costs and government assistance options from someone purchasing a newly built home or vacant residential land. Construction loans also require additional planning. Depending on the lender, building funds may be released in stages as construction progresses, and repayments during construction may differ from those on a completed-property loan. Mortgage Xperts helps borrowers compare suitable construction, owner-occupier and investment loan options while considering their deposit, income and ongoing expenses.",
    suburbs: [
      "Fortitude Valley", "Chermside", "Carindale", "Sunnybank", "Aspley", "Mt Gravatt",
      "Toowong", "Indooroopilly", "Logan", "Ipswich", "Redcliffe", "Strathpine",
      "South Brisbane", "West End", "New Farm", "Paddington", "Kangaroo Point", "Hamilton",
      "Ascot", "Nundah", "Kedron", "Stafford", "Coorparoo", "Carina", "Annerley",
      "Moorooka", "Eight Mile Plains", "Calamvale", "Gold Coast", "Sunshine Coast"
    ],
    localTips: [
      {
        title: "Queensland First Home Buyer Concessions",
        desc: "Queensland provides different transfer duty concessions depending on the property type. Eligible first home buyers purchasing an established property may receive a transfer duty concession. For qualifying new homes or vacant residential land transactions entered into from 1 May 2025, a full transfer duty concession may be available. These distinctions can influence the amount you need to save before purchasing."
      },
      {
        title: "Healthcare Professional Home Loans in Brisbane",
        desc: "For nurses, midwives, doctors and other eligible healthcare professionals, borrowing capacity may depend on how a lender assesses regular salary, overtime and roster-based earnings. Mortgage Xperts compares relevant lender policies and investigates potential benefits such as profession-specific LMI concessions, subject to eligibility. We also assist healthcare professionals with refinancing, purchasing investment properties and planning future home upgrades."
      },
      {
        title: "Construction & New Build Planning",
        desc: "Building in Brisbane requires coordinated progress drawdowns, builder contract reviews, and construction loan structuring to ensure smooth fund releases from slab down to handover."
      },
      {
        title: "Personalised Online & Phone Consultations",
        desc: "Access tailored mortgage guidance from the comfort of your home. We assist clients across Greater Brisbane, the Gold Coast, Sunshine Coast, and regional Queensland."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first-home buyers, healthcare professionals, existing homeowners and property investors across Brisbane, Queensland and Australia-wide.",
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Construction & Established Loans", desc: "Expert structuring for both completed properties and staged construction drawdowns across Queensland." },
      { iconKey: "MapPin", title: "Brisbane & QLD Reach", desc: "From Brisbane CBD and middle rings to Logan, Ipswich, Gold Coast, and Sunshine Coast." },
      { iconKey: "Home", title: "Transfer Duty Concession Guidance", desc: "Clear navigation of Queensland established home concessions and new build/land exemptions." },
      { iconKey: "Users", title: "Healthcare Lending Expertise", desc: "Assessing overtime, shift penalties, and LMI waiver eligibility for QLD healthcare professionals." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Comparisons", desc: "We compare options across 40+ leading Australian banks and specialist lenders for Queensland buyers." },
    ],
    nearbyAreas: ["Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich", "Logan", "Moreton Bay"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
  },

  perth: {
    city: "Perth",
    state: "Western Australia",
    stateShort: "WA",
    slug: "perth",
    tagline: "Your Home Loan and Property Finance Partner",
    description:
      "Purchasing, building or refinancing property in Perth? Mortgage Xperts provides personalised mortgage guidance to help you understand your borrowing options and select lending arrangements suited to your circumstances. We assist first home buyers, nurses, midwives, doctors, property investors, homeowners and self-employed borrowers throughout Perth and Western Australia.",
    heroImage: "/images/perth_real.png",
    accentColor: "#059669",
    accentLight: "#ECFDF5",
    accentDark: "#065f46",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Perth Home Loans, Construction Finance and Investment Lending",
    marketDetail:
      "For buyers considering established homes, house and land packages or newly constructed properties, the financing process can vary considerably. An established-property purchase generally involves finance approval and settlement within the agreed contract period. Construction lending may involve separate land and building arrangements, progress payments and additional lender documentation. For investors, important considerations include interest-only versus principal-and-interest repayments, available equity, rental income assessment and the effect of existing debts on borrowing capacity. Mortgage Xperts helps you compare suitable loan structures and understand the financial implications before proceeding.",
    suburbs: [
      "Subiaco", "Fremantle", "Joondalup", "Rockingham", "Mandurah", "Armadale",
      "Midland", "Cannington", "Stirling", "Wanneroo", "Gosnells", "Canning Vale",
      "East Perth", "West Perth", "Northbridge", "South Perth", "Victoria Park", "Baldivis",
      "Scarborough", "Morley", "Ellenbrook", "Nedlands", "Claremont", "Cottesloe",
      "Duncraig", "Cockburn Central", "Success", "Thornlie", "Maddington", "Bayswater"
    ],
    localTips: [
      {
        title: "First Home Buyer Assistance in Western Australia",
        desc: "From 7 May 2026, eligible first home buyers can receive an exemption from transfer duty on qualifying homes valued up to $600,000, with concessional rates applying to qualifying homes valued above $600,000 and up to $800,000. Different thresholds apply to vacant residential land. These concessions can influence your upfront purchase costs, particularly when deciding between an established home and building a new property."
      },
      {
        title: "Mortgage Solutions for Nurses and Healthcare Professionals",
        desc: "Mortgage Xperts places particular emphasis on helping healthcare professionals navigate lender requirements. Income from rotating shifts, overtime and penalty rates may be treated differently by individual lenders. We assess relevant borrowing options and potential profession-specific lending concessions. Our services also support medical professionals purchasing investment properties, refinancing existing mortgages and planning construction projects."
      },
      {
        title: "Construction & Investment Lending Structures",
        desc: "We assist with staged progress payments for house and land packages, building contracts, interest-only versus P&I structures, equity release, and rental income assessments for WA property investors."
      },
      {
        title: "Personalised Online & Australia-Wide Consultations",
        desc: "Access tailored mortgage guidance and borrowing capacity assessments from anywhere in Western Australia. We assist clients across Greater Perth and regional WA via phone and secure online consultations."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first home buyers, nurses, midwives, doctors, property investors, homeowners and self-employed borrowers throughout Perth, Western Australia and nationwide.",
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Construction & Established Loans", desc: "Expert structuring for established homes, house & land packages, and investment lending across WA." },
      { iconKey: "MapPin", title: "Perth & Regional WA", desc: "Supporting buyers throughout Greater Perth, Mandurah, the South West, and regional Western Australia." },
      { iconKey: "Home", title: "WA Transfer Duty Guidance", desc: "Clear navigation of Western Australia first home buyer transfer duty exemptions and concessions." },
      { iconKey: "Users", title: "Healthcare Lending Solutions", desc: "Specialist assessment of shift allowances, overtime, and profession-specific lending benefits." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Comparisons", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for WA clients." },
    ],
    nearbyAreas: ["Mandurah", "Peel Region", "South West WA", "Wheatbelt", "Pilbara (remote)"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
  },

  adelaide: {
    city: "Adelaide",
    state: "South Australia",
    stateShort: "SA",
    slug: "adelaide",
    tagline: "Home Loans, Refinancing and Property Investment",
    description:
      "Buying your first home, planning a new build or investing in Adelaide? Understanding how lenders assess your income, deposit and financial commitments is an essential part of choosing the right home loan. Mortgage Xperts assists first home buyers, healthcare professionals, homeowners, self-employed borrowers and property investors across Adelaide and regional South Australia.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#DC2626",
    accentLight: "#FEF2F2",
    accentDark: "#7f1d1d",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Understanding Property Finance in Adelaide",
    marketDetail:
      "Adelaide home buyers may be considering established properties, new residential developments, townhouses or house and land packages. Each purchase type can involve different financial considerations. For established homes, you may need to budget for transfer duty, inspections and other purchasing expenses. For a new build, construction timelines, progress payments and potential changes to building costs can affect your finance requirements. Investors may also need to consider rental income, existing property debt, available equity and the impact of additional repayments on household cash flow. Mortgage Xperts helps borrowers review suitable lending options and understand how these factors affect their financial plans.",
    suburbs: [
      "Glenelg", "Norwood", "Prospect", "Salisbury", "Morphett Vale", "Tea Tree Gully",
      "Marion", "Campbelltown", "Golden Grove", "Mount Barker", "Port Adelaide", "Unley",
      "North Adelaide", "Adelaide Hills", "Mawson Lakes", "Hallett Cove", "Brighton", "Henley Beach",
      "Semaphore", "Gawler", "Elizabeth", "Modbury", "Magill", "Burnside", "Mitcham",
      "Goodwood", "Stirling", "Blackwood", "Seaford", "Aldinga"
    ],
    localTips: [
      {
        title: "South Australian First Home Buyer Benefits",
        desc: "South Australia provides stamp duty relief for eligible first home buyers purchasing qualifying new homes, off-the-plan apartments or vacant land intended for a new home. For eligible contracts entered into from 6 June 2024, full stamp duty relief may apply without a property value cap. This makes it particularly important to compare the upfront financial implications of purchasing an established home with those of purchasing or building a new property."
      },
      {
        title: "Home Loans for Adelaide Healthcare Workers",
        desc: "Nurses, midwives, doctors and other healthcare professionals may have different employment arrangements and income patterns. Mortgage Xperts reviews suitable lending policies for eligible overtime, penalty rates and shift allowances, along with potential LMI concessions for qualifying professionals. Whether you are purchasing your first home, refinancing or expanding your property portfolio, our approach is tailored to your financial circumstances."
      },
      {
        title: "Construction & Investment Lending Considerations",
        desc: "For new builds and house and land packages, we assist with progress payment structures and builder contracts. For property investors, we evaluate rental yields, available equity, and interest-only versus P&I repayment structures."
      },
      {
        title: "Personalised Mortgage Guidance Across South Australia",
        desc: "We assist clients in Adelaide and regional South Australia through convenient phone and online consultations. Start with a free assessment and discuss your borrowing options with Mortgage Xperts."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first home buyers, healthcare professionals, homeowners, self-employed borrowers and property investors across Adelaide, regional South Australia and nationwide.",
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Established & Construction Finance", desc: "Expert structuring for established homes, house and land packages, and investment properties in SA." },
      { iconKey: "MapPin", title: "Adelaide & Regional SA", desc: "Assisting home buyers across Greater Adelaide, Adelaide Hills, Barossa, and regional South Australia." },
      { iconKey: "Home", title: "SA Stamp Duty Relief Guidance", desc: "Clear advice on qualifying new builds, off-the-plan contracts, and full stamp duty relief exemptions." },
      { iconKey: "Users", title: "Healthcare Lending Solutions", desc: "Navigating shift allowances, overtime, and profession-specific LMI concessions for SA medical workers." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for Adelaide clients." },
    ],
    nearbyAreas: ["Adelaide Hills", "Barossa Valley", "McLaren Vale", "Fleurieu Peninsula", "Yorke Peninsula"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
  },

  canberra: {
    city: "Canberra",
    state: "Australian Capital Territory",
    stateShort: "ACT",
    slug: "canberra",
    tagline: "Home Loans for Professionals and First Home Buyers",
    description:
      "Working towards buying a home, refinancing or investing in Canberra? Mortgage Xperts helps you compare suitable home loans and understand how employment income, deposit savings and ongoing financial commitments affect your borrowing options. We support public sector employees, healthcare professionals, first home buyers, property investors and self-employed borrowers across Canberra and the ACT.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#0284C7",
    accentLight: "#F0F9FF",
    accentDark: "#0c4a6e",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Home Loan Options for Canberra Professionals",
    marketDetail:
      "Canberra borrowers may work in government departments, healthcare services, professional organisations or private businesses. For salaried employees, lenders commonly consider base income, employment arrangements, existing debts and living expenses. For borrowers with variable income, additional documentation may be required. Mortgage Xperts reviews suitable lender assessment policies and helps you understand which income sources can be considered in your loan application. We also assist borrowers purchasing apartments, established homes and investment properties, where lender requirements and property characteristics can affect available finance.",
    suburbs: [
      "Civic", "Belconnen", "Gungahlin", "Tuggeranong", "Woden", "Kingston", "Manuka", "Queanbeyan", "Yass", "Goulburn",
      "Bruce", "Dickson", "Braddon", "Acton", "Turner", "O'Connor", "Lyneham", "Ainslie", "Campbell", "Barton",
      "Yarralumla", "Deakin", "Narrabundah", "Fyshwick", "Phillip", "Mawson", "Kambah", "Wanniassa", "Ngunnawal", "Franklin"
    ],
    localTips: [
      {
        title: "ACT Home Buyer Concession Scheme",
        desc: "The ACT Home Buyer Concession Scheme provides conveyance duty relief to eligible buyers. From 1 July 2026, the scheme removed its property value cap and income threshold. Eligible applicants may receive a full conveyance duty exemption, subject to other requirements, including previous property ownership and occupancy conditions. Understanding these rules can make a significant difference when estimating the upfront costs of purchasing your home."
      },
      {
        title: "Healthcare Professional Home Loans",
        desc: "For nurses, midwives, doctors and other eligible healthcare professionals, we assess lending policies for relevant shift income, overtime, additional allowances and potential LMI concessions. We also help homeowners consider refinancing, access to available equity and financing for future property purchases."
      },
      {
        title: "Public Sector & Salaried Income Assessments",
        desc: "We work with lenders offering favorable assessment policies for federal and ACT government employees, assessing permanent roles, allowances, and salary packaging structures."
      },
      {
        title: "Personalised Phone & Online Consultations",
        desc: "Our phone and online consultations provide access to personalised mortgage guidance without requiring an in-person appointment. Book a free assessment with Aakash K C, Founder & Principal Broker of Mortgage Xperts."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to public sector employees, healthcare professionals, first home buyers, property investors and self-employed borrowers across Canberra, the ACT and nationwide.",
    },
    uniqueAdvantages: [
      { iconKey: "Award", title: "Public Sector & Professional Lending", desc: "Specialist lender assessment for federal government, ACT public service, and corporate professionals." },
      { iconKey: "MapPin", title: "Canberra Metro & Surrounds", desc: "Serving buyers across Belconnen, Gungahlin, Woden, Tuggeranong, and surrounding regional areas." },
      { iconKey: "Home", title: "ACT Conveyance Duty Relief", desc: "Navigating the uncapped ACT Home Buyer Concession Scheme to minimise upfront purchasing costs." },
      { iconKey: "Users", title: "Healthcare Lending Solutions", desc: "Assessing shift allowances, overtime, and profession-specific LMI waivers for medical staff." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "TrendingUp", title: "40+ Lender Panel", desc: "We compare options across 40+ leading Australian banks and specialist lenders for ACT borrowers." },
    ],
    nearbyAreas: ["Queanbeyan", "Gundaroo", "Yass", "Murrumbateman"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757"
  },

  hobart: {
    city: "Hobart",
    state: "Tasmania",
    stateShort: "TAS",
    slug: "hobart",
    tagline: "Home Loan Guidance Across Tasmania",
    description:
      "Considering a home purchase or mortgage refinance in Hobart? Whether you are buying your first property, upgrading your existing home or purchasing an investment, understanding the lender's assessment process can help you plan with confidence. Mortgage Xperts assists borrowers across Hobart, Greater Hobart and regional Tasmania, including healthcare professionals, first home buyers, homeowners and property investors.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#7C3AED",
    accentLight: "#F5F3FF",
    accentDark: "#4c1d95",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Financing Established Homes and Investment Properties in Tasmania",
    marketDetail:
      "Buying property in Tasmania can involve lending considerations related to the property's condition, location, construction type and intended use. For example, lenders may request additional information when assessing certain regional properties or homes with unusual construction features. Rural-residential properties may also be subject to different lending policies from standard suburban houses. For investors, lenders generally consider existing debts, rental income, household expenses and the proposed loan structure. Mortgage Xperts compares suitable lending policies and helps borrowers understand the requirements relevant to their chosen property.",
    suburbs: [
      "Sandy Bay", "Glenorchy", "Kingston", "Howrah", "Bellerive", "New Town", "North Hobart", "Moonah", "Margate", "Sorell",
      "West Hobart", "South Hobart", "Battery Point", "Lenah Valley", "Lutana", "Derwent Park", "Claremont", "Chigwell", "Lindisfarne", "Rosny",
      "Warrane", "Mornington", "Lauderdale", "Rokeby", "Blackmans Bay", "Taroona", "Huonville", "Richmond", "New Norfolk", "Brighton"
    ],
    localTips: [
      {
        title: "Understanding First Home Buyer Costs in Tasmania",
        desc: "First home buyers should allow for expenses beyond the deposit, including applicable property transfer duty, legal costs, inspections and other settlement expenses. Tasmania previously offered a full property transfer duty exemption for eligible first home buyers of established homes settling within a specified period. That exemption is not available for transactions settling after 30 June 2026. It is therefore important to calculate your purchase costs using the concessions actually available at the time of your transaction."
      },
      {
        title: "Healthcare Professional and Refinancing Solutions",
        desc: "Mortgage Xperts assists nurses, midwives, doctors and other eligible healthcare professionals whose income may include shift allowances, overtime or penalty rates. We also help existing homeowners review their interest rates, repayment structures and refinancing options, including potential switching costs and loan features."
      },
      {
        title: "Regional & Rural-Residential Property Lending",
        desc: "Lenders assess regional acreages, heritage titles, and non-standard constructions with specific guidelines. We help identify lenders with favorable valuation and LVR policies for Tasmanian properties."
      },
      {
        title: "Personalised Consultations Across Tasmania",
        desc: "Whether you are buying in Hobart or exploring options elsewhere in Tasmania, our phone and online consultations make professional mortgage guidance accessible. Request a free home loan assessment with Mortgage Xperts."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to healthcare professionals, first home buyers, homeowners and property investors across Hobart, Greater Hobart and regional Tasmania.",
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Established & Investment Loans", desc: "Expert assessment for Hobart homes, regional properties, rural-residential, and investment portfolios." },
      { iconKey: "MapPin", title: "Hobart & Regional TAS", desc: "Assisting clients across Greater Hobart, Launceston, Devonport, Burnie, and rural Tasmania." },
      { iconKey: "Home", title: "Transfer Duty Cost Navigation", desc: "Accurate calculation of upfront settlement costs, duty obligations, and available concessions in TAS." },
      { iconKey: "Users", title: "Healthcare & Shift Work Lending", desc: "Evaluating shift penalties, overtime, and profession-specific LMI waivers for Tasmanian medical staff." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for Tasmanian clients." },
    ],
    nearbyAreas: ["Launceston", "Devonport", "Burnie", "Kingborough", "Huon Valley"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757"
  },

  darwin: {
    city: "Darwin",
    state: "Northern Territory",
    stateShort: "NT",
    slug: "darwin",
    tagline: "Property Finance Across the Northern Territory",
    description:
      "Buying, building or refinancing a property in Darwin? Whether you are purchasing your first home, relocating for employment or planning a property investment, understanding your finance options can help you make confident borrowing decisions. Mortgage Xperts assists first home buyers, healthcare professionals, defence personnel, homeowners, investors and self-employed borrowers across Darwin, Palmerston and regional Northern Territory.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#059669",
    accentLight: "#ECFDF5",
    accentDark: "#065f46",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Understanding Darwin Property Lending",
    marketDetail:
      "Property financing in Darwin can involve considerations that differ from those associated with buying in other Australian capital cities. Lenders may assess certain property types, locations and building characteristics differently. Appropriate insurance arrangements and ongoing ownership expenses should also be considered when establishing a realistic property budget. For buyers relocating to the Territory, employment arrangements, available savings, existing property ownership and anticipated living costs may influence borrowing capacity. Mortgage Xperts helps borrowers understand these considerations and compare suitable lending options.",
    suburbs: [
      "Palmerston", "Casuarina", "Larrakeyah", "Nightcliff", "Rapid Creek", "Fannie Bay", "Stuart Park", "Rosebery", "Howard Springs", "Humpty Doo",
      "Darwin City", "Parap", "Cullen Bay", "Bayview", "Woolner", "The Gardens", "Ludmilla", "Coconut Grove", "Millner", "Jingili",
      "Alawa", "Wanguri", "Leanyer", "Karama", "Malak", "Wulagi", "Anula", "Marrara", "Berrimah", "Bakewell"
    ],
    localTips: [
      {
        title: "Northern Territory First Home Buyer Support",
        desc: "The Northern Territory's Homegrown Territory program offers a $50,000 grant for eligible first home buyers purchasing or building a qualifying new home. The program includes eligible new-home purchases, building arrangements and certain off-the-plan transactions. Contract dates, property conditions and residency requirements apply. Understanding potential government assistance alongside your deposit, construction costs and loan repayments can help you prepare for a purchase."
      },
      {
        title: "Home Loans for Healthcare and Defence Personnel",
        desc: "Healthcare professionals may have income arrangements involving overtime, penalty rates or roster-based allowances. Defence personnel may also have employment-related circumstances that require consideration during the loan assessment process. Mortgage Xperts compares relevant lender policies and explores suitable lending options based on the borrower's actual income, employment and financial circumstances."
      },
      {
        title: "Top End Property Lending & Cyclone Insurance",
        desc: "Lenders assess property construction types, location zoning, and insurance requirements differently in tropical and regional NT. We ensure your loan is structured correctly from pre-approval to settlement."
      },
      {
        title: "Personalised Consultations Across the NT",
        desc: "Whether you are purchasing a home in Darwin, building in Palmerston or exploring a property purchase elsewhere in the Territory, we provide consultations by phone and online. Request your free mortgage assessment with Mortgage Xperts."
      }
    ],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first home buyers, healthcare professionals, defence personnel, homeowners, investors and self-employed borrowers across Darwin, Palmerston and regional Northern Territory.",
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Top End Property Lending", desc: "Expert assessment for Darwin, Palmerston, and regional NT property purchases and construction." },
      { iconKey: "MapPin", title: "Darwin & Regional NT", desc: "Supporting buyers across Darwin metro, Palmerston, Katherine, Alice Springs, and regional centres." },
      { iconKey: "Home", title: "Homegrown Territory Grant", desc: "Navigating the $50,000 NT first home buyer grant for new builds and qualifying homes." },
      { iconKey: "Users", title: "Healthcare & Defence Experts", desc: "Specialist lender channels for ADF defence personnel, medical professionals, and shift workers." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for NT clients." },
    ],
    nearbyAreas: ["Palmerston", "Alice Springs", "Katherine", "Tennant Creek", "Nhulunbuy"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757"
  }
};
