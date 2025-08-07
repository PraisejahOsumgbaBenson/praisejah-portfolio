import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import "./Style.css";
import hoverSound from "../assets/sounds/header_keys.mp3"; // Hover sound effect
import unlockSound from "../assets/sounds/silent.mp3"; // Silent audio to unlock autoplay

function Home() {
  // Track if audio is unlocked and ready to be played
  const [audioReady, setAudioReady] = useState(false);

  // Stores when each element was last hovered, for cooldown effect
  const cooldownMap = new Map();

  // Time delay between sounds for the same element (in ms)
  const hoverDelay = 200;

  // Track if the first hover sound has been played
  let firstPlayDone = false;

  /**
   * Plays the hover sound when user hovers over specific elements.
   * - Uses a cooldown to prevent rapid re-triggering
   * - First sound is softer than the rest
   */
  const playHoverSound = (elementId) => {
    if (!audioReady) return; // Prevent playback before user interaction

    const now = Date.now();
    const lastTime = cooldownMap.get(elementId) || 0;

    // Skip sound if hover happened too soon
    if (now - lastTime < hoverDelay) return;

    cooldownMap.set(elementId, now); // Update last hover time

    const audio = new Audio(hoverSound);
    audio.volume = firstPlayDone ? 0.2 : 0.05; // First sound is soft
    audio.play().catch((err) => {
      console.warn("Playback blocked:", err);
    });

    firstPlayDone = true;
  };

  /**
   * GSAP animation when hovering over the name "Praisejah"
   */
  const handleHover = () => {
    gsap.fromTo(
      ".praisejah-letter",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power1.out" }
    );
  };

  /**
   * Unlocks browser audio context on first user interaction.
   * Plays a muted sound so future sounds aren't blocked.
   */
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio(unlockSound);
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.muted = false;
          setAudioReady(true); // Mark audio as unlocked and ready
        })
        .catch(() => {
          console.warn("User interaction needed to unlock audio.");
        });

      // Remove listeners after the first interaction
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    // Add listeners to capture first interaction
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    // Run GSAP animations when page loads
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(
      ".gradient-bg",
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1, duration: 1.5 }
    )
      .fromTo(".hi-text", { opacity: 0, y: -50 }, { opacity: 1, y: 0 }, "<0.3")
      .fromTo(
        ".collaboration-text",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0 },
        "<0.3"
      )
      .fromTo(".name-text", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "<0.3")
      .fromTo(
        ".social-icon",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.2 },
        "<"
      )
      .fromTo(
        ".footer-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "<0.5"
      )
      .fromTo(".f-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<0.5");

    // Clean up
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  return (
    <>
      {/* Top navigation bar */}
      <Header className="header" />

      {/* Cursor effect (optional) */}
      <div className="cursor-container"></div>

      {/* Faint background color or texture */}
      <div className="gradient-bg"></div>

      {/* Main content area */}
      <div className="home-container">
        <div className="main-container fade-in">
          <div className="container">
            <div className="text">
              {/* Animated name */}
              <div
                className="name-text"
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
              <div className="collaboration-section">
                <span className="collaboration-text">
                  Let’s build something great together /{" "}
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
                <span className="desc-text">
                  Building impactful software and exploring efficient solutions
                  excite me. Open-source contributor and problem-solver.
                </span>
                <a
                  href="https://docs.google.com/document/d/1EbcNjwS7MV_L7YGUTaiuXubdN51vSlOXLhCvCRp7ylQ/edit?usp=sharing"
                  download
                  className="cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playHoverSound("cv")}
                >
                  <span className="cv-text">My CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* GitHub and LinkedIn Icons */}
          <div className="socials-container">
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
        <div className="f-text">Designed by ME / Developed by ME</div>
        <div className="footer-text">
          PRAISEJAH (HER/SHE) AKA PJ IS AN INDEPENDENT ENGINEER FROM NIGERIA.
        </div>
      </div>
    </>
  );
}

export default Home;
