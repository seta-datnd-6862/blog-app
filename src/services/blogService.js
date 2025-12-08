const mockPosts = [
  {
    id: 1,
    slug: 'getting-started-with-react',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and start building modern web applications.',
    content: 'React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we will explore the fundamentals of React and how to get started with your first application...',
    category: 'react',
    author: 'John Doe',
    publishedAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    tags: ['react', 'javascript', 'frontend']
  },
  {
    id: 2,
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks',
    excerpt: 'Deep dive into React Hooks and learn how to use them effectively.',
    content: 'React Hooks revolutionized the way we write React components. This article explores useState, useEffect, useContext, and other essential hooks...',
    category: 'react',
    author: 'Jane Smith',
    publishedAt: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    tags: ['react', 'hooks', 'advanced']
  },
  {
    id: 3,
    slug: 'react-router-guide',
    title: 'Complete React Router Guide',
    excerpt: 'Everything you need to know about routing in React applications.',
    content: 'React Router is the standard routing library for React. Learn how to implement navigation, nested routes, and protected routes...',
    category: 'react',
    author: 'Mike Johnson',
    publishedAt: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    tags: ['react', 'routing', 'spa']
  },
  {
    id: 4,
    slug: 'state-management-in-react',
    title: 'State Management in React',
    excerpt: 'Compare different state management solutions for React applications.',
    content: 'Managing state in React applications can be challenging. This article compares Context API, Redux, Zustand, and other popular solutions...',
    category: 'react',
    author: 'Sarah Williams',
    publishedAt: '2024-03-25',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    tags: ['react', 'state-management', 'redux']
  },
  {
    id: 5,
    slug: 'building-responsive-layouts',
    title: 'Building Responsive Layouts',
    excerpt: 'Create beautiful and responsive layouts with modern CSS.',
    content: 'Responsive design is crucial for modern web applications. Learn CSS Grid, Flexbox, and media queries to build layouts that work on all devices...',
    category: 'css',
    author: 'Tom Brown',
    publishedAt: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    tags: ['css', 'responsive', 'design']
  },
  {
    id: 6,
    slug: 'javascript-es6-features',
    title: 'Modern JavaScript ES6+ Features',
    excerpt: 'Explore the latest JavaScript features and how to use them.',
    content: 'ES6 and beyond introduced many powerful features to JavaScript. Learn about arrow functions, destructuring, async/await, and more...',
    category: 'javascript',
    author: 'Emma Davis',
    publishedAt: '2024-04-18',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    tags: ['javascript', 'es6', 'modern-js']
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Blog Service
export const blogService = {
  // Get all posts with optional filtering
  getAllPosts: async (category = null, search = null) => {
    await delay(500);
    
    let filteredPosts = [...mockPosts];
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return filteredPosts.sort((a, b) => 
      new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  },

  // Get single post by slug
  getPostBySlug: async (slug) => {
    await delay(500);
    const post = mockPosts.find(post => post.slug === slug);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  },

  // Get single post by ID
  getPostById: async (id) => {
    await delay(500);
    const post = mockPosts.find(post => post.id === parseInt(id));
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  },

  // Create new post
  createPost: async (postData) => {
    await delay(500);
    const newPost = {
      id: mockPosts.length + 1,
      slug: postData.title.toLowerCase().replace(/\s+/g, '-'),
      publishedAt: new Date().toISOString().split('T')[0],
      ...postData
    };
    mockPosts.push(newPost);
    return newPost;
  },

  // Update post
  updatePost: async (id, postData) => {
    await delay(500);
    const index = mockPosts.findIndex(post => post.id === parseInt(id));
    if (index === -1) {
      throw new Error('Post not found');
    }
    mockPosts[index] = {
      ...mockPosts[index],
      ...postData,
      slug: postData.title ? postData.title.toLowerCase().replace(/\s+/g, '-') : mockPosts[index].slug
    };
    return mockPosts[index];
  },

  // Delete post
  deletePost: async (id) => {
    await delay(500);
    const index = mockPosts.findIndex(post => post.id === parseInt(id));
    if (index === -1) {
      throw new Error('Post not found');
    }
    mockPosts.splice(index, 1);
    return { success: true };
  },

  // Get categories
  getCategories: async () => {
    await delay(300);
    const categories = [...new Set(mockPosts.map(post => post.category))];
    return categories;
  }
};
