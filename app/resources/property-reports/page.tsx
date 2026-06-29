import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/resources/property-reports";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Free Suburb Property Reports Australia | Mortgage Xperts",
    description:
      "Get free, instant suburb property reports across Australia. Access median house & unit prices, rental yields, vacancy rates, and market trends.",
    keywords: [
      "free property report",
      "suburb profile report",
      "median house price Australia",
      "suburb growth trends",
      "rental yield by suburb",
      "canning vale property report",
      "baldivis WA property trends",
      "box hill VIC property report"
    ],
    imageAlt: "Free Suburb Property Reports",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Free Suburb Property Reports - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Instant access to property reports and market statistics for any Australian suburb.",
    PAGE_PATH,
    settings,
    [
      { name: "Resources", item: "https://mortgagexperts.com.au/the-xperts-news-insights" },
      {
        name: "Property Reports",
        item: `https://mortgagexperts.com.au${PAGE_PATH}`,
      },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage settings={settings} />
    </>
  );
}
