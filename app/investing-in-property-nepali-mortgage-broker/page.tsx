import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/investing-in-property-nepali-mortgage-broker";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Property Investment Loan Strategies | Mortgage Xperts",
    description:
      "Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.",
    keywords: [
      "property investment loan",
      "investment home loan",
      "buy investment property",
      "equity loan",
    ],
    imageAlt: "Investing in Property with Nepali Mortgage Broker",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Investing in Property - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Investing in Property",
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
