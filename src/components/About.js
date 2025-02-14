import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Style.css";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%", // Animation starts when the section is 80% visible
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="about-container" ref={aboutRef}>
      <div className="about-image">
        <img src="your-image.jpg" alt="About Me" />
      </div>
      <div className="about-text">
        <h2>About Me</h2>
        <p>
          I'm a passionate developer who loves creating interactive web
          experiences. I specialize in frontend development, React, and modern
          web technologies.
        </p>
       
      </div>
    </section>
  );
}

export default About;
