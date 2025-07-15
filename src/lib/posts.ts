import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publish_date: string;
  excerpt?: string;
  image_url?: string;
  seo_title?: string;
}

export interface PostData extends PostMetadata {
  content: string;
  contentHtml: string;
}

export function getSortedPostsData(): PostMetadata[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const postFolders = fs.readdirSync(postsDirectory);
  const allPostsData: PostMetadata[] = [];

  for (const folder of postFolders) {
    // Skip _trash folder
    if (folder === '_trash') {
      continue;
    }
    
    const folderPath = path.join(postsDirectory, folder);
    const indexFile = path.join(folderPath, 'index.md');
    
    // Skip if not a directory or if index.md doesn't exist
    if (!fs.statSync(folderPath).isDirectory() || !fs.existsSync(indexFile)) {
      continue;
    }

    try {
      const fileContents = fs.readFileSync(indexFile, 'utf8');
      const { data } = matter(fileContents);
      
      // Only include published posts
      if (data.published) {
        allPostsData.push({
          id: data.id || folder,
          title: data.title || 'Untitled',
          slug: data.slug || folder,
          published: data.published,
          publish_date: data.publish_date || new Date().toISOString().split('T')[0],
          excerpt: data.excerpt || null,
          image_url: data.image_url || data.image || null,
          seo_title: data.seo_title || null,
        });
      }
    } catch (error) {
      console.error(`Error reading post ${folder}:`, error);
    }
  }

  // Sort posts by publish date (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
  });
}

export async function getPostData(slug: string): Promise<PostData | null> {
  // Find the post by slug
  const postFolders = fs.readdirSync(postsDirectory);
  let postFolder = null;
  
  for (const folder of postFolders) {
    // Skip _trash folder
    if (folder === '_trash') {
      continue;
    }
    
    const folderPath = path.join(postsDirectory, folder);
    const indexFile = path.join(folderPath, 'index.md');
    
    if (fs.statSync(folderPath).isDirectory() && fs.existsSync(indexFile)) {
      try {
        const fileContents = fs.readFileSync(indexFile, 'utf8');
        const { data } = matter(fileContents);
        
        if (data.slug === slug && data.published) {
          postFolder = folder;
          break;
        }
      } catch (error) {
        console.error(`Error reading post ${folder}:`, error);
      }
    }
  }

  if (!postFolder) {
    return null;
  }

  const fullPath = path.join(postsDirectory, postFolder, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process YouTube embeds before markdown processing
  const processedContent = await remark()
    .use(html)
    .process(content);
  let contentHtml = processedContent.toString();
  
  // Process YouTube embeds after markdown conversion
  const youtubeRegex = /:::youtube\{id="([^"]+)"(?:\s+start="(\d+)")?\}/g;
  contentHtml = contentHtml.replace(youtubeRegex, (match, videoId, startTime) => {
    const embedUrl = startTime 
      ? `https://www.youtube.com/embed/${videoId}?start=${startTime}`
      : `https://www.youtube.com/embed/${videoId}`;
    
    return `<div class="w-full aspect-[16/9] bg-gray-300">
<iframe 
class="w-full h-full" 
src="${embedUrl}" 
frameborder="0" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
referrerpolicy="strict-origin-when-cross-origin" 
allowfullscreen>
</iframe>
</div>`;
  });

  return {
    id: data.id || postFolder,
    title: data.title || 'Untitled',
    slug: data.slug || postFolder,
    published: data.published,
    publish_date: data.publish_date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || null,
    image_url: data.image_url || data.image || null,
    seo_title: data.seo_title || null,
    content,
    contentHtml,
  };
}

export function getAllPostSlugs(): string[] {
  const postFolders = fs.readdirSync(postsDirectory);
  const slugs: string[] = [];

  for (const folder of postFolders) {
    // Skip _trash folder
    if (folder === '_trash') {
      continue;
    }
    
    const folderPath = path.join(postsDirectory, folder);
    const indexFile = path.join(folderPath, 'index.md');
    
    if (fs.statSync(folderPath).isDirectory() && fs.existsSync(indexFile)) {
      try {
        const fileContents = fs.readFileSync(indexFile, 'utf8');
        const { data } = matter(fileContents);
        
        if (data.published && data.slug) {
          slugs.push(data.slug);
        }
      } catch (error) {
        console.error(`Error reading post ${folder}:`, error);
      }
    }
  }

  return slugs;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}