import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "ACT Stamp Duty Calculator | Calculate Government Fees | Mortgage Xperts",
    description:
      "Calculate stamp duty, transfer fees, and mortgage registration costs for ACT properties. Explore concessions for first home buyers and pensioners with Mortgage Xperts.",
    keywords: [
      "ACT stamp duty calculator",
      "stamp duty calculator ACT",
      "first home buyer concession ACT",
      "pensioner stamp duty concession ACT",
      "ACT transfer registration fees",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "ACT Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate stamp duty, transfer fees, and mortgage registration costs for ACT properties. Explore concessions for first home buyers and pensioners with Mortgage Xperts.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "ACT Stamp Duty Calculator",
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
