// src/pages/admin/AdminPosts.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { ROUTES } from '../../constants/routes';
import { formatDate } from '../../utils/helpers';
import './AdminPosts.css';

export const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await blogService.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
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
    <div className="admin-posts-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Posts</h1>
            <p className="page-subtitle">
              View, edit, and delete your blog posts
            </p>
          </div>
          <Link to={ROUTES.ADMIN_POST_NEW} className="btn btn-primary">
            ➕ Create New Post
          </Link>
        </div>

        {/* Posts Count */}
        <div className="posts-info">
          <p>{posts.length} {posts.length === 1 ? 'post' : 'posts'} found</p>
        </div>

        {/* Posts Table */}
        {posts.length === 0 ? (
          <div className="no-posts-message">
            <h3>📝 No posts yet</h3>
            <p>Create your first blog post to get started!</p>
            <Link to={ROUTES.ADMIN_POST_NEW} className="btn btn-primary mt-3">
              Create Post
            </Link>
          </div>
        ) : (
          <div className="posts-table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="post-title-cell">
                        <Link to={`/blog/${post.slug}`} className="post-link">
                          {post.title}
                        </Link>
                        <div className="post-excerpt-preview">
                          {post.excerpt.substring(0, 60)}...
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{post.category}</span>
                    </td>
                    <td>{post.author}</td>
                    <td>{formatDate(post.publishedAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="btn-action btn-view"
                          title="View"
                        >
                          👁️
                        </Link>
                        <Link
                          to={`/admin/posts/${post.id}/edit`}
                          className="btn-action btn-edit"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="btn-action btn-delete"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this post? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
