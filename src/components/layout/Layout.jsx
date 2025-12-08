// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumbs } from '../common/Breadcrumbs';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Breadcrumbs />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
