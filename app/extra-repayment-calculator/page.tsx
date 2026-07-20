import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/extra-repayment-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Extra Repayment Calculator | Save Interest & Time | Mortgage Xperts",
    description:
      "Calculate how much time and interest you can save by making extra repayments on your home loan. Get a detailed print-friendly savings report.",
    keywords: [
      "extra repayment calculator",
      "home loan extra payments",
      "mortgage interest savings calculator",
      "pay off mortgage faster",
      "additional home loan payments Australia",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Extra Repayment Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "See how extra repayments can reduce your home loan term and save you thousands in interest. Calculate standard vs extra payment schedules.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "Extra Repayment Calculator",
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
