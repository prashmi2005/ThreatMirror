import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import styles from './AiCoach.module.css';

export default function AiCoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi there! I\'m your ThreatMirror Coach.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [hasStartedInteractive, setHasStartedInteractive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasStartedInteractive) {
      setHasStartedInteractive(true);
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          id: 2, 
          type: 'bot', 
          text: 'I noticed you struggled with identifying "Urgency" triggers in your onboarding quiz. Want to do a quick 30-second review?' 
        }]);
        setShowOptions(true);
      }, 1500);
    }
  }, [isOpen, hasStartedInteractive]);

  const handleOptionClick = (option) => {
    setShowOptions(false);
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: option }]);
    setIsTyping(true);

    if (option === 'Yes, let\'s review') {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          type: 'bot', 
          text: 'Great! "Urgency" is a psychological trigger attackers use to make you panic and skip verification.' 
        }]);
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            id: Date.now(), 
            type: 'bot', 
            text: 'Rule of thumb: If an email demands action within 24 hours (like an account suspension), ALWAYS pause and check the sender domain. You\'ve got this! 🛡️' 
          }]);
        }, 2000);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          type: 'bot', 
          text: 'No problem! I\'ll be right here whenever you need me. Stay safe out there!' 
        }]);
      }, 1000);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userText }]);
    
    setIsTyping(true);
    
    // Simulate generic AI response for free-text input
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        type: 'bot', 
        text: "That's a great question! Since this is a prototype, my open-chat capabilities are limited. But in the full version, I analyze your specific data to give you personalized coaching on that exact topic!" 
      }]);
    }, 1500);
  };

  return (
    <div className={styles.coachContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.headerIcon}>
                <Bot size={24} />
              </div>
              <div>
                <div className={styles.headerTitle}>ThreatMirror Coach</div>
                <div className={styles.headerStatus}>
                  <div className={styles.headerStatusDot} />
                  Online
                </div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${msg.type === 'bot' ? styles.messageBot : styles.messageUser}`}>
                <div className={styles.bubble}>{msg.text}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot} />
                <div className={styles.typingDot} />
                <div className={styles.typingDot} />
              </div>
            )}

            {showOptions && !isTyping && (
              <div className={styles.actionChips}>
                <button className={styles.chip} onClick={() => handleOptionClick('Yes, let\'s review')}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-top' }}/> 
                  Yes, let's review
                </button>
                <button className={styles.chip} onClick={() => handleOptionClick('Maybe later')}>
                  Maybe later
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInput} onSubmit={handleSendMessage}>
            <input 
              type="text" 
              className={styles.inputField} 
              placeholder="Ask me anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn} disabled={!inputValue.trim()} style={{ opacity: inputValue.trim() ? 1 : 0.5 }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <div className={styles.fab} onClick={() => setIsOpen(true)}>
          <Bot size={28} />
          {!hasStartedInteractive && <div className={styles.fabBadge} />}
        </div>
      )}
    </div>
  );
}
