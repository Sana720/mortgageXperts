import { executeQuery } from '@/lib/db';
import type { Metadata } from 'next';

export type GlobalSettings = Record<string, string>;

export interface PageHeroSettings {
  page_path?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  hero_badge?: string;
  hero_title?: string;
  hero_subtext?: string;
  hero_image?: string;
  hero_btn1_text?: string;
  hero_btn1_link?: string;
  hero_btn2_text?: string;
  hero_btn2_link?: string;
  slides?: string;
}

export interface PageData {
  settings: GlobalSettings;
  pageHeroSettings: PageHeroSettings | undefined;
}

/**
 * Shared server-side data loader for all page routes.
 * Fetches global settings + page-specific hero/meta settings in two queries.
 * Used by every page.tsx to eliminate boilerplate duplication.
 *
 * Results are intentionally NOT cached here so the page always reflects
 * the latest admin changes. Add unstable_cache at call site if needed.
 */
export async function loadPageData(pagePath: string): Promise<PageData> {
  const settings: GlobalSettings = {};
  let pageHeroSettings: PageHeroSettings | undefined = undefined;

  try {
    const [settingsRows, pageRows] = await Promise.all([
      executeQuery<Array<{ key: string; value: string }>>(
        'SELECT `key`, `value` FROM global_settings'
      ),
      executeQuery<PageHeroSettings[]>(
        'SELECT * FROM page_meta_hero WHERE page_path = ?',
        [pagePath]
      ),
    ]);

    if (Array.isArray(settingsRows)) {
      settingsRows.forEach((row) => {
        settings[row.key] = row.value;
      });
    }

    if (Array.isArray(pageRows) && pageRows.length > 0) {
      pageHeroSettings = pageRows[0];
    }
  } catch (error) {
    console.error(`[loadPageData] Failed to load data for "${pagePath}":`, error);
  }

  return { settings, pageHeroSettings };
}

/**
 * Builds a standard Metadata object for a sub-page.
 * Falls back to the provided defaults if DB has no override.
 */
export function buildPageMetadata(
  pagePath: string,
  pageHeroSettings: PageHeroSettings | undefined,
  settings: GlobalSettings,
  defaults: {
    title: string;
    description: string;
    keywords: string[];
    imageAlt?: string;
  }
): Metadata {
  const titleVal =
    (pageHeroSettings?.meta_title) || defaults.title;
  const descVal =
    (pageHeroSettings?.meta_description) || defaults.description;
  const keywordsVal =
    pageHeroSettings?.meta_keywords
      ? pageHeroSettings.meta_keywords.split(',').map((k) => k.trim())
      : defaults.keywords;

  const logoVal = settings.logo_url || '/images/logo.png';
  const canonicalUrl = `https://mortgagexperts.com.au${pagePath}`;

  return {
    title: titleVal,
    description: descVal,
    keywords: keywordsVal,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: titleVal,
      description: descVal,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: logoVal,
          width: 1200,
          height: 630,
          alt: defaults.imageAlt || titleVal,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleVal,
      description: descVal,
      images: [logoVal],
    },
  };
}

/**
 * Builds a standard JSON-LD WebPage schema object.
 */
export function buildJsonLd(
  pageName: string,
  description: string,
  pagePath: string,
  settings: GlobalSettings,
  breadcrumbs: Array<{ name: string; item: string }>
) {
  const phoneVal = settings.header_phone || '0450 240 757';
  const emailVal = settings.support_email || 'mortgage@mortgagexperts.com.au';
  const addressVal = settings.footer_address || 'Sydney, Australia';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    description,
    url: `https://mortgagexperts.com.au${pagePath}`,
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Mortgage Xperts',
      image: 'https://mortgagexperts.com.au/favicon.png',
      telephone: phoneVal,
      email: emailVal,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AU',
        streetAddress: addressVal,
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://mortgagexperts.com.au',
        },
        ...breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: crumb.name,
          item: crumb.item,
        })),
      ],
    },
  };
}
