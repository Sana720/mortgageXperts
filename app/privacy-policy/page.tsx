import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/privacy-policy";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Privacy Policy | Mortgage Xperts",
    description:
      "Understand how Mortgage Xperts collects, stores, protects, and manages your personal and financial information in compliance with the Australian Privacy Principles.",
    keywords: [
      "privacy policy",
      "mortgage experts privacy",
      "data protection",
      "australian privacy principles",
      "personal information",
    ],
    imageAlt: "Mortgage Xperts Privacy Policy",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Privacy Policy",
    pageHeroSettings?.meta_description ||
      "Understand how Mortgage Xperts collects, stores, protects, and manages your personal and financial information in compliance with the Australian Privacy Principles.",
    PAGE_PATH,
    settings,
    [
      { name: "Privacy Policy", item: `https://mortgagexperts.com.au${PAGE_PATH}` },
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
