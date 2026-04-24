import { ChevronRight, Lock, ShieldCheck, Eye, Wifi } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { featuresData, colorMap } from '../data/featuresData';
import { useScrollAnimation } from '../hooks/useAnimations';
import styles from './Features.module.css';

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

export default function Features() {
  return (
    <div className={`${styles.features} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Features</div>
        <h1 className="section-title">Everything you need to stay safe</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          No technical jargon. No complicated dashboards. Just smart, personalized
          protection that actually works &mdash; explained in plain language.
        </p>
      </AnimatedSection>

      <div className={styles.grid}>
        {featuresData.map((feature, idx) => {
          const colors = colorMap[feature.color];
          const IconComponent = LucideIcons[feature.icon] || LucideIcons.Shield;
          return (
            <AnimatedSection
              key={feature.id}
              className={styles.card}
              delay={idx * 100}
            >
              <div
                className={styles.cardGlow}
                style={{ background: `radial-gradient(ellipse, ${colors.bg}, transparent)` }}
              />
              <div className={styles.cardTop}>
                <div
                  className={styles.iconWrap}
                  style={{ background: colors.bg, color: colors.text }}
                >
                  <IconComponent size={22} />
                </div>
                <div>
                  <div className={styles.cardLabel} style={{ color: colors.text }}>
                    Feature {feature.id}
                  </div>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                </div>
              </div>
              <p className={styles.cardDesc}>{feature.description}</p>
              <button className={styles.tryBtn}>
                {feature.tryText} <ChevronRight size={14} />
              </button>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Privacy Section */}
      <AnimatedSection className={styles.privacySection}>
        <div className={styles.privacyCard}>
          <div className={styles.privacyIcon}>
            <Lock size={24} />
          </div>
          <h2 className={styles.privacyTitle}>Privacy-First. Always.</h2>
          <p className={styles.privacyDesc}>
            We never read, store, or share your emails. All scanning happens on your device.
            Your psychology report is built from patterns, not content. You're in full control.
          </p>
          <div className={styles.privacyPoints}>
            <span className={styles.privPoint}>
              <ShieldCheck size={14} /> On-device processing
            </span>
            <span className={styles.privPoint}>
              <Eye size={14} /> No email content stored
            </span>
            <span className={styles.privPoint}>
              <Wifi size={14} /> GDPR compliant
            </span>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
