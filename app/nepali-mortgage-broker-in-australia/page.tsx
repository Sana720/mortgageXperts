import type { Metadata } from "next";
import { ClientPage } from "./ClientPage";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";

const PAGE_PATH = "/nepali-mortgage-broker-in-australia";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
  return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
    title: "Nepali Mortgage Broker Australia | Buying Your First Home | Mortgage Xperts",
    description:
      "Secure your first home in Australia with confidence. Discover government grants, calculate your borrowing power, and explore low-deposit schemes with Australia's top Nepali mortgage brokers, led by Aakash KC.",
    keywords: [
      "Nepali mortgage broker Australia",
      "Nepali mortgage broker Sydney",
      "First home buyer Nepali broker",
      "First Home Guarantee scheme",
      "Nepali mortgage broker Melbourne",
      "Nepali mortgage broker Brisbane",
      "Nepali mortgage broker Adelaide",
      "Aakash KC Mortgage Broker",
    ],
    imageAlt: "Happy First Home Buyer Family in Australia",
  });
}

export default async function Page() {
  const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);

  const jsonLd = buildJsonLd(
    "Buying a First Home - Nepali Mortgage Brokerage",
    pageHeroSettings?.meta_description ||
      "Secure your first home in Australia with confidence. Explore low-deposit schemes and calculate borrowing capacity.",
    PAGE_PATH,
    settings,
    [
      { name: "Home Loans", item: "https://mortgagexperts.com.au" },
      {
        name: "Buying a First Home",
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
