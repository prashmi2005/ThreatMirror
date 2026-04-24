import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, RotateCcw, Shield } from 'lucide-react';
import { quizzes, triggerDescriptions } from '../data/quizData';
import { useScrollAnimation } from '../hooks/useAnimations';
import { useUser } from '../context/UserContext';
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
  const { userProfile } = useUser();
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
  const topWeakness = allTriggers.reduce((a, b) => (vulnerabilities[a] || 0) > (vulnerabilities[b] || 0) ? a : b);

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`${styles.quiz} container`}>
      <AnimatedSection className={styles.header}>
        <div className="section-label">Security Quiz</div>
        <h1 className="section-title">Can you spot the phishing?</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Choose your role and test yourself with realistic email scenarios.
        </p>
      </AnimatedSection>

      {!selectedRole && (
        <div className={styles.roleGrid}>
          {roles.map((key, idx) => (
            <AnimatedSection key={key} delay={idx * 100}>
              <div className={styles.roleCard} onClick={() => setSelectedRole(key)}>
                <span className={styles.roleEmoji}>{quizzes[key].icon}</span>
                <span className={styles.roleName}>{quizzes[key].role}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}

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
              <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleNext}>
                {currentQ + 1 >= quiz.questions.length ? 'See Results' : 'Next Question'} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className={styles.results}>
          <div className={styles.scoreCircle} style={{ borderColor: getScoreColor() }}>
            <span className={styles.scoreNum} style={{ color: getScoreColor() }}>{score}/{total}</span>
            <span className={styles.scoreLabel}>correct</span>
          </div>

          <h2 className={styles.resultTitle}>
            {scorePercent >= 80 ? '🎉 Excellent awareness!' : '🎯 Learning opportunity'}
          </h2>

          <div className={styles.passportContainer}>
            <div className={styles.passport} id="security-passport">
              <div className={styles.passportHeader}>
                <Shield size={24} color="var(--accent-gold)" />
                <div className={styles.passportTitle}>
                  <h3>SECURITY PASSPORT</h3>
                  <span>ThreatMirror Intelligence System</span>
                </div>
              </div>
              <div className={styles.passportBody}>
                <div className={styles.passportField}>
                  <label>NAME</label>
                  <div>{userProfile.name}</div>
                </div>
                <div className={styles.passportField}>
                  <label>ROLE</label>
                  <div>{userProfile.role}</div>
                </div>
                <div className={styles.passportField}>
                  <label>VULNERABILITY SCORE</label>
                  <div style={{ color: getScoreColor() }}>{100 - scorePercent}%</div>
                </div>
                <div className={styles.passportField}>
                  <label>TOP TRIGGER</label>
                  <div>{topWeakness.toUpperCase()}</div>
                </div>
                <div className={styles.passportField}>
                  <label>TIER</label>
                  <div className={styles.tierBadge}>{userProfile.tier}</div>
                </div>
                <div className={styles.passportField}>
                  <label>DATE</label>
                  <div>{new Date().toLocaleDateString()}</div>
                </div>
              </div>
              <div className={styles.passportFooter}>
                <div className={styles.barcode} />
                <span>AUTHORIZED BY THREATMIRROR AI</span>
              </div>
            </div>
            <button className={styles.printBtn} onClick={handlePrint}>
              Download / Print Passport
            </button>
          </div>

          <div className={styles.actions}>
            <button className="btn btn-secondary" onClick={handleRestart}>
              <RotateCcw size={14} /> Try Another Role
            </button>
            <Link to="/onboard" className="btn btn-primary">
              Update Profile <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
