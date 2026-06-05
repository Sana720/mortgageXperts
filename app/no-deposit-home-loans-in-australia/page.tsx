import type { Metadata } from "next";
import { executeQuery } from "@/lib/db";
import { ClientPage } from "./ClientPage";

const PAGE_PATH = "/no-deposit-home-loans-in-australia";
const PAGE_TITLE = "No Deposit Home Loans";

export async function generateMetadata(): Promise<Metadata> {
  let titleVal = "No Deposit & Zero Deposit Home Loans in Australia | Mortgage Xperts";
  let descVal =
    "Discover how to buy a home in Australia with no deposit using family guarantor loans or government schemes. Expert guidance from Mortgage Xperts.";
  let keywordsVal = [
    "no deposit home loans",
    "zero deposit home loan",
    "100% home loan",
    "guarantor loan Australia",
    "no deposit first home buyer",
  ];
  let logoVal = "/images/hero.png";

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
    const pageRows = await executeQuery(
      "SELECT * FROM page_meta_hero WHERE page_path = ?",
      [PAGE_PATH]
    );
    if (Array.isArray(pageRows) && pageRows.length > 0) {
      pageHeroSettings = pageRows[0];
    }
  } catch (error) {
    console.error(`Failed to load settings for ${PAGE_PATH}:`, error);
  }

  return <ClientPage settings={settings} pageHeroSettings={pageHeroSettings} />;
}
