import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Fingerprint, Globe, Heart, ChevronRight, AlertCircle, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import styles from './Home.module.css';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`${className} animate-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className={styles.home}>
      {bannerVisible && (
        <div className={styles.threatBanner}>
          <div className={styles.bannerContent}>
            <AlertCircle size={18} className={styles.bannerIcon} />
            <p>
              <strong>Threat of the Week:</strong> Fake IT helpdesk emails surging in Finance sector — see how to spot them.
            </p>
            <Link to="/quiz" className={styles.bannerCta}>Take the 2-min quiz</Link>
          </div>
          <button className={styles.bannerClose} onClick={() => setBannerVisible(false)}>
            <X size={18} />
          </button>
        </div>
      )}
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.radarWrap}>
          <div className={styles.radarCircle} />
          <div className={styles.radarCircle} />
          <div className={styles.radarCircle} />
          <div className={styles.radarSweep} />
          <div className={styles.radarDot} style={{ top: '30%', left: '60%' }} />
          <div className={styles.radarDot} style={{ top: '65%', left: '35%', animationDelay: '0.5s' }} />
          <div className={styles.radarDot} style={{ top: '45%', left: '72%', animationDelay: '1s' }} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Role-Aware Cybersecurity Training
          </div>

          <h1 className={styles.heroTitle}>
            Security training that{' '}
            <span className={styles.heroGradient}>knows your job</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Every other security tool asks if you clicked.
            ThreatMirror asks <strong>why</strong> — and then makes sure you never will again.
          </p>

          <div className={styles.heroActions}>
            <Link to="/onboard" className="btn btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/features" className="btn btn-secondary">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`${styles.howSection} container`}>
        <AnimatedSection>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">Three simple steps to a safer team</h2>
          <p className="section-subtitle">
            No complex setup. No IT headaches. Just smarter security for everyone.
          </p>
        </AnimatedSection>

        <div className={styles.howGrid}>
          <AnimatedSection className={styles.howCard} delay={0}>
            <div className={styles.howNum}><span>1</span></div>
            <h3 className={styles.howTitle}>Onboard Your Team</h3>
            <p className={styles.howDesc}>
              Each employee sets up their role, department, and comfort level.
              Takes 2 minutes. That's all we need to personalize everything.
            </p>
            <span className={styles.howArrow}><ChevronRight size={20} /></span>
          </AnimatedSection>

          <AnimatedSection className={styles.howCard} delay={150}>
            <div className={styles.howNum}><span>2</span></div>
            <h3 className={styles.howTitle}>Learn From Your Reality</h3>
            <p className={styles.howDesc}>
              Get alerts, quizzes, and training built from threats that actually
              target people in your exact role. Real scenarios, not textbooks.
            </p>
            <span className={styles.howArrow}><ChevronRight size={20} /></span>
          </AnimatedSection>

          <AnimatedSection className={styles.howCard} delay={300}>
            <div className={styles.howNum}><span>3</span></div>
            <h3 className={styles.howTitle}>Stay Safe, Every Day</h3>
            <p className={styles.howDesc}>
              Our extension watches your inbox silently. Weekly reports show your
              progress. You get better at spotting threats without even trying.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Value Props */}
      <section className={`${styles.valueSection} container`}>
        <AnimatedSection>
          <div className="section-label">Why ThreatMirror</div>
          <h2 className="section-title">Built different. For a reason.</h2>
        </AnimatedSection>

        <div className={styles.valueGrid}>
          <AnimatedSection className={styles.valueCard} delay={0}>
            <div className={styles.valueIcon} style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#a78bfa' }}>
              <Fingerprint size={24} />
            </div>
            <h3 className={styles.valueTitle}>Knows Your Role, Shows YOUR Threats</h3>
            <p className={styles.valueDesc}>
              A logistics manager gets fake shipment scams. A finance analyst gets wire fraud alerts.
              Because attackers already know your job — now your training does too.
            </p>
          </AnimatedSection>

          <AnimatedSection className={styles.valueCard} delay={150}>
            <div className={styles.valueIcon} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
              <Heart size={24} />
            </div>
            <h3 className={styles.valueTitle}>Coaches You, Never Shames You</h3>
            <p className={styles.valueDesc}>
              Caught a threat? We celebrate. Missed one? We explain what happened — gently.
              No leaderboards. No public scores. Just private, steady improvement.
            </p>
          </AnimatedSection>

          <AnimatedSection className={styles.valueCard} delay={300}>
            <div className={styles.valueIcon} style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
              <Globe size={24} />
            </div>
            <h3 className={styles.valueTitle}>Works in Any Language</h3>
            <p className={styles.valueDesc}>
              Got a phishing email in Japanese? We translate it first, analyze it second,
              and warn you in your language. That weapon is gone.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pitch */}
      <section className={`${styles.pitchSection} container`}>
        <AnimatedSection>
          <div className={styles.pitchBox}>
            <div className={styles.pitchGlow} />
            <p className={styles.pitchQuote}>
              "Every other security tool asks <em>if</em> you clicked.
              ThreatMirror asks <em>why</em> — and then makes sure you never will again."
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
