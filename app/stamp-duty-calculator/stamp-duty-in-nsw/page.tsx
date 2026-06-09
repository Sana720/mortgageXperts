import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-nsw";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "NSW Stamp Duty Calculator | Calculate Transfer Fees | Mortgage Xperts",
    description:
      "Calculate stamp duty, transfer fees, and mortgage registration costs for properties in New South Wales. Learn about FHBAS exemptions and first home grants.",
    keywords: [
      "NSW stamp duty calculator",
      "stamp duty calculator NSW",
      "first home buyer concession NSW",
      "transfer registration fee NSW",
      "FHBAS thresholds NSW",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "NSW Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate stamp duty, transfer fees, and mortgage registration costs for properties in New South Wales. Learn about FHBAS exemptions and first home grants.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "NSW Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="NSW" />
    </>
  );
}
