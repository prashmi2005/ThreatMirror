import { useState } from 'react';
import { 
  Shield, Users, BookOpen, AlertTriangle, BarChart2, 
  Settings, Award, Mail, Menu, X, ChevronRight, 
  TrendingUp, Activity, Bell, FileText, CheckCircle
} from 'lucide-react';
import { overviewData, teamData, threatFeed, outboundLogs } from '../data/dashboardData';
import styles from './Dashboard.module.css';

// Sub-components for tabs
const OverviewTab = () => (
  <div className={styles.tabContent}>
    <div className={styles.topRow}>
      <div className={styles.scoreCard}>
        <h3>Org Security Score</h3>
        <div className={styles.scoreContainer}>
          <svg className={styles.progressRing} width="160" height="160">
            <circle className={styles.progressRingBg} cx="80" cy="80" r="70" />
            <circle 
              className={styles.progressRingFill} 
              cx="80" cy="80" r="70" 
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - overviewData.orgScore / 100)}`}
              stroke={overviewData.orgScore < 50 ? '#ef4444' : overviewData.orgScore < 75 ? '#f59e0b' : '#10b981'}
            />
            <text x="80" y="85" className={styles.scoreText}>{overviewData.orgScore}</text>
            <text x="80" y="105" className={styles.scoreLabel}>/100</text>
          </svg>
        </div>
        <p className={styles.scoreStatus}>
          Status: <span style={{ color: overviewData.orgScore < 75 ? '#f59e0b' : '#10b981' }}>Amber (Caution)</span>
        </p>
      </div>

      <div className={styles.kpiGrid}>
        {overviewData.metrics.map((metric, i) => (
          <div key={i} className={styles.kpiCard}>
            <div className={styles.kpiHeader}>
              <span className={styles.kpiIcon} style={{ color: metric.color, background: `${metric.color}15` }}>
                {metric.icon === 'Users' && <Users size={18} />}
                {metric.icon === 'Shield' && <Shield size={18} />}
                {metric.icon === 'BookOpen' && <BookOpen size={18} />}
                {metric.icon === 'AlertTriangle' && <AlertTriangle size={18} />}
              </span>
              <span className={styles.kpiChange}>{metric.change}</span>
            </div>
            <div className={styles.kpiValue}>{metric.value}</div>
            <div className={styles.kpiLabel}>{metric.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div className={styles.tableSection}>
      <h3>Department breakdown</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Department</th>
              <th>Employees</th>
              <th>Quiz Completion %</th>
              <th>Avg Vulnerability Score</th>
              <th>Top Weakness</th>
            </tr>
          </thead>
          <tbody>
            {overviewData.departmentBreakdown.map((dept, i) => (
              <tr key={i}>
                <td>{dept.dept}</td>
                <td>{dept.employees}</td>
                <td>
                  <div className={styles.progressCell}>
                    <div className={styles.miniBar}>
                      <div className={styles.miniFill} style={{ width: `${dept.completion}%` }} />
                    </div>
                    {dept.completion}%
                  </div>
                </td>
                <td>
                  <span className={styles.scoreBadge} style={{ 
                    background: dept.score > 80 ? '#10b98120' : dept.score > 60 ? '#f59e0b20' : '#ef444420',
                    color: dept.score > 80 ? '#10b981' : dept.score > 60 ? '#f59e0b' : '#ef4444'
                  }}>
                    {dept.score}
                  </span>
                </td>
                <td>{dept.weakness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TeamsTab = () => {
  const [showNames, setShowNames] = useState(false);
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h3>Employee Roster</h3>
        <button className={styles.toggleBtn} onClick={() => setShowNames(!showNames)}>
          {showNames ? 'Anonymize Names' : 'Reveal Names'} (GDPR-safe)
        </button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Risk Level</th>
              <th>Quiz Streak</th>
              <th>Rewards</th>
              <th>Last Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>{emp.name.split(' ').map(n => n[0]).join('')}</div>
                    <span>{showNames ? emp.name : `Defender #${emp.id}`}</span>
                  </div>
                </td>
                <td>{emp.role}</td>
                <td>
                  <span className={`${styles.badge} ${styles[emp.risk.toLowerCase()]}`}>
                    {emp.risk}
                  </span>
                </td>
                <td>{emp.streak} 🔥</td>
                <td>{emp.points}</td>
                <td>{emp.lastActive}</td>
                <td>
                  <button className={styles.nudgeBtn}>Nudge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ThreatFeedTab = () => (
  <div className={styles.tabContent}>
    <div className={styles.tabHeader}>
      <h3>Live Threat Feed</h3>
      <div className={styles.filters}>
        <select className={styles.filterSelect}>
          <option>All Severities</option>
          <option>Critical</option>
          <option>High</option>
        </select>
      </div>
    </div>
    <div className={styles.feedList}>
      {threatFeed.map(threat => (
        <div key={threat.id} className={styles.feedItem}>
          <div className={styles.feedMeta}>
            <span className={styles.feedTime}>{threat.time}</span>
            <span className={`${styles.badge} ${styles[threat.severity.toLowerCase()]}`}>
              {threat.severity}
            </span>
          </div>
          <div className={styles.feedMain}>
            <h4>{threat.type} detected in {threat.dept}</h4>
            <p>{threat.summary}</p>
          </div>
          <ChevronRight size={16} />
        </div>
      ))}
    </div>
  </div>
);

const OutboundLogsTab = () => (
  <div className={styles.tabContent}>
    <h3>Outbound Email Logs (Shadow-Mail Gateway)</h3>
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Submitted At</th>
            <th>AI Risk Score</th>
            <th>Tone</th>
            <th>Status</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {outboundLogs.map(log => (
            <tr key={log.id}>
              <td>{log.sender}</td>
              <td>{log.recipient}</td>
              <td>{log.time}</td>
              <td>
                <span className={styles.scoreBadge} style={{ 
                  color: log.riskScore > 70 ? '#ef4444' : '#10b981'
                }}>
                  {log.riskScore}/100
                </span>
              </td>
              <td>{log.tone}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[log.status.toLowerCase()]}`}>
                  {log.status}
                </span>
              </td>
              <td>
                <button className={styles.reviewBtn}>Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'Overview', icon: BarChart2 },
    { id: 'Teams', icon: Users },
    { id: 'Quiz Analytics', icon: Activity },
    { id: 'Threat Feed', icon: AlertTriangle },
    { id: 'Rewards', icon: Award },
    { id: 'Outbound Logs', icon: Mail },
    { id: 'Settings', icon: Settings },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <Shield size={24} color="var(--accent-gold)" />
          {sidebarOpen && <span className={styles.brandName}>ThreatMirror</span>}
          <button className={styles.mobileClose} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className={styles.sideNav}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              {sidebarOpen && <span>{tab.id}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.contentHeader}>
          <h2>{activeTab}</h2>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn}><Bell size={20} /></button>
            <div className={styles.adminUser}>
              <div className={styles.adminAvatar}>AD</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <div className={styles.scrollArea}>
          {activeTab === 'Overview' && <OverviewTab />}
          {activeTab === 'Teams' && <TeamsTab />}
          {activeTab === 'Threat Feed' && <ThreatFeedTab />}
          {activeTab === 'Outbound Logs' && <OutboundLogsTab />}
          {(activeTab === 'Quiz Analytics' || activeTab === 'Rewards' || activeTab === 'Settings') && (
            <div className={styles.stub}>
              <div className={styles.stubIcon}>
                {activeTab === 'Quiz Analytics' && <Activity size={48} />}
                {activeTab === 'Rewards' && <Award size={48} />}
                {activeTab === 'Settings' && <Settings size={48} />}
              </div>
              <h3>{activeTab} Module</h3>
              <p>This module is coming soon in the next update.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
