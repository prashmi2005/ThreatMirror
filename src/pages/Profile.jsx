import { useUser } from '../context/UserContext';
import { Shield, Award, User, Target, TrendingUp } from 'lucide-react';
import { getTier } from '../data/rewardsData';
import styles from './Profile.module.css';

export default function Profile() {
  const { userProfile, shieldCoins } = useUser();
  const tier = getTier(shieldCoins);

  return (
    <div className={`${styles.profileContainer} container`}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <User size={48} />
          </div>
          <div className={styles.badge} style={{ color: tier.color }}>
            <Award size={16} /> {tier.name}
          </div>
        </div>
        <div className={styles.userInfo}>
          <h1>{userProfile.name}</h1>
          <p>{userProfile.role} • {userProfile.department} Department</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Shield size={24} /></div>
          <div className={styles.statValue}>{shieldCoins}</div>
          <div className={styles.statLabel}>ShieldCoins</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Target size={24} /></div>
          <div className={styles.statValue}>84%</div>
          <div className={styles.statLabel}>Safety Score</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><TrendingUp size={24} /></div>
          <div className={styles.statValue}>Lv. 4</div>
          <div className={styles.statLabel}>Current Level</div>
        </div>
      </div>

      <div className={styles.passportSection}>
        <div className={styles.sectionHeader}>
          <Shield size={20} />
          <h2>Security Passport</h2>
        </div>
        
        <div className={styles.passportCard}>
          <div className={styles.passportInner}>
            <div className={styles.passportLine}>
              <span className={styles.fieldLabel}>Profile Status</span>
              <span className={styles.fieldValue} style={{ color: 'var(--accent-green)' }}>Verified Defender</span>
            </div>
            <div className={styles.passportLine}>
              <span className={styles.fieldLabel}>Top Vulnerability</span>
              <span className={styles.fieldValue}>Authority Triggers</span>
            </div>
            <div className={styles.passportLine}>
              <span className={styles.fieldLabel}>Training Mode</span>
              <span className={styles.fieldValue}>{userProfile.comfortLevel.toUpperCase()}</span>
            </div>
            <div className={styles.passportLine}>
              <span className={styles.fieldLabel}>Issue Date</span>
              <span className={styles.fieldValue}>{new Date().toLocaleDateString()}</span>
            </div>
            <div className={styles.barcode} />
          </div>
        </div>
      </div>
    </div>
  );
}
