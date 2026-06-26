import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/cash-rate-change-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "RBA Cash Rate Change Calculator | Estimate Repayment Changes | Mortgage Xperts",
    description:
      "Calculate how RBA interest rate changes impact your monthly home loan repayments. Estimate your new payments with Mortgage Xperts' Cash Rate Change Calculator.",
    keywords: [
      "cash rate change calculator",
      "RBA rate change calculator",
      "interest rate change calculator",
      "calculate repayment change",
      "mortgage rate change impact",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Cash Rate Change Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate how RBA interest rate changes impact your monthly home loan repayments. Estimate your new payments with Mortgage Xperts' Cash Rate Change Calculator.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Cash Rate Change Calculator",
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
