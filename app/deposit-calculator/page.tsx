import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/deposit-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Deposit Calculator | Track Home Loan Savings | Mortgage Xperts",
    description:
      "Calculate your future home loan deposit savings, track interest earnings, and estimate the timeline to reach your savings target.",
    keywords: [
      "deposit calculator",
      "home loan deposit calculator",
      "savings goal calculator",
      "savings timeline calculator",
      "deposit planner Australia",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Deposit Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate your future home loan deposit savings, track interest earnings, and estimate the timeline to reach your savings target.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Deposit Calculator",
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
