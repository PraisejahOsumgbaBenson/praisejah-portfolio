"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import "./Intro.css";

function Intro({ onIntroEnd }) {
  useEffect(() => {
    // Split the text into individual characters
    const splitText = new SplitType(".intro-text", { types: "chars" });

    // Animation timeline
    const tl = gsap.timeline();

    // GSAP animation to animate characters
    tl.from(".intro-text .char", {
      opacity: 0,
      x: -100,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out",
    });

    tl.to(".intro-text .char", {
      opacity: 0,
      x: 100,
      stagger: 0.05,
      duration: 1,
      ease: "power3.in",
      delay: 1,
    });

    // Notify the parent component when the intro ends
    const timer = setTimeout(() => {
      onIntroEnd();
    }, 3200);

    return () => {
      clearTimeout(timer);
      splitText.revert();
    };
  }, [onIntroEnd]);

  return (
    <div className="intro-container">
      <h1 className="intro-text">PJ.</h1>
    </div>
  );
}

export default Intro;
