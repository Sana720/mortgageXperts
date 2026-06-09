import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-wa";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "WA Stamp Duty Calculator | Calculate Transfer Duty | Mortgage Xperts",
    description:
      "Calculate Western Australian transfer duty, registry fees, and mortgage registration costs. Model First Home Owner Rate (FHOR) concessions and grants.",
    keywords: [
      "WA stamp duty calculator",
      "stamp duty calculator WA",
      "first home buyer concession WA",
      "FHOR stamp duty rates WA",
      "Western Australia transfer registration",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "WA Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate Western Australian transfer duty, registry fees, and mortgage registration costs. Model First Home Owner Rate (FHOR) concessions and grants.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "WA Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="WA" />
    </>
  );
}
