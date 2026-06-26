import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/rent-yield-calculators";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Rent Yield Calculator to Maximise Your Property Investment | Mortgage Xperts",
    description:
      "Use Mortgage Xperts’ Rent Yield Calculator to estimate your rental income and returns. Make informed property investment decisions with ease.",
    keywords: [
      "rent yield calculator",
      "rental yield calculator",
      "property investment yield calculator",
      "calculate rental yield Australia",
      "investment property returns",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Rent Yield Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Use Mortgage Xperts’ Rent Yield Calculator to estimate your rental income and returns. Make informed property investment decisions with ease.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Rent Yield Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} pageContent={pageContent} />
    </>
  );
}
