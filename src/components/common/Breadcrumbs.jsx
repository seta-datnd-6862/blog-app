import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

export const Breadcrumbs = () => {
  const location = useLocation();
  
  // Split pathname into segments
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;
  
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // Format the breadcrumb name
          const formattedName = name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          return (
            <li key={routeTo} className="breadcrumb-item">
              <span className="breadcrumb-separator">/</span>
              {isLast ? (
                <span className="breadcrumb-current">{formattedName}</span>
              ) : (
                <Link to={routeTo}>{formattedName}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
