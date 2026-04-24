import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Shield, AlertTriangle, Laptop, Smartphone, Monitor, Loader2, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { useUser } from '../context/UserContext';
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

const devices = [
  { id: 'laptop', icon: Laptop, label: 'Laptop', desc: 'Primary work computer' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile', desc: 'Smartphone for work tasks' },
  { id: 'both', icon: Monitor, label: 'Both', desc: 'Laptop + Mobile' },
  { id: 'shared', icon: Users, label: 'Shared', desc: 'Public or shared computer' },
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
  const { updateProfile } = useUser();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState({ 
    name: '', 
    department: '', 
    jobTitle: '', 
    comfort: '', 
    age: '',
    device: ''
  });

  const steps = ['Welcome', 'Your Role', 'Comfort', 'Devices', 'Your Profile'];

  const isStepValid = () => {
    if (step === 0) return data.name.trim().length > 0;
    if (step === 1) return data.department && data.jobTitle.trim().length > 0;
    if (step === 2) return data.comfort;
    if (step === 3) return data.device;
    return true;
  };

  const handleGenerateProfile = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
      updateProfile({
        name: data.name,
        role: data.jobTitle,
        department: data.department,
        comfortLevel: data.comfort,
        devices: [data.device]
      });
    }, 3000);
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
      </AnimatedSection>

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

      {isGenerating ? (
        <div className={styles.generatingCard}>
          <Loader2 size={48} className={styles.spinner} />
          <h2>Building Your Threat Profile...</h2>
          <div className={styles.genList}>
            <div className={styles.genItem}>Analyzing {data.department} vulnerabilities...</div>
            <div className={styles.genItem}>Personalizing {data.comfort} coaching mode...</div>
            <div className={styles.genItem}>Mapping {data.device} threat vectors...</div>
          </div>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>👋 Welcome to ThreatMirror</h2>
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

          {step === 1 && (
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>🎯 What's your role?</h2>
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
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Job Title</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="e.g., Financial Analyst"
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

          {step === 2 && (
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>💡 How should we talk to you?</h2>
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
              <div className={styles.formActions}>
                <button className="btn btn-ghost" onClick={() => setStep(1)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button className="btn btn-primary" disabled={!isStepValid()} onClick={() => setStep(3)}>
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>📱 Work Devices</h2>
              <p className={styles.formDesc}>What devices do you use for work? This enriches your threat profile.</p>
              <div className={styles.selectGrid}>
                {devices.map(device => (
                  <div
                    key={device.id}
                    className={`${styles.selectCard} ${data.device === device.id ? styles.selected : ''}`}
                    onClick={() => setData({ ...data, device: device.id })}
                  >
                    <device.icon size={24} style={{ marginBottom: 8, color: 'var(--accent-gold)' }} />
                    <span className={styles.selectLabel}>{device.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.formActions}>
                <button className="btn btn-ghost" onClick={() => setStep(2)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button className="btn btn-primary" disabled={!isStepValid()} onClick={handleGenerateProfile}>
                  Generate My Profile <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.profileGlow} />
                <h2 className={styles.profileName}>{data.name}'s Security Profile</h2>
                <p className={styles.profileRole}>{data.jobTitle} — {deptLabel}</p>
                <div className={styles.profileBadges}>
                  <span className="badge badge-cyan">Role-DNA Active</span>
                  <span className="badge badge-purple">{data.comfort} Mode</span>
                  <span className="badge badge-gold">{data.device} Protected</span>
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
                        <span className="badge" style={{ color: riskColor(t.risk) }}>{t.risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.profileActions}>
                <Link to="/quiz" className="btn btn-primary">Take the Quiz <ArrowRight size={14} /></Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
