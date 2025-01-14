import React, { useEffect } from "react";
import Header from "./Header";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import "./Style.css";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/7.png";
import image7 from "../assets/8.png";
import image8 from "../assets/9.png";
import image9 from "../assets/10.png";
import image10 from "../assets/11.png";

// Import hover sound
import hoverSound from "../assets/namee.mp3";

function Home() {
  useEffect(() => {
    // GSAP animations
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
        { opacity: 1, x: 0, duration: 1 },
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
        { opacity: 1, y: 0, duration: 1 },
        "<0.5"
      )
      .fromTo(
        ".f-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "<0.5"
      );

    // Cursor animations
    const throttle = (callback, delay) => {
      let lastTime = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
          lastTime = now;
          callback(...args);
        }
      };
    };

   let lastImageTime = 0;

   const createImage = (e) => {
     const currentTime = Date.now();
     if (currentTime - lastImageTime < 100) {
       // Prevent creating a new image too quickly
       return;
     }

     lastImageTime = currentTime;

     const xPos = e.pageX + Math.random() * 10; // Adding random offset for spacing
     const yPos = e.pageY + Math.random() * 10; // Adding random offset for spacing

     const images = [
       image1,
       image2,
       image3,
       image4,
       image5,
       image6,
       image7,
       image8,
       image9,
       image10,
     ];

     const randomImage = images[Math.floor(Math.random() * images.length)];

     const image = document.createElement("img");
     image.src = randomImage;
     image.classList.add("cursor-image");

     const container = document.querySelector(".cursor-container");
     container.appendChild(image);

     image.style.left = `${xPos}px`;
     image.style.top = `${yPos}px`;

     setTimeout(() => {
       image.remove();
     }, 1000);
   };

      

    const handleMouseLeave = () => {
      const container = document.querySelector(".cursor-container");
      container.innerHTML = "";
    };

    document.addEventListener("mousemove", throttle(createImage, 100));
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", throttle(createImage, 100));
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const playHoverSound = () => {
    const audio = new Audio(hoverSound);
    audio.play();
  };

  return (
    <>
      <Header />
      <div className="cursor-container"></div> {/* Cursor effect container */}
      <div className="gradient-bg"></div>
      <div className="main-container fade-in">
        <div className="container">
          <div className="text">
            {/* Praisejah Name Section */}
            <div
              className="name-text"
              onMouseEnter={playHoverSound}
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
            {/* Collaboration Section */}
            <div className="collaboration-section">
              <span className="collaboration-text">
                Open for any collaboration and offer /{" "}
                <a
                  className="github"
                  href="https://github.com/PraisejahOsumgbaBenson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB
                </a>
              </span>
            </div>
            <br />
            {/* Description Section */}
            <div className="desc-section">
              <span className="desc-text">
                Building impactful software and exploring efficient solutions
                excite me. Open-source contributor and problem-solver.
              </span>
              {/* CV Button */}
              <a
                href="https://docs.google.com/document/d/1EbcNjwS7MV_L7YGUTaiuXubdN51vSlOXLhCvCRp7ylQ/edit?usp=sharing"
                download
                className="cv"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
              >
                <span className="cv-text">My CV</span>
              </a>
            </div>
          </div>
        </div>
        <div className="socials-container">
          <div className="socials">
            <div className="social-icon">
              <a
                href="https://github.com/PraisejahOsumgbaBenson"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={12} />
              </a>
            </div>
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/praisejah-osumgba-benson"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="f-text">Designed by ME / Developed by ME</div>
      <div className="footer-text">
        PRAISEJAH (HER/SHE) AKA PJ IS AN INDEPENDENT ENGINEER FROM NIGERIA.
      </div>
    </>
  );
}

export default Home;
