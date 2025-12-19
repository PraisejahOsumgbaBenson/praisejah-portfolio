import React, { useState } from "react";
import BlogCard from "../../components/BlogCard";
import "./Blog.css";
import Header from "../../components/Header";

const BlogList = () => {
  // Updated sample blog data with your site's colors and no images
  const initialBlogPosts = [
    {
      id: "1",
      title: "Getting Started with React Hooks",
      excerpt:
        "Learn how to use React Hooks to write cleaner and more maintainable functional components with practical examples and best practices.",
      date: "March 15, 2024",
      tags: ["React", "JavaScript", "Web Development"],
      reading_time: "5 min read",
    },
    {
      id: "2",
      title: "Mastering CSS Grid Layout",
      excerpt:
        "A comprehensive guide to creating modern layouts with CSS Grid, including advanced techniques and responsive design patterns.",
      date: "March 10, 2024",
      tags: ["CSS", "Web Design", "Frontend"],
      reading_time: "8 min read",
    },
    {
      id: "3",
      title: "Building Scalable APIs with Node.js",
      excerpt:
        "Best practices for designing and building RESTful APIs that can handle millions of requests while maintaining performance and security.",
      date: "March 5, 2024",
      tags: ["Node.js", "Backend", "API"],
      reading_time: "10 min read",
    },
    {
      id: "4",
      title: "The Future of Web Development",
      excerpt:
        "Exploring emerging trends and technologies that will shape web development in 2024 and beyond, from AI tools to new frameworks.",
      date: "February 28, 2024",
      tags: ["Web Development", "Trends", "Technology"],
      reading_time: "6 min read",
    }
   
  ];

  const [posts] = useState(initialBlogPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialBlogPosts);
  const [activeTag, setActiveTag] = useState("all");

  // Get all unique tags from posts
  const allTags = ["all", ...new Set(posts.flatMap((post) => post.tags))];

  const filterByTag = (tag) => {
    setActiveTag(tag);
    if (tag === "all") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.tags.includes(tag));
      setFilteredPosts(filtered);
    }
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
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-post-item">
              <BlogCard post={post} />
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

export default BlogList;
