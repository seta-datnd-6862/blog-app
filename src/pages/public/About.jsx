// src/pages/public/About.jsx
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import './About.css';

export const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          {/* Header */}
          <header className="about-header">
            <h1 className="about-title">About MyBlog</h1>
            <p className="about-subtitle">
              Empowering writers and readers to share knowledge and stories
            </p>
          </header>

          {/* Mission Section */}
          <section className="about-section">
            <h2 className="section-heading">Our Mission</h2>
            <p>
              MyBlog is a modern blogging platform built with React and React Router,
              designed to provide a seamless reading and writing experience. Our mission
              is to create a space where writers can share their thoughts, knowledge, and
              stories with a global audience.
            </p>
            <p>
              We believe in the power of words to inspire, educate, and connect people
              from all walks of life. Whether you're a seasoned writer or just starting
              your journey, MyBlog provides the tools and platform you need to share
              your voice.
            </p>
          </section>

          {/* Features Section */}
          <section className="about-section">
            <h2 className="section-heading">What We Offer</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✍️</div>
                <div className="feature-content">
                  <h3>Easy Publishing</h3>
                  <p>
                    Create and publish your posts with our intuitive admin interface.
                    No technical knowledge required.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <div className="feature-content">
                  <h3>Smart Search</h3>
                  <p>
                    Find content quickly with our powerful search and filtering
                    capabilities across categories and tags.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <div className="feature-content">
                  <h3>Mobile Friendly</h3>
                  <p>
                    Enjoy a perfect reading experience on any device - desktop,
                    tablet, or mobile.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h3>Lightning Fast</h3>
                  <p>
                    Built with modern React technologies for blazing-fast
                    performance and smooth navigation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="about-section">
            <h2 className="section-heading">Built With Modern Technology</h2>
            <p>
              This platform is built using cutting-edge web technologies to ensure
              the best possible experience:
            </p>
            <ul className="tech-list">
              <li><strong>React 18:</strong> Modern UI library for building interactive interfaces</li>
              <li><strong>React Router v6:</strong> Client-side routing with advanced features</li>
              <li><strong>Vite:</strong> Next-generation frontend tooling for fast development</li>
              <li><strong>Context API:</strong> Efficient state management for authentication</li>
              <li><strong>Modern CSS:</strong> Responsive design with CSS custom properties</li>
            </ul>
          </section>

          {/* CTA Section */}
          <section className="about-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              Join our community of writers and readers today. Share your stories,
              learn from others, and be part of something amazing.
            </p>
            <div className="cta-buttons">
              <Link to={ROUTES.BLOG} className="btn btn-primary btn-lg">
                Explore Blog
              </Link>
              <Link to={ROUTES.CONTACT} className="btn btn-outline btn-lg">
                Get in Touch
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
