"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AuraBackground.css";

const AuraBackground = () => {
  const auraRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    // Create the initial animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 });

    // Main aura pulse animation
    tl.to(gradientRef.current, {
      attr: {
        cx: "40%",
        cy: "40%",
        r: "85%",
      },
      duration: 8,
      ease: "sine.inOut",
    }).to(
      gradientRef.current,
      {
        attr: {
          cx: "30%",
          cy: "30%",
          r: "75%",
        },
        duration: 6,
        ease: "sine.inOut",
      },
      "-=2"
    );

    // Subtle movement animation
    const moveAura = () => {
      gsap.to(auraRef.current, {
        x: () => Math.random() * 20 - 10,
        y: () => Math.random() * 20 - 10,
        duration: 15,
        ease: "sine.inOut",
        onComplete: moveAura,
      });
    };

    moveAura();

    // Cleanup
    return () => {
      tl.kill();
      gsap.killTweensOf(auraRef.current);
    };
  }, []);

  return (
    <div className="aura-background">
      <svg className="aura-svg" ref={auraRef}>
        <defs>
          {/* Primary aura gradient */}
          <radialGradient
            id="auraGradient"
            ref={gradientRef}
            cx="30%"
            cy="30%"
            r="75%"
          >
            <stop offset="0%" stopColor="#6B8E6A" stopOpacity="0.4">
              <animate
                attributeName="stop-opacity"
                values="0.4;0.6;0.4"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#4A5740" stopOpacity="0.2">
              <animate
                attributeName="stop-opacity"
                values="0.2;0.3;0.2"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#566246" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.1;0"
                dur="12s"
                repeatCount="indefinite"
              />
            </stop>
          </radialGradient>

          {/* Secondary subtle gradient */}
          <radialGradient id="auraSecondary" cx="20%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#819582" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#566246" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#566246" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main aura glow */}
        <rect width="100%" height="100%" fill="url(#auraGradient)" />

        {/* Secondary glow layer */}
        <rect
          width="100%"
          height="100%"
          fill="url(#auraSecondary)"
          opacity="0.5"
        />
      </svg>

      {/* Additional floating elements for depth */}
      <div className="aura-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="aura-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AuraBackground;
