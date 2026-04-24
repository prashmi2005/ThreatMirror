import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLogo}>
              <div className={styles.brandIcon}>
                <Shield size={16} />
              </div>
              <span className={styles.brandName}>ThreatMirror</span>
            </Link>
            <p className={styles.brandDesc}>
              The world's first role-aware, psychologically intelligent cybersecurity companion.
              Built not just to block phishing, but to understand the human behind the click.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/extension">Extension</Link>
            <Link to="/quiz">Security Quiz</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className={styles.footerCol}>
            <h4>Get Started</h4>
            <Link to="/onboard">Employee Onboarding</Link>
            <Link to="/team">See Demo Profiles</Link>
            <Link to="/quiz">Take the Quiz</Link>
          </div>

          <div className={styles.footerCol}>
            <h4>Privacy</h4>
            <a href="#privacy">Privacy-First Design</a>
            <a href="#gdpr">GDPR Compliant</a>
            <a href="#local">On-Device Processing</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span className={styles.copyright}>
            © 2024 ThreatMirror. Built for a safer workplace.
          </span>
          <div className={styles.footerBadge}>
            <Lock size={12} />
            Your data stays on your device
          </div>
        </div>
      </div>
    </footer>
  );
}
