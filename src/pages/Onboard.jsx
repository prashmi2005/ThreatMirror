import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Shield, AlertTriangle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import styles from './Onboard.module.css';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} animate-in ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

const departments = [
  { id: 'logistics', emoji: '📦', label: 'Logistics & Supply Chain', desc: 'Shipping, warehouse, procurement' },
  { id: 'finance', emoji: '💰', label: 'Finance & Accounting', desc: 'Payments, invoicing, budgets' },
  { id: 'hr', emoji: '👥', label: 'Human Resources', desc: 'Hiring, benefits, compliance' },
  { id: 'engineering', emoji: '💻', label: 'Engineering & IT', desc: 'Development, infrastructure' },
];

const comfortLevels = [
  { id: 'simple', emoji: '🌱', label: 'Simple', desc: 'I prefer step-by-step' },
  { id: 'normal', emoji: '⚡', label: 'Normal', desc: 'I\'m comfortable with tech' },
  { id: 'expert', emoji: '🚀', label: 'Expert', desc: 'Show me the details' },
];

const threatsByDept = {
  logistics: [
    { text: 'Fake shipment delay notifications', risk: 'high' },
    { text: 'Vendor bank account change scams', risk: 'high' },
    { text: 'Customs clearance document phishing', risk: 'medium' },
  ],
  finance: [
    { text: 'CEO wire transfer impersonation', risk: 'critical' },
    { text: 'Fake invoice attachments with malware', risk: 'high' },
    { text: 'Bank credential harvesting emails', risk: 'high' },
  ],
  hr: [
    { text: 'Resume attachments containing malware', risk: 'high' },
    { text: 'Fake employee data breach alerts', risk: 'critical' },
    { text: 'Salary revision phishing emails', risk: 'medium' },
  ],
  engineering: [
    { text: 'GitHub/GitLab account compromise alerts', risk: 'high' },
    { text: 'Fake npm/package vulnerability notices', risk: 'high' },
    { text: 'Cloud provider credential harvesting', risk: 'critical' },
  ],
};

const sampleAlerts = {
  simple: {
    title: '⚠️ Watch out!',
    text: 'This email is pretending to be from DHL. The address is fake. Don\'t click any links.',
    bg: 'rgba(239,68,68,0.06)',
    color: 'var(--accent-red)',
  },
  normal: {
    title: '⚠️ Phishing Alert — Fake DHL Email',
    text: 'This email claims to be from DHL but uses a lookalike domain (dhl-express-tracking.com instead of dhl.com). It creates urgency with a 12-hour customs deadline. The link leads to a credential harvesting page.',
    bg: 'rgba(239,68,68,0.06)',
    color: 'var(--accent-red)',
  },
  expert: {
    title: '⚠️ Phishing — Domain Spoofing + Urgency Trigger',
    text: 'Sender: customs-support@dhl-express-tracking.com\nReal DHL domain: dhl.com\nThreat type: Credential harvesting via lookalike domain\nPsychological triggers: Urgency (12h deadline), Fear of financial loss ($2,400 demurrage)\nLink destination: Obfuscated redirect to harvesting page\nRecommendation: Delete. Verify through official DHL portal.',
    bg: 'rgba(239,68,68,0.06)',
    color: 'var(--accent-red)',
  },
};

export default function Onboard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', department: '', jobTitle: '', comfort: '', age: '' });

  const steps = ['Welcome', 'Your Role', 'Comfort', 'Your Profile'];

  const isStepValid = () => {
    if (step === 0) return data.name.trim().length > 0;
    if (step === 1) return data.department && data.jobTitle.trim().length > 0;
    if (step === 2) return data.comfort;
    return true;
  };

  const riskColor = (risk) => {
    if (risk === 'critical') return 'var(--accent-red)';
    if (risk === 'high') return 'var(--accent-orange)';
    return 'var(--accent-cyan)';
  };

  const deptLabel = departments.find(d => d.id === data.department)?.label || '';
  const alertSample = sampleAlerts[data.comfort] || sampleAlerts.normal;
  const threats = threatsByDept[data.department] || [];

  return (
    <div className={`${styles.onboard} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Employee Onboarding</div>
        <h1 className="section-title">Let's personalize your experience</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Tell us a bit about yourself, and we'll build your personalized threat profile.
          Takes about 2 minutes.
        </p>
      </AnimatedSection>

      {/* Progress Bar */}
      <div className={styles.stepBar}>
        {steps.map((label, i) => (
          <div key={i} className={styles.step}>
            <div>
              <div className={`${styles.stepCircle} ${i < step ? styles.done : ''} ${i === step ? styles.active : ''}`}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <div className={styles.stepLabel}>{label}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`${styles.stepLine} ${i < step ? styles.active : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>👋 Welcome to ThreatMirror</h2>
          <p className={styles.formDesc}>
            We'll ask you a few questions to understand your role and preferences.
            This helps us show you threats that actually matter to you.
          </p>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Your Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your name"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Age Bracket</label>
            <div className={styles.selectGrid}>
              {['18-25', '26-35', '36-50', '51-65'].map(age => (
                <div
                  key={age}
                  className={`${styles.selectCard} ${data.age === age ? styles.selected : ''}`}
                  onClick={() => setData({ ...data, age })}
                >
                  <span className={styles.selectLabel}>{age}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.formActions}>
            <div />
            <button className="btn btn-primary" disabled={!isStepValid()} onClick={() => setStep(1)}>
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Role */}
      {step === 1 && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>🎯 What's your role?</h2>
          <p className={styles.formDesc}>
            Different jobs face different threats. A shipping manager and an accountant
            see completely different phishing attacks.
          </p>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Department</label>
            <div className={styles.selectGrid}>
              {departments.map(dept => (
                <div
                  key={dept.id}
                  className={`${styles.selectCard} ${data.department === dept.id ? styles.selected : ''}`}
                  onClick={() => setData({ ...data, department: dept.id })}
                >
                  <span className={styles.selectEmoji}>{dept.emoji}</span>
                  <span className={styles.selectLabel}>{dept.label}</span>
                  <span className={styles.selectDesc}>{dept.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Job Title</label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g., Warehouse Manager, Financial Analyst"
              value={data.jobTitle}
              onChange={e => setData({ ...data, jobTitle: e.target.value })}
            />
          </div>
          <div className={styles.formActions}>
            <button className="btn btn-ghost" onClick={() => setStep(0)}>
              <ArrowLeft size={14} /> Back
            </button>
            <button className="btn btn-primary" disabled={!isStepValid()} onClick={() => setStep(2)}>
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Comfort */}
      {step === 2 && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>💡 How should we talk to you?</h2>
          <p className={styles.formDesc}>
            Everyone processes information differently. Let us know your preference
            and we'll adjust everything — alerts, reports, and quizzes.
          </p>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Reading Level Preference</label>
            <div className={styles.comfortGrid}>
              {comfortLevels.map(level => (
                <div
                  key={level.id}
                  className={`${styles.selectCard} ${data.comfort === level.id ? styles.selected : ''}`}
                  onClick={() => setData({ ...data, comfort: level.id })}
                >
                  <span className={styles.selectEmoji}>{level.emoji}</span>
                  <span className={styles.selectLabel}>{level.label}</span>
                  <span className={styles.selectDesc}>{level.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.formActions}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              <ArrowLeft size={14} /> Back
            </button>
            <button className="btn btn-primary" disabled={!isStepValid()} onClick={() => setStep(3)}>
              Generate My Profile <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Profile */}
      {step === 3 && (
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileGlow} />
            <span className={styles.profileAvatar}>🛡️</span>
            <h2 className={styles.profileName}>{data.name}'s Security Profile</h2>
            <p className={styles.profileRole}>{data.jobTitle} — {deptLabel}</p>
            <div className={styles.profileBadges}>
              <span className="badge badge-cyan">Role-DNA Active</span>
              <span className="badge badge-green">Privacy Protected</span>
              <span className="badge badge-purple">{data.comfort?.charAt(0).toUpperCase() + data.comfort?.slice(1)} Mode</span>
            </div>
          </div>

          <div className={styles.profileBody}>
            <div className={styles.profileSection}>
              <h3 className={styles.profileSectionTitle}>Your Top Threats</h3>
              <div className={styles.threatList}>
                {threats.map((t, i) => (
                  <div key={i} className={styles.threatItem}>
                    <span className={styles.threatDot} style={{ background: riskColor(t.risk) }} />
                    <span className={styles.threatText}>{t.text}</span>
                    <span className="badge" style={{
                      background: riskColor(t.risk) + '15',
                      color: riskColor(t.risk),
                      border: `1px solid ${riskColor(t.risk)}30`,
                      marginLeft: 'auto',
                      fontSize: 10,
                    }}>
                      {t.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.profileSection}>
              <h3 className={styles.profileSectionTitle}>Sample Alert — {data.comfort} Level</h3>
              <div className={styles.sampleAlert} style={{ background: alertSample.bg, border: `1px solid ${alertSample.color}30`, borderRadius: 'var(--radius-md)' }}>
                <div className={styles.sampleAlertTitle} style={{ color: alertSample.color }}>
                  <AlertTriangle size={14} style={{ verticalAlign: 'text-bottom', marginRight: 6 }} />
                  {alertSample.title}
                </div>
                <div className={styles.sampleAlertText} style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {alertSample.text}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            <Link to="/quiz" className="btn btn-secondary">
              Take the Quiz <ArrowRight size={14} />
            </Link>
            <Link to="/extension" className="btn btn-primary">
              Try the Extension <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
