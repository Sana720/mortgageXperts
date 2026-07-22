import { notFound } from "next/navigation";
import BranchClientPage, { CityData } from "./ClientPage";
import { Metadata } from "next";
import { loadPageData, buildPageMetadata, buildJsonLd } from "@/lib/pageLoader";
import { executeQuery } from "@/lib/db";
import { cityDataMap } from "./cityData";

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const pagePath = `/branches/${city}`;
  const { settings, pageHeroSettings, pageContent, pageData } = await loadPageData(pagePath);
  
  const data = (pageData as CityData) || cityDataMap[city];
  if (!data) return { title: "Branch Not Found" };

  return buildPageMetadata(pagePath, pageHeroSettings, settings, {
    title: `Mortgage Xperts ${data.city} | Home Loans in ${data.state}`,
    description: `${data.city}'s trusted Nepali mortgage brokers. Compare 40+ lenders, access ${data.state} government grants and secure the best home loan rate. Free consultation.`,
    keywords: [
      `mortgage broker ${data.city}`,
      `home loans ${data.city}`,
      `${data.stateShort} mortgage broker`,
      `Nepali mortgage broker ${data.city}`,
      `first home buyer ${data.city}`,
    ],
  });
}

// ── Static Params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(cityDataMap).map((city) => ({ city }));
}

// ── Page Component ────────────────────────────────────────────────────────────
export default async function BranchPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const pagePath = `/branches/${city}`;
  const { settings, pageHeroSettings, pageContent, pageData } = await loadPageData(pagePath);
  
  const cityData = (pageData as CityData) || cityDataMap[city];

  if (!cityData) {
    notFound();
  }

  // Fetch branch-specific team lead from DB (editable via admin)
  type DbMember = { name: string; role: string; image: string; bio: string; phone: string };
  let dbTeamLead: DbMember | null = null;
  try {
    const rows = await executeQuery<DbMember[]>(
      'SELECT name, role, image, bio, phone FROM team_members WHERE branch = ? LIMIT 1',
      [city]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      dbTeamLead = rows[0];
    }
  } catch {
    // DB not available — fall back to static data
  }

  const jsonLd = buildJsonLd(
    `Home Loans in ${cityData.city} - Mortgage Xperts`,
    pageHeroSettings?.meta_description || `${cityData.city}'s trusted Nepali mortgage brokers. Compare 40+ lenders and secure the best rate in ${cityData.state}.`,
    pagePath,
    settings,
    [
      { name: "Our Branches", item: `https://mortgagexperts.com.au${pagePath}` },
      {
        name: cityData.city,
        item: `https://mortgagexperts.com.au${pagePath}`,
      },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BranchClientPage cityData={cityData} settings={settings} pageHeroSettings={pageHeroSettings} pageContent={pageContent} dbTeamLead={dbTeamLead}
      />
    </>
  );
}
