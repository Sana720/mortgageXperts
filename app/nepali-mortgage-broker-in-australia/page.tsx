import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { executeQuery } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  let titleVal = "Nepali Mortgage Broker Australia | Buying Your First Home | Mortgage Xperts";
  let descVal = "Secure your first home in Australia with confidence. Discover government grants, calculate your borrowing power, and explore low-deposit schemes with Australia's top Nepali mortgage brokers, led by Aakash KC.";
  let keywordsVal = [
    "Nepali mortgage broker Australia",
    "Nepali mortgage broker Sydney",
    "First home buyer Nepali broker",
    "First Home Guarantee scheme",
    "Nepali mortgage broker Melbourne",
    "Nepali mortgage broker Brisbane",
    "Nepali mortgage broker Adelaide",
    "Aakash KC Mortgage Broker"
  ];
  let logoVal = "/images/first_home_family.png";

  try {
    const pageRows = await executeQuery("SELECT * FROM page_meta_hero WHERE page_path = '/nepali-mortgage-broker-in-australia'");
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
    console.error("Failed to load settings in generateMetadata for nepali page:", error);
  }

  return {
    title: titleVal,
    description: descVal,
    keywords: keywordsVal,
    alternates: {
      canonical: "https://mortgagexperts.com.au/nepali-mortgage-broker-in-australia",
    },
    openGraph: {
      title: titleVal,
      description: descVal,
      url: "https://mortgagexperts.com.au/nepali-mortgage-broker-in-australia",
      type: "website",
      images: [
        {
          url: logoVal,
          width: 1200,
          height: 630,
          alt: "Happy First Home Buyer Family in Australia",
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
    const pageRows = await executeQuery("SELECT * FROM page_meta_hero WHERE page_path = '/nepali-mortgage-broker-in-australia'");
    if (Array.isArray(pageRows) && pageRows.length > 0) {
      pageHeroSettings = pageRows[0];
    }
  } catch (error) {
    console.error("Failed to load settings in Page Server Component:", error);
  }

  const phoneVal = settings.header_phone || "0450 240 757";
  const emailVal = settings.support_email || "mortgage@mortgagexperts.com.au";
  const addressVal = settings.footer_address || "Level 20, 1 Market St, Sydney NSW 2000";

  // ── STRUCTURED GOOGLE JSON-LD SCHEMA FOR RICH SNIPPETS ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Buying a First Home - Nepali Mortgage Brokerage",
    "description": settings.meta_description || "Secure your first home in Australia with confidence. Explored low-deposit schemes and calculate borrowing capacity.",
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
          "name": "Buying a First Home",
          "item": "https://mortgagexperts.com.au/nepali-mortgage-broker-in-australia"
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
