// src/pages/public/Home.jsx
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import './Home.css';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to MyBlog
            </h1>
            <p className="hero-subtitle">
              Discover amazing stories, share your thoughts, and connect with a community of writers and readers.
            </p>
            <div className="hero-actions">
              <Link to={ROUTES.BLOG} className="btn btn-primary btn-lg">
                Explore Blog
              </Link>
              {!isAuthenticated() && (
                <Link to={ROUTES.REGISTER} className="btn btn-outline btn-lg">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose MyBlog?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Easy Writing</h3>
              <p className="feature-description">
                Simple and intuitive interface for creating and publishing your content.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Fast Performance</h3>
              <p className="feature-description">
                Built with modern React technologies for blazing-fast user experience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure</h3>
              <p className="feature-description">
                Your data is protected with industry-standard security practices.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Responsive</h3>
              <p className="feature-description">
                Perfect experience across all devices - desktop, tablet, and mobile.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Beautiful Design</h3>
              <p className="feature-description">
                Clean and modern interface that focuses on your content.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Real-time Updates</h3>
              <p className="feature-description">
                See changes instantly with our optimized routing system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Join our community of writers and readers today.
            </p>
            {isAuthenticated() ? (
              <Link to={ROUTES.BLOG} className="btn btn-primary btn-lg">
                View All Posts
              </Link>
            ) : (
              <Link to={ROUTES.REGISTER} className="btn btn-primary btn-lg">
                Sign Up Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
