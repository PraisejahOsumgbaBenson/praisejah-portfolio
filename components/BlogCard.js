"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaClock } from "react-icons/fa"; // Import icons
import "./BlogCard.css";

const BlogCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    id = "1",
    title = "Blog Post Title",
    excerpt = "This is a short excerpt from the blog post...",
    date = "January 1, 2024",
    tags = ["Technology", "Design"],
    reading_time = "5 min read",
  } = post || {};

  return (
    <Link href={`/blog/${id}`} className="blog-card-link">
      <div
        className="blog-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="blog-card-content">
          <div className="blog-card-header">
            <span className="blog-card-date">
              <FaCalendarAlt className="calendar-icon" />
              {date}
            </span>
            <span className="blog-card-reading-time">
              <FaClock className="clock-icon" />
              {reading_time}
            </span>
          </div>

          <h3 className="blog-card-title">{title}</h3>
          <p className="blog-card-excerpt">{excerpt}</p>

          <div className="blog-card-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="blog-card-tag">
                #{tag}
              </span>
            ))}
          </div>

          <div className="blog-card-footer">
            <span className="read-article-text">
              Read article
              <span className={`arrow ${isHovered ? "hovered" : ""}`}>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
