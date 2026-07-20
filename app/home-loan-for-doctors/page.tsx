import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/home-loan-for-doctors";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Home Loans for Doctors & Medical Specialists | Mortgage Xperts",
    description:
      "Exclusive 95% LVR home loans with zero Lenders Mortgage Insurance (LMI) for doctors and medical specialists.",
    keywords: [
      "home loans for doctors",
      "doctor home loan",
      "LMI waiver doctors",
      "medical professional loan",
    ],
    imageAlt: "Home Loans for Doctors and Medical Specialists",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings, pageContent, pageSections } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Home Loans for Doctors - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Exclusive 95% LVR home loans with zero LMI for doctors and medical specialists.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Home Loans for Doctors",
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
