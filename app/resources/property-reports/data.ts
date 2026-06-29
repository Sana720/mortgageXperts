export interface SuburbData {
  slug: string;
  name: string;
  state: string;
  postcode: string;
  medianHousePrice: string;
  medianUnitPrice: string;
  rentalYieldHouse: string;
  rentalYieldUnit: string;
  vacancyRate: string;
  population: string;
  growth1Yr: string;
  weeklyRentHouse: string;
  weeklyRentUnit: string;
  marketTrend: string;
  intro: string;
}

const staticSuburbs: Record<string, SuburbData> = {
  "canning-vale-wa": {
    slug: "canning-vale-wa",
    name: "Canning Vale",
    state: "WA",
    postcode: "6155",
    medianHousePrice: "$685,000",
    medianUnitPrice: "$435,000",
    rentalYieldHouse: "5.3%",
    rentalYieldUnit: "6.2%",
    vacancyRate: "0.8%",
    population: "34,500",
    growth1Yr: "+12.4%",
    weeklyRentHouse: "$650",
    weeklyRentUnit: "$490",
    marketTrend: "High Demand Market - Rising Prices",
    intro: "Canning Vale is a vibrant, family-oriented suburb in Perth's south-eastern corridor. Renowned for its beautifully landscaped parks, highly-regarded public schools, and extensive retail hubs, it is a highly sought-after destination for families, young professionals, and savvy investors alike."
  },
  "baldivis-wa": {
    slug: "baldivis-wa",
    name: "Baldivis",
    state: "WA",
    postcode: "6171",
    medianHousePrice: "$545,000",
    medianUnitPrice: "$385,000",
    rentalYieldHouse: "5.8%",
    rentalYieldUnit: "6.6%",
    vacancyRate: "0.6%",
    population: "39,800",
    growth1Yr: "+14.2%",
    weeklyRentHouse: "$580",
    weeklyRentUnit: "$450",
    marketTrend: "Strong Growth & Rental Shortage",
    intro: "Baldivis is a rapidly expanding master-planned suburb located in Perth’s southern fringe. Offering a perfect blend of semi-rural charm and modern suburban convenience, it features modern housing estates, multiple educational facilities, and excellent transport links to Perth CBD and Mandurah."
  },
  "box-hill-vic": {
    slug: "box-hill-vic",
    name: "Box Hill",
    state: "VIC",
    postcode: "3128",
    medianHousePrice: "$1,650,000",
    medianUnitPrice: "$640,000",
    rentalYieldHouse: "2.4%",
    rentalYieldUnit: "4.8%",
    vacancyRate: "1.8%",
    population: "14,300",
    growth1Yr: "+4.8%",
    weeklyRentHouse: "$750",
    weeklyRentUnit: "$550",
    marketTrend: "Premium Metro Hub - Steady Growth",
    intro: "Box Hill is a major metropolitan activity center in Melbourne's eastern suburbs. Highly celebrated for its bustling commercial district, premium dining scene, and exceptional health and educational institutions, it is a high-density, culturally diverse hub attracting strong investor and owner-occupier interest."
  }
};

// Generates a mock postcode based on State
function getPostcodeForState(state: string): string {
  const s = state.toUpperCase();
  if (s === "NSW") return Math.floor(2000 + Math.random() * 900).toString();
  if (s === "VIC") return Math.floor(3000 + Math.random() * 900).toString();
  if (s === "QLD") return Math.floor(4000 + Math.random() * 900).toString();
  if (s === "SA") return Math.floor(5000 + Math.random() * 900).toString();
  if (s === "WA") return Math.floor(6000 + Math.random() * 900).toString();
  if (s === "TAS") return Math.floor(7000 + Math.random() * 900).toString();
  if (s === "ACT") return "2600";
  if (s === "NT") return "0800";
  return "3000";
}

// Dynamically generate realistic property data for any suburb slug
export function getSuburbData(slug: string): SuburbData {
  const lowercaseSlug = slug.toLowerCase().trim();
  if (staticSuburbs[lowercaseSlug]) {
    return staticSuburbs[lowercaseSlug];
  }

  // Parse slug (e.g. "canning-vale-wa" or "surry-hills-nsw")
  const parts = lowercaseSlug.split("-");
  let state = "NSW";
  const nameParts = [...parts];

  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1].toUpperCase();
    const states = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"];
    if (states.includes(lastPart)) {
      state = lastPart;
      nameParts.pop(); // remove state from name parts
    }
  }

  const name = nameParts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

  // Seeded values based on state to ensure consistency across page reloads
  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    seed += slug.charCodeAt(i);
  }
  const pseudoRandom = (min: number, max: number) => {
    const x = Math.sin(seed++) * 10000;
    const r = x - Math.floor(x);
    return min + r * (max - min);
  };

  // Base pricing modifier based on state
  let baseHousePrice = 850000;
  if (state === "NSW") baseHousePrice = 1200000;
  if (state === "VIC") baseHousePrice = 950000;
  if (state === "ACT") baseHousePrice = 900000;
  if (state === "WA" || state === "QLD") baseHousePrice = 650000;
  if (state === "SA" || state === "TAS") baseHousePrice = 600000;
  if (state === "NT") baseHousePrice = 550000;

  const housePriceVal = Math.round(pseudoRandom(baseHousePrice * 0.8, baseHousePrice * 1.3) / 5000) * 5000;
  const unitPriceVal = Math.round((housePriceVal * pseudoRandom(0.55, 0.65)) / 5000) * 5000;

  const rentalYieldHouse = pseudoRandom(3.2, 5.8).toFixed(1) + "%";
  const rentalYieldUnit = (parseFloat(rentalYieldHouse) + pseudoRandom(0.8, 1.5)).toFixed(1) + "%";
  const vacancyRate = pseudoRandom(0.4, 2.2).toFixed(1) + "%";
  const populationVal = Math.round(pseudoRandom(4000, 32000));
  const growth1Yr = (pseudoRandom(1.5, 16.5) * (pseudoRandom(0, 1) > 0.15 ? 1 : -1)).toFixed(1);
  const growth1YrStr = (parseFloat(growth1Yr) >= 0 ? "+" : "") + growth1Yr + "%";

  const weeklyRentHouseVal = Math.round((housePriceVal * pseudoRandom(0.00085, 0.001)) / 10) * 10;
  const weeklyRentUnitVal = Math.round((unitPriceVal * pseudoRandom(0.00095, 0.00115)) / 10) * 10;

  const postcode = getPostcodeForState(state);
  
  const trends = [
    "High Demand - Outperforming Region",
    "Balanced Market - Steady Growth",
    "Rising Rental Demand - Tight Vacancy",
    "Growth Corridor - High Investor Interest",
    "Mature Residential - High Owner Occupancy"
  ];
  const marketTrend = trends[Math.floor(pseudoRandom(0, trends.length))];

  const intro = `${name} is an attractive residential suburb in ${state}, postcode ${postcode}. Offering a superb balance of community amenities, scenic parks, and excellent local accessibility, it is highly valued by both home buyers seeking lifestyle convenience and property investors looking for strong, consistent market yields.`;

  return {
    slug: lowercaseSlug,
    name,
    state,
    postcode,
    medianHousePrice: `$${housePriceVal.toLocaleString()}`,
    medianUnitPrice: `$${unitPriceVal.toLocaleString()}`,
    rentalYieldHouse,
    rentalYieldUnit,
    vacancyRate,
    population: populationVal.toLocaleString(),
    growth1Yr: growth1YrStr,
    weeklyRentHouse: `$${weeklyRentHouseVal.toLocaleString()}`,
    weeklyRentUnit: `$${weeklyRentUnitVal.toLocaleString()}`,
    marketTrend,
    intro
  };
}

export const featuredSuburbsList = [
  { name: "Canning Vale, WA", slug: "canning-vale-wa", price: "$685,000", growth: "+12.4%", yield: "5.3%" },
  { name: "Baldivis, WA", slug: "baldivis-wa", price: "$545,000", growth: "+14.2%", yield: "5.8%" },
  { name: "Box Hill, VIC", slug: "box-hill-vic", price: "$1,650,000", growth: "+4.8%", yield: "2.4%" }
];
