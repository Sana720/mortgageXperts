import type { Metadata } from "next";
import ClientPage from "../ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/stamp-duty-calculator/stamp-duty-in-qld";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "QLD Stamp Duty Calculator | Calculate Transfer Duty | Mortgage Xperts",
    description:
      "Calculate Queensland transfer duty, transfer registry fees, and mortgage registration costs. Learn about QLD home buyer concessions and first home owner grants.",
    keywords: [
      "QLD stamp duty calculator",
      "stamp duty calculator QLD",
      "first home buyer concession QLD",
      "Queensland transfer duty rates",
      "home concession QLD",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "QLD Stamp Duty Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate Queensland transfer duty, transfer registry fees, and mortgage registration costs. Learn about QLD home buyer concessions and first home owner grants.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "QLD Stamp Duty Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} defaultState="QLD" />
    </>
  );
}
