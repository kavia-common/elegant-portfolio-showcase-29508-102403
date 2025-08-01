import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

/**
 * PUBLIC_INTERFACE
 * Animated About/profile section, loaded from backend.
 */
function AboutSection() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/about')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setAbout)
      .catch(() => setAbout(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="about-loading">Loading profile...</div>
  }
  if (!about) {
    return <div className="about-error">Could not load profile info.</div>
  }

  return (
    <section id="about" className="about-section">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 54 }}
      >
        {about.profileImageUrl &&
          <img className="about-avatar" src={about.profileImageUrl} alt={about.name} />}
        <div>
          <div className="about-name">{about.name}</div>
          <div className="about-title">{about.title}</div>
          <div className="about-description">{about.description}</div>
          <div className="about-links">
            {about.links?.map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
