import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/credit-guide";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Credit Guide | Mortgage Xperts",
    description:
      "Access our formal Credit Guide. Understand our licensing details, credit assessment process, commission disclosures, and dispute resolution procedures.",
    keywords: [
      "credit guide",
      "mortgage broker credit guide",
      "australian credit licence",
      "credit assessment",
      "dispute resolution",
    ],
    imageAlt: "Mortgage Xperts Credit Guide",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Credit Guide",
    pageHeroSettings?.meta_description ||
      "Access our formal Credit Guide. Understand our licensing details, credit assessment process, commission disclosures, and dispute resolution procedures.",
    PAGE_PATH,
    settings,
    [
      { name: "Credit Guide", item: `https://mortgagexperts.com.au${PAGE_PATH}` },
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
