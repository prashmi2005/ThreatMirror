import { useState } from 'react';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { teamMembers } from '../data/teamData';
import { useScrollAnimation } from '../hooks/useAnimations';
import styles from './Team.module.css';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} animate-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ProfileCard({ member, delay }) {
  const [activeTab, setActiveTab] = useState('threats');

  const levelColors = {
    danger: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.2)' },
    warning: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
    safe: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.2)' },
  };

  const riskColors = {
    critical: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
    high: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
    medium: { bg: 'rgba(6,182,212,0.1)', color: '#06b6d4' },
  };

  return (
    <AnimatedSection className={styles.profileCard} delay={delay}>
      <div className={styles.profileTop}>
        <div className={styles.avatar}>{member.avatar}</div>
        <div className={styles.profileInfo}>
          <h3>{member.name}</h3>
          <div className={styles.role}>{member.role} • Age {member.age}</div>
          <div className={styles.bio}>{member.bio}</div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'threats' ? styles.active : ''}`} onClick={() => setActiveTab('threats')}>
          Top Threats
        </button>
        <button className={`${styles.tab} ${activeTab === 'inbox' ? styles.active : ''}`} onClick={() => setActiveTab('inbox')}>
          A Day in Their Inbox
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'threats' && (
          <>
            {member.threats.map((t, i) => (
              <div key={i} className={styles.threatItem}>
                <div className={styles.threatHeader}>
                  <span className={styles.threatType}>{t.type}</span>
                  <span className="badge" style={{
                    background: riskColors[t.risk]?.bg,
                    color: riskColors[t.risk]?.color,
                    border: `1px solid ${riskColors[t.risk]?.color}30`,
                  }}>{t.risk}</span>
                </div>
                <div className={styles.threatDesc}>{t.description}</div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'inbox' && (
          <>
            {member.sampleAlerts.map((email, i) => {
              const lc = levelColors[email.level];
              return (
                <div key={i} className={styles.emailItem} style={{ background: lc.bg, borderColor: lc.border }}>
                  <span className={styles.emailLevel} style={{ background: lc.color + '20', color: lc.color }}>
                    {email.level === 'danger' && <><AlertTriangle size={10} /> Phishing</>}
                    {email.level === 'warning' && <><AlertTriangle size={10} /> Suspicious</>}
                    {email.level === 'safe' && <><CheckCircle size={10} /> Safe</>}
                  </span>
                  <div className={styles.emailSubject}>{email.subject}</div>
                  <div className={styles.emailSender}>From: {email.sender}</div>
                  <div className={styles.emailPreview}>{email.preview}</div>
                  {email.flags.length > 0 && (
                    <div className={styles.emailFlags}>
                      {email.flags.map((f, j) => <span key={j} className={styles.emailFlag}>⚠ {f}</span>)}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </AnimatedSection>
  );
}

export default function Team() {
  return (
    <div className={`${styles.team} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Demo Profiles</div>
        <h1 className="section-title">Same platform, different experience</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          See how ThreatMirror adapts to different roles.
          What Arjun sees is completely different from what Priya sees —
          because their threats are completely different.
        </p>
      </AnimatedSection>

      <div className={styles.profiles}>
        {teamMembers.map((member, idx) => (
          <ProfileCard key={member.id} member={member} delay={idx * 150} />
        ))}
      </div>

      <AnimatedSection className={styles.conceptBanner}>
        <Shield size={32} style={{ color: 'var(--accent-cyan)', marginBottom: 16 }} />
        <h2 className={styles.conceptTitle}>Training, Not Competition</h2>
        <p className={styles.conceptDesc}>
          Each employee's vulnerability profile is private — visible only to them.
          No leaderboards. No public scores. No shame. Just personal growth,
          at your own pace, with coaching that understands your role and your psychology.
        </p>
      </AnimatedSection>
    </div>
  );
}
