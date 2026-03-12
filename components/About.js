"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Terminal from "./Terminal";
import Image from "next/image";
import "./About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  const experienceSectionRef = useRef(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Refs for animation elements
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);
  const mainTextRef = useRef(null);
  const notesRef = useRef(null);
  const bigWordRef = useRef(null);
  const note1Ref = useRef(null);
  const note2Ref = useRef(null);
  const note3Ref = useRef(null);

  // New refs for resume section animation
  const resumeLayoutRef = useRef(null);
  const resumeBgLettersRef = useRef(null);
  const resumePLetterRef = useRef(null);
  const resumeBLetterRef = useRef(null);
  const resumeHighlightsRef = useRef(null);
  const highlightsTitleRef = useRef(null);
  const cvLinkRef = useRef(null);

  // Refs for middle column sections
  const educationSectionRef = useRef(null);
  const awardsSectionRef = useRef(null);
  const certificatesSectionRef = useRef(null);
  const educationEntriesRef = useRef([]);
  const awardsEntriesRef = useRef([]);
  const certificatesEntriesRef = useRef([]);

  // Refs for right column sections
  const toolsSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const toolsEntriesRef = useRef([]);
  const skillsEntriesRef = useRef([]);

  // New refs for experience section animation
  const experienceTitleRef = useRef(null);
  const experienceSubtitleRef = useRef(null);
  const experienceCardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for header background
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Function to get pixel ratio for sharp, thin lines
    const getPixelRatio = (context) => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const backingStoreRatio =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return devicePixelRatio / backingStoreRatio;
    };

    // Canvas Grid Drawing Animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const ratio = getPixelRatio(ctx);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set canvas dimensions accounting for pixel ratio
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    // Scale the context to match
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);

    // Grid settings - same 100px spacing as your original
    const gridSize = 100;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    // Clear canvas initially - no lines showing
    ctx.clearRect(0, 0, width, height);

    // GSAP Animation Sequence for Hero
    const ctx_gsap = gsap.context(() => {
      // Set initial states for text elements
      gsap.set(
        [
          labelRef.current,
          mainTextRef.current,
          note1Ref.current,
          note2Ref.current,
          note3Ref.current,
          bigWordRef.current,
        ],
        {
          opacity: 0,
          y: 20,
        },
      );

      // Create a timeline
      const tl = gsap.timeline();

      // 1. Draw the grid lines - line by line (VERTICAL FIRST, then horizontal)
      tl.to(
        {},
        {
          duration: 2,
          onUpdate: function () {
            const progress = this.progress();

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Reset transform and scale
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(ratio, ratio);

            // Set EXACT same style as your original grid
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 0.9;

            // Calculate total lines (vertical + horizontal)
            const totalLines = cols + 1 + (rows + 1);
            const linesToShow = Math.floor(progress * totalLines);
            let linesDrawn = 0;

            // Draw VERTICAL lines FIRST
            for (let i = 0; i <= cols; i++) {
              if (linesDrawn < linesToShow) {
                const x = i * gridSize;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
                linesDrawn++;
              } else {
                break;
              }
            }

            // Then draw HORIZONTAL lines SECOND
            for (let i = 0; i <= rows; i++) {
              if (linesDrawn < linesToShow) {
                const y = i * gridSize;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
                linesDrawn++;
              } else {
                break;
              }
            }
          },
          ease: "power2.inOut",
        },
      );

      // 2. Animate the big name
      tl.fromTo(
        bigWordRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.2)",
        },
        "-=0.8",
      );

      // 3. Animate the label
      tl.fromTo(
        labelRef.current,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6",
      );

      // 4. Animate the main text
      tl.fromTo(
        mainTextRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4",
      );

      // 5. Animate the notes
      tl.fromTo(
        [note1Ref.current, note2Ref.current, note3Ref.current],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.4",
      );
    }, heroRef);

    // RESUME SECTION SCROLL ANIMATION - FIXED HEIGHT ISSUE
    const resumeCtx = gsap.context(() => {
      // Set initial states for all resume elements
      gsap.set(resumeLayoutRef.current, {
        backgroundColor: "#da99a9",
        opacity: 0,
        y: 50,
        height: "auto",
        minHeight: "600px",
      });

      gsap.set(resumeBgLettersRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set([resumePLetterRef.current, resumeBLetterRef.current], {
        opacity: 0,
        scale: 0.5,
        rotation: -15,
      });

      gsap.set(resumeHighlightsRef.current, {
        opacity: 0,
        x: -30,
      });

      gsap.set(highlightsTitleRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(cvLinkRef.current, {
        opacity: 0,
        y: 20,
      });

      // Set all sections to hidden initially but preserve layout
      gsap.set(
        [
          educationSectionRef.current,
          awardsSectionRef.current,
          certificatesSectionRef.current,
          toolsSectionRef.current,
          skillsSectionRef.current,
        ],
        {
          opacity: 0,
          y: 20,
          visibility: "visible",
        },
      );

      // Create main timeline for resume section
      const resumeTl = gsap.timeline({
        scrollTrigger: {
          trigger: resumeLayoutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // 1. First show the pink background - with stable height
      resumeTl.to(resumeLayoutRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "height",
      });

      // 2. Then show the dots overlay (already there via CSS)
      resumeTl.to(
        {},
        {
          duration: 0.2,
        },
        "-=0.1",
      );

      // 3. Show the big background letters P and B
      resumeTl.to(
        resumeBgLettersRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.3",
      );

      resumeTl.to(
        [resumePLetterRef.current, resumeBLetterRef.current],
        {
          opacity: 1,
          scale: 1,
          rotation: -15,
          duration: 0.4,
          stagger: 0.1,
        },
        "-=0.3",
      );

      // 4. Show the resume highlights container
      resumeTl.to(
        resumeHighlightsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // 5. Show the "Resume Highlights" title
      resumeTl.to(
        highlightsTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "back.out(1)",
        },
        "-=0.2",
      );

      // 6. Show the CV link
      resumeTl.to(
        cvLinkRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "-=0.1",
      );

      // 7. EDUCATION SECTION - fade in
      resumeTl.to(
        educationSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "+=0.1",
      );

      // 8. AWARDS SECTION
      resumeTl.to(
        awardsSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "+=0.1",
      );

      // 9. CERTIFICATES SECTION
      resumeTl.to(
        certificatesSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "+=0.1",
      );

      // 10. TOOLS SECTION
      resumeTl.to(
        toolsSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "+=0.1",
      );

      // 11. SKILLS SECTION
      resumeTl.to(
        skillsSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "+=0.1",
      );
    }, resumeLayoutRef);

    // EXPERIENCE SECTION ANIMATION
    const experienceCtx = gsap.context(() => {
      // Set initial states
      gsap.set(experienceSectionRef.current, {
        backgroundColor: "#1a1e16",
      });

      gsap.set(experienceSectionRef.current, {
        "--stripes-opacity": 0,
      });

      gsap.set(experienceTitleRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(experienceSubtitleRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(experienceCardsRef.current, {
        opacity: 0,
        y: 50,
      });

      // Create main timeline for experience section
      const experienceTl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // 1. First show the plain green background
      experienceTl.to({}, { duration: 0.3 });

      // 2. Then animate in the stripes
      experienceTl.to(experienceSectionRef.current, {
        "--stripes-opacity": 1,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: function () {
          experienceSectionRef.current.style.setProperty(
            "--stripes-opacity",
            this.progress(),
          );
        },
      });

      // 3. Show the "Adventures in Tech" title
      experienceTl.to(
        experienceTitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.4",
      );

      // 4. Show the subtitle
      experienceTl.to(
        experienceSubtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // 5. Animate cards one by one
      experienceTl.to(
        experienceCardsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, experienceSectionRef);

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      canvas.width = newWidth * ratio;
      canvas.height = newHeight * ratio;
      canvas.style.width = newWidth + "px";
      canvas.style.height = newHeight + "px";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);

      // Redraw full grid after resize
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.9;

      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, newHeight);
        ctx.stroke();
      }

      for (let i = 0; i <= rows; i++) {
        const y = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(newWidth, y);
        ctx.stroke();
      }
    };

    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      ctx_gsap.revert();
      resumeCtx.revert();
      experienceCtx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Helper function to push entries to ref arrays
  const addToEducationEntries = (el) => {
    if (el && !educationEntriesRef.current.includes(el)) {
      educationEntriesRef.current.push(el);
    }
  };

  const addToAwardsEntries = (el) => {
    if (el && !awardsEntriesRef.current.includes(el)) {
      awardsEntriesRef.current.push(el);
    }
  };

  const addToCertificatesEntries = (el) => {
    if (el && !certificatesEntriesRef.current.includes(el)) {
      certificatesEntriesRef.current.push(el);
    }
  };

  const addToToolsEntries = (el) => {
    if (el && !toolsEntriesRef.current.includes(el)) {
      toolsEntriesRef.current.push(el);
    }
  };

  const addToSkillsEntries = (el) => {
    if (el && !skillsEntriesRef.current.includes(el)) {
      skillsEntriesRef.current.push(el);
    }
  };

  const addToExperienceCards = (el) => {
    if (el && !experienceCardsRef.current.includes(el)) {
      experienceCardsRef.current.push(el);
    }
  };
  // Add this useEffect to handle scroll locking at the bottom
  useEffect(() => {
    const handleScrollLock = () => {
      const experienceSection = experienceSectionRef.current;
      if (!experienceSection) return;

      const rect = experienceSection.getBoundingClientRect();
      const isAtBottom = rect.bottom <= window.innerHeight;
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // If we're at the bottom of the page
      if (scrollPosition >= maxScroll - 10) {
        // 10px threshold
        // Lock scrolling by preventing default only when trying to scroll past
        document.body.style.overflowY = "hidden";
      } else {
        // Re-enable scrolling
        document.body.style.overflowY = "";
      }
    };

    // Also prevent wheel events when at the bottom and trying to scroll further
    const preventOverscroll = (e) => {
      const experienceSection = experienceSectionRef.current;
      if (!experienceSection) return;

      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const deltaY = e.deltaY;

      // If at the bottom and trying to scroll down
      if (scrollPosition >= maxScroll - 5 && deltaY > 0) {
        e.preventDefault();
      }

      // If at the top and trying to scroll up
      if (scrollPosition <= 5 && deltaY < 0) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScrollLock);
    window.addEventListener("wheel", preventOverscroll, { passive: false });

    handleScrollLock(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScrollLock);
      window.removeEventListener("wheel", preventOverscroll);
      // Clean up styles when component unmounts
      document.body.style.overflowY = "";
    };
  }, []);
  
  return (
    <>
      <div className="about-container">
        <Header transparent={true} scrolled={headerScrolled} />

        {/* Hero Section */}
        <section className="hero" ref={heroRef}>
          <canvas ref={canvasRef} className="grid-canvas" />
          <div className="label" ref={labelRef}>
            Software Engineer • Systems Thinker • Builder
          </div>
          <div className="main-text" ref={mainTextRef}>
            I design and build structured digital systems that combine clean
            architecture, thoughtful design, and practical automation.
          </div>
          <div className="notes-container" ref={notesRef}>
            <div className="note note-1" ref={note1Ref}>
              <div className="note-number">(001)</div>I build full-stack
              applications using JavaScript, React, and backend systems with a
              focus on clarity, maintainability, and scalability.
            </div>
            <div className="note note-2" ref={note2Ref}>
              <div className="note-number">(002)</div>I care deeply about
              structure — from database modeling to frontend hierarchy —
              ensuring systems are intentional.
            </div>
            <div className="note note-3" ref={note3Ref}>
              <div className="note-number">(003)</div>
              My goal is to create digital products that solve real problems,
              automate workflows, and remain efficient over time.
            </div>
          </div>
          <div className="big-word" ref={bigWordRef}>
            Osumgba
            <br />
            Benson
          </div>
          <div className="hero-scrolling-text">
            <div className="hero-scrolling-content">
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
        </section>

        {/* Decorative Bow */}
        <div className="bow-container">
          <Image
            src="/images/Bow.png"
            alt="Decorative bow"
            className="bow-image"
            width={90}
            height={90}
          />
        </div>

        {/* Resume/CV Section */}
        <div className="resume-layout" ref={resumeLayoutRef}>
          <div className="resume-bg-letters" ref={resumeBgLettersRef}>
            <span className="resume-bg-letter" ref={resumePLetterRef}>
              P
            </span>
            <span className="resume-bg-letter" ref={resumeBLetterRef}>
              B
            </span>
          </div>

          <div className="left-column">
            <div className="resume-highlights" ref={resumeHighlightsRef}>
              <h2 className="highlights-title" ref={highlightsTitleRef}>
                Resume <span className="thin">Highlights</span>
              </h2>
              <div className="full-cv-link" ref={cvLinkRef}>
                <a
                  href="https://docs.google.com/document/d/1EbcNjwS7MV_L7YGUTaiuXubdN51vSlOXLhCvCRp7ylQ/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-link"
                >
                  <span>VIEW FULL CV</span>
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="middle-column">
            <div className="section-divider before-education"></div>
            <div className="section" ref={educationSectionRef}>
              <h2 className="heading">EDUCATION</h2>
              <div className="entry" ref={addToEducationEntries}>
                <span className="date">2021 - 2024</span>
                <span className="details">Focus High School</span>
              </div>
              <div className="entry" ref={addToEducationEntries}>
                <span className="date">2022 - 2023</span>
                <span className="details">Astra Nova</span>
              </div>
              <div className="entry" ref={addToEducationEntries}>
                <span className="date">2024 - 2028</span>
                <span className="details spacing">
                  University Of The People
                </span>
              </div>
            </div>

            <div className="section" ref={awardsSectionRef}>
              <h2 className="heading">AWARDS</h2>
              <div className="entry" ref={addToAwardsEntries}>
                <span className="date">2024.</span>
                <span className="details">
                  Yale Entrepreneurial Society Fellowship 1st Place Winning Team
                </span>
              </div>
              <div className="entry" ref={addToAwardsEntries}>
                <span className="date">2024.</span>
                <span className="details">Best Student in Mathematics</span>
              </div>
              <div className="entry" ref={addToAwardsEntries}>
                <span className="date">2021.</span>
                <span className="details spacing">
                  Lafarge Africa National Essay Competition Finalist
                </span>
              </div>
            </div>

            <div className="section" ref={certificatesSectionRef}>
              <h2 className="heading">CERTIFICATE</h2>
              <div className="entry" ref={addToCertificatesEntries}>
                <span className="date">2025.</span>
                <span className="details">
                  IBM Qiskit Summer School(Quantum)
                </span>
              </div>
              <div className="entry" ref={addToCertificatesEntries}>
                <span className="date">2025.</span>
                <span className="details">
                  Stanford Neurodiversity Project's Research (SNP-REACH)
                </span>
              </div>
              <div className="entry" ref={addToCertificatesEntries}>
                <span className="date">2025.</span>
                <span className="details">
                  Yale Entrepreneurial Society Fellowship
                </span>
              </div>
              <div className="entry" ref={addToCertificatesEntries}>
                <span className="date">2024.</span>
                <span className="details">Non-Trivial Finalist</span>
              </div>
              <div className="entry" ref={addToCertificatesEntries}>
                <span className="date">2023.</span>
                <span className="details">Technovation Quarterfinalist</span>
              </div>
              <div className="entry" ref={addToCertificatesEntries}>
                <span className="date">2021.</span>
                <span className="details">
                  UNECA/ITU Hybrid Continental Coding Camp
                </span>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="section-divider before-tools"></div>
            <div className="section" ref={toolsSectionRef}>
              <h2 className="heading">USED TOOLS</h2>
              <div className="entry" ref={addToToolsEntries}>
                <span className="tools">
                  HTML/CSS ____ JavaScript ____ TypeScript
                </span>
              </div>
              <div className="entry" ref={addToToolsEntries}>
                <span className="tools">
                  AWS/Google Cloud ____ Python/Django
                </span>
              </div>
              <div className="entry" ref={addToToolsEntries}>
                <span className="tools">Docker ____ MongoDB/MYSQL</span>
              </div>
              <div className="entry" ref={addToToolsEntries}>
                <span className="tools">Node.js/Express ____ Git/GitHub</span>
              </div>
              <div className="entry" ref={addToToolsEntries}>
                <span className="tools spacing">React/Next</span>
              </div>
            </div>

            <div className="section" ref={skillsSectionRef}>
              <h2 className="heading">SKILLS</h2>
              <div className="entry" ref={addToSkillsEntries}>
                <span className="tools">
                  Programming & Software Development
                </span>
              </div>
              <div className="entry" ref={addToSkillsEntries}>
                <span className="tools">Database Management</span>
              </div>
              <div className="entry" ref={addToSkillsEntries}>
                <span className="tools">Version Control & Collaboration</span>
              </div>
              <div className="entry" ref={addToSkillsEntries}>
                <span className="tools">Debugging & Optimization</span>
              </div>
              <div className="entry" ref={addToSkillsEntries}>
                <span className="tools">
                  Cloud & DevOps ____ Problem-Solving
                </span>
              </div>
              <div className="entry" ref={addToSkillsEntries}>
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
            <h2 className="section-main-title" ref={experienceTitleRef}>
              Adventures in Tech
            </h2>
            <p className="section-subtitle" ref={experienceSubtitleRef}>
              Notable projects and contributions
            </p>
          </div>

          <div className="experience-grid">
            <div className="experience-card card-1" ref={addToExperienceCards}>
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

            <div className="experience-card card-2" ref={addToExperienceCards}>
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

            <div className="experience-card card-3" ref={addToExperienceCards}>
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

            <div className="experience-card card-1" ref={addToExperienceCards}>
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

            <div className="experience-card card-2" ref={addToExperienceCards}>
              <div className="card-header">
                <span className="card-number">05</span>
                <span className="card-year">Sep 2024 - Present</span>
              </div>
              <h3 className="card-title">
                The BulleTeen | Web Dev & Hiring Lead
              </h3>
              <p className="card-description">
                <span className="card-achievement"></span> Boosted STEM
                accessibility 50% via UX optimization
                <br />
                <span className="card-achievement"></span> Scaled to 500+
                monthly visitors
                <br />
                <span className="card-achievement"></span> Built/managed 55+
                volunteer team
                <br />
                <span className="card-achievement"></span> Produced global STEM
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

            <div className="experience-card card-3" ref={addToExperienceCards}>
              <div className="card-header">
                <span className="card-number">06</span>
                <span className="card-year">2024-2025</span>
              </div>
              <h3 className="card-title">Non-Trivial</h3>
              <p className="card-description">
                Researched and modeled climate solutions as global finalist,
                analyzing environmental datasets and presenting findings to
                domain experts.
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

            <div className="experience-card card-4" ref={addToExperienceCards}>
              <div className="card-header">
                <span className="card-number">07</span>
                <span className="card-year">2022-2023</span>
              </div>
              <h3 className="card-title">Pearl Impact Network Africa</h3>
              <p className="card-description">
                Modernized NGO website with improved UX/UI, increasing
                engagement by 40% through responsive design and streamlined
                content delivery.
              </p>
              <div className="card-tags">
                <span>Web Redesign</span>
                <span>UX Optimization</span>
                <span>Non-profit Tech</span>
                <span>Frontend Development</span>
              </div>
              <div className="card-highlight"></div>
            </div>

            <div className="experience-card card-5" ref={addToExperienceCards}>
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
      <Terminal />
    </>
  );
}

export default About;
