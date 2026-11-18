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
    tagline: "WA's Hottest Market. Smart Lending.",
    medianHousePrice: "$748K",
    avgLoanSize: "$520K",
    approvalRate: "93%",
    clientsHelped: "250+",
    marketInsight: "Perth's Mining-Driven Boom Requires Lenders Who Understand WA Income",
    marketDetail: "Perth's property market is unique — many buyers work FIFO (fly-in-fly-out) jobs with irregular income structures. We work with lenders who understand WA income types and can assess FIFO earnings, contract work and mining bonuses accurately.",
    suburbs: ["Subiaco", "Fremantle", "Joondalup", "Rockingham", "Mandurah", "Armadale", "Midland", "Cannington", "Stirling", "Wanneroo", "Gosnells", "Canning Vale"],
    officeAddress: "Level 3, 140 St Georges Terrace, Perth WA 6000",
    officePhone: "0450 240 757",
    localTips: [
      { title: "FIFO Income Assessment", desc: "Many WA lenders don't understand FIFO earnings — we work with lenders who correctly assess all fly-in-fly-out income types." },
      { title: "WA Stamp Duty Thresholds", desc: "WA first home buyers receive exemptions below $430K and concessions up to $530K — we ensure you benefit fully." },
      { title: "Regional WA Properties", desc: "Lending for Pilbara, Kimberley and South West WA properties has specific lender requirements — we know who to approach." },
      { title: "Mining Wealth Strategy", desc: "We help high-income mining workers structure loans that maximise deductions and build wealth through property portfolios." },
    ],
    uniqueAdvantages: [
      { iconKey: "Shield", title: "FIFO Income Experts", desc: "Specialist lender access for fly-in-fly-out workers, contractors and resource industry employees." },
      { iconKey: "MapPin", title: "All WA Regions", desc: "From Perth metro to the Pilbara, Kimberley and Great Southern — we lend across Western Australia." },
      { iconKey: "Building2", title: "Resource Sector Lending", desc: "Lenders who understand contract and project-based income common in WA's resources economy." },
      { iconKey: "TrendingUp", title: "Growth Market Strategy", desc: "Perth's market growth trajectory remains strong — we help investors position in the right suburbs now." },
      { iconKey: "Home", title: "WA Grant Navigation", desc: "End-to-end management of WA's First Home Owner Grant and stamp duty concession applications." },
      { iconKey: "Award", title: "Nepali Community Support", desc: "Trusted by Perth's growing Nepali community for honest, bilingual mortgage guidance." },
    ],
    nearbyAreas: ["Mandurah", "Peel Region", "South West WA", "Wheatbelt", "Pilbara (remote)"],
    teamLead: {
      name: "Bibek Shrestha",
      title: "Senior Mortgage Broker — Perth Branch",
      image: "/images/team_perth.png",
      bio: "Bibek specialises in WA mining-industry income assessments and has helped 250+ Perth families buy their first home or investment property. He's the go-to broker for FIFO workers across the state."
    }
  },
  adelaide: {
    tagline: "South Australia's Most Trusted Brokers.",
    medianHousePrice: "$718K",
    avgLoanSize: "$490K",
    approvalRate: "95%",
    clientsHelped: "200+",
    marketInsight: "Adelaide: Australia's Most Accessible Capital City Market",
    marketDetail: "Adelaide's property market has outperformed expectations — driven by interstate migration, defence industry investment and lifestyle appeal. Our Adelaide brokers know which lenders offer the best rates for SA properties and how to maximise your borrowing power in this market.",
    suburbs: ["Glenelg", "Norwood", "Prospect", "Salisbury", "Morphett Vale", "Tea Tree Gully", "Marion", "Campbelltown", "Golden Grove", "Mount Barker", "Port Adelaide", "Unley"],
    officeAddress: "Level 1, 45 Grenfell Street, Adelaide SA 5000",
    officePhone: "0450 240 757",
    localTips: [
      { title: "SA First Home Owner Grant", desc: "Eligible SA first home buyers can access a $15,000 FHOG for new builds — we check and apply on your behalf." },
      { title: "Affordable Entry Points", desc: "Adelaide's median is still well below Sydney and Melbourne — making it easier to enter the market with a smaller deposit." },
      { title: "Defence Sector Lending", desc: "With significant RAAF and naval presence in Adelaide, we assist defence personnel with specific lending entitlements." },
      { title: "SA Stamp Duty Concessions", desc: "SA abolished stamp duty for eligible first home buyers in 2023 — we ensure all new buyers benefit from this change." },
    ],
    uniqueAdvantages: [
      { iconKey: "Home", title: "Affordable Market Entry", desc: "Adelaide's property values make borrowing more accessible — we help clients enter the market sooner." },
      { iconKey: "Award", title: "SA Grant Specialists", desc: "End-to-end First Home Owner Grant and stamp duty concession management for South Australian buyers." },
      { iconKey: "Shield", title: "Defence Sector Lending", desc: "Specific lender relationships for RAAF, Navy and Army personnel based in and around Adelaide." },
      { iconKey: "TrendingUp", title: "Growth Suburb Expertise", desc: "We know which Adelaide suburbs are set to outperform — ideal for first and repeat buyers alike." },
      { iconKey: "MapPin", title: "Hills and Barossa Access", desc: "We lend across metro Adelaide, the Adelaide Hills, McLaren Vale and Barossa Valley regions." },
      { iconKey: "Users", title: "Community-Focused", desc: "Adelaide's close-knit community deserves a local broker who understands South Australian life." },
    ],
    nearbyAreas: ["Adelaide Hills", "Barossa Valley", "McLaren Vale", "Fleurieu Peninsula", "Yorke Peninsula"],
    teamLead: {
      name: "Priya Karmacharya",
      title: "Senior Mortgage Broker — Adelaide Branch",
      image: "/images/team_adelaide.png",
      bio: "Priya has 5 years of South Australian mortgage experience and specialises in first home buyer grants, affordable property purchases, and defence sector lending throughout the Adelaide metro area."
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
