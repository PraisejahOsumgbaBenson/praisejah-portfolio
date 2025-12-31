"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import "./Header.css";

function Header({ onAboutClick }) {
  const [time, setTime] = useState("");
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const cursorRef = useRef(null);
  const animationFrameId = useRef(null);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const lastPlayTime = useRef(0);

  // 🕒 Time update effect
  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString("en-NG", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔓 Unlock sound
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio("/sounds/silent.mp3");
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.muted = false;
          setSoundUnlocked(true);
        })
        .catch(() => console.warn("User interaction needed to unlock audio."));
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // 🔊 Hover sound
  const playHoverSound = () => {
    if (!soundUnlocked) return;
    const now = Date.now();
    if (now - lastPlayTime.current > 400) {
      const audio = new Audio("/sounds/nav_keys.mp3");
      audio.volume = 0.2;
      audio.play().catch((err) => console.warn("Sound play error:", err));
      lastPlayTime.current = now;
    }
  };

  // 🎨 Logo animations
  const handleLogoHover = () => {
    gsap.to(".logo", { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleLogoMouseLeave = () => {
    gsap.to(".logo", { scale: 1, duration: 0.3, ease: "power2.inOut" });
  };

  // 📱 Mobile Detection
  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📱 Mobile menu toggle
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    playHoverSound();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 🎯 ENHANCED Cursor Effect - Now with Touch Support
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !isMobile) return;

    const updateCursorPosition = () => {
      cursor.style.left = cursorX.current + "px";
      cursor.style.top = cursorY.current + "px";
      animationFrameId.current = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseMove = (e) => {
      cursorX.current = e.clientX;
      cursorY.current = e.clientY;
      if (isMobileMenuOpen) {
        cursor.style.opacity = "1";
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        cursorX.current = touch.clientX;
        cursorY.current = touch.clientY;
        if (isMobileMenuOpen) {
          cursor.style.opacity = "1";
        }
        e.preventDefault();
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        cursorX.current = touch.clientX;
        cursorY.current = touch.clientY;
        if (isMobileMenuOpen) {
          cursor.style.opacity = "1";
          cursor.style.transform = "translate(-50%, -50%) scale(1.2)";
          setTimeout(() => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
          }, 150);
        }
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    if (isMobileMenuOpen) {
      document.body.style.cursor = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      document.addEventListener("mouseleave", handleMouseLeave);
      updateCursorPosition();
      cursorX.current = window.innerWidth / 2;
      cursorY.current = window.innerHeight / 2;
      cursor.style.opacity = "1";
    } else {
      cursor.style.opacity = "0";
      document.body.style.cursor = "auto";
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
    };
  }, [isMobile, isMobileMenuOpen]);

  return (
    <header className="header">
      {/* Enhanced Spotlight Cursor - Now with touch support */}
      {isMobile && <div className="cursor" ref={cursorRef}></div>}

      <div className="left-nav">
        <div className="header-left">
          <Link
            href="/"
            onMouseEnter={() => {
              handleLogoHover();
              playHoverSound();
            }}
            onMouseLeave={handleLogoMouseLeave}
            style={{ textDecoration: "none" }}
            onClick={closeMobileMenu}
          >
            <p className="logo">
              <span>P</span>
              <span>j</span>
            </p>
          </Link>
        </div>

        <div className="time">
          <p>NIGERIA, {time} WAT</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="header-center">
        <ul className="nav-list">
          <li>
            <Link
              href="/"
              className="nav-link home"
              onMouseEnter={playHoverSound}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="nav-link"
              onMouseEnter={playHoverSound}
              onClick={onAboutClick}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="nav-link"
              onMouseEnter={playHoverSound}
              onClick={onAboutClick}
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="nav-link"
              onMouseEnter={playHoverSound}
            >
              CONTACT
            </Link>
          </li>
        </ul>

        <div className="d-mode">
          <button className="darkmode" onMouseEnter={playHoverSound}></button>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
        onMouseEnter={playHoverSound}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      >
        <nav
          className={`mobile-fullscreen-nav ${
            isMobileMenuOpen ? "active" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="mobile-fullscreen-nav-list">
            <li>
              <Link
                href="/"
                data-number="01"
                className="mobile-fullscreen-nav-link"
                onClick={closeMobileMenu}
              >
                <span className="word-container">
                  <span className="font-1">N</span>
                  <span className="font-2">o</span>
                  <span className="font-3">me</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                data-number="03"
                data-position="back"
                className="mobile-fullscreen-nav-link"
                onClick={closeMobileMenu}
              >
                <span className="word-container">
                  <span className="font-1">A</span>
                  <span className="font-1">b</span>
                  <span className="font-1">e</span>
                  <span className="font-2">u</span>
                  <span className="font-3">t</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                data-number="04"
                className="mobile-fullscreen-nav-link"
                onClick={closeMobileMenu}
              >
                <span className="word-container">
                  <span className="font-1">C</span>
                  <span className="font-2">o</span>
                  <span className="font-1">n</span>
                  <span className="font-3">t</span>
                  <span className="font-3">a</span>
                  <span className="font-3">c</span>
                  <span className="font-3">t</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
