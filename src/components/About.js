import React, { useEffect, useRef } from "react";
import Header from "./Header";
import "./About.css";

import diary from "../assets/diary.png";
import bowImage from "../assets/Bow.png";

function About() {
  const experienceSectionRef = useRef(null);
  const timelineRef = useRef(null);

  // Horizontal scroll effect
  useEffect(() => {
    const timeline = timelineRef.current;
    const section = experienceSectionRef.current;

    if (!timeline || !section) return;

    let scrollTimeout;
    let enableScroll = false; // Flag to enable horizontal scrolling after delay

    const handleWheel = (e) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const sectionInView =
        scrollY + windowHeight > sectionTop && scrollY < sectionBottom;

      if (!sectionInView || !enableScroll) return; // Let normal scroll happen

      const delta = e.deltaY;
      const maxScrollLeft = timeline.scrollWidth - timeline.clientWidth;
      const currentScrollLeft = timeline.scrollLeft;

      const canScrollRight = currentScrollLeft < maxScrollLeft;
      const canScrollLeft = currentScrollLeft > 0;

      // Only trigger horizontal scroll when at the bottom of the section
      const atBottomOfSection = scrollY + windowHeight >= sectionBottom;

      if (
        atBottomOfSection &&
        ((delta > 0 && canScrollRight) || (delta < 0 && canScrollLeft))
      ) {
        e.preventDefault();

        // Multiply the delta value to increase scroll speed
        const scrollSpeedMultiplier = 40; // Adjusted for faster scrolling
        timeline.scrollLeft += delta * scrollSpeedMultiplier;
      }
    };

    const handleScroll = () => {
      const sectionTop = section.offsetTop;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const sectionInView = scrollY + windowHeight > sectionTop;

      if (sectionInView && !enableScroll) {
        // Add a delay before enabling horizontal scroll
        setTimeout(() => {
          enableScroll = true; // Enable horizontal scrolling after delay
        }, 2000); // 2-second delay before enabling scroll
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout); // Clear timeout on cleanup
    };
  }, []);

 

  // Scroll effect for timeline items
  useEffect(() => {
    const timelineItems = document.querySelectorAll(".timeline-item-top");

    const handleScroll = () => {
      timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the item is in view
        if (rect.top < windowHeight - 100) {
          item.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="about-container">
      <Header />

      <div className="about-header">
        <div className="about-title">
          <h1 className="praisejah-title" style={{ fontSize: "110px" }}>
            Praisejah
          </h1>
          <h1 className="surname" style={{ fontSize: "40px" }}>
            ─── Osumgba-Benson.✦
          </h1>
        </div>
        <div className="about-section">
          <div className="passage-container">
            <div className="passage">
              <div className="first-section">
                <span className="text-block first">
                  Hello, I'm Praisejah <br />
                  I build, break, and refine, because great software isn't just
                  written, <br />
                  it's crafted, and it's fun. Exploring new technologies is
                  second nature to me. <br />
                  Whether it's open-source contributions, software architecture,
                  or pushing <br />
                  the limits of what's possible I'll find it. And if there
                  isn't? I'll build one. <br />
                </span>
                <span className="text-block second">
                  Beyond tech, I love painting, even if my skills are still a
                  work in progress <br />
                  (yep, still trying!). <br />I also have a deep love for
                  animals, they bring joy, chaos, and <br />
                  inspiration to my world.
                </span>
              </div>
            </div>
          </div>

          <img
            src={diary}
            alt="Draggable"
            className="diary-image"
            style={{ width: "400px", height: "580px" }}
          />

          <div className="scrolling-text">
            <div className="scrolling-content">
              <p>
                ⋆. 𐙚 ̊ Exploring Tech | ❀˖° Painting | 🐨ྀི Animal Lover | ⟢
                Coding for Fun and Impact!
              </p>
              <p>
                .☘︎ ݁˖ Exploring Tech | ⋆⭒˚.⋆ Painting | ୨ৎ Animal Lover | 🍓ྀི
                Coding for Fun and Impact!
              </p>
              <p>
                ⊹₊⟡⋆ Exploring Tech | ⋆˚࿔ Painting | ˙ᵕ˙ Animal Lover | ₊˚⊹ᰔ
                Coding for Fun and Impact!
              </p>
              <p>
                ꩜ .ᐟ Exploring Tech | ˚୨୧⋆.˚ Painting | ⋆. 𐙚 ̊ Animal Lover | ༄.°
                Coding for Fun and Impact!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bow-container">
        <img src={bowImage} alt="Decorative bow" className="bow-image" />
      </div>

      <div className="resume-layout">
        <div className="resume-bg-letters">
          <span className="resume-bg-letter">P</span>
          <span className="resume-bg-letter">B</span>
        </div>
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

        <div className="middle-column">
          <div className="section-divider before-education"></div>
          <div className="section">
            <h2 className="heading">EDUCATION</h2>
            <div className="entry">
              <span className="date">2021 - 2024</span>
              <span className="details">Focus High School</span>
            </div>
            <div className="entry">
              <span className="date">2022 - 2023</span>
              <span className="details spacing">Astra Nova</span>
            </div>
          </div>

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

          <div className="section">
            <h2 className="heading">CERTIFICATE</h2>
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

        <div className="right-column">
          <div className="section-divider before-tools"></div>
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

      {/* Experience Timeline Section with Horizontal Scroll */}
      <div
        className="experience-section relative h-[100vh]"
        ref={experienceSectionRef}
      >
        <div className="section-header">
          <span className="section-label">experience</span>
          <div className="vertical-line"></div>
        </div>

        <div className="timeline-header">
          <h2 className="timeline-main-title">My Professional Evolution</h2>
        </div>

        <div
          className="horizontal-timeline-wrapper timeline w-max"
          ref={timelineRef}
        >
          <div className="timeline-container-top-numbers">
            <div className="timeline-item-top">
              <div className="timeline-marker-top">
                <div className="timeline-number">01</div>
                <div className="timeline-year">2025</div>
              </div>
              <div className="timeline-content-top">
                <h3 className="timeline-title">
                  Yale Entrepreneurial Society Fellowship
                </h3>
                <p className="timeline-description">
                  Led Yale 1st-place team developing Proact+, engineered
                  AI-driven app blocking to reclaim 30+ focused hours weekly
                </p>
              </div>
            </div>

            <div className="timeline-item-top">
              <div className="timeline-marker-top">
                <div className="timeline-number">02</div>
                <div className="timeline-year">2024 - Present</div>
              </div>
              <div className="timeline-content-top">
                <h3 className="timeline-title">The BulleTeen</h3>
                <p className="timeline-description">
                  Led web development & recruited a diverse team to enhance STEM
                  content accessibility globally.
                </p>
              </div>
            </div>

            <div className="timeline-item-top">
              <div className="timeline-marker-top">
                <div className="timeline-number">03</div>
                <div className="timeline-year">2024 - 2025</div>
              </div>
              <div className="timeline-content-top">
                <h3 className="timeline-title">Non-Trivial</h3>
                <p className="timeline-description">
                  Global research finalist engineered data-driven climate
                  solutions to combat environmental degradation.
                </p>
              </div>
            </div>

            <div className="timeline-item-top">
              <div className="timeline-marker-top">
                <div className="timeline-number">04</div>
                <div className="timeline-year">2023 - 2024</div>
              </div>
              <div className="timeline-content-top">
                <h3 className="timeline-title">
                  Pearl Impact Network Africa (NGO)
                </h3>
                <p className="timeline-description">
                  Revamped website with modern frameworks, driving 40% higher
                  engagement through sleek UX.
                </p>
              </div>
            </div>

            <div className="timeline-item-top">
              <div className="timeline-marker-top">
                <div className="timeline-number">05</div>
                <div className="timeline-year">2019 - 2020</div>
              </div>
              <div className="timeline-content-top">
                <h3 className="timeline-title"> Innovation Growth Hub </h3>
                <p className="timeline-description">
                  Mentored peers in Scratch, led app ideation for women's
                  rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
