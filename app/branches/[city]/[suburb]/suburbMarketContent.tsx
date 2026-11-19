import React from "react";

// Suburb Archetypes for unique contextual descriptions
type SuburbArchetype = 
  | "coastal" 
  | "inner-heritage" 
  | "transit-hub" 
  | "family-growth" 
  | "leafy-prestige" 
  | "regional-lifestyle";

interface SuburbTrait {
  archetype: SuburbArchetype;
  highlight: string;
  propertyFocus: string;
  lendingNuance: string;
}

// Tailored traits for prominent suburbs across all cities
const SUBURB_TRAITS: Record<string, SuburbTrait> = {
  // Sydney
  "parramatta": {
    archetype: "transit-hub",
    highlight: "Western Sydney's premier CBD, offering rapid rail links, vibrant commercial districts and extensive educational hubs",
    propertyFocus: "high-density apartments, modern off-the-plan residential towers and commercial-fringe townhouses",
    lendingNuance: "Lender assessments often focus on apartment floor areas, strata fees, high-density postcode lending caps and valuation stability."
  },
  "chatswood": {
    archetype: "transit-hub",
    highlight: "a major North Shore retail, dining and transport nexus with prestigious schools and strong infrastructure",
    propertyFocus: "luxury high-rise apartments, contemporary low-rise developments and established family homes",
    lendingNuance: "Higher median price points mean borrowing limits, loan-to-value ratios (LVR), and specialist high-net-worth lender policies are key."
  },
  "bondi": {
    archetype: "coastal",
    highlight: "world-famous beachfront living, coastal walks, buzzing dining precincts and high capital growth appeal",
    propertyFocus: "coastal art deco apartments, modern beachside duplexes and premium architectural residences",
    lendingNuance: "Marine environment property maintenance, strata sinking fund health and premium property valuations require thorough lender structuring."
  },
  "surry-hills": {
    archetype: "inner-heritage",
    highlight: "vibrant creative culture, historic Victorian streetscapes and celebrated café and culinary hubs",
    propertyFocus: "historic terrace homes, converted warehouse lofts and boutique residential apartments",
    lendingNuance: "Heritage conservation overlays, boundary party-wall considerations and renovation budgeting require specialist lending insights."
  },
  "blacktown": {
    archetype: "family-growth",
    highlight: "one of Sydney's fastest growing family corridors with comprehensive amenities, schools and rail connectivity",
    propertyFocus: "freestanding family homes on generous blocks, modern duplexes and new land developments",
    lendingNuance: "Navigating first-home guarantee schemes, low-deposit lending options and competitive fixed or variable interest rates."
  },
  "castle-hill": {
    archetype: "leafy-prestige",
    highlight: "The Hills district's premier established suburb featuring premier school catchments, Metro links and Castle Towers",
    propertyFocus: "spacious multi-storey family homes, modern townhomes and master-planned master developments",
    lendingNuance: "Upgrader finance, bridging loans, loan portability and accessing existing home equity are critical considerations."
  },

  // Melbourne
  "richmond": {
    archetype: "inner-heritage",
    highlight: "buzzing Swan Street and Bridge Road shopping, proximity to the MCG and premier inner-city transit",
    propertyFocus: "Victorian workers' cottages, converted industrial apartments and contemporary townhouses",
    lendingNuance: "Heritage structural condition reports, renovation loans and strata management assessments play a key role."
  },
  "fitzroy": {
    archetype: "inner-heritage",
    highlight: "renowned bohemian culture, Brunswick Street dining, historic architecture and vibrant creative life",
    propertyFocus: "period terrace houses, boutique warehouse conversions and architectural apartments",
    lendingNuance: "Lender valuations on unique properties and tailored financing for self-employed creatives and professionals."
  },
  "box-hill": {
    archetype: "transit-hub",
    highlight: "an evolving eastern satellite CBD with premier transport interchange, medical precinct and bustling shopping hub",
    propertyFocus: "high-rise residential apartments, newly built townhomes and established quarter-acre family blocks",
    lendingNuance: "Density restrictions, pre-settlement valuations for off-the-plan buyers, and dual-occupancy development loans."
  },
  "werribee": {
    archetype: "family-growth",
    highlight: "a major south-western growth corridor featuring expanding infrastructure, family parklands and convenient rail access",
    propertyFocus: "newly completed house and land packages, modern estate residences and entry-level family homes",
    lendingNuance: "Progress payment schedules for construction loans, Victorian First Home Buyer duty concessions, and low-deposit schemes."
  },

  // Brisbane
  "fortitude-valley": {
    archetype: "inner-heritage",
    highlight: "Brisbane's vibrant entertainment, dining, and James Street fashion precinct just minutes from the CBD",
    propertyFocus: "modern residential towers, character brick warehouse conversions and mixed-use apartments",
    lendingNuance: "Strata title assessments, short-term rental policies and density postcode guidelines among major lenders."
  },
  "chermside": {
    archetype: "transit-hub",
    highlight: "a northern Brisbane focal point anchored by Westfield Chermside, major health facilities and express bus corridors",
    propertyFocus: "modern apartment complexes, townhouse communities and post-war suburban homes",
    lendingNuance: "Lender acceptance for local medical staff overtime and shifts, alongside first-home buyer stamp duty concessions."
  },
  "sunnybank": {
    archetype: "transit-hub",
    highlight: "famed multicultural dining, excellent bus/train transport and close proximity to major universities and hospitals",
    propertyFocus: "substantial family homes, modern subdivisible properties and contemporary duplexes",
    lendingNuance: "Multigenerational living arrangements, strong investor rental returns, and self-employed commercial income assessment."
  },

  // Perth
  "subiaco": {
    archetype: "inner-heritage",
    highlight: "charming heritage streetscapes, Rokeby Road café life, King Edward Memorial Hospital and easy train links to the CBD",
    propertyFocus: "character Federation homes, boutique modern apartments and urban infill townhouses",
    lendingNuance: "Medical professional 90-95% LVR No LMI waivers and renovation financing for historic residences."
  },
  "fremantle": {
    archetype: "coastal",
    highlight: "historic port architecture, coastal breezes, iconic markets and an eclectic maritime arts community",
    propertyFocus: "limestone cottages, industrial heritage conversions, and coastal contemporary homes",
    lendingNuance: "Heritage preservation financing, strata health in converted developments and coastal building insurance requirements."
  },
  "ellenbrook": {
    archetype: "family-growth",
    highlight: "a self-contained master-planned community near the Swan Valley with the new Ellenbrook rail line",
    propertyFocus: "affordable family homes, house and land packages and modern cottage lots",
    lendingNuance: "WA first home owner grants, Keystart comparison vs prime bank 5% deposit schemes, and construction loan stages."
  },

  // Adelaide
  "norwood": {
    archetype: "inner-heritage",
    highlight: "The Parade's premier shopping and dining strip, leafy tree-lined avenues and historic prestige just east of Adelaide CBD",
    propertyFocus: "bluestone and sandstone villas, character cottages and boutique luxury townhouses",
    lendingNuance: "High-value property underwriting, equity access for renovations, and flexible borrowing structures."
  },
  "salisbury": {
    archetype: "family-growth",
    highlight: "an established northern community offering affordable home ownership, extensive transport and proximity to defence and tech hubs",
    propertyFocus: "entry-level family homes on generous allotments, subdivisible blocks and modern developments",
    lendingNuance: "Maximizing borrowing power on essential-worker salaries and leveraging South Australian first-home buyer incentives."
  },
  "mount-barker": {
    archetype: "regional-lifestyle",
    highlight: "a thriving Adelaide Hills township offering country scenery, growing modern amenities and an easy freeway commute",
    propertyFocus: "spacious newly constructed homes, house and land packages and character hill retreats",
    lendingNuance: "Split land and build contracts, SA HomeStart options, and ongoing household travel budgeting."
  },

  // Canberra
  "civic": {
    archetype: "transit-hub",
    highlight: "Canberra's vibrant central city district with light rail access, government departments, ANU and lakeside parks",
    propertyFocus: "modern high-rise apartments, boutique city residences and executive studio units",
    lendingNuance: "ACT Home Buyer Concession full duty relief, apartment size rules and public servant superannuation income structures."
  },
  "belconnen": {
    archetype: "transit-hub",
    highlight: "a major northern hub centered around Lake Ginninderra, the University of Canberra and Calvary Hospital",
    propertyFocus: "lakeside apartments, established 1970s family homes and contemporary townhouses",
    lendingNuance: "Healthcare worker overtime assessments and federal Home Guarantee Scheme 5% deposit pre-approvals."
  },

  // Hobart
  "sandy-bay": {
    archetype: "coastal",
    highlight: "Hobart's premier riverside and coastal suburb, home to UTAS, Derwent River views and prestigious schools",
    propertyFocus: "waterfront architectural estates, heritage Federation homes and modern university-fringe units",
    lendingNuance: "Higher borrowing capacities, private bank policies for high-equity borrowers, and non-standard title valuations."
  },
  "glenorchy": {
    archetype: "family-growth",
    highlight: "a practical northern city corridor offering accessible housing, retail centers and mountain backdrop views",
    propertyFocus: "solid brick family homes, dual-occupancy potential blocks and modern infill townhouses",
    lendingNuance: "Tasmanian 50% stamp duty discount for first home buyers and flexible low-deposit loan structures."
  },

  // Darwin
  "nightcliff": {
    archetype: "coastal",
    highlight: "iconic coastal foreshore sunsets, the Nightcliff markets, walking paths and breezy tropical living",
    propertyFocus: "elevated tropical homes, beachfront apartment complexes and established ground-level residences",
    lendingNuance: "Cyclone and building insurance costs, lender tropical construction policies, and owner-occupier equity release."
  },
  "palmerston": {
    archetype: "family-growth",
    highlight: "the Territory's booming family hub featuring modern amenities, water parks, schools and proximity to Robertson Barracks",
    propertyFocus: "modern four-bedroom family homes, house and land packages and master-planned estates",
    lendingNuance: "Defence force housing schemes, NT Home Buyer grants, and construction loan drawdown management."
  }
};

function getStateAssistanceText(stateShort: string, stateName: string): string {
  switch (stateShort?.toUpperCase()) {
    case "SA":
      return `For first home buyers, we can also help assess deposit requirements and applicable South Australian government assistance. Eligible purchasers of qualifying new homes and off-the-plan apartments may benefit from stamp duty relief, subject to the relevant conditions.`;
    case "NSW":
      return `For first home buyers, we assist in navigating the NSW First Home Buyers Assistance Scheme (FHBAS) for full or partial transfer duty relief, alongside the federal First Home Guarantee (FHBG) to purchase with as little as a 5% deposit without paying Lenders Mortgage Insurance.`;
    case "VIC":
      return `For first home buyers, we help you access Victorian first-home duty exemptions and concessions, explore off-the-plan concession thresholds, and determine eligibility for the federal Home Guarantee Scheme to secure property with a low deposit.`;
    case "QLD":
      return `For first home buyers, we help assess Queensland First Home Concession stamp duty exemptions, regional home grants, and low-deposit schemes that help you step onto the property ladder sooner.`;
    case "WA":
      return `For first home buyers, we guide you through Western Australia's First Home Owner Rate of Duty (FHOR) concessions, Keystart or major bank 5% deposit options, and relevant first home owner grants for newly built residences.`;
    case "ACT":
      return `For first home buyers, we help you understand the ACT Home Buyer Concession Scheme (offering full duty concession for eligible buyers across any property type) and access federal low-deposit guarantee schemes.`;
    case "TAS":
      return `For first home buyers, we assist in reviewing Tasmanian property transfer duty concessions (including the 50% duty discount for established homes within eligible thresholds) and the First Home Owner Grant for new constructions.`;
    case "NT":
      return `For first home buyers, we help navigate Northern Territory first home grants, territory-specific building concessions, and low-deposit lender options suited to the local market.`;
    default:
      return `For first home buyers, we also assist with understanding deposit requirements, state-based stamp duty relief, and national first home guarantee schemes to help you step onto the property ladder with confidence.`;
  }
}

/**
 * Returns tailored market overview content for a specific suburb.
 * Glenelg and Port Adelaide have exact designer-supplied copy.
 * All other suburbs receive unique, localized descriptions based on suburb traits and property dynamics.
 */
export function getSuburbMarketContent(
  suburbName: string,
  cityName: string,
  stateName: string,
  stateShort: string
): React.ReactNode {
  const slug = suburbName.toLowerCase().replace(/\s+/g, "-");

  // 1. Glenelg (Exact Copy from Designer)
  if (slug === "glenelg") {
    return (
      <>
        <p>
          Glenelg offers a distinctive coastal lifestyle, with its beachfront, Jetty Road shopping precinct and convenient access to Adelaide. Whether you are considering an apartment near the waterfront, an established family home or a residential investment, the type of property you choose can influence your home loan options.
        </p>
        <p>
          Buying an apartment in Glenelg may involve additional lending considerations, including strata fees, building characteristics, property valuations and deposit requirements. Buyers considering older homes may need to budget for renovations and ongoing maintenance, while coastal properties can warrant additional attention to insurance costs and property-specific risks. Understanding these expenses alongside your borrowing capacity is important before committing to a purchase.
        </p>
        <p>
          Mortgage Xperts helps Glenelg home buyers, homeowners and property investors navigate these financial decisions. We compare suitable home loans from our panel of more than 40 Australian banks and non-bank lenders, considering interest rates, repayment structures, loan features and individual lending requirements.
        </p>
        <p>
          For first home buyers, we can also help assess deposit requirements and applicable South Australian government assistance. Eligible purchasers of qualifying new homes and off-the-plan apartments may benefit from stamp duty relief, subject to the relevant conditions.
        </p>
        <p>
          We have a particular focus on assisting nurses, midwives, doctors and other healthcare professionals. Where employment income includes regular overtime, shift allowances or penalty rates, we review how different lenders may assess those earnings. We also explore potential Lenders Mortgage Insurance (LMI) concessions for eligible professions.
        </p>
        <p>
          Whether you are purchasing your first Glenelg apartment, upgrading to a family home, reviewing an existing mortgage or financing an investment property, Mortgage Xperts provides personalised assistance from initial assessment through to settlement.
        </p>
        <p className="font-semibold text-[#0B1F3A] pt-1">
          Speak with Aakash K C, Founder and Principal Broker of Mortgage Xperts, for a free home loan assessment.
        </p>
      </>
    );
  }

  // 2. Port Adelaide (Exact Copy from Designer)
  if (slug === "port-adelaide") {
    return (
      <>
        <p>
          Port Adelaide combines historic architecture, an active waterfront and a changing residential landscape. From character homes near the heritage precinct to contemporary townhouses and waterfront apartments around Dock One, buyers can encounter very different property types within the same suburb. Understanding how these differences affect your financing options is an important part of purchasing property in Port Adelaide.
        </p>
        <h3 className="text-lg font-bold text-[#0B1F3A] pt-2">
          Heritage Properties and Waterfront Developments
        </h3>
        <p>
          Port Adelaide&apos;s historic character is one of its defining features. Buyers considering older properties should account for building condition, potential maintenance costs and any heritage restrictions that may affect future renovations. Depending on the property, lenders may require additional information or assessments before approving finance.
        </p>
        <p>
          The waterfront renewal around Dock One and nearby developments has also introduced opportunities for buyers interested in contemporary housing. Purchasing a newly built townhouse or off-the-plan apartment can involve different financing requirements, particularly around contract conditions, property valuations, settlement dates and strata arrangements.
        </p>
        <p>
          For properties near the waterfront, buyers should also consider relevant flood risks, insurance requirements and ongoing ownership expenses. These factors can influence the overall affordability of a purchase.
        </p>
        <h3 className="text-lg font-bold text-[#0B1F3A] pt-2">
          First Home Buyers and Property Investors in Port Adelaide
        </h3>
        <p>
          For first home buyers, comparing an established character home with a newly constructed property involves more than the purchase price. Eligible buyers purchasing qualifying new homes or off-the-plan apartments may access South Australian stamp duty relief, subject to government eligibility requirements.
        </p>
        <p>
          Property investors should also consider rental income assessments, ongoing expenses, existing loan commitments and their preferred repayment structure before purchasing.
        </p>
        <p>
          Mortgage Xperts assists Port Adelaide buyers, homeowners and investors with personalised mortgage guidance. With access to a panel of more than 40 Australian banks and non-bank lenders, we compare suitable home loan products, interest rates, features and lending policies based on your individual circumstances.
        </p>
        <h3 className="text-lg font-bold text-[#0B1F3A] pt-2">
          Home Loans for Healthcare Professionals
        </h3>
        <p>
          We have a particular focus on helping nurses, midwives, doctors and other healthcare professionals understand their home loan options. Where income includes overtime, shift allowances or penalty rates, we assess how suitable lenders may consider those earnings. We also explore potential Lenders Mortgage Insurance (LMI) concessions for eligible professions.
        </p>
        <p>
          Whether you are purchasing a character home, considering a waterfront apartment, refinancing an existing mortgage or expanding your investment portfolio, Mortgage Xperts provides guidance throughout the lending process.
        </p>
        <p className="font-semibold text-[#0B1F3A] pt-1">
          Speak with Aakash K C, Founder and Principal Broker of Mortgage Xperts, for a free home loan assessment.
        </p>
      </>
    );
  }

  // 3. Dynamic Suburb-Specific Narrative for Every Other Suburb
  const trait = SUBURB_TRAITS[slug];
  const stateAssistance = getStateAssistanceText(stateShort, stateName);

  if (trait) {
    return (
      <>
        <p>
          {suburbName} represents a distinctive residential market in {cityName}, recognized for {trait.highlight}. Whether you are planning to purchase {trait.propertyFocus}, understanding the local lending landscape is essential to structuring a competitive mortgage.
        </p>
        <p>
          {trait.lendingNuance} Different lenders assess property types and local locations with distinct criteria. Balancing these property-specific requirements against your borrowing capacity and deposit size ensures you secure loan terms suited to your immediate and long-term financial goals.
        </p>
        <p>
          Mortgage Xperts assists {suburbName} home buyers, homeowners and property investors navigate these financial decisions. We compare suitable home loans from our panel of more than 40 Australian banks and non-bank lenders, considering interest rates, repayment structures, loan features and individual lending requirements.
        </p>
        <p>
          {stateAssistance}
        </p>
        <p>
          We have a particular focus on assisting nurses, midwives, doctors and other healthcare professionals. Where employment income includes regular overtime, shift allowances or penalty rates, we review how different lenders may assess those earnings. We also explore potential Lenders Mortgage Insurance (LMI) concessions for eligible professions.
        </p>
        <p>
          Whether you are purchasing your first {suburbName} property, upgrading to an established family residence, reviewing an existing mortgage or financing an investment property, Mortgage Xperts provides personalised assistance from initial assessment through to settlement.
        </p>
        <p className="font-semibold text-[#0B1F3A] pt-1">
          Speak with Aakash K C, Founder and Principal Broker of Mortgage Xperts, for a free home loan assessment.
        </p>
      </>
    );
  }

  // 4. Default Suburb Narrative with Localized Nuance for Remaining Suburbs
  return (
    <>
      <p>
        {suburbName} offers an attractive residential lifestyle within {cityName}, blending local community amenities, transport connections and diverse housing options. Whether you are looking at an established family home, modern townhouse, or residential apartment, the specific property characteristics can significantly influence your home loan choices.
      </p>
      <p>
        Navigating property financing in {suburbName} requires considering upfront deposit levels, property valuations, strata or maintenance requirements, and overall borrowing power. Having a clear understanding of these commitments allows buyers and investors to make informed decisions before making an offer or bidding at auction.
      </p>
      <p>
        Mortgage Xperts assists {suburbName} home buyers, homeowners and investors navigate these important property finance decisions. We compare suitable loan options across our panel of more than 40 Australian banks and non-bank lenders, analyzing interest rates, loan features, repayment structures and specific lending criteria.
      </p>
      <p>
        {stateAssistance}
      </p>
      <p>
        We have a particular focus on assisting nurses, midwives, doctors and healthcare professionals across {cityName}. Where income includes overtime, shift allowances or penalty rates, we assess how lenders evaluate those earnings and explore potential Lenders Mortgage Insurance (LMI) waivers.
      </p>
      <p>
        Whether you are buying your first home in {suburbName}, refinancing for a sharper rate, or expanding an investment portfolio, Mortgage Xperts provides end-to-end guidance from initial assessment to settlement.
      </p>
      <p className="font-semibold text-[#0B1F3A] pt-1">
        Speak with Aakash K C, Founder and Principal Broker of Mortgage Xperts, for a free home loan assessment.
      </p>
    </>
  );
}
