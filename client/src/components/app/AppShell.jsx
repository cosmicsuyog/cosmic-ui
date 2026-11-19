import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import "./app-shell.css";

const links = [
  ["Home", "/"],
  ["Generate", "/generate"],
  ["Components", "/docs"],
  ["Utilities", "/docs/utilities"],
  ["Pricing", "/pricing"],
];

export default function AppShell({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("cosmic-ui-theme") || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("cosmic-ui-theme", theme);
  }, [theme]);
  return (
    <div className="cosmic-shell" data-theme={theme}>
      <a className="shell-skip" href="#app-content">
        Skip to content
      </a>
      <header className="shell-header">
        <Link
          to="/"
          className="shell-brand"
          onClick={() => setMenuOpen(false)}
          aria-label="Cosmic UI home"
        >
          <span>C</span> Cosmic UI
        </Link>
        <nav className={menuOpen ? "shell-nav open" : "shell-nav"} aria-label="Primary navigation">
          {links.map(([label, to]) => (
            <Link
              key={to}
              className={location.pathname === to ? "active" : ""}
              onClick={() => setMenuOpen(false)}
              to={to}
            >
              {label}
            </Link>
          ))}
          <Link className="shell-mobile-login" onClick={() => setMenuOpen(false)} to="/login">
            Login
          </Link>
        </nav>
        <div className="shell-actions">
          <button
            className="shell-icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link className="shell-login" to="/login">
            Login
          </Link>
          <button
            className="shell-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main id="app-content" className="shell-main">
        {children}
      </main>
      <footer className="shell-footer">
        <Link to="/" className="shell-brand">
          <span>C</span> Cosmic UI
        </Link>
        <p>Components, AI generation, and browser utilities in one product.</p>
        <div>
          <Link to="/docs/utilities">Docs</Link>
          <Link to="/pricing">Pricing</Link>
          <a href="/NOTICE.md">Credits</a>
        </div>
      </footer>
    </div>
  );
}
