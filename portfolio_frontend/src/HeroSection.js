import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

/**
 * PUBLIC_INTERFACE
 * Hero landing section with animated intro and call-to-action.
 */
function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
      >
        Hi, I'm <span className="hero-accent">Your Name</span>
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.9, type: 'spring', stiffness: 38 }}
      >
        A creative <span className="highlight">developer</span> building stunning digital experiences.
      </motion.p>
      <motion.a
        href="#projects"
        className="hero-cta"
        whileHover={{ scale: 1.07, backgroundColor: "var(--accent, #e94560)" }}
        transition={{ type: 'spring', stiffness: 320 }}
      >
        View Projects
      </motion.a>
    </section>
  );
}

export default HeroSection;
