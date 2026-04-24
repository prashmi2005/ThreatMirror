import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, BookOpen, AlertTriangle, BarChart2, 
  Settings, Award, Mail, Menu, X, ChevronRight, 
  TrendingUp, Activity, Bell, FileText, CheckCircle,
  LogOut, Home as HomeIcon
} from 'lucide-react';
import { overviewData, teamData } from '../data/dashboardData';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNames, setShowNames] = useState(false);

  const tabs = [
    { id: 'Overview', icon: BarChart2 },
    { id: 'Teams', icon: Users },
    { id: 'Settings', icon: Settings },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <Shield size={24} color="var(--accent-gold)" />
          {sidebarOpen && <span className={styles.brandName}>Admin Panel</span>}
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

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.navItem}>
            <HomeIcon size={20} />
            {sidebarOpen && <span>Main Site</span>}
          </Link>
          <button className={styles.navItem}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.contentHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <h2>{activeTab}</h2>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.adminUser}>
              <div className={styles.adminAvatar}>AD</div>
              <span>Admin Mode</span>
            </div>
          </div>
        </header>

        <div className={styles.scrollArea}>
          {activeTab === 'Overview' && (
            <div className={styles.tabContent}>
              <div className={styles.topRow}>
                <div className={styles.scoreCard}>
                  <h3>Org Security Score</h3>
                  <div className={styles.scoreValue}>{overviewData.orgScore}</div>
                  <div className={styles.scoreBar}><div className={styles.scoreFill} style={{ width: `${overviewData.orgScore}%`, background: overviewData.orgScore > 70 ? 'var(--accent-green)' : 'var(--accent-orange)' }} /></div>
                  <p>Average safety rating across 4 departments</p>
                </div>

                <div className={styles.kpiGrid}>
                  {overviewData.metrics.map((metric, i) => (
                    <div key={i} className={styles.kpiCard}>
                      <div className={styles.kpiValue}>{metric.value}</div>
                      <div className={styles.kpiLabel}>{metric.label}</div>
                      <div className={styles.kpiChange} style={{ color: metric.change.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)' }}>{metric.change} this month</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.tableSection}>
                <h3>Department Performance</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Employees</th>
                        <th>Completion</th>
                        <th>Risk Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overviewData.departmentBreakdown.map((dept, i) => (
                        <tr key={i}>
                          <td>{dept.dept}</td>
                          <td>{dept.employees}</td>
                          <td>{dept.completion}%</td>
                          <td>
                            <span className={styles.scoreBadge} style={{ 
                              color: dept.score > 80 ? 'var(--accent-green)' : 'var(--accent-orange)'
                            }}>
                              {dept.score}/100
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Teams' && (
            <div className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <h3>Employee Risk Assessment</h3>
                <button className={styles.toggleBtn} onClick={() => setShowNames(!showNames)}>
                  {showNames ? 'Privacy Mode ON' : 'Show Full Names'}
                </button>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Risk Level</th>
                      <th>Coins</th>
                      <th>Last Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.map((emp) => (
                      <tr key={emp.id}>
                        <td>{showNames ? emp.name : `User #${emp.id}`}</td>
                        <td>
                          <span className={`${styles.badge} ${styles[emp.risk.toLowerCase()]}`}>
                            {emp.risk}
                          </span>
                        </td>
                        <td>{emp.points}</td>
                        <td>{emp.lastActive}</td>
                        <td><button className={styles.nudgeBtn}>Nudge</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'Settings' && (
            <div className={styles.stub}>
              <h3>Admin Settings</h3>
              <p>Configure organization-wide security policies and reward tiers.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
