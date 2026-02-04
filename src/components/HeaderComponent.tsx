import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderComponentProps {
  title?: string;
  subtitle?: string;
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/students', label: 'Students' },
];

export default function HeaderComponent({
  title = 'Student Information Application',
  subtitle,
}: HeaderComponentProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`header-component ${scrolled ? 'header-scrolled' : ''}`}
      role="banner"
    >
      <div className="header-inner">
        <Link to="/" className="header-brand" aria-label="Home">
          {title}
        </Link>

        <nav className="header-nav" aria-label="Main">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? 'nav-link-active' : ''}`}
            >
              <span className="nav-link-text">{label}</span>
              <span className="nav-link-underline" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="header-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="header-toggle-box">
            <span className={`header-toggle-line header-toggle-line-1 ${mobileOpen ? 'header-toggle-line-open' : ''}`} />
            <span className={`header-toggle-line header-toggle-line-2 ${mobileOpen ? 'header-toggle-line-open' : ''}`} />
            <span className={`header-toggle-line header-toggle-line-3 ${mobileOpen ? 'header-toggle-line-open' : ''}`} />
          </span>
        </button>
      </div>

      {subtitle && (
        <p className="header-subtitle">{subtitle}</p>
      )}

      <div
        id="mobile-menu"
        className={`header-mobile-panel ${mobileOpen ? 'header-mobile-panel-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="header-mobile-nav" aria-label="Mobile">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-nav-link ${location.pathname === to ? 'nav-link-active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
