import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cityDataMap } from "../cityData";
import SuburbClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

interface SuburbParams {
  city: string;
  suburb: string;
}

function getSuburbName(suburbSlug: string): string {
  return suburbSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SuburbParams>;
}): Promise<Metadata> {
  const { city, suburb } = await params;
  const cityData = cityDataMap[city.toLowerCase()];
  if (!cityData) return { title: "Not Found" };

  const suburbName = getSuburbName(suburb);
  const isSuburbValid = cityData.suburbs.some(
    (s) => s.toLowerCase() === suburbName.toLowerCase()
  );
  if (!isSuburbValid) return { title: "Not Found" };

  const pagePath = `/branches/${city}/${suburb}`;
  const { settings, pageHeroSettings } = await loadPageData(pagePath);

  return buildPageMetadata(pagePath, pageHeroSettings, settings, {
    title: `Mortgage Broker in ${suburbName}, ${cityData.city} | Home Loans`,
    description: `Looking for a home loan in ${suburbName}? Our trusted ${cityData.city} mortgage brokers compare 40+ lenders to secure the sharpest rates for ${suburbName} first home buyers and investors.`,
    keywords: [
      `mortgage broker ${suburbName}`,
      `home loans ${suburbName}`,
      `best mortgage broker ${suburbName}`,
      `Nepali mortgage broker ${suburbName}`,
      `refinance home loan ${suburbName}`,
    ],
  });
}

export function generateStaticParams() {
  const paths: SuburbParams[] = [];
  Object.keys(cityDataMap).forEach((cityKey) => {
    const cityData = cityDataMap[cityKey];
    cityData.suburbs.forEach((suburb) => {
      paths.push({
        city: cityKey,
        suburb: suburb.toLowerCase().replace(/\s+/g, "-"),
      });
    });
  });
  return paths;
}

export default async function SuburbPage({
  params,
}: {
  params: Promise<SuburbParams>;
}) {
  const { city, suburb } = await params;
  const cityData = cityDataMap[city.toLowerCase()];
  if (!cityData) notFound();

  const suburbName = getSuburbName(suburb);
  const isSuburbValid = cityData.suburbs.some(
    (s) => s.toLowerCase() === suburbName.toLowerCase()
  );
  if (!isSuburbValid) notFound();

  const pagePath = `/branches/${city}/${suburb}`;
  const { settings } = await loadPageData(pagePath);

  const jsonLd = buildJsonLd(
    `Mortgage Broker in ${suburbName} - Mortgage Xperts`,
    `Looking for the best mortgage broker in ${suburbName}? Compare 40+ lenders and secure the right rate with Mortgage Xperts ${cityData.city}.`,
    pagePath,
    settings,
    [
      { name: "Our Branches", item: `https://mortgagexperts.com.au/branches/${city}` },
      { name: cityData.city, item: `https://mortgagexperts.com.au/branches/${city}` },
      { name: suburbName, item: `https://mortgagexperts.com.au${pagePath}` },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SuburbClientPage cityData={cityData} suburbName={suburbName} settings={settings} />
    </>
  );
}
