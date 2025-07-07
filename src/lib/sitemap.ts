import { getSortedPostsData } from './posts';

export function generateSitemap(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overtink.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const posts = getSortedPostsData();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  posts.forEach((post) => {
    sitemap += `
  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${post.publish_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';
  
  return sitemap;
}