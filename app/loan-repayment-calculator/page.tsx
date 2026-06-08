import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/loan-repayment-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Loan Repayment Calculator | Mortgage Xperts",
    description:
      "Calculate your weekly, fortnightly, or monthly home loan repayments, total interest payable, and see how extra repayments can save you thousands.",
    keywords: [
      "loan repayment calculator",
      "mortgage repayment calculator",
      "extra repayment savings",
      "home loan calculator Australia",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Loan Repayment Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate your weekly, fortnightly, or monthly home loan repayments, total interest payable, and see how extra repayments can save you thousands.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Loan Repayment Calculator",
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
      <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} />
    </>
  );
}
