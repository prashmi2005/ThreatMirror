import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, Shield, AlertTriangle, HelpCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import styles from './AiCoach.module.css';

export default function AiCoach() {
  const { userProfile, shieldCoins } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: `Hi ${userProfile.name}! I'm your ThreatMirror Coach. Ready to level up your security?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (option) => {
    setShowOptions(false);
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: option }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let response = '';
      
      if (option === 'Check this email') {
        response = "Paste the subject line or sender address here, and I'll analyze it against known patterns in the " + userProfile.department + " sector.";
      } else if (option === 'Explain my triggers') {
        response = `Based on your profile, you're currently in ${userProfile.comfortLevel} mode. We focus on ${userProfile.department}-specific threats. Your biggest trigger to watch out for is 'Authority' — when an email seems to come from a senior executive.`;
      } else if (option === 'How to earn ShieldCoins?') {
        response = `You currently have ${shieldCoins} ShieldCoins! You earn them by: \n1. Completing weekly quizzes (+50)\n2. Spotting real threats (+150)\n3. Maintaining a streak (+100). Keep going!`;
      } else {
        response = "I'm here to help. What else would you like to know about cybersecurity?";
      }

      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: response }]);
      setTimeout(() => setShowOptions(true), 1000);
    }, 1200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        type: 'bot', 
        text: "Analyzing... 🛡️ In the full version, I'd cross-reference this with our global threat database. For now, remember: when in doubt, check the sender's full email address (not just the name)!" 
      }]);
      setTimeout(() => setShowOptions(true), 1000);
    }, 1500);
  };

  return (
    <div className={styles.coachContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.headerIcon}><Bot size={24} /></div>
              <div>
                <div className={styles.headerTitle}>AI Security Coach</div>
                <div className={styles.headerStatus}><div className={styles.headerStatusDot} /> Online</div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${msg.type === 'bot' ? styles.messageBot : styles.messageUser}`}>
                <div className={styles.bubble}>{msg.text}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot} /><div className={styles.typingDot} /><div className={styles.typingDot} />
              </div>
            )}

            {showOptions && !isTyping && (
              <div className={styles.actionChips}>
                <button className={styles.chip} onClick={() => handleOptionClick('Check this email')}>
                  <AlertTriangle size={12} /> Check email
                </button>
                <button className={styles.chip} onClick={() => handleOptionClick('Explain my triggers')}>
                  <Sparkles size={12} /> Explain triggers
                </button>
                <button className={styles.chip} onClick={() => handleOptionClick('How to earn ShieldCoins?')}>
                  <Shield size={12} /> Earn Coins
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInput} onSubmit={handleSendMessage}>
            <input 
              type="text" 
              className={styles.inputField} 
              placeholder="Ask a question..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn} disabled={!inputValue.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <div className={styles.fab} onClick={() => setIsOpen(true)}>
          <Bot size={28} />
          <div className={styles.fabBadge} />
        </div>
      )}
    </div>
  );
}
