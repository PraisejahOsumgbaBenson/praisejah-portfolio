# Praisejah Portfolio

A highly interactive, animated personal portfolio and technical blog built with Next.js (App Router). This project showcases modern web development techniques including GSAP animations, Framer Motion, custom cursor effects, a terminal-style component, and an MDX-powered blog system.

![Portfolio Preview](https://via.placeholder.com/1200x600/1a1a2e/e94560?text=Praisejah+Portfolio)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Content Management](#content-management)
- [Custom Components](#custom-components)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Core Features

- **Animated Landing Page**: Custom GSAP-powered entrance animations with staggered reveals
- **Interactive Terminal Component**: A functional terminal-style component for displaying information
- **Custom Cursor Effects**: Personalized cursor with trailing animations and hover states
- **Responsive Design**: Fully responsive layouts that work across all device sizes
- **Aura Background Effects**: Dynamic background animations using Three.js

### Pages

- **Home**: Animated landing page with intro animations and featured content
- **About**: Personal bio, experience timeline, and skills showcase
- **Contact**: Contact form with interactive elements
- **Blog Listing**: Paginated blog posts with category filtering
- **Blog Detail**: Full MDX-powered blog posts with syntax highlighting

### Blog System

- **MDX Support**: Write posts in MDX format with React component support
- **Frontmatter**: Title, date, excerpt, cover image, and tags metadata
- **Reading Time**: Automatic reading time calculation
- **Syntax Highlighting**: Code block support with remark-gfm

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | ^16.2.1 | React framework with App Router |
| React | ^19.2.4 | UI library |
| React DOM | ^19.2.4 | React rendering for DOM |

### Animation & Motion

| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | ^3.14.2 | Advanced animations and timeline control |
| Framer Motion | ^12.5.0 | React-specific animations |
| Three.js | ^0.170.0 | 3D background effects |

### Content & Data

| Library | Version | Purpose |
|---------|---------|---------|
| gray-matter | ^4.0.3 | Parse frontmatter from MDX files |
| react-markdown | ^10.1.0 | Render MDX content as React components |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown support |
| reading-time | ^1.5.0 | Calculate estimated reading time |

### UI & Utilities

| Library | Version | Purpose |
|---------|---------|---------|
| react-icons | ^5.5.0 | Icon library for UI elements |
| split-type | ^0.3.4 | Text splitting for advanced animations |

### Development & Deployment

| Tool | Version | Purpose |
|------|---------|---------|
| @opennextjs/cloudflare | ^1.17.3 | Cloudflare Workers adapter |
| wrangler | ^4.77.0 | Cloudflare Workers CLI |
| eslint | ^8.0.0 | Code linting |
| eslint-config-next | ^14.2.0 | Next.js specific ESLint config |

---

## Project Structure

```
praisejah-portfolio/
├── app/                          # Next.js App Router pages
│   ├── page.js                   # Home page
│   ├── layout.js                 # Root layout with providers
│   ├── about/
│   │   └── page.js               # About page
│   ├── contact/
│   │   └── page.js               # Contact page
│   └── blog/
│       ├── page.js               # Blog listing page
│       ├── BlogListClient.js     # Blog list client component
│       └── [slug]/
│           ├── page.js           # Dynamic blog post page
│           └── BlogDetailClient.js # Blog detail client component
│
├── components/                   # Reusable UI components
│   ├── Header.js                # Navigation header
│   ├── Header.css                # Header styles
│   ├── Intro.js                  # Landing intro section
│   ├── Intro.css                 # Intro styles
│   ├── HomeContent.js            # Home page content
│   ├── About.js                  # About page component
│   ├── About.css                 # About styles
│   ├── Contact.js                # Contact form component
│   ├── Contact.css               # Contact styles
│   ├── BlogCard.js               # Blog post card component
│   ├── BlogCard.css              # Blog card styles
│   ├── Terminal.js               # Terminal component
│   ├── Terminal.css              # Terminal styles
│   ├── Cursor.js                 # Custom cursor component
│   ├── Cursor.css                # Cursor styles
│   ├── AuraBackground.js         # 3D background component
│   ├── AuraBackground.css        # Aura background styles
│   ├── ClientProviders.js        # Client-side providers
│   └── Style.css                 # Global component styles
│
├── content/
│   └── posts/                    # MDX blog posts
│       ├── getting-started-with-react-hooks.mdx
│       ├── mastering-css-grid-layout.mdx
│       ├── building-scalable-apis-with-nodejs.mdx
│       └── from-vercel-to-cloudflare.mdx
│
├── lib/
│   ├── mdx.js                   # MDX parsing utilities
│   └── posts.json               # Generated posts data
│
├── public/                       # Static assets
│   ├── images/                  # Image assets
│   ├── fonts/                   # Custom fonts
│   ├── sounds/                  # Audio files for interactions
│   └── favicon.ico              # Site favicon
│
├── scripts/                     # Build and utility scripts
│   ├── generate-posts-json.js   # Generate posts.json from MDX
│   └── copy-posts.js            # Copy posts for deployment
│
├── data/
│   └── experiences.json         # Experience data for About page
│
├── next.config.js               # Next.js configuration
├── open-next.config.ts          # OpenNext Cloudflare config
├── package.json                 # Project dependencies
├── jsconfig.json                # JavaScript configuration
└── README.md                    # This file
```

### Directory Breakdown

#### `app/` - Next.js App Router

The `app` directory uses Next.js 13+ App Router architecture with server components by default.

- `layout.js`: Root layout that wraps all pages, includes ClientProviders for context
- `page.js`: Home page with animated landing experience
- `about/page.js`: About page with experience timeline
- `contact/page.js`: Contact page with form
- `blog/page.js`: Blog listing with client-side filtering
- `blog/[slug]/page.js`: Dynamic route for individual blog posts

#### `components/`

Reusable React components with co-located CSS files:

- **Navigation**: `Header.js` - Responsive navigation with animated transitions
- **Landing**: `Intro.js`, `HomeContent.js` - Animated hero section
- **Content**: `About.js`, `Contact.js` - Page-specific content components
- **Blog**: `BlogCard.js` - Blog post preview cards
- **Interactive**: `Terminal.js` - Terminal-style information display
- **Effects**: `Cursor.js` - Custom animated cursor
- **Background**: `AuraBackground.js` - Three.js particle background

#### `content/posts/`

MDX blog posts with frontmatter. Each file contains:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
coverImage: "/images/post-cover.jpg"
tags: ["react", "javascript"]
---

Your content here...
```

#### `lib/`

- `mdx.js`: Utility functions for reading, parsing, and sorting MDX posts
- `posts.json`: Pre-generated JSON index of all blog posts

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/PraisejahOsumgbaBenson/praisejah-portfolio.git
cd praisejah-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** (optional)

Create a `.env.local` file in the root directory:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=your-ga-id
NEXT_PUBLIC_MS_CLARITY_ID=your-clarity-id
```

4. **Start development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to: `http://localhost:3000`

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Generate posts JSON and build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run generate-posts` | Generate posts.json from MDX files |
| `npm run copy-posts` | Copy posts for build process |
| `npm run cf-build` | Build for Cloudflare Workers |
| `npm run cf-copy-posts` | Copy posts to Cloudflare build output |
| `npm run preview` | Preview Cloudflare Workers build locally |
| `npm run deploy` | Deploy to Cloudflare Workers |

---

## Content Management

### Creating a New Blog Post

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter with required fields:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description (used in previews)"
coverImage: "/images/your-cover-image.jpg"
tags: ["tag1", "tag2"]
---

Your content here...
```

3. Write your content using MDX syntax
4. Save the file
5. The post will automatically appear in the blog listing

### MDX Features

- **Standard Markdown**: Headers, lists, links, images, blockquotes
- **Code Blocks**: Syntax highlighting for code snippets
- **Tables**: GitHub-flavored markdown tables
- **React Components**: Embed React components directly in MDX

### Example Code Block

````mdx
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

---

## Custom Components

### Terminal Component

A functional terminal that displays information in a command-line style interface.

```jsx
import Terminal from '@/components/Terminal';

<Terminal lines={[
  { type: 'input', content: 'whoami' },
  { type: 'output', content: 'Praisejah - Full Stack Developer' },
]} />
```

### BlogCard Component

Displays blog post previews with cover image, title, excerpt, and metadata.

```jsx
import BlogCard from '@/components/BlogCard';

<BlogCard
  title="Getting Started with React"
  excerpt="Learn the fundamentals of React hooks..."
  date="2024-01-15"
  slug="getting-started-with-react-hooks"
  coverImage="/images/react-cover.jpg"
  readingTime="5 min read"
/>
```

### Cursor Component

Custom animated cursor that follows mouse movement with trailing effects.

- Configurable trail length
- Hover state detection
- Responsive (disables on touch devices)

### AuraBackground

Three.js-powered animated background with particle effects.

---

## Deployment

### Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications.

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel automatically detects Next.js and configures the build
4. Deploy with a single click

```bash
# Manual Vercel deployment
npm i -g vercel
vercel
```

### Cloudflare Workers

This project also supports deployment to Cloudflare Workers using the OpenNext adapter.

1. **Configure wrangler**

```bash
npm run cf-typegen
```

2. **Build for Cloudflare**

```bash
npm run cf-build
npm run cf-copy-posts
```

3. **Preview locally**

```bash
npm run preview
```

4. **Deploy to Cloudflare**

```bash
npm run deploy
```

### Environment Configuration

#### Vercel

No additional configuration required. Environment variables can be set in the Vercel dashboard.

#### Cloudflare Workers

Create a `wrangler.toml` in the root:

```toml
name = "praisejah-portfolio"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".open-next"

[env]
production = { bucket = "your-bucket-name" }
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics tracking ID | No |
| `NEXT_PUBLIC_MS_CLARITY_ID` | Microsoft Clarity tracking ID | No |

### Adding Analytics

To add analytics tracking:

1. Open `app/layout.js`
2. Locate the analytics script section
3. Replace the placeholder IDs with your actual tracking IDs

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**

- Follow the existing code style
- Run `npm run lint` before committing
- Add comments for complex logic

4. **Commit your changes**

```bash
git commit -m "Add: your feature description"
```

5. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request**

Open a PR against the main repository with a clear description of your changes.

### Coding Standards

- Use functional React components with hooks
- Co-locate CSS files with components
- Use the `components/` directory for reusable components
- Keep components small and focused
- Use meaningful variable and function names
- Add proper TypeScript-like prop documentation in comments

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License allows you to:
- Use this code for personal and commercial projects
- Modify and distribute the code
- Use it privately
- Sublicense

---

## Contact

For questions, suggestions, or collaborations:

- **GitHub**: [PraisejahOsumgbaBenson](https://github.com/PraisejahOsumgbaBenson)
- **Email**: [praisejah@example.com](mailto:praisejah@example.com)
- **LinkedIn**: [Your LinkedIn Profile](#)

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Framer Motion](https://www.framer.com/motion/) - Motion library for React
- [Three.js](https://threejs.org/) - 3D graphics library
- [MDX](https://mdxjs.com/) - Markdown for React
- [OpenNext](https://opennext.js.org/) - Cloudflare adapter for Next.js

---

## Roadmap

Future improvements and features:

- [ ] Add dark/light theme toggle
- [ ] Implement search functionality for blog posts
- [ ] Add more interactive components
- [ ] Optimize images with next/image
- [ ] Add RSS feed for blog posts
- [ ] Implement newsletter subscription

---

*Built with ❤️ using Next.js and modern web technologies*