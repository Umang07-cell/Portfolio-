import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';
import { profile } from '../../data/content'; // Assuming this exists, I'll check what's in there or just hardcode if it doesn't

const INITIAL_MESSAGES = [
  { id: 1, text: "Hi there! 👋 I'm Umang's AI assistant.", sender: 'bot' },
  { id: 2, text: "I can answer questions about his skills, experience, or projects. What would you like to know?", sender: 'bot' },
];

const PREDEFINED_RESPONSES = {
  skills: "Umang specializes in AI Engineering, Data Science, and Machine Learning Systems. He's highly proficient in Python, PyTorch, and deploying models to production.",
  experience: "He has experience building live AI systems, processing hundreds of thousands of client records, and has published research in ML.",
  projects: "Some of his notable work includes AI agents, generative models, and scalable backend systems. Scroll down to check out the Projects section!",
  contact: "You can reach out to him via email or connect on LinkedIn. Check the contact section at the bottom!",
  default: "That's an interesting question! While I'm just a simple bot right now, Umang is always open to chatting. Feel free to contact him directly!"
};

export default function Chatbot() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newUserMsg = { id: Date.now(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      let botResponse = PREDEFINED_RESPONSES.default;
      const lowerText = userText.toLowerCase();
      
      if (lowerText.includes('skill') || lowerText.includes('stack') || lowerText.includes('tech')) {
        botResponse = PREDEFINED_RESPONSES.skills;
      } else if (lowerText.includes('experience') || lowerText.includes('work') || lowerText.includes('job')) {
        botResponse = PREDEFINED_RESPONSES.experience;
      } else if (lowerText.includes('project') || lowerText.includes('build') || lowerText.includes('made')) {
        botResponse = PREDEFINED_RESPONSES.projects;
      } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('hire')) {
        botResponse = PREDEFINED_RESPONSES.contact;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="chatbot-fab"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-container chatbot-floating"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-avatar">
                <div className="chatbot-avatar-inner">🤖</div>
                <div className="chatbot-status-dot"></div>
              </div>
              <div className="chatbot-header-info">
                <h4>Umang AI</h4>
                <span>Online</span>
              </div>
              <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

      {/* Messages Area */}
      <div className="chatbot-messages">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`chatbot-message-wrapper ${msg.sender === 'user' ? 'chatbot-message-wrapper--user' : 'chatbot-message-wrapper--bot'}`}
            >
              {msg.sender === 'bot' && (
                <div className="chatbot-message-avatar">🤖</div>
              )}
              <div className={`chatbot-message ${msg.sender === 'user' ? 'chatbot-message--user' : 'chatbot-message--bot'}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="chatbot-message-wrapper chatbot-message-wrapper--bot"
            >
              <div className="chatbot-message-avatar">🤖</div>
              <div className="chatbot-message chatbot-message--bot chatbot-typing">
                <span></span><span></span><span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form className="chatbot-input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          className="chatbot-input"
        />
        <button 
          type="submit" 
          className="chatbot-send-btn"
          disabled={!inputValue.trim() || isTyping}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </motion.div>
    )}
    </AnimatePresence>
  </>
  );
}
