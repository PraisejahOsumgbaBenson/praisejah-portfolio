// Browser-compatible markdown utility
// No fs or path modules needed!

const blogPosts = {
  "getting-started-with-react-hooks": {
    slug: "getting-started-with-react-hooks",
    frontmatter: {
      title: "Getting Started with React Hooks",
      date: "2024-03-15",
      tags: ["React", "JavaScript", "Web Development"],
      excerpt:
        "Learn how to use React Hooks to write cleaner and more maintainable functional components with practical examples.",
      author: "Your Name",
      featured_image: "",
    },
    readingTime: { text: "5 min read" },
    content: `# Getting Started with React Hooks

React Hooks revolutionized how we write React components. They allow you to use state and other React features without writing a class.

## Why Use Hooks?

Hooks solve several problems:

1. **Reusing stateful logic** between components
2. **Simplifying complex components** that were hard to understand
3. **Avoiding wrapper hell** in your component tree

## Basic Hooks

### useState

The \`useState\` hook lets you add state to functional components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

The \`useEffect\` hook lets you perform side effects:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks

You can create your own hooks to extract component logic into reusable functions.

## Conclusion

Start using hooks in your next project and experience the benefits firsthand!`,
  },
  "mastering-css-grid-layout": {
    slug: "mastering-css-grid-layout",
    frontmatter: {
      title: "Mastering CSS Grid Layout",
      date: "2024-03-10",
      tags: ["CSS", "Web Design", "Frontend"],
      excerpt:
        "A comprehensive guide to creating modern layouts with CSS Grid, including advanced techniques and responsive design patterns.",
      author: "Your Name",
      featured_image: "",
    },
    readingTime: { text: "8 min read" },
    content: `# Mastering CSS Grid Layout

CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay out items in rows and columns, and it's incredibly powerful for creating complex layouts with minimal code.

## Grid Container

To start using CSS Grid, you need to define a grid container:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 20px;
}
\`\`\`

## Common Grid Patterns

### Holy Grail Layout

\`\`\`css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav content sidebar"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.content { grid-area: content; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }
\`\`\`

## Browser Support

CSS Grid is fully supported in all modern browsers.

## Conclusion

CSS Grid is the most powerful layout system available to web developers today.`,
  },
  "building-scalable-apis-with-nodejs": {
    slug: "building-scalable-apis-with-nodejs",
    frontmatter: {
      title: "Building Scalable APIs with Node.js",
      date: "2024-03-05",
      tags: ["Node.js", "Backend", "API"],
      excerpt:
        "Best practices for designing and building RESTful APIs that can handle millions of requests.",
      author: "Your Name",
      featured_image: "",
    },
    readingTime: { text: "10 min read" },
    content: `# Building Scalable APIs with Node.js

Building scalable APIs requires careful planning and architecture. Here are key principles:

## 1. RESTful Design
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use meaningful resource names
- Version your API

## 2. Error Handling
- Consistent error responses
- Proper HTTP status codes
- Detailed error messages for debugging

## 3. Performance Optimization
- Implement caching
- Use pagination for large datasets
- Database query optimization

## 4. Security
- Authentication & Authorization
- Input validation
- Rate limiting

## 5. Monitoring & Logging
- Request logging
- Performance metrics
- Error tracking

## Conclusion

Building scalable APIs is both an art and a science. Start implementing these principles today.`,
  },
};

// Helper functions
export function getAllPosts() {
  const postsArray = Object.values(blogPosts);
  return postsArray.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });
}

export function getPostBySlug(slug) {
  const post = blogPosts[slug] || null;
  return post;
}

export function getAllPostSlugs() {
  return Object.keys(blogPosts);
}

export function addPost(slug, postData) {
  blogPosts[slug] = postData;
}

export { blogPosts };
