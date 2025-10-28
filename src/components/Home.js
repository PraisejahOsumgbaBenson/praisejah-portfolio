import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import "./Style.css";
import hoverSound from "../assets/sounds/header_keys.mp3";
import unlockSound from "../assets/sounds/silent.mp3";
import Terminal from "./Terminal";

function Home() {
  const [audioReady, setAudioReady] = useState(false);

  const cooldownMap = new Map();
  const hoverDelay = 200;
  let firstPlayDone = false;

  const playHoverSound = (elementId) => {
    if (!audioReady) return;

    const now = Date.now();
    const lastTime = cooldownMap.get(elementId) || 0;

    if (now - lastTime < hoverDelay) return;

    cooldownMap.set(elementId, now);

    const audio = new Audio(hoverSound);
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

  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio(unlockSound);
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
        <div className="content-box">
          <div className="main-content">
            {/* ORIGINAL NAME TEXT - Will be hidden on mobile via CSS */}
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
                Let's build something great together /{" "}
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

      <Terminal />
    </>
  );
}

export default Home;
