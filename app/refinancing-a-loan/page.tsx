import type { Metadata } from "next";
import { executeQuery } from "@/lib/db";
import { ClientPage } from "./ClientPage";

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
  let logoVal = "/images/refinance_family_clean.png";

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

  const phoneVal = settings.header_phone || "0450 240 757";
  const emailVal = settings.support_email || "mortgage@mortgagexperts.com.au";
  const addressVal = settings.footer_address || "Level 20, 1 Market St, Sydney NSW 2000";

  // ── STRUCTURED GOOGLE JSON-LD SCHEMA FOR RICH SNIPPETS ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Refinancing a Loan - Mortgage Xperts",
    "description": settings.meta_description || "Compare and switch to a lower interest rate, consolidate your debts, or unlock equity to cash out.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "Mortgage Xperts",
      "image": "https://mortgagexperts.com.au/favicon.png",
      "telephone": phoneVal,
      "email": emailVal,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AU",
        "streetAddress": addressVal
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mortgagexperts.com.au"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Home Loans",
          "item": "https://mortgagexperts.com.au"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Refinancing a Loan",
          "item": `https://mortgagexperts.com.au${PAGE_PATH}`
        }
      ]
    }
  };

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
