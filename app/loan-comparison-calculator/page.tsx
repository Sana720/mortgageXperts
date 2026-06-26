import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/loan-comparison-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Loan Comparison Calculator | Compare Home Loans | Mortgage Xperts",
    description:
      "Compare two home loans side-by-side. Calculate differences in weekly, fortnightly, or monthly payments, total interest, and total payments.",
    keywords: [
      "loan comparison calculator",
      "compare home loans",
      "compare mortgage rates Australia",
      "side by side home loan comparison",
      "mortgage repayment comparison",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Loan Comparison Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Compare two home loans side-by-side. Analyze repayments, interest rate savings, and total repayment costs over the loan term.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Loan Comparison Calculator",
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
