import React, { useState } from 'react';
import axios from 'axios';
import { Bot, Send, Sparkles, User, Activity } from 'lucide-react';

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am FinGuide AI, your financial advisory assistant powered by Google Gemini AI & XGBoost analytics. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "What is compound interest?",
    "Explain S&P 500 ETF (VOO)",
    "How does XGBoost stock prediction work?",
    "How do I balance risk and return?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat/', { message: query });
      const botMsg = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I encountered an issue processing your query. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <Bot size={28} color="#ffffff" />
        </div>
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Gemini AI Financial Advisor</h1>
        <p style={{ color: '#475569', fontSize: '14px' }}>
          Real-time Q&A on investing, portfolio strategies, compound growth, and market metrics.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '540px', background: '#ffffff' }}>
        {/* Messages Container */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{
              display: 'flex', gap: '12px',
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}>
              {m.sender === 'bot' && (
                <div style={{ background: '#dbeafe', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={16} color="#2563eb" />
                </div>
              )}

              <div style={{
                background: m.sender === 'user' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#f1f5f9',
                color: m.sender === 'user' ? '#ffffff' : '#0f172a', padding: '12px 16px', borderRadius: '14px', fontSize: '14px', lineHeight: 1.5,
                border: m.sender === 'bot' ? '1px solid #cbd5e1' : 'none',
                fontWeight: m.sender === 'bot' ? '500' : '600'
              }}>
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div style={{ background: '#2563eb', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={16} color="#ffffff" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div style={{ background: '#dbeafe', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={16} className="animate-spin" color="#2563eb" />
              </div>
              <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: '14px', fontSize: '13px', color: '#64748b' }}>
                FinGuide AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 0', marginTop: '12px', borderTop: '1px solid #e2e8f0' }}>
          {quickPrompts.map((p, idx) => (
            <button key={idx} onClick={() => handleSend(p)} style={{
              background: '#f8fafc', border: '1px solid #cbd5e1',
              borderRadius: '16px', padding: '6px 12px', fontSize: '12px', color: '#334155', fontWeight: '600', whiteSpace: 'nowrap',
              transition: 'background 0.2s'
            }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', color: '#2563eb' }} /> {p}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <input 
            type="text" 
            className="glass-input" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask any financial or stock forecast question..."
          />
          <button onClick={() => handleSend()} className="btn-primary" disabled={loading} style={{ padding: '12px 20px' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
