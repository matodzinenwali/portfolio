import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle mono"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`--theme=${isDark ? 'light' : 'dark'}`}
    >
      <span className="theme-toggle-flag">--theme=</span>
      <span className={isDark ? 'theme-toggle-active' : ''}>dark</span>
      <span className="theme-toggle-sep">|</span>
      <span className={!isDark ? 'theme-toggle-active' : ''}>light</span>
    </button>
  );
}
