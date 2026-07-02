import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/free-resources/first-home-buyers-step-by-step-guide";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "First Home Buyers Step by Step Guide | Mortgage Xperts",
    description: "A free, step-by-step checklist to help you navigate your first property purchase.",
    keywords: ["first home buyers", "step by step guide", "home buying process checklist", "free resources"],
    imageAlt: "First Home Buyers Step by Step Guide",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Step by Step First Home Guide - Mortgage Xperts",
    pageHeroSettings?.meta_description || "A visual roadmap detailing the exact steps to buy your first home in Australia without the stress.",
    PAGE_PATH,
    settings,
    [
      { name: "Free Resources", item: "https://mortgagexperts.com.au/free-resources" },
      {
        name: "First Home Buyers Step by Step Guide",
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
