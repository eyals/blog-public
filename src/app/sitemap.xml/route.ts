import { NextResponse } from 'next/server';
import { generateSitemap } from '@/lib/sitemap';

export const dynamic = 'force-static';

export async function GET() {
  const sitemap = generateSitemap();
  
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}