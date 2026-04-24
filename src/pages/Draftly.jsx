import { useState, useEffect } from 'react';
import { Send, Shield, CheckCircle, AlertCircle, Eye, RefreshCw, Lock, Sparkles } from 'lucide-react';
import styles from './Draftly.module.css';

export default function Draftly() {
  const [step, setStep] = useState('compose'); // compose, audit, success
  const [draft, setDraft] = useState('');
  const [subject, setSubject] = useState('');
  const [auditResults, setAuditResults] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = () => {
    setIsAuditing(true);
    // Simulated AI Audit Logic
    setTimeout(() => {
      setAuditResults({
        tone: 'Professional but slightly informal',
        riskScore: draft.includes('pricing') || draft.includes('password') ? 85 : 12,
        findings: [
          { type: 'privacy', label: 'Potential Data Leak', text: 'You mentioned "Pricing Sheet". This requires manager sign-off.', severity: 'high' },
          { type: 'tone', label: 'Clarity Improvement', text: 'Change "I was wondering if" to "I am writing to" for better credibility.', severity: 'low' }
        ],
        suggested: draft.replace('I was wondering if', 'I am writing to')
      });
      setIsAuditing(false);
      setStep('audit');
    }, 2000);
  };

  return (
    <div className={styles.draftlyContainer}>
      <div className={styles.sidebar}>
        <div className={styles.brand}>
          <Sparkles className={styles.draftlyIcon} />
          <h1>Draftly</h1>
          <span>Secure Outbound Bridge</span>
        </div>
        
        <nav className={styles.sideNav}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <Send size={18} /> New Draft
          </div>
          <div className={styles.navItem}>
            <Clock size={18} /> Sent Pending
          </div>
          <div className={styles.navItem}>
            <CheckCircle size={18} /> Approved
          </div>
        </nav>

        <div className={styles.userCard}>
          <div className={styles.avatar}>PS</div>
          <div>
            <div className={styles.userName}>Priya Sharma</div>
            <div className={styles.userRole}>Growth Intern</div>
          </div>
        </div>
      </div>

      <main className={styles.mainArea}>
        {step === 'compose' && (
          <div className={styles.composerWrapper}>
            <header className={styles.mainHeader}>
              <div>
                <h2>Create Professional Draft</h2>
                <p>Your email will be audited by AI and approved by your manager before sending.</p>
              </div>
              <div className={styles.privacyBadge}>
                <Lock size={14} /> Domain Privacy Enabled
              </div>
            </header>

            <div className={styles.editorCard}>
              <div className={styles.field}>
                <label>Recipient</label>
                <input type="text" placeholder="client@enterprise.com" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g., Q3 Project Update" 
                  className={styles.input}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className={styles.bodyField}>
                <textarea 
                  placeholder="Type your email here..."
                  className={styles.textarea}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.auditBtn} 
                disabled={!draft || isAuditing}
                onClick={handleAudit}
              >
                {isAuditing ? <RefreshCw size={18} className={styles.spin} /> : <Shield size={18} />}
                {isAuditing ? 'Auditing Content...' : 'Submit for AI Audit'}
              </button>
            </div>
          </div>
        )}

        {step === 'audit' && (
          <div className={styles.auditWrapper}>
            <header className={styles.mainHeader}>
              <div>
                <h2>AI Audit Results</h2>
                <p>Review the findings before submitting to your manager.</p>
              </div>
              <button className={styles.backBtn} onClick={() => setStep('compose')}>Edit Draft</button>
            </header>

            <div className={styles.auditGrid}>
              <div className={styles.findingsPanel}>
                <h3>Critical Observations</h3>
                {auditResults.findings.map((f, i) => (
                  <div key={i} className={`${styles.findingCard} ${styles[f.severity]}`}>
                    <div className={styles.findingHeader}>
                      <AlertCircle size={16} />
                      <span>{f.label}</span>
                    </div>
                    <p>{f.text}</p>
                  </div>
                ))}
                
                <div className={styles.scoreCard}>
                  <div className={styles.scoreCircle} style={{ borderColor: auditResults.riskScore > 50 ? '#ff4d4d' : '#00e5ff' }}>
                    {auditResults.riskScore}
                  </div>
                  <div className={styles.scoreMeta}>
                    <h4>Risk Probability</h4>
                    <p>Calculated based on data governance policies.</p>
                  </div>
                </div>
              </div>

              <div className={styles.comparisonPanel}>
                <h3>Suggested Optimization</h3>
                <div className={styles.diffView}>
                  <div className={styles.diffSection}>
                    <label>Original</label>
                    <div className={styles.diffContent}>{draft}</div>
                  </div>
                  <div className={styles.diffSection}>
                    <label>Draftly Optimized</label>
                    <div className={styles.diffContentHighlight}>{auditResults.suggested}</div>
                  </div>
                </div>
                <button className={styles.submitBtn} onClick={() => setStep('success')}>
                  Submit for Manager Approval <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className={styles.successView}>
            <div className={styles.successIcon}><CheckCircle size={64} /></div>
            <h2>Draft Submitted!</h2>
            <p>Your manager (Rohit V.) has been notified to review and release your email.</p>
            <div className={styles.successMeta}>
              Tracking ID: DRF-99281-X
            </div>
            <button className={styles.auditBtn} onClick={() => {setStep('compose'); setDraft(''); setSubject('');}}>
              Create Another Draft
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
