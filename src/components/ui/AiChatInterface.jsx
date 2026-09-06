import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AiChatInterface.css';

const INITIAL_MESSAGES = [
  { 
    id: 1, 
    text: (
      <>
        👋 Hey there!<br/>I'm Umang's AI assistant.<br/><br/>Ask me anything about his skills, projects, experience, or just say hi!
      </>
    ), 
    sender: 'bot' 
  },
];

const SUGGESTIONS = [
  "What projects has Umang built?",
  "Tell me about FinSight",
  "What are his technical skills?",
  "What's his work experience?"
];

const PREDEFINED_RESPONSES = {
  skills: "Umang specializes in AI Engineering, Data Science, and Machine Learning Systems. He's highly proficient in Python, PyTorch, and deploying models to production.",
  experience: "He has experience building live AI systems, processing hundreds of thousands of client records, and has published research in ML.",
  projects: "Some of his notable work includes AI agents, generative models, and scalable backend systems like FinSight.",
  contact: "You can reach out to him via email or connect on LinkedIn. Check the contact section at the bottom!",
  default: "That's an interesting question! While I'm just a simple bot right now, Umang is always open to chatting. Feel free to contact him directly!"
};

export default function AiChatInterface() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textOrEvent) => {
    let userText = '';
    
    if (typeof textOrEvent === 'string') {
      userText = textOrEvent;
    } else {
      textOrEvent?.preventDefault();
      userText = inputValue;
    }

    if (!userText.trim()) return;

    setShowSuggestions(false);
    const newUserMsg = { id: Date.now(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = PREDEFINED_RESPONSES.default;
      const lowerText = userText.toLowerCase();
      
      if (lowerText.includes('skill') || lowerText.includes('stack') || lowerText.includes('tech')) {
        botResponse = PREDEFINED_RESPONSES.skills;
      } else if (lowerText.includes('experience') || lowerText.includes('work') || lowerText.includes('job')) {
        botResponse = PREDEFINED_RESPONSES.experience;
      } else if (lowerText.includes('project') || lowerText.includes('build') || lowerText.includes('made') || lowerText.includes('finsight')) {
        botResponse = PREDEFINED_RESPONSES.projects;
      } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('hire')) {
        botResponse = PREDEFINED_RESPONSES.contact;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="ai-chat-side">
      <div className="ai-chat-window">
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-avatar">🤖</div>
          <div className="ai-chat-info">
            <h4>Umang AI</h4>
            <span className="ai-status">
              <span className="ai-status-dot"></span> Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div 
          className="ai-chat-messages" 
          ref={messagesContainerRef}
          data-lenis-prevent="true"
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`ai-message-wrapper ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                <div className="ai-message">
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {showSuggestions && (
              <motion.div 
                className="ai-suggestions-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="ai-suggestions-title">Try asking:</p>
                <div className="ai-suggestions-list">
                  {SUGGESTIONS.map((sug, i) => (
                    <button key={i} className="ai-suggestion-btn" onClick={() => handleSend(sug)}>
                      {sug}
                      <span>›</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ai-message-wrapper bot"
              >
                <div className="ai-message ai-typing">
                  <span></span><span></span><span></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <form className="ai-chat-input-area" onSubmit={handleSend}>
          <div className="ai-input-wrapper">
            <span className="ai-sparkle">✨</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit" disabled={!inputValue.trim() || isTyping}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="ai-chat-footer">
        Powered by AI • Built by Umang
      </div>
    </div>
  );
}
