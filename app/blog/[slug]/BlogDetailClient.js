"use client";

import React, { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FiArrowUpLeft,
  FiCalendar,
  FiClock,
  FiTag,
  FiTwitter,
  FiLinkedin,
  FiLink,
  FiFacebook,
  FiShare2,
} from "react-icons/fi";
import Header from "../../../components/Header";
import "../Blog.css";

const BlogDetailClient = ({ post, slug }) => {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      post?.frontmatter.title || "Check out this article"
    );
    window.open(
      `https://t.me/share/url?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      post?.frontmatter.title || "Check out this article!"
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  if (!post) {
    return (
      <div className="blog-detail-page">
        <Header transparent={true} />
        <div className="blog-detail-container">
          <div className="simple-back-link">
            <Link href="/blog" className="back-arrow">
              <FiArrowUpLeft className="arrow-icon" />
              Back to Posts
            </Link>
          </div>
          <div className="error-message">
            <h1>Post Not Found</h1>
            <p>The blog post &quot;{slug}&quot; doesn&apos;t exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <Header transparent={true} />

      <div className="blog-detail-container">
        <div className="blog-detail-layout">
          {/* Left sidebar for tags and share */}
          <aside className="blog-sidebar">
            {/* Topics section */}
            <div className="topics-section">
              <h3 className="topics-title">
                <FiTag className="topic-icon" />
                Topics
              </h3>
              <div className="sidebar-tags">
                {post.frontmatter.tags &&
                  post.frontmatter.tags.map((tag, index) => (
                    <span key={index} className="sidebar-tag">
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* Share section */}
            <div className="share-section">
              <h3 className="share-title">
                <FiShare2 className="share-title-icon" />
                Share
              </h3>
              <div className="share-icons">
                <button
                  onClick={shareOnTwitter}
                  className="share-icon"
                  aria-label="Share on Twitter"
                >
                  <FiTwitter className="icon" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="share-icon"
                  aria-label="Share on Facebook"
                >
                  <FiFacebook className="icon" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="share-icon"
                  aria-label="Share on LinkedIn"
                >
                  <FiLinkedin className="icon" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="share-icon copy-link"
                  aria-label="Copy link"
                >
                  <FiLink className="icon" />
                  {copied && <span className="copy-tooltip">Copied!</span>}
                </button>
              </div>
            </div>
          </aside>

          {/* Main article content */}
          <div className="article-container">
            {/* Back link - UP TOP */}
            <div className="simple-back-link">
              <Link href="/blog" className="back-arrow">
                <FiArrowUpLeft className="arrow-icon" />
                Back to Posts
              </Link>
            </div>

            {/* Title - BIG */}
            <h1 className="simple-title">{post.frontmatter.title}</h1>

            {/* Date and reading time with React Icons - SMALL SPACE UNDER TITLE */}
            <div className="article-meta">
              <div className="meta-item">
                <FiCalendar className="meta-icon" />
                <span className="simple-date">
                  {formatDate(post.frontmatter.date)}
                </span>
              </div>
              <span className="meta-separator">•</span>
              <div className="meta-item">
                <FiClock className="meta-icon" />
                <span className="simple-reading-time">
                  {post.readingTime.text}
                </span>
              </div>
            </div>

            <article className="simple-blog-article">
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

              {/* Footer with share options for mobile */}
              <footer className="mobile-share-footer">
                <div className="mobile-share-section">
                  <h3 className="share-title">
                    <FiShare2 className="share-title-icon" />
                    Share this article
                  </h3>
                  <div className="share-icons">
                    <button
                      onClick={shareOnTwitter}
                      className="share-icon"
                      aria-label="Share on Twitter"
                    >
                      <FiTwitter className="icon" />
                      <span className="icon-label">Twitter</span>
                    </button>
                    <button
                      onClick={shareOnFacebook}
                      className="share-icon"
                      aria-label="Share on Facebook"
                    >
                      <FiFacebook className="icon" />
                      <span className="icon-label">Facebook</span>
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="share-icon"
                      aria-label="Share on LinkedIn"
                    >
                      <FiLinkedin className="icon" />
                      <span className="icon-label">LinkedIn</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="share-icon copy-link"
                      aria-label="Copy link"
                    >
                      <FiLink className="icon" />
                      <span className="icon-label">
                        {copied ? "Copied!" : "Copy Link"}
                      </span>
                    </button>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailClient;
