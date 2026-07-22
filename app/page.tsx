import type { Metadata } from "next";
import { loadPageData, type PageHeroSettings } from "@/lib/pageLoader";
import { buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";
import ClientHomePage from "./ClientHomePage";

const PAGE_PATH = "/";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { settings, pageHeroSettings } = await loadPageData(PAGE_PATH);
    return buildPageMetadata(PAGE_PATH, pageHeroSettings, settings, {
      title: "Mortgage Xperts - Home Loans Australia",
      description: "Expert mortgage brokers helping you find the best home loans. First home buyers, refinancing, investment properties, and self-employed loans.",
      keywords: ["mortgage broker", "home loans", "first home buyer", "refinancing", "investment property"],
    });
  } catch (error) {
    return {
      title: "Mortgage Xperts - Home Loans Australia",
      description: "Expert mortgage brokers helping you find the best home loans.",
    };
  }
}

export default async function Home() {
  let settings: Record<string, string> = {};
  let pageHeroSettings: PageHeroSettings | undefined = undefined;
  let pageSections: string[] = [];

  try {
    const data = await loadPageData(PAGE_PATH);
    settings = data.settings || {};
    pageHeroSettings = data.pageHeroSettings || undefined;
    pageSections = data.pageSections || [];
  } catch (error) {
    console.error("Failed to load homepage data:", error);
  }

  return <ClientHomePage settings={settings} pageHeroSettings={pageHeroSettings} pageSections={pageSections} />;
}
