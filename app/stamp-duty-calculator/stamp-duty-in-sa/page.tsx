import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-sa";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "SA Stamp Duty Calculator | Calculate Conveyance Duty | Mortgage Xperts",
    description:
      "Calculate South Australian conveyance duty, registry fees, and mortgage registration costs. Learn about first home buyer relief for new builds and SA grants.",
    keywords: [
      "SA stamp duty calculator",
      "stamp duty calculator SA",
      "first home buyer concession SA",
      "South Australian conveyance duty",
      "new home stamp duty relief SA",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "SA Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate South Australian conveyance duty, registry fees, and mortgage registration costs. Learn about first home buyer relief for new builds and SA grants.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "SA Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="SA" />
    </>
  );
}
