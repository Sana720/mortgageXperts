import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/lmi-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "LMI Calculator | Estimate Lenders Mortgage Insurance | Mortgage Xperts",
    description:
      "Calculate your Lenders Mortgage Insurance (LMI) premium, estimate your loan-to-value ratio (LVR), and learn how to avoid or minimize LMI costs.",
    keywords: [
      "LMI calculator",
      "Lenders Mortgage Insurance calculator",
      "LVR calculator",
      "avoid LMI Australia",
      "mortgage insurance estimate",
    ],
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "LMI Calculator - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Calculate your Lenders Mortgage Insurance (LMI) premium, estimate your loan-to-value ratio (LVR), and learn how to avoid or minimize LMI costs.",
    PAGE_PATH,
    settings,
    [
      { name: "Calculators", item: "https://mortgagexperts.com.au" },
      {
        name: "LMI Calculator",
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
