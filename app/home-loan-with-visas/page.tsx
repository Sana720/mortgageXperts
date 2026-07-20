import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/home-loan-with-visas";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Home Loans for Visa Holders in Australia | Mortgage Xperts",
    description:
      "Home loans for temporary residents, visa holders, and non-residents buying property in Australia.",
    keywords: [
      "home loan visa holder",
      "temporary resident home loan",
      "457 visa home loan",
      "non-resident property loan Australia",
    ],
    imageAlt: "Home Loans for Visa Holders",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Home Loans with Visas - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Home loans for temporary residents, visa holders, and non-residents buying property in Australia.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Home Loans with Visas",
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
