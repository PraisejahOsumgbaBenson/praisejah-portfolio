import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cursor from "./custom/cursor";

/**
 * Lazy load all major components to improve initial load performance.
 * This splits your code into separate chunks that load on demand.
 * The webpackChunkName magic comments help with naming the chunks for better debugging.
 */
const Intro = lazy(() =>
  import(/* webpackChunkName: "intro" */ "./custom/Intro")
);
const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ "./components/Home")
);
const Project = lazy(() =>
  import(/* webpackChunkName: "project" */ "./components/Project")
);
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ "./components/About")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: "contact" */ "./components/Contact")
);

/**
 * Loading component that shows while lazy-loaded components are being fetched
 * Consider making this more visually appealing to match your site's design
 */
const LoadingFallback = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <p>Loading experience...</p>
  </div>
);

function App() {
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
    <Router>
      <div className="App">
        {/* Custom cursor component - rendered immediately since it's small */}
        <Cursor />

        {/* 
          Suspense boundary for lazy-loaded components.
          Shows fallback while components are loading.
          Wrapping the entire content ensures smooth transitions.
        */}
        <Suspense fallback={<LoadingFallback />}>
          {showIntro ? (
            // Show intro animation if state is true
            <Intro onIntroEnd={handleIntroEnd} />
          ) : (
            // Main content routes after intro completes
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          )}
        </Suspense>
      </div>
    </Router>
  );
}

export default App;