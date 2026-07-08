import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/terms-and-conditions";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Terms & Conditions | Mortgage Xperts",
    description:
      "Review the Terms and Conditions of using the Mortgage Xperts website and mortgage broking services.",
    keywords: [
      "terms and conditions",
      "terms of service",
      "mortgage experts terms",
      "website terms",
    ],
    imageAlt: "Mortgage Xperts Terms & Conditions",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Terms & Conditions",
    pageHeroSettings?.meta_description ||
      "Review the Terms and Conditions of using the Mortgage Xperts website and mortgage broking services.",
    PAGE_PATH,
    settings,
    [
      { name: "Terms & Conditions", item: `https://mortgagexperts.com.au${PAGE_PATH}` },
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
