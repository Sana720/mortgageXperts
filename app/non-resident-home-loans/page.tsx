import type { Metadata } from "next";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SubPageHero } from "../components/SubPageHero";

const PAGE_PATH = "/non-resident-home-loans";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Non-Resident Home Loans in Australia | Mortgage Xperts",
    description:
      "Home loans for temporary residents, visa holders, and non-residents buying property in Australia.",
    keywords: [
      "non resident home loan",
      "temporary resident home loan",
      "visa holder loan",
      "foreigner property buy",
    ],
    imageAlt: "Non-Resident Home Loans Australia",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Non-Resident Home Loans - Mortgage Xperts",
    pageHeroSettings?.meta_description ||
      "Home loans for temporary residents, visa holders, and non-residents buying property in Australia.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Non-Resident Home Loans",
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
      <div className="min-h-screen flex flex-col bg-white font-inter">
        <SiteHeader settings={settings} />
        <main className="flex-grow">
          <SubPageHero pageTitle="Non-Resident Home Loans" pageHeroSettings={pageHeroSettings} />
        </main>
        <SiteFooter settings={settings} />
      </div>
    </>
  );
}
