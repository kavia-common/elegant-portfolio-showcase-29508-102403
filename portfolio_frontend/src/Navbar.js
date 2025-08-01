import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import clsx from 'clsx';
import './Navbar.css';

/**
 * PUBLIC_INTERFACE
 * Sticky animated navbar with navigation links, animated indicator, and theme toggle.
 * @param {string} theme - Active theme mode ('light' or 'dark')
 * @param {Function} onToggleTheme - Handler to toggle theme
 */
const NAV_ITEMS = [
  { label: 'Home', section: 'hero' },
  { label: 'Projects', section: 'projects' },
  { label: 'Skills', section: 'skills' },
  { label: 'About', section: 'about' },
  { label: 'Contact', section: 'contact' }
];

function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState('hero');

  // Scroll to section on click
  const handleNav = (section) => {
    setActive(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="brand-accent">/</span>Portfolio
        </div>
        <AnimateSharedLayout>
          <ul className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.section}
                className={clsx('navbar-link', { active: active === item.section })}
                onClick={() => handleNav(item.section)}
                tabIndex={0}
              >
                {item.label}
                {active === item.section && (
                  <motion.div className="navbar-indicator"
                    layoutId="navbar-indicator"
                    transition={{ type: 'spring', stiffness: 550, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </AnimateSharedLayout>
        <button className="navbar-theme-toggle" onClick={onToggleTheme} aria-label="Switch theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
