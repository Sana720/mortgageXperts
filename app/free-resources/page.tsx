/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";
import { executeQuery } from "@/lib/db";

const PAGE_PATH = "/free-resources";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Free Mortgage & Home Buying Resources | Mortgage Xperts",
    description: "Get instant access to our free home loan guides, checklists, and timelines to help navigate the Australian property market.",
    keywords: ["free home loan guides", "first home buyer checklist", "home buying process timeline", "refinance savings guide"],
    imageAlt: "Free Mortgage & Home Buying Resources",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  let dbResources: any[] = [];
  try {
    // If the database is empty, seed it via executeQuery automatic initialization
    dbResources = await executeQuery<any[]>('SELECT * FROM free_resources ORDER BY orderIndex ASC');
  } catch (err) {
    console.error('Failed to fetch free resources from DB:', err);
  }

  const jsonLd = buildJsonLd(
    "Free Mortgage & Home Buying Resources - Mortgage Xperts",
    pageHeroSettings?.meta_description || "Get instant access to our free home loan guides, checklists, and timelines to help navigate the Australian property market.",
    PAGE_PATH,
    settings,
    [
      { name: "Home", item: "https://mortgagexperts.com.au" },
      { name: "Free Resources", item: `https://mortgagexperts.com.au${PAGE_PATH}` },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage settings={settings} initialResources={dbResources} />
    </>
  );
}
