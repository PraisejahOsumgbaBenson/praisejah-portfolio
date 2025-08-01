import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import hoverSound from "../assets/sounds/nav_keys.mp3";
import "./Style.css";

function Header({ onAboutClick }) {
  const [time, setTime] = useState("");

  // Function to fetch current Nigerian time
  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString("en-NG", {
        timeZone: "Africa/Lagos", // Nigerian time zone
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12-hour format
      });
      setTime(currentTime);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to play hover sound

  let lastPlayTime = 0; // Add this outside the function
  const playHoverSound = () => {
    const now = Date.now();
    const delay = 400; // 300ms delay between plays

    if (now - lastPlayTime > delay) {
      const audio = new Audio(hoverSound);
      audio.volume = 0.4; // Set volume (range: 0.0 to 1.0)
      audio.play();
      lastPlayTime = now;
    }
  };

  // Function to handle logo hover effect (scale up)
  const handleLogoHover = () => {
    gsap.to(".logo", {
      scale: 1.2,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Function to reset logo scale when mouse leaves
  const handleLogoMouseLeave = () => {
    gsap.to(".logo", {
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut", // Use a smooth easing for returning to original scale
    });
  };

  return (
    <header className="header">
      <div className="left-nav">
        <div className="header-left">
          {/* Logo section */}
          <p
            className="logo"
            onMouseEnter={() => {
              handleLogoHover();
              playHoverSound(); // Play hover sound
            }}
            onMouseLeave={handleLogoMouseLeave} // Reset scale on mouse leave
            style={{ cursor: "pointer" }}
          >
            <span>P</span>
            <span>j</span>
          </p>
        </div>
        <div className="time">
          <p>NIGERIA,{time} WAT</p>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="header-center">
        <ul className="nav-list">
          <li>
            <Link
              to="/"
              className="nav-link home"
              onMouseEnter={playHoverSound} // Add hover sound effect
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="nav-link"
              onMouseEnter={playHoverSound} // Add hover sound effect
              onClick={onAboutClick} // Trigger the About section logic
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="nav-link"
              onMouseEnter={playHoverSound} // Add hover sound effect
            >
              PROJECT
            </Link>
          </li>
          <li>
            <Link
              to="/skills"
              className="nav-link"
              onMouseEnter={playHoverSound} // Add hover sound effect
            >
              CONTACT
            </Link>
          </li>
        </ul>
        <div className="d-mode">
          <button
            className="darkmode"
            onMouseEnter={playHoverSound} // Add hover sound effect
          ></button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
