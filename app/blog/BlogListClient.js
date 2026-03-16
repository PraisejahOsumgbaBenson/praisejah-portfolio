"use client";

import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../../components/BlogCard";
import Header from "../../components/Header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./Blog.css";

// Register ScrollTrigger and ScrollToPlugin plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const BlogListClient = ({ initialPosts }) => {
  const [posts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [activeTag, setActiveTag] = useState("all");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const contentRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Smooth Scroll Effect - Now targeting content wrapper, not the whole page
  useEffect(() => {
    if (!contentRef.current) return;

    // Create smooth scrolling effect
    gsap.to(contentRef.current, {
      y: 0,
      ease: "power2.out",
      duration: 0.5,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
    });

    // Add inertia/delay effect to scroll
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();

        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Only apply inertia if velocity is significant
        if (Math.abs(velocity) > 100) {
          // Calculate target scroll position
          const targetY = window.scrollY + velocity * 0.05;

          // Ensure targetY is a valid number and within bounds
          if (
            isFinite(targetY) &&
            targetY >= 0 &&
            targetY <=
              document.documentElement.scrollHeight - window.innerHeight
          ) {
            // Use setTimeout to throttle the animations
            scrollTimeoutRef.current = setTimeout(() => {
              gsap.to(window, {
                scrollTo: {
                  y: targetY,
                  autoKill: true,
                },
                duration: 0.4,
                ease: "power2.out",
                overwrite: true,
              });
            }, 50);
          }
        }
      },
    });

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
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
        (post.frontmatter.tags || []).includes(tag),
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
    <>
      <Header transparent={true} />
      <div className="blog-page">
        <div className="blog-content-wrapper" ref={contentRef}>
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
                  No posts found for this category. Try selecting a different
                  tag!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListClient;