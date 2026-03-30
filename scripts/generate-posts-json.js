const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const readingTime = require('reading-time');

const postsDir = path.join(process.cwd(), 'content/posts');
const libDir = path.join(process.cwd(), 'lib');
const outputFile = path.join(libDir, 'posts.json');

if (!fs.existsSync(postsDir)) {
  console.log('No posts directory found');
  process.exit(0);
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

const posts = files.map(fileName => {
  const slug = fileName.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDir, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  let date = null;
  if (data.date) {
    const parsed = new Date(data.date);
    if (Number.isNaN(parsed.getTime())) {
      console.warn(`Warning: Post "${slug}" has an invalid date value: "${data.date}". Storing as null.`);
    } else {
      date = data.date;
    }
  } else {
    console.warn(`Warning: Post "${slug}" is missing a date. Storing as null.`);
  }

  return {
    slug,
    frontmatter: {
      title: data.title || '',
      date,
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      author: data.author || '',
      featured_image: data.featured_image || '',
    },
    content,
    readingTime: {
      text: stats.text,
      minutes: stats.minutes,
      words: stats.words,
    },
  };
}).sort((a, b) => {
  const timeA = new Date(a.frontmatter.date).getTime();
  const timeB = new Date(b.frontmatter.date).getTime();
  const safeA = Number.isNaN(timeA) ? 0 : timeA;
  const safeB = Number.isNaN(timeB) ? 0 : timeB;
  return safeB - safeA;
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated ${posts.length} posts to ${outputFile}`);
