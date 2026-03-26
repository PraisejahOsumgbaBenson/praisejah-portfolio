# Praisejah Portfolio

A personal portfolio and blog built with Next.js (App Router), focused on interactive UI, animation, and technical writing.

## Overview

This project powers `praisejah`'s portfolio site with:

- A custom animated landing experience
- About and contact pages
- An MDX-powered blog system with dynamic post routes
- Custom UI interactions (cursor effects, GSAP motion, terminal-style component)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- GSAP + Framer Motion
- MDX content via `gray-matter`
- `react-markdown` + `remark-gfm`
- `reading-time` metadata extraction
- `react-icons`

## Project Structure

```text
app/
  page.js                 # Home route
  about/page.js           # About route
  contact/page.js         # Contact route
  blog/page.js            # Blog listing
  blog/[slug]/page.js     # Blog detail pages
components/               # Reusable UI and page components
content/posts/            # MDX blog posts
lib/mdx.js                # Post loading + metadata utilities
public/                   # Static assets (fonts, images, sounds)
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run lint checks

## Content Management (Blog)

Blog posts are stored as `.mdx` files in `content/posts/`.

Each post is parsed through `lib/mdx.js`, which handles:

- slug generation
- frontmatter parsing
- reading time calculation
- sorting by published date

## Notes

- Analytics scripts are loaded in `app/layout.js` (Microsoft Clarity + Google Analytics).
- Font and media assets are served from `public/`.
- `next.config.js` includes custom handling for audio assets and image settings.

## Deployment

This project has been deployed on Vercel and is being prepared for Cloudflare Workers deployment using the OpenNext Cloudflare adapter.

If you want, I can also provide a Cloudflare-ready deployment section with exact `wrangler` and `opennext` commands for this repo.
