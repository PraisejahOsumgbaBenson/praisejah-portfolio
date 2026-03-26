import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const rootDir = process.cwd();
const postsDir = path.join(rootDir, "content", "posts");
const outputPath = path.join(rootDir, "data", "posts.generated.json");

function getPostFileNames() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .sort();
}

function buildPostsData() {
  const fileNames = getPostFileNames();

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDir, fileName);
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
  });
}

const posts = buildPostsData();
fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
console.log(`Generated ${posts.length} posts at ${outputPath}`);
