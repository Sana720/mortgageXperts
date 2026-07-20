import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/equity-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Home Equity Calculator | Estimate Your Usable Equity | Mortgage Xperts",
    description:
      "Use Mortgage Xperts’ Home Equity Calculator to find out how much usable equity you have in your property. Estimate your borrowing power for investment or renovations.",
    keywords: [
      "home equity calculator",
      "calculate usable equity",
      "equity calculator Australia",
      "borrow against equity",
      "equity for investment property",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Home Equity Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Use Mortgage Xperts’ Home Equity Calculator to find out how much usable equity you have in your property. Estimate your borrowing power for investment or renovations.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Home Equity Calculator",
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
