import React, { useState, useEffect } from "react";
import BlogCard from "../../components/BlogCard";
import { getAllPosts } from "../../lib/markdown";
import "./Blog.css";
import Header from "../../components/Header";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const allPosts = getAllPosts();
        console.log(
          "Loaded posts:",
          allPosts.map((p) => p.slug)
        ); // Debug
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Get all unique tags from posts
  const allTags = [
    "all",
    ...new Set(posts.flatMap((post) => post.frontmatter.tags || [])),
  ];

  const filterByTag = (tag) => {
    setActiveTag(tag);
    if (tag === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        (post.frontmatter.tags || []).includes(tag)
      );
      setFilteredPosts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
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
    <div className="blog-page">
      <Header />
      <div className="blog-header-section">
        <h1 className="blog-main-title">Blog</h1>
        <p className="blog-subtitle">
          Welcome to my blog! Here I share insights, tutorials, and thoughts
          about technology, web development, and software engineering. Each post
          is crafted to provide value and help you grow as a developer.
        </p>
        <p className="blog-description">
          Explore articles on various topics, from frontend frameworks to
          backend architectures, and everything in between. Use the tags below
          to filter posts by category.
        </p>
      </div>

      <div className="blog-tags-container">
        <div className="blog-tags">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`blog-tag ${activeTag === tag ? "active" : ""}`}
              onClick={() => filterByTag(tag)}
            >
              {tag === "all" ? "All Posts" : `#${tag}`}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-posts-section">
        <div className="blog-posts-grid">
          {filteredPosts.map((post) => {
            console.log("Creating BlogCard with slug:", post.slug); // Debug
            return (
              <div key={post.slug} className="blog-post-item">
                <BlogCard
                  post={{
                    id: post.slug, // This is CRITICAL - must match markdown slug
                    title: post.frontmatter.title,
                    excerpt: post.frontmatter.excerpt,
                    date: formatDate(post.frontmatter.date),
                    tags: post.frontmatter.tags || [],
                    reading_time: post.readingTime.text,
                    featured_image: post.frontmatter.featured_image,
                  }}
                />
              </div>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-posts-message">
            <p>
              No posts found for this category. Try selecting a different tag!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
