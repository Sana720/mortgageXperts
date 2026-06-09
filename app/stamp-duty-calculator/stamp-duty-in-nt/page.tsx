import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-nt";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "NT Stamp Duty Calculator | Calculate Government Fees | Mortgage Xperts",
    description:
      "Calculate Northern Territory stamp duty, registration fees, and mortgage registration costs. Check HomeGrown Territory Grant options and first home buyer benefits.",
    keywords: [
      "NT stamp duty calculator",
      "stamp duty calculator NT",
      "first home buyer concession NT",
      "Northern Territory stamp duty rates",
      "HomeGrown Territory Grant",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "NT Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate Northern Territory stamp duty, registration fees, and mortgage registration costs. Check HomeGrown Territory Grant options and first home buyer benefits.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "NT Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="NT" />
    </>
  );
}
