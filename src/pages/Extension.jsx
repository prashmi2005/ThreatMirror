import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Trash2, Flag, ThumbsUp, Mail, Globe, Eye } from 'lucide-react';
import { mockEmails } from '../data/emailData';
import { useScrollAnimation } from '../hooks/useAnimations';
import styles from './Extension.module.css';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} animate-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Extension() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const getDotColor = (email) => {
    if (email.threatScore > 80) return 'var(--accent-red)';
    if (email.threatScore > 40) return 'var(--accent-orange)';
    return 'var(--accent-green)';
  };

  const getScoreBg = (score) => {
    if (score > 80) return { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', color: 'var(--accent-red)' };
    if (score > 40) return { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', color: 'var(--accent-orange)' };
    return { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', color: 'var(--accent-green)' };
  };

  const email = selectedEmail ? mockEmails.find(e => e.id === selectedEmail) : null;
  const scoreSt = email ? getScoreBg(email.threatScore) : null;

  const flagTypeIcons = {
    domain: <Globe size={12} />,
    urgency: <AlertTriangle size={12} />,
    link: <Eye size={12} />,
    greeting: <Mail size={12} />,
    language: <Globe size={12} />,
    curiosity: <Eye size={12} />,
  };

  return (
    <div className={`${styles.extension} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Extension Simulator</div>
        <h1 className="section-title">See the extension in action</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Click on any email to see how ThreatMirror analyses it in real-time.
          The sidebar shows exactly what you'd see in the Chrome extension.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <div className={styles.simulator}>
          {/* Inbox */}
          <div className={styles.inbox}>
            <div className={styles.inboxHeader}>
              <Mail size={16} style={{ color: 'var(--text-tertiary)' }} />
              <span className={styles.inboxTitle}>Inbox</span>
              <span className={styles.inboxCount}>{mockEmails.length} emails</span>
            </div>
            {mockEmails.map(e => (
              <div
                key={e.id}
                className={`${styles.emailRow} ${selectedEmail === e.id ? styles.active : ''}`}
                onClick={() => setSelectedEmail(e.id)}
              >
                <span className={styles.emailDot} style={{ background: getDotColor(e) }} />
                <div className={styles.emailRowContent}>
                  <div className={styles.emailRowSubject}>{e.subject}</div>
                  <div className={styles.emailRowSender}>{e.senderName}</div>
                  <div className={styles.emailRowPreview}>{e.preview}</div>
                </div>
                <span className={styles.emailRowTime}>{e.time}</span>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {!email ? (
              <div className={styles.sidebarEmpty}>
                <div className={styles.sidebarEmptyIcon}>
                  <Shield size={28} />
                </div>
                <p className={styles.sidebarEmptyText}>
                  Click on an email to see<br />ThreatMirror's analysis
                </p>
              </div>
            ) : (
              <div className={styles.sidebarContent}>
                <div className={styles.sidebarLogo}>
                  <div className={styles.sidebarLogoIcon}><Shield size={14} /></div>
                  <span className={styles.sidebarLogoText}>ThreatMirror</span>
                </div>

                {/* Threat Score */}
                <div className={styles.threatScore} style={{ background: scoreSt.bg, border: `1px solid ${scoreSt.border}` }}>
                  <div className={styles.scoreValue} style={{ color: scoreSt.color }}>{email.threatScore}</div>
                  <div className={styles.scoreLabel} style={{ color: scoreSt.color }}>Threat Score</div>
                </div>

                {/* Verdict */}
                <div className={styles.verdictBox} style={{
                  background: scoreSt.bg,
                  border: `1px solid ${scoreSt.border}`,
                }}>
                  <div className={styles.verdictTitle} style={{ color: scoreSt.color }}>
                    {email.threatScore > 40 ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                    {email.analysis.verdict}
                  </div>
                  <div className={styles.verdictText}>{email.analysis.summary}</div>
                </div>

                {/* Language Shield */}
                {email.language !== 'en' && (
                  <div className={styles.langShield}>
                    <div className={styles.langTitle}>
                      <Globe size={12} /> Language Shield Activated
                    </div>
                    <div className={styles.langOriginal}>
                      Original ({email.language === 'ja' ? 'Japanese' : email.language}): {email.subject}
                    </div>
                    <div className={styles.langTranslated}>
                      <strong>Translated:</strong> {email.translatedBody || email.body}
                    </div>
                  </div>
                )}

                {/* Flags */}
                {email.analysis.flags.length > 0 && (
                  <div className={styles.flagsSection}>
                    <div className={styles.flagsTitle}>Warning Flags</div>
                    {email.analysis.flags.map((f, i) => (
                      <div key={i} className={styles.flagItem}>
                        <span className={styles.flagIcon} style={{ color: 'var(--accent-red)' }}>
                          {flagTypeIcons[f.type] || <AlertTriangle size={12} />}
                        </span>
                        {f.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Trigger */}
                {email.analysis.trigger && (
                  <div className={styles.triggerSection}>
                    <div className={styles.triggerLabel}>Psychological Trigger</div>
                    <span className={styles.triggerValue}>{email.analysis.trigger}</span>
                  </div>
                )}

                {/* Action */}
                <div className={styles.actionSection}>
                  <div className={styles.actionTitle}>What to Do</div>
                  <div className={styles.actionText}>{email.analysis.action}</div>
                </div>

                {/* Action Buttons */}
                <div className={styles.sidebarActions}>
                  {email.isPhishing ? (
                    <>
                      <button className={`${styles.sidebarBtn} ${styles.deleteBtn}`}>
                        <Trash2 size={12} /> Delete
                      </button>
                      <button className={`${styles.sidebarBtn} ${styles.reportBtn}`}>
                        <Flag size={12} /> Report
                      </button>
                    </>
                  ) : (
                    <button className={`${styles.sidebarBtn} ${styles.safeBtn}`}>
                      <ThumbsUp size={12} /> Looks Safe
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
