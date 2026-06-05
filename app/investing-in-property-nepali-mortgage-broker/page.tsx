import type { Metadata } from "next";
import { executeQuery } from "@/lib/db";
import { ClientPage } from "./ClientPage";

const PAGE_PATH = "/investing-in-property-nepali-mortgage-broker";
const PAGE_TITLE = "Investing in Property";

export async function generateMetadata(): Promise<Metadata> {
  let titleVal = "Property Investment Loan Strategies | Mortgage Xperts";
  let descVal = "Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.";
  let keywordsVal = [
    "property investment loan",
    "investment home loan",
    "buy investment property",
    "equity loan"
  ];
  let logoVal = "/images/hero_slide_3_yellow.png";

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
    "name": "Investing in Property - Mortgage Xperts",
    "description": settings.meta_description || "Maximize your borrowing capacity and structure your investment loans for long-term wealth creation.",
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
          "name": "Investing in Property",
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
