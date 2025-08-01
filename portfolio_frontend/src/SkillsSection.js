import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SkillsSection.css';

/**
 * PUBLIC_INTERFACE
 * Skills grid (grouped by category) and animated proficiency bars.
 */
function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/skills')
      .then((res) => res.json())
      .then(setSkills)
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  const grouped = {};
  skills.forEach(skill => {
    const cat = skill.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  });

  if (loading) return <div className="skills-loading">Loading skills...</div>;

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-groups">
        {Object.entries(grouped).map(([category, skills]) => (
          <div className="skills-group" key={category}>
            <div className="skills-category">{category}</div>
            <div className="skills-grid">
              {skills.map((s, i) => (
                <motion.div
                  className="skill-item"
                  key={s.name}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, type: 'spring', stiffness: 48 }}
                >
                  <span className="skill-name">{s.name}</span>
                  {s.proficiency !== undefined &&
                    <div className="skill-bar-bg">
                      <motion.div
                        className="skill-bar"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.proficiency}%` }}
                        transition={{ duration: 1 + i * 0.04, type: "spring", stiffness: 30 }}
                      />
                      <span className="skill-prof">{s.proficiency}%</span>
                    </div>
                  }
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
