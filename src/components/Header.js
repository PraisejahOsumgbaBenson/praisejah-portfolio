import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import hoverSound from "../assets/sounds/nav_keys.mp3"; // Regular hover sound
import "./Style.css";
import unlockSound from "../assets/sounds/silent.mp3"; // Silent sound used to unlock browser autoplay policy

function Header({ onAboutClick }) {
  // Stores the current time in Nigeria (Africa/Lagos time zone)
  const [time, setTime] = useState("");

  // Controls whether hover sounds should play or not
  const [soundUnlocked, setSoundUnlocked] = useState(false);

  // Keeps track of last sound play time to prevent sound spam
  let lastPlayTime = 0;

  // 🕒 Automatically updates the current time every second
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

    updateTime(); // Run once immediately
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  // 🔓 Unlocks sound playback on first user interaction (browser requirement)
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio(unlockSound); // Use a silent/soft sound
      audio.muted = true; // Required to allow autoplay in modern browsers

      audio
        .play()
        .then(() => {
          audio.muted = false; // Unmute after unlocking
          setSoundUnlocked(true); // Allow hover sound to play going forward
        })
        .catch(() => {
          console.warn("User interaction needed to unlock audio.");
        });

      // Remove event listeners after first interaction
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    // Add event listeners for first click or keypress
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    // Cleanup listeners if component unmounts
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // 🔊 Plays hover sound (but not more than once every 400ms)
  const playHoverSound = () => {
    if (!soundUnlocked) return; // Only play if sound was unlocked

    const now = Date.now();
    const delay = 400; // Minimum time between sound plays (ms)

    if (now - lastPlayTime > delay) {
      const audio = new Audio(hoverSound);
      audio.volume = 0.2; // Set volume lower to avoid loud clicks
      audio.play().catch((err) => {
        console.warn("Sound play error:", err);
      });
      lastPlayTime = now;
    }
  };

  // 🎯 Animation when logo is hovered
  const handleLogoHover = () => {
    gsap.to(".logo", {
      scale: 1.0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // 🔁 Logo scales back when mouse leaves
  const handleLogoMouseLeave = () => {
    gsap.to(".logo", {
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <header className="header">
      <div className="left-nav">
        {/* Logo and Time */}
        <div className="header-left">
          <Link
            to="/"
            onMouseEnter={() => {
              handleLogoHover(); // Animate
              playHoverSound(); // Sound on hover
            }}
            onMouseLeave={handleLogoMouseLeave}
            style={{ textDecoration: "none" }}
          >
            <p className="logo" style={{ cursor: "pointer" }}>
              <span>P</span>
              <span>j</span>
            </p>
          </Link>
        </div>

        <div className="time">
          {/* Time display */}
          <p>NIGERIA, {time} WAT</p>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="header-center">
        <ul className="nav-list">
          <li>
            <Link
              to="/"
              className="nav-link home"
              onMouseEnter={playHoverSound}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="nav-link"
              onMouseEnter={playHoverSound}
              onClick={onAboutClick}
            >
              ABOUT
            </Link>
          </li>
         {/*  <li>
            <Link
              to="/projects"
              className="nav-link"
              onMouseEnter={playHoverSound}
            >
              PROJECT
            </Link>
          </li> */}
          <li>
            <Link
              to="/skills"
              className="nav-link"
              onMouseEnter={playHoverSound}
            >
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Dark mode toggle (future enhancement) */}
        <div className="d-mode">
          <button className="darkmode" onMouseEnter={playHoverSound}></button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
