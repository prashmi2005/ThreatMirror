import { useUser } from '../context/UserContext';
import { rewardsCatalog, transactionHistory, getTier } from '../data/rewardsData';
import { Shield, Award, Gift, Clock, ChevronRight, Lock } from 'lucide-react';
import styles from './Rewards.module.css';

export default function Rewards() {
  const { shieldCoins } = useUser();
  const tier = getTier(shieldCoins);

  const nextTierProgress = tier.next 
    ? ((shieldCoins - (tier.name === 'Recruit' ? 0 : tier.name === 'Defender' ? 500 : 1500)) / 
       (tier.next - (tier.name === 'Recruit' ? 0 : tier.name === 'Defender' ? 500 : 1500))) * 100
    : 100;

  return (
    <div className={`${styles.rewards} container`}>
      <header className={styles.header}>
        <div className="section-label">Rewards & Gamification</div>
        <h1 className="section-title">Your Shield Rewards</h1>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.balanceCard}>
          <div className={styles.cardIcon}><Shield size={32} /></div>
          <div className={styles.balanceInfo}>
            <div className={styles.balanceValue}>{shieldCoins.toLocaleString()}</div>
            <div className={styles.balanceLabel}>Available ShieldCoins</div>
          </div>
        </div>

        <div className={styles.tierCard}>
          <div className={styles.tierHeader}>
            <div className={styles.tierInfo}>
              <div className={styles.tierName} style={{ color: tier.color }}>{tier.name}</div>
              <div className={styles.tierLabel}>Current Rank</div>
            </div>
            <Award size={32} style={{ color: tier.color }} />
          </div>
          {tier.next && (
            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${nextTierProgress}%`, background: tier.color }} />
              </div>
              <div className={styles.progressMeta}>
                {tier.next - shieldCoins} more to next tier
              </div>
            </div>
          )}
        </div>
      </div>

      <section className={styles.catalogSection}>
        <div className={styles.sectionHeader}>
          <Gift size={20} />
          <h2>Rewards Catalog</h2>
        </div>
        <div className={styles.catalogGrid}>
          {rewardsCatalog.map(item => (
            <div key={item.id} className={styles.rewardCard}>
              <div className={styles.brandLogo} style={{ background: `${item.color}20`, color: item.color }}>
                {item.brand[0]}
              </div>
              <span className={styles.categoryBadge}>{item.category}</span>
              <h3 className={styles.rewardName}>{item.name}</h3>
              <p className={styles.rewardDesc}>{item.desc}</p>
              <div className={styles.rewardFooter}>
                <div className={styles.cost}>
                  <Shield size={14} />
                  {item.cost}
                </div>
                <button 
                  className={styles.redeemBtn}
                  disabled={shieldCoins < item.cost}
                  title={shieldCoins < item.cost ? `Earn ${item.cost - shieldCoins} more ShieldCoins` : 'Redeem Now'}
                >
                  {shieldCoins < item.cost ? <Lock size={14} /> : 'Redeem'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.historySection}>
        <div className={styles.sectionHeader}>
          <Clock size={20} />
          <h2>Transaction History</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Action</th>
                <th>Points</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.action}</td>
                  <td className={styles.pointsEarned}>+{tx.points}</td>
                  <td>{tx.date}</td>
                  <td><span className={styles.statusBadge}>Completed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
