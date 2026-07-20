import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/ytd-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "YTD Income Calculator | Annualised Income | Mortgage Xperts",
    description:
      "Estimate your annualised gross income based on your year-to-date payslip earnings. Essential for home loan applications in Australia.",
    keywords: [
      "ytd calculator",
      "year to date calculator",
      "income annualisation calculator",
      "mortgage income calculator",
      "annualised income calculator Australia",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "YTD Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Estimate your annualised gross income based on your year-to-date payslip earnings. Track your income for home loan applications.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "YTD Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} pageContent={pageContent} pageSections={pageSections} />
    </>
  );
}
