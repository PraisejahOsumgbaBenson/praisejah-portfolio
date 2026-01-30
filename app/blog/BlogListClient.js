"use client";

import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Blog.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BlogListClient = ({ initialPosts }) => {
  const [posts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [activeTag, setActiveTag] = useState("all");
  const containerRef = useRef(null);

  // GSAP Smooth Scroll Effect
  useEffect(() => {
    if (!containerRef.current) return;

    // Create smooth scrolling effect
    gsap.to(containerRef.current, {
      y: 0,
      ease: "power2.out",
      duration: 0.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    });

    // Add inertia/delay effect to scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (Math.abs(velocity) > 100) {
          gsap.to(window, {
            scrollTo: { y: window.scrollY + velocity * 0.1 },
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="blog-page" ref={containerRef}>
      <Header transparent={true} />
      <div className="blog-header-section">
        <h1 className="blog-main-title">Blog</h1>
        <p className="blog-subtitle">
          Welcome to my blog! Here I share insights, tutorials, and thoughts
          about technology and web development.
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
          {filteredPosts.map((post) => (
            <div key={post.slug} className="blog-post-item">
              <BlogCard
                post={{
                  id: post.slug,
                  title: post.frontmatter.title,
                  excerpt: post.frontmatter.excerpt,
                  date: formatDate(post.frontmatter.date),
                  tags: post.frontmatter.tags || [],
                  reading_time: post.readingTime.text,
                  featured_image: post.frontmatter.featured_image,
                }}
              />
            </div>
          ))}
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

export default BlogListClient;
