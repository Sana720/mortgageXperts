import { CityData } from "./ClientPage";

export const cityDataMap: Record<string, CityData> = {
  sydney: {
    city: "Sydney",
    state: "New South Wales",
    stateShort: "NSW",
    slug: "sydney",
    tagline: "Expert Brokers. Sydney-Smart Strategy.",
    description:
      "Sydney's property market is one of the most competitive in the world. Our Sydney-based mortgage brokers have deep knowledge of the local lending landscape — from the inner west to the Northern Beaches — to help you secure the right loan at the best rate.",
    heroImage: "/images/sydney_real.png",
    accentColor: "#2563EB",
    accentLight: "#EFF6FF",
    accentDark: "#1e3a8a",
    medianHousePrice: "$1.42M",
    avgLoanSize: "$890K",
    approvalRate: "94%",
    clientsHelped: "600+",
    marketInsight: "Sydney's Competitive Market Demands the Right Lender",
    marketDetail:
      "With Sydney's median house price sitting above $1.4M, navigating lenders who allow higher LVRs and offer competitive rates for high-value loans is critical. Our brokers know which lenders treat Sydney properties favourably.",
    suburbs: [
      "Parramatta", "Chatswood", "Bondi", "Strathfield", "Burwood", "Liverpool",
      "Penrith", "Castle Hill", "Blacktown", "Hurstville", "Campbelltown", "Manly",
      "Ryde", "Hornsby", "Epping", "Macquarie Park", "Rhodes", "Auburn",
      "Bankstown", "Marrickville", "Newtown", "Surry Hills", "Randwick", "Coogee",
      "Cronulla", "Miranda", "Baulkham Hills", "Kellyville", "Richmond", "Kensington"
    ],
    localTips: [
      { title: "Stamp Duty Savings", desc: "NSW offers stamp duty exemptions for first home buyers on properties under $800K — our brokers ensure you claim every concession." },
      { title: "High-Value Loan Access", desc: "We work with lenders who specialize in Sydney's $1M+ property segment with more flexible LVR policies." },
      { title: "First Home Guarantee", desc: "Eligible Sydney buyers can purchase with a 5% deposit with no LMI via the federal scheme — we manage the whole process." },
      { title: "Nepali Community Focus", desc: "We proudly serve Sydney's large Nepali community with multilingual support and culturally aware loan advice." },
    ],
    teamLead: {
      name: "Arjun Thapa",
      title: "Senior Mortgage Broker — Sydney Branch",
      image: "/images/team_sydney.png",
      bio: "Arjun has helped over 600 Sydney families secure home loans over 8 years in the industry. A specialist in high-value inner-city and western Sydney properties, he navigates complex lending scenarios with confidence.",
    },
    uniqueAdvantages: [
      { iconKey: "MapPin", title: "Sydney Market Knowledge", desc: "Deep expertise in inner-west, northern beaches, western Sydney and CBD property lending nuances." },
      { iconKey: "Users", title: "Multilingual Team", desc: "We assist Sydney's diverse communities in English, Nepali, Hindi, and more — no lost-in-translation delays." },
      { iconKey: "TrendingUp", title: "High LVR Specialists", desc: "Access to lenders who lend up to 95% LVR on Sydney properties without excessive LMI loading." },
      { iconKey: "Clock", title: "Same-Day Assessment", desc: "Submit your details online and receive a same-day borrowing capacity assessment." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "We are paid by the lender — you pay absolutely nothing for our expert advisory service." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare 40+ banks and non-bank lenders to find the sharpest rate for your Sydney property." },
    ],
    nearbyAreas: ["Blue Mountains", "Central Coast", "Illawarra", "Hunter Valley", "Southern Highlands"],
    officeAddress: "Level 5, 1 Market Street, Sydney NSW 2000",
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
    tagline: "Queensland's Fastest-Growing Market. Our Home.",
    description:
      "Brisbane is booming — fuelled by the 2032 Olympics pipeline and interstate migration. Our Brisbane brokers are embedded in the local market, helping buyers, investors and refinancers capitalise on QLD's incredible growth story.",
    heroImage: "/images/brisbane_real.png",
    accentColor: "#D97706",
    accentLight: "#FFFBEB",
    accentDark: "#92400e",
    medianHousePrice: "$862K",
    avgLoanSize: "$580K",
    approvalRate: "96%",
    clientsHelped: "400+",
    marketInsight: "Brisbane's Olympic Growth Boom Needs a Broker Who Moves Fast",
    marketDetail:
      "Queensland property prices have surged over 40% in 3 years. Brisbane investors and first home buyers need a broker who can quickly assess lender valuations, navigate LMI for growth suburbs, and lock in pre-approvals before properties are snapped up.",
    suburbs: [
      "Fortitude Valley", "Chermside", "Carindale", "Sunnybank", "Aspley", "Mt Gravatt",
      "Toowong", "Indooroopilly", "Logan", "Ipswich", "Redcliffe", "Strathpine",
      "South Brisbane", "West End", "New Farm", "Paddington", "Kangaroo Point", "Hamilton",
      "Ascot", "Nundah", "Kedron", "Stafford", "Coorparoo", "Carina", "Annerley",
      "Moorooka", "Eight Mile Plains", "Calamvale", "Gold Coast", "Sunshine Coast"
    ],
    localTips: [
      { title: "QLD First Home Owner Grant", desc: "$30,000 grant available for eligible first home buyers building a new home in Queensland — we manage the entire application." },
      { title: "Olympic Infrastructure Zones", desc: "Properties near Olympic precincts and new infrastructure corridors are lender favourites — we know which postcodes to target." },
      { title: "Interstate Buyer Support", desc: "Many Brisbane buyers are relocating from Sydney and Melbourne — we handle interstate purchases remotely with full support." },
      { title: "Investment Loan Strategy", desc: "Brisbane's rental yields are among Australia's best. We structure interest-only and investment loan packages to maximise returns." },
    ],
    teamLead: {
      name: "Ramesh Gurung",
      title: "Senior Mortgage Broker — Brisbane Branch",
      image: "/images/team_brisbane.png",
      bio: "Ramesh has guided over 400 Queensland families through the home buying process. He specialises in QLD government grants, investor lending and helping interstate migrants settle into Brisbane.",
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Olympic Growth Expertise", desc: "We identify lender-preferred Olympic corridor suburbs and structure loans to maximise capital growth potential." },
      { iconKey: "MapPin", title: "Southeast QLD Network", desc: "From Brisbane CBD to Gold Coast and Sunshine Coast — we service all of South East Queensland." },
      { iconKey: "Home", title: "$30K FHOG Specialists", desc: "We manage Queensland's First Home Owner Grant applications end-to-end with zero paperwork stress." },
      { iconKey: "Users", title: "Interstate Relocation", desc: "Helping Sydney and Melbourne buyers purchase in Brisbane remotely — fully digital, no need to fly up." },
      { iconKey: "Shield", title: "Investor Loan Experts", desc: "Interest-only and investment structuring tailored to Brisbane's exceptional rental yield market." },
      { iconKey: "Award", title: "Same-Day Response", desc: "In Brisbane's fast-moving market, speed matters — we respond same day, every day." },
    ],
    nearbyAreas: ["Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich", "Logan", "Moreton Bay"],
    officeAddress: "Level 4, 333 Adelaide Street, Brisbane QLD 4000",
    officePhone: "0450 240 757",
  },

  perth: {
    city: "Perth",
    state: "Western Australia",
    stateShort: "WA",
    slug: "perth",
    tagline: "WA's Hottest Market. Smart Lending.",
    description:
      "Perth has recorded some of Australia's strongest property price growth in recent years, driven by mining boom wealth, interstate migration, and limited housing stock. Our Perth brokers understand WA's unique lending landscape and lender appetite.",
    heroImage: "/images/perth_real.png",
    accentColor: "#059669",
    accentLight: "#ECFDF5",
    accentDark: "#065f46",
    medianHousePrice: "$748K",
    avgLoanSize: "$520K",
    approvalRate: "93%",
    clientsHelped: "250+",
    marketInsight: "Perth's Mining-Driven Boom Requires Lenders Who Understand WA Income",
    marketDetail:
      "Perth's property market is unique — many FIFO workers have irregular incomes. We work with lenders who understand WA income types and assess FIFO earnings accurately.",
    suburbs: [
      "Subiaco", "Fremantle", "Joondalup", "Rockingham", "Mandurah", "Armadale",
      "Midland", "Cannington", "Stirling", "Wanneroo", "Gosnells", "Canning Vale",
      "East Perth", "West Perth", "Northbridge", "South Perth", "Victoria Park", "Baldivis",
      "Scarborough", "Morley", "Ellenbrook", "Nedlands", "Claremont", "Cottesloe",
      "Duncraig", "Cockburn Central", "Success", "Thornlie", "Maddington", "Bayswater"
    ],
    localTips: [
      { title: "FIFO Income Assessment", desc: "Many WA lenders don't understand FIFO earnings — we work with lenders who correctly assess all fly-in-fly-out income types." },
      { title: "WA Stamp Duty Thresholds", desc: "WA first home buyers receive exemptions below $430K and concessions up to $530K — we ensure you benefit fully." },
      { title: "Regional WA Properties", desc: "Lending for Pilbara, Kimberley and South West WA properties has specific lender requirements — we know who to approach." },
      { title: "Mining Wealth Strategy", desc: "We help high-income mining workers structure loans that maximise deductions and build wealth through property portfolios." },
    ],
    teamLead: {
      name: "Bibek Shrestha",
      title: "Senior Mortgage Broker — Perth Branch",
      image: "/images/team_perth.png",
      bio: "Bibek specialises in WA mining-industry income assessments and has helped 250+ Perth families buy their first home or investment property. He's the go-to broker for FIFO workers across the state.",
    },
    uniqueAdvantages: [
      { iconKey: "Shield", title: "FIFO Income Experts", desc: "Specialist lender access for fly-in-fly-out workers, contractors and resource industry employees." },
      { iconKey: "MapPin", title: "All WA Regions", desc: "From Perth metro to the Pilbara, Kimberley and Great Southern — we lend across Western Australia." },
      { iconKey: "Building2", title: "Resource Sector Lending", desc: "Lenders who understand contract and project-based income common in WA's resources economy." },
      { iconKey: "TrendingUp", title: "Growth Market Strategy", desc: "Perth's market growth trajectory remains strong — we help investors position in the right suburbs now." },
      { iconKey: "Home", title: "WA Grant Navigation", desc: "End-to-end management of WA's First Home Owner Grant and stamp duty concession applications." },
      { iconKey: "Award", title: "Nepali Community Support", desc: "Trusted by Perth's growing Nepali community for honest, bilingual mortgage guidance." },
    ],
    nearbyAreas: ["Mandurah", "Peel Region", "South West WA", "Wheatbelt", "Pilbara (remote)"],
    officeAddress: "Level 3, 140 St Georges Terrace, Perth WA 6000",
    officePhone: "0450 240 757",
  },

  adelaide: {
    city: "Adelaide",
    state: "South Australia",
    stateShort: "SA",
    slug: "adelaide",
    tagline: "South Australia's Most Trusted Brokers.",
    description:
      "Adelaide is one of Australia's most affordable capital cities for property — and it's growing fast. Our Adelaide brokers know SA's unique lending environment, government grants, and the suburbs with the strongest growth prospects.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#DC2626",
    accentLight: "#FEF2F2",
    accentDark: "#7f1d1d",
    medianHousePrice: "$718K",
    avgLoanSize: "$490K",
    approvalRate: "95%",
    clientsHelped: "200+",
    marketInsight: "Adelaide: Australia's Most Accessible Capital City Market",
    marketDetail:
      "Adelaide's property market has outperformed expectations — driven by interstate migration, defence industry investment and lifestyle appeal. Our Adelaide brokers know which lenders offer the best rates for SA properties.",
    suburbs: [
      "Glenelg", "Norwood", "Prospect", "Salisbury", "Morphett Vale", "Tea Tree Gully",
      "Marion", "Campbelltown", "Golden Grove", "Mount Barker", "Port Adelaide", "Unley",
      "North Adelaide", "Adelaide Hills", "Mawson Lakes", "Hallett Cove", "Brighton", "Henley Beach",
      "Semaphore", "Gawler", "Elizabeth", "Modbury", "Magill", "Burnside", "Mitcham",
      "Goodwood", "Stirling", "Blackwood", "Seaford", "Aldinga"
    ],
    localTips: [
      { title: "SA First Home Owner Grant", desc: "Eligible SA first home buyers can access a $15,000 FHOG for new builds — we check and apply on your behalf." },
      { title: "Affordable Entry Points", desc: "Adelaide's median is still well below Sydney and Melbourne — making it easier to enter the market with a smaller deposit." },
      { title: "Defence Sector Lending", desc: "With significant RAAF and naval presence in Adelaide, we assist defence personnel with specific lending entitlements." },
      { title: "SA Stamp Duty Concessions", desc: "SA abolished stamp duty for eligible first home buyers in 2023 — we ensure all new buyers benefit from this change." },
    ],
    teamLead: {
      name: "Priya Karmacharya",
      title: "Senior Mortgage Broker — Adelaide Branch",
      image: "/images/team_adelaide.png",
      bio: "Priya has 5 years of South Australian mortgage experience and specialises in first home buyer grants, affordable property purchases, and defence sector lending throughout the Adelaide metro area.",
    },
    uniqueAdvantages: [
      { iconKey: "Home", title: "Affordable Market Entry", desc: "Adelaide's property values make borrowing more accessible — we help clients enter the market sooner." },
      { iconKey: "Award", title: "SA Grant Specialists", desc: "End-to-end First Home Owner Grant and stamp duty concession management for South Australian buyers." },
      { iconKey: "Shield", title: "Defence Sector Lending", desc: "Specific lender relationships for RAAF, Navy and Army personnel based in and around Adelaide." },
      { iconKey: "TrendingUp", title: "Growth Suburb Expertise", desc: "We know which Adelaide suburbs are set to outperform — ideal for first and repeat buyers alike." },
      { iconKey: "MapPin", title: "Hills and Barossa Access", desc: "We lend across metro Adelaide, the Adelaide Hills, McLaren Vale and Barossa Valley regions." },
      { iconKey: "Users", title: "Community-Focused", desc: "Adelaide's close-knit community deserves a local broker who understands South Australian life." },
    ],
    nearbyAreas: ["Adelaide Hills", "Barossa Valley", "McLaren Vale", "Fleurieu Peninsula", "Yorke Peninsula"],
    officeAddress: "Level 1, 45 Grenfell Street, Adelaide SA 5000",
    officePhone: "0450 240 757",
  },

  canberra: {
    city: "Canberra",
    state: "Australian Capital Territory",
    stateShort: "ACT",
    slug: "canberra",
    tagline: "ACT Home Loans. Expert Federal Sector Strategy.",
    description:
      "Canberra's property market is highly influenced by public sector employment. Our Canberra mortgage brokers help public servants, first home buyers and investors find tailored home loans with competitive rates.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#0284C7",
    accentLight: "#F0F9FF",
    accentDark: "#0c4a6e",
    medianHousePrice: "$840K",
    avgLoanSize: "$590K",
    approvalRate: "94%",
    clientsHelped: "150+",
    marketInsight: "ACT's Stable Public Sector Market Requires Professional Structuring",
    marketDetail:
      "Canberra buyers enjoy high average incomes but face unique local land lease laws and ACT-specific stamp duty concessions. We specialize in public sector employee home loan benefits.",
    suburbs: [
      "Civic", "Belconnen", "Gungahlin", "Tuggeranong", "Woden", "Kingston", "Manuka", "Queanbeyan", "Yass", "Goulburn",
      "Bruce", "Dickson", "Braddon", "Acton", "Turner", "O'Connor", "Lyneham", "Ainslie", "Campbell", "Barton",
      "Yarralumla", "Deakin", "Narrabundah", "Fyshwick", "Phillip", "Mawson", "Kambah", "Wanniassa", "Ngunnawal", "Franklin"
    ],
    localTips: [
      { title: "Public Sector Entitlements", desc: "Some lenders offer specialized underwriting terms or interest discounts for permanent government employees." },
      { title: "ACT Stamp Duty Concessions", desc: "ACT has a duty concession scheme for owner-occupiers based on income thresholds — we check your eligibility." },
      { title: "Cross-Border Buyers", desc: "Buying in Queanbeyan or Murrumbateman while working in Canberra? We navigate the NSW vs ACT compliance rules easily." },
      { title: "Nepali Community Support", desc: "Expert guidance in English, Nepali and Hindi for ACT first home buyers." }
    ],
    teamLead: {
      name: "Ramesh Gurung",
      title: "Senior Mortgage Broker — Canberra Branch",
      image: "/images/team_brisbane.png",
      bio: "Ramesh guides ACT families through the home buying process, specializing in federal sector guidelines, first home buyer grants, and investment portfolio structuring."
    },
    uniqueAdvantages: [
      { iconKey: "Award", title: "Government Employee Experts", desc: "Specialist lender channels for federal and territory public servants." },
      { iconKey: "MapPin", title: "ACT & NSW Coverage", desc: "Serving Canberra metro and surrounding NSW regional areas." },
      { iconKey: "Home", title: "ACT Grant Navigation", desc: "We manage first home concessions and land rent scheme options." }
    ],
    nearbyAreas: ["Queanbeyan", "Gundaroo", "Yass", "Murrumbateman"],
    officeAddress: "Level 5, 15 London Circuit, Canberra ACT 2601",
    officePhone: "0450 240 757"
  },

  hobart: {
    city: "Hobart",
    state: "Tasmania",
    stateShort: "TAS",
    slug: "hobart",
    tagline: "Tasmanian Home Loans. Local Strategy.",
    description:
      "Tasmania's property market offers unique lifestyle appeal and strong yields. Our Hobart mortgage brokers help local families, first home buyers and interstate investors secure competitive home loans with ease.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#7C3AED",
    accentLight: "#F5F3FF",
    accentDark: "#4c1d95",
    medianHousePrice: "$650K",
    avgLoanSize: "$450K",
    approvalRate: "95%",
    clientsHelped: "100+",
    marketInsight: "Hobart's Lifestyle Appeal and Strong Local Demand",
    marketDetail:
      "With growing demand across southern Tasmania, securing a fast pre-approval is crucial. We compare 40+ lenders to locate the best Tasmanian home loan options.",
    suburbs: [
      "Sandy Bay", "Glenorchy", "Kingston", "Howrah", "Bellerive", "New Town", "North Hobart", "Moonah", "Margate", "Sorell",
      "West Hobart", "South Hobart", "Battery Point", "Lenah Valley", "Lutana", "Derwent Park", "Claremont", "Chigwell", "Lindisfarne", "Rosny",
      "Warrane", "Mornington", "Lauderdale", "Rokeby", "Blackmans Bay", "Taroona", "Huonville", "Richmond", "New Norfolk", "Brighton"
    ],
    localTips: [
      { title: "TAS First Home Incentives", desc: "Tasmania offers generous stamp duty concessions for first home buyers purchasing established properties." },
      { title: "Regional Hobart LVRs", desc: "Some lenders apply postcode limits in regional TAS — we know which institutions lend up to 95% LVR here." }
    ],
    teamLead: {
      name: "Bibek Shrestha",
      title: "Senior Mortgage Broker — Hobart Branch",
      image: "/images/team_perth.png",
      bio: "Bibek has helped dozens of Tasmanian families secure competitive finance, specializing in first home grants and regional lending policies."
    },
    uniqueAdvantages: [
      { iconKey: "Home", title: "Tasmanian Local Experts", desc: "Deep understanding of Hobart, Launceston and regional TAS lending policies." },
      { iconKey: "Shield", title: "Stamp Duty Savings", desc: "Maximizing TAS state concessions for first-time buyers." }
    ],
    nearbyAreas: ["Launceston", "Devonport", "Burnie", "Kingborough", "Huon Valley"],
    officeAddress: "Level 1, 111 Macquarie Street, Hobart TAS 7000",
    officePhone: "0450 240 757"
  },

  darwin: {
    city: "Darwin",
    state: "Northern Territory",
    stateShort: "NT",
    slug: "darwin",
    tagline: "Top End Home Loans. Territory-Specific Lending.",
    description:
      "The Northern Territory property market offers high rental yields and affordable entry points. Our Darwin mortgage brokers understand the NT market, government incentives, and regional income requirements.",
    heroImage: "/images/adelaide_real.png",
    accentColor: "#059669",
    accentLight: "#ECFDF5",
    accentDark: "#065f46",
    medianHousePrice: "$580K",
    avgLoanSize: "$420K",
    approvalRate: "93%",
    clientsHelped: "90+",
    marketInsight: "Darwin's High Yield and Territory Incentives",
    marketDetail:
      "Darwin is a popular choice for property investors seeking strong rental yields. We navigate NT first home owner grants and help FIFO workers structure their home loans.",
    suburbs: [
      "Palmerston", "Casuarina", "Larrakeyah", "Nightcliff", "Rapid Creek", "Fannie Bay", "Stuart Park", "Rosebery", "Howard Springs", "Humpty Doo",
      "Darwin City", "Parap", "Cullen Bay", "Bayview", "Woolner", "The Gardens", "Ludmilla", "Coconut Grove", "Millner", "Jingili",
      "Alawa", "Wanguri", "Leanyer", "Karama", "Malak", "Wulagi", "Anula", "Marrara", "Berrimah", "Bakewell"
    ],
    localTips: [
      { title: "NT Government Grants", desc: "Access the Northern Territory First Home Owner Grant and local territory concessions easily with our guidance." },
      { title: "High Yield Structuring", desc: "Maximize your portfolio returns using Darwin's high rental yield conditions." }
    ],
    teamLead: {
      name: "Sunita Rai",
      title: "Senior Mortgage Broker — Darwin Branch",
      image: "/images/team_melbourne.png",
      bio: "Sunita understands NT's property landscape and FIFO/defense sector income assessments to help clients secure competitive rates."
    },
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "High Yield Portfolios", desc: "Expert structuring to capitalize on Darwin's excellent investment returns." },
      { iconKey: "Shield", title: "Territory Grant Navigation", desc: "Ensuring you receive all available NT government incentives." }
    ],
    nearbyAreas: ["Palmerston", "Alice Springs", "Katherine", "Tennant Creek", "Nhulunbuy"],
    officeAddress: "Level 2, 24 Mitchell Street, Darwin NT 0800",
    officePhone: "0450 240 757"
  }
};
