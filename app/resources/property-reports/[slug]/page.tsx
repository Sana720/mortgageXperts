import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { getSuburbData } from "../data";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";
import { notFound } from "next/navigation";

interface SuburbPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SuburbPageProps): Promise<Metadata> {
  const { slug } = await params;
  const suburb = getSuburbData(slug);

  if (!suburb) {
    return {
      title: "Suburb Property Report Not Found | Mortgage Xperts",
    };
  }

  const { settings, pageHeroSettings } = await loadPageData(`/resources/property-reports/${slug}`);

  return buildPageMetadata(`/resources/property-reports/${slug}`, pageHeroSettings, settings, {
    title: `${suburb.name} ${suburb.state} Suburb Profile & Property Report | Mortgage Xperts`,
    description: `Get a free suburb property report for ${suburb.name}, ${suburb.state} ${suburb.postcode}. Check median house price ${suburb.medianHousePrice}, vacancy rate ${suburb.vacancyRate}, yields, and growth trends.`,
    keywords: [
      `${suburb.name} property report`,
      `${suburb.name} suburb profile`,
      `${suburb.name} median house price`,
      `${suburb.name} property market trends`,
      `${suburb.name} rental yield`,
      `${suburb.name} vacancy rate`,
      `buy house in ${suburb.name}`
    ],
    imageAlt: `${suburb.name} Property Report`,
  });
}

export default async function Page({ params }: SuburbPageProps) {
  const { slug } = await params;
  const suburb = getSuburbData(slug);

  if (!suburb) {
    notFound();
  }

  const { settings } = await loadPageData(`/resources/property-reports/${slug}`);

  const jsonLd = buildJsonLd(
    `${suburb.name} Property Report & Suburb Profile - Mortgage Xperts`,
    `Free suburb market report, growth rates, yields and local statistics for ${suburb.name}, ${suburb.state}.`,
    `/resources/property-reports/${slug}`,
    settings,
    [
      { name: "Resources", item: "https://mortgagexperts.com.au/the-xperts-news-insights" },
      { name: "Property Reports", item: "https://mortgagexperts.com.au/resources/property-reports" },
      { name: `${suburb.name} Property Report`, item: `https://mortgagexperts.com.au/resources/property-reports/${slug}` },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage suburb={suburb} settings={settings} />
    </>
  );
}
