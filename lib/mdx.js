import postsData from "./posts.json";

export function getAllPostSlugs() {
  return postsData.map((p) => p.slug);
}

export function getPostBySlug(slug) {
  return postsData.find((p) => p.slug === slug) || null;
}

export function getAllPosts() {
  return postsData;
}

export function getAllTags() {
  const tagsSet = new Set();
  postsData.forEach((post) => {
    if (post.frontmatter && post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
}
