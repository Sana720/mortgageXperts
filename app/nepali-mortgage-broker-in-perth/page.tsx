import { redirect } from "next/navigation";
import { Metadata } from "next";
import { loadPageData, buildPageMetadata } from "@/lib/pageLoader";

export async function generateMetadata(): Promise<Metadata> {
  const pagePath = "/nepali-mortgage-broker-in-perth";
  const { settings, pageHeroSettings } = await loadPageData(pagePath);

  return buildPageMetadata(pagePath, pageHeroSettings, settings, {
    title: "Nepali Mortgage Broker in Perth | Mortgage Xperts WA",
    description:
      "Looking for a Nepali mortgage broker in Perth? Mortgage Xperts helps WA families secure home loans, refinance smarter and access 40+ lenders — with bilingual Nepali support.",
    keywords: [
      "Nepali mortgage broker Perth",
      "Nepali broker Western Australia",
      "home loans Perth",
      "mortgage broker Perth WA",
      "Perth first home buyer loan",
      "Nepali community mortgage Perth",
    ],
  });
}

export default function NepaliMortgageBrokerPerthPage() {
  redirect("/branches/perth");
}
