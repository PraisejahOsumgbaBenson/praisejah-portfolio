"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "../components/ErrorBoundary";

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

const HomeFeatureFallback = () => (
  <section style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
    <div style={{ textAlign: "center", color: "#f1f2eb", padding: "2rem" }}>
      <h2 style={{ marginBottom: "0.75rem" }}>Home Experience Paused</h2>
      <p>
        Animations were disabled for stability. Refresh to try the interactive
        view again.
      </p>
    </div>
  </section>
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
    <ErrorBoundary
      fallback={<HomeFeatureFallback />}
      title="Home route error"
      message="The home route failed to render. You can retry or continue browsing."
    >
      <div className="App">
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary fallback={<HomeFeatureFallback />}>
            {showIntro ? (
              <Intro onIntroEnd={handleIntroEnd} />
            ) : (
              <HomeContent />
            )}
          </ErrorBoundary>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
