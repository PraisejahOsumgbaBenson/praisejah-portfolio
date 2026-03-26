import { getPostBySlug, getAllPostSlugs } from "../../../lib/mdx";
import BlogDetailClient from "./BlogDetailClient";

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return <BlogDetailClient post={post} slug={slug} />;
}
