import type { Metadata } from "next";
import { executeQuery } from "@/lib/db";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SubPageHero } from "../components/SubPageHero";

const PAGE_PATH = "/refinancing-a-loan";
const PAGE_TITLE = "Refinancing a Loan";

export async function generateMetadata(): Promise<Metadata> {
  let titleVal = "Refinance Your Home Loan & Save Thousands | Mortgage Xperts";
  let descVal = "Compare and switch to a lower interest rate, consolidate your debts, or unlock equity to cash out.";
  let keywordsVal = [
    "refinance home loan",
    "home loan refinance",
    "lower interest rate",
    "switch lenders Australia"
  ];
  let logoVal = "/images/hero_slide_4_purple.png";

  try {
    const pageRows = await executeQuery("SELECT * FROM page_meta_hero WHERE page_path = ?", [PAGE_PATH]);
    if (Array.isArray(pageRows) && pageRows.length > 0) {
      const pageData = pageRows[0];
      if (pageData.meta_title) titleVal = pageData.meta_title;
      if (pageData.meta_description) descVal = pageData.meta_description;
      if (pageData.meta_keywords) {
        keywordsVal = pageData.meta_keywords.split(",").map((k: string) => k.trim());
      }
    }
    const settingsRows = await executeQuery("SELECT `key`, `value` FROM global_settings");
    if (Array.isArray(settingsRows)) {
      const logoSetting = settingsRows.find((r: { key: string; value: string }) => r.key === "logo_url");
      if (logoSetting && logoSetting.value) logoVal = logoSetting.value;
    }
  } catch (error) {
    console.error(`Failed to load settings in generateMetadata for ${PAGE_PATH}:`, error);
  }

  return {
    title: titleVal,
    description: descVal,
    keywords: keywordsVal,
    alternates: {
      canonical: `https://mortgagexperts.com.au${PAGE_PATH}`,
    },
    openGraph: {
      title: titleVal,
      description: descVal,
      url: `https://mortgagexperts.com.au${PAGE_PATH}`,
      type: "website",
      images: [
        {
          url: logoVal,
          width: 1200,
          height: 630,
          alt: PAGE_TITLE,
        }
      ],
    }
  };
}

export default async function Page() {
  const settings: Record<string, string> = {};
  let pageHeroSettings = null;
  try {
    const rows = await executeQuery("SELECT `key`, `value` FROM global_settings");
    if (Array.isArray(rows)) {
      rows.forEach((row: { key: string; value: string }) => {
        settings[row.key] = row.value;
      });
    }
    const pageRows = await executeQuery("SELECT * FROM page_meta_hero WHERE page_path = ?", [PAGE_PATH]);
    if (Array.isArray(pageRows) && pageRows.length > 0) {
      pageHeroSettings = pageRows[0];
    }
  } catch (error) {
    console.error(`Failed to load settings in Server Component for ${PAGE_PATH}:`, error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      <SiteHeader settings={settings} />
      <main className="flex-grow">
        <SubPageHero pageTitle={PAGE_TITLE} pageHeroSettings={pageHeroSettings} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
