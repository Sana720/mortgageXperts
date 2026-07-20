import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/home-guarantee-scheme";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "First Home Guarantee Scheme | Mortgage Xperts",
    description:
      "Buy your first home with as little as a 5% deposit and pay zero Lenders Mortgage Insurance (LMI) under the Home Guarantee Scheme.",
    keywords: [
      "home guarantee scheme",
      "first home guarantee",
      "5% deposit home loan",
      "zero LMI scheme",
    ],
    imageAlt: "First Home Guarantee Scheme Australia",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Home Guarantee Scheme - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Buy your first home with as little as a 5% deposit and zero LMI under the Home Guarantee Scheme.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Home Guarantee Scheme",
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
