import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/free-resources/step-by-step-home-buying-process";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Step By Step Home Buying Process | Mortgage Xperts",
    description: "Understand the entire home buying process from start to finish with our free guide.",
    keywords: ["step by step home buying process", "home buying timeline", "property purchase flowchart", "free resources"],
    imageAlt: "Step By Step Home Buying Process",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Home Buying Process - Mortgage Xperts",
    pageHeroSettings?.meta_description || "A visual flowchart and guide detailing the exact timeline and process of buying a home in Australia, ensuring you never miss a deadline.",
    PAGE_PATH,
    settings,
    [
      { name: "Free Resources", item: "https://mortgagexperts.com.au/free-resources" },
      {
        name: "Step By Step Home Buying Process",
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
