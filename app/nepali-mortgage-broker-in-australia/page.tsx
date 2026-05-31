import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";

// ── HIGH-PERFORMANCE SEO METADATA ──
export const metadata: Metadata = {
  title: "Nepali Mortgage Broker Australia | Buying Your First Home | Mortgage Xperts",
  description: "Secure your first home in Australia with confidence. Discover government grants, calculate your borrowing power, and explore low-deposit schemes with Australia's top Nepali mortgage brokers, led by Aakash KC.",
  keywords: [
    "Nepali mortgage broker Australia",
    "Nepali mortgage broker Sydney",
    "First home buyer Nepali broker",
    "First Home Guarantee scheme",
    "Nepali mortgage broker Melbourne",
    "Nepali mortgage broker Brisbane",
    "Nepali mortgage broker Adelaide",
    "Aakash KC Mortgage Broker"
  ],
  alternates: {
    canonical: "https://mortgagexperts.com.au/nepali-mortgage-broker-in-australia",
  },
  openGraph: {
    title: "Nepali Mortgage Broker Australia | Buying Your First Home | Mortgage Xperts",
    description: "Secure your first home in Australia with confidence. Discover government grants, calculate your borrowing power, and explore low-deposit schemes with Australia's top Nepali mortgage brokers, led by Aakash KC.",
    url: "https://mortgagexperts.com.au/nepali-mortgage-broker-in-australia",
    type: "website",
    images: [
      {
        url: "/images/first_home_family.png",
        width: 1200,
        height: 630,
        alt: "Happy First Home Buyer Family in Australia",
      }
    ],
  }
};

export default function Page() {
  // ── STRUCTURED GOOGLE JSON-LD SCHEMA FOR RICH SNIPPETS ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Buying a First Home - Nepali Mortgage Brokerage",
    "description": "Secure your first home in Australia with confidence. Explored low-deposit schemes and calculate borrowing capacity.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "Mortgage Xperts",
      "image": "https://mortgagexperts.com.au/favicon.png",
      "telephone": "0450 240 757",
      "email": "mortgage@mortgagexperts.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AU"
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
      <ClientPage />
    </>
  );
}
