import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/self-employed-home-loans";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Self-Employed & Alt-Doc Home Loans | Mortgage Xperts",
    description:
      "Flexible low-doc and alt-doc home loans for business owners, sole traders, and self-employed Australians.",
    keywords: [
      "self employed home loan",
      "low doc home loan",
      "sole trader mortgage",
      "alt doc loan Australia",
    ],
    imageAlt: "Self-Employed Home Loans",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Self-Employed & Alt-Doc Home Loans - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Flexible low-doc and alt-doc home loans for business owners, sole traders, and self-employed Australians.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Self-Employed Home Loans",
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
