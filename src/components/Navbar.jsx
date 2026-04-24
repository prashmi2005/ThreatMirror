import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Sun, Moon, Coins } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import styles from './Navbar.module.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/rewards', label: 'Rewards' },
  { path: '/profile', label: 'Profile' },
  { path: '/dashboard', label: 'Admin' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { shieldCoins } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Shield size={18} style={{ transform: 'rotate(-45deg)' }} />
            </div>
            <span className={styles.logoText}>
              Threat<span className={styles.logoAccent}>Mirror</span>
            </span>
          </Link>

          <ul className={styles.navLinks}>
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.navRight}>
            <div className={styles.hud}>
              <div className={styles.coinBadge}>
                <Shield size={14} className={styles.coinIcon} />
                <span className={styles.coinCount}>{shieldCoins.toLocaleString()}</span>
                <span className={styles.coinLabel}>ShieldCoins</span>
              </div>
            </div>

            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <button
          className={styles.mobileClose}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.mobileLink} ${location.pathname === item.path ? styles.active : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
