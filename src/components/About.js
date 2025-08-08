import React, { useEffect, useRef } from "react";
import Header from "./Header";
import "./About.css";

import diary from "../assets/diary.png"; // Diary image asset
import bowImage from "../assets/Bow.png"; // Decorative bow image asset

function About() {
  // Refs
  const experienceSectionRef = useRef(null); // Reference to experience section for scroll effects

  /**
   * Scroll animation effect for experience cards
   * Animates cards to fade in and slide up when they enter viewport
   */
  useEffect(() => {
    const experienceCards = document.querySelectorAll(".experience-card");

    const handleScroll = () => {
      experienceCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // When card is 100px from entering viewport
        if (rect.top < windowHeight - 100) {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }
      });
    };

    // Set up scroll listener and initialize
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    // Cleanup scroll listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="about-container">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <div className="about-header">
        {/* Name/Titles */}
        <div className="about-title">
          <h1 className="praisejah-title" style={{ fontSize: "110px" }}>
            Praisejah
          </h1>
          <h1 className="surname" style={{ fontSize: "40px" }}>
            ─── Osumgba-Benson.✦
          </h1>
        </div>

        {/* Bio Section with Image */}
        <div className="about-section">
          {/* Text Content */}
          <div className="passage-container">
            <div className="passage">
              <div className="first-section">
                <span className="text-block first">
                  Hello, I'm Praisejah <br />
                  a software engineer with a passion for crafting thoughtful,
                  reliable, and user-focused digital experiences. <br />
                  I don't just write code; I experiment, break things, and
                  rebuild them better. <br />
                  Whether it's contributing to open source, designing software
                  architecture, or exploring bleeding-edge technologies, I
                  thrive at the intersection of creativity and problem-solving.
                  <br />
                </span>
                <span className="text-block second">
                  Outside of tech, I find joy in painting and caring for animals
                  <br />
                  both of which teach me patience, curiosity, and the beauty of
                  progress. I believe that the best solutions come from a blend
                  of skill, experimentation, and heart. <br />
                </span>
              </div>
            </div>
          </div>

          {/* Diary Image */}
          <img
            src={diary}
            alt="Personal diary illustration"
            className="diary-image"
            style={{ width: "400px", height: "580px" }}
          />

          {/* Scrolling Marquee Text */}
          <div className="scrolling-text">
            <div className="scrolling-content">
              <p>
                ⋆. 𐙚 ̊ Exploring Tech | ❀˖° Painting | 🐨ྀི Animal Lover | ⟢
                Coding for Impact!
              </p>
              <p>
                .☘︎ ݁˖ Exploring Tech | ⋆⭒˚.⋆ Painting | ୨ৎ Animal Lover | 🍓ྀི
                Coding for Impact!
              </p>
              <p>
                ⊹₊⟡⋆ Exploring Tech | ⋆˚࿔ Painting | ˙ᵕ˙ Animal Lover | ₊˚⊹ᰔ
                Coding for Impact!
              </p>
              <p>
                ꩜ .ᐟ Exploring Tech | ˚୨୧⋆.˚ Painting | ⋆. 𐙚 ̊ Animal Lover | ༄.°
                Coding for Impact!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bow Element */}
      <div className="bow-container">
        <img src={bowImage} alt="Decorative bow" className="bow-image" />
      </div>

      {/* Resume/CV Section */}
      <div className="resume-layout">
        {/* Background Letters */}
        <div className="resume-bg-letters">
          <span className="resume-bg-letter">P</span>
          <span className="resume-bg-letter">B</span>
        </div>

        {/* Left Column - Personal Info */}
        <div className="left-column">
          <div className="name-contact">
            <h1 className="praisejah">
              Praisejah <br />
              <h2 className="beauty">Beauty.</h2>
            </h1>
            <div className="section-divider name-divider"></div>
            <p className="name-surname">OSUMGBA-BENSON</p>
            <p className="birthdate">2007/06.08</p>
            <div className="contact-spacing"></div>
            <p className="phone">+234 902.272.5714</p>
            <p className="email">praisejahosumgbabenson@gmail.com</p>
          </div>
        </div>

        {/* Middle Column - Education/Awards */}
        <div className="middle-column">
          <div className="section-divider before-education"></div>

          {/* Education Section */}
          <div className="section">
            <h2 className="heading">EDUCATION</h2>
            <div className="entry">
              <span className="date">2021 - 2024</span>
              <span className="details">Focus High School</span>
            </div>
            <div className="entry">
              <span className="date">2022 - 2023</span>
              <span className="details">Astra Nova</span>
            </div>
            <div className="entry">
              <span className="date">2024 - 2028</span>
              <span className="details spacing">University Of The People</span>
            </div>
          </div>

          {/* Awards Section */}
          <div className="section">
            <h2 className="heading">AWARDS</h2>
            <div className="entry">
              <span className="date">2024.</span>
              <span className="details">
                Yale Entrepreneurial Society Fellowship 1st Place Winning Team
              </span>
            </div>
            <div className="entry">
              <span className="date">2024.</span>
              <span className="details">Best Student in Mathematics</span>
            </div>
            <div className="entry">
              <span className="date">2021.</span>
              <span className="details spacing">
                Lafarge Africa National Essay Competition Finalist
              </span>
            </div>
          </div>

          {/* Certificates Section */}
          <div className="section">
            <h2 className="heading">CERTIFICATE</h2>
            <div className="entry">
              <span className="date">2025.</span>
              <span className="details">IBM Qiskit Summer School(Quantum)</span>
            </div>
            <div className="entry">
              <span className="date">2025.</span>
              <span className="details">
                Stanford Neurodiversity Project's Research (SNP-REACH)
              </span>
            </div>
            <div className="entry">
              <span className="date">2025.</span>
              <span className="details">
                Yale Entrepreneurial Society Fellowship
              </span>
            </div>
            <div className="entry">
              <span className="date">2024.</span>
              <span className="details">Non-Trivial Finalist</span>
            </div>
            <div className="entry">
              <span className="date">2023.</span>
              <span className="details">Technovation Quarterfinalist</span>
            </div>
            <div className="entry">
              <span className="date">2021.</span>
              <span className="details">
                UNECA/ITU Hybrid Continental Coding Camp
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Skills/Tools */}
        <div className="right-column">
          <div className="section-divider before-tools"></div>

          {/* Tools Section */}
          <div className="section">
            <h2 className="heading">USED TOOLS</h2>
            <div className="entry">
              <span className="tools">
                HTML/CSS ____ JavaScript ____ TypeScript
              </span>
            </div>
            <div className="entry">
              <span className="tools">AWS/Google Cloud ____ Python/Django</span>
            </div>
            <div className="entry">
              <span className="tools">Docker ____ MongoDB/MYSQL</span>
            </div>
            <div className="entry">
              <span className="tools">Node.js/Express ____ Git/GitHub</span>
            </div>
            <div className="entry">
              <span className="tools spacing">React/Next</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="section">
            <h2 className="heading">SKILLS</h2>
            <div className="entry">
              <span className="tools">Programming & Software Development</span>
            </div>
            <div className="entry">
              <span className="tools">Database Management</span>
            </div>
            <div className="entry">
              <span className="tools">Docker ____ MongoDB/MYSQL</span>
            </div>
            <div className="entry">
              <span className="tools">Version Control & Collaboration</span>
            </div>
            <div className="entry">
              <span className="tools">Debugging & Optimization</span>
            </div>
            <div className="entry">
              <span className="tools">Cloud & DevOps ____ Problem-Solving</span>
            </div>
            <div className="entry">
              <span className="tools spacing">
                Agile Development ____ Leadership & Mentorship
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="experience-section" ref={experienceSectionRef}>
        <div className="section-header">
          <span className="section-label">experience</span>
          <div className="vertical-line"></div>
          <h2 className="section-main-title">Adventures in Tech</h2>
          <p className="section-subtitle">
            Significant pushes to my professional repo
            <a
              className="github"
              href="https://docs.google.com/document/d/1EbcNjwS7MV_L7YGUTaiuXubdN51vSlOXLhCvCRp7ylQ/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              / CV
            </a>
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="experience-grid">
          {/* Card 1 - UCLA Internship */}
          <div className="experience-card card-1">
            <div className="card-header">
              <span className="card-number">01</span>
              <span className="card-year">2025 - Present</span>
            </div>
            <h3 className="card-title">Glitch Intern @ UCLA</h3>
            <p className="card-description">
              Building an LLM-powered tool that tracks internship/job news
              worldwide. Scrapes 500+ sources, analyzes trends, and generates
              personalized alerts. Working with UCLA seniors to optimize model
              accuracy.
            </p>
            <div className="card-tags">
              <span>LLM Development</span>
              <span>Opportunity Analytics</span>
              <span>Web Scraping</span>
              <span>NLP Pipelines</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 2 - Stanford Research */}
          <div className="experience-card card-2">
            <div className="card-header">
              <span className="card-number">02</span>
              <span className="card-year">Summer 2025</span>
            </div>
            <h3 className="card-title">
              Neurodiversity Researcher @ Stanford SNP-REACH
            </h3>
            <p className="card-description">
              Developed new frameworks to share neurodiversity awareness and
              create inclusive environments. Collected and analyzed data on
              neurodivergent experiences in tech education.
            </p>
            <div className="card-tags">
              <span>Awareness Campaigns</span>
              <span>Inclusion Research</span>
              <span>Data Analysis</span>
              <span>Education</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 3 - IBM Quantum */}
          <div className="experience-card card-3">
            <div className="card-header">
              <span className="card-number">03</span>
              <span className="card-year">Summer 2025</span>
            </div>
            <h3 className="card-title">Quantum Computing @ IBM Qiskit</h3>
            <p className="card-description">
              Completed intensive quantum programming training using Qiskit.
              Built and simulated quantum circuits through hands-on labs
              covering superposition, entanglement, and quantum algorithms.
            </p>
            <div className="card-tags">
              <span>Qiskit</span>
              <span>Quantum Circuits</span>
              <span>Quantum Algorithms</span>
              <span>Python</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 4 - Yale Fellowship */}
          <div className="experience-card card-1">
            <div className="card-header">
              <span className="card-number">04</span>
              <span className="card-year">Spring 2025</span>
            </div>
            <h3 className="card-title">
              Yale Entrepreneurial Fellowship (1st Place)
            </h3>
            <p className="card-description">
              Contributed research and product development for Proact+, an AI
              focus app that won top prize among 10 teams. Helped design
              behavioral models and pitch the solution to judges.
            </p>
            <div className="card-tags">
              <span>AI Research</span>
              <span>Product Development</span>
              <span>Pitching</span>
              <span>Team Collaboration</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 5 - BulleTeen */}
          <div className="experience-card card-2">
            <div className="card-header">
              <span className="card-number">05</span>
              <span className="card-year">Sep 2024 - Present</span>
            </div>
            <h3 className="card-title">
              The BulleTeen | Web Dev & Hiring Lead
            </h3>
            <p className="card-description">
              <span className="card-achievement">▲</span> Boosted STEM
              accessibility 50% via UX optimization
              <br />
              <span className="card-achievement">▲</span> Scaled to 500+ monthly
              visitors
              <br />
              <span className="card-achievement">▲</span> Built/managed 55+
              volunteer team
              <br />
              <span className="card-achievement">▲</span> Produced global STEM
              content pipeline
            </p>
            <div className="card-tags">
              <span>Web Accessibility</span>
              <span>Team Scaling</span>
              <span>Content Strategy</span>
              <span>UX Optimization</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 6 - Non-Trivial */}
          <div className="experience-card card-3">
            <div className="card-header">
              <span className="card-number">06</span>
              <span className="card-year">2024-2025</span>
            </div>
            <h3 className="card-title">Non-Trivial</h3>
            <p className="card-description">
              Researched and modeled climate solutions as global finalist,
              analyzing environmental datasets and presenting findings to domain
              experts.
            </p>
            <div className="card-tags">
              <span>Climate Research</span>
              <span>Data Analysis</span>
              <span>Research Presentation</span>
              <span>Global Finalist</span>
              <span>Competitive Analysis</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 7 - Pearl Impact */}
          <div className="experience-card card-4">
            <div className="card-header">
              <span className="card-number">07</span>
              <span className="card-year">2022-2023</span>
            </div>
            <h3 className="card-title">Pearl Impact Network Africa</h3>
            <p className="card-description">
              Modernized NGO website with improved UX/UI, increasing engagement
              by 40% through responsive design and streamlined content delivery.
            </p>
            <div className="card-tags">
              <span>Web Redesign</span>
              <span>UX Optimization</span>
              <span>Non-profit Tech</span>
              <span>Frontend Development</span>
            </div>
            <div className="card-highlight"></div>
          </div>

          {/* Card 8 - Innovation Hub */}
          <div className="experience-card card-5">
            <div className="card-header">
              <span className="card-number">08</span>
              <span className="card-year">2019 - 2020</span>
            </div>
            <h3 className="card-title">Innovation Growth Hub Mentor</h3>
            <p className="card-description">
              Taught Scratch programming to 50+ peers and co-designed women's
              rights app prototypes, blending tech education with social
              advocacy.
            </p>
            <div className="card-tags">
              <span>Tech Education</span>
              <span>App Prototyping</span>
              <span>Youth Mentorship</span>
              <span>Gender Equity</span>
            </div>
            <div className="card-highlight"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
