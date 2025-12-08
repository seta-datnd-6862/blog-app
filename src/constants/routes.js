export const ROUTES = {
  // Public routes
  HOME: '/',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_POST_NEW: '/admin/posts/new',
  ADMIN_POST_EDIT: '/admin/posts/:id/edit',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Error routes
  NOT_FOUND: '*'
};

export const NAVIGATION_ITEMS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Blog', path: ROUTES.BLOG },
  { name: 'About', path: ROUTES.ABOUT },
  { name: 'Contact', path: ROUTES.CONTACT },
];

export const ADMIN_NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
  { name: 'Posts', path: ROUTES.ADMIN_POSTS },
  { name: 'Settings', path: ROUTES.ADMIN_SETTINGS },
];
