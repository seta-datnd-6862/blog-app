// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import './Auth.css';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const { login, redirectPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || redirectPath || ROUTES.HOME;

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
    setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      await login(formData.email, formData.password);
      // Redirect to the page user was trying to access or home
      navigate(from, { replace: true });
    } catch (error) {
      setGeneralError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">
                Login to access your account
              </p>
            </div>

            {/* Demo Info */}
            <div className="demo-info">
              <strong>Demo Login:</strong>
              <ul>
                <li>Admin: Use email containing "admin" (e.g., admin@test.com)</li>
                <li>User: Use any other email (e.g., user@test.com)</li>
                <li>Password: Any password (min 6 characters)</li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {generalError && (
                <div className="alert alert-error">
                  {generalError}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-actions">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="#" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Footer */}
            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to={ROUTES.REGISTER} className="auth-link">
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Side Image */}
          <div className="auth-side">
            <div className="auth-side-content">
              <h2>Join Our Community</h2>
              <p>
                Share your stories, connect with readers, and be part of
                something amazing.
              </p>
              <div className="auth-features">
                <div className="auth-feature">
                  <span className="feature-icon">✍️</span>
                  <span>Write & Publish</span>
                </div>
                <div className="auth-feature">
                  <span className="feature-icon">👥</span>
                  <span>Connect with Community</span>
                </div>
                <div className="auth-feature">
                  <span className="feature-icon">📚</span>
                  <span>Read Amazing Content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
