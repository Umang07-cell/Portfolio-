import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';
import { SYSTEM_PROMPT, GROQ_CONFIG } from '../../utils/chatbotPrompt';

const INITIAL_MESSAGES = [
  { id: 1, text: "Hi there! 👋 I'm Umang's AI assistant.", sender: 'bot', isInitial: true },
  { id: 2, text: "I can answer questions about his skills, experience, or projects. What would you like to know?", sender: 'bot', isInitial: true },
];

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

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const newUserMsg = { id: Date.now(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .filter(m => !m.isInitial && (m.sender === 'user' || m.sender === 'bot'))
        .slice(-8)
        .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
      
      conversationHistory.push({ role: 'user', content: userText });

      const response = await fetch(GROQ_CONFIG.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_CONFIG.model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory
          ],
          temperature: GROQ_CONFIG.temperature,
          max_tokens: GROQ_CONFIG.maxTokens
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const botReply = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I'm having trouble connecting. Please try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
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
