import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ProjectsSection.css';

/**
 * PUBLIC_INTERFACE
 * Animated Projects grid; fetched from backend.
 */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/projects')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.div
            className="project-card"
            key={p.id}
            initial={{ opacity: 0, y: 46 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.43 + i * 0.09, type: 'spring', stiffness: 44 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(233,69,96,0.13)' }}
          >
            <img src={p.imageUrl} alt={p.title} className="project-image" />
            <h3 className="project-title">{p.title}</h3>
            <p className="project-description">{p.description}</p>
            <div className="project-tech-list">
              {p.technologies && p.technologies.map((t) => (
                <span className="project-tech" key={t}>{t}</span>
              ))}
            </div>
            <a
              href={p.projectUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
