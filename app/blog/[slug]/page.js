import { getPostBySlug, getAllPostSlugs } from "../../../lib/mdx";
import BlogDetailClient from "./BlogDetailClient";

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default function BlogDetailPage({ params }) {
  const post = getPostBySlug(params.slug);

  return <BlogDetailClient post={post} slug={params.slug} />;
}
