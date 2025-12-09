// src/pages/admin/AdminSettings.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './AdminSettings.css';

export const AdminSettings = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-settings-page">
      <div className="container">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your blog and account settings
          </p>
        </div>

        <div className="settings-content">
          {/* Profile Settings */}
          <div className="settings-section">
            <h2 className="section-heading">Profile Information</h2>
            <form onSubmit={handleSave} className="settings-form">
              {saved && (
                <div className="success-alert">
                  ✓ Settings saved successfully!
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  defaultValue={user?.name}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  defaultValue={user?.email}
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="form-textarea"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>

          {/* Blog Settings */}
          <div className="settings-section">
            <h2 className="section-heading">Blog Settings</h2>
            <form onSubmit={handleSave} className="settings-form">
              <div className="form-group">
                <label htmlFor="blogTitle" className="form-label">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="blogTitle"
                  className="form-input"
                  defaultValue="MyBlog"
                  placeholder="Your blog title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="blogDescription" className="form-label">
                  Blog Description
                </label>
                <textarea
                  id="blogDescription"
                  className="form-textarea"
                  rows="3"
                  defaultValue="A modern blog platform"
                  placeholder="Describe your blog..."
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Allow comments on posts</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Show reading time</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Save Settings
              </button>
            </form>
          </div>

          {/* Appearance */}
          <div className="settings-section">
            <h2 className="section-heading">Appearance</h2>
            <div className="settings-info">
              <p>
                Customize the look and feel of your blog.
              </p>
              
              <div className="appearance-options">
                <div className="appearance-option">
                  <div className="option-preview light-preview">
                    <div className="preview-content">
                      <div className="preview-line"></div>
                      <div className="preview-line short"></div>
                    </div>
                  </div>
                  <div className="option-label">Light Mode</div>
                  <input type="radio" name="theme" defaultChecked />
                </div>

                <div className="appearance-option">
                  <div className="option-preview dark-preview">
                    <div className="preview-content">
                      <div className="preview-line"></div>
                      <div className="preview-line short"></div>
                    </div>
                  </div>
                  <div className="option-label">Dark Mode</div>
                  <input type="radio" name="theme" disabled />
                </div>
              </div>
              
              <p className="feature-note">
                🚧 Dark mode coming soon!
              </p>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-section danger-section">
            <h2 className="section-heading">Danger Zone</h2>
            <div className="danger-content">
              <div className="danger-item">
                <div>
                  <h4>Delete All Posts</h4>
                  <p>Permanently delete all your blog posts. This action cannot be undone.</p>
                </div>
                <button className="btn btn-danger">Delete Posts</button>
              </div>
              
              <div className="danger-item">
                <div>
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all associated data.</p>
                </div>
                <button className="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
