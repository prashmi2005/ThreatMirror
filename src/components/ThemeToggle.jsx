import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-secondary)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
      }}
      onMouseEnter={e => {
        e.target.style.borderColor = 'var(--border-glow)';
        e.target.style.color = 'var(--text-accent)';
      }}
      onMouseLeave={e => {
        e.target.style.borderColor = 'var(--border-secondary)';
        e.target.style.color = 'var(--text-secondary)';
      }}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
