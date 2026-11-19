"use client";
import React, { useState, useEffect } from "react";
import { CityData } from "../branches/[city]/ClientPage";
import { Building2, MapPin, Phone, Award, Shield, AlertCircle } from "lucide-react";

interface Props {
  rawValue: unknown;
  onChange: (data: Partial<CityData>) => void;
  citySlug: string;
}


const DEFAULT_CITIES: Record<string, Partial<CityData>> = {
  sydney: {
    tagline: "Personalised Home Loan Solutions",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Understanding Home Loans in Sydney",
    marketDetail: "Sydney property buyers can face very different financing requirements depending on whether they are purchasing an apartment, established house, townhouse or newly constructed home. For apartment buyers, lenders may consider factors such as property size, location, building characteristics and strata information. For borrowers purchasing a higher-value home, deposit requirements, loan-to-value ratio and Lenders Mortgage Insurance (LMI) may become particularly important. Mortgage Xperts compares suitable home loan products and lending policies across our lender panel, helping you understand the financing implications of your chosen property and financial position.",
    suburbs: ["Parramatta", "Chatswood", "Bondi", "Strathfield", "Burwood", "Liverpool", "Penrith", "Castle Hill", "Blacktown", "Hurstville", "Campbelltown", "Manly"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "MapPin", title: "Sydney Market Understanding", desc: "Expert guidance on apartment strata requirements, established houses, and new constructions across Greater Sydney." },
      { iconKey: "Users", title: "Multilingual Guidance", desc: "We proudly assist clients in English, Nepali and Hindi, offering accessible advice tailored to your circumstances." },
      { iconKey: "TrendingUp", title: "Tailored Loan Structuring", desc: "Careful assessment of deposit requirements, loan-to-value ratios (LVR) and potential LMI concessions." },
      { iconKey: "Clock", title: "Prompt Assessments", desc: "Request your free assessment online for rapid review of your borrowing capacity and loan options." },
      { iconKey: "Shield", title: "No Client Fees", desc: "Our residential mortgage advisory service is paid by the lender, with zero fees charged to you." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare suitable loan products and policies across 40+ leading Australian banks and lenders." },
    ],
    nearbyAreas: ["Blue Mountains", "Central Coast", "Illawarra", "Hunter Valley", "Southern Highlands"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to healthcare professionals, first-home buyers, homeowners and property investors across Greater Sydney, New South Wales and Australia-wide."
    }
  },
  melbourne: {
    tagline: "Local Expertise. Melbourne-Specific Lending.",
    medianHousePrice: "$942K",
    avgLoanSize: "$620K",
    approvalRate: "95%",
    clientsHelped: "500+",
    marketInsight: "Melbourne Offers Opportunity — If You Have the Right Strategy",
    marketDetail: "Melbourne's property market is recovering with strong growth in the inner suburbs. Our Melbourne brokers know the VIC stamp duty thresholds, grant eligibility rules and which lenders offer the best rates for apartments vs houses.",
    suburbs: ["Richmond", "Fitzroy", "Brunswick", "Doncaster", "Dandenong", "Frankston", "Craigieburn", "Werribee", "Box Hill", "Clayton", "Footscray", "Moonee Ponds"],
    officeAddress: "Level 2, 459 Collins Street, Melbourne VIC 3000",
    officePhone: "0450 240 757",
    localTips: [
      { title: "VIC Stamp Duty Concessions", desc: "Victorian first home buyers are exempt from stamp duty on homes under $600K and receive concessions up to $750K." },
      { title: "First Home Owner Grant", desc: "Eligible VIC buyers of new properties outside Melbourne can access a $10,000 FHOG — we handle the eligibility check." },
      { title: "Apartment vs House Lending", desc: "Some Melbourne lenders treat apartments differently — we identify which lenders value your property type most favourably." },
      { title: "Outer Suburb Growth Zones", desc: "Areas like Craigieburn, Wyndham and Pakenham offer strong yields — we can structure investment loans for these corridors." },
    ],
    uniqueAdvantages: [
      { iconKey: "MapPin", title: "All Melbourne Zones", desc: "From bayside to the outer growth corridors — we know every council zone and lender restriction in VIC." },
      { iconKey: "Home", title: "VIC Grant Specialists", desc: "We maximise every available Victorian government incentive for first home buyers and owner-occupiers." },
      { iconKey: "Building2", title: "Apartment Expertise", desc: "Specific lender knowledge for inner-Melbourne apartment lending where postcode restrictions apply." },
      { iconKey: "Clock", title: "Fast Pre-Approval", desc: "48-hour pre-approval turnaround for Melbourne buyers ready to bid at auction." },
      { iconKey: "Shield", title: "No Broker Fees", desc: "Our service is completely free to you — we are remunerated by the lending institution." },
      { iconKey: "CheckCircle2", title: "Nepali Community Hub", desc: "Melbourne's Nepali diaspora trusts Mortgage Xperts for honest, bilingual mortgage support." },
    ],
    nearbyAreas: ["Geelong", "Ballarat", "Bendigo", "Mornington Peninsula", "Yarra Valley"],
    teamLead: {
      name: "Sunita Rai",
      title: "Senior Mortgage Broker — Melbourne Branch",
      image: "/images/team_melbourne.png",
      bio: "Sunita brings 7 years of Melbourne mortgage experience with a specialisation in VIC grant applications, first home buyers and refinancing strategies for the middle-ring suburbs."
    }
  },
  brisbane: {
    tagline: "Home Loans for Buyers, Owners and Investors",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Buying Established Homes and New Builds in Brisbane",
    marketDetail: "A borrower purchasing an established home may face different upfront costs and government assistance options from someone purchasing a newly built home or vacant residential land. Construction loans also require additional planning. Depending on the lender, building funds may be released in stages as construction progresses, and repayments during construction may differ from those on a completed-property loan. Mortgage Xperts helps borrowers compare suitable construction, owner-occupier and investment loan options while considering their deposit, income and ongoing expenses.",
    suburbs: ["Fortitude Valley", "Chermside", "Carindale", "Sunnybank", "Aspley", "Mt Gravatt", "Toowong", "Indooroopilly", "Logan", "Ipswich", "Redcliffe", "Strathpine"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Construction & Established Loans", desc: "Expert structuring for both completed properties and staged construction drawdowns across Queensland." },
      { iconKey: "MapPin", title: "Brisbane & QLD Reach", desc: "From Brisbane CBD and middle rings to Logan, Ipswich, Gold Coast, and Sunshine Coast." },
      { iconKey: "Home", title: "Transfer Duty Concession Guidance", desc: "Clear navigation of Queensland established home concessions and new build/land exemptions." },
      { iconKey: "Users", title: "Healthcare Lending Expertise", desc: "Assessing overtime, shift penalties, and LMI waiver eligibility for QLD healthcare professionals." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Comparisons", desc: "We compare options across 40+ leading Australian banks and specialist lenders for Queensland buyers." },
    ],
    nearbyAreas: ["Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich", "Logan", "Moreton Bay"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first-home buyers, healthcare professionals, existing homeowners and property investors across Brisbane, Queensland and Australia-wide."
    }
  },
  perth: {
    tagline: "Your Home Loan and Property Finance Partner",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Perth Home Loans, Construction Finance and Investment Lending",
    marketDetail:
      "For buyers considering established homes, house and land packages or newly constructed properties, the financing process can vary considerably. An established-property purchase generally involves finance approval and settlement within the agreed contract period. Construction lending may involve separate land and building arrangements, progress payments and additional lender documentation. For investors, important considerations include interest-only versus principal-and-interest repayments, available equity, rental income assessment and the effect of existing debts on borrowing capacity. Mortgage Xperts helps you compare suitable loan structures and understand the financial implications before proceeding.",
    suburbs: ["Subiaco", "Fremantle", "Joondalup", "Rockingham", "Mandurah", "Armadale", "Midland", "Cannington", "Stirling", "Wanneroo", "Gosnells", "Canning Vale"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Construction & Established Loans", desc: "Expert structuring for established homes, house & land packages, and investment lending across WA." },
      { iconKey: "MapPin", title: "Perth & Regional WA", desc: "Supporting buyers throughout Greater Perth, Mandurah, the South West, and regional Western Australia." },
      { iconKey: "Home", title: "WA Transfer Duty Guidance", desc: "Clear navigation of Western Australia first home buyer transfer duty exemptions and concessions." },
      { iconKey: "Users", title: "Healthcare Lending Solutions", desc: "Specialist assessment of shift allowances, overtime, and profession-specific lending benefits." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Comparisons", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for WA clients." },
    ],
    nearbyAreas: ["Mandurah", "Peel Region", "South West WA", "Wheatbelt", "Pilbara (remote)"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first home buyers, nurses, midwives, doctors, property investors, homeowners and self-employed borrowers throughout Perth, Western Australia and nationwide."
    }
  },
  adelaide: {
    tagline: "Home Loans, Refinancing and Property Investment",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Understanding Property Finance in Adelaide",
    marketDetail:
      "Adelaide home buyers may be considering established properties, new residential developments, townhouses or house and land packages. Each purchase type can involve different financial considerations. For established homes, you may need to budget for transfer duty, inspections and other purchasing expenses. For a new build, construction timelines, progress payments and potential changes to building costs can affect your finance requirements. Investors may also need to consider rental income, existing property debt, available equity and the impact of additional repayments on household cash flow. Mortgage Xperts helps borrowers review suitable lending options and understand how these factors affect their financial plans.",
    suburbs: ["Glenelg", "Norwood", "Prospect", "Salisbury", "Morphett Vale", "Tea Tree Gully", "Marion", "Campbelltown", "Golden Grove", "Mount Barker", "Port Adelaide", "Unley"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Established & Construction Finance", desc: "Expert structuring for established homes, house and land packages, and investment properties in SA." },
      { iconKey: "MapPin", title: "Adelaide & Regional SA", desc: "Assisting home buyers across Greater Adelaide, Adelaide Hills, Barossa, and regional South Australia." },
      { iconKey: "Home", title: "SA Stamp Duty Relief Guidance", desc: "Clear advice on qualifying new builds, off-the-plan contracts, and full stamp duty relief exemptions." },
      { iconKey: "Users", title: "Healthcare Lending Solutions", desc: "Navigating shift allowances, overtime, and profession-specific LMI concessions for SA medical workers." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for Adelaide clients." },
    ],
    nearbyAreas: ["Adelaide Hills", "Barossa Valley", "McLaren Vale", "Fleurieu Peninsula", "Yorke Peninsula"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first home buyers, healthcare professionals, homeowners, self-employed borrowers and property investors across Adelaide, regional South Australia and nationwide."
    }
  },
  canberra: {
    tagline: "Home Loans for Professionals and First Home Buyers",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Home Loan Options for Canberra Professionals",
    marketDetail:
      "Canberra borrowers may work in government departments, healthcare services, professional organisations or private businesses. For salaried employees, lenders commonly consider base income, employment arrangements, existing debts and living expenses. For borrowers with variable income, additional documentation may be required. Mortgage Xperts reviews suitable lender assessment policies and helps you understand which income sources can be considered in your loan application. We also assist borrowers purchasing apartments, established homes and investment properties, where lender requirements and property characteristics can affect available finance.",
    suburbs: ["Civic", "Belconnen", "Gungahlin", "Tuggeranong", "Woden", "Kingston", "Manuka", "Queanbeyan", "Yass", "Goulburn"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "Award", title: "Public Sector & Professional Lending", desc: "Specialist lender assessment for federal government, ACT public service, and corporate professionals." },
      { iconKey: "MapPin", title: "Canberra Metro & Surrounds", desc: "Serving buyers across Belconnen, Gungahlin, Woden, Tuggeranong, and surrounding regional areas." },
      { iconKey: "Home", title: "ACT Conveyance Duty Relief", desc: "Navigating the uncapped ACT Home Buyer Concession Scheme to minimise upfront purchasing costs." },
      { iconKey: "Users", title: "Healthcare Lending Solutions", desc: "Assessing shift allowances, overtime, and profession-specific LMI waivers for medical staff." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "TrendingUp", title: "40+ Lender Panel", desc: "We compare options across 40+ leading Australian banks and specialist lenders for ACT borrowers." },
    ],
    nearbyAreas: ["Queanbeyan", "Gundaroo", "Yass", "Murrumbateman"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to public sector employees, healthcare professionals, first home buyers, property investors and self-employed borrowers across Canberra, the ACT and nationwide."
    }
  },
  darwin: {
    tagline: "Property Finance Across the Northern Territory",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Understanding Darwin Property Lending",
    marketDetail:
      "Property financing in Darwin can involve considerations that differ from those associated with buying in other Australian capital cities. Lenders may assess certain property types, locations and building characteristics differently. Appropriate insurance arrangements and ongoing ownership expenses should also be considered when establishing a realistic property budget. For buyers relocating to the Territory, employment arrangements, available savings, existing property ownership and anticipated living costs may influence borrowing capacity. Mortgage Xperts helps borrowers understand these considerations and compare suitable lending options.",
    suburbs: ["Palmerston", "Casuarina", "Larrakeyah", "Nightcliff", "Rapid Creek", "Fannie Bay", "Stuart Park", "Rosebery", "Howard Springs", "Humpty Doo"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Top End Property Lending", desc: "Expert assessment for Darwin, Palmerston, and regional NT property purchases and construction." },
      { iconKey: "MapPin", title: "Darwin & Regional NT", desc: "Supporting buyers across Darwin metro, Palmerston, Katherine, Alice Springs, and regional centres." },
      { iconKey: "Home", title: "Homegrown Territory Grant", desc: "Navigating the $50,000 NT first home buyer grant for new builds and qualifying homes." },
      { iconKey: "Users", title: "Healthcare & Defence Experts", desc: "Specialist lender channels for ADF defence personnel, medical professionals, and shift workers." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for NT clients." },
    ],
    nearbyAreas: ["Palmerston", "Alice Springs", "Katherine", "Tennant Creek", "Nhulunbuy"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to first home buyers, healthcare professionals, defence personnel, homeowners, investors and self-employed borrowers across Darwin, Palmerston and regional Northern Territory."
    }
  },
  hobart: {
    tagline: "Home Loan Guidance Across Tasmania",
    medianHousePrice: "",
    avgLoanSize: "",
    approvalRate: "",
    clientsHelped: "",
    marketInsight: "Financing Established Homes and Investment Properties in Tasmania",
    marketDetail:
      "Buying property in Tasmania can involve lending considerations related to the property's condition, location, construction type and intended use. For example, lenders may request additional information when assessing certain regional properties or homes with unusual construction features. Rural-residential properties may also be subject to different lending policies from standard suburban houses. For investors, lenders generally consider existing debts, rental income, household expenses and the proposed loan structure. Mortgage Xperts compares suitable lending policies and helps borrowers understand the requirements relevant to their chosen property.",
    suburbs: ["Sandy Bay", "Glenorchy", "Kingston", "Howrah", "Bellerive", "New Town", "North Hobart", "Moonah", "Margate", "Sorell"],
    officeAddress: "Online & Australia-Wide",
    officePhone: "0450 240 757",
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
    uniqueAdvantages: [
      { iconKey: "TrendingUp", title: "Established & Investment Loans", desc: "Expert assessment for Hobart homes, regional properties, rural-residential, and investment portfolios." },
      { iconKey: "MapPin", title: "Hobart & Regional TAS", desc: "Assisting clients across Greater Hobart, Launceston, Devonport, Burnie, and rural Tasmania." },
      { iconKey: "Home", title: "Transfer Duty Cost Navigation", desc: "Accurate calculation of upfront settlement costs, duty obligations, and available concessions in TAS." },
      { iconKey: "Users", title: "Healthcare & Shift Work Lending", desc: "Evaluating shift penalties, overtime, and profession-specific LMI waivers for Tasmanian medical staff." },
      { iconKey: "Shield", title: "Zero Broker Fees", desc: "Our standard residential mortgage advisory service is 100% free to you, paid entirely by the lender." },
      { iconKey: "Award", title: "40+ Lender Panel", desc: "We compare loan options across 40+ leading Australian banks and specialist lenders for Tasmanian clients." },
    ],
    nearbyAreas: ["Launceston", "Devonport", "Burnie", "Kingborough", "Huon Valley"],
    teamLead: {
      name: "Aakash K C",
      title: "Founder & Principal Broker",
      image: "/images/aakash_new.png",
      bio: "As the Founder and Principal Broker of Mortgage Xperts, Aakash provides personalised home loan guidance to healthcare professionals, first home buyers, homeowners and property investors across Hobart, Greater Hobart and regional Tasmania."
    }
  }
};

export function BranchCityEditor({ rawValue, onChange, citySlug }: Props) {
  const parsedData = React.useMemo(() => {
    let data: Partial<CityData> = {};
    if (typeof rawValue === "string") {
      try {
        const p = JSON.parse(rawValue);
        if (p && typeof p === "object" && !Array.isArray(p)) {
          data = p;
        }
      } catch {}
    } else if (rawValue && typeof rawValue === "object" && !Array.isArray(rawValue)) {
      data = rawValue as Partial<CityData>;
    }
    
    const defaults = DEFAULT_CITIES[citySlug] || {};
    return { ...defaults, ...data };
  }, [rawValue, citySlug]);

  const [tagline, setTagline] = useState(parsedData.tagline || "");
  const [medianHousePrice, setMedianHousePrice] = useState(parsedData.medianHousePrice || "");
  const [avgLoanSize, setAvgLoanSize] = useState(parsedData.avgLoanSize || "");
  const [approvalRate, setApprovalRate] = useState(parsedData.approvalRate || "");
  const [clientsHelped, setClientsHelped] = useState(parsedData.clientsHelped || "");
  const [marketInsight, setMarketInsight] = useState(parsedData.marketInsight || "");
  const [marketDetail, setMarketDetail] = useState(parsedData.marketDetail || "");
  const [suburbsStr, setSuburbsStr] = useState(Array.isArray(parsedData.suburbs) ? parsedData.suburbs.join(", ") : "");
  const [officeAddress, setOfficeAddress] = useState(parsedData.officeAddress || "");
  const [officePhone, setOfficePhone] = useState(parsedData.officePhone || "");

  // Broker states
  const [brokerName, setBrokerName] = useState(parsedData.teamLead?.name || "");
  const [brokerTitle, setBrokerTitle] = useState(parsedData.teamLead?.title || "");
  const [brokerBio, setBrokerBio] = useState(parsedData.teamLead?.bio || "");
  const [brokerImage, setBrokerImage] = useState(parsedData.teamLead?.image || "");

  // Local Tips (4 items)
  const [localTips, setLocalTips] = useState<{ title: string; desc: string }[]>(
    parsedData.localTips || [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }]
  );

  // Unique Advantages (6 items)
  const [uniqueAdvantages, setUniqueAdvantages] = useState<{ iconKey: string; title: string; desc: string }[]>(
    parsedData.uniqueAdvantages || [
      { iconKey: "Shield", title: "", desc: "" },
      { iconKey: "MapPin", title: "", desc: "" },
      { iconKey: "Building2", title: "", desc: "" },
      { iconKey: "TrendingUp", title: "", desc: "" },
      { iconKey: "Home", title: "", desc: "" },
      { iconKey: "Award", title: "", desc: "" }
    ]
  );

  // Nearby Areas served
  const [nearbyAreasStr, setNearbyAreasStr] = useState(Array.isArray(parsedData.nearbyAreas) ? parsedData.nearbyAreas.join(", ") : "");

  // Sync state variables when switching cities or database values update
  useEffect(() => {
    setTagline(parsedData.tagline || "");
    setMedianHousePrice(parsedData.medianHousePrice || "");
    setAvgLoanSize(parsedData.avgLoanSize || "");
    setApprovalRate(parsedData.approvalRate || "");
    setClientsHelped(parsedData.clientsHelped || "");
    setMarketInsight(parsedData.marketInsight || "");
    setMarketDetail(parsedData.marketDetail || "");
    setSuburbsStr(Array.isArray(parsedData.suburbs) ? parsedData.suburbs.join(", ") : "");
    setOfficeAddress(parsedData.officeAddress || "");
    setOfficePhone(parsedData.officePhone || "");
    setBrokerName(parsedData.teamLead?.name || "");
    setBrokerTitle(parsedData.teamLead?.title || "");
    setBrokerBio(parsedData.teamLead?.bio || "");
    setBrokerImage(parsedData.teamLead?.image || "");
    setLocalTips(parsedData.localTips || [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }]);
    setUniqueAdvantages(parsedData.uniqueAdvantages || [
      { iconKey: "Shield", title: "", desc: "" },
      { iconKey: "MapPin", title: "", desc: "" },
      { iconKey: "Building2", title: "", desc: "" },
      { iconKey: "TrendingUp", title: "", desc: "" },
      { iconKey: "Home", title: "", desc: "" },
      { iconKey: "Award", title: "", desc: "" }
    ]);
    setNearbyAreasStr(Array.isArray(parsedData.nearbyAreas) ? parsedData.nearbyAreas.join(", ") : "");
  }, [parsedData]);

  // Update parent on any form change
  useEffect(() => {
    const suburbs = suburbsStr.split(",").map((s: string) => s.trim()).filter((s: string) => s.length > 0);
    const nearbyAreas = nearbyAreasStr.split(",").map((s: string) => s.trim()).filter((s: string) => s.length > 0);

    onChange({
      slug: citySlug,
      tagline,
      medianHousePrice,
      avgLoanSize,
      approvalRate,
      clientsHelped,
      marketInsight,
      marketDetail,
      suburbs,
      officeAddress,
      officePhone,
      localTips,
      uniqueAdvantages,
      nearbyAreas,
      teamLead: {
        name: brokerName,
        title: brokerTitle,
        bio: brokerBio,
        image: brokerImage
      }
    });
  }, [
    tagline,
    medianHousePrice,
    avgLoanSize,
    approvalRate,
    clientsHelped,
    marketInsight,
    marketDetail,
    suburbsStr,
    officeAddress,
    officePhone,
    brokerName,
    brokerTitle,
    brokerBio,
    brokerImage,
    localTips,
    uniqueAdvantages,
    nearbyAreasStr,
    citySlug
  ]);


  const handleTipChange = (idx: number, field: "title" | "desc", val: string) => {
    const next = [...localTips];
    if (!next[idx]) next[idx] = { title: "", desc: "" };
    next[idx] = { ...next[idx], [field]: val };
    setLocalTips(next);
  };

  const handleAdvChange = (idx: number, field: "title" | "desc", val: string) => {
    const next = [...uniqueAdvantages];
    if (!next[idx]) next[idx] = { iconKey: "Shield", title: "", desc: "" };
    next[idx] = { ...next[idx], [field]: val };
    setUniqueAdvantages(next);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-2">
        <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider font-montserrat">Branch Page CMS Mode</h4>
          <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
            Every section of the city page is editable below. Changes will be saved into the database structure.
          </p>
        </div>
      </div>

      {/* Basic Hero Settings */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">1. Hero & Core Tagline</h3>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Branch Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Median House Price</label>
            <input
              type="text"
              value={medianHousePrice}
              onChange={(e) => setMedianHousePrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Avg Loan Size</label>
            <input
              type="text"
              value={avgLoanSize}
              onChange={(e) => setAvgLoanSize(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Approval Rate</label>
            <input
              type="text"
              value={approvalRate}
              onChange={(e) => setApprovalRate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider">Clients Helped</label>
            <input
              type="text"
              value={clientsHelped}
              onChange={(e) => setClientsHelped(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Market Insight Section */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">2. Local Property Market Insight</h3>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Local Insight Heading</label>
          <input
            type="text"
            value={marketInsight}
            onChange={(e) => setMarketInsight(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Insight Detail Paragraph</label>
          <textarea
            rows={3}
            value={marketDetail}
            onChange={(e) => setMarketDetail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
          />
        </div>
      </div>

      {/* Local Tips (4 items) */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">3. Local Tips & Recommendations (4 Items)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localTips.map((tip, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-slate-150 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Recommendation Card #{idx + 1}</span>
              <div className="space-y-1.5">
                <label className="block text-[9.5px] font-bold text-slate-600 uppercase">Card Title</label>
                <input
                  type="text"
                  value={tip.title}
                  onChange={(e) => handleTipChange(idx, "title", e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9.5px] font-bold text-slate-600 uppercase">Card Description</label>
                <textarea
                  rows={2}
                  value={tip.desc}
                  onChange={(e) => handleTipChange(idx, "desc", e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:border-blue-500 transition-all leading-normal"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unique Advantages (6 items) */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">4. Unique Advantages (6 Items)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          {uniqueAdvantages.map((adv, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-slate-150 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Advantage #{idx + 1}</span>
              <div className="space-y-1.5">
                <label className="block text-[9.5px] font-bold text-slate-600 uppercase">Title</label>
                <input
                  type="text"
                  value={adv.title}
                  onChange={(e) => handleAdvChange(idx, "title", e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[9.5px] font-bold text-slate-600 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={adv.desc}
                  onChange={(e) => handleAdvChange(idx, "desc", e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:border-blue-500 transition-all leading-normal"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broker Profile (Meet the Team Lead) */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">5. Local Broker Profile (Meet the Team Lead)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Broker Name</label>
            <input
              type="text"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              placeholder="e.g. Bibek Shrestha"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Broker Role / Title</label>
            <input
              type="text"
              value={brokerTitle}
              onChange={(e) => setBrokerTitle(e.target.value)}
              placeholder="e.g. Senior Mortgage Broker — Perth Branch"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Broker Bio / Story</label>
          <textarea
            rows={3}
            value={brokerBio}
            onChange={(e) => setBrokerBio(e.target.value)}
            placeholder="Broker's bio and local experience details..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
          />
        </div>

      </div>

      {/* Suburbs & Serving Areas */}
      <div className="space-y-4 border-b border-slate-100 pb-5">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">6. Coverage & Geographic Regions</h3>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Suburbs Served (Comma-separated)</label>
          <input
            type="text"
            value={suburbsStr}
            onChange={(e) => setSuburbsStr(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Also Serving/Nearby Areas (Comma-separated)</label>
          <input
            type="text"
            value={nearbyAreasStr}
            onChange={(e) => setNearbyAreasStr(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Office details */}
      <div className="space-y-4">
        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase tracking-wider">7. Contact & Address Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Office Address</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">Office Phone</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={officePhone}
                onChange={(e) => setOfficePhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
