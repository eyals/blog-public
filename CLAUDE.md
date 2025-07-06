# CLAUDE.md

- **Project Name:** - Portable Blog Platform
- **GitHub Repository**: eyals/blog-public
- **Firebase project**: eyal-blog

## Goal

A simple, portable blogging system that includes:

- A public site for reading posts
- An admin UI for creating, editing, and publishing content
- All content backed up in standard folders for migration or static deployment

## Stack

- **Frontend**: React.js (admin + static site)
- **UI Library**: Shadcn/UI for admin, with Tailwind CSS for consistent, accessible components
- **Database**: Firebase Firestore (Native mode)
- **Auth**: Firebase Authentication with Google login
- **Hosting**: Firebase Hosting for both public site and static assets (including post images)
- **Automation**: Claude-driven feature development via GitHub Issues

## Folder Structure

```
/admin/ → Admin UI (React)
/site/ → Static HTML + assets for public site (rendered from content)
/functions/ → Optional helper scripts (e.g., deploy, export)
/content/ → Markdown, metadata, and images per post
└── posts/
slug/
index.md
meta.json
image.jpg
/backups/ → Generated exports in portable structure
```

## Post Structure & Principles

- Each post lives in its own folder (`posts/slug/`)
- Markdown is content only (no frontmatter)
- Metadata is separate (`meta.json`)
- Images live next to the post (`image.jpg`)
- Markdown can reference images as `[image: image.jpg]`
- Static HTML is generated into `/site/posts/slug/index.html`
- When published, static content + images are deployed to Firebase Hosting

## Admin Experience

- Google login required
- List + search + filter posts
- Markdown editor with preview
- Upload/insert images into post folder
- Publish flag triggers static HTML generation
- Optional Claude assistance for drafting, improving, tagging

## Public Experience

- Clean, mobile-friendly blog layout
- Posts sorted by date, with pinned posts first
- Each post shows metadata and share buttons
- Supports Open Graph metadata and SEO tags
- Fast load, no JS required for reading

## Claude Behavior

- Build feature-by-feature using GitHub Issues
- Always follow post folder principles and maintain portability
- Use automation and scripts when needed (e.g., export, deploy)
- **Always use Shadcn/UI components** for consistent UI design and accessibility
- Prefer Shadcn components over custom styling when available
- Prompt the user only when config or API keys are required

---

## Development Workflow

- Whenever starting new task, completing a task from a plan, or wrapping up a feature, refer to docs/development/feature-guide.md for instructions.
- When reading from GitHub or managing code, use MCP. When modifying issues - use CLI using the token in .env.development. Never close issues without user confirmation

---

## Development Guidelines

- Always prefer using native features built into JS or used libraries. Avoid custom code, unless it serves a purpose that is unsupported natively.
- Never ask the user for confirmation on file changes, curl commands, reading and writing github issues, killing or starting servers. You have permission to execute as you see fit.
- Never offer to install docker or any other local environment. Deploy to the dev servers instead.
- When working on Github issues, (1) Never close issues without an explicit instruction. (2) Add comments when the user asks to change the requirements (3) when closing it, describe what you did.
- Before running 'npm run dev', check if the server is already running. If not - check if port 3000 is used. If so - kill it, and run 'npm run dev' again to open port 3000.

---

## Firebase Configuration

**Project ID:** eyal-blog

**Services Enabled:**

- Firestore Database (Native mode)
- Firebase Authentication (Google provider)
- Firebase Hosting
- Firebase Functions

**Note:** Firebase configuration keys are stored in `.env.development` for security.
