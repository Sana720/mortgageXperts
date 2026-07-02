import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/first-home-guide";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "First Home Buyer Guide | Step-by-Step Mortgage Xperts",
    description: "The complete guide to buying your first home in Australia. Understand grants, deposits, borrowing power, and the settlement process.",
    keywords: ["first home buyer guide", "first home buyer Australia", "how to buy first home", "first home buyer grant guide"],
    imageAlt: "First Home Buyer Guide",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "First Home Guide - Mortgage Xperts",
    pageHeroSettings?.meta_description || "Everything a first home buyer needs to know — from government grants and deposit schemes to choosing the right loan type and navigating the settlement process.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "First Home Guide",
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
