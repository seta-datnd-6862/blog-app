// src/pages/admin/CreatePost.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import './PostForm.css';

export const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'react',
    image: '',
    tags: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 20) {
      newErrors.excerpt = 'Excerpt must be at least 20 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
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

    try {
      const postData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        image: formData.image.trim(),
        author: user?.name || 'Anonymous',
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
      };

      await blogService.createPost(postData);
      navigate(ROUTES.ADMIN_POSTS);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-page">
      <div className="container">
        <div className="form-header">
          <h1 className="form-title">Create New Post</h1>
          <p className="form-subtitle">
            Share your thoughts and ideas with the world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-grid">
            {/* Title */}
            <div className="form-group full-width">
              <label htmlFor="title" className="form-label">
                Post Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter an engaging title..."
                disabled={loading}
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className={`form-input ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="react">React</option>
                <option value="javascript">JavaScript</option>
                <option value="css">CSS</option>
                <option value="web-development">Web Development</option>
                <option value="tutorial">Tutorial</option>
              </select>
              {errors.category && (
                <span className="error-message">{errors.category}</span>
              )}
            </div>

            {/* Image URL */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Featured Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                className={`form-input ${errors.image ? 'error' : ''}`}
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />
              {errors.image && (
                <span className="error-message">{errors.image}</span>
              )}
            </div>

            {/* Excerpt */}
            <div className="form-group full-width">
              <label htmlFor="excerpt" className="form-label">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                className={`form-textarea ${errors.excerpt ? 'error' : ''}`}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief description of your post..."
                rows="3"
                disabled={loading}
              />
              {errors.excerpt && (
                <span className="error-message">{errors.excerpt}</span>
              )}
            </div>

            {/* Content */}
            <div className="form-group full-width">
              <label htmlFor="content" className="form-label">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                className={`form-textarea ${errors.content ? 'error' : ''}`}
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                rows="12"
                disabled={loading}
              />
              {errors.content && (
                <span className="error-message">{errors.content}</span>
              )}
              <div className="field-hint">
                Characters: {formData.content.length}
              </div>
            </div>

            {/* Tags */}
            <div className="form-group full-width">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="form-input"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, hooks, tutorial (comma separated)"
                disabled={loading}
              />
              <div className="field-hint">
                Separate tags with commas
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions-bar">
            <button
              type="button"
              onClick={() => navigate(ROUTES.ADMIN_POSTS)}
              className="btn btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};