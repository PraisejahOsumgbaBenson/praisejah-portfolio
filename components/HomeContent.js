"use client";

import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import "./Style.css";
import Terminal from "./Terminal";

function HomeContent() {
  const [audioReady, setAudioReady] = useState(false);
  const contentBoxRef = useRef(null);
  const nameTextRef = useRef(null);
  const collaborationRef = useRef(null);
  const descTextRef = useRef(null);
  const cvRef = useRef(null);
  const socialsRef = useRef(null);
  const footerTextRef = useRef(null);
  const fTextRef = useRef(null);

  const cooldownMap = new Map();
  const hoverDelay = 200;
  let firstPlayDone = false;

  const playHoverSound = (elementId) => {
    if (!audioReady) return;

    const now = Date.now();
    const lastTime = cooldownMap.get(elementId) || 0;

    if (now - lastTime < hoverDelay) return;

    cooldownMap.set(elementId, now);

    const audio = new Audio("/sounds/header_keys.mp3");
    audio.volume = firstPlayDone ? 0.2 : 0.05;
    audio.play().catch((err) => {
      console.warn("Playback blocked:", err);
    });

    firstPlayDone = true;
  };

  const handleHover = () => {
    gsap.fromTo(
      ".praisejah-letter",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power1.out" }
    );
  };

  // ===== PILLS EFFECT LOGIC WITH EXCLUSION ZONES =====
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth <= 768) return;

    const pills = [
      { text: "UX Strategy", color: "#EDE7D1" },
      { text: "Content Strategy", color: "#D6CDEA" },
      { text: "UX/UI Design", color: "#E6E2F1" },
      { text: "Website Design & Dev", color: "#D4B35E" },
      { text: "Consulting", color: "#F08A5D" },
      { text: "Creative Technology", color: "#C6EBC5" },
      { text: "Frontend Dev", color: "#A4C2A5" },
      { text: "React Developer", color: "#DB9197" },
      { text: "Open Source", color: "#BE8A94" },
      { text: "Problem Solver", color: "#819582" },
    ];

    const container = document.getElementById("pill-container");
    if (!container) return;

    const pillElements = [];
    let index = 0;
    let pillCount = 0;
    const pillCountElement = document.getElementById("pill-count");

    // Track last pill position and time
    let lastPillTime = 0;
    let lastPillX = 0;
    let lastPillY = 0;
    const minTimeBetweenPills = 300;
    const minDistanceBetweenPills = 80;

    // Create pill elements
    pills.forEach((pill) => {
      const el = document.createElement("div");
      el.className = "pill";
      el.textContent = pill.text;
      el.style.background = pill.color;
      el.style.color = "#141414";
      container.appendChild(el);
      pillElements.push(el);
    });

    let mouseX = 0;
    let mouseY = 0;

    // Function to check if point is inside an exclusion zone
    const isInsideExclusionZone = (x, y) => {
      // Get all interactive elements
      const exclusionElements = [
        contentBoxRef.current,
        nameTextRef.current,
        collaborationRef.current,
        descTextRef.current,
        cvRef.current,
        socialsRef.current,
        footerTextRef.current,
        fTextRef.current,
      ].filter((el) => el);

      // Also get all links, buttons, and interactive elements
      const interactiveElements = document.querySelectorAll(
        "a, button, .cv, .github, .social-icon, .nav-link, .logo, .header-right"
      );

      // Combine all elements to check
      const allElements = [...exclusionElements, ...interactiveElements];

      // Add extra padding around elements (in pixels)
      const padding = 60;

      for (const element of allElements) {
        if (!element) continue;

        try {
          const rect = element.getBoundingClientRect();

          // Check if point is within element bounds + padding
          if (
            x >= rect.left - padding &&
            x <= rect.right + padding &&
            y >= rect.top - padding &&
            y <= rect.bottom + padding
          ) {
            return true;
          }
        } catch (e) {
          // Skip if element is not valid
          continue;
        }
      }

      return false;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if mouse is inside any exclusion zone
      if (isInsideExclusionZone(mouseX, mouseY)) {
        return; // Don't create pills near interactive elements
      }

      const now = Date.now();
      const timeSinceLastPill = now - lastPillTime;

      // Calculate distance from last pill
      const distanceFromLastPill = Math.sqrt(
        Math.pow(mouseX - lastPillX, 2) + Math.pow(mouseY - lastPillY, 2)
      );

      // Only create pill if enough time has passed AND enough distance moved
      if (
        timeSinceLastPill > minTimeBetweenPills &&
        distanceFromLastPill > minDistanceBetweenPills
      ) {
        const pill = pillElements[index % pillElements.length];

        // Random offset for better spacing
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 50;

        // Check if the pill position would be inside exclusion zone
        const pillX = mouseX + offsetX;
        const pillY = mouseY + offsetY;

        if (isInsideExclusionZone(pillX, pillY)) {
          return; // Don't show pill if it would be in exclusion zone
        }

        pill.style.left = pillX + "px";
        pill.style.top = pillY + "px";

        pill.classList.add("show");

        setTimeout(() => {
          pill.classList.remove("show");
        }, 1500);

        index++;
        pillCount++;
        if (pillCountElement) {
          pillCountElement.textContent = pillCount;
        }

        // Update last pill position and time
        lastPillTime = now;
        lastPillX = mouseX;
        lastPillY = mouseY;
      }
    };

    // Add event listener
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // Remove all pill elements
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio("/sounds/silent.mp3");
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.muted = false;
          setAudioReady(true);
        })
        .catch(() => {
          console.warn("User interaction needed to unlock audio.");
        });

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    // GSAP animations
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(
      ".background-name",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 },
      "<0.3"
    )
      .fromTo(
        ".content-box",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        "<0.3"
      )
      .fromTo(".name-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<0.2")
      .fromTo(
        ".collaboration-text",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0 },
        "<0.2"
      )
      .fromTo(
        ".social-icon",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.2 },
        "<"
      );

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  return (
    <>
      <Header className="header" />

      {/* Dot Grid Background */}
      <div className="dot-grid-background"></div>

      {/* Main content area */}
      <div className="home-container">
        {/* BIG BACKGROUND TEXT - BEHIND EVERYTHING (Mobile Only) */}
        <div className="background-name">
          <div className="praise-line">
            <span className="font-1">P</span>
            <span className="font-2">ra</span>
            <span className="font-1">l</span>
            <span className="font-3">se</span>
          </div>
          <div className="jah-line">
            <span className="font-2">j</span>
            <span className="font-2">a</span>
            <span className="font-1">h</span>
          </div>
          <div className="ob-line">
            <span className="font-1">(</span>
            <span className="font-2">O</span>
            <span className="font-3">B</span>
            <span className="font-1">)</span>
          </div>
        </div>

        {/* CONTENT BOX - IN FRONT OF BACKGROUND TEXT */}
        <div className="content-box" ref={contentBoxRef}>
          <div className="main-content">
            {/* ORIGINAL NAME TEXT - Will be hidden on mobile via CSS */}
            <div
              className="name-text"
              ref={nameTextRef}
              onMouseEnter={() => {
                handleHover();
                playHoverSound("name-text");
              }}
              style={{ display: "flex", gap: "2px" }}
            >
              {"Praisejah".split("").map((letter, index) => (
                <span
                  key={index}
                  className="praisejah-letter"
                  style={{ display: "inline-block" }}
                >
                  {letter}
                </span>
              ))}
              <sup>(OB)</sup>
            </div>

            <br />

            {/* Tagline with GitHub link */}
            <div className="collaboration-section" ref={collaborationRef}>
              <span className="collaboration-text">
                Let&apos;s build something great together /{" "}
                <a
                  className="github"
                  href="https://github.com/PraisejahOsumgbaBenson"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHoverSound("github")}
                >
                  GITHUB
                </a>
              </span>
            </div>

            <br />

            {/* Description + CV */}
            <div className="desc-section">
              <span className="desc-text" ref={descTextRef}>
                Building impactful software and exploring efficient solutions
                excite me. Open-source contributor and problem-solver.
              </span>
              <div
                className="cv-wrapper"
                ref={cvRef}
                onClick={() => {
                  if (audioReady) {
                    const audio = new Audio("/sounds/header_keys.mp3");
                    audio.volume = 0.2;
                    audio.play().catch(console.warn);
                  }
                  window.open(
                    "https://docs.google.com/document/d/1EbcNjwS7MV_L7YGUTaiuXubdN51vSlOXLhCvCRp7ylQ/edit?usp=sharing",
                    "_blank"
                  );
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (audioReady) {
                    const audio = new Audio("/sounds/header_keys.mp3");
                    audio.volume = 0.2;
                    audio.play().catch(console.warn);
                  }
                }}
              >
                <a
                  href="https://docs.google.com/document/d/1EbcNjwS7MV_L7YGUTaiuXubdN51vSlOXLhCvCRp7ylQ/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv"
                  style={{ pointerEvents: "none" }}
                >
                  <span className="cv-text">My CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* GitHub and LinkedIn Icons */}
          <div className="socials-container" ref={socialsRef}>
            <div className="socials">
              <div className="social-icon">
                <a
                  href="https://github.com/PraisejahOsumgbaBenson"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHoverSound("icon-github")}
                >
                  <FaGithub size={12} />
                </a>
              </div>
              <div className="social-icon">
                <a
                  href="https://www.linkedin.com/in/praisejah-osumgba-benson"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHoverSound("icon-linkedin")}
                >
                  <FaLinkedin size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="f-text" ref={fTextRef}>
          Designed by ME / Developed by ME
        </div>
        <div className="footer-text" ref={footerTextRef}>
          PRAISEJAH (HER/SHE) AKA PJ IS AN INDEPENDENT ENGINEER FROM NIGERIA.
        </div>
      </div>

      {/* Pills Effect Container */}
      <div id="pill-container"></div>
      <div className="pill-count-display">
        Pills: <span id="pill-count">0</span>
      </div>

      <Terminal />
    </>
  );
}

export default HomeContent;
