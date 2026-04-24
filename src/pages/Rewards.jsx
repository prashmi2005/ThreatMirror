import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { rewardsCatalog, transactionHistory, getTier } from '../data/rewardsData';
import { Shield, Award, Gift, Clock, Lock, CheckCircle2, ShoppingBag } from 'lucide-react';
import styles from './Rewards.module.css';

export default function Rewards() {
  const { shieldCoins } = useUser();
  const [redeemedId, setRedeemedId] = useState(null);
  const tier = getTier(shieldCoins);

  const handleRedeem = (id) => {
    setRedeemedId(id);
    setTimeout(() => setRedeemedId(null), 3000);
  };

  const nextTierProgress = tier.next 
    ? ((shieldCoins - (tier.name === 'Recruit' ? 0 : tier.name === 'Defender' ? 500 : 1500)) / 
       (tier.next - (tier.name === 'Recruit' ? 0 : tier.name === 'Defender' ? 500 : 1500))) * 100
    : 100;

  return (
    <div className={`${styles.rewards} container`}>
      <header className={styles.header}>
        <div className="section-label">Rewards Program</div>
        <h1 className="section-title">Shield Store</h1>
        <p className="section-subtitle">Redeem your hard-earned coins for exclusive partner vouchers.</p>
      </header>

      <div className={styles.topHud}>
        <div className={styles.mainBalance}>
          <div className={styles.coinRing}>
            <Shield size={40} className={styles.goldIcon} />
            <div className={styles.balanceText}>
              <span className={styles.amount}>{shieldCoins.toLocaleString()}</span>
              <span className={styles.currency}>ShieldCoins</span>
            </div>
          </div>
          <div className={styles.tierStatus}>
            <div className={styles.tierHeader}>
              <span className={styles.tierName} style={{ color: tier.color }}>{tier.name}</span>
              <Award size={20} style={{ color: tier.color }} />
            </div>
            {tier.next && (
              <div className={styles.miniProgress}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressThumb} style={{ width: `${nextTierProgress}%`, background: tier.color }} />
                </div>
                <span>{tier.next - shieldCoins} coins to next rank</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className={styles.catalogSection}>
        <div className={styles.catalogHeader}>
          <ShoppingBag size={20} />
          <h2>Available Vouchers</h2>
        </div>
        <div className={styles.catalogGrid}>
          {rewardsCatalog.map(item => (
            <div key={item.id} className={`${styles.voucherCard} ${shieldCoins < item.cost ? styles.locked : ''}`}>
              <div className={styles.voucherMain} style={{ borderLeft: `4px solid ${item.color}` }}>
                <div className={styles.brandInfo}>
                  <div className={styles.brandIcon} style={{ background: `${item.color}15`, color: item.color }}>
                    {item.brand[0]}
                  </div>
                  <div>
                    <div className={styles.brandName}>{item.brand}</div>
                    <div className={styles.voucherTitle}>{item.name}</div>
                  </div>
                </div>
                <p className={styles.voucherDesc}>{item.desc}</p>
                <div className={styles.voucherPrice}>
                  <Shield size={14} />
                  <span>{item.cost}</span>
                </div>
              </div>
              <div className={styles.voucherSide}>
                <div className={styles.stubLine} />
                <button 
                  className={styles.actionBtn}
                  disabled={shieldCoins < item.cost || redeemedId === item.id}
                  onClick={() => handleRedeem(item.id)}
                >
                  {redeemedId === item.id ? (
                    <CheckCircle2 size={20} />
                  ) : shieldCoins < item.cost ? (
                    <Lock size={18} />
                  ) : (
                    'Redeem'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.historySection}>
        <div className={styles.catalogHeader}>
          <Clock size={20} />
          <h2>Earnings History</h2>
        </div>
        <div className={styles.historyList}>
          {transactionHistory.map(tx => (
            <div key={tx.id} className={styles.historyItem}>
              <div className={styles.txInfo}>
                <div className={styles.txAction}>{tx.action}</div>
                <div className={styles.txDate}>{tx.date}</div>
              </div>
              <div className={styles.txPoints}>+{tx.points}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
