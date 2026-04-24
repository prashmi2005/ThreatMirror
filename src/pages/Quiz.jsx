import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, RotateCcw, Shield } from 'lucide-react';
import { quizzes, triggerDescriptions } from '../data/quizData';
import { useScrollAnimation } from '../hooks/useAnimations';
import styles from './Quiz.module.css';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} animate-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Quiz() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [finished, setFinished] = useState(false);

  const roles = Object.keys(quizzes);
  const quiz = selectedRole ? quizzes[selectedRole] : null;
  const question = quiz ? quiz.questions[currentQ] : null;

  const handleAnswer = (isPhishing) => {
    const correct = isPhishing === question.isPhishing;
    setLastAnswer({ correct, isPhishing });
    setAnswers(prev => [...prev, { questionId: question.id, correct, trigger: question.trigger }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setLastAnswer(null);
    if (currentQ + 1 >= quiz.questions.length) {
      setFinished(true);
    } else {
      setCurrentQ(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setSelectedRole(null);
    setCurrentQ(0);
    setAnswers([]);
    setShowFeedback(false);
    setLastAnswer(null);
    setFinished(false);
  };

  const score = answers.filter(a => a.correct).length;
  const total = answers.length;
  const scorePercent = total > 0 ? Math.round((score / total) * 100) : 0;

  // Build vulnerability profile from wrong answers
  const vulnerabilities = {};
  answers.forEach(a => {
    if (!a.correct && a.trigger) {
      const triggers = a.trigger.split('+').map(t => t.trim().toLowerCase().replace(/ /g, ''));
      triggers.forEach(t => {
        const key = t.replace('fearofloss', 'fearOfLoss').replace('socialproof', 'socialProof');
        vulnerabilities[key] = (vulnerabilities[key] || 0) + 1;
      });
    }
  });

  const allTriggers = ['urgency', 'authority', 'curiosity', 'familiarity', 'fearOfLoss', 'socialProof'];
  const maxVuln = Math.max(...allTriggers.map(t => vulnerabilities[t] || 0), 1);

  const getScoreColor = () => {
    if (scorePercent >= 80) return 'var(--accent-green)';
    if (scorePercent >= 60) return 'var(--accent-orange)';
    return 'var(--accent-red)';
  };

  const getVulnColor = (val) => {
    const ratio = val / maxVuln;
    if (ratio > 0.7) return 'var(--accent-red)';
    if (ratio > 0.3) return 'var(--accent-orange)';
    return 'var(--accent-green)';
  };

  return (
    <div className={`${styles.quiz} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Security Quiz</div>
        <h1 className="section-title">Can you spot the phishing?</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Choose your role and test yourself with realistic email scenarios.
          See which psychological triggers you're most vulnerable to.
        </p>
      </AnimatedSection>

      {/* Role Selection */}
      {!selectedRole && (
        <div className={styles.roleGrid}>
          {roles.map((key, idx) => (
            <AnimatedSection key={key} delay={idx * 100}>
              <div
                className={styles.roleCard}
                onClick={() => setSelectedRole(key)}
              >
                <span className={styles.roleEmoji}>{quizzes[key].icon}</span>
                <span className={styles.roleName}>{quizzes[key].role}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}

      {/* Quiz Active */}
      {selectedRole && !finished && question && (
        <div className={styles.quizActive}>
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${((currentQ + (showFeedback ? 1 : 0)) / quiz.questions.length) * 100}%` }} />
            </div>
            <span className={styles.progressText}>{currentQ + 1}/{quiz.questions.length}</span>
          </div>

          <div className={styles.emailCard}>
            <div className={styles.emailHeader}>
              <div className={styles.emailSubject}>{question.subject}</div>
              <div className={styles.emailMeta}>
                <span className={styles.emailFrom}><strong>From:</strong> {question.sender}</span>
              </div>
            </div>
            <div className={styles.emailBody}>{question.body}</div>
          </div>

          {!showFeedback && (
            <div className={styles.answers}>
              <button className={`${styles.answerBtn} ${styles.safeBtn}`} onClick={() => handleAnswer(false)}>
                <CheckCircle size={18} /> This is Safe
              </button>
              <button className={`${styles.answerBtn} ${styles.phishBtn}`} onClick={() => handleAnswer(true)}>
                <AlertTriangle size={18} /> This is Phishing
              </button>
            </div>
          )}

          {showFeedback && lastAnswer && (
            <div className={`${styles.feedback} ${lastAnswer.correct ? styles.feedbackCorrect : styles.feedbackWrong}`}>
              <div className={styles.feedbackHeader} style={{ color: lastAnswer.correct ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {lastAnswer.correct ? <><CheckCircle size={20} /> Nice catch!</> : <><XCircle size={20} /> That was a tricky one</>}
              </div>
              <p className={styles.feedbackDesc}>{question.explanation}</p>

              {question.flags.length > 0 && (
                <div className={styles.flagsList}>
                  {question.flags.map((flag, i) => (
                    <div key={i} className={styles.flag}>
                      <AlertTriangle size={12} /> {flag}
                    </div>
                  ))}
                </div>
              )}

              {question.trigger && (
                <div>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginRight: 8 }}>Psychological trigger:</span>
                  <span className={styles.triggerBadge}>{question.trigger}</span>
                </div>
              )}

              <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleNext}>
                {currentQ + 1 >= quiz.questions.length ? 'See Results' : 'Next Question'} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {finished && (
        <div className={styles.results}>
          <div className={styles.scoreCircle} style={{ borderColor: getScoreColor() }}>
            <span className={styles.scoreNum} style={{ color: getScoreColor() }}>{score}/{total}</span>
            <span className={styles.scoreLabel}>correct</span>
          </div>

          <h2 className={styles.resultTitle}>
            {scorePercent >= 80 ? '🎉 Excellent awareness!' :
             scorePercent >= 60 ? '👍 Good, but room to improve' :
             '🎯 Great learning opportunity'}
          </h2>
          <p className={styles.resultDesc}>
            {scorePercent >= 80
              ? "You've got a sharp eye for phishing. Keep it up — attackers evolve every day."
              : scorePercent >= 60
              ? "You caught most of them, but some tricky ones slipped through. Here's what to watch for."
              : "Don't worry — these are realistic scenarios that fool experienced professionals. Here's what you learned today."}
          </p>

          {/* Vulnerability Profile (Private) */}
          {Object.keys(vulnerabilities).length > 0 && (
            <div className={styles.vulnSection}>
              <h3 className={styles.vulnTitle}>
                <Shield size={16} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
                Your Vulnerability Profile (Private — only you see this)
              </h3>
              <div className={styles.vulnGrid}>
                {allTriggers.map(trigger => {
                  const val = vulnerabilities[trigger] || 0;
                  const percent = maxVuln > 0 ? (val / maxVuln) * 100 : 0;
                  const label = trigger.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                  return (
                    <div key={trigger} className={styles.vulnRow}>
                      <span className={styles.vulnLabel}>{label}</span>
                      <div className={styles.vulnBar}>
                        <div className={styles.vulnFill} style={{ width: `${percent}%`, background: getVulnColor(val) }} />
                      </div>
                      <span className={styles.vulnValue} style={{ color: getVulnColor(val) }}>{val > 0 ? 'Vulnerable' : 'Strong'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.privacyNote}>
            🔒 In the full version, this quiz is built from emails you actually received that week.
            No email content is ever stored or shared. All analysis happens on your device.
          </div>

          <div className={styles.actions}>
            <button className="btn btn-secondary" onClick={handleRestart}>
              <RotateCcw size={14} /> Try Another Role
            </button>
            <Link to="/onboard" className="btn btn-primary">
              Start Onboarding <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
