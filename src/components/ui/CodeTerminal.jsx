import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `import torch
import torch.nn as nn

class Intelligence(nn.Module):
    def __init__(self):
        super().__init__()
        self.brain = nn.Transformer(
            d_model=512, 
            nhead=8
        )
        self.impact = nn.Linear(512, 1)

    def forward(self, data):
        insights = self.brain(data)
        return self.impact(insights)
        
# Initializing model...
# Status: Ready to deploy`;

export default function CodeTerminal() {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let timer = setInterval(() => {
      setDisplayedText(codeSnippet.substring(0, i));
      i++;
      if (i > codeSnippet.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="code-terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: '100%',
        maxWidth: '450px',
        background: '#0d1117',
        borderRadius: '8px',
        border: '1px solid #30363d',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        fontFamily: 'monospace',
      }}
    >
      <div 
        className="code-terminal-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          background: '#161b22',
          borderBottom: '1px solid #30363d'
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', color: '#8b949e', fontSize: '13px' }}>
          model.py
        </div>
      </div>
      <div 
        className="code-terminal-body"
        style={{
          padding: '20px',
          color: '#e6edf3',
          fontSize: '14px',
          lineHeight: '1.5',
          textAlign: 'left'
        }}
      >
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          <code style={{ fontFamily: 'var(--font-mono, monospace)' }}>
            {displayedText}
            <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
          </code>
        </pre>
      </div>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
