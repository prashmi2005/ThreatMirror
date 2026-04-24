import { useState, useEffect } from 'react';
import styles from './Bootloader.module.css';

export default function Bootloader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Cinematic timing sequences
    const t1 = setTimeout(() => setPhase(1), 800); // 0.8s
    const t2 = setTimeout(() => setPhase(2), 1800); // 1.8s
    const t3 = setTimeout(() => setFadeOut(true), 2800); // 2.8s initiates fade out
    const t4 = setTimeout(() => onComplete(), 3400); // 3.4s unmounts the component

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.bootloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.line}>
            <span className={styles.prefix}>&gt;</span>
            <span className={styles.typing}>INITIALIZING SECURE UPLINK...</span>
          </div>
          
          {phase >= 1 && (
            <div className={styles.line}>
              <span className={styles.prefix}>&gt;</span>
              <span className={styles.typing}>AUTHENTICATING ROLE PROTOCOLS...</span>
            </div>
          )}
          
          {phase >= 2 && (
            <div className={styles.line}>
              <span className={styles.prefix}>&gt;</span>
              <span className={`${styles.typing} ${styles.gold}`}>[ ACCESS GRANTED ]</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
