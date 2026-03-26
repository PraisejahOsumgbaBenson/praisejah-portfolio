import posts from "../data/posts.generated.json";

function getAllPostsData() {
  if (!Array.isArray(posts)) {
    return [];
  }

  return posts;
}

/**
 * Get all post slugs from the MDX files
 * @returns {string[]} Array of slugs
 */
export function getAllPostSlugs() {
  return getAllPostsData().map((post) => post.slug);
}

/**
 * Get a single post by its slug
 * @param {string} slug - The post slug
 * @returns {object|null} Post object with frontmatter, content, and metadata
 */
export function getPostBySlug(slug) {
  const post = getAllPostsData().find((item) => item.slug === slug);
  return post || null;
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
