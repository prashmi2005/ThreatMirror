import { useUser } from '../context/UserContext';
import { rewardsCatalog, getTier } from '../data/rewardsData';
import { Shield, Award, Gift, Lock } from 'lucide-react';
import styles from './Rewards.module.css';

export default function Rewards() {
  const { shieldCoins } = useUser();
  const tier = getTier(shieldCoins);

  return (
    <div className={`${styles.rewards} container`}>
      <header className={styles.header}>
        <div className="section-label">Redeem Your Coins</div>
        <h1 className="section-title">Shield Rewards</h1>
        <p className="section-subtitle">Turn your cybersecurity awareness into real-world perks.</p>
      </header>

      <div className={styles.simpleStats}>
        <div className={styles.statBox}>
          <Shield size={28} className={styles.goldIcon} />
          <div className={styles.statInfo}>
            <span className={styles.statVal}>{shieldCoins.toLocaleString()}</span>
            <span className={styles.statLabel}>Available Coins</span>
          </div>
        </div>
        <div className={styles.statBox}>
          <Award size={28} style={{ color: tier.color }} />
          <div className={styles.statInfo}>
            <span className={styles.statVal} style={{ color: tier.color }}>{tier.name}</span>
            <span className={styles.statLabel}>Current Rank</span>
          </div>
        </div>
      </div>

      <section className={styles.catalogSection}>
        <div className={styles.catalogGrid}>
          {rewardsCatalog.map(item => (
            <div key={item.id} className={styles.rewardCard}>
              <div className={styles.rewardTop}>
                <div className={styles.brandLogo} style={{ background: `${item.color}20`, color: item.color }}>
                  {item.brand[0]}
                </div>
                <span className={styles.categoryBadge}>{item.category}</span>
              </div>
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
                >
                  {shieldCoins < item.cost ? <><Lock size={14} /> Locked</> : 'Redeem Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className={styles.earningNote}>
        Want more coins? Complete your weekly training and spot threats in your inbox.
      </div>
    </div>
  );
}
