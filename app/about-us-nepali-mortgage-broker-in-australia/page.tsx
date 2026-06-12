import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/about-us-nepali-mortgage-broker-in-australia";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "About Mortgage Xperts | Your Dream Home Specialists",
    description:
      "At Mortgage Xperts, we understand that entering the property market can feel overwhelming. We are committed to acting in your best interest.",
    keywords: [
      "about mortgage xperts",
      "mortgage broker",
      "home loans",
      "mortgage experts",
    ],
    imageAlt: "About Mortgage Xperts",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "About Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "At Mortgage Xperts, we understand that entering the property market can feel overwhelming. We are committed to acting in your best interest.",
    PAGE_PATH,
    settings,
    [
      { name: "About Us", item: `https://mortgagexperts.com.au${PAGE_PATH}` },
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
