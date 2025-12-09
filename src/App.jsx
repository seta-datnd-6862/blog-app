// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ROUTES } from './constants/routes';

// Public Pages
import { Home } from './pages/public/Home';
import { BlogList } from './pages/public/BlogList';
import { BlogPost } from './pages/public/BlogPost';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';
import { AdminPosts } from './pages/admin/AdminPosts';
import { CreatePost } from './pages/admin/CreatePost';
import { EditPost } from './pages/admin/EditPost';
import { AdminSettings } from './pages/admin/AdminSettings';

// 404 Page
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.BLOG} element={<BlogList />} />
        <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        
        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Protected Admin Routes */}
        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRoute requireAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_POSTS}
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_POST_NEW}
          element={
            <ProtectedRoute requireAdmin={true}>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_POST_EDIT}
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_SETTINGS}
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
