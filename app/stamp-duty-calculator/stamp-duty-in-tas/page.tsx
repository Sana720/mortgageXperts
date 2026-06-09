import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-tas";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "TAS Stamp Duty Calculator | Calculate Property Transfer Duty | Mortgage Xperts",
    description:
      "Calculate Tasmanian property transfer duty, registry fees, and mortgage registration costs. Check stamp duty concessions for established homes up to $750,000.",
    keywords: [
      "TAS stamp duty calculator",
      "stamp duty calculator TAS",
      "first home buyer concession TAS",
      "Tasmanian property transfer duty",
      "established home concession Tasmania",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "TAS Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate Tasmanian property transfer duty, registry fees, and mortgage registration costs. Check stamp duty concessions for established homes up to $750,000.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "TAS Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="TAS" />
    </>
  );
}
