import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/refinancing-a-loan";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Refinance Your Home Loan & Save Thousands | Mortgage Xperts",
    description:
      "Compare and switch to a lower interest rate, consolidate your debts, or unlock equity to cash out.",
    keywords: [
      "refinance home loan",
      "home loan refinance",
      "lower interest rate",
      "switch lenders Australia",
    ],
    imageAlt: "Refinancing a Home Loan",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Refinancing a Loan - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Compare and switch to a lower interest rate, consolidate your debts, or unlock equity to cash out.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Refinancing a Loan",
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
