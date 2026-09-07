import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './AiChatInterface.css';
import { SYSTEM_PROMPT, GROQ_CONFIG } from '../../utils/chatbotPrompt';

const INITIAL_MESSAGES = [
  { 
    id: 1, 
    text: "👋 Hey there!\nI'm Umang's AI assistant.\n\nAsk me anything about his skills, projects, experience, or just say hi!", 
    sender: 'bot',
    isInitial: true
  },
];

const SUGGESTIONS = [
  "What projects has Umang built?",
  "Tell me about FinSight",
  "What are his technical skills?",
  "What's his work experience?"
];

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

  const handleSend = async (textOrEvent) => {
    let userText = '';
    
    if (typeof textOrEvent === 'string') {
      userText = textOrEvent;
    } else {
      textOrEvent?.preventDefault();
      userText = inputValue;
    }

    if (!userText.trim() || isTyping) return;

    setShowSuggestions(false);
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

      const botReply = data.choices[0]?.message?.content || "Sorry, something went wrong.";
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
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
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
