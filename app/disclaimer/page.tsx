import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/disclaimer";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Disclaimer | Mortgage Xperts",
    description:
      "Read our website disclaimer. Learn about the limitations of our calculators, estimators, and general information.",
    keywords: [
      "disclaimer",
      "calculator disclaimer",
      "general info disclaimer",
      "financial advice disclaimer",
    ],
    imageAlt: "Mortgage Xperts Disclaimer",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Disclaimer",
    pageHeroSettings?.meta_description ||
      "Read our website disclaimer. Learn about the limitations of our calculators, estimators, and general information.",
    PAGE_PATH,
    settings,
    [
      { name: "Disclaimer", item: `https://mortgagexperts.com.au${PAGE_PATH}` },
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
