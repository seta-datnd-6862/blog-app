// src/pages/public/BlogPost.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate, getReadingTime } from '../../utils/helpers';
import { ROUTES } from '../../constants/routes';
import './BlogPost.css';

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getPostBySlug(slug);
      setPost(data);
    } catch (error) {
      console.error('Error loading post:', error);
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading post..." />;
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="error-container">
          <h1>😞 Post Not Found</h1>
          <p>The post you're looking for doesn't exist.</p>
          <Link to={ROUTES.BLOG} className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <article className="post-article">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
          </button>

          {/* Header */}
          <header className="post-header">
            <div className="post-meta-info">
              <span className="post-category-badge">{post.category}</span>
              <span className="post-reading-time">
                {getReadingTime(post.content)}
              </span>
            </div>

            <h1 className="post-main-title">{post.title}</h1>

            <div className="post-author-info">
              <div className="author-details">
                <span className="author-avatar">👤</span>
                <div>
                  <div className="author-name">{post.author}</div>
                  <div className="post-publish-date">
                    {formatDate(post.publishedAt)}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="post-featured-image">
            <img src={post.image} alt={post.title} />
          </div>

          {/* Content */}
          <div className="post-body">
            <div className="post-excerpt-section">
              <p className="post-excerpt-text">{post.excerpt}</p>
            </div>

            <div className="post-content-text">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              <h3>Tags:</h3>
              <div className="tags-list">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`${ROUTES.BLOG}?search=${tag}`}
                    className="tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="post-footer-section">
            <Link to={ROUTES.BLOG} className="btn btn-outline">
              View All Posts
            </Link>
            <Link
              to={`${ROUTES.BLOG}?category=${post.category}`}
              className="btn btn-primary"
            >
              More in {post.category}
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
};
