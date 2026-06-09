import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-vic";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "VIC Stamp Duty Calculator | Calculate Land Transfer Duty | Mortgage Xperts",
    description:
      "Calculate land transfer duty, registration fees, and mortgage registration costs for Victorian properties. Check concessions for first home buyers and PPR rates.",
    keywords: [
      "VIC stamp duty calculator",
      "stamp duty calculator VIC",
      "first home buyer concession VIC",
      "Victorian land transfer duty",
      "PPR stamp duty rate VIC",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "VIC Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate land transfer duty, registration fees, and mortgage registration costs for Victorian properties. Check concessions for first home buyers and PPR rates.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "VIC Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="VIC" />
    </>
  );
}
