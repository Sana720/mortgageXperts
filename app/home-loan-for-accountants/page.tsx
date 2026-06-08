import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/home-loan-for-accountants";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Home Loans for Accountants in Australia | Mortgage Xperts",
    description:
      "Special home loan benefits and LMI waivers for accountants, CPAs, and finance professionals in Australia.",
    keywords: [
      "home loans for accountants",
      "accountant mortgage",
      "LMI waiver accountants",
      "finance professional home loans",
    ],
    imageAlt: "Home Loans for Accountants",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Home Loans for Accountants - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Special home loan benefits and LMI waivers for accountants, CPAs, and finance professionals in Australia.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Home Loans for Accountants",
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
