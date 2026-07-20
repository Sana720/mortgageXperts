import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/no-deposit-home-loans-in-australia";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "No Deposit & Zero Deposit Home Loans in Australia | Mortgage Xperts",
    description:
      "Discover how to buy a home in Australia with no deposit using family guarantor loans or government schemes. Expert guidance from Mortgage Xperts.",
    keywords: [
      "no deposit home loans",
      "zero deposit home loan",
      "100% home loan",
      "guarantor loan Australia",
      "no deposit first home buyer",
    ],
    imageAlt: "No Deposit Home Loans Australia",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "No Deposit Home Loans - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Discover how to buy a home in Australia with no deposit using family guarantor loans or government schemes.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "No Deposit Home Loans",
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
