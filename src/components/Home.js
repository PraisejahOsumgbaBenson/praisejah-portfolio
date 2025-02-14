import React, { useEffect, useState } from "react";
import Header from "./Header";
import About from "./About";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import "./Style.css";
import hoverSound from "../assets/namee.mp3";
import image6 from "../assets/6.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image7 from "../assets/7.png";
import image8 from "../assets/8.png";
import image10 from "../assets/10.png";

function Home() {
  const [cursorDisabled, setCursorDisabled] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleHover = () => {
    gsap.fromTo(
      ".praisejah-letter",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power1.out" }
    );
  };

  const playHoverSound = () => {
    const audio = new Audio(hoverSound);
    audio.play();
  };

useEffect(() => {
  // Disable scrolling
  document.body.style.overflow = "hidden";

  const handleScroll = (e) => {
    if (e.deltaY > 0 && !showAbout) {
      setShowAbout(true);
      gsap.to(".home-container", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => gsap.set(".home-container", { visibility: "hidden" }),
      });
      gsap.set(".about-container", { visibility: "visible" });
      gsap.fromTo(
        ".about-container",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else if (e.deltaY < 0 && showAbout) {
      setShowAbout(false);
      gsap.to(".about-container", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(".about-container", { visibility: "hidden" }),
      });
      gsap.set(".home-container", { visibility: "visible" });
      gsap.fromTo(
        ".home-container",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  window.addEventListener("wheel", handleScroll);
  return () => {
    window.removeEventListener("wheel", handleScroll);
    document.body.style.overflow = ""; // Restore scrolling when component unmounts
  };
}, [showAbout]);



  useEffect(() => {
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

    const isInsideInteractiveElement = (e) => {
      return (
        e.target.closest(".text") ||
        e.target.closest(".cv") ||
        e.target.closest(".github") ||
        e.target.closest(".collaboration-text") ||
        e.target.closest("button") ||
        e.target.closest(".header") ||
        e.target.closest(".social-icon") ||
        e.target.closest(".f-text") ||
        e.target.closest(".footer-text")
      );
    };

    const createImage = (e) => {
      if (cursorDisabled || isInsideInteractiveElement(e)) return;

      const xPos = e.pageX;
      const yPos = e.pageY;

      const images = [image6, image3, image4, image5, image7, image8, image10];
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const image = document.createElement("img");
      image.src = randomImage;
      image.classList.add("cursor-image");

      const cursorContainer = document.querySelector(".cursor-container");
      cursorContainer.appendChild(image);

      image.style.left = `${xPos}px`;
      image.style.top = `${yPos}px`;

      gsap.fromTo(
        image,
        {
          opacity: 0,
          scale: 0.4,
          zIndex: 10,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(image, {
              opacity: 0,
              scale: 0.6,
              zIndex: -1,
              duration: 1.2,
              ease: "power1.inOut",
              onComplete: () => image.remove(),
            });
          },
        }
      );
    };

    const handleMouseMove = throttle((e) => {
      setCursorDisabled(isInsideInteractiveElement(e));
      createImage(e);
    }, 100);

    const handleMouseLeave = () => {
      const cursorContainer = document.querySelector(".cursor-container");
      cursorContainer.innerHTML = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="cursor-container"></div>
      <div className="gradient-bg"></div>
      <div className="home-container">
        <div className="main-container fade-in">
          <div className="container">
            <div className="text">
              <div
                className="name-text"
                onMouseEnter={() => {
                  handleHover();
                  playHoverSound();
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
      </div>
      <div className={`about-container ${showAbout ? "visible" : ""}`}>
        <About />
      </div>
    </>
  );
}

export default Home;
