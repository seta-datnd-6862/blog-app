// src/pages/public/Contact.jsx
import { useState } from 'react';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-content">
          {/* Header */}
          <div className="contact-header">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              {submitted && (
                <div className="success-message">
                  ✓ Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <span className="error-message">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows="6"
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">📧</div>
                    <div>
                      <div className="info-label">Email</div>
                      <div className="info-value">contact@myblog.com</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">🌐</div>
                    <div>
                      <div className="info-label">Website</div>
                      <div className="info-value">www.myblog.com</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">⏰</div>
                    <div>
                      <div className="info-label">Response Time</div>
                      <div className="info-value">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>🐦</span> Twitter
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>💻</span> GitHub
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>💼</span> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
