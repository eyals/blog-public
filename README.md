This repo plays two parts in a blog publishing system.

## blog-public repo (THIS!)

- Stores the post files (markdown and media) in 'posts'
- Code for generator scripts, which build into 'out'

## git-backend vercel proj

- Used as an api to read/write from repo
- Uses the application [blog-content-manager](https://github.com/settings/apps/blog-content-manager) to access the repo.
- might merge into blog-admin with Next.js

## blog-admin vercel proj

- serving an admin UI (React. Maybe Next.js later)
- Calling the git-backend endpoints from client

## blog-public vercel proj (THIS!)

- Listens to repo
- Detects changes in 'posts', and runs build to kick off generators.
- Web server serves the content of 'out'
