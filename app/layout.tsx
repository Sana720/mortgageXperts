import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

import { loadPageData } from "@/lib/pageLoader";

export async function generateMetadata(): Promise<Metadata> {
  let titleVal = "Mortgage Xperts - Australia | Leading Nepali Mortgage Brokerage Firm";
  let descVal = "Australia's top-rated Nepali mortgage experts, helping clients secure better home loans, refinance smarter, and invest with confidence - backed by 5-star reviews and trusted by hundreds of satisfied clients, led by Aakash, The Mortgage Mate.";
  let keywordsVal: string[] = [
    "Nepali mortgage broker",
    "Nepali mortgage broker Australia",
    "Nepali mortgage broker Sydney",
    "Nepali mortgage broker Melbourne",
    "Nepali mortgage broker Brisbane",
    "Nepali mortgage broker Adelaide",
    "Nepali mortgage broker Perth",
    "Mortgage Xperts",
    "Aakash Mortgage Mate",
    "Aakash K C Mortgage Broker",
    "Nepali home loan broker",
    "Refinance home loan",
    "First home buyer Nepali broker",
    "Best mortgage broker Sydney",
    "Australian mortgage broker"
  ];
  let faviconVal = "/favicon.png";
  let logoVal = "/images/logo.png";

  try {
    const { settings, pageHeroSettings } = await loadPageData("/");
    if (pageHeroSettings?.meta_title) titleVal = pageHeroSettings.meta_title;
    if (pageHeroSettings?.meta_description) descVal = pageHeroSettings.meta_description;
    if (pageHeroSettings?.meta_keywords) {
      keywordsVal = pageHeroSettings.meta_keywords.split(",").map((k: string) => k.trim());
    }
    if (settings.site_icon_url) faviconVal = settings.site_icon_url;
    if (settings.logo_url) logoVal = settings.logo_url;
  } catch (error) {
    console.error("Failed to load settings in generateMetadata:", error);
  }

  return {
    metadataBase: new URL("https://mortgagexperts.com.au"),
    title: titleVal,
    description: descVal,
    keywords: keywordsVal,
    authors: [{ name: "Mortgage Xperts" }],
    robots: "index, follow",
    alternates: {
      canonical: "https://mortgagexperts.com.au/",
    },
    icons: {
      icon: faviconVal,
      shortcut: "/favicon.ico",
      apple: faviconVal,
    },
    openGraph: {
      title: titleVal,
      description: descVal,
      url: "https://mortgagexperts.com.au/",
      siteName: "Mortgage Xperts",
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: logoVal,
          width: 1200,
          height: 630,
          alt: "Mortgage Xperts Logo",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleVal,
      description: descVal,
      images: [logoVal],
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
