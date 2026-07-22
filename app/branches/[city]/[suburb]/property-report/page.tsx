import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cityDataMap } from "../../cityData";
import SuburbReportClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

interface ReportParams {
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
  params: Promise<ReportParams>;
}): Promise<Metadata> {
  const { city, suburb } = await params;
  const cityData = cityDataMap[city.toLowerCase()];
  if (!cityData) return { title: "Not Found" };

  const suburbName = getSuburbName(suburb);
  const isSuburbValid = cityData.suburbs.some(
    (s) => s.toLowerCase() === suburbName.toLowerCase()
  );
  if (!isSuburbValid) return { title: "Not Found" };

  const pagePath = `/branches/${city}/${suburb}/property-report`;
  const { settings, pageHeroSettings } = await loadPageData(pagePath);

  return buildPageMetadata(pagePath, pageHeroSettings, settings, {
    title: `Free ${suburbName} Property Report | Suburb Valuations & Trends`,
    description: `Download a free property report for ${suburbName}, ${cityData.city}. Access recent property sales, median house prices, rental yields, and local market trends.`,
    keywords: [
      `free property report ${suburbName}`,
      `suburb profile ${suburbName}`,
      `house price ${suburbName}`,
      `rental yield ${suburbName}`,
      `market report ${suburbName}`,
    ],
  });
}

export function generateStaticParams() {
  const paths: ReportParams[] = [];
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

export default async function SuburbReportPage({
  params,
}: {
  params: Promise<ReportParams>;
}) {
  const { city, suburb } = await params;
  const cityData = cityDataMap[city.toLowerCase()];
  if (!cityData) notFound();

  const suburbName = getSuburbName(suburb);
  const isSuburbValid = cityData.suburbs.some(
    (s) => s.toLowerCase() === suburbName.toLowerCase()
  );
  if (!isSuburbValid) notFound();

  const pagePath = `/branches/${city}/${suburb}/property-report`;
  const { settings } = await loadPageData(pagePath);

  const jsonLd = buildJsonLd(
    `Free ${suburbName} Property Report - Mortgage Xperts`,
    `Download your free suburb property report for ${suburbName}, including median house prices, recent sales, and rental yield analysis.`,
    pagePath,
    settings,
    [
      { name: "Our Branches", item: `https://mortgagexperts.com.au/branches/${city}` },
      { name: cityData.city, item: `https://mortgagexperts.com.au/branches/${city}` },
      { name: suburbName, item: `https://mortgagexperts.com.au/branches/${city}/${suburb}` },
      { name: "Free Property Report", item: `https://mortgagexperts.com.au${pagePath}` },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SuburbReportClientPage cityData={cityData} suburbName={suburbName} settings={settings} />
    </>
  );
}
