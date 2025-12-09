// src/pages/public/BlogList.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate, truncateText, getReadingTime } from '../../utils/helpers';
import './BlogList.css';

export const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, [categoryParam, searchParam]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllPosts(categoryParam, searchParam);
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await blogService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategoryFilter = (category) => {
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');
    
    if (search) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  if (loading) {
    return <LoadingSpinner message="Loading blog posts..." />;
  }

  return (
    <div className="blog-list-page">
      <div className="container">
        {/* Header */}
        <div className="blog-header">
          <h1 className="page-title">Blog Posts</h1>
          <p className="page-subtitle">
            Explore our collection of articles and tutorials
          </p>
        </div>

        {/* Search & Filter */}
        <div className="blog-controls">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              name="search"
              placeholder="Search posts..."
              className="form-input"
              defaultValue={searchParam || ''}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <div className="category-filters">
            <button
              className={`filter-btn ${!categoryParam ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${categoryParam === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {(categoryParam || searchParam) && (
            <button onClick={clearFilters} className="btn btn-outline btn-sm">
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            {categoryParam && ` in "${categoryParam}"`}
            {searchParam && ` for "${searchParam}"`}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <Link to={`/blog/${post.slug}`} className="post-image-link">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                </Link>
                
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-reading-time">
                      {getReadingTime(post.content)}
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="post-title-link">
                    <h2 className="post-title">{post.title}</h2>
                  </Link>

                  <p className="post-excerpt">
                    {truncateText(post.excerpt, 120)}
                  </p>

                  <div className="post-footer">
                    <div className="post-author">
                      <span>By {post.author}</span>
                    </div>
                    <div className="post-date">
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
