import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAVIGATION_ITEMS, ROUTES } from '../../constants/routes';
import './Header.css';
import { useState } from 'react';

export const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">📝</span>
            <span className="logo-text">MyBlog</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation */}
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'nav-link nav-link-active' : 'nav-link'
                    }
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            <div className="auth-section">
              {isAuthenticated() ? (
                <>
                  <span className="user-name">
                    👤 {user.name}
                  </span>
                  {isAdmin() && (
                    <Link 
                      to={ROUTES.ADMIN} 
                      className="btn btn-secondary btn-sm"
                      onClick={closeMobileMenu}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to={ROUTES.LOGIN} 
                    className="btn btn-outline btn-sm"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to={ROUTES.REGISTER} 
                    className="btn btn-primary btn-sm"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
