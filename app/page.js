"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load components for better performance
const Intro = dynamic(() => import("../components/Intro"), {
  loading: () => <LoadingFallback />,
  ssr: false,
});

const HomeContent = dynamic(() => import("../components/HomeContent"), {
  loading: () => <LoadingFallback />,
  ssr: false,
});

/**
 * Loading component that shows while lazy-loaded components are being fetched
 */
const LoadingFallback = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <p>Loading experience...</p>
  </div>
);

export default function Home() {
  // State to control whether to show the intro animation
  const [showIntro, setShowIntro] = useState(true);

  /**
   * Callback when intro animation completes
   * This hides the intro and shows the main content
   */
  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  return (
    <div className="App">
      <Suspense fallback={<LoadingFallback />}>
        {showIntro ? <Intro onIntroEnd={handleIntroEnd} /> : <HomeContent />}
      </Suspense>
    </div>
  );
}
