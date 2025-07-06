# Feature Development Index

This file tracks all features developed in chronological order.

---
## Migration Step 5: Next.js Public Blog Implementation
Complete implementation of the new public-facing blog using Next.js with static export, replicating the reference theme design and serving content from the existing posts repository.

- **Dates:** 2025-07-06 - 2025-07-06
- **Folder:** 20250706-#1-migration-step-5-nextjs-blog
- **GitHub:** Issue [1](https://github.com/eyals/blog-public/issues/1) | No PR (pending)
- **Main Files:**
  - `src/app/layout.tsx` – Root layout with font loading and SEO metadata
  - `src/app/page.tsx` – Homepage displaying published posts in alternating layout
  - `src/app/[slug]/page.tsx` – Dynamic post pages with proper SEO and structured data
  - `src/lib/posts.ts` – Data fetching library for markdown posts with frontmatter
  - `tailwind.config.ts` – Tailwind configuration with Space Grotesk and JetBrains Mono fonts
  - `src/app/globals.css` – Global styles and custom prose styling
  - `next.config.js` – Next.js configuration for static export
- **Dependencies:**
  - Next.js 15 with App Router and TypeScript
  - Tailwind CSS with custom typography plugin
  - Gray-matter for frontmatter parsing
  - Remark for markdown to HTML conversion
  - Google Fonts (Space Grotesk, JetBrains Mono)
- **Highlights:**
  - Static export configuration for optimal CDN deployment
  - Responsive design matching reference theme with alternating post layouts
  - Comprehensive SEO implementation with Open Graph and structured data
  - Font loading optimization using HTML head links instead of CSS imports
  - Support for both 'image' and 'image_url' frontmatter fields for backward compatibility
  - Comprehensive Puppeteer test suite covering all functionality
  - Next.js 15 async params compatibility for dynamic routes

---
