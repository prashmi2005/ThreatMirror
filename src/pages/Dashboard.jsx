import { Shield, Users, TrendingUp, TrendingDown, BookOpen, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useCountUp, useScrollAnimation } from '../hooks/useAnimations';
import styles from './Dashboard.module.css';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} animate-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, iconBg, iconColor, value, label, change, changeType, delay }) {
  const [ref, count] = useCountUp(value, 1500);
  return (
    <AnimatedSection className={styles.statCard} delay={delay}>
      <div className={styles.statIcon} style={{ background: iconBg, color: iconColor }}>
        <Icon size={20} />
      </div>
      <div ref={ref} className={styles.statValue}>{count}</div>
      <div className={styles.statLabel}>{label}</div>
      {change && (
        <span className={styles.statChange} style={{
          background: changeType === 'up' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          color: changeType === 'up' ? 'var(--accent-green)' : 'var(--accent-red)',
        }}>
          {changeType === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
      )}
    </AnimatedSection>
  );
}

export default function Dashboard() {
  const weeklyData = [
    { label: 'Mon', value: 12, blocked: 8 },
    { label: 'Tue', value: 18, blocked: 15 },
    { label: 'Wed', value: 8, blocked: 7 },
    { label: 'Thu', value: 24, blocked: 22 },
    { label: 'Fri', value: 15, blocked: 13 },
    { label: 'Sat', value: 5, blocked: 5 },
    { label: 'Sun', value: 3, blocked: 3 },
  ];
  const maxVal = Math.max(...weeklyData.map(d => d.value));

  const trainingItems = [
    { name: 'Logistics Team', count: '18/20 completed', percent: 90, color: 'var(--accent-green)' },
    { name: 'Finance Team', count: '14/16 completed', percent: 87, color: 'var(--accent-green)' },
    { name: 'HR Department', count: '8/12 completed', percent: 67, color: 'var(--accent-orange)' },
    { name: 'Engineering', count: '22/25 completed', percent: 88, color: 'var(--accent-green)' },
    { name: 'Management', count: '5/8 completed', percent: 62, color: 'var(--accent-orange)' },
  ];

  const compliance = [
    { name: 'GDPR', status: 'Compliant', percent: 94, color: 'var(--accent-green)' },
    { name: 'ISO 27001', status: 'In Progress', percent: 78, color: 'var(--accent-orange)' },
    { name: 'SOC 2', status: 'Compliant', percent: 91, color: 'var(--accent-green)' },
  ];

  return (
    <div className={`${styles.dashboard} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Admin Dashboard</div>
        <h1 className="section-title">Organization Security Overview</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Aggregated view — no individual employee scores are shown.
          Track your organization's overall security posture.
        </p>
      </AnimatedSection>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <StatCard icon={Users} iconBg="rgba(6,182,212,0.1)" iconColor="var(--accent-cyan)" value={81} label="Employees Protected" change="+12 this month" changeType="up" delay={0} />
        <StatCard icon={Shield} iconBg="rgba(16,185,129,0.1)" iconColor="var(--accent-green)" value={94} label="Threats Blocked %" change="+3% vs last week" changeType="up" delay={100} />
        <StatCard icon={BookOpen} iconBg="rgba(139,92,246,0.1)" iconColor="var(--accent-purple)" value={78} label="Quiz Completion %" change="+8% vs last week" changeType="up" delay={200} />
        <StatCard icon={AlertTriangle} iconBg="rgba(239,68,68,0.1)" iconColor="var(--accent-red)" value={23} label="Threats This Week" change="-5 vs last week" changeType="up" delay={300} />
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* Weekly Trends */}
        <AnimatedSection className={styles.chartCard}>
          <div className={styles.chartTitle}>
            <TrendingUp size={16} style={{ color: 'var(--accent-cyan)' }} />
            Weekly Threat Trends
          </div>
          <div className={styles.trendChart}>
            {weeklyData.map((d, i) => (
              <div
                key={i}
                className={styles.trendBar}
                style={{
                  height: `${(d.value / maxVal) * 100}%`,
                  background: `linear-gradient(180deg, var(--accent-cyan), rgba(6,182,212,0.3))`,
                }}
              >
                <span className={styles.trendValue}>{d.value}</span>
                <span className={styles.trendLabel}>{d.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Training Completion */}
        <AnimatedSection className={styles.chartCard} delay={100}>
          <div className={styles.chartTitle}>
            <BookOpen size={16} style={{ color: 'var(--accent-purple)' }} />
            Weekly Quiz Completion
          </div>
          <div className={styles.trainingList}>
            {trainingItems.map((item, i) => (
              <div key={i} className={styles.trainingItem}>
                <span className={styles.trainingDot} style={{ background: item.color }} />
                <div className={styles.trainingInfo}>
                  <div className={styles.trainingName}>{item.name}</div>
                  <div className={styles.trainingMeta}>{item.count}</div>
                </div>
                <div className={styles.trainingProgress}>
                  <div className={styles.trainingBar}>
                    <div className={styles.trainingFill} style={{ width: `${item.percent}%`, background: item.color }} />
                  </div>
                  <div className={styles.trainingPercent}>{item.percent}%</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Compliance */}
      <AnimatedSection>
        <div className={styles.chartTitle} style={{ marginBottom: 16 }}>
          <CheckCircle size={16} style={{ color: 'var(--accent-green)' }} />
          Compliance Status
        </div>
      </AnimatedSection>
      <div className={styles.complianceGrid}>
        {compliance.map((c, i) => (
          <AnimatedSection key={i} className={styles.complianceCard} delay={i * 100}>
            <div className={styles.complianceHeader}>
              <span className={styles.complianceName}>{c.name}</span>
              <span className={styles.complianceStatus} style={{
                background: c.color + '15',
                color: c.color,
                border: `1px solid ${c.color}30`,
              }}>{c.status}</span>
            </div>
            <div className={styles.complianceBar}>
              <div className={styles.complianceFill} style={{ width: `${c.percent}%`, background: c.color }} />
            </div>
            <div className={styles.complianceDetail}>
              {c.percent}% requirements met • Last audit: 3 days ago
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Overall Score */}
      <AnimatedSection className={styles.scoreSection}>
        <div className={styles.scoreRing} style={{ borderColor: 'var(--accent-green)' }}>
          <span className={styles.scoreRingValue} style={{ color: 'var(--accent-green)' }}>A</span>
          <span className={styles.scoreRingLabel}>Security Grade</span>
        </div>
        <p className={styles.scoreDesc}>
          Your organization's overall security posture is <strong>strong</strong>.
          Employee awareness has improved by 23% since ThreatMirror was deployed.
          Continue the momentum — every employee who completes their weekly quiz makes the whole team safer.
        </p>
      </AnimatedSection>

      <div className={styles.mockBadge}>
        <p>
          <strong>📊 Demo Data</strong> — This dashboard shows simulated metrics.
          In production, it connects to your organization's live ThreatMirror deployment
          via secure API endpoints with role-based admin access.
        </p>
      </div>
    </div>
  );
}
