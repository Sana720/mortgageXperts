/**
 * Shared utilities for admin panel integration
 * Provides helper functions for frontend components to fetch and use admin data
 */

export interface AdminSettings {
  header_phone?: string;
  support_email?: string;
  footer_address?: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  tiktok_url?: string;
  youtube_url?: string;
  hero_headline?: string;
  hero_subheadline?: string;
  logo_url?: string;
  site_icon_url?: string;
  interest_rate?: string;
  [key: string]: string | undefined;
}

/**
 * Fetch global settings from admin panel
 * Used by components to get phone, email, social links, etc.
 */
export async function fetchAdminSettings(): Promise<AdminSettings> {
  try {
    const res = await fetch('/api/admin/settings');
    if (res.ok) {
      const data = await res.json();
      return data.settings || {};
    }
  } catch (err) {
    console.error('Failed to fetch admin settings:', err);
  }
  return {};
}

/**
 * Get all blog posts from admin panel
 */
export async function fetchAdminBlogs() {
  try {
    const res = await fetch('/api/admin/blogs');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
  }
  return [];
}

/**
 * Get all testimonials from admin panel
 */
export async function fetchAdminTestimonials() {
  try {
    const res = await fetch('/api/admin/testimonials');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch testimonials:', err);
  }
  return [];
}

/**
 * Get page content from admin CMS
 */
export async function fetchPageContent(pagePath: string) {
  try {
    const res = await fetch(`/api/admin/page-content?page_path=${encodeURIComponent(pagePath)}`);
    if (res.ok) {
      const data = await res.json();
      return data.content || '';
    }
  } catch (err) {
    console.error(`Failed to fetch page content for ${pagePath}:`, err);
  }
  return '';
}
