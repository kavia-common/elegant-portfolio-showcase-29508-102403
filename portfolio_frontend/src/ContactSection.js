import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

/**
 * PUBLIC_INTERFACE
 * Contact form with validation, animation, and API integration. Always at footer.
 */
const initialState = { name: '', email: '', message: '' };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name required";
  if (!email ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  )
    errors.email = "Valid email required";
  if (!message.trim()) errors.message = "Message required";
  return errors;
}

function ContactSection() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length) return;
    setPending(true);
    setSuccess(false);
    try {
      const resp = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!resp.ok) {
        const obj = await resp.json();
        setErrors(obj.errors || {});
        setSuccess(false);
      } else {
        setValues(initialState);
        setErrors({});
        setSuccess(true);
      }
    } catch {
      setSuccess(false);
    }
    setPending(false);
  };

  return (
    <footer id="contact" className="contact-section">
      <motion.form
        className="contact-form"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring", stiffness: 40 }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-header">Contact</div>
        <div className="form-group">
          <input
            autoComplete="off"
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            disabled={pending}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <input
            autoComplete="off"
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            disabled={pending}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <textarea
            autoComplete="off"
            name="message"
            className="form-control"
            placeholder="Say hello..."
            value={values.message}
            onChange={handleChange}
            disabled={pending}
          />
          {errors.message && <div className="form-error">{errors.message}</div>}
        </div>
        <motion.button
          type="submit"
          className="submit-btn"
          disabled={pending}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          {pending ? 'Sending...' : 'Send'}
        </motion.button>
        {success && <div className="form-success">Message sent!</div>}
      </motion.form>
      <div className="footer-credit">© {new Date().getFullYear()} Your Name</div>
    </footer>
  );
}

export default ContactSection;
