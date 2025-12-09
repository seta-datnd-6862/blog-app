// src/pages/NotFound.jsx
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="container">
        <div className="notfound-content">
          <div className="notfound-illustration">
            <span className="error-code">404</span>
            <div className="error-icon">🔍</div>
          </div>
          
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-description">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved or deleted.
          </p>

          <div className="notfound-actions">
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-outline btn-lg"
            >
              ← Go Back
            </button>
            <Link to={ROUTES.HOME} className="btn btn-primary btn-lg">
              Go Home
            </Link>
          </div>

          <div className="helpful-links">
            <h3>You might be looking for:</h3>
            <div className="links-grid">
              <Link to={ROUTES.HOME} className="helpful-link">
                <span className="link-icon">🏠</span>
                <span>Home</span>
              </Link>
              <Link to={ROUTES.BLOG} className="helpful-link">
                <span className="link-icon">📝</span>
                <span>Blog</span>
              </Link>
              <Link to={ROUTES.ABOUT} className="helpful-link">
                <span className="link-icon">ℹ️</span>
                <span>About</span>
              </Link>
              <Link to={ROUTES.CONTACT} className="helpful-link">
                <span className="link-icon">✉️</span>
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
