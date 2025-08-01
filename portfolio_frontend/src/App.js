import React, { useState, useEffect } from "react";
import "./App.css";
import "./Navbar.css";
import "./HeroSection.css";
import "./ProjectsSection.css";
import "./SkillsSection.css";
import "./AboutSection.css";
import "./ContactSection.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

// PUBLIC_INTERFACE
function App() {
  // Set dark mode as default as per spec
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Set accent color variable in root for consistent theming
    document.documentElement.style.setProperty("--accent", "#e94560");
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
      </main>
      <ContactSection />
    </div>
  );
}

export default App;
