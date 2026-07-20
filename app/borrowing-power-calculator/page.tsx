import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/borrowing-power-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Borrowing Power Calculator | How Much Can I Borrow? | Mortgage Xperts",
    description:
      "Find out your borrowing capacity and estimated home loan limit in minutes. Enter your income and expenses to discover how much you can borrow.",
    keywords: [
      "borrowing power calculator",
      "how much can I borrow",
      "home loan borrowing capacity",
      "mortgage borrowing estimator",
      "borrowing limit calculator Australia",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Borrowing Power Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Estimate your borrowing power and home loan limit. Analyze how your income and expenses affect how much you can borrow.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Borrowing Power Calculator",
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
