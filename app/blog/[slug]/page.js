"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../../../lib/markdown";
import "../Blog.css";

const BlogDetail = () => {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = () => {
      try {
        setLoading(true);
        const postData = getPostBySlug(slug);

        if (!postData) {
          setError("Post not found");
        } else {
          setPost(postData);
        }
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Error loading post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="simple-back-link">
            <Link href="/blog" className="back-arrow">
              ←
            </Link>
          </div>
          <div className="error-message">
            <h1>Post Not Found</h1>
            <p>The blog post &quot;{slug}&quot; doesn&apos;t exist.</p>
            <p>Available posts:</p>
            <ul style={{ color: "#D8DAD3", fontFamily: "safiro-regular" }}>
              <li>getting-started-with-react-hooks</li>
              <li>mastering-css-grid-layout</li>
              <li>building-scalable-apis-with-nodejs</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <div className="simple-back-link">
          <Link href="/blog" className="back-arrow">
            ←
          </Link>
        </div>

        <article className="simple-blog-article">
          <header>
            <div className="simple-meta">
              <span className="simple-date">
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="simple-reading-time">
                {post.readingTime.text}
              </span>
            </div>

            <h1 className="simple-title">{post.frontmatter.title}</h1>

            {post.frontmatter.author && (
              <div className="blog-author">
                <span className="author-text">
                  By {post.frontmatter.author}
                </span>
              </div>
            )}
          </header>

          <div className="simple-content">
            {post.frontmatter.excerpt && (
              <p className="simple-excerpt">{post.frontmatter.excerpt}</p>
            )}

            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <footer className="simple-footer">
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="simple-tags">
                {post.frontmatter.tags.map((tag, index) => (
                  <span key={index} className="simple-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
