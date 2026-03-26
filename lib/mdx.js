import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CANDIDATE_POSTS_DIRECTORIES = [
  path.join(process.cwd(), "content/posts"),
  path.join(process.cwd(), ".open-next/server-functions/default/content/posts"),
  "/bundle/content/posts",
  "/bundle/server-functions/default/content/posts",
  "/bundle/.open-next/server-functions/default/content/posts",
];

function resolvePostsDirectory() {
  for (const dir of CANDIDATE_POSTS_DIRECTORIES) {
    try {
      if (fs.existsSync(dir)) {
        return dir;
      }
    } catch {}
  }

  return null;
}

function getMdxFileNames() {
  const postsDirectory = resolvePostsDirectory();

  if (!postsDirectory) {
    return [];
  }

  try {
    return fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith(".mdx"));
  } catch {
    return [];
  }
}

/**
 * Get all post slugs from the MDX files
 * @returns {string[]} Array of slugs
 */
export function getAllPostSlugs() {
  return getMdxFileNames().map((fileName) => fileName.replace(/\.mdx$/, ""));
}

/**
 * Get a single post by its slug
 * @param {string} slug - The post slug
 * @returns {object|null} Post object with frontmatter, content, and metadata
 */
export function getPostBySlug(slug) {
  try {
    const postsDirectory = resolvePostsDirectory();
    if (!postsDirectory) {
      return null;
    }

    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      frontmatter: {
        title: data.title || "",
        date: data.date || "",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        author: data.author || "",
        featured_image: data.featured_image || "",
      },
      content,
      readingTime: {
        text: stats.text,
        minutes: stats.minutes,
        words: stats.words,
      },
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts sorted by date (newest first)
 * @returns {object[]} Array of post objects
 */
export function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post !== null)
    .sort((a, b) => {
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
    });

  return posts;
}

/**
 * Get all unique tags from all posts
 * @returns {string[]} Array of unique tags
 */
export function getAllTags() {
  const posts = getAllPosts();
  const tagsSet = new Set();

  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet);
}
