import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cursor from "./custom/cursor";
import Intro from "./custom/Intro";
import Project from "./components/Project";
import About from "./components/About";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroEnd = () => {
    setShowIntro(false);
  };

  return (
    <Router>
      <div className="App">
        <Cursor />
        {showIntro ? (
          <Intro onIntroEnd={handleIntroEnd} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Project/>}/>
            <Route path="/about" element={<About />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
