import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const {
    id = "1",
    title = "Blog Post Title",
    excerpt = "This is a short excerpt from the blog post...",
    date = "January 1, 2024",
    tags = ["Technology", "Design"],
    reading_time = "5 min read",
  } = post || {};

  return (
    <Link to={`/blog/${id}`} className="blog-card-link">
      <div className="blog-card">
        {/* Image container - commented out but code preserved */}
        {/* <div className="blog-card-image">
          <img src={featured_image} alt={title} />
        </div> */}

        <div className="blog-card-content">
          <div className="blog-card-header">
            <span className="blog-card-date">{date}</span>
            <span className="blog-card-reading-time">{reading_time}</span>
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
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
