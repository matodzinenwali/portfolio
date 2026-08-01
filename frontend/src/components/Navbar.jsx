import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const links = [
  { to: '/', label: '~', end: true },
  { to: '/projects', label: '/projects' },
  { to: '/achievements', label: '/achievements' },
  { to: '/about', label: '/about' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo mono">
          matodzi<span className="navbar-logo-dim">@</span>portfolio
          <span className="navbar-cursor" aria-hidden="true" />
        </NavLink>

        <nav className="navbar-links" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                'navbar-link mono' + (isActive ? ' navbar-link--active' : '')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
