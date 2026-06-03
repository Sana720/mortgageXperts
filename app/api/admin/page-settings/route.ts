/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get('page_path');

  try {
    if (pagePath) {
      const rows = await executeQuery('SELECT * FROM page_meta_hero WHERE page_path = ?', [pagePath]);
      if (rows && rows.length > 0) {
        return NextResponse.json({ pageSettings: rows[0] });
      } else {
        return NextResponse.json({ 
          pageSettings: {
            page_path: pagePath,
            meta_title: '',
            meta_description: '',
            meta_keywords: '',
            hero_badge: '',
            hero_title: '',
            hero_subtext: '',
            hero_image: '',
            hero_btn1_text: '',
            hero_btn1_link: '',
            hero_btn2_text: '',
            hero_btn2_link: '',
            slides: '[]'
          }
        });
      }
    } else {
      const rows = await executeQuery('SELECT * FROM page_meta_hero');
      return NextResponse.json({ pageSettingsList: rows });
    }
  } catch (error: any) {
    console.error('Failed to fetch page settings:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      page_path,
      meta_title,
      meta_description,
      meta_keywords,
      hero_badge,
      hero_title,
      hero_subtext,
      hero_image,
      hero_btn1_text,
      hero_btn1_link,
      hero_btn2_text,
      hero_btn2_link,
      slides
    } = body;

    if (!page_path) {
      return NextResponse.json({ error: 'page_path is required' }, { status: 400 });
    }

    const slidesStr = typeof slides === 'string' ? slides : JSON.stringify(slides || []);

    await executeQuery(
      `INSERT INTO page_meta_hero 
       (page_path, meta_title, meta_description, meta_keywords, hero_badge, hero_title, hero_subtext, hero_image, hero_btn1_text, hero_btn1_link, hero_btn2_text, hero_btn2_link, slides)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       meta_title = VALUES(meta_title),
       meta_description = VALUES(meta_description),
       meta_keywords = VALUES(meta_keywords),
       hero_badge = VALUES(hero_badge),
       hero_title = VALUES(hero_title),
       hero_subtext = VALUES(hero_subtext),
       hero_image = VALUES(hero_image),
       hero_btn1_text = VALUES(hero_btn1_text),
       hero_btn1_link = VALUES(hero_btn1_link),
       hero_btn2_text = VALUES(hero_btn2_text),
       hero_btn2_link = VALUES(hero_btn2_link),
       slides = VALUES(slides)`,
      [
        page_path,
        meta_title || '',
        meta_description || '',
        meta_keywords || '',
        hero_badge || '',
        hero_title || '',
        hero_subtext || '',
        hero_image || '',
        hero_btn1_text || '',
        hero_btn1_link || '',
        hero_btn2_text || '',
        hero_btn2_link || '',
        slidesStr
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to save page settings:', error);
    return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
  }
}
