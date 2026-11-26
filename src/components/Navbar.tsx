import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Terminal, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCommand: () => void;
}

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/about', label: 'About' },
  { to: '/publications', label: 'Publications' },
];

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar scrolled">
      <div className="nav-container">
        <Link to="/" className="brand-logo" onClick={() => setMenuOpen(false)}>
          <svg
            className="brand-mark"
            viewBox="0 0 36 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 25L9.5 4L16.5 18L23.5 4L30 25"
              stroke="url(#mGradNav)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="33.5" cy="23.5" r="2.5" fill="#ec4899" />
            <defs>
              <linearGradient id="mGradNav" x1="3" y1="4" x2="30" y2="25" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="1" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
          </svg>
          <span className="brand-name">
            Mayank<span className="accent-dot">.</span>
          </span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="cmd-trigger"
            onClick={onOpenCommand}
            aria-label="Open Command Palette"
          >
            <Terminal size={14} />
            <span className="cmd-kbd">Ctrl K</span>
          </button>

          <Link to="/contact" className="btn-connect" onClick={() => setMenuOpen(false)}>
            <span>Let's Connect</span>
            <ArrowRight size={15} />
          </Link>

          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
