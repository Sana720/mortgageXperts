import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/refinancing-feasibility";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Refinancing Feasibility Calculator | Save on Mortgage | Mortgage Xperts",
    description:
      "Calculate your potential interest savings, break-even period, and net benefits from refinancing your home loan. Get a personalized PDF report in minutes.",
    keywords: [
      "refinance calculator",
      "refinancing feasibility",
      "mortgage refinance savings",
      "break even refinance calculator",
      "interest savings calculator Australia",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Refinancing Feasibility Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Determine if refinancing your home loan makes financial sense. Calculate monthly savings, refinancing cost break-even point, and long-term interest benefits.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Refinancing Feasibility Calculator",
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
