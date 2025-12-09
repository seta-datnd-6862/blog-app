// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { blogService } from '../../services/blogService';
import { ROUTES } from '../../constants/routes';
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    categories: 0,
    recentPosts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [posts, categories] = await Promise.all([
        blogService.getAllPosts(),
        blogService.getCategories()
      ]);

      setStats({
        totalPosts: posts.length,
        categories: categories.length,
        recentPosts: posts.slice(0, 5)
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, {user?.name}! 👋
            </p>
          </div>
          <Link to={ROUTES.ADMIN_POST_NEW} className="btn btn-primary">
            ➕ Create New Post
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#3b82f6' }}>
              📝
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalPosts}</div>
              <div className="stat-label">Total Posts</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#10b981' }}>
              📁
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.categories}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f59e0b' }}>
              👁️
            </div>
            <div className="stat-content">
              <div className="stat-value">1.2K</div>
              <div className="stat-label">Total Views</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#8b5cf6' }}>
              💬
            </div>
            <div className="stat-content">
              <div className="stat-value">324</div>
              <div className="stat-label">Comments</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to={ROUTES.ADMIN_POST_NEW} className="action-card">
              <div className="action-icon">✍️</div>
              <div className="action-title">Create Post</div>
              <div className="action-description">
                Write and publish a new blog post
              </div>
            </Link>

            <Link to={ROUTES.ADMIN_POSTS} className="action-card">
              <div className="action-icon">📋</div>
              <div className="action-title">Manage Posts</div>
              <div className="action-description">
                View, edit, or delete existing posts
              </div>
            </Link>

            <Link to={ROUTES.ADMIN_SETTINGS} className="action-card">
              <div className="action-icon">⚙️</div>
              <div className="action-title">Settings</div>
              <div className="action-description">
                Configure your blog preferences
              </div>
            </Link>

            <Link to={ROUTES.BLOG} className="action-card">
              <div className="action-icon">🌐</div>
              <div className="action-title">View Blog</div>
              <div className="action-description">
                See your blog as visitors see it
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Posts</h2>
            <Link to={ROUTES.ADMIN_POSTS} className="btn btn-outline btn-sm">
              View All
            </Link>
          </div>

          <div className="recent-posts-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link to={`/blog/${post.slug}`} className="post-title-link">
                        {post.title}
                      </Link>
                    </td>
                    <td>
                      <span className="category-badge">{post.category}</span>
                    </td>
                    <td>{post.author}</td>
                    <td>{new Date(post.publishedAt).toLocaleDateString()}</td>
                    <td>
                      <div className="table-actions">
                        <Link
                          to={`/admin/posts/${post.id}/edit`}
                          className="btn-icon"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="btn-icon"
                          title="View"
                        >
                          👁️
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
